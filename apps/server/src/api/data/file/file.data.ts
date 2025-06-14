import { flatObj } from '../../../utils/misc'
import Collaboration from '../../models/collaboration.model'
import File, { IFile } from '../../models/file.model'
import { getCollaborators } from '../../services/collaboration/collaboration.service'
import { updateScreenplayVersionService } from '../../services/file/versionHistory.service'

import {
  addFilesToFolderService,
  deleteFilesFromFolderService
} from '../../services/folder/folder.service'
import { getCollaborationAccess } from '../collaboration/collaboration.data'
import { IGetSharedFilesParams } from '../collaboration/types'
import {
  IGetSingleOwnedFileParams,
  IGetSingleFileByfileIdParams,
  ICreateFileParams,
  IUpdateFileParams,
  IDeleteFileParams,
  IGetAllFilesParams
} from './types'
import { Types } from 'mongoose'

export const getSingleFileByfileId = async ({
  fileId,
  userId
}: IGetSingleOwnedFileParams): Promise<any | null> => {
  try {
    // Fetch the file (file) by its fileId
    const file = flatObj(
      await File.findOne({ _id: new Types.ObjectId(fileId) })
    )

    if (!file) {
      return { error: 'File not found', status: 404 }
    }

    // Fetch collaborators for the file

    // Fetch collaborators for the file
    const { collab }: any = await getCollaborators({
      resourceId: fileId,
      status: 'active'
    })
    file.collaborators = collab.map((collaboration: any) => ({
      _id: collaboration.userId?._id,
      email: collaboration.userId.email,
      profile_image: collaboration.userId.profile_image,
      name: `${collaboration.userId.firstName} ${collaboration.userId.lastName}`,
      permissionType: collaboration.permissionType
    }))

    // Check file-level collaboration for the current file
    const fileCollaborations = await getCollaborationAccess({
      resourceId: file._id,
      userId
    })

    // Check folder-level collaboration if folderId exists
    let folderCollaborations: any = null
    let hasSiblingFileAccess = false

    if (file.folderId) {
      folderCollaborations = await getCollaborationAccess({
        resourceId: file.folderId,
        userId
      })

      // Fetch all sibling files within the same folder
      const sharedFiles = flatObj(
        await File.find({
          folderId: file.folderId
        }).select('-screenplay')
      )

      // Check if any sibling file in the same folder has a file-level collaboration
      const siblingFileCollaboration = await Promise.all(
        sharedFiles.map(async siblingFile =>
          getCollaborationAccess({
            resourceId: siblingFile._id,
            userId
          })
        )
      )

      hasSiblingFileAccess = siblingFileCollaboration.some(
        collab => collab !== null
      )
    }

    // If there's no file or folder collaboration but sibling file has access
    if (!fileCollaborations && !folderCollaborations && hasSiblingFileAccess) {
      return {
        file: {
          ...file,
          permissionType: 'VIEW' // Grant "VIEW" access based on sibling file
        },
        status: 200
      }
    }

    // If there's direct file-level collaboration, use its permission type
    if (fileCollaborations) {
      return {
        file: {
          ...file,
          permissionType: fileCollaborations.permissionType // Use file-level permission
        },
        status: 200
      }
    }

    // If there's folder-level collaboration, grant VIEW access to all files
    if (folderCollaborations) {
      return {
        file: {
          ...file,
          permissionType: folderCollaborations.permissionType // VIEW access for the specific file
        },
        status: 200
      }
    }
    return {
      file: {
        ...file,
        permissionType: 'GUEST' // VIEW access for the specific file
      },
      status: 200
    }
    // Default response if no valid permissions were found
  } catch (error) {
    console.error('Error fetching file or collaboration:', error)
    return { error: 'An error occurred while fetching the file', status: 500 }
  }
}

export const createFile = async ({
  userId,
  title,
  subTitle,
  basedOn,
  typeOfCreation,
  logline,
  theme,
  genre,
  subgenre,
  pagetarget,
  characters,
  locations,
  folderId
}: ICreateFileParams): Promise<IFile | null> => {
  try {
    const file = flatObj(
      await File.create({
        userId,
        title,
        subTitle,
        basedOn,
        typeOfCreation,
        logline,
        theme,
        genre,
        subgenre,
        pagetarget,
        characters,
        locations,
        folderId,
        screenplayVersions: [
          {
            userId
          }
        ]
      })
    )

    if (file && folderId) await addFilesToFolderService(folderId, [file._id])
    return file ?? null
  } catch (error) {
    console.error(error)
    return null
  }
}

// export const updateFile = async ({
//   userId,
//   fileId,
//   title,
//   subTitle,
//   basedOn,
//   typeOfCreation,
//   prefix,
//   logline,
//   theme,
//   genre,
//   subgenre,
//   pagetarget,
//   characters,
//   locations,
//   folderId,
//   screenplayVersion
// }: IUpdateFileParams): Promise<IFile | null> => {
//   try {
//     const updObj: Partial<IFile> = {}
//     if (title) {
//       updObj.title = title
//     }
//     if (subTitle) {
//       updObj.subTitle = subTitle
//     }
//     if (basedOn) {
//       updObj.basedOn = basedOn
//     }
//     if (prefix) {
//       updObj.prefix = prefix
//     }
//     if (folderId) {
//       updObj.folderId = folderId
//     }
//     if (typeOfCreation) {
//       updObj.typeOfCreation = typeOfCreation
//     }
//     if (logline) {
//       updObj.logline = logline
//     }
//     if (screenplayVersion) {
//       await updateScreenPlayVersionService(screenplayVersion)
//     }
//     if (characters) {
//       updObj.characters = characters
//     }
//     if (theme) {
//       updObj.theme = theme
//     }
//     if (genre) {
//       updObj.genre = genre
//     }
//     if (subgenre) {
//       updObj.subgenre = subgenre
//     }
//     if (pagetarget) {
//       updObj.pagetarget = pagetarget
//     }
//     if (locations) {
//       updObj.locations = locations
//     }
//     const data = await File.findByIdAndUpdate(fileId, updObj, {
//       new: true
//     })

//     return data ? JSON.parse(JSON.stringify(data)) : null
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }
export const updateFile = async ({
  userId,
  fileId,
  title,
  subTitle,
  basedOn,
  typeOfCreation,
  prefix,
  logline,
  theme,
  genre,
  subgenre,
  pagetarget,
  currentPage,
  characters,
  locations,
  folderId,
  screenplayVersion
}: IUpdateFileParams): Promise<IFile | null> => {
  try {
    let updObj: Partial<IFile>
    if (title) {
      updObj.title = title
    }
    if (subTitle) {
      updObj.subTitle = subTitle
    }
    if (basedOn) {
      updObj.basedOn = basedOn
    }
    if (prefix) {
      updObj.prefix = prefix
    }
    if (folderId) {
      updObj.folderId = folderId
    }
    if (typeOfCreation) {
      updObj.typeOfCreation = typeOfCreation
    }
    if (logline) {
      updObj.logline = logline
    }
    if (characters) {
      updObj.characters = characters
    }
    if (theme) {
      updObj.theme = theme
    }
    if (genre) {
      updObj.genre = genre
    }
    if (subgenre) {
      updObj.subgenre = subgenre
    }
    if (pagetarget) {
      updObj.pagetarget = pagetarget
    }
    if (currentPage) {
      updObj.currentPage = currentPage
    }

    if (locations) {
      updObj.locations = locations
    }

    // Update screenplay version if provided
    if (screenplayVersion) {
      const { versionName, versionColor, editStatus, screenplay } =
        screenplayVersion
      await updateScreenplayVersionService({
        fileId,
        userId,
        versionName,
        versionColor,
        editStatus,
        screenplay
      })
    }
    console.log('updated Object', updObj)
    const data = await File.findByIdAndUpdate(fileId, updObj, {
      new: true
    })

    return data ? JSON.parse(JSON.stringify(data)) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteFile = async ({
  fileId
}: IDeleteFileParams): Promise<{ deletedCount?: number } | null> => {
  try {
    // First, retrieve the file to get its folderId
    const file = flatObj(await File.findById(fileId))

    if (!file) {
      return null // File doesn't exist
    }

    const folderId = file.folderId

    // Now delete the file
    const deletionResult = await File.deleteOne({ _id: fileId })

    // If the file was part of a folder, remove it from the folder's Files array
    if (folderId) {
      await deleteFilesFromFolderService(folderId, [fileId])
    }

    return deletionResult ? flatObj(deletionResult) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteMultipleFiles = async ({
  fileIds
}: {
  fileIds: string[]
}): Promise<{ deletedCount?: number } | null> => {
  try {
    // Retrieve all files to get their folderIds
    const files = await File.find({ _id: { $in: fileIds } })

    if (!files.length) {
      return null // No files found
    }

    const folderIds = files.map(file => file.folderId).filter(Boolean)

    // Delete the files
    const deletionResult = await File.deleteMany({ _id: { $in: fileIds } })

    // If any files were part of folders, remove them from the folders' Files arrays
    for (const folderId of folderIds) {
      await deleteFilesFromFolderService(folderId, fileIds)
    }

    return deletionResult ? flatObj(deletionResult) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getAllFiles = async ({
  userId
}: IGetAllFilesParams): Promise<IFile[]> => {
  try {
    const data = flatObj(
      await File.find({
        userId,
        folderId: { $exists: false } // Files without a folderId
      }).select('-screenplay')
    )
    return data ?? null
  } catch (error) {
    console.error(error)
    return []
  }
}

import { flatObj } from '../../../utils/misc'
import {
  createCollaboration,
  deleteAllCollaboration,
  getFileCollaborators
} from '../../data/collaboration/collaboration.data'
import Collaboration, { PermissionType } from '../../models/collaboration.model'
import Folder from '../../models/folder.model'
import File from '../../models/file.model'
import { getCollaborators } from '../collaboration/collaboration.service'

export const createFolderService = async (
  userId: string,
  title: string,
  Files: string[],
  resourceType: string
) => {
  const folder = new Folder({ userId, title, Files })
  await createCollaboration({
    resourceId: folder._id.toString(),
    collaborators: [{ userId, permissionType: 'ADMIN' }],
    resourceType
  })
  await folder.save()
  return folder
}

export const getAllResourceFoldersService = async (
  userId: string,
  status: string,
  page = 1,
  limit = 10,
  sort = 'newest'
) => {
  try {
    // Fetch Owned Folders
    const myfolders = flatObj(await Folder.find({ userId }).populate('Files'))

    const ownedFolders = (
      await Promise.all(
        myfolders.map(async collab => {
          const { collab: folderCollab }: any = await getCollaborators({
            resourceId: collab._id,
            status
          })
          if (folderCollab && folderCollab.status === status) {
            for (const file of collab.Files) {
              const collaborators = await getFileCollaborators({
                fileId: file._id
              })
              file.collaborators = collaborators
            }

            const permissionType = folderCollab.length > 1 ? 'ADMIN' : 'OWNER'

            return { ...collab, permissionType }
          }
          return null // Explicitly return null if status does not match
        })
      )
    ).filter(folder => folder !== null) // Filter out null entries

    // Fetch Shared Folders
    const sharedFolders = await getSharedResourceFolders({
      userId,
      status,
      page,
      limit,
      sort
    })

    // Combine and Sort All Folders
    const allFolders = [...ownedFolders, ...sharedFolders].sort((a, b) => {
      return sort === 'newest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

    // Implement Pagination on Combined List
    const startIndex = (page - 1) * limit
    const paginatedFolders = allFolders.slice(startIndex, startIndex + limit)

    return {
      folders: paginatedFolders,
      total: allFolders.length,
      page,
      totalPages: Math.ceil(allFolders.length / limit)
    }
  } catch (error) {
    console.error(error)
    return { folders: [], total: 0, page: 1, totalPages: 1 }
  }
}

export const getAllFoldersService = async (userId: string, status: string) => {
  const myfolders = flatObj(await Folder.find({ userId }).populate('Files'))

  const sharedFolders: any = await getSharedFolders({ userId, status })
  const sharedByMe: any[] = []

  const ownedFolders = (
    await Promise.all(
      myfolders.map(async collab => {
        const { collab: folderCollab } = await getCollaborators({
          resourceId: collab._id,
          status
        })

        // Skip if no collaborators are found

        if (!folderCollab || folderCollab.length === 0) {
          return null
        }
        collab.collaborators = folderCollab
        // Attach file collaborators
        for (const file of collab.Files) {
          const collaborators = await getFileCollaborators({ fileId: file._id })
          file.collaborators = collaborators
        }

        // Track folders shared by the user
        if (folderCollab.length > 1) {
          sharedByMe.push(collab)
        }

        return { ...collab, permissionType: 'ADMIN' }
      })
    )
  ).filter(folder => folder !== null) // Remove null entries

  const filteredSharedFolders = !sharedFolders.error
    ? await Promise.all(
        sharedFolders.map(async sharedFolder => {
          // Attach file collaborators for shared folders
          for (const file of sharedFolder.Files) {
            const fileCollab = await getFileCollaborators({ fileId: file._id })
            file.collaborators = fileCollab
          }
          return sharedFolder
        })
      ).then(sharedFolders =>
        sharedFolders.filter(
          sharedFolder =>
            !ownedFolders.some(
              ownedFolder =>
                ownedFolder._id.toString() === sharedFolder._id.toString()
            )
        )
      )
    : []

  return {
    OWNED: ownedFolders,
    SHARED: filteredSharedFolders,
    SHAREDBYME: sharedByMe
  }
}

export const getSharedResourceFolders = async ({
  userId,
  status = 'active',
  page = 1,
  limit = 10,
  sort = 'newest'
}) => {
  try {
    const collabs = await Collaboration.find({
      userId,
      status
    })

    if (!collabs || collabs.length === 0) {
      return []
    }

    const folderCollabs = collabs.filter(
      collab => collab.resourceType === 'FOLDER'
    )
    const fileCollabs = collabs.filter(collab => collab.resourceType === 'FILE')
    const fileIds = fileCollabs.map(collab => collab.resourceId)
    const folderIdsFromFile = flatObj(
      await File.find({ _id: { $in: fileIds } })
    ).map(file => file.folderId)

    const folders = flatObj(
      await Folder.find({
        _id: {
          $in: [...folderCollabs.map(c => c.resourceId), ...folderIdsFromFile]
        }
      })
        .populate('Files')
        .sort({ createdAt: sort === 'newest' ? -1 : 1 })
    )

    return folders.map(folder => {
      const folderCollab = folderCollabs.find(
        c => c.resourceId.toString() === folder._id.toString()
      )

      folder.Files.forEach(file => {
        const fileCollab = fileCollabs.find(
          fc => fc.resourceId.toString() === file._id.toString()
        )
        file.permissionType = fileCollab ? fileCollab.permissionType : 'VIEW'
      })

      const permissionType = folderCollab ? folderCollab.permissionType : 'VIEW'
      return { ...folder, permissionType }
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

// export const getSharedFolders = async ({
//   userId,
//   status = 'active'
// }: {
//   userId: string
//   status: string
// }) => {
//   try {
//     const collabs = await Collaboration.find({
//       userId,
//       status
//     })
//     if (!collabs || collabs.length === 0) {
//       return { error: 'No collaborations found' }
//     }

//     // Separate folder and file collaborations
//     const folderCollabs = collabs.filter(
//       collab => collab.resourceType === 'FOLDER'
//     )
//     const fileCollabs = collabs.filter(collab => collab.resourceType === 'FILE')

//     // Get folder IDs from file collaborations' related Files
//     const fileIds = fileCollabs.map(collab => collab.resourceId)
//     const folderIdsFromFile = flatObj(
//       await File.find({ _id: { $in: fileIds } })
//     ).map(file => file.folderId)

//     // Fetch folders with folder collaborations and those derived from file files
//     const folders = flatObj(
//       await Folder.find({
//         _id: {
//           $in: [...folderCollabs.map(c => c.resourceId), ...folderIdsFromFile]
//         }
//       }).populate('Files')
//     )

//     const result = folders
//       .map(folder => {
//         // Check for folder collaboration
//         const folderCollab = folderCollabs.find(
//           c => c.resourceId.toString() === folder._id.toString()
//         )

//         // Get files (Files) in the folder
//         const folderFiles = folder.Files || []

//         // Flag to track valid file collaboration
//         let hasValidFileCollab = false

//         // Iterate through the files (Files) in the folder
//         folderFiles.forEach(file => {
//           // Check if the file has a specific collaboration
//           const fileCollab = fileCollabs.find(
//             fc => fc.resourceId.toString() === file._id.toString()
//           )

//           if (
//             fileCollab &&
//             file.folderId.toString() === folder._id.toString()
//           ) {
//             // If the file has a valid collaboration in this folder, assign its permission
//             file.permissionType = fileCollab.permissionType
//             hasValidFileCollab = true
//           } else {
//             // If no valid collaboration, default to "VIEW"
//             file.permissionType = 'VIEW'
//           }
//         })

//         // Assign folder permission
//         const folderPermissionType = folderCollab
//           ? folderCollab.permissionType
//           : hasValidFileCollab
//           ? 'VIEW'
//           : false
//         if (!folderPermissionType) {
//           return
//         }
//         return {
//           ...folder,
//           permissionType: folderPermissionType // Folder permission type
//         }
//       })
//       .filter(folder => folder)

//     return result
//   } catch (error) {
//     console.error(error)
//     return []
//   }
// }
export const getSharedFolders = async ({
  userId,
  status = 'active'
}: {
  userId: string
  status: string
}) => {
  try {
    const collabs = await Collaboration.find({
      userId,
      status
    }).populate(['userId', 'resourceId'])
    if (!collabs || collabs.length === 0) {
      return { error: 'No collaborations found' }
    }

    // Separate folder and file collaborations
    const folderCollabs = collabs.filter(
      collab => collab.resourceType === 'FOLDER'
    )
    const fileCollabs = collabs.filter(collab => collab.resourceType === 'FILE')

    // Get folder IDs from file collaborations' related Files
    const fileIds = fileCollabs.map(collab => collab.resourceId)

    const folderIdsFromFile = flatObj(
      await File.find({ _id: { $in: fileIds } })
    ).map(file => file.folderId)

    // Fetch folders with folder collaborations and those derived from file files
    const folders = flatObj(
      await Folder.find({
        _id: {
          $in: [...folderCollabs.map(c => c.resourceId), ...folderIdsFromFile]
        }
      }).populate('Files')
    )

    const result = folders
      .map(folder => {
        // Check for folder collaboration
        const folderCollab = folderCollabs.find(
          c => c.resourceId.toString() === folder._id.toString()
        )
        folder.collaborators = folderCollab
        // Get files (Files) in the folder
        const folderFiles = folder.Files || []

        // Flag to track valid file collaboration
        let hasValidFileCollab = false
        const folderPermissionType = folderCollab
          ? folderCollab.permissionType
          : hasValidFileCollab
          ? 'VIEW'
          : false
        // Iterate through the files (Files) in the folder
        folderFiles.forEach(file => {
          // Check if the file has a specific collaboration
          const fileCollab = fileCollabs.find(
            fc => fc.resourceId.toString() === file._id.toString()
          )
          if (
            fileCollab &&
            file.folderId.toString() === folder._id.toString()
          ) {
            // If the file has a valid collaboration in this folder, assign its permission
            file.permissionType = fileCollab.permissionType
            hasValidFileCollab = true
          } else {
            // If no valid collaboration, default to "VIEW"
            file.permissionType = folderPermissionType
          }
        })

        // Assign folder permission

        if (!folderPermissionType) {
          return
        }
        return {
          ...folder,
          permissionType: folderPermissionType // Folder permission type
        }
      })
      .filter(folder => folder)

    return result
  } catch (error) {
    console.error(error)
    return []
  }
}
export const getFolderByIdService = async ({
  folderId,
  userId
}: {
  folderId: string
  userId: string
}) => {
  try {
    // Check for folder-level collaboration
    const folderCollab = flatObj(
      await Collaboration.findOne({ resourceId: folderId, userId })
    )

    // Fetch the folder with Files (files)
    const folder = flatObj(
      await Folder.findOne({ _id: folderId }).populate('Files')
    )
    if (!folder) {
      return { error: 'Folder not found' }
    }

    const folderFiles = folder.Files || []

    if (!folderCollab) {
      // If no folder-level collab, check for file-level collab within folder
      const fileCollabs = await Collaboration.find({
        userId,
        resourceType: 'FILE'
      })

      // Flag to track if there are any valid file collaborations in this folder
      let hasValidFileCollab = false

      // Assign permissions and collaborators for each file
      for (const file of folderFiles) {
        const fileCollab = fileCollabs.find(
          fc => fc.resourceId.toString() === file._id.toString()
        )

        if (fileCollab && file.folderId.toString() === folderId) {
          // File has a valid collab in this folder, use its permission
          file.permissionType = fileCollab.permissionType
          hasValidFileCollab = true
        } else {
          // No valid collab in this folder, default permission is VIEW
          file.permissionType = 'VIEW'
        }

        // Fetch collaborators for the file
        file.collaborators = await getFileCollaborators({ fileId: file._id })
      }

      // Determine folder permission
      const folderPermissionType = hasValidFileCollab ? 'VIEW' : 'NO_ACCESS'

      return {
        ...folder,
        permissionType: folderPermissionType, // Fallback permission if no direct folder collab
        Files: folderFiles
      }
    }

    // Assign collaborators and permissions for each file when folder-level collab exists
    for (const file of folderFiles) {
      // Fetch collaborators for the file
      file.collaborators = await getFileCollaborators({ fileId: file._id })
    }

    return {
      ...folder,
      permissionType: folderCollab.permissionType,
      Files: folderFiles
    }
  } catch (error) {
    console.error('Error fetching folder or collaboration:', error)
    return { error: 'An error occurred while fetching the folder' }
  }
}

export const addFilesToFolderService = async (
  folderId: any,
  fileIds: string[]
) => {
  const folder = await Folder.findOneAndUpdate(
    { _id: folderId },
    { $addToSet: { Files: { $each: fileIds } } }, // Ensure unique entries
    { new: true }
  )

  if (!folder) {
    throw new Error('Folder not found')
  }

  // Update each file to include folderId
  await File.updateMany({ _id: { $in: fileIds } }, { $set: { folderId } })

  return folder
}
export const deleteFilesFromFolderService = async (
  folderId: any,
  fileIds: string[]
) => {
  const folder = await Folder.findOneAndUpdate(
    { _id: folderId },
    { $pull: { Files: { $in: fileIds } } }, // Remove multiple fileIds
    { new: true }
  )

  if (!folder) {
    throw new Error('Folder not found')
  }

  // Update each file to remove folderId (nullify)
  await File.updateMany({ _id: { $in: fileIds } }, { $unset: { folderId: '' } })

  return folder
}

export const updateFolderService = async (
  folderId: string,
  userId: string,
  title: string,
  Files: string[]
) => {
  console.log(folderId)
  const folder = await Folder.findOneAndUpdate(
    { _id: folderId, userId },
    {
      title,
      Files
    },
    { new: true }
  )
  console.log(folder)
  return folder
}

export const deleteFolderService = async (
  folderIds: string[],
  userId: string
) => {
  const folders = flatObj(
    await Folder.deleteMany({ _id: { $in: folderIds }, userId })
  )
  await File.deleteMany({ folderId: { $in: folderIds } })
  await deleteAllCollaboration({ resourceId: folders })
  return folders
}

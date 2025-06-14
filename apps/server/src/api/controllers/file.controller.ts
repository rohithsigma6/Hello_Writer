import asyncHandler from 'express-async-handler'
import {
  createFileService,
  updateFileService,
  deleteFileService,
  getAllFileService,
  getSingleFileService,
  importFileService,
  getAllFileWithStatusService
} from '../services/file/file.service'
import { sendCollabEmail } from '../../lib/mail/mail'
import {
  createCollaborationService,
  deleteCollaborationService,
  getCollaborators
} from '../services/collaboration/collaboration.service'
import { getUserByIdService } from '../services/user/user.service'
import { Request, Response } from 'express'
import { flatObj } from '../../utils/misc'
import { getCollaborationAccess } from '../data/collaboration/collaboration.data'
import FileRevision, { IFileRevison } from '../models/file-revision.model'
import File, { IFile } from '../models/file.model'
import config from '../../config'
import VersionHistory, { IVersionDetail } from '../models/version-history.model'
import { getScreenplayToWorkOn } from '../services/file/versionHistory.service'
import * as Y from 'yjs'
import { TiptapTransformer } from '@hocuspocus/transformer'
import {
  changeResourceStatusService,
  restoreMultipleResourcesService
} from '../data/status/status.data'
const redirectUrl = config.url.frontendBaseUrl + '/dashboard'
const getAllFiles = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id
  const { Files } = await getAllFileService({ userId })
  res.status(200).send({ Files })
})

const getAllArchiveFiles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id
    if (!userId) {
      res.status(400).json({ message: 'Missing user ID' })
      return
    }

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 5
    const sort = (req.query.sort as string) || 'newest'

    const { files: Files, totalFiles } = await getAllFileWithStatusService({
      userId,
      page,
      limit,
      sort,
      status: 'archive'
    })

    res.status(200).json({
      page,
      limit,
      totalFiles: totalFiles,
      totalPages: Math.ceil(totalFiles / limit),
      Files
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    res
      .status(500)
      .json({ message: 'Error retrieving files', error: errorMessage })
  }
})

const getAllTrashFiles = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id
    if (!userId) {
      res.status(400).json({ message: 'Missing user ID' })
      return
    }

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 5
    const sort = (req.query.sort as string) || 'newest'

    const { files: Files, totalFiles } = await getAllFileWithStatusService({
      userId,
      page,
      limit,
      sort,
      status: 'trash'
    })
    console.log('totalFiles', totalFiles)
    res.status(200).json({
      page,
      limit,
      totalFiles: totalFiles,
      totalPages: Math.ceil(totalFiles / limit),
      Files
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    res
      .status(500)
      .json({ message: 'Error retrieving files', error: errorMessage })
  }
})
const createFile = asyncHandler(async (req: Request, res: Response) => {
  try {
    let {
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
      collaborators,
      folderId
    } = req.body
    let userId = flatObj(req.user._id)
    console.log('userId is ', userId)
    if (!userId) {
      return res.badRequest('Missing user ID')
    }
    if (folderId) {
      const getAccess = await getCollaborationAccess({
        resourceId: folderId,
        userId
      })
      if (getAccess && getAccess.permissionType !== 'ADMIN') {
        const getCollaboratorss = await getCollaborators({
          resourceId: folderId,
          status: 'active'
        })
        const adminOfFolder = getCollaboratorss.collab.find(
          collaborator => collaborator.permissionType === 'ADMIN'
        )
        console.log('getAccess is ', getAccess)
        console.log('adminOfFolder is ', adminOfFolder.userId)
        console.log('collaborators is ', collaborators)
        collaborators = collaborators
          ? [
              ...collaborators,
              {
                userId,
                permissionType: 'EDIT'
              }
            ]
          : [
              {
                userId,
                permissionType: 'EDIT'
              }
            ]
        userId = adminOfFolder.userId
      } else {
        userId = flatObj(req.user._id)
      }
    }
    console.log('collaborators is ', collaborators)
    const result: any = await createFileService({
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
      collaborators: collaborators && flatObj(collaborators),
      folderId
    })

    const file = req?.file

    if (req?.file) {
      const jsonResult: any = await importFileService(file)
      let parced_data = jsonResult?.parsedData
      return res.ok({
        message: 'File created successfully',
        parced_data,
        _id: result['_id'],
        title: result['title']
      })
    }
    return res.ok({
      message: 'File created successfully',
      _id: result['_id'],
      title: result['title']
    })
  } catch (error) {
    console.error('Error creating file:', error)
    res.badRequest('An error occurred while creating the file')
  }
})
const updateFile = asyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    subTitle,
    basedOn,
    prefix,
    typeOfCreation,
    collaborators,
    logline,
    theme,
    genre,
    subgenre,
    pagetarget,
    currentPage,
    characters,
    locations
  } = req.body
  console.log('request body is : ', req.body)
  const userId = req.user?._id?.toString()
  const { fileId } = req.params
  if (!fileId) {
    res.badRequest('Missing file Id')
  }
  if (!userId) {
    res.badRequest('Missing user Id')
  }

  if (fileId) {
    const getAccess = await getCollaborationAccess({
      resourceId: fileId,
      userId
    })
    if (getAccess && getAccess.permissionType === 'VIEW') {
      return res.redirectTo(redirectUrl, {
        message: 'You are not authorised to update file.'
      })
    }
  }
  if (fileId) {
    const getAccess = await getCollaborationAccess({
      resourceId: fileId,
      userId
    })
    if (getAccess && getAccess.permissionType === 'VIEW') {
      return res.redirectTo(redirectUrl, {
        message: 'You are not authorised to create file.'
      })
    }
  }
  await updateFileService({
    userId,
    fileId,
    title,
    subTitle,
    prefix,
    basedOn,
    typeOfCreation,
    logline,
    theme,
    genre,
    subgenre,
    pagetarget,
    currentPage,
    characters,
    collaborators,
    locations
  })

  res.ok({ message: 'file updated successfully', id: fileId })
})
const deleteFiles = asyncHandler(async (req: Request, res: Response) => {
  const { resourceIds } = req.body // Accepts an array of file IDs
  const userId = req.user?._id
  if (!resourceIds || !Array.isArray(resourceIds) || resourceIds.length === 0) {
    return res.badRequest('Missing or invalid resource IDs')
  }

  // Collect promises for deleting files
  const deletePromises = resourceIds.map(async fileId => {
    const getAccess = await getCollaborationAccess({
      resourceId: fileId,
      userId: userId?.toString()
    })
    const permissionType = getAccess?.permissionType
    const status = getAccess?.status

    if (permissionType == 'ADMIN') {
      console.log('user is admin')
      await deleteFileService({
        fileId,
        userId: userId?.toString(),
        permissionType
      })
      await deleteCollaborationService({
        resourceId: fileId,
        userIds: [userId?.toString()]
      })
    } else {
      console.log('user is not admin')
      console.log('userId is ', userId)
      console.log('fileId is ', fileId)
      await deleteCollaborationService({
        resourceId: fileId,
        userIds: [userId?.toString()]
      })
    }
  })
  await Promise.all(deletePromises)
  res.ok({ message: 'Files removed successfully' })
})

// const deleteMultipleFiles = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { resourceIDs } = req.body // Accepts an array of file IDs
//     const userId = req.user?._id

//     if (
//       !resourceIDs ||
//       !Array.isArray(resourceIDs) ||
//       resourceIDs.length === 0
//     ) {
//       return res.badRequest('Missing or invalid resource IDs')
//     }

//     // Collect promises for deleting files
//     const deletePromises = resourceIDs.map(async fileId => {
//       const getAccess = await getCollaborationAccess({
//         resourceId: fileId,
//         userId: userId?.toString()
//       })

//       const permissionType = getAccess?.permissionType
//       return deleteFileService({
//         fileId,
//         userId: userId?.toString(),
//         permissionType
//       })
//     })

//     // Await all delete operations
//     await Promise.all(deletePromises)

//     res.ok({ message: 'Files removed successfully' })
//   }
// )

const changeResourceStatus = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { resourceIds, status } = req.body
    const userId = req.user?._id?.toString()
    console.log(resourceIds, status)
    if (!resourceIds.length || !status) {
      return res
        .status(400)
        .json({ message: 'resourceIds and status are required' })
    }

    if (!['archive', 'trash', 'active'].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Allowed values: 'archive', 'trash','active'."
      })
    }

    const resource = await changeResourceStatusService({
      resourceIds,
      status,
      userId
    })

    res.status(200).json({ message: `${status} successfully`, resource })
  }
)

const trashResource = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { resourceId, resourceType } = req.body
    const userId = req.user?._id?.toString() // Convert ObjectId to string

    if (!resourceId || !resourceType) {
      return res
        .status(400)
        .json({ message: 'resourceId and resourceType are required' })
    }
    // const resource = await trashResourceService({
    //   resourceId,
    //   resourceType,
    //   userId
    // })
    res.status(200).json({ message: `${resourceType} archived successfully` })
  }
)

const restoreResource = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { resourceIds, resourceType, type } = req.body // Expecting an array of resourceIds
    const userId = req.user?._id // Convert ObjectId to string

    if (!resourceIds || !resourceType || !type) {
      return res
        .status(400)
        .json({ message: 'resourceId, type and resourceType are required' })
    }

    // Ensure that resourceId is an array
    if (!Array.isArray(resourceIds)) {
      return res.status(400).json({ message: 'resourceId must be an array' })
    }

    // Call the service function to restore multiple resources
    const resources = await restoreMultipleResourcesService({
      resourceIds,
      resourceType,
      userId: userId?.toString(),
      type
    })

    // Respond with a success message
    res.status(200).json({
      message: `${resourceType} restored successfully`,
      resources
    })
  }
)

const getSingleFile = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { fileId } = req.params
    const userId = req.user?._id?.toString()

    if (!fileId) {
      return res.badRequest('File ID is required.')
    }

    try {
      const { file, status } = await getSingleFileService({
        fileId,
        userId
      })
      if (status === 200) {
        return res.ok({
          file
        })
      }

      if (status === 403) {
        return res.redirectTo(redirectUrl, {
          message: 'You are not authorised to view this file.'
        })
      }

      if (status === 404) {
        return res.redirectTo(redirectUrl, { message: 'File not found.' })
      }

      return res.status(500).send({ message: 'An unexpected error occurred.' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: 'Failed to retrieve file details.'
      })
    }
  }
)
const getScreenplayJson = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { fileId } = req.params
    const userId = req.user?._id?.toString()
    const { versionName } = req.body
    if (!fileId) {
      return res.badRequest('File ID is required.')
    }

    try {
      const { file, status } = await getSingleFileService({
        fileId,
        userId
      })
      if (status === 200) {
        const screenplay = await VersionHistory.findOne({
          fileId: fileId
        })
        let versionHistoryDetail = screenplay.versionHistory.find(
          detail => detail.versionName === versionName
        )
        const ydoc = new Y.Doc()
        Y.applyUpdate(
          ydoc,
          new Uint8Array(
            versionHistoryDetail.screenplayVersions.at(-1).screenplay
          )
        )
        let json = TiptapTransformer.fromYdoc(ydoc)
        return res.ok({
          screenplay: json
        })
      }

      if (status === 403) {
        return res.redirectTo(redirectUrl, {
          message: 'You are not authorised to view this file.'
        })
      }

      if (status === 404) {
        return res.redirectTo(redirectUrl, { message: 'File not found.' })
      }

      return res.status(500).send({ message: 'An unexpected error occurred.' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: 'Failed to retrieve file details.'
      })
    }
  }
)
const getFileCollaborators = asyncHandler(
  async (req: Request, res: Response) => {
    const { fileId } = req.params
    const userId = req.user?._id?.toString()

    if (!fileId) {
      return res.badRequest('Missing file Id')
    }
    const { collab, status } = await getCollaborators({
      resourceId: fileId,
      status: 'active'
    })
    if (status === 200) {
      return res.ok({ collab })
    }
    return res.redirectTo(redirectUrl, { message: 'File not found.' })
  }
)
const collaborateFile = asyncHandler(async (req: Request, res: Response) => {
  const { collaborators } = req.body
  const { fileId } = req.params
  const user = req.user
  const userId = req.user?._id?.toString()
  if (!collaborators || !fileId) {
    return res.badRequest('Missing users or fileId')
  }
  const { file } = await getSingleFileService({
    fileId,
    userId
  })

  if (!file) {
    return res.badRequest('Invalid fileId')
  }
  let access = await getCollaborationAccess({
    resourceId: fileId,
    userId
  })
  if (!access || access.permissionType !== 'ADMIN') {
    return res.redirectTo(redirectUrl, {
      message: 'You are not authorised to add collaborator to this file.'
    })
  }
  await createCollaborationService({
    resourceId: fileId,
    collaborators,
    resourceType: 'FILE'
  })

  const emailPromises = collaborators.map(async ({ userId }) => {
    const { user: registeredUser } = await getUserByIdService({ userId })
    if (!registeredUser) {
      return {
        status: 'rejected',
        reason: `Invitee with userId ${userId} is not a registered user`
      }
    }

    if (user && file?.title && registeredUser) {
      await sendCollabEmail({
        inviterName: `${user?.firstName}`,
        fileName: file.title,
        invitesEmail: registeredUser.email,
        invitesName: registeredUser.firstName,
        fileLink: `${config.url.frontendBaseUrl}/file/${fileId}/screenplay`
      })
      return {
        status: 'fulfilled',
        value: `Email sent to ${registeredUser.email}`
      }
    }
  })

  const results = await Promise.allSettled(emailPromises)

  results.forEach(result => {
    if (result.status === 'rejected') {
      console.error(result.reason)
    }
  })

  res.ok({ message: 'Collaboration requests sent' })
})
const copyRightFile = asyncHandler(async (req: Request, res: Response) => {
  const { collaborators } = req.body
  const { fileId } = req.params
  const user = req.user
  const userId = req.user?._id?.toString()
  if (!collaborators || !fileId) {
    return res.badRequest('Missing users or fileId')
  }
  const { file } = await getSingleFileService({
    fileId,
    userId
  })

  if (!file) {
    return res.badRequest('Invalid fileId')
  }
  let access = await getCollaborationAccess({
    resourceId: fileId,
    userId
  })
  if (!access || access.permissionType !== 'ADMIN') {
    return res.redirectTo(redirectUrl, {
      message: 'You are not authorised to add collaborator to this file.'
    })
  }
  await createCollaborationService({
    resourceId: fileId,
    collaborators,
    resourceType: 'FILE'
  })

  const emailPromises = collaborators.map(async ({ userId }) => {
    const { user: registeredUser } = await getUserByIdService({ userId })
    if (!registeredUser) {
      return {
        status: 'rejected',
        reason: `Invitee with userId ${userId} is not a registered user`
      }
    }

    if (user && file?.title && registeredUser) {
      await sendCollabEmail({
        inviterName: `${user?.firstName}`,
        fileName: file.title,
        invitesEmail: registeredUser.email,
        invitesName: registeredUser.firstName,
        fileLink: `${config.url.frontendBaseUrl}/file/${fileId}/screenplay`
      })
      return {
        status: 'fulfilled',
        value: `Email sent to ${registeredUser.email}`
      }
    }
  })

  const results = await Promise.allSettled(emailPromises)

  results.forEach(result => {
    if (result.status === 'rejected') {
      console.error(result.reason)
    }
  })

  res.ok({ message: 'Collaboration requests sent' })
})
const importFile = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.')
      }
      const file = req?.file
      const jsonResult = await importFileService(file)
      res.json(jsonResult)
    } catch (error) {
      res.status(500).json({ message: 'Error processing file', error })
    }
  }
)

const deleteFileCollaborator = asyncHandler(
  async (req: Request, res: Response) => {
    const { userIds } = req.body
    const { fileId } = req.params
    const user = req.user
    const userId = req.user?._id?.toString()
    if (!userIds || !fileId) {
      return res.badRequest('Missing users or fileId')
    }
    const { file } = await getSingleFileService({
      fileId,
      userId
    })

    if (!file) {
      return res.badRequest('Invalid fileId')
    }
    let access = await getCollaborationAccess({
      resourceId: fileId,
      userId
    })
    if (!access || access.permissionType !== 'ADMIN') {
      return res.redirectTo(redirectUrl, {
        message: 'You are not authorised to remove collaborator from this file.'
      })
    }

    await deleteCollaborationService({
      resourceId: fileId,
      userIds
    })

    const emailPromises = userIds.map(async userId => {
      const { user: registeredUser } = await getUserByIdService({ userId })
      if (!registeredUser) {
        return {
          status: 'rejected',
          reason: `Collaborator with userId ${userId} is not a registered user`
        }
      }

      if (user && file?.title && registeredUser) {
        return {
          status: 'fulfilled',
          value: `Email sent to ${registeredUser.email}`
        }
      }
    })

    const results = await Promise.allSettled(emailPromises)

    results.forEach(result => {
      if (result.status === 'rejected') {
        console.error(result.reason)
      }
    })

    res.ok({
      message: 'Collaborators removed and notifications sent',
      results
    })
  }
)

const addFileRevision = asyncHandler(async (req: Request, res: Response) => {
  const { fileId } = req.params
  const { color } = req.body

  if (!fileId) {
    return res.badRequest('Missing file Id')
  }
  if (!color) {
    return res.badRequest('Missing color')
  }

  try {
    const existingFileRevision = await FileRevision.findOne({ fileId })

    if (existingFileRevision) {
      existingFileRevision.color.push(color)
      existingFileRevision.createdDate.push(new Date())
      await existingFileRevision.save()
    } else {
      const newFileRevision: IFileRevison = new FileRevision({
        fileId,
        color: color ? [color] : undefined,
        createdDate: [new Date()]
      })
      await newFileRevision.save()
    }

    res.ok({ message: 'file revision added successfully' })
  } catch (error) {
    res.status(500).send({ message: 'An unexpected error occurred.' })
  }

  return
})
const getFileRevision = asyncHandler(async (req: Request, res: Response) => {
  const { fileId } = req.params
  if (!fileId) {
    return res.badRequest('Missing file Id')
  }
  try {
    const fileRevision = await FileRevision.findOne({ fileId })
    res.ok({ fileRevision })
  } catch (error) {
    res.status(500).send({ message: 'An unexpected error occurred.' })
  }
  return
})

const duplicateFile = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { fileId } = req.params
      const userId = req.user?._id?.toString()

      if (!fileId) {
        return res.badRequest('File ID is required.')
      }
      if (!userId) {
        return res.badRequest('User ID is missing.')
      }

      // Retrieve the original file details
      const { file, status } = await getSingleFileService({
        fileId,
        userId
      })

      if (status === 403) {
        return res.redirectTo(redirectUrl, {
          message: 'You are not authorised to duplicate this file.'
        })
      }

      if (status === 404) {
        return res.redirectTo(redirectUrl, { message: 'File not found.' })
      }

      if (status !== 200 || !file) {
        return res
          .status(500)
          .send({ message: 'Failed to retrieve file details.' })
      }

      // Check for folder collaboration access if folderId exists
      if (file.folderId) {
        const access = await getCollaborationAccess({
          resourceId: file.folderId,
          userId
        })
        if (access && access.permissionType !== 'ADMIN') {
          return res.redirectTo(redirectUrl, {
            message: 'You are not authorised to duplicate this file.'
          })
        }
      }

      // Directly use the retrieved file object to create a duplicate
      const duplicatedFileData = {
        ...file,
        title: `${file.title} (Copy)`,
        userId // Ensure the user ID is correctly set
      }

      await createFileService(duplicatedFileData)

      return res.ok({
        message: 'File duplicated successfully.'
      })
    } catch (error) {
      console.error('Error duplicating file:', error)
      return res.badRequest('An error occurred while duplicating the file.')
    }
  }
)

// const createNewVersion = asyncHandler(
//   async (req: Request, res: Response): Promise<any> => {
//     const { fileId } = req.params
//     const { _id: userId } = req.user
//     const { prevVersion } = req.body
//     if (!fileId || !prevVersion) {
//       return res.status(400).json({
//         message: 'Missing required parameters: fileId or prevVersion'
//       })
//     }

//     try {
//       const file: IFile | null = await File.findById(fileId)

//       if (!file) {
//         return res.status(404).json({ message: 'File not found' })
//       }

//       if (!Array.isArray(file.screenplayVersions)) {
//         return res
//           .status(500)
//           .json({ message: 'Invalid screenplayVersions format' })
//       }

//       const version = file.screenplayVersions.find(
//         v => v.versionName === prevVersion
//       )

//       if (!version) {
//         return res.status(404).json({ message: 'Previous version not found' })
//       }

//       const newVersion = {
//         userId: userId,
//         versionName: 'V' + (file.screenplayVersions.length + 1),
//         versionColor: 'White',
//         editStatus: 'PERSONAL DRAFT',
//         screenplay: version.screenplay
//       }

//       file.screenplayVersions.push(newVersion) // Mongoose automatically tracks changes
//       await file.save()

//       res.ok({ newVersion, file })
//     } catch (error) {
//       console.error(error) // Log the error for debugging
//       res.status(500).json({ message: 'An unexpected error occurred.' })
//     }
//   }
// )
const createNewVersion = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { fileId } = req.params
    const { _id: userId } = req.user
    const { prevVersion } = req.body

    if (!fileId || !prevVersion) {
      return res.status(400).json({
        message: 'Missing required parameters: fileId or prevVersion'
      })
    }

    try {
      // Check if the file exists.
      const file: IFile | null = await File.findById(fileId)
      if (!file) {
        return res.status(404).json({ message: 'File not found' })
      }

      // Find or create the VersionHistory document for the file.
      let versionHistory = await VersionHistory.findOne({ fileId })

      // Find the previous version detail from versionHistory by versionName.
      const prevVersionDetail = versionHistory.versionHistory.find(
        detail => detail.versionName === prevVersion
      )
      console.log('prevVersionDetail', prevVersionDetail)
      if (!prevVersionDetail) {
        return res.status(404).json({ message: 'Previous version not found' })
      }

      // Grab the last screenplay buffer from the previous version.
      const lastScreenplayVersion =
        prevVersionDetail?.screenplayVersions[
          prevVersionDetail?.screenplayVersions?.length - 1
        ]

      // Create a new version detail with a new versionName.
      const newVersionDetail = {
        versionName: 'V' + (versionHistory.versionHistory.length + 1),
        versionColor: 'White',
        editStatus: 'PERSONAL DRAFT',
        // Start with the same screenplay buffer as the previous version.
        screenplayVersions: [
          {
            screenplay: lastScreenplayVersion?.screenplay,
            userId: userId,
            updatedAt: new Date()
          }
        ],
        comments: [],
        stashIds: []
      }
      // Push the new version detail into the versionHistory.
      versionHistory.versionHistory.push(newVersionDetail as IVersionDetail)
      await versionHistory.save()

      res.status(200).json({ newVersion: newVersionDetail, versionHistory })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'An unexpected error occurred.' })
    }
  }
)

export default {
  getAllArchiveFiles,
  getAllTrashFiles,
  // deleteMultipleFiles,
  getAllFiles,
  createFile,
  changeResourceStatus,
  trashResource,
  restoreResource,
  getSingleFile,
  getFileCollaborators,
  collaborateFile,
  importFile,
  deleteFileCollaborator,
  deleteFiles,
  updateFile,
  addFileRevision,
  getFileRevision,
  duplicateFile,
  createNewVersion,
  getScreenplayJson
}

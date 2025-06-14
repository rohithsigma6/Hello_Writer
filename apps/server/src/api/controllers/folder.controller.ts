import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import {
  createFolderService,
  getAllFoldersService,
  getFolderByIdService,
  updateFolderService,
  deleteFolderService,
  addFilesToFolderService,
  deleteFilesFromFolderService,
  getAllResourceFoldersService,
  getSharedFolders
} from '../services/folder/folder.service'
import {
  createCollaboration,
  getCollaborationAccess
} from '../data/collaboration/collaboration.data'
import config from '../../config'
import {
  createCollaborationService,
  deleteCollaborationService,
  getCollaborators
} from '../services/collaboration/collaboration.service'
import { getUserByIdService } from '../services/user/user.service'
const redirectUrl = config.url.frontendBaseUrl + '/dashboard'

const createFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?._id?.toString()
      const { title, Files, collaborators } = req.body

      if (!userId) {
        res.status(400).json({ message: 'Missing user ID' })
        return
      }

      const resourceType = 'FOLDER'
      const folder = await createFolderService(
        userId,
        title,
        Files,
        resourceType
      )
      if (collaborators)
        await createCollaboration({
          resourceId: folder._id.toString(),
          collaborators,
          resourceType
        })

      res.status(201).json({ folder })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res
        .status(500)
        .json({ message: 'Error creating folder', error: errorMessage })
    }
  }
)

const getAllFolders = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?._id?.toString()
      if (!userId) {
        res.status(400).json({ message: 'Missing user ID' })
        return
      }
      const folders = await getAllFoldersService(userId, 'active')
      res.status(200).json({ folders })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res
        .status(500)
        .json({ message: 'Error retrieving folders', error: errorMessage })
    }
  }
)
const getAllArchiveFolders = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?._id?.toString()
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 5
      const sort = (req.query.sort as string) || 'newest'
      if (!userId) {
        res.status(400).json({ message: 'Missing user ID' })
        return
      }
      const data = await getAllResourceFoldersService(
        userId,
        'archive',
        page,
        limit,
        sort
      )
      res.status(200).json(data)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res
        .status(500)
        .json({ message: 'Error retrieving folders', error: errorMessage })
    }
  }
)
const getAllTrashFolders = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?._id?.toString()
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 5
      const sort = (req.query.sort as string) || 'newest'
      if (!userId) {
        res.status(400).json({ message: 'Missing user ID' })
        return
      }
      const data = await getAllResourceFoldersService(
        userId,
        'trash',
        page,
        limit,
        sort
      )
      res.status(200).json(data)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res
        .status(500)
        .json({ message: 'Error retrieving folders', error: errorMessage })
    }
  }
)

const getFolderById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { folderId } = req.params
      const userId = req.user?._id?.toString()
      if (!userId || !folderId) {
        res.status(400).json({ message: 'Missing user ID or folder ID' })
        return
      }
      const folder = await getFolderByIdService({ folderId, userId })
      if (!folder) {
        res.status(404).json({ message: 'Folder not found' })
        return
      }
      res.status(200).json({ folder })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res
        .status(500)
        .json({ message: 'Error retrieving folder', error: errorMessage })
    }
  }
)

const updateFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params
    const userId = req.user?._id?.toString()
    if (folderId) {
      const getAccess = await getCollaborationAccess({
        resourceId: folderId,
        userId
      })
      if (
        getAccess &&
        getAccess.permissionType !== 'ADMIN' &&
        getAccess.permissionType !== 'EDIT'
      ) {
        return res.redirectTo(redirectUrl, {
          message: 'You are not authorised to update file.'
        })
      }
    }
    const { title, Files } = req.body
    // console.log("req body is ", req.body)
    if (!userId || !folderId) {
      res.status(400).json({ message: 'Missing user ID or folder ID' })
      return
    }
    const folder = await updateFolderService(folderId, userId, title, Files)
    if (!folder) {
      res.status(404).json({ message: 'Folder not found' })
      return
    }
    res.status(200).json({ folder })
    return
  }
)
const deleteFolders = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { resourceIds } = req.body
    const userId = req.user?._id?.toString()
    if (!userId || !resourceIds) {
      res.status(400).json({ message: 'Missing user ID or folder ID' })
      return
    }
    for (const folderId of resourceIds) {
      const getAccess = await getCollaborationAccess({
        resourceId: folderId,
        userId
      })
      const permissionType = getAccess?.permissionType
      const status = getAccess?.status
      if (permissionType == 'ADMIN') {
        await deleteFolderService(resourceIds, userId)
        await deleteCollaborationService({
          resourceId: folderId,
          userIds: [userId?.toString()]
        })
      } else {
        console.log('user is not admin')
        await deleteCollaborationService({
          resourceId: folderId,
          userIds: [userId?.toString()]
        })
      }
    }
    res.status(200).json({ message: 'Folder deleted successfully' })
    return
  }
)
const addFilesToFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params
    const { fileIds } = req.body
    const userId = req.user?._id?.toString()
    if (!userId || !folderId) {
      res.status(400).json({ message: 'Missing user ID or folder ID' })
      return
    }
    if (folderId) {
      const getAccess = await getCollaborationAccess({
        resourceId: folderId,
        userId
      })
      if (getAccess && getAccess.permissionType !== 'ADMIN') {
        return res.redirectTo(redirectUrl, {
          message: 'You are not authorised to delete file.'
        })
      }
    }
    const folder = await addFilesToFolderService(folderId, fileIds)
    if (!folder) {
      res.status(404).json({ message: 'Folder not found' })
      return
    }
    res.status(200).json({ message: 'File added successfully' })
    return
  }
)
const deleteFilesFromFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params
    const { fileIds } = req.body
    const userId = req.user?._id?.toString()
    if (!userId || !folderId) {
      res.status(400).json({ message: 'Missing user ID or folder ID' })
      return
    }
    if (folderId) {
      const getAccess = await getCollaborationAccess({
        resourceId: folderId,
        userId
      })
      if (getAccess && getAccess.permissionType !== 'ADMIN') {
        return res.redirectTo(redirectUrl, {
          message: 'You are not authorised to delete file.'
        })
      }
    }
    const folder = await deleteFilesFromFolderService(folderId, fileIds)
    if (!folder) {
      res.status(404).json({ message: 'Folder not found' })
      return
    }
    res.status(200).json({ message: 'File removed successfully' })
    return
  }
)

const collaborateFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params
    const { collaborators } = req.body
    const userId = req.user?._id?.toString()
    if (!userId || !folderId) {
      res.status(400).json({ message: 'Missing user ID or folder ID' })
      return
    }
    let access = await getCollaborationAccess({
      resourceId: folderId,
      userId
    })
    if (!access || access.permissionType !== 'ADMIN') {
      return res.redirectTo(redirectUrl, {
        message: 'You are not authorised to add collaborator to this folder.'
      })
    }
    const folder = await getFolderByIdService({ folderId, userId })
    if (!folder) {
      res.status(404).json({ message: 'Folder not found' })
      return
    }
    await createCollaborationService({
      resourceId: folderId,
      resourceType: 'FOLDER',
      collaborators
    })

    res.status(200).json({ message: 'collaborators added successfully' })
    return
  }
)
const getFolderCollaborators = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { folderId } = req.params
    const userId = req.user?._id?.toString()
    if (!userId || !folderId) {
      res.status(400).json({ message: 'Missing user ID or folder ID' })
      return
    }
    const folder = await getFolderByIdService({ folderId, userId })
    if (!folder) {
      return res.redirectTo(redirectUrl, {
        message: 'Folder not found'
      })
    }
    const getAccess = await getCollaborationAccess({
      resourceId: folderId,
      userId
    })
    if (!getAccess) {
      return res.redirectTo(redirectUrl, {
        message: 'You are not authorised to view file collaborator.'
      })
    }
    const { collab, status } = await getCollaborators({
      resourceId: folderId,
      status: 'active'
    })
    if (status === 200) {
      return res.ok({ collab })
    }
    return res.redirectTo(redirectUrl, { message: 'File not found.' })
  }
)
const deleteFolderCollaborator = asyncHandler(
  async (req: Request, res: Response) => {
    const { userIds } = req.body
    const { folderId } = req.params
    const userId = req.user?._id?.toString()

    if (!userIds || !folderId) {
      return res.badRequest('Missing users or folderId')
    }
    const folder = await getFolderByIdService({
      folderId,
      userId
    })

    if (!folder) {
      return res.badRequest('Invalid folderId')
    }
    let access = await getCollaborationAccess({
      resourceId: folderId,
      userId
    })

    if (!access || access.permissionType !== 'ADMIN') {
      return res.redirectTo(redirectUrl, {
        message:
          'You are not authorised to remove collaborator from this folder.'
      })
    }

    let removedCollab: any = await deleteCollaborationService({
      resourceId: folderId,
      userIds
    })
    if (removedCollab?.error) {
      return res.redirectTo(redirectUrl, {
        message: removedCollab.error
      })
    }

    const emailPromises = userIds.map(async userId => {
      const { user: registeredUser } = await getUserByIdService({ userId })
      if (!registeredUser) {
        return {
          status: 'rejected',
          reason: `Collaborator with userId ${userId} is not a registered user`
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

const duplicateFolder = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { folderId } = req.params
      const userId = req.user?._id?.toString()

      if (!userId || !folderId) {
        res.status(400).json({ message: 'Missing user ID or folder ID' })
        return
      }

      // Retrieve the original folder
      const originalFolder = await getFolderByIdService({ folderId, userId })
      if (!originalFolder) {
        res.status(404).json({ message: 'Original folder not found' })
        return
      }

      // Create a new folder with the same properties
      const newFolderData = {
        files: originalFolder.files,
        title: `${originalFolder.title} (Copy)`
      }

      const duplicatedFolder = await createFolderService(
        userId,
        newFolderData.title,
        newFolderData.files,
        'FOLDER'
      )

      res.status(201).json({
        message: 'Folder duplicated successfully',
        folder: duplicatedFolder
      })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      res
        .status(500)
        .json({ message: 'Error duplicating folder', error: errorMessage })
    }
  }
)

export default {
  createFolder,
  getAllFolders,
  getFolderById,
  updateFolder,
  deleteFolders,
  collaborateFolder,
  getFolderCollaborators,
  deleteFolderCollaborator,
  addFilesToFolder,
  deleteFilesFromFolder,
  duplicateFolder,
  getAllArchiveFolders,
  getAllTrashFolders
}

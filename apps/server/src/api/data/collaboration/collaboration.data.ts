import mongoose from '../../../config/mongoose'
import { flatObj, objId } from '../../../utils/misc'
import Collaboration, { ICollaboration } from '../../models/collaboration.model'
import File from '../../models/file.model'
import {
  IGetFileCollaboratorsParams,
  IGetSharedFilesParams,
  IUserPopulatedCollaboration,
  IGetCollaboration
} from './types'
import { Types } from 'mongoose'

export const getFileCollaborators = async ({
  fileId
}: IGetFileCollaboratorsParams): Promise<IUserPopulatedCollaboration[]> => {
  try {
    const data = await Collaboration.find({ resourceId: fileId })
      .populate('userId')
      .select('-fileId')
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSharedFiles = async ({
  userId
}: IGetSharedFilesParams): Promise<any> => {
  try {
    const result = await File.aggregate([
      // Match files that have no folderId
      // { $match: { folderId: { $exists: false } } },

      // Lookup matching collaborations
      {
        $lookup: {
          from: 'collaborations', // The name of the Collaboration collection
          localField: '_id',
          foreignField: 'resourceId',
          as: 'collaboration'
        }
      },

      // Filter collaborations for the specific user and resourceType === 'FILE'
      {
        $addFields: {
          collaboration: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$collaboration',
                  as: 'collab',
                  cond: {
                    $and: [
                      { $eq: ['$$collab.userId', userId] },
                      { $eq: ['$$collab.resourceType', 'FILE'] },
                      { $eq: ['$$collab.status', 'active'] }
                    ]
                  }
                }
              },
              0
            ]
          }
        }
      },

      // Only include files with valid collaboration
      {
        $match: {
          'collaboration.permissionType': { $exists: true }
        }
      },

      // Filter files where isArchived: false and isTrashed: false

      // Project the result to include the file data and permissionType
      {
        $project: {
          _id: 1,
          userId: 1,
          title: 1,
          logline: 1,
          theme: 1,
          folderId: 1,
          typeOfCreation: 1,
          genre: 1,
          subgenre: 1,
          secureStatus: 1,
          pagetarget: 1,
          currentPage: 1,
          createdAt: 1,
          updatedAt: 1,
          isTrashed: 1,
          isArchived: 1,
          isTrashedDate: 1,
          isArchivedDate: 1,
          screenplayVersions: 1,
          permission: '$collaboration.permissionType' // Include the permissionType from collaboration
        }
      }
    ])

    const result2 = await filterFilesWithAccess(result, userId)
    console.log('result2 is ', result2)
    return result2
  } catch (error) {
    console.error(error)
    return []
  }
}
export const filterFilesWithAccess = async (files, userId) => {
  const filteredFiles = []
  for (const file of files) {
    if (file.folderId === null) {
      filteredFiles.push(file)
    } else {
      const folderAccess = await getCollaborationAccess({
        resourceId: file.folderId,
        userId: userId
      })
      if (!folderAccess) {
        filteredFiles.push(file)
      }
    }
  }
  return filteredFiles
}
export const getCollaborationAccess = async ({
  resourceId,
  userId
}: IGetCollaboration): Promise<ICollaboration | null> => {
  try {
    const data = await Collaboration.findOne({
      resourceId: objId(resourceId),
      userId: objId(userId)
    })
    return flatObj(data)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createCollaboration = async ({
  resourceId,
  collaborators,
  resourceType
}: {
  resourceId: string
  collaborators: IGetSharedFilesParams[]
  resourceType: string
}): Promise<any> => {
  console.log('collaborators is ', collaborators)
  console.log('resourceId is ', resourceId)
  console.log('resourceType is ', resourceType)
  try {
    const operations = collaborators?.map(
      ({ userId, permissionType }): any => ({
        updateOne: {
          filter: {
            resourceId: new Types.ObjectId(resourceId),
            userId: new Types.ObjectId(userId)
          },
          update: {
            $set: { permissionType, resourceType }
          },
          upsert: true
        }
      })
    )

    const result = await Collaboration.bulkWrite(operations)
    return result
  } catch (error) {
    // console.error('Error creating collaboration:', error)
    throw new Error('Failed to create collaborations')
  }
}

export const updateCollaboration = async ({
  resourceId,
  collaborators,
  resourceType
}: {
  resourceId: string
  collaborators: IGetSharedFilesParams[]
  resourceType: string
}): Promise<any> => {
  try {
    // Filter out collaborators with permissionType: 'ADMIN'
    const filteredCollaborators = collaborators.filter(
      ({ permissionType }) => permissionType !== 'ADMIN'
    )

    // Prepare the bulk operations for filtered collaborators
    const operations = filteredCollaborators.map(
      ({ userId, permissionType }): any => ({
        updateOne: {
          filter: {
            resourceId: new Types.ObjectId(resourceId),
            userId: new Types.ObjectId(userId)
          },
          update: {
            $set: { permissionType, resourceType }
          },
          upsert: true // Ensure the record is created if it doesn't exist
        }
      })
    )

    // Execute the bulk update operations
    const updateResult = await Collaboration.bulkWrite(operations)

    return {
      updateResult,
      message: 'Collaborators added or updated successfully, excluding ADMINs.'
    }
  } catch (error) {
    console.error('Error updating collaboration:', error)
    throw new Error('Failed to update collaborations')
  }
}

export const deleteCollaboration = async ({
  resourceId,
  userIds
}: {
  resourceId: string
  userIds: string[]
}): Promise<unknown | null> => {
  try {
    const adminAccessUsers = await Collaboration.find({
      resourceId,
      userId: { $in: userIds },
      permissionType: 'ADMIN'
    })
    if (adminAccessUsers.length > 0) {
      return {
        error: 'Cannot delete collaboration for users with ADMIN access.'
      }
    }
    const data = await Collaboration.deleteMany({
      resourceId,
      userId: { $in: userIds }
    })
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteCollaborationsForMultipleResources = async ({
  resourceIds,
  userIds
}: {
  resourceIds: string[]
  userIds: string[]
}): Promise<unknown | null> => {
  try {
    const adminAccessUsers = await Collaboration.find({
      resourceId: { $in: resourceIds },
      userId: { $in: userIds },
      permissionType: 'ADMIN'
    })
    if (adminAccessUsers.length > 0) {
      return {
        error: 'Cannot delete collaboration for users with ADMIN access.'
      }
    }
    const data = await Collaboration.deleteMany({
      resourceId: { $in: resourceIds },
      userId: { $in: userIds }
    })
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteAllCollaboration = async ({
  resourceId
}: {
  resourceId: string
}): Promise<unknown | null> => {
  try {
    const data = await Collaboration.deleteMany({
      resourceId
    })
    return objId(data)
  } catch (error) {
    console.error(error)
    return null
  }
}

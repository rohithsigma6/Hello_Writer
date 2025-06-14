import { PipelineStage } from 'mongoose'
import {
  getFileCollaborators,
  createCollaboration,
  getSharedFiles,
  deleteCollaboration
} from '../../data/collaboration/collaboration.data'
import {
  ICreateCollaborationParams,
  IGetFileCollaboratorsParams,
  IGetSharedFilesParams
} from '../../data/collaboration/types'
import Collaboration from '../../models/collaboration.model'
import File from '../../models/file.model'

export const getSharedFilesService = async ({
  userId
}: IGetSharedFilesParams) => {
  const collaborations = await getSharedFiles({ userId })
  return { collaborations }
}

export const createCollaborationService = async ({
  resourceId,
  collaborators,
  resourceType
}: {
  resourceId: string
  resourceType: string
  collaborators: { userId: string; permissionType: string }[]
}) => {
  return createCollaboration({
    resourceId,
    collaborators,
    resourceType
  })
}

export const getCollaborators = async ({
  resourceId,
  status
}: {
  resourceId: string
  status: string
}) => {
  console.log(resourceId)
  const collab = await Collaboration.find({ resourceId, status }).populate(
    'userId'
  )
  console.log(collab)
  return collab
    ? {
        collab,
        status: 200
      }
    : {
        collab,
        status: 404
      }
}

// export const getSharedFilesWithStatus = async ({
//   userId,
//   page = 1,
//   limit = 10,
//   sort = 'newest',
//   status // status should be "archive" or "trash"
// }: IGetSharedFilesParams): Promise<any> => {
//   console.log('userId', userId)
//   try {
//     if (
//       !status ||
//       (status !== 'archive' && status !== 'trash' && status !== 'active')
//     ) {
//       return [] // Handle undefined or invalid type
//     }

//     const sortOrder = sort === 'oldest' ? 1 : -1 // Determine sort order based on 'sort' parameter

//     const result = await File.aggregate([
//       // Match files that have no folderId
//       { $match: { folderId: { $exists: false } } },

//       // Lookup matching collaborations
//       {
//         $lookup: {
//           from: 'collaborations', // The name of the Collaboration collection
//           localField: '_id',
//           foreignField: 'resourceId',
//           as: 'collaboration'
//         }
//       },

//       // Filter collaborations for the specific user and resourceType === 'FILE'
//       {
//         $addFields: {
//           collaboration: {
//             $arrayElemAt: [
//               {
//                 $filter: {
//                   input: '$collaboration',
//                   as: 'collab',
//                   cond: {
//                     $and: [
//                       { $eq: ['$$collab.userId', userId] },
//                       { $eq: ['$$collab.resourceType', 'FILE'] },
//                       { $eq: ['$$collab.status', status] }
//                     ]
//                   }
//                 }
//               },
//               0
//             ]
//           }
//         }
//       },

//       // Only include files with valid collaboration
//       {
//         $match: {
//           'collaboration.permissionType': { $exists: true }
//         }
//       },

//       // Project the result to include the file data and permissionType
//       {
//         $project: {
//           _id: 1,
//           userId: 1,
//           title: 1,
//           logline: 1,
//           theme: 1,
//           genre: 1,
//           subgenre: 1,
//           secureStatus: 1,
//           pagetarget: 1,
//           createdAt: 1,
//           updatedAt: 1,

//           screenplayVersions: 1,
//           permission: '$collaboration.permissionType'
//         }
//       },

//       // Sort by createdAt based on sortOrder
//       { $sort: { createdAt: sortOrder } },

//       // Pagination
//       { $skip: (page - 1) * limit },
//       { $limit: limit }
//     ])
//     console.log('result', result)
//     return result
//   } catch (error) {
//     console.error(error)
//     return []
//   }
// }

export const getSharedFilesWithStatus = async ({
  userId,
  page = 1,
  limit = 10,
  sort = 'newest',
  status // expected: "archive", "trash" (or "active", if you support it)
}: IGetSharedFilesParams): Promise<{
  totalFiles: number
  files: Array<any>
}> => {
  try {
    // Validate status
    if (
      !status ||
      (status !== 'archive' && status !== 'trash' && status !== 'active')
    ) {
      return { totalFiles: 0, files: [] }
    }

    // Determine sort order (1 = ascending, -1 = descending)
    const sortOrder = sort === 'oldest' ? 1 : -1

    // 1) Base pipeline used by both count and page queries
    const basePipeline = [
      // only files not in any folder
      { $match: { folderId: { $exists: false } } },

      // lookup the collaboration record for this user & file
      {
        $lookup: {
          from: 'collaborations',
          localField: '_id',
          foreignField: 'resourceId',
          as: 'collaboration'
        }
      },
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
                      { $eq: ['$$collab.status', status] }
                    ]
                  }
                }
              },
              0
            ]
          }
        }
      },

      // only keep files where they actually have a permissionType
      { $match: { 'collaboration.permissionType': { $exists: true } } }
    ]

    // 2) Run the count aggregation
    const countResult = await File.aggregate([
      ...basePipeline,
      { $count: 'total' }
    ])
    const totalFiles = countResult[0]?.total ?? 0

    // 3) Run the paginated aggregation
    const pagePipeline = [
      ...basePipeline,

      // project only the fields you need
      {
        $project: {
          _id: 1,
          userId: 1,
          title: 1,
          logline: 1,
          theme: 1,
          genre: 1,
          subgenre: 1,
          secureStatus: 1,
          pagetarget: 1,
          createdAt: 1,
          updatedAt: 1,
          screenplayVersions: 1,
          permission: '$collaboration.permissionType'
        }
      },

      // apply sort, skip & limit
      { $sort: { createdAt: sortOrder } },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ] as PipelineStage[]

    const files = await File.aggregate(pagePipeline as PipelineStage[])

    return {
      totalFiles,
      files
    }
  } catch (error) {
    console.error('getSharedFilesWithStatus error:', error)
    return {
      totalFiles: 0,
      files: []
    }
  }
}

export const deleteCollaborationService = async ({
  resourceId,
  userIds
}: {
  resourceId: string
  userIds: string[]
}) => {
  return await deleteCollaboration({
    resourceId,
    userIds
  })
}

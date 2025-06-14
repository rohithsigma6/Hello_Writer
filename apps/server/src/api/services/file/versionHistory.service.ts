import {
  getFileVersionHistory,
  createVersionHistory
} from '../../data/version-history/version-history.data'
import { updateFileService } from './file.service'
import { omit, result } from 'lodash'
import {
  ICreateVersionHistoryParams,
  IGetFileVersionHistoryListParams,
  IGetFileVersionHistoryParams,
  IUpdateFileVersionHistoryListParams
} from '../../data/version-history/types'
import VersionHistory from '../../models/version-history.model'
import User from '../../models/user.model'

export const getFileVersionHistoryListService = async ({
  fileId,
  versionName
}: IGetFileVersionHistoryListParams): Promise<
  { updatedAt: Date; user: { _id: any; name: string } }[]
> => {
  try {
    let versionHistory = await VersionHistory.findOne({ fileId })
    let versionHistoryDetail = versionHistory.versionHistory.find(
      detail => detail.versionName === versionName
    )
    let screenplayVersions = versionHistoryDetail.screenplayVersions
    if (screenplayVersions.length > 0) {
      let UsersWithScreenplay = await Promise.all(
        screenplayVersions.map(async screenplay => {
          return {
            updatedAt: screenplay.updatedAt,
            user: await User.findById(screenplay.userId).select([
              '_id',
              'firstName',
              'lastName'
            ])
          }
        })
      )
      return UsersWithScreenplay.map(userWithScreenplay => ({
        updatedAt: userWithScreenplay.updatedAt,
        user: {
          _id: userWithScreenplay.user._id,
          name: `${userWithScreenplay.user.firstName} ${userWithScreenplay.user.lastName}`
        }
      }))
    }
    return []
  } catch (error) {
    console.error(error)
    return []
    return []
  }
}
export const getScreenplayToWorkOn = async ({
  fileId,
  versionHistoryDetails
}: any) => {
  // Find the existing versionHistory document by fileId.
  let versionHistory = await VersionHistory.findOne({ fileId })

  // If it doesn't exist, create a new document with an empty versionHistory array.
  if (!versionHistory) {
    versionHistory = new VersionHistory({
      fileId,
      versionHistory: []
    })
  }

  // Try to find an existing versionHistoryDetail by versionName
  let versionHistoryDetail = versionHistory.versionHistory.find(
    detail => detail.versionName === versionHistoryDetails.versionName
  )

  // If not found, create a new one and push it
  if (!versionHistoryDetail) {
    versionHistoryDetail = {
      versionName: versionHistoryDetails.versionName || 'V1', // this will not be changed later
      versionColor: versionHistoryDetails.versionColor || 'White',
      editStatus: versionHistoryDetails.editStatus || 'PERSONAL DRAFT',
      screenplayVersions: [],
      comments: [],
      stashIds: []
    }
    versionHistory.versionHistory.push(versionHistoryDetail)
  } else {
    // Update only versionColor and editStatus (DO NOT update versionName)
    versionHistoryDetail.versionColor = versionHistoryDetails.versionColor
    versionHistoryDetail.editStatus = versionHistoryDetails.editStatus
  }

  // Save the updated document
  await versionHistory.save()

  // Retrieve screenplay from versionIndex if valid, else return latest
  const screenplayVersions = versionHistoryDetail.screenplayVersions
  if (screenplayVersions.length > 0) {
    const index = Number(versionHistoryDetails.versionIndex)
    const { screenplay } =
      !isNaN(index) && screenplayVersions[index]
        ? screenplayVersions[index]
        : screenplayVersions[screenplayVersions.length - 1]

    return screenplay
  }

  return undefined
}

// export const getScreenplayToWorkOn = async ({
//   fileId,
//   versionHistoryDetails
// }: any) => {
//   // Find the existing versionHistory document by fileId.
//   let versionHistory = await VersionHistory.findOne({ fileId })

//   // If it doesn't exist, create a new document with an empty versionHistory array.
//   if (!versionHistory) {
//     versionHistory = new VersionHistory({
//       fileId,
//       versionHistory: []
//     })
//   }

//   // Look for an existing versionHistoryDetail that matches the provided criteria.
//   let versionHistoryDetail = versionHistory.versionHistory.find(
//     detail => detail.versionName === versionHistoryDetails.versionName
//   )

//   console.log(versionHistoryDetail)
//   // If not found, create a new detail and push it into the versionHistory array.
//   if (!versionHistoryDetail) {
//     versionHistoryDetail = {
//       versionName: versionHistoryDetails.versionName || 'V1',
//       versionColor: versionHistoryDetails.versionColor || 'White',
//       editStatus: versionHistoryDetails.editStatus || 'PERSONAL DRAFT',
//       screenplayVersions: [],
//       comments: [],
//       stashIds: []
//     }
//     versionHistory.versionHistory.push(versionHistoryDetail)
//   }
//   versionHistoryDetail.versionName = versionHistoryDetails.versionName
//   versionHistoryDetail.versionColor = versionHistoryDetails.versionColor
//   versionHistoryDetail.editStatus = versionHistoryDetails.editStatus
//   // Save the document.
//   await versionHistory.save()

//   // Retrieve the latest screenplay version (if any) from the detail.
//   const screenplayVersions = versionHistoryDetail.screenplayVersions
//   if (screenplayVersions.length > 0) {
//     const { screenplay } =
//       typeof Number(versionHistoryDetails.versionIndex) === 'number'
//         ? screenplayVersions[Number(versionHistoryDetails.versionIndex)]
//           ? screenplayVersions[Number(versionHistoryDetails.versionIndex)]
//           : screenplayVersions[screenplayVersions.length - 1]
//         : screenplayVersions[screenplayVersions.length - 1]

//     return screenplay
//   }
//   return undefined
// }

// export const updateScreenplayVersionService = async ({
//   fileId,
//   userId,
//   versionName,
//   versionColor,
//   editStatus,
//   screenplay,
// }) => {
//   // Find the VersionHistory document for the given fileId.
//   let versionHistory = await VersionHistory.findOne({ fileId });
//   if (!versionHistory) {
//     versionHistory = new VersionHistory({
//       fileId,
//       versionHistory: [],
//     });
//   }

//   // Look for an existing version detail matching the provided criteria.
//   let versionDetail = versionHistory.versionHistory.find(
//     (detail) =>
//       detail.versionName === versionName &&
//       detail.versionColor === versionColor &&
//       detail.editStatus === editStatus
//   );

//   // If no matching detail exists, create one with an empty screenplayVersions array.
//   if (!versionDetail) {
//     versionDetail = {
//       versionName: versionName || "V1",
//       versionColor: versionColor || "White",
//       editStatus: editStatus || "PERSONAL DRAFT",
//       screenplayVersions: [],
//       comments: [],
//       stashIds: [],
//     };
//     versionHistory.versionHistory.push(versionDetail);
//   }

//   // Get the current time.
//   const now = new Date();
//   // Define the threshold (5 seconds ago).
//   const threshold = new Date(now.getTime() - 5000);

//   // Get the screenplayVersions array.
//   const versions = versionDetail.screenplayVersions;

//   // Check if a last version exists.
//   if (versions.length > 0) {
//     // Assuming the last version has an `updatedAt` field.
//     const lastVersion = versions[versions.length - 1];
//     if (lastVersion.updatedAt && new Date(lastVersion.updatedAt) > threshold) {
//       // If last update was within 5 seconds, update that entry.
//       lastVersion.screenplay = screenplay;
//       lastVersion.userId = userId;
//       lastVersion.updatedAt = now;
//     } else {
//       // Otherwise, push a new entry.
//       versions.push({
//         screenplay,
//         userId,
//         updatedAt: now,
//       });
//     }
//   } else {
//     // No previous versions, so push a new one.
//     versions.push({
//       screenplay,
//       userId,
//       updatedAt: now,
//     });
//   }
//   console.log('versionDetail', versionDetail)
//   // Save the updated VersionHistory document.
//   await versionHistory.save();
//   return versionDetail;
// };
export const updateScreenplayVersionService = async ({
  fileId,
  userId,
  versionName,
  versionColor,
  editStatus,
  screenplay
}) => {
  try {
    if (!fileId || !userId || !screenplay) {
      throw new Error(
        'Missing required parameters: fileId, userId, or screenplay.'
      )
    }

    // Find or create the VersionHistory document
    let versionHistory = await VersionHistory.findOne({ fileId })
    if (!versionHistory) {
      versionHistory = new VersionHistory({
        fileId,
        versionHistory: []
      })
    }

    // Try to find matching version detail
    let versionDetail = versionHistory.versionHistory.find(
      detail =>
        detail.versionName === versionName &&
        detail.versionColor === versionColor &&
        detail.editStatus === editStatus
    )

    if (!versionDetail) {
      versionDetail = {
        versionName: versionName || 'V1',
        versionColor: versionColor || 'White',
        editStatus: editStatus || 'PERSONAL DRAFT',
        screenplayVersions: [],
        comments: [],
        stashIds: []
      }
      versionHistory.versionHistory.push(versionDetail)
    }

    const now = new Date()
    const threshold = new Date(now.getTime() - 60 * 1000 * 15)

    const versions = versionDetail.screenplayVersions

    if (versions.length > 0) {
      const lastVersion = versions[versions.length - 1]
      if (
        lastVersion.updatedAt &&
        new Date(lastVersion.updatedAt) > threshold
      ) {
        lastVersion.screenplay = screenplay
        lastVersion.userId = userId
        lastVersion.updatedAt = now
      } else {
        versions.push({ screenplay, userId, updatedAt: now })
      }
    } else {
      versions.push({ screenplay, userId, updatedAt: now })
    }

    await versionHistory.save()
    return versionDetail
  } catch (error) {
    console.error('Failed to update screenplay version:', error.message)
    return {
      success: false,
      message: 'Failed to update screenplay version.',
      error: error.message
    }
  }
}

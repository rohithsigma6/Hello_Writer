// import mongoose from "mongoose";
// import Stash from "../../models/stash.model";
// import { Types } from "mongoose";
// export interface stashData {
//   fileId: string;
//   title?: string;
//   content: string;
//   userId: Types.ObjectId;
// }

// export const createStashService = async (data: stashData) => {
//   try {
//     let { fileId, title = "Untitled", content, userId } = data;
//     const castUserId = new mongoose.Types.ObjectId(userId);

//     let stash = await Stash.findOne({ fileId });
//     if (!stash) {
//       stash = new Stash({
//         fileId,
//         stashIds: [
//           {
//             _id: new mongoose.Types.ObjectId(),
//             title,
//             content,
//             userId: castUserId,
//           },
//         ],
//       });
//       await stash.save();
//       await stash.populate({
//         path: "stashIds.userId",
//         model: "User",
//         select: "firstName lastName",
//       });

//       return stash.stashIds.map((s) => ({
//         id: s._id.toString(),
//         title: s.title,
//         content: s.content,
//         createdAt: s.createdAt,
//         updatedAt: s.updatedAt,
//         user: s.userId,
//       }));
//     }
//     stash.stashIds.push({
//       _id: new mongoose.Types.ObjectId(),
//       title,
//       content,
//       userId: castUserId,
//     });
//     await stash.save();
//     await stash.populate({
//       path: "stashIds.userId",
//       model: "User",
//       select: "firstName lastName",
//     });
//     return stash.stashIds.map((s) => ({
//       id: s._id.toString(),
//       title: s.title,
//       content: s.content,
//       createdAt: s.createdAt,
//       updatedAt: s.updatedAt,
//       user: s.userId,
//     }));
//   } catch (error) {
//     console.error("Error in createStashService:", error);
//     throw new Error("Failed to create stash entry");
//   }
// };

// export const getStashesService = async (fileId: string) => {
//   const stash = await Stash.findOne({ fileId }).populate({
//     path: "stashIds.userId",
//     model: "User",
//     select: "firstName lastName",
//   });

//   if (!stash) {
//     return {
//       stashes: [],
//     };
//   }

//   return {
//     stashes: stash?.stashIds.map((s) => ({
//       id: s._id.toString(),
//       title: s.title,
//       content: s.content,
//       createdAt: s.createdAt,
//       updatedAt: s.updatedAt,
//       user: s?.userId,
//     })),
//   };
// };

// export const updateStashService = async (
//   fileId: string,
//   stashId: string,
//   updatedMessage?: string,
//   updatedTitle?: string
// ) => {
//   const stash = await Stash.findOne({ fileId });

//   if (!stash) {
//     throw new Error("File not found");
//   }

//   const stashToUpdate = stash.stashIds.find(
//     (s) => s._id.toString() === stashId
//   );

//   if (!stashToUpdate) {
//     throw new Error("Stash not found");
//   }

//   if (updatedMessage) {
//     stashToUpdate.content = updatedMessage;
//   }

//   if (updatedTitle) {
//     stashToUpdate.title = updatedTitle;
//   }

//   stashToUpdate.updatedAt = new Date();

//   await stash.save();
//   await stash.populate({
//     path: "stashIds.userId",
//     model: "User",
//     select: "firstName lastName",
//   });

//   return stash.stashIds.map((s) => ({
//     id: s._id.toString(),
//     title: s.title,
//     content: s.content,
//     createdAt: s.createdAt,
//     updatedAt: s.updatedAt,
//     user: s.userId,
//   }));
// };

// export const removeStashService = async (fileId: string, stashId: string) => {
//   const stash = await Stash.findOne({ fileId });

//   if (!stash) {
//     throw new Error("File not found");
//   }

//   stash.stashIds = stash.stashIds.filter((s) => s._id.toString() !== stashId);

//   await stash.save();
//   await stash.populate({
//     path: "stashIds.userId",
//     model: "User",
//     select: "firstName lastName",
//   });

//   return {
//     message: "Stash removed successfully",
//     updatedStash: stash.stashIds.map((s) => ({
//       id: s._id.toString(),
//       title: s.title,
//       content: s.content,
//       createdAt: s.createdAt,
//       updatedAt: s.updatedAt,
//       user: s.userId,
//     })),
//   };
// };

import mongoose, { Types } from 'mongoose'
import VersionHistory from '../../models/version-history.model'

export interface StashData {
  fileId: string
  title?: string
  content: string
  userId: Types.ObjectId
}

// Create a new stash entry within a specific version.
export const createStashService = async (
  data: StashData,
  versionName: string
) => {
  try {
    let { fileId, title = 'Untitled', content, userId } = data
    const castUserId = new mongoose.Types.ObjectId(userId)
    // Try to find an existing VersionHistory document for the file.
    let versionHistoryDoc = await VersionHistory.findOne({ fileId })

    const versionIndex = versionHistoryDoc.versionHistory.findIndex(
      (version: any) => version.versionName === versionName
    )

    versionHistoryDoc.versionHistory[versionIndex].stashIds.push({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: castUserId
    })

    await versionHistoryDoc.save()
    await versionHistoryDoc.populate({
      path: 'versionHistory.stashIds.userId',
      model: 'User',
      select: 'firstName lastName'
    })

    const version = versionHistoryDoc.versionHistory.find(
      (v: any) => v.versionName === versionName
    )
    return version
      ? version.stashIds.map((s: any) => ({
          id: s._id.toString(),
          title: s.title,
          content: s.content,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          user: s.userId
        }))
      : []
  } catch (error) {
    console.error('Error in createStashService:', error)
    throw new Error('Failed to create stash entry')
  }
}

// Retrieve all stash entries for the given file and version.
export const getStashesService = async (
  fileId: string,
  versionName: string
) => {
  const versionHistoryDoc = await VersionHistory.findOne({ fileId }).populate({
    path: 'versionHistory.stashIds.userId',
    model: 'User',
    select: 'firstName lastName'
  })

  if (!versionHistoryDoc) {
    return { stashes: [] }
  }

  const version = versionHistoryDoc.versionHistory.find(
    (v: any) => v.versionName === versionName
  )

  return {
    stashes: version
      ? version.stashIds.map((s: any) => ({
          id: s._id.toString(),
          title: s.title,
          content: s.content,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          user: s.userId
        }))
      : []
  }
}

// Update an existing stash entry within a specific version.
export const updateStashService = async (
  fileId: string,
  stashId: string,
  versionName: string,
  updatedMessage?: string,
  updatedTitle?: string
) => {
  const versionHistoryDoc = await VersionHistory.findOne({ fileId })

  if (!versionHistoryDoc) {
    throw new Error('File not found')
  }

  const version = versionHistoryDoc.versionHistory.find(
    (v: any) => v.versionName === versionName
  )

  if (!version) {
    throw new Error('Version not found')
  }

  const stashToUpdate = version.stashIds.find(
    (s: any) => s._id.toString() === stashId
  )

  if (!stashToUpdate) {
    throw new Error('Stash not found')
  }

  if (updatedMessage) {
    stashToUpdate.content = updatedMessage
  }

  if (updatedTitle) {
    stashToUpdate.title = updatedTitle
  }

  stashToUpdate.updatedAt = new Date()

  await versionHistoryDoc.save()
  await versionHistoryDoc.populate({
    path: 'versionHistory.stashIds.userId',
    model: 'User',
    select: 'firstName lastName'
  })

  return version.stashIds.map((s: any) => ({
    id: s._id.toString(),
    title: s.title,
    content: s.content,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
    user: s.userId
  }))
}

// Remove a stash entry within a specific version.
export const removeStashService = async (
  fileId: string,
  stashId: string,
  versionName: string
) => {
  const versionHistoryDoc = await VersionHistory.findOne({ fileId })

  if (!versionHistoryDoc) {
    throw new Error('File not found')
  }

  const version = versionHistoryDoc.versionHistory.find(
    (v: any) => v.versionName === versionName
  )

  if (!version) {
    throw new Error('Version not found')
  }

  version.stashIds = version.stashIds.filter(
    (s: any) => s._id.toString() !== stashId
  )

  await versionHistoryDoc.save()
  await versionHistoryDoc.populate({
    path: 'versionHistory.stashIds.userId',
    model: 'User',
    select: 'firstName lastName'
  })

  return {
    message: 'Stash removed successfully',
    updatedStash: version.stashIds.map((s: any) => ({
      id: s._id.toString(),
      title: s.title,
      content: s.content,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      user: s.userId
    }))
  }
}

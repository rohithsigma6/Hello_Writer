import File, { IFile } from '../../models/file.model'
import Folder, { IFolder } from '../../models/folder.model'
import mongoose, { Document } from 'mongoose'
import { ResourceType } from './types'
import { getCollaborationAccess } from '../collaboration/collaboration.data'
import Collaboration from '../../models/collaboration.model'

// export const archiveResourceService = async ({
//     resourceId,
//     resourceType,
//     userId,
//     type
// }: {
//     resourceId: string;
//     resourceType: ResourceType;
//     userId: string;
//     type?: string;
// }): Promise<Document> => {
//     let resource: IFile | IFolder | null;
//     if (resourceType?.toString() === "FILE") {
//         resource = await File.findById(resourceId);
//         if (!resource) {
//             throw new Error("File not found.");
//         }
//         console.log("fkdhsfhdjskfgh")

//     } else if (resourceType?.toString()  === "FOLDER") {
//         resource = await Folder.findById(resourceId);
//         if (!resource) {
//             throw new Error("Folder not found.");
//         }
//         console.log("resource from folder", resource)
//     } else {
//         throw new Error("Invalid resource type.");
//     }

//     console.log("resource.userId.toString()", resource.userId.toString())
//     console.log("userId", userId)
//     if (resource.userId.toString() !== userId) {
//         throw new Error("Not authorized.");
//     }
//     resource.isArchived = true;
//     await resource.save();
//     if (resourceType?.toString()  === "FOLDER") {
//         const updateResult = await File.updateMany(
//             { folderId: resourceId },
//             { isArchived: true }
//         );
//         console.log(`${updateResult.modifiedCount} files archived.`);
//     }
//     return resource;
// };

// working
// export const archiveResourceService = async ({
//   resourceId,
//   resourceType,
//   userId,
//   type
// }: {
//   resourceId: string;
//   resourceType: ResourceType;
//   userId: string;
//   type: "archive" | "trash";
// }): Promise<Document> => {
//   let resource: IFile | IFolder | null;
//   const getAccess = await getCollaborationAccess({
//     resourceId: resourceId,
//     userId: userId?.toString()
//   })
//   console.log("getAccess", getAccess)
//   const allCollaborations = await Collaboration.find({
//     resourceId
//   })
// console.log("allCollaborations", allCollaborations)
// if (resourceType.toString() === "FILE") {
//     resource = await File.findById(resourceId);
//     if (!resource) {
//       throw new Error("File not found.");
//     }
//   } else if (resourceType.toString() === "FOLDER") {
//     resource = await Folder.findById(resourceId);
//     if (!resource) {
//       throw new Error("Folder not found.");
//     }
//   } else {
//     throw new Error("Invalid resource type.");
//   }

//   if (resource.userId.toString() !== userId) {
//     throw new Error("Not authorized.");
//   }

//   if (type === "archive") {
//     resource.isArchived = true;
//     resource.isArchivedDate = new Date();
//   } else if (type === "trash") {
//     resource.isTrashed = true;
//     resource.isTrashedDate = new Date();
//   }

//   await resource.save();

//   if (resourceType.toString() === "FOLDER") {
//     const updateResult = await File.updateMany(
//       { folderId: resourceId },
//       type === "archive" ? { isArchived: true } : { isTrashed: true }
//     );
//     console.log(`${updateResult.modifiedCount} files updated.`);
//   }

//   return resource;
// };

export const changeResourceStatusService = async ({
  resourceIds,
  status,
  userId
}: {
  resourceIds: string[]
  status: 'archive' | 'trash' | 'active'
  userId: string
}): Promise<void> => {
  try {
    console.log('resourceIds', resourceIds)
    console.log('status', status)
    console.log('userId', userId)
    const updateFields = {
      status,
      archivedDate: status === 'archive' ? new Date() : null,
      trashedDate: status === 'trash' ? new Date() : null
    }

    const updateResult = await Collaboration.updateMany(
      { resourceId: { $in: resourceIds }, userId },
      updateFields
    )
    console.log(updateResult)
    if (updateResult.modifiedCount === 0) {
      console.warn(
        'No resources were updated. Please check the resource IDs and user ID.'
      )
    }
  } catch (error) {
    console.error('Error changing resource status:', error)
    throw new Error('Failed to change resource status')
  }
}

export const restoreMultipleResourcesService = async ({
  resourceIds,
  resourceType,
  userId,
  type
}: {
  resourceIds: string[]
  resourceType: ResourceType
  userId: string
  type: string
}): Promise<Document[]> => {
  const restoredResources: Document[] = []

  if (!['archive', 'trash'].includes(type)) {
    throw new Error("Invalid type. Allowed values: 'archive', 'trash'.")
  }

  const updateField =
    type === 'archive' ? { isArchived: false } : { isTrashed: false }

  if (`${resourceType}` === 'FILE') {
    const updatedFiles = await File.updateMany(
      { _id: { $in: resourceIds }, userId },
      updateField
    )
    console.log(`${updatedFiles.modifiedCount} files restored.`)

    // Fetch updated documents to return
    const files = await File.find({ _id: { $in: resourceIds } })
    restoredResources.push(...files)
  } else if (`${resourceType}` === 'FOLDER') {
    // Restore multiple folders
    const updatedFolders = await Folder.updateMany(
      { _id: { $in: resourceIds }, userId },
      updateField
    )
    console.log(`${updatedFolders.modifiedCount} folders restored.`)

    if (type === 'trash') {
      const updatedFiles = await File.updateMany(
        { folderId: { $in: resourceIds } },
        { isTrashed: false }
      )
      console.log(
        `${updatedFiles.modifiedCount} files restored inside folders.`
      )
    }

    const folders = await Folder.find({ _id: { $in: resourceIds } })
    restoredResources.push(...folders)
  } else {
    throw new Error('Invalid resource type.')
  }

  return restoredResources
}

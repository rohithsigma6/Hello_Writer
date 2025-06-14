// import mongoose from 'mongoose'
// import File, { IFile } from '../../models/file.model'

// interface IUpdateScreenplayVersionParams {
//   fileId: string
//   userId: string
//   versionName: string
//   versionColor?: string
//   editStatus?: string
//   screenplay?: Buffer | any
// }

// export const updateScreenplayVersionService = async ({
//   fileId,
//   userId,
//   versionName,
//   versionColor,
//   editStatus,
//   screenplay
// }: IUpdateScreenplayVersionParams): Promise<IFile | null> => {
//   try {
//     // Find the file document
//     const file = await File.findById(fileId)
//     if (!file) {
//       throw new Error('File not found')
//     }

//     // Check if the version already exists
//     const versionIndex = file.screenplayVersions.findIndex(
//       v => v.versionName === versionName
//     )

//     if (versionIndex !== -1) {
//       // Update existing version
//       if (versionColor)
//         file.screenplayVersions[versionIndex].versionColor = versionColor
//       if (editStatus)
//         file.screenplayVersions[versionIndex].editStatus = editStatus
//       if (screenplay)
//         file.screenplayVersions[versionIndex].screenplay = screenplay
//     } else {
//       // Add a new version
//       file.screenplayVersions.push({
//         userId: new mongoose.Types.ObjectId(userId as string),
//         versionName,
//         versionColor: versionColor || 'White',
//         editStatus: editStatus || 'PERSONAL DRAFT',
//         screenplay: screenplay || null
//       })
//     }

//     // Save the updated document
//     const updatedFile = await file.save()
//     return updatedFile
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }

import mongoose from 'mongoose'
import File, { IFile } from '../../models/file.model'
import { updateFile } from '../../data/file/file.data'

interface IUpdateScreenplayVersionParams {
  fileId: string
  userId: string // Expecting a string but will convert to ObjectId
  versionName: string
  versionColor?: string
  editStatus?: string
  screenplay?: Buffer | any
}

// export const updateScreenplayVersionService = async ({
//   fileId,
//   userId,
//   versionName,
//   versionColor,
//   editStatus,
//   screenplay
// }: IUpdateScreenplayVersionParams): Promise<IFile | null> => {
//   try {
//     const file = await File.findById(fileId)
//     if (!file) {
//       throw new Error('File not found')
//     }

//     const versionIndex = file.screenplayVersions.findIndex(
//       v => v.versionName === versionName
//     )
//     if (versionIndex !== -1) {
//       // Update existing version
//       if (versionColor) {
//         file.screenplayVersions[versionIndex].versionColor = versionColor
//       }
//       if (editStatus) {
//         console.log(editStatus)
//         file.screenplayVersions[versionIndex].editStatus = editStatus
//       }
//       if (screenplay) {
//         file.screenplayVersions[versionIndex].screenplay = screenplay
//       }
//     }
//     const updatedFile = await file.save()
//     return updatedFile
//   } catch (error) {
//     console.error(error)
//     return null
//   }
// }

import {
  createCollaboration,
  deleteCollaboration,
  getFileCollaborators,
  getSharedFiles,
  updateCollaboration
} from '../../data/collaboration/collaboration.data'
import { IGetSharedFilesParams } from '../../data/collaboration/types'
import {
  createFile,
  deleteFile,
  getAllFiles,
  getSingleFileByfileId,
  updateFile
} from '../../data/file/file.data'
import {
  ICreateFileParams,
  IGetAllFilesParams,
  IGetSingleOwnedFileParams,
  IUpdateFileParams
} from '../../data/file/types'
import { createVersionHistory } from '../../data/version-history/version-history.data'
import Extractor from '../../../utils/Extractor'

import { DetectFileServiceParams } from './types'
import { formatScreenplay } from '../../helper/file/file.helper'
import { systemCategories } from '../../../utils/script-breakdown.categories'
import { createCategoryHelper } from '../../controllers/category.controller'
import { getSharedFilesWithStatus } from '../collaboration/collaboration.service'

export const createFileService = async ({
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
  collaborators,
  folderId
}: ICreateFileParams) => {
  const file = await createFile({
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
    collaborators,
    folderId
  })

  if (!file) return { file: undefined, status: 500 }

  const adminUser = {
    userId,
    permissionType: 'ADMIN'
  }

  let users: IGetSharedFilesParams[] = [adminUser]

  if (collaborators?.length) {
    users = [...users, ...collaborators]
  }

  await createCollaboration({
    resourceId: file._id.toString(),
    collaborators: users,
    resourceType: 'FILE'
  })

  await createVersionHistory({
    userId,
    fileId: file._id.toString(),
    versionHistory: [
      {
        versionName: 'V1',
        versionColor: 'White',
        editStatus: 'PERSONAL DRAFT'
      }
    ]
  })
  const categoryPromises = systemCategories.map(category =>
    createCategoryHelper({
      name: category.name,
      byAdmin: true,
      color: category.color,
      fileId: file._id.toString()
    })
  )
  await Promise.all(categoryPromises)
  return file
}

export const updateFileService = async ({
  userId,
  fileId,
  title,
  subTitle,
  basedOn,
  prefix,
  typeOfCreation,
  logline,
  theme,
  genre,
  subgenre,
  pagetarget,
  currentPage,
  characters,
  locations,
  collaborators,
  folderId,
  screenplayVersion
}: IUpdateFileParams) => {
  const file = await updateFile({
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
  })

  if (!file) return { file: undefined, status: 500 }

  if (collaborators?.length) {
    await updateCollaboration({
      resourceId: file._id.toString(),
      collaborators,
      resourceType: 'FILE'
    })
  }

  return { file }
}

export const deleteFileService = async ({
  fileId,
  userId,
  permissionType
}: DetectFileServiceParams) => {
  if (permissionType === 'ADMIN') {
    const file = await deleteFile({ fileId })
    await deleteCollaboration({ resourceId: fileId, userIds: [userId] })
    return { file }
  } else {
    await deleteCollaboration({ resourceId: fileId, userIds: [userId] })
    return { success: true, message: 'File deleted successfully' }
  }
}

export const getAllFileService = async ({ userId }) => {
  const allFiles = await getSharedFiles({ userId })
  const myFile: any[] = []
  const collabFiles: any[] = []
  const sharedByMe: any[] = []

  for (const file of allFiles) {
    const collaborators = await getFileCollaborators({ fileId: file._id })
    if (file.permission === 'ADMIN') {
      myFile.push({ ...file, collaborators })
      if (collaborators.length > 1) {
        sharedByMe.push({ ...file, collaborators })
      }
    } else {
      collabFiles.push({ ...file, collaborators })
    }
  }

  return {
    Files: { OWNED: myFile, SHARED: collabFiles, SHAREDBYME: sharedByMe }
  }
}

export const getAllFileWithStatusService = async ({
  userId,
  page,
  limit,
  sort,
  status
}) => {
  const { files: allFiles, totalFiles } = await getSharedFilesWithStatus({
    userId,
    status,
    page,
    limit,
    sort
  })
  for (const file of allFiles) {
    const collaborators = await getFileCollaborators({ fileId: file._id })
    const [collaborator] = collaborators.filter(
      collaborator => userId.toString() === collaborator.userId._id.toString()
    )
    file.collaborator = collaborator
  }

  return { files: allFiles, totalFiles }
}

export const importFileService = async file => {
  try {
    const filename = file?.originalname
    const allowedMimeTypes = ['application/pdf', 'application/octet-stream']
    const allowedExtensions = ['.pdf', '.fdx']
    const fileExtension = filename?.split('.').pop().toLowerCase()

    if (
      !allowedMimeTypes.includes(file.mimetype) ||
      !allowedExtensions.includes(`.${fileExtension}`)
    ) {
      return { message: 'Only PDF and FDX files are allowed.' }
    }

    const extractor = new Extractor(file)

    // Return a new Promise to handle asynchronous parsing
    return new Promise((resolve, reject) => {
      extractor.parseFile((err, parsedData) => {
        if (err) {
          console.error('Error parsing file:', err)
          return reject({ message: 'Error processing the file.' })
        }
        resolve({
          message: 'File received and parsed successfully!',
          parsedData: {
            metadata: parsedData?.metadata,
            ...formatScreenplay(parsedData?.content)
          }
        })
      })
    })
  } catch (error) {
    throw new Error('Error processing the file: ' + error)
  }
}

export const getSingleFileService = async ({
  userId,
  fileId
}: IGetSingleOwnedFileParams) => {
  let { file, status } = await getSingleFileByfileId({
    fileId,
    userId
  })
  if (file) {
    return { file, status }
  } else return { file, status }
}

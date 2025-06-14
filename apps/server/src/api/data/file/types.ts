import mongoose from 'mongoose'
import { IGetSharedFilesParams } from '../collaboration/types'

export interface IGetSingleOwnedFileParams {
  userId?: string
  fileId: string
}

export interface IGetSingleFileByfileIdParams {
  fileId: string
}

export interface ICreateFileParams {
  userId: string
  title: string
  subTitle: string
  logline: string
  theme: string
  genre: string[]
  subgenre: string[]
  basedOn: string
  typeOfCreation: string
  pagetarget: number
  importedFile?: string
  characters?: Record<string, any>
  locations?: Record<string, any>
  collaborators?: IGetSharedFilesParams[]
  folderId?: mongoose.Schema.Types.ObjectId
  isArchived?: boolean
  isTrashed?: boolean
  isArchivedDate?: Date
  isTrashedDate?: Date
}

export interface IUpdateFileParams {
  userId: string
  fileId: string
  folderId?: mongoose.Schema.Types.ObjectId
  title?: string
  subTitle?: string
  logline?: string
  basedOn?: string
  typeOfCreation?: string
  prefix?: string
  isArchived?: boolean
  isTrashed?: boolean
  isArchivedDate?: Date
  isTrashedDate?: Date
  theme?: string
  genre?: string[]
  subgenre?: string[]
  collaborators?: IGetSharedFilesParams[]
  characters?: Record<string, any>
  locations?: Record<string, any>
  currentPage?: number
  pagetarget?: number
  screenplayVersion?: {
    userId: mongoose.Schema.Types.ObjectId
    versionName: string
    versionColor: string
    editStatus: string
    screenplay: Buffer | any
  }
}

export interface IDeleteFileParams {
  fileId: string
}

export interface IGetAllFilesParams {
  userId: string
}

import mongoose, { Document, Schema } from 'mongoose'
import { IGetSharedFilesParams } from '../data/collaboration/types'
import {
  editStatusEnum,
  prefixEnum,
  typeOfCreationEnum,
  versionColorEnum
} from '../constants/file.constants'

export interface IFile extends Document {
  userId: mongoose.Schema.Types.ObjectId
  folderId?: mongoose.Schema.Types.ObjectId
  title?: string
  subTitle?: string
  prefix?: string
  basedOn?: string
  typeOfCreation?: string
  fileImage: string
  logline: string
  theme: string
  genre: string[]
  subgenre: string[]
  pagetarget?: number
  currentPage?: number
  secureStatus?: boolean
  importedFile?: string
  characters?: Record<string, any>
  locations?: Record<string, any>
  screenplayVersions: {
    userId: any
    versionName: string
    versionColor: string
    editStatus: string
    screenplay: Buffer | any
    _id: string
  }[]

  ttl?: Date // TTL field
}

const FileSchema = new Schema<IFile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: false, default: 'untitled' },
    subTitle: { type: String, required: false },
    basedOn: { type: String, required: false },
    typeOfCreation: { type: String, required: false, enum: typeOfCreationEnum },
    fileImage: { type: String, required: false },
    prefix: {
      type: String,
      required: false,
      default: 'Written by',
      enum: prefixEnum
    },
    screenplayVersions: {
      type: [
        new Schema(
          {
            userId: {
              type: Schema.Types.ObjectId,
              ref: 'User',
              required: true
            },
            versionName: { type: String, required: false, default: 'V1' },
            versionColor: {
              type: String,
              required: false,
              default: 'White',
              enum: versionColorEnum
            },
            editStatus: {
              type: String,
              required: false,
              default: 'PERSONAL DRAFT',
              enum: editStatusEnum
            },
            screenplay: { type: Buffer, required: false }
          },
          // { _id: false } // Disable _id for each element in screenplayVersions
        )
      ],
      required: true
    },
    logline: { type: String, required: false },
    theme: { type: String, required: false },
    genre: { type: [String], required: false },
    subgenre: { type: [String], required: false },
    secureStatus: { type: Boolean, required: false, default: false },
    characters: { type: Schema.Types.Mixed, required: false },
    locations: { type: Schema.Types.Mixed, required: false },
    pagetarget: { type: Number, required: false, default: 120 },
    currentPage: { type: Number, required: false, default: 0 },
    folderId: { type: Schema.Types.ObjectId, ref: 'Folder', required: false },
    ttl: { type: Date, required: false } // TTL field for file delete
  },
  { timestamps: true }
)

FileSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 })

const File = mongoose.model<IFile>('File', FileSchema)

export default File

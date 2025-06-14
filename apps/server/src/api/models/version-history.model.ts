import mongoose, { Document, Schema, Types } from 'mongoose'
import { prefixEnum, typeOfCreationEnum } from '../constants/file.constants'

export interface IScreenplayVersion {
  screenplay: Buffer
  userId: mongoose.Schema.Types.ObjectId
  updatedAt: Date
}

export interface IVersionDetail {
  _id?: any
  versionName: string
  versionColor: string
  editStatus: string
  screenplayVersions: IScreenplayVersion[]
  comments: {
    id: string
    message: string
    userId: mongoose.Schema.Types.ObjectId
    lastUpdatedAt: Date
    replies: {
      id: string
      message: string
      userId: mongoose.Schema.Types.ObjectId
      lastUpdatedAt: Date
    }[]
  }[]
  stashIds: {
    _id: Types.ObjectId
    title: string
    content: string
    createdAt?: Date
    updatedAt?: Date
    userId: Types.ObjectId
  }[]
  versionId?: string
}

export interface IVersionHistory extends Document {
  userId: mongoose.Schema.Types.ObjectId
  fileId: mongoose.Schema.Types.ObjectId
  versionHistory: IVersionDetail[]
}

// Sub-schema for screenplay versions with an updatedAt field.
const screenplayVersionSchema = new Schema(
  {
    screenplay: { type: Buffer, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    updatedAt: { type: Date, default: Date.now }
  },
  { _id: false }
)

// Schema for a single version detail.
const versionDetailSchema = new Schema({
  versionName: { type: String, required: false },
  versionColor: { type: String, required: false },
  editStatus: { type: String, required: false },
  versionId: { type: String, required: false },
  screenplayVersions: [screenplayVersionSchema],
  comments: [
    {
      id: { type: String, required: false },
      message: { type: String, required: false },
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
      lastUpdatedAt: { type: Date, required: false },
      replies: [
        {
          id: { type: String, required: false },
          message: { type: String, required: false },
          userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
          },
          lastUpdatedAt: { type: Date, required: false }
        }
      ]
    }
  ],
  stashIds: [
    {
      _id: { type: Schema.Types.ObjectId, auto: true },
      title: { type: String, required: false },
      content: { type: String, required: false },
      createdAt: { type: Date, required: false },
      updatedAt: { type: Date, required: false },
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: false }
    },
    { timestamps: true }
  ]
})

// Main VersionHistory schema.
const versionHistorySchema = new Schema<IVersionHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fileId: { type: Schema.Types.ObjectId, ref: 'File', required: true },
    versionHistory: [versionDetailSchema]
  },
  { timestamps: true }
)

const VersionHistory = mongoose.model<IVersionHistory>(
  'VersionHistory',
  versionHistorySchema
)

export default VersionHistory

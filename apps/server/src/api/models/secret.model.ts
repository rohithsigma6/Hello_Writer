import mongoose, { Document, Schema } from 'mongoose'

export interface ISecret extends Document {
  userId: mongoose.Schema.Types.ObjectId
  hash?: string
  salt?: string
  emailHash?: string
  recoverHash?: string
  lastEmailHash?: Date
  lastRecoverHash?: Date
  isMfaActive?: boolean
  twoFactorSecret?: string
}

const secretSchema = new Schema<ISecret>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hash: { type: String },
    salt: { type: String },
    emailHash: { type: String },
    recoverHash: { type: String },
    lastEmailHash: { type: Date },
    lastRecoverHash: { type: Date },
    isMfaActive: { type: Boolean, default: false },
    twoFactorSecret: { type: String }
  },
  { timestamps: true }
)

const Secret = mongoose.model<ISecret>('Secret', secretSchema)

export default Secret

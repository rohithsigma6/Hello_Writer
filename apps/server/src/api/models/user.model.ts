//@ts-nocheck
import mongoose, { Document, Schema } from 'mongoose'

export enum UserRole {
  PRODUCER = 'producer',
  WRITER = 'writer'
}

export interface IUser extends Document {
  firstName?: string
  lastName?: string
  profile_image: string
  phoneNo?: string
  email: string
  googleId?: string
  lifetimeRegistered?: boolean
  role?: UserRole
  isAdmin?: boolean
  isVerified?: boolean
  colorCode?: string
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    profile_image: { type: String },
    phoneNo: { type: String },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, default: '' },
    role: { type: String, enum: UserRole, default: 'writer' },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    colorCode: { type: String, default: '#5593CC' },
    lifetimeRegistered: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User

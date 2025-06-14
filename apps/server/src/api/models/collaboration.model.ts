import mongoose, { Document, Schema } from 'mongoose'

export enum PermissionType {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  ADMIN = 'ADMIN',
  SUGGEST = 'SUGGEST'
}

export enum ResourceType {
  FILE = 'FILE',
  FOLDER = 'FOLDER'
}

export interface ICollaboration extends Document {
  userId: mongoose.Schema.Types.ObjectId
  resourceId: mongoose.Schema.Types.ObjectId
  resourceType: ResourceType
  permissionType: PermissionType
  status: Status
  archivedDate?: Date
  trashedDate?: Date
  ttl?: Date // TTL field
}

export enum Status {
  ACTIVE = 'active',
  ARCHIVED = 'archive',
  TRASHED = 'trash'
}

const CollaborationSchema = new Schema<ICollaboration>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resourceId: { type: Schema.Types.ObjectId, required: true },
    resourceType: { type: String, enum: ResourceType, required: true },
    status: { type: String, enum: Status, default: Status.ACTIVE },
    archivedDate: { type: Date, required: false },
    trashedDate: { type: Date, required: false },
    permissionType: {
      type: String,
      enum: PermissionType,
      default: PermissionType.VIEW
    },
    ttl: { type: Date, required: false } // TTL field
  },
  { timestamps: true }
)
CollaborationSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 })

const Collaboration = mongoose.model<ICollaboration>(
  'Collaboration',
  CollaborationSchema
)

export default Collaboration

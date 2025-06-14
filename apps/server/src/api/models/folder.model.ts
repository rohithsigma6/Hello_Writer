import mongoose, { Document, Schema } from 'mongoose'

export interface IFolder extends Document {
  userId: mongoose.Schema.Types.ObjectId
  title: string
  Files: mongoose.Schema.Types.ObjectId[]

  ttl?: Date
}

const folderSchema = new Schema<IFolder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    Files: [{ type: Schema.Types.ObjectId, ref: 'File', required: false }],

    ttl: { type: Date, required: false }
  },
  { timestamps: true }
)

folderSchema.index({ ttl: 1 }, { expireAfterSeconds: 0 })

const Folder = mongoose.model<IFolder>('Folder', folderSchema)

export default Folder

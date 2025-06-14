import mongoose, { Document, Schema } from 'mongoose';

export interface IFileRevison extends Document {
  fileId: mongoose.Schema.Types.ObjectId;
  color: string[];
  createdDate: Date[];
}

const FileRevisionSchema = new Schema<IFileRevison>(
  {
    fileId: { type: Schema.Types.ObjectId, required: true, unique: true },
    color: { type: [String], default: ['white'] },
    createdDate: { type: [Date], default: [new Date()] },
  },
  { timestamps: true }
);

const FileRevision = mongoose.model<IFileRevison>(
  'FileRevision',
  FileRevisionSchema
);

export default FileRevision;

import mongoose, { Document, Schema } from 'mongoose';
export interface IComment extends Document {
  fileId: mongoose.Schema.Types.ObjectId;
  comments: {
    id: string;
    message: string;
    userId: mongoose.Schema.Types.ObjectId;
    lastUpdatedAt: Date;
    replies: {
      id: string;
      message: string;
      userId: mongoose.Schema.Types.ObjectId;
      lastUpdatedAt: Date;
    }[];
  }[];
}

const commentSchema = new Schema<IComment>({
  fileId: { type: Schema.Types.ObjectId, ref: 'File', required: true },
  comments: [
    {
      id: { type: String, required: true },
      message: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      lastUpdatedAt: { type: Date, default: new Date() },
      replies: [
        {
          id: { type: String, required: true },
          message: { type: String, required: true },
          lastUpdatedAt: { type: Date, default: new Date() },
          userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        },
      ],
    },
  ],
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;

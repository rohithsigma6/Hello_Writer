import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  content: string;
  roomId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  isGroup: boolean;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: { type: String, trim: true },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
    isGroup: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;

import mongoose, { Document, Schema } from 'mongoose'

interface IChat extends Document {
  fileId: mongoose.Schema.Types.ObjectId
  email: string
  googleId?: string
  role?: 'producer' | 'writer'
  isAdmin?: boolean
  isVerified?: boolean
  colorCode?: string
}

const chatSchema = new Schema<IChat>(
  {
    fileId: {
      type: Schema.Types.ObjectId,
      ref: 'File',
      required: true
    },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, default: '' },
    role: { type: String, enum: ['producer', 'writer'] },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    colorCode: { type: String, default: '#5593CC' }
  },
  { timestamps: true }
)

const Chat = mongoose.model<IChat>('Chat', chatSchema)

export default Chat

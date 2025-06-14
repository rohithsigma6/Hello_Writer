import mongoose, { Document, Schema } from "mongoose";

export interface IEditorContent extends Document {
  userId:mongoose.Schema.Types.ObjectId;
  fileId:mongoose.Schema.Types.ObjectId;
  sceneId:mongoose.Schema.Types.ObjectId;
  content?: Record<string, any>;
  isDeleted:boolean;
}

const editorContentSchema = new Schema<IEditorContent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    sceneId: { type: Schema.Types.ObjectId, ref: "Scene", required: true },
    content:{type:Schema.Types.Mixed},
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const EditorContent = mongoose.model<IEditorContent>("EditorContent", editorContentSchema);

export default EditorContent;
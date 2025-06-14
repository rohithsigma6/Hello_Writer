import { Schema, model, Types } from "mongoose";
import { IReaction, ReactionSchema } from "./scene-comment-reaction.model";



interface IComment {
  sceneId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string; // Comment content
  createdAt: Date;
  updatedAt?: Date; // If edited, updatedAt will be set
  isEdited: boolean;
}

const CommentSchema = new Schema<IComment>(
  {
    sceneId: { type: Schema.Types.ObjectId, ref: "Scene", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, // Optional field for tracking edits
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SceneComment = model<IComment>("SceneComment", CommentSchema);

export default SceneComment;

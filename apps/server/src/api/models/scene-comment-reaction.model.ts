import { model, Schema, Types } from "mongoose";

export interface IReaction {
    userId: Types.ObjectId;
    type: string; // Reaction type, e.g., "like", "laugh", etc.
    createdAt: Date;
    commentId: Types.ObjectId
  }
export const ReactionSchema = new Schema<IReaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true }, // E.g., "like", "love", "angry"
    createdAt: { type: Date, default: Date.now },
    commentId:{type: Schema.Types.ObjectId, ref: "SceneComment", required: true}
  },
);
const SceneCommentReaction = model<IReaction>("SceneCommentReaction", ReactionSchema);

export default SceneCommentReaction
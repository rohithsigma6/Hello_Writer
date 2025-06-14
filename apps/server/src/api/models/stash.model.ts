import mongoose, { Document, Types, Schema } from "mongoose";

export interface IStash extends Document {
  fileId: Types.ObjectId;
  stashIds: {
    _id: Types.ObjectId;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId: Types.ObjectId;
  }[];
}

const stashSchema = new Schema<IStash>(
  {
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    stashIds: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        title: { type: String },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

stashSchema.path("stashIds").schema.add({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Stash = mongoose.model<IStash>("Stash", stashSchema);
export default Stash;

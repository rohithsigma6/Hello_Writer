import mongoose, { Document, Schema } from "mongoose";

// Interface for Color Selection
interface IPlotColor {
  value: string;
}

// Interface for Selected Scene
interface ISelectedScene {
  sceneId: mongoose.Schema.Types.ObjectId;
  title: string;
}

// Interface forStory Line
export interface IPlotThread extends Document {
  sceneId: mongoose.Schema.Types.ObjectId;
  fileId: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  title: string;
  descriptions?: Object;
  characters: mongoose.Schema.Types.ObjectId[]; // References Character model
  color: string;
  connectedScenes: ISelectedScene[];
  slug: string;
  status: "draft" | "published"; // Save Draft or Create
  isDeleted?: boolean;
}

// Schema for Plot Color Selection
const PlotColorSchema = new Schema<IPlotColor>({
  value: { type: String, required: true },
});

//Story Line Schema
const PlotThreadSchema = new Schema<IPlotThread>(
  {
    sceneId: { type: mongoose.Schema.Types.ObjectId, ref: "SceneCard", required: false},
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    descriptions: { type: Object },
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character", required: true }],
    // characters:{type: String, required: true},
    color: { type: String, required: true },
    connectedScenes: [{ type: mongoose.Schema.Types.ObjectId, ref: "SceneCard", required: true }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create Model
const PlotThread = mongoose.model<IPlotThread>("PlotThread", PlotThreadSchema);

export default PlotThread;

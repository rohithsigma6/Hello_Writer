import mongoose, { Document, Schema } from "mongoose";
import { ILocation, locationSchema } from "./location.model"; // Import location schema for embedding

// Define the StoryWorld interface
export interface IStoryWorld extends Document {
  createdBy: mongoose.Schema.Types.ObjectId;
  fileId: mongoose.Schema.Types.ObjectId;
  genre: string;
  subGenre: string;
  conflict: string;
  natureOfStory: string;
  structure: string;
  setting: string[];
  tone: string[];
  manualYear: string;
  globalHistoricalPeriod: string[];
  indiaSpecificHistoricalPeriod: string[];
  year: string;
  worldAssociation: string;
  locations: ILocation[]; // Use Location interface
}

const storyWorldSchema = new Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true },
    genre: [{ type: String,default:""}],
    subGenre: [{ type: String,default:""}],
    conflict: { type: String, required: false },
    natureOfStory: { type: String, required: false },
    structure: { type: String, required: false },
    setting: { type: [String], required: false },
    tone: { type: [String], required: false },
    globalHistoricalPeriod: { type: [String], required: false },
    indiaSpecificHistoricalPeriod: { type: [String], required: false },
    year: { type: String, required: false },
    manualYear: {type: String,default:""},
    worldAssociation: { type: String, required: false },
    locations: [locationSchema], // Embed Location schema here
  },
  { timestamps: true }
);

const StoryWorld = mongoose.model<IStoryWorld>("StoryWorld", storyWorldSchema);

export default StoryWorld;

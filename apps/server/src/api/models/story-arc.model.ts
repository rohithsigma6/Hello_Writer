import mongoose, { Document, Schema } from "mongoose";

export interface IStoryArc extends Document {
  createdBy: mongoose.Schema.Types.ObjectId;
  fileId: mongoose.Schema.Types.ObjectId;
  title: string;
  storylineCharacters: string[];
  isAutomatically: boolean;
  summary: string;
  properties: {
    color: string;
    // moodChart: {
    //   moodValue: number;
    //   point: number;
    // }[];
  };
  storyArc: {
    events: {
      name: string;
      description?: string;
      direction?: string;
      value?: number;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for Story Arc
const storyArcSchema = new Schema<IStoryArc>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    title: { type: String, required: true },
    storylineCharacters: { type: [String], required: false },
    isAutomatically: { type: Boolean, default: false },
    summary: { type: String, required: false },
    properties: {
      color: { type: String, default: "#0000FF" }, // Default color is blue
      //   moodChart: [
      //     {
      //       moodValue: { type: Number, required: true },
      //       point: { type: Number, required: true },
      //     },
      //   ],
    },
    storyArc: {
      events: [
        {
          name: { type: String, required: true },
          description: { type: String, required: false },
          direction: {
            type: String,
            required: false,
          },
          value: { type: Number, default: 0, required: false },
        },
      ],
    },
  },
  { timestamps: true }
);

const StoryArc = mongoose.model<IStoryArc>("StoryArc", storyArcSchema);

export default StoryArc;

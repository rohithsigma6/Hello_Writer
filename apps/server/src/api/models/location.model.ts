import mongoose, { Schema, Document } from "mongoose";

// Image interface
export interface IImage {
  url: string;
  isPrimary: boolean;
}

// Reusable Mongoose schema for images
export const imageSchema = new mongoose.Schema<IImage>(
  {
    url: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
  },
);

export interface ISubLocation {
  [x: string]:
  any;
  name: string;
  description?: string;
  images?: IImage[];
  importance?: string;
  dramaticFunction?: string;
  feel?: string;
  isDeleted?: boolean;
}

// Define the Location interface
export interface ILocation extends Document {
  fileId?: mongoose.Schema.Types.ObjectId;
  userId?: mongoose.Schema.Types.ObjectId;
  name: string;
  subLocation?: ISubLocation[];  // Now using the ISubLocation interface
  description?: string;
  images?: IImage[];
  type?: string;
  importance?: string;
  dramaticFunction?: string;
  feel?: string;
  isDeleted?: boolean;
}

// Define the SubLocation schema
const subLocationSchema = new mongoose.Schema<ISubLocation>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    images: [imageSchema],
    importance: { type: String },
    dramaticFunction: { type: String },
    feel: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
);

// Define the Location schema
export const locationSchema = new mongoose.Schema<ILocation>(
  {
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    subLocation: [subLocationSchema],
    name: { type: String, required: true },
    description: { type: String, required: false },
    images: [imageSchema],
    type: { type: String, required: false },
    importance: { type: String },
    dramaticFunction: { type: String },
    feel: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Location = mongoose.model<ILocation>("Location", locationSchema);

export default Location;

// const mongoose = require("mongoose");
import mongoose, { Document, Schema } from "mongoose";

export interface ITag extends Document {
  createdBy?: mongoose.Schema.Types.ObjectId; 
  categoryId: mongoose.Schema.Types.ObjectId; 
  fileId: mongoose.Schema.Types.ObjectId; 
  sceneId: mongoose.Schema.Types.ObjectId; 
  byAdmin:string;
  name: string;                 
  notes?: string;
  isDeleted?: boolean;
  overallOccurrence:number;
  scenesOccurrence:number;
  scenes: {
    sceneId: {
        type: typeof Schema.Types.ObjectId;
        ref: string;
        required: true;
    };
    occurrence: {
        type: NumberConstructor;
        default: number;
    };
}[]
}


const tagSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: false },
    fileId: { type: mongoose.Schema.ObjectId, ref: "File", required: false },
    categoryId: { type: mongoose.Schema.ObjectId, ref: "Category", required: true },
    sceneId: { type: mongoose.Schema.ObjectId, ref: "Scene", required: false },
    byAdmin: {type: Boolean,default:false},
    name: { type: String , required:true},
    notes: { type: String ,default:''},
    isDeleted: {type:Boolean, default:false},
    overallOccurrence: { type: Number ,default:1},
    scenesOccurrence: {type:Number, default:1},
    scenes: [
      {
        sceneId: { type: mongoose.Schema.ObjectId, ref: "Scene", required: true },
        occurrence: { type: Number, default: 1 }, // Track occurrences in each scene
      },
    ],
  },
  { timestamps: true }
);

const Tag = mongoose.model<ITag>("Tag", tagSchema);


export default Tag;

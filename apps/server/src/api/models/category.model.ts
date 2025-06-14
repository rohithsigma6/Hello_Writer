// const mongoose = require("mongoose");
import mongoose, { Document } from "mongoose";


export interface ICategory extends Document {
  createdBy: mongoose.Schema.Types.ObjectId; 
  // sceneId?: mongoose.Schema.Types.ObjectId; 
  fileId: mongoose.Schema.Types.ObjectId; 
  byAdmin:string;
  name: string;                 
  color?: string;
  isDeleted?: boolean;
  notes?:string
}


const categorySchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: false },
    fileId: { type: mongoose.Schema.ObjectId, ref: "File", required: true },
    // sceneId: { type: mongoose.Schema.ObjectId, ref: "Scene", required: false },
    byAdmin: {type: Boolean,default:false},
    name: { type: String , required:true},
    notes: { type: String , required:false, default:""},
    color: { type: String, default:'#fffff'},
    isDeleted: {type:Boolean, default:false}
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);


export default Category;

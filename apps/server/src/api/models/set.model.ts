import mongoose, { Document, Schema } from "mongoose";

export interface ISet extends Document {
  fileId:mongoose.Schema.Types.ObjectId;
  filmLocationId: mongoose.Schema.Types.ObjectId
  name: string;
  description:string;
  isDeleted:boolean;

}

const setSchema = new Schema<ISet>(
  {
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    filmLocationId: { type: Schema.Types.ObjectId, ref: "filmLocation", required: false },
    name:{type:String,default:""},
    description: { type: String , default: ""},
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const Set = mongoose.model<ISet>("Set", setSchema);

export default Set;
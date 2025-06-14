import mongoose, { Document, Schema } from "mongoose";

export interface IFilmLocation extends Document {
  fileId:mongoose.Schema.Types.ObjectId;
  name: string;
  street: string;
  postalCode: string;
  cityAndState: string;
  country: string;
  file:string;
  // contactInfo:mongoose.Schema.Types.ObjectId;
  // contacts:[mongoose.Schema.Types.ObjectId];
  note:string;
  isDeleted:boolean;
}

const filmLocationSchema = new Schema<IFilmLocation>(
  {
    fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
    name:{type:String,required:true},
    street:{type:String,default:""},
    postalCode: { type: String , default: ""},
    cityAndState: { type: String , default: ""},
    country: { type: String , default: ""},
    file: { type: String , default: ""},
    // contactInfo: { type: Schema.Types.ObjectId, ref: "locationContactInfo", required: false },
    // contacts: [{ type: Schema.Types.ObjectId, ref: "contact", required: false }],
    note: { type:String,default:""},
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const FilmLocation = mongoose.model<IFilmLocation>("FilmLocation", filmLocationSchema);

export default FilmLocation;
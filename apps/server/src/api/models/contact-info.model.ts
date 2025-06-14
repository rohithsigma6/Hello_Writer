import mongoose, { Document, Schema } from "mongoose";

export interface IContactInfo extends Document {
  locationId:mongoose.Schema.Types.ObjectId;
  website: string;
  email: string;
  phoneHome:string;
  phoneCell:string;
  fax: string;
  isDeleted:boolean;
}

const contactInfoSchema = new Schema<IContactInfo>(
  {
    locationId: { type: Schema.Types.ObjectId, ref: "FilmLocation", required: true },
    website:{ type:String, default:"" },
    email: { type: String , default: ""},
    phoneHome: { type: String , default: ""},
    phoneCell: { type: String , default:"" },
    fax: { type:String , default:"" },
    isDeleted:{ type:Boolean , defaul:false }
  },
  { timestamps: true }
);

const ContactInfo = mongoose.model<IContactInfo>("ContactInfo", contactInfoSchema);

export default ContactInfo;
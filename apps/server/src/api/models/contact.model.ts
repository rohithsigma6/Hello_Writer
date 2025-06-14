import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  email: string;
  message?: string
}

const contactSchema = new Schema<IContact>(
  {
    firstName: { type: String },
    lastName: { type: String },
    phoneNo: { type: String },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
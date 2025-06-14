import mongoose, { Document, Schema } from "mongoose";
import { IGetSharedFilesParams } from "../data/collaboration/types";

export interface IFeedback extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    feedback_title: string;
    feedback_type: string;
    feedback_text: string;
    attached_file: string;
    star_rating: Number;
    status: string;
}

const FeedbackSchema = new Schema<IFeedback>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        feedback_type: { type: String, enum: ["Bug Report", "Feature Suggestion", "General Feedback"], default: "General Feedback" },
        feedback_title:  { type: String },
        feedback_text: { type: String },
        attached_file: { type: String },
        star_rating: { type: Number },
        status: { 
            type: String, 
            enum: ["Pending", "Resolved", "In Progress"], 
            default: "Pending" 
        }
    },
    { timestamps: true }
);

const Feedback = mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export default Feedback;

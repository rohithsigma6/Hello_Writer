import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uploadFeedbackFile } from "../helper/multimedia/multimedia";
import Feedback from "../models/feedback.model";

const giveFeedback = asyncHandler(async (req: Request, res: Response) => {
    const { feedback_type, feedback_text, star_rating } = req.body;
    const user = req.user;
    let attached_file = "";
    try {
        if (req.file) {
            const file_url = await uploadFeedbackFile(req.file, user._id)
            attached_file = file_url
        }
        await Feedback.create({
            userId: user._id,
            feedback_type, feedback_text, star_rating, attached_file
        })
        res.status(201).json({ success: true, message: "Feedback Given successfully" });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the Feedback" });
    }
});
export default {
    giveFeedback,
};

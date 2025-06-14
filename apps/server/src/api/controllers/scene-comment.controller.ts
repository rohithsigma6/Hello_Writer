import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import SceneComment from "../models/scene-comment.model";
import mongoose from "../../config/mongoose";
import SceneCommentReaction from "../models/scene-comment-reaction.model";


const createComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const { sceneId } = req.params
    const userId = req.user._id

    if (!sceneId) {
        res.status(400).json({ message: "Missing sceneId in params" })
        return;
    }

    const { content } = req.body;

    if (!sceneId || !userId || !content) {
        res.status(400).json({ error: "sceneId, userId, and content are required." });
        return
    }

    try {
        const newComment = await SceneComment.create({
            sceneId,
            userId,
            content,
        });

        res.status(201).json(newComment);
    }
    catch (error) {
        console.log("🚀 ~ error:", error)

    }
})

const getCommentsByScene = expressAsyncHandler(async (req: Request, res: Response) => {
    const { sceneId } = req.params
    const userId = req.user._id

    if (!sceneId) {
        res.status(400).json({ success: false, message: "Missing sceneId in params" })
        return;
    }

    try {
        const commentsWithReactions = await SceneComment.aggregate([
            { 
                $match: { sceneId: new mongoose.Types.ObjectId(sceneId) } 
            },
            {
                $lookup: {
                    from: "scenecommentreactions", // Replace with the correct collection name
                    localField: "_id", // Assuming SceneComment has an _id
                    foreignField: "commentId", // Foreign key in SceneCommentReaction collection
                    as: "reactions", // Name of the field where reactions will be stored
                },
            },
            {
                $lookup: {
                    from: "users", // Replace with your actual users collection name
                    localField: "userId", // SceneComment's userId field
                    foreignField: "_id", // Users' _id field
                    as: "user",
                },
            },
            { 
                $unwind: "$user" // Unwind to access user details directly
            },
            {
                $addFields: {
                    createdBy: {
                        _id: "$user._id",
                        firstName: "$user.firstName",
                        lastName: "$user.lastName",
                        email: "$user.email",
                        color: "$user.colorCode",
                        userName: {
                            $concat: ["$user.firstName", " ", "$user.lastName"], // Concatenate first and last name
                        },
                        shortName: {
                            $concat: [
                                { $substr: ["$user.firstName", 0, 1] }, // First letter of firstName
                                { $substr: ["$user.lastName", 0, 1] }  // First letter of lastName
                            ],
                        },
                    },
                },
            },
            {
                $project: {
                    user: 0, // Exclude the full user object after extracting details
                },
            },
            {
                $addFields: {
                    reactionsGrouped: {
                        $map: {
                            input: {
                                $reduce: {
                                    input: "$reactions", // Get all reactions of the comment
                                    initialValue: [],
                                    in: {
                                        $cond: {
                                            if: { $in: ["$$this.type", "$$value"] }, // If reaction type already in array
                                            then: "$$value",
                                            else: { $concatArrays: ["$$value", ["$$this.type"]] }, // Otherwise, add new type
                                        },
                                    },
                                },
                            },
                            as: "reactionType",
                            in: {
                                type: "$$reactionType",
                                count: {
                                    $size: {
                                        $filter: {
                                            input: "$reactions",
                                            as: "reaction",
                                            cond: { $eq: ["$$reaction.type", "$$reactionType"] },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    isEdited: 1,
                    createdBy: 1, // Include the createdBy field
                    reactionsGrouped: 1, // Include dynamically grouped reactions with counts
                },
            },
        ]);
        
          
          
        // console.log("🚀 ~ getCommentsByScene ~ comments:", commentsWithReactions)
        res.status(200).json({ success: true, comments:commentsWithReactions })
        return
    }
    catch (error) {
        console.log("🚀 ~ getCommentsByScene ~ error:", error)

    }
})

const addReactionToComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    const { type } = req.body;

    if (!commentId) {
        res.status(400).json({ message: "Missing commentId in params" });
        return;
    }

    try {
        // Check if the user already reacted with any type
        const existingReaction = await SceneCommentReaction.findOne({ commentId, userId });
        console.log("🚀 ~ addReactionToComment ~ existingReaction:", existingReaction)

        if (existingReaction) {
            // If the reaction type is the same, remove it (toggle reaction)
            if (existingReaction.type === type) {
                await existingReaction.deleteOne();
                res.status(200).json({ message: "Reaction removed." });
                return 
            }
            
            // If the type is different, update the reaction to the new type
            existingReaction.type = type;
            await existingReaction.save();
            res.status(200).json({ message: "Reaction updated.", reaction: existingReaction });
            return 
        }

        // Add the new reaction if no existing reaction
        // const createBody = {
        //     commentId,
        //     userId,
        //     type,
        // }
        // console.log("🚀 ~ addReactionToComment ~ createBody:", createBody)
        const newReaction = await SceneCommentReaction.create({
            commentId,
            userId,
            type,
        });
        console.log("🚀 ~ addReactionToComment ~ newReaction:", newReaction)

        res.status(200).json(newReaction);
    } catch (error) {
        res.status(500).json({ error: "Failed to add or update reaction.", details: error });
    }
});


const updateComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.params;
    console.log("🚀 ~ updateComment ~ commentId:", commentId)
    const userId = req.user._id; // Assuming `req.user` is populated via authentication middleware

    if (!commentId) {
        res.status(400).json({ message: "Missing commentId in params." });
        return;
    }

    const { content } = req.body;
    console.log("🚀 ~ updateComment ~ content:", content)

    if (!content) {
        res.status(400).json({ error: "Content is required to update the comment." });
        return;
    }

    try {
        // Find the comment to verify the author
        const comment = await SceneComment.findById(commentId);

        if (!comment) {
            res.status(404).json({ error: "Comment not found." });
            return;
        }

        // Check if the current user is the author of the comment
        if (comment.userId.toString() !== userId.toString()) {
            res.status(403).json({ error: "You are not authorized to update this comment." });
            return;
        }

        // Update the comment
        const updatedComment = await SceneComment.findByIdAndUpdate(
            commentId,
            { content, isEdited: true, updatedAt: new Date() },
            { new: true }
        );

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


const deleteComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.params
    const userId = req.user._id

    if (!commentId) {
        res.status(400).json({ message: "Missing sceneId in params" })
        return;
    }
    const comment = await SceneComment.findById(commentId);
    console.log("🚀 ~ deleteComment ~ comment:", comment)
    if (!comment) {
        res.status(404).json({ error: "Comment not found." });
        return;
    }
    // Check if the current user is the author of the comment
    if (comment.userId.toString() !== userId.toString()) {
        res.status(403).json({ error: "You are not authorized to delete this comment." });
        return;
    }
    await SceneCommentReaction.deleteMany({ commentId: commentId });
    await comment.deleteOne()

    res.status(200).json({ message: "Comment and its reactions deleted successfully." });
    return
})

export default {
    deleteComment,
    updateComment,
    addReactionToComment,
    getCommentsByScene,
    createComment
}
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Scene, { IScene } from "../models/scene.model";
import EditorContent, { IEditorContent } from "../models/editor-content.model";
import Set, { ISet } from "../models/set.model";
import { handleTag } from "./tag.controller";
import mongoose from "../../config/mongoose";
import {
  generateTitleSummaryService,
  processContent,
} from "../services/scene/scene.services";
import Tag from "../models/tag.model";
import Category from "../models/category.model";

function generateSceneTitles(
  scene: any,
  setDetail: any
): { sceneTitle: string; sceneSubtitle: string } {
  if (!scene) {
    return { sceneTitle: "", sceneSubtitle: "" }; // Return empty strings if scene is falsy
  }

  const titleParts = [scene.environment, setDetail?.name, scene.time].filter(
    Boolean
  ); // Exclude undefined, null, or falsy values

  const sceneNumber = scene.sceneNumber ? `${scene.sceneNumber}` : "";

  const sceneTitle =
    (scene.sceneNumber ? `${scene.sceneNumber}. ` : "") +
    (scene.environment ? `${scene.environment} ` : "") +
    (setDetail?.name ? `${setDetail?.name} - ` : "") +
    (scene.time ?? "");
  console.log("🚀 ~ sceneTitle:", sceneTitle);

  const sceneSubtitle = titleParts.join(" - ");

  return {
    sceneTitle,
    sceneSubtitle,
  };
}

const getAllScenes = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // console.log("Get All scene");
    const fileId = req.query.fileId;
    var scenes = await Scene.find({
      fileId: fileId,
      isDeleted: false,
    })
      .sort({ createdAt: 1 })
      .lean();
    // console.log("scene =>", scenes);
    for (var i = 0; i < scenes.length; i++) {
      const setDetail = await Set.findOne(
        { _id: scenes[i]?.setId, isDeleted: false },
        { name: 1 }
      ).lean();
      const { sceneTitle, sceneSubtitle } = generateSceneTitles(
        scenes[i],
        setDetail
      );
      scenes[i]["sceneTitle"] = sceneTitle;
      scenes[i]["sceneSubtitle"] = sceneSubtitle;
    }
    res.ok({ scenes });
    return;
  }
);

const createScene = expressAsyncHandler(async (req: Request, res: Response) => {
  const {
    title,
    description,
    fileId,
    setId,
    estimatedMin,
    estimatedSec,
    characters,
    scheduleMin,
    scheduleSec,
    screenplay,
    userId,
    sceneNumber,
    scriptDay,
    notes,
    pointInTime,
    time,
    environment,
    pages,
    extras,
    filmLocationId,
  } = req.body;

  if (!fileId || sceneNumber === undefined || !userId) {
    res.status(400).json({
      success: false,
      error: "Missing either of these: userId, title, fileId",
    });
    return;
  }

  const createdScene = await Scene.create({
    title,
    description,
    fileId,
    estimatedMin,
    estimatedSec,
    scheduleMin,
    scheduleSec,
    setId,
    screenplay,
    userId,
    characters,
    sceneNumber,
    scriptDay,
    time,
    environment,
    pages,
    notes,
    pointInTime,
    filmLocationId,
  });
  // for (const tagId of characters){

  // }
  const characters_extras = [...characters, ...extras].filter(Boolean);
  const updatedTags = await Promise.all(
    characters_extras?.map((tagId) =>
      handleTag({
        searchParams: {
          ids: [tagId],
        },
        sceneId: createdScene._id.toString(),
        updateOptions: {
          userId: req.user.id,
        },
      })
    )
  );
  // const updatedTag = await Tag.findByIdAndUpdate(
  //     existingTag._id,
  //     {
  //         $push: { scenes: { sceneId, occurrence: 1 } },
  //         $inc: { overallOccurrence: 1, scenesOccurrence: 1 },
  //     },
  //     { new: true }
  // );
  console.log("🚀 ~ createScene ~ updatedTags:", updatedTags);

  const createEditorContent = await EditorContent.create({
    sceneId: createdScene._id,
    userId: userId,
    fileId: fileId,
  });
  console.log("🚀 ~ createScene ~ createEditorContent:", createEditorContent);
  res.ok({ createdScene });
  return;
});

// const updateSceneInfo = expressAsyncHandler(async (req: Request, res: Response) => {
//     const { notes,sceneId, setId } = req.body
//     if (!sceneId) {
//         res.status(400).json({ success: false, error: "Missing SceneId" })
//         return
//     }

//     const updatedScene = await Scene.updateOne(
//         { _id: sceneId },
//         { $set: { notes} }
//     );
//     if (updatedScene.modifiedCount === 0) {
//         res.status(500).json({ success: false, error: "Failed to update scene" });
//         return
//     }
//     res.status(200).json({ success: true, message: "Scene updated successfully" });
//     return

// });

const updateSceneDetails = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, summary, sceneId } = req.body;
    if (!sceneId) {
      res.status(400).json({ success: false, error: "Missing SceneId" });
      return;
    }
    // Fetch the existing scene
    const existingScene = await Scene.findById(sceneId);
    if (!existingScene) {
      res.status(404).json({ success: false, error: "Scene not found" });
      return;
    }

    // Retain old values if title or description is missing
    const updatedTitle = title ?? existingScene.title;
    const updatedSummary = summary ?? existingScene.description;

    // Perform the update
    const updatedScene = await Scene.updateOne(
      { _id: sceneId },
      { $set: { title: updatedTitle, summary: updatedSummary } }
    );

    if (updatedScene.modifiedCount === 0) {
      res.status(500).json({ success: false, error: "Failed to update scene" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Scene updated successfully" });
    return;
  }
);

const returnSceneById = async (sceneId) => {
  const scene = await Scene.findById(sceneId).lean();
  const setDetail = await Set.findOne(
    { _id: scene?.setId, isDeleted: false },
    { name: 1 }
  ).lean();
  if (scene) {
    const titleParts = [
      scene.sceneNumber + ".",
      scene.environment,
      setDetail?.name ?? "-",
      scene.time,
    ].filter(Boolean); // Exclude undefined, null, or falsy values

    const subtitleParts = [
      scene.environment,
      setDetail?.name,
      scene.time,
    ].filter(Boolean);

    scene["sceneTitle"] = titleParts.join(" "); // Join parts with a space
    scene["sceneSubtitle"] = subtitleParts.join("-"); // Join parts with a hyphen
  }
  let sceneNumber = scene?.sceneNumber;
  let prevScene;
  let nextScene;
  if (sceneNumber) {
    prevScene = await Scene.findOne({
      sceneNumber: { $lt: sceneNumber },
      isDeleted: false,
    })
      .sort({ sceneNumber: -1 })
      .lean();
    nextScene = await Scene.findOne({
      sceneNumber: { $gt: sceneNumber },
      isDeleted: false,
    })
      .sort({ sceneNumber: 1 })
      .lean();
  }
  if (prevScene) {
    const titleParts = [
      prevScene.sceneNumber + ".",
      prevScene.environment,
      setDetail?.name ?? "-",
    ].filter(Boolean); // Exclude undefined, null, or falsy values
    const subtitleParts = [
      prevScene.environment,
      setDetail?.name,
      prevScene.time,
    ].filter(Boolean);
    prevScene["sceneTitle"] = titleParts.join(" "); // Join parts with a space
    prevScene["sceneSubtitle"] = subtitleParts.join("-"); // Join parts with a hyphen
  }
  if (nextScene) {
    const titleParts = [
      nextScene.sceneNumber + ".",
      nextScene.environment,
      setDetail?.name ?? "-",
    ].filter(Boolean); // Exclude undefined, null, or falsy values
    const subtitleParts = [
      nextScene.environment,
      setDetail?.name,
      nextScene.time,
    ].filter(Boolean);
    nextScene["sceneTitle"] = titleParts.join(" "); // Join parts with a space
    nextScene["sceneSubtitle"] = subtitleParts.join("-"); // Join parts with a hyphen
  }
  return {
    scene,
    prevScene,
    nextScene,
  };
};

const getSceneById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { sceneId } = req.query;
    if (!sceneId) {
      res.status(400).json({ success: false, error: "Missing SceneID!!! " });
      return;
    }

    const { scene, prevScene, nextScene } = await returnSceneById(sceneId);
    res.ok({ scene, prevScene, nextScene });
    return;
  }
);

const deleteScene = expressAsyncHandler(async (req: Request, res: Response) => {
  const { fileId, sceneId } = req.params;
  if (!sceneId) {
    res.status(400).json({ success: false, error: "Missing SceneID!!! " });
    return;
  }
  const scene = await Scene.findByIdAndUpdate(sceneId, { isDeleted: true });
  if (scene) {
    const foundContent = await EditorContent.findOne({
      sceneId: sceneId,
      fileId: fileId,
      isDeleted: false,
    }).lean();
    foundContent
      ? await EditorContent.findByIdAndUpdate(foundContent?._id, {
          isDeleted: true,
        })
      : null;
    res.status(200).json({ message: "Successfully Deleted" });
  } else {
    res.status(400).json({ success: false, error: "Error to Delete Scene" });
  }
});

// Validation functions
const validateObjectId = (id: any): id is mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId.isValid(id);
};

const validateTimeField = (value: unknown): value is number => {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
};

const updateSceneInfo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { sceneId, ...updates } = req.body;

    // Validate sceneId
    if (!sceneId || !validateObjectId(sceneId)) {
      res.status(400).json({
        success: false,
        error: "Invalid or missing sceneId",
      });
      return;
    }

    try {
      // Initialize update object
      const updateFields: { [key: string]: any } = {};

      // Validate and process each update field
      for (const [key, value] of Object.entries(updates)) {
        // Skip undefined or null values
        if (value === undefined || value === null) continue;

        // Validate specific fields
        switch (key) {
          case "setId":
          case "filmLocationId":
            if (!validateObjectId(value)) {
              throw new Error(`Invalid setId format`);
            }
            updateFields[key] = new mongoose.Types.ObjectId(value);
            break;

          case "estimatedMin":
          case "estimatedSec":
          case "scheduleMin":
          case "scheduleSec":
            if (!validateTimeField(value)) {
              throw new Error(`Invalid ${key} format`);
            }
            updateFields[key] = value;
            break;

          case "environment":
          case "time":
          case "pages":
            if (typeof value !== "string") {
              throw new Error(`Invalid ${key} format`);
            }
            updateFields[key] = value;
            break;

          case "description":
          case "notes":
          case "scriptDay":
          case "sceneNumber":
          case "pointInTime":
          case "locations":
          case "summary":
          case "title":
            // Allow mixed types for these fields as per schema
            updateFields[key] = value;
            break;

          default:
            // Ignore any fields that aren't in our schema
            console.warn(`Ignoring unknown field: ${key}`);
            break;
        }
      }
      // If no valid updates, return early
      if (Object.keys(updateFields).length === 0) {
        res.status(400).json({
          success: false,
          error: "No valid update fields provided",
        });
        return;
      }

      // Perform the update
      const updatedScene = await Scene.updateOne(
        {
          _id: sceneId,
          isDeleted: false, // Only update if not deleted
        },
        { $set: updateFields },
        { runValidators: true } // Run mongoose validations
      );

      if (updatedScene.matchedCount === 0) {
        res.status(404).json({
          success: false,
          error: "Scene not found or already deleted",
        });
        return;
      }

      if (updatedScene.modifiedCount === 0) {
        res.status(400).json({
          success: false,
          error: "No changes were made to the scene",
        });
        return;
      }
      // const updatedScene = await returnSceneById(sceneId)
      // Success response
      res.status(200).json({
        success: true,
        message: "Scene updated successfully",
        updatedFields: Object.keys(updateFields),
        updatedScene,
      });
    } catch (error) {
      // Handle specific validation errors
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
        return;
      }

      // Handle unknown errors
      res.status(500).json({
        success: false,
        error: "Internal server error while updating scene",
      });
    }
  }
);

const getFileStatistics = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { fileId } = req.params;
      if (!fileId) {
        res.status(400).json({ success: false, message: "Missing fileId" });
        return;
      }
      const tagCount = await Tag.countDocuments({ fileId, isDeleted: false });
      console.log("🚀 ~ getFileStatistics ~ tagCount:", tagCount);
      const tags = await Tag.aggregate([
        // Step 1: Lookup Category to match the name
        {
          $match: {
            $and: [
              { fileId: new mongoose.Types.ObjectId(fileId as string) },
              { isDeleted: false },
            ],
          },
        },
        {
          $lookup: {
            from: "categories", // Collection name for Category
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        // Step 2: Unwind the category array for easier filtering
        {
          $unwind: "$category",
        },
        {
          $match: {
            "category.name": "Characters", // Add the match step to filter by category name
          },
        },
        // Step 3: Lookup Scene for each scene in scenes array
        {
          $lookup: {
            from: "scenes", // Collection name for Scene
            localField: "scenes.sceneId",
            foreignField: "_id",
            as: "sceneDetails",
          },
        },
        {
          $match: {
            sceneDetails: { $ne: [] }, // Only include tags that have valid sceneDetails
          },
        },
        // Step 4: Project the required fields
        {
          $project: {
            _id: 1, // Exclude internal ID if not needed
            count: "$scenesOccurrence",
            name: 1,
            isDeleted: 1,
            sceneNumbers: {
              $map: {
                input: "$sceneDetails", // Map over the joined sceneDetails
                as: "scene",
                in: "$$scene.sceneNumber", // Extract the sceneNumber field
              },
            },
          },
        },
      ]);

      const sets = await Scene.aggregate([
        // Step 1: Match scenes by fileId
        {
          $match: {
            fileId: new mongoose.Types.ObjectId(fileId as string),
            setId: { $ne: null }, // Only consider scenes with a set
          },
        },
        // Step 2: Lookup the Set collection
        {
          $lookup: {
            from: "sets", // Collection name for the "Set" model
            localField: "setId",
            foreignField: "_id",
            as: "setDetails",
          },
        },
        // Step 3: Unwind setDetails for easier access
        {
          $unwind: "$setDetails",
        },
        // Step 4: Group by setId and collect stats
        {
          $group: {
            _id: "$setDetails._id",
            name: { $first: "$setDetails.name" },
            sceneNumbers: { $push: "$sceneNumber" },
            count: { $sum: 1 }, // Count the number of scenes
          },
        },
        // // Step 5: Project the desired fields
        {
          $project: {
            _id: 0, // Exclude the internal ID
            name: 1,
            count: 1,
            sceneNumbers: 1,
          },
        },
      ]);

      const totalScenes = await Scene.countDocuments({
        fileId,
        isDeleted: false,
      });
      const totalDocuments = await EditorContent.countDocuments({
        fileId,
        isDeleted: false,
        sceneId: { $ne: null, $exists: true }, // Ensure sceneId is not null and exists
      });
      res.status(200).json({
        success: true,
        characters: tags,
        sets,
        totalScenes,
        totalDocuments,
      });
      return;
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching tags by category name");
    }
  }
);

const generateTitleSummary = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // const { sceneId } = req.body
    const flag = req.query.flag;
    const sceneId = req.query.sceneId;
    const fileId = req.query.fileId;
    if (!sceneId) {
      res.status(400).json({ success: false, error: "Missing SceneID! " });
      return;
    }
    if (!fileId) {
      res.status(400).json({ success: false, error: "Missing SceneID! " });
      return;
    }
    const scene = await Scene.findById(sceneId).lean();
    console.log("SCENE =>", scene);
    if (!scene) {
      res.status(404).json({ success: false, error: "Scene not found" });
    }
    const editorContent = await EditorContent.findOne({
      sceneId: sceneId,
      isDeleted: false,
    }).lean();
    console.log("editorContent =>", editorContent);
    if (!editorContent || !editorContent.content) {
      res.status(400).json({
        success: false,
        message: "Content for this scene does not exist",
      });
      return;
    }
    const characterObj = await Category.findOne(
      { name: "Characters", isDeleted: false, byAdmin: true, fileId: fileId },
      { _id: 1, name: 1 }
    ).lean();
    console.log("Characterobj", characterObj);
    if (!characterObj) {
      res
        .status(400)
        .json({ success: false, error: "Character category is missings" });
      return;
    }
    const characters = await Tag.find(
      {
        fileId: new mongoose.Types.ObjectId(fileId as string),
        categoryId: new mongoose.Types.ObjectId(characterObj?._id as string),
        isDeleted: false,
      },
      { _id: 0, name: 1 }
    ).lean();
    console.log("Character", characters);
    const text: string = await processContent(editorContent.content as any);
    console.log("Text =>", text);

    const data = await generateTitleSummaryService(
      text,
      flag as string,
      characters
    );
    console.log("Data =>", data);
    res.status(200).json({ success: true, data });
  }
);
export default {
  createScene,
  getAllScenes,
  getSceneById,
  updateSceneDetails,
  updateSceneInfo,
  deleteScene,
  getFileStatistics,
  generateTitleSummary,
};

/* eslint-disable import/no-anonymous-default-export */
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import SceneCard, { ISceneCard } from "../models/scene-card.model";
import { uploadCommonImage } from "../helper/multimedia/multimedia";
import PlotThread from "../models/plot-thread.model";

const createOrUpdateScene = async (req: Request, res: Response) => {
    try {
        const { _id, id, fileId, type, location,order,beatName, timeOfDay, title, brief, selectedTemplate, sceneEssentials, sceneCauseandEffect, characters, act } = req.body;
        const userId = req.user._id;
        let sceneData: any = { createdBy: userId, selectedTemplate };
        let imageUrls: Record<string, string> = {};
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const imageUrl = await uploadCommonImage(file, userId);
                imageUrls[file.fieldname] = imageUrl;
            }
        }
        const matchFilter = { fileId, act, order: { $gte: order } };

        console.log('Shifting scenes using filter:', matchFilter);
    
        const updated = await SceneCard.updateMany(matchFilter, {
          $inc: { order: 1 },
        });
        //   console.log(updated)
      
        if (selectedTemplate === "none") {
            sceneData.fileId = fileId;
            sceneData.type = type;
            sceneData.location = location;
            sceneData.timeOfDay = timeOfDay;
            sceneData.title = title;
            sceneData.brief = brief;
            // if (imageUrls["scene[photo]"]) {
            //     sceneData.photo = imageUrls["scene[photo]"];
            // }
        } else {
            if (!fileId) {
                return res.status(400).json({ message: "fileId is required." });
            }
            sceneData = { type, act,order,beatName, fileId, location, timeOfDay, title, brief, createdBy: userId, selectedTemplate, characters };
            const validTemplates = ["freeform", "sceneEssentials", "sceneCauseandEffect", "none"];
            if (!validTemplates.includes(selectedTemplate)) {
                return res.status(400).json({ message: `Invalid selectedTemplate. Must be one of: ${validTemplates.join(", ")}` });
            }
            if (selectedTemplate === "freeform") {
                sceneData.fileId = fileId;
                sceneData.type = type;
                sceneData.location = location;
                sceneData.timeOfDay = timeOfDay;
                sceneData.title = title;
                sceneData.brief = brief;
            }
            if (selectedTemplate === "sceneEssentials") {
                if (!sceneEssentials) return res.status(400).json({ message: "sceneEssentials data is required." });
                if (imageUrls["sceneEssentials[photo]"]) {
                    sceneEssentials.photo = imageUrls["sceneEssentials[photo]"];
                }
                sceneData.sceneEssentials = sceneEssentials;
            }
            if (selectedTemplate === "sceneCauseandEffect") {
                if (!sceneCauseandEffect) return res.status(400).json({ message: "sceneCauseandEffect data is required." });
                if (sceneCauseandEffect.proactiveScene && imageUrls["sceneCauseandEffect[proactiveScene][photo]"]) {
                    sceneCauseandEffect.proactiveScene.photo = imageUrls["sceneCauseandEffect[proactiveScene][photo]"];
                }
                if (sceneCauseandEffect.reactiveScene && imageUrls["sceneCauseandEffect[reactiveScene][photo]"]) {
                    sceneCauseandEffect.reactiveScene.photo = imageUrls["sceneCauseandEffect[reactiveScene][photo]"];
                }
                sceneData.sceneCauseandEffect = sceneCauseandEffect;
            }
        }
        if (req.body.status) {
            sceneData.status = req.body.status;
        }

        let scene;
        if (_id) {
            // console.log(req.body)
            scene = await SceneCard.findByIdAndUpdate(_id, req.body, { new: false });
        } else {

            scene = await SceneCard.create(sceneData);
        }

        res.status(200).json({ message: "Scene saved successfully.", scene });
    } catch (error) {
        // console.error("Error processing scene:", error);
        res.status(400).json({ message: "Error processing scene", error });
    }
};

const createSceneWithTemplet = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { _id, fileId, act,beatName, order,type, location, timeOfDay, title, brief, characters, selectedTemplate, freeform, sceneEssentials, sceneCauseandEffect } = req.body;
        // console.log("id is hehe ", _id)
        if (!fileId) {
            return res.status(400).json({ message: "fileId is required." });
        }

        let scene = _id ? await SceneCard.findById(_id) : null;
        let imageUrls: Record<string, string> = {};

        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const imageUrl = await uploadCommonImage(file, userId);
                imageUrls[file.fieldname] = imageUrl;
            }
        }

        // Assign scenePhoto if uploaded
        const scenePhoto = imageUrls["scenePhoto"] || null;

        if (scene) {
            if (scenePhoto) scene.scenePhoto = scenePhoto;
        }

        const matchFilter = { fileId, act, order: { $gte: order } };

        console.log('Shifting scenes using filter:', matchFilter);
    
        const updated = await SceneCard.updateMany(matchFilter, {
          $inc: { order: 1 },
        });

        // Handle "freeform" template
        if (selectedTemplate === "freeform") {
            if (scene) {
                scene.fileId = fileId;
                scene.type = type;
                scene.location = location;
                scene.timeOfDay = timeOfDay;
                scene.title = title;
                scene.brief = brief;
            }
            scene = new SceneCard({ fileId,beatName, order,act, createdBy: userId, selectedTemplate, freeform, scenePhoto });

            await scene.save();
            return res.status(200).json({ message: "Scene saved successfully.", scene });
        }

        // Validate templates
        const validTemplates = ["sceneEssentials", "sceneCauseandEffect"];
        if (!validTemplates.includes(selectedTemplate)) {
            return res.status(400).json({
                message: `Invalid selectedTemplate. Must be one of: ${validTemplates.join(", ")}`,
            });
        }

        // Handle "sceneEssentials"
        if (selectedTemplate === "sceneEssentials") {
            if (!sceneEssentials) {
                return res.status(400).json({ message: "sceneEssentials data is required." });
            }

            if (imageUrls["sceneEssentials[photo]"]) {
                sceneEssentials.photo = imageUrls["sceneEssentials[photo]"];
            }

            if (scene) {
                scene.sceneEssentials = sceneEssentials;
                scene.characters = characters;
            } else {
                scene = new SceneCard({ fileId,order,beatName, act, createdBy: userId, selectedTemplate, sceneEssentials, scenePhoto });
            }

            await scene.save();
            return res.status(200).json({ message: "Scene saved successfully.", scene });
        }

        // Handle "sceneCauseandEffect"
        if (selectedTemplate === "sceneCauseandEffect") {
            if (!sceneCauseandEffect) {
                return res.status(400).json({ message: "sceneCauseandEffect data is required." });
            }

            if (sceneCauseandEffect.proactiveScene) {
                if (imageUrls["sceneCauseandEffect[proactiveScene][photo]"]) {
                    sceneCauseandEffect.proactiveScene.photo = imageUrls["sceneCauseandEffect[proactiveScene][photo]"];
                }
            }

            if (sceneCauseandEffect.reactiveScene) {
                if (imageUrls["sceneCauseandEffect[reactiveScene][photo]"]) {
                    sceneCauseandEffect.reactiveScene.photo = imageUrls["sceneCauseandEffect[reactiveScene][photo]"];
                }
            }

            if (scene) {
                scene.sceneCauseandEffect = sceneCauseandEffect;
            } else {
                scene = new SceneCard({ fileId,order, beatName,act, createdBy: userId, selectedTemplate, sceneCauseandEffect, scenePhoto });
            }

            await scene.save();
            return res.status(200).json({ message: "Scene saved successfully.", scene });
        }

    } catch (error) {
        console.error("Error saving scene:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllScenes = asyncHandler(async (req: Request, res: Response) => {
    try {
        const scenes = await SceneCard.find({ isDeleted: false })
            .populate("plotThreadId").populate("characters");

        const groupedScenes = scenes.reduce((acc, scene) => {
            const status = scene.status || "draft";
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(scene);
            return acc;
        }, {} as Record<string, ISceneCard[]>);
        res.status(200).json(groupedScenes);
    } catch (error) {
        console.error("Error fetching scenes:", error);
        res.status(500).json({ message: "Error fetching scenes", error });
    }
});

const updateSceneStatus = (async (req: Request, res: Response) => {
    try {
        const { sceneId } = req.params;
        const status = req.body.status
        const updatedScene = await SceneCard.findByIdAndUpdate(
            sceneId,
            { status },
            { new: true }
        );

        if (!updatedScene) {
            return res.status(404).json({ message: "Scene not found" });
        }

        res.status(200).json({
            message: "Scene status updated to finalize.",
            scene: updatedScene
        });

    } catch (error) {
        console.error("Error updating scene status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const createPlotThread = async (req: Request, res: Response) => {
    try {
        const { fileId, sceneId, title, descriptions, characters, color, connectedScenes, status } = req.body;

        // Create a new PlotThread
        const newPlotThread = await PlotThread.create({
            fileId,
            sceneId,
            title,
            descriptions,
            characters,
            color,
            connectedScenes,
            status: status || "draft",
            createdBy: req.user?._id, // Assuming authentication middleware sets req.user
        });

        const pushedCard = await SceneCard.findByIdAndUpdate(
            sceneId,
            { $push: { plotThreadId: newPlotThread._id } },
            { new: true }
        );
        // console.log(pushedCard)

        res.status(201).json({
            message: " Story Line created successfully.",
            plotThread: newPlotThread,
        });
    } catch (error) {
        console.error("Error creatingStory Line:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
const getPlotThreadByFileId = async (req: Request, res: Response) => {
    try {
        const { fileId } = req.params;
        
        if (!fileId) {
            return res.status(400).json({ message: "File ID is required." });
        }

        const plotThreads = await PlotThread.find({ fileId }).lean();

        if (plotThreads.length === 0) {
            return res.status(404).json({ message: "NoStory Lines found for the given File ID." });
        }

        res.status(200).json({ plotThreads });
    } catch (error) {
        console.error("Error fetchingStory Lines:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updatePlotThread = async (req: Request, res: Response) => {
    try {
        const { plotThreadId } = req.params;
        const { title, descriptions, characters, color, connectedScenes, status } = req.body;

        // Find and update theStory Line
        const updatedPlotThread = await PlotThread.findByIdAndUpdate(
            plotThreadId,
            { title, descriptions, characters, color, connectedScenes, status },
            { new: true, runValidators: true }
        );

        if (!updatedPlotThread) {
            return res.status(404).json({ message: " Story Line not found" });
        }

        res.status(200).json({
            message: " Story Line updated successfully",
            plotThread: updatedPlotThread,
        });
    } catch (error) {
        console.error("Error updatingStory Line:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deletePlotThread = async (req: Request, res: Response) => {
    try {
        const { plotThreadId } = req.params;

        // Find and delete theStory Line
        const deletedPlotThread = await PlotThread.findByIdAndDelete(plotThreadId);

        if (!deletedPlotThread) {
            return res.status(404).json({ message: " Story Line not found" });
        }

        // Remove the plotThreadId from the associated scene
        await SceneCard.findByIdAndUpdate(
            deletedPlotThread.sceneId,
            { $pull: { plotThreadId: plotThreadId } },
            { new: true }
        );

        res.status(200).json({ message: " Story Line deleted successfully" });
    } catch (error) {
        console.error("Error deletingStory Line:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a single SceneCard by ID
const getSceneById = (async (req: Request, res: Response) => {
    try {
        const scene = await SceneCard.findById(req.params.id).populate("plotThreadId").populate("characters");
        if (!scene || scene.isDeleted) {
            return res.status(404).json({ message: "Scene not found" });
        }
        res.status(200).json(scene);
    } catch (error) {
        res.status(500).json({ message: "Error fetching scene", error });
    }
});

// Update a SceneCard
const updateScene = (async (req: Request, res: Response) => {
    try {
        const scene = await SceneCard.findById(req.params.id);
        if (!scene || scene.isDeleted) {
            return res.status(404).json({ message: "Scene not found" });
        }
        const updatedScene = await SceneCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedScene);
    } catch (error) {
        res.status(500).json({ message: "Error updating scene", error });
    }
});

// Soft delete a SceneCard
const deleteScene = (async (req: Request, res: Response) => {
    try {
        const scene = await SceneCard.findById(req.params.id);
        if (!scene || scene.isDeleted) {
            return res.status(404).json({ message: "Scene not found" });
        }
        scene.isDeleted = true;
        await scene.save();
        res.status(200).json({ message: "Scene deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting scene", error });
    }
});
const getAllScenesByFileId = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { fileId } = req.body;
        // console.log("FILE ID IS", fileId)
        const allScenes = await SceneCard.find({ fileId: fileId }).populate("plotThreadId").populate("characters");
        // console.log(allScenes)
        res.status(200).json(allScenes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching scenes", err });
    }
});

const createScene = async (req: Request, res: Response) => {
    try {
        const { id, fileId, secneHeading, type, location, timeOfDay, sceneTitle, characters, summary, themeExploration, scene, dynamic, emotions } = req.body;
        const userId = req.user._id;
        let imageUrls: Record<string, string> = {};
        let photos: string[] = [];

        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const imageUrl = await uploadCommonImage(file, userId);
                imageUrls[file.fieldname] = imageUrl;
            }
        }

        photos = Object.keys(imageUrls)
            .filter(key => key.startsWith("photo["))
            .sort((a, b) => {
                const indexA = parseInt(a.match(/\[(\d+)\]/)?.[1] || "0", 10);
                const indexB = parseInt(b.match(/\[(\d+)\]/)?.[1] || "0", 10);
                return indexA - indexB;
            })
            .map(key => imageUrls[key]);
        const parsedDynamic = parseFloat(dynamic);
        const finalDynamic = isNaN(parsedDynamic) ? 0 : parsedDynamic;

        let parsedEmotions = emotions;
        if (typeof emotions === "string") {
            try {
                parsedEmotions = JSON.parse(emotions);
            } catch (err) {
                console.error("Error parsing emotions:", err);
                return res.status(400).json({ message: "Invalid emotions format" });
            }
        }
        if (!Array.isArray(parsedEmotions)) {
            return res.status(400).json({ message: "Emotions should be an array" });
        }

        if (id) {
            const sceneData = await SceneCard.findById(id);
            if (!sceneData) {
                return res.status(404).json({ message: "Scene not found" });
            }
            sceneData.fileId = fileId;
            sceneData.type = type;
            sceneData.location = location;
            sceneData.timeOfDay = timeOfDay;
            sceneData.title = sceneTitle;
            sceneData.brief = summary;
            sceneData.characters = characters;
            sceneData.themeExploration = themeExploration;
            sceneData.scene = scene;
            sceneData.dynamic = finalDynamic;
            sceneData.emotions = parsedEmotions;
            if (photos.length > 0) {
                sceneData.photo = photos;  // ✅ Ensure scenePhoto is an array in the schema
            }
            sceneData.status = "draft";
            sceneData.isDeleted = false;
            await sceneData.save();
            return res.status(200).json(sceneData);
        }

        const newScene = await SceneCard.create({
            createdBy: userId,
            fileId,
            sceneHeading: secneHeading,
            characters,
            sceneTitle,
            type,
            location,
            timeOfDay,
            summary,
            themeExploration,
            photo: photos,  // ✅ Ensure it's stored as an array
            scene,
            dynamic: finalDynamic,
            emotions: parsedEmotions,
            status: "draft",
        });

        res.status(200).json(newScene);
    } catch (error) {
        console.error("Error creating scene:", error);
        res.status(500).json({ message: "Error creating scene", error });
    }
};


export default {
    createSceneWithTemplet,
    createOrUpdateScene,
    createScene,
    createPlotThread,
    getPlotThreadByFileId,
    updatePlotThread,
    deletePlotThread,
    updateSceneStatus,
    getAllScenes,
    getSceneById,
    updateScene,
    deleteScene,
    getAllScenesByFileId
};

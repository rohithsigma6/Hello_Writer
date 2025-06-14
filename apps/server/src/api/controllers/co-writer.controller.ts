/* eslint-disable import/no-anonymous-default-export */
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { generatedFromAI } from "../services/co-writer/co-writer.services";
// import {saveData} from "../services/loglines/loglines.services"
// import Loglines, { ILoglines } from '../models/loglines.model'
import Characters from "../models/character.model";
// import Theme, { ITheme } from '../models/theme.model'
import SceneCard from "../models/scene-card.model";
import StoryWorld, { IStoryWorld } from "../models/story_world.model";
import Location, { ILocation } from "../models/location.model";
import File from "../models/file.model";
import User from "../models/user.model";
import { uploadImage } from "../../lib/aws";
import { write } from "fs";
import Scene from "../models/scene.model";
import { json } from "body-parser";
import { error } from "console";
import { uploadCommonImage } from "../helper/multimedia/multimedia";
import StoryArc from "../models/story-arc.model";

// const saveTemplate = asyncHandler(async (req: Request, res: Response) => {
//   const userId = req.user._id
//   const fileId = req.body.fileId
//   const { status, name, writeFreely } = req.body
//   // const foundUser = await User.findOne({_id:userId}).lean()
//   const projectFound = await File.findOne({
//     _id: fileId,
//     userId: userId
//   }).lean()
//   // console.log("Found User =>" , foundUser);
//   console.log('Found Project =>', projectFound)
//   if (projectFound) {
//     var saved
//     if (name == 'logline') {
//       const data = {
//         createdBy: userId,
//         fileId: fileId,
//         template: req.body.template,
//         variables: req.body.variables,
//         slug: req.body.slug,
//         writeFreely: writeFreely,
//         status: status ? status : 'draft'
//       }
//       // saved = await saveData(data)
//       saved = await Loglines.create(data)
//     } else if (name == 'theme') {
//       const data = {
//         createdBy: userId,
//         fileId: fileId,
//         template: req.body.template,
//         slug: req.body.slug,
//         writeFreely: writeFreely,
//         variables: req.body.variables,
//         status: status ? status : 'draft'
//       }
//       saved = await Theme.create(data)
//     } else if (name == 'characters') {
//       const data = {
//         createdBy: userId,
//         fileId: fileId,
//         template: req.body.template,
//         slug: req.body.slug,
//         writeFreely: writeFreely,
//         variables: req.body.variables,
//         status: status ? status : 'draft'
//       }
//       saved = await Characters.create(data)
//     } else if (name == 'scene-cards') {
//       const data = {
//         createdBy: userId,
//         fileId: fileId,
//         template: req.body.template,
//         slug: req.body.slug,
//         writeFreely: writeFreely,
//         variables: req.body.variables,
//         status: status ? status : 'draft'
//       }
//       if (data.status != 'draft') {
//         let total = await Scene.find().countDocuments()
//         if (data.writeFreely) {
//           await Scene.create({
//             userId: userId,
//             fileId: fileId,
//             sceneNumber: total + 1,
//             slug: data.slug,
//             templateVariables: { outline: data.variables.logLine }
//           })
//         } else {
//           await Scene.create({
//             userId: userId,
//             fileId: fileId,
//             sceneNumber: total + 1,
//             slug: data.slug,
//             templateVariables: data.variables
//           })
//         }
//       }
//       saved = await SceneCard.create(data)
//     } else {
//       saved = {}
//     }
//     res.status(200).json({ message: 'Success', data: saved })
//   } else {
//     res
//       .status(400)
//       .json({ message: 'Fail', error: 'Invalid User or Project ID' })
//   }
// })

const saveCharacterTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const fileId = req.body.fileId;
    const { status, name, writeFreely } = req.body;
    const projectFound = await File.findOne({
      _id: fileId,
      userId: userId,
    }).lean();
    if (projectFound) {
      const imageFile = req.file;
      var imageUrl;
      if (imageFile) {
        let folder =
          `images/${userId}/` + new Date().getTime() + imageFile.originalname;
        imageUrl = await uploadImage(imageFile.buffer, folder);
      }
      if (!imageUrl) {
        imageUrl = "";
      }
      const variables = req.body.variables;
      const data = {
        createdBy: userId,
        fileId: fileId,
        template: req.body.template,
        slug: req.body.slug,
        writeFreely: writeFreely,
        variables: variables,
        status: status ? status : "draft",
        image: imageUrl,
      };
      const saved = await Characters.create(data);
      res.status(200).json({ message: "Success", data: saved });
      return;
    } else {
      res
        .status(400)
        .json({ message: "Fail", error: "Invalid User or Project ID" });
    }
  }
);

const updateCharacterTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const fileId = req.body.fileId;
    const id = req.params.id;
    const { status, name, writeFreely } = req.body;
    const file = await File.findOne({ _id: fileId, userId: userId }).lean();
    if (file) {
      if (req.file) {
        const imageFile = req.file;
        var imageUrl;
        if (imageFile) {
          let folder =
            `images/${userId}/` + new Date().getTime() + imageFile.originalname;
          imageUrl = await uploadImage(imageFile.buffer, folder);
        }
        if (!imageUrl) {
          imageUrl = "";
        }
        const variables = req.body.variables;
        const data = {
          createdBy: userId,
          fileId: fileId,
          template: req.body.template,
          slug: req.body.slug,
          writeFreely: writeFreely,
          variables: variables,
          status: status ? status : "draft",
          image: imageUrl,
        };
        await Characters.findByIdAndUpdate(id, data);
        res.status(200).json({ message: "Success", data: data });
        return;
      } else {
        const variables = req.body.variables;
        const data = {
          createdBy: userId,
          fileId: fileId,
          template: req.body.template,
          slug: req.body.slug,
          writeFreely: writeFreely,
          variables: variables,
          status: status ? status : "draft",
        };
        await Characters.findByIdAndUpdate(id, data);
        res.status(200).json({ message: "Success", data: data });
      }
    }
  }
);

const saveStoryWorld = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const fileId = req.body.fileId;
  const { status, _id } = req.body;
  const projectFound = await File.findOne({
    _id: fileId,
    // userId: userId
  }).lean();
  if (projectFound) {
    if (_id) {
      const foundStory = await StoryWorld.findOne({
        _id: _id,
        // isDeleted: false
      }).lean();
      console.log("foundStory", foundStory);
      if (foundStory) {
        console.log("object 1");
        const updatedData = {
          genre: req.body?.genre,
          subGenre: req.body?.subGenre,
          conflict: req.body?.conflict,
          natureOfStory: req.body?.natureOfStory,
          structure: req.body?.structure,
          setting: req.body?.setting,
          tone: req.body?.tone,
          globalHistoricalPeriod: req.body?.globalHistoricalPeriod,
          indiaSpecificHistoricalPeriod:
            req.body?.indiaSpecificHistoricalPeriod,
          year: req.body?.year,
          manualYear: req.body?.manualYear,
          worldAssociation: req.body?.worldAssociation,
          // locations: req.body?.locations
        };
        const updated = await StoryWorld.findOneAndUpdate(
          { _id: _id },
          updatedData,
          { new: true }
        ).lean();
        res.status(200).json({ message: "Success", data: updated });
      } else {
        res.status(400).json({ message: "Fail", error: "Invalid Id" });
      }
    } else {
      console.log("skfdhhsvjdfbg");
      const data = {
        createdBy: userId,
        fileId: fileId,
        genre: req.body.genre,
        subGenre: req.body.subGenre,
        conflict: req.body.conflict,
        natureOfStory: req.body.natureOfStory,
        structure: req.body.structure,
        setting: req.body.setting,
        tone: req.body.tone,
        globalHistoricalPeriod: req.body.globalHistoricalPeriod,
        indiaSpecificHistoricalPeriod: req.body.indiaSpecificHistoricalPeriod,
        year: req.body.year,
        manualYear: req.body.manualYear,
        worldAssociation: req.body.worldAssociation,
        // locations: req.body.locations,
      };
      const saved = await StoryWorld.create(data);
      console.log("data", data);
      res.status(200).json({ message: "Success", data: saved });
    }
  } else {
    res.status(400).json({ message: "Fail", error: "Invalid Id" });
  }
});

const getStoryWOrld = asyncHandler(async (req: Request, res: Response) => {
  const fileId = req.params.id;
  console.log(fileId);
  const data = await StoryWorld.findOne({
    fileId: fileId,
    // isDeleted: false
  }).lean();
  console.log(data);
  res.status(200).json({ message: "Success", data: data });
});

const getLocations = (async (req: Request, res: Response) => {
  const fileId = req.body.fileId;
  const userId = req.user._id; // Assuming user is authenticated

  try {
    if (!fileId) {
      return res.status(400).json({ message: "Fail", error: "fileId is required" });
    }

    // Find all locations for the user and file
    const locations = await Location.find({ fileId, isDeleted: { $ne: true } }).lean();

    res.status(200).json({ message: "Success", data: locations });
  } catch (error) {
    console.error("Error retrieving locations:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
});

const updateStoryWorld = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const fileId = req.body.fileId;
  const id = req.params.id;
  const { status } = req.body;
  const storyFound = await StoryWorld.findOne({
    _id: id,
    fileId: fileId,
    isDeleted: false,
  }).lean();
  if (storyFound) {
    const data = {
      genre: req.body.genre,
      subGenre: req.body.subGenre,
      setting: req.body.setting,
      tone: req.body.tone,
      globalPeriod: req.body.globalPeriod,
      indiaPeriod: req.body.indiaPeriod,
      year: req.body.year,
      manualYear: req.body.manualYear,
      structure: req.body.structure,
      template: req.body.template,
      locations: req.body.locations,
      status: status ? status : "DRAFT",
    };
    const updated = await StoryWorld.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ message: "Success", data: updated });
  } else {
    res.status(400).json({ message: "Fail", error: "Invalid Id" });
  }
});

export const saveLocation = async (req, res) => {
  console.log("Saving location directly in Location model...");
  const userId = req.user._id;
  let {
    fileId,
    name,
    description,
    type,
    importance,
    dramaticFunction,
    feel,
    primaryImageIndex,
  } = req.body;

  try {
    // Validate required fields
    if (!fileId || !name) {
      return res.status(400).json({ message: "Fail", error: "fileId and name are required" });
    }

    // Convert name to uppercase
    name = name.trim().toUpperCase();

    // Check if the file exists
    const projectFound = await File.findOne({ _id: fileId }).lean();
    if (!projectFound) {
      return res.status(400).json({ message: "Fail", error: "Invalid fileId" });
    }

    // Check for duplicate location name in the same fileId
    const existingLocation = await Location.findOne({
      fileId,
      userId,
      name: name,
      isDeleted: { $ne: true } // Optional: if soft delete is implemented
    }).lean();

    if (existingLocation) {
      return res.status(400).json({
        message: "Fail",
        error: "Location with this name already exists in the file",
      });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file, index) =>
        uploadCommonImage(file, userId).then(url => ({
          url,
          isPrimary: Number(primaryImageIndex) === index
        }))
      );
      images = await Promise.all(uploadPromises);
    }
    const locationData = {
      fileId,
      userId,
      name,
      description,
      type,
      importance,
      dramaticFunction,
      feel,
      images
    };
    const newLocation = await Location.create(locationData);
    res.status(200).json({ message: "Success", data: newLocation });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
};

export const deleteLocationImage = async (req, res) => {
  const { locationId } = req.params;
  const { imageIds } = req.body; // Accept an array of image IDs from the request body
  const userId = req.user._id;

  // Validate the input
  if (!Array.isArray(imageIds) || imageIds.length === 0) {
    return res.status(400).json({ message: "Fail", error: "imageIds must be a non-empty array" });
  }

  try {
    const updatedLocation = await Location.findOneAndUpdate(
      {
        _id: locationId,
        userId,
        isDeleted: { $ne: true },
      },
      {
        $pull: { images: { _id: { $in: imageIds } } }, // Remove all images with IDs in the array
      },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(400).json({ message: "Fail", error: "Location not found or images not found" });
    }

    res.status(200).json({ message: "Success", data: updatedLocation });
  } catch (error) {
    console.error("Error deleting images:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
};


export const saveLocationBySmartType = async (req, res) => {
  console.log("Saving location...");

  const userId = req.user._id;
  let { fileId, locationName, subLocation } = req.body;

  if (!fileId || !locationName) {
    return res.status(400).json({ message: "Fail", error: "Missing fields" });
  }
  const capitalize = (str) => str.toUpperCase();
  locationName = capitalize(locationName.trim());
  if (subLocation) subLocation = capitalize(subLocation.trim());
  
  try {
    // Check if the file exists
    const file = await File.findOne({ _id: fileId }).lean();
    if (!file) {
      return res.status(400).json({ message: "Fail", error: "Invalid fileId" });
    }

    // Check if location already exists
    let location = await Location.findOne({ fileId, name: locationName });

    if (location) {
      // If subLocation is provided and not already present, add it
      const isSubLocationExists = subLocation && location.subLocation.some(
        (sl) => sl.name.toLowerCase() === subLocation.toLowerCase()
      );

      if (subLocation && !isSubLocationExists) {
        location.subLocation.push({ name: subLocation });
        await location.save();
      }

      return res.status(200).json({ message: "Success", data: location });
    }

    // If location doesn't exist, create a new one
    const newLocation = new Location({
      fileId,
      userId,
      name: locationName,
      subLocation: subLocation ? [{ name: subLocation }] : [],
    });

    await newLocation.save();

    return res.status(200).json({ message: "Success", data: newLocation });

  } catch (error) {
    console.error("Error saving location:", error);
    return res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
};

export const saveSubLocationBySmartType = async (req, res) => {
  const userId = req.user._id;
  const { fileId, locationId, locationName, subLocationName } = req.body;

  try {
    // Validate file
    const fileExists = await File.findOne({ _id: fileId });
    if (!fileExists) {
      return res.status(400).json({ message: "Invalid file ID" });
    }

    // If locationId is provided, push sublocation to existing location
    if (locationId) {
      const updatedLocation = await Location.findOneAndUpdate(
        { _id: locationId },
        {
          $push: {
            subLocation: {
              name: subLocationName,
            },
          },
        },
        { new: true }
      );

      if (!updatedLocation) {
        return res.status(404).json({ message: "Location not found 555" });
      }

      return res.status(200).json({
        message: "Sublocation added to existing location",
        data: {
          locationId,
          subLocationName,
        },
      });
    }
    if (locationName && subLocationName) {
      const newLocation = new Location({
        fileId,
        userId,
        name: locationName,
        subLocation: [{ name: subLocationName }],
      });

      await newLocation.save();

      return res.status(201).json({
        message: "New location with sublocation created",
        data: newLocation,
      });
    }

    return res.status(400).json({ message: "Invalid request payload" });
  } catch (error) {
    console.error("Error saving location/subLocation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSubLocations = async (req: Request, res: Response) => {
  const { locationName } = req.query;
  const { fileId } = req.params;
  if (!fileId) return res.status(400).json({ message: "fileId is required" });
  try {
    if (!locationName || typeof locationName !== "string") {
      return res.status(400).json({ message: "locationName is required" });
    }
    const locations = await Location.find(
      { name: locationName, fileId },
      "subLocation"
    );
    const subLocationList = locations.flatMap((location) =>
      location.subLocation.map((sub) => ({
        id: sub.id,
        name: sub.name,
      }))
    );

    const uniqueSubLocationList = Array.from(
      new Map(subLocationList.map((sub) => [sub.name, sub])).values()
    );

    return res.status(200).json({
      message: "Sublocation names fetched successfully",
      data: uniqueSubLocationList,
    });
  } catch (error) {
    console.error("Error fetching sublocations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getLocationBySmartType = async (req, res) => {
  const userId = req.user._id;
  const { fileId } = req.params;

  try {
    if (!fileId) {
      return res.status(400).json({ message: "fileId is required" });
    }

    // Fetch locations from the Location model
    const locations = await Location.find({ fileId, userId }).lean();

    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: "No locations found" });
    }

    const locationList = locations.map((loc) => ({
      _id: loc._id,
      name: loc.name || null,
    }));

    res.status(200).json({
      message: "Locations fetched successfully",
      data: locationList,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLocation = async (req, res) => {
  const { locationId, fileId } = req.params;

  try {
    // Check if the file exists
    const fileExists = await File.findOne({ _id: fileId }).lean();
    if (!fileExists) {
      return res.status(400).json({ message: "Fail", error: "Invalid file ID" });
    }

    // Soft delete the location by marking isDeleted: true
    const deletedLocation = await Location.findOneAndUpdate(
      { _id: locationId, fileId, isDeleted: { $ne: true } },
      { $set: { isDeleted: true } },
      { new: true }
    );

    if (!deletedLocation) {
      return res.status(400).json({
        message: "Fail",
        error: "Location not found or already deleted",
      });
    }

    res.status(200).json({ message: "Success", data: { locationId } });
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
};

// export const updateLocation = async (req, res) => {
//   const {
//     fileId,
//     name,
//     description,
//     type,
//     importance,
//     dramaticFunction,
//     feel,
//   } = req.body;
//   const userId = req.user._id;
//   const locationId = req.params.id;

//   try {
//     const fileExists = await File.findOne({ _id: fileId }).lean();
//     if (!fileExists) {
//       return res.status(400).json({ message: "Fail", error: "Invalid fileId or access denied" });
//     }

//     const updateData = {
//       name,
//       description,
//       type,
//       importance,
//       dramaticFunction,
//       feel,
//       image: ''
//     };
//     if (req.file) {
//       const imageUrl = await uploadCommonImage(req.file, userId);
//       updateData.image = imageUrl;
//     }
//     const updatedLocation = await Location.findOneAndUpdate(
//       { _id: locationId, fileId, userId, isDeleted: { $ne: true } },
//       { $set: updateData },
//       { new: true }
//     );

//     if (!updatedLocation) {
//       return res.status(400).json({ message: "Fail", error: "Location not found or update failed" });
//     }

//     res.status(200).json({ message: "Success", data: updatedLocation });
//   } catch (error) {
//     console.error("Error updating location:", error);
//     res.status(500).json({ message: "Fail", error: "Internal Server Error" });
//   }
// };

export const updateLocation = async (req, res) => {
  const {
    fileId,
    name,
    description,
    type,
    importance,
    dramaticFunction,
    feel,
    primaryImageIndex,
  } = req.body;
  const userId = req.user._id;
  const locationId = req.params.id;

  try {
    const fileExists = await File.findOne({ _id: fileId }).lean();
    if (!fileExists) {
      return res.status(400).json({ message: "Fail", error: "Invalid fileId or access denied" });
    }
    
    const existingLocation = await Location.findOne({ _id: locationId, fileId, isDeleted: { $ne: true } });
    if (!existingLocation) {
      return res.status(400).json({ message: "Fail", error: "Location not found or update failed" });
    }

    const updateData: {
      name?: any;
      description?: any;
      type?: any;
      importance?: any;
      dramaticFunction?: any;
      feel?: any;
      images?: any[];
    } = {
      name,
      description,
      type,
      importance,
      dramaticFunction,
      feel,
    };

    // Start with existing images
    let images = existingLocation.images || [];

    // Add new images if provided
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadCommonImage(file, userId).then(url => ({
          url,
          isPrimary: false, // New images are not primary by default
        }))
      );
      const newImages = await Promise.all(uploadPromises);
      images = [...images, ...newImages];
    }

    // Ensure only one image is marked as primary
    // First, reset all images to non-primary
    images.forEach((image) => {
      image.isPrimary = false;
    });

// Check if a primaryImageIndex is provided
if (primaryImageIndex !== undefined && images[Number(primaryImageIndex)]) {
  // Reset all images to non-primary
  images.forEach((image) => (image.isPrimary = false));
  // Set the specified image as primary
  images[Number(primaryImageIndex)].isPrimary = true;
} else {
  const existingPrimary = images.find((image) => image.isPrimary);
  if (!existingPrimary && images.length > 0) {
      images[0].isPrimary = true;
  }
}

    updateData.images = images;

    // Update the location with merged images
    const updatedLocation = await Location.findOneAndUpdate(
      { _id: locationId, fileId, isDeleted: { $ne: true } },
      { $set: updateData },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(400).json({ message: "Fail", error: "Location not found or update failed" });
    }

    res.status(200).json({ message: "Success", data: updatedLocation });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
};

const getLocationById = (async (req: Request, res: Response) => {
  const { fileId, locationId } = req.params;
  try {
    const location = await Location.findOne({
      _id: locationId,
      fileId,
      // userId,
      // isDeleted: false,
    }).lean();

    if (!location) {
      return res.status(404).json({ message: "Fail", error: "Location not found" });
    }

    res.status(200).json({ message: "Success", data: location });
  } catch (error) {
    console.error("Error retrieving location:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
});

const saveImage = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  console.log("File =>", req.file);
  console.log("Files =>", req.files);
  const imageFile = req.file;
  var imageUrl;
  if (imageFile) {
    let folder =
      `images/${userId}/` + new Date().getTime() + imageFile.originalname;
    imageUrl = await uploadImage(imageFile.buffer, folder);
  }
  res.status(200).json({ message: "Success", data: imageUrl });
  // if(image)
});

const saveCharacter = asyncHandler(async (req: Request, res: Response) => {});


const getAllTemplates = asyncHandler(async (req: Request, res: Response) => {
  let template = req.query.template;
  let fileId = req.query.fileId;
  if (template == "character") {
    let draftCharacters = await Characters.find({
      fileId: fileId,
      status: "draft",
      isDeleted: false,
    });
    let finalizedCharacters = await Characters.find({
      fileId: fileId,
      status: "finalize",
      isDeleted: false,
    });
    res.status(200).json({
      message: "Success",
      data: { draft: draftCharacters, finalized: finalizedCharacters },
    });
  } else {
    res.status(400).json({ message: "Template Not Found" });
  }
});

const saveScene = asyncHandler(async (req: Request, res: Response) => {
  const fileId = req.body.fileId;
  const userId = req.user._id;
  let sceneCard = await SceneCard.findOne({
    fileId: fileId,
    isDeleted: false,
    status: "finalize",
  });
  let slug = sceneCard ? sceneCard.slug : "";
  let variables = sceneCard ? sceneCard.variables : "";
  let variablesKey = Object.keys(variables && variables ? variables : {});
  //initialize every key with empty value
  if (!variables) {
    variables = {};
    variablesKey = [];
  }
  variablesKey.forEach((key) => {
    variables[key] = "";
  });
  let templateVariables = variables;
  let scene = await Scene.create({
    userId,
    environment: req.body.environment ? req.body.environment : "",
    time: req.body.time ? req.body.time : "",
    title: req.body.sceneTitle ? req.body.sceneTitle : "",
    description: req.body.description ? req.body.description : "",
    fileId,
    slug,
    templateVariables,
  });
  res.status(200).json({ message: "Success", data: scene });
});

const updateScene = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { fileId, _id } = body;
  let existScene = await Scene.findOne({ _id: _id, isDeleted: false });
  if (!existScene) {
    res.status(400).json({ message: "Scene Not Found" });
  }
  let scene = await Scene.findByIdAndUpdate(_id, body, { new: true });
  res.status(200).json({ message: "Success", data: scene });
});

const updateSceneImage = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  const sceneId = req.body.sceneId;
  if (!file) {
    res.status(400).json({ message: "Image Not Found" });
    return;
  }
  let existScene = await Scene.findOne({ _id: sceneId, isDeleted: false });
  if (!existScene) {
    res.status(400).json({ message: "Scene Not Found" });
    return;
  } else if (existScene && file) {
    let folder =
      `images/${existScene.userId}/` + new Date().getTime() + file.originalname;
    let imageUrl = await uploadImage(file.buffer, folder);
    // console.log(imageUrl, "img")
    let scene = await Scene.findByIdAndUpdate(
      sceneId,
      { sceneImage: imageUrl?.url },
      { new: true }
    );
    res.status(200).json({ message: "Success", data: scene });
    return;
  }
  res.status(200).json({ message: "Success", data: existScene });
});
const addNewStoryArc = async (req, res) => {
  const userId = req.user._id;

  try {
    const {
      fileId,
      title,
      storylineCharacters,
      isAutomatically,
      summary,
      properties,
      storyArc,
    } = req.body;

    if (!fileId || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStoryArc = new StoryArc({
      createdBy: userId,
      fileId,
      title,
      storylineCharacters,
      isAutomatically,
      summary,
      properties,
      storyArc,
    });

    await newStoryArc.save();

    res
      .status(201)
      .json({ message: "StoryArc created successfully", data: newStoryArc });
  } catch (error) {
    // Handle 'unknown' error type safely
    if (error instanceof Error) {
      res.status(500).json({ message: "Server error", error: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const getStoryArcsByFileAndCreator = async (req, res) => {
  const userId = req.user._id;
  const { fileId } = req.query;

  try {
    if (!fileId || !userId) {
      return res
        .status(400)
        .json({ message: "Missing required query parameters" });
    }

    // Find all story arcs that match the given fileId and createdBy (userId)
    const storyArcs = await StoryArc.find({ fileId, createdBy: userId });

    // If no story arcs are found, return a message
    if (storyArcs.length === 0) {
      return res.status(404).json({ message: "No story arcs found" });
    }

    // Return the found story arcs
    res
      .status(200)
      .json({ message: "Story arcs retrieved successfully", data: storyArcs });
  } catch (error) {
    // Handle 'unknown' error type safely
    if (error instanceof Error) {
      res.status(500).json({ message: "Server error", error: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const addSubLocation = async (req, res) => {
  const { locationId } = req.params;
  const userId = req.user._id;
  const { name, description, importance, dramaticFunction, feel, primaryImageIndex } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Fail", error: "Name is required" });
  }

  try {
    const location = await Location.findOne({ _id: locationId, isDeleted: { $ne: true } });

    if (!location) {
      return res.status(400).json({ message: "Fail", error: "Location not found or access denied" });
    }

    const existingSubLocation = location.subLocation.find(
      (sub) => sub.name.toLowerCase() === name.toLowerCase()
    );

    if (existingSubLocation) {
      return res.status(400).json({ message: "Fail", error: "Sublocation with this name already exists in the location" });
    }

    let images = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file, index) =>
        uploadCommonImage(file, userId).then(url => ({
          url,
          isPrimary: primaryImageIndex !== undefined
            ? Number(primaryImageIndex) === index
            : index === 0
        }))
      );
      images = await Promise.all(uploadPromises);
    }

    const newSubLocation = {
      name: name.toUpperCase(),
      description,
      importance,
      dramaticFunction,
      feel,
      images
    };

    location.subLocation.push(newSubLocation);
    await location.save();

    res.status(200).json({ message: "Success", data: location });
  } catch (error) {
    console.error("Error adding sublocation:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
};

export const updateSubLocation = async (req, res) => {
  const { locationId, subLocationId } = req.params;
  const userId = req.user._id;
  const { name, description, importance, dramaticFunction, feel, primaryImageIndex } = req.body;

  try {
    const updateFields = {};
    if (name) updateFields["subLocation.$.name"] = name.toUpperCase();
    if (description) updateFields["subLocation.$.description"] = description;
    if (importance) updateFields["subLocation.$.importance"] = importance;
    if (dramaticFunction) updateFields["subLocation.$.dramaticFunction"] = dramaticFunction;
    if (feel) updateFields["subLocation.$.feel"] = feel;

    // Fetch the existing sub-location to get current images
    const existingLocation = await Location.findOne(
      { _id: locationId, "subLocation._id": subLocationId },
      { "subLocation.$": 1 }
    );

    if (!existingLocation) {
      return res.status(404).json({
        message: "Sub-location not found.",
        status: "fail",
      });
    }

    let images = existingLocation.subLocation[0].images || [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadCommonImage(file, userId).then((url) => ({
          url,
          isPrimary: false,
        }))
      );
      const newImages = await Promise.all(uploadPromises);
      images = [...images, ...newImages];
    }
    if (primaryImageIndex !== undefined && images[Number(primaryImageIndex)]) {
      images.forEach((image) => (image.isPrimary = false));
      images[Number(primaryImageIndex)].isPrimary = true;
    } else {
      const existingPrimary = images.find((image) => image.isPrimary);
      if (!existingPrimary && images.length > 0) {
        images[0].isPrimary = true;
      }
    }
    updateFields["subLocation.$.images"] = images;
    const updated = await Location.findOneAndUpdate(
      { _id: locationId, userId, "subLocation._id": subLocationId },
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Sub-location not found or update failed.",
        status: "fail",
      });
    }

    // Extract the updated sub-location
    const updatedSubLocation = updated.subLocation.find(
      (sub) => sub._id.toString() === subLocationId
    );

    res.status(200).json({
      message: "Sub-location updated successfully.",
      status: "success",
      data: updatedSubLocation,
    });
  } catch (error) {
    console.error("Error updating sub-location:", error);
    res.status(500).json({
      message: "An unexpected error occurred while updating the sub-location.",
      status: "error",
    });
  }
};

export const deleteSubLocationImage = async (req, res) => {
  const { locationId, subLocationId } = req.params;
  const { imageIds } = req.body;
  const userId = req.user._id;

  // Validate the input
  if (!Array.isArray(imageIds) || imageIds.length === 0) {
    return res.status(400).json({ message: "Fail", error: "imageIds must be a non-empty array" });
  }

  try {
    const updatedLocation = await Location.findOneAndUpdate(
      {
        _id: locationId,
        userId,
        "subLocation._id": subLocationId,
        isDeleted: { $ne: true },
      },
      {
        $pull: { "subLocation.$.images": { _id: { $in: imageIds } } }, // Remove images from the specific sub-location
      },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(400).json({ message: "Fail", error: "Sub-location not found or images not found" });
    }

    // Extract the updated sub-location
    const updatedSubLocation = updatedLocation.subLocation.find(
      (sub) => sub._id.toString() === subLocationId
    );

    res.status(200).json({ message: "Success", data: updatedSubLocation });
  } catch (error) {
    console.error("Error deleting sub-location images:", error);
    res.status(500).json({ message: "Fail", error: "Internal Server Error" });
  }
};

export const deleteSubLocation = async (req, res) => {
  const { locationId, subLocationId } = req.params;

  try {
    // First, fetch the location document
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({
        message: "Location not found.",
        status: "fail"
      });
    }

    const subLocationExists = location.subLocation.some(
      (sub) => sub._id.toString() === subLocationId
    );

    if (!subLocationExists) {
      return res.status(404).json({
        message: "Sub-location not found.",
        status: "fail"
      });
    }

    // Proceed with deletion
    await Location.updateOne(
      { _id: locationId },
      { $pull: { subLocation: { _id: subLocationId } } }
    );

    res.status(200).json({
      message: "Sub-location permanently deleted.",
      status: "success",
      data: { subLocationId }
    });
  } catch (error) {
    console.error("Error hard deleting sub-location:", error);
    res.status(500).json({
      message: "An unexpected error occurred while deleting the sub-location.",
      status: "error"
    });
  }
};

export default {
  saveScene,
  updateScene,
  updateSceneImage,
  saveImage,
  getLocationById,
  getLocations,
  saveLocation,
  deleteLocationImage,
  updateLocation,
  deleteLocation,
  saveStoryWorld,
  saveCharacter,
  updateStoryWorld,
  saveSubLocationBySmartType,
  getAllSubLocations,
  getStoryWOrld,
  saveLocationBySmartType,
  getLocationBySmartType,
  getAllTemplates,
  saveCharacterTemplate,
  updateCharacterTemplate,
  addNewStoryArc,
  getStoryArcsByFileAndCreator,
  deleteSubLocation,
  deleteSubLocationImage,
  updateSubLocation,
  addSubLocation
};

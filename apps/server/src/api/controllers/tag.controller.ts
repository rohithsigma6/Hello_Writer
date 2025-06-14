import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import Tag, { ITag } from "../models/tag.model";
import {
  getTagForWords,
  removeMatchingMarks,
  assignTagsToTheScripts,
  processContent,
  updateTagIdInJsonContent,
  separateUntaggingText,
  mergeTagging,
  splitTextContent,
  updateContent,
  updateContentAndDeleteTag,
  deleteTagHelper,
} from "../services/tag/tag.services";
import Category from "../models/category.model";
import EditorContent from "../models/editor-content.model";

const generateUniqueTagName = async (name: any, fileId: any) => {
  let attempt = 0;
  let tagName = name;

  while (true) {
    // If it's the first attempt, use the original name
    if (attempt > 0) {
      tagName = `${name} (${attempt})`;
    }

    // Check if this exact tag name already exists
    const existingTag = await Tag.findOne({
      $expr: {
        $eq: [{ $toLower: "$name" }, tagName.toLowerCase()],
      },
      fileId,
      isDeleted: false,
    });

    // If no existing tag is found, return this tag name
    if (!existingTag) {
      return tagName;
    }

    // Increment the attempt counter and continue the loop
    attempt++;
  }
};

// usecase. kept creating with name anush, and it kept creating with anush (1)
const createTag = asyncHandler(async (req: Request, res: Response) => {
  const { userId, fileId, sceneId, notes, categoryId, tagAllMentions } =
    req.body;
  var { name } = req.body;
  const byAdmin = req.user.isAdmin;

  if (!userId || !categoryId) {
    res.status(400).json({ error: "Missing User ID or Category ID" });
    return;
  }
  var tag;
  // tag = await Tag.findOne({
  //     isDeleted: false,
  //     fileId,
  //     $expr: {
  //         $eq: [{ $toLower: "$name" }, name.toLowerCase()]
  //     },
  // })
  const userFound = await User.findOne({ _id: userId }).lean();
  if (!userFound) {
    res.status(400).json({ success: false, message: "User is Deleted" });
    return;
  }

  // ============= get current category's color
  const category = await Category.findById(categoryId).select("color").lean();
  console.log("🚀 ~ createTag ~ category:", category);

  const customMarkAttrs = {
    color: category?.color ?? "#e9e9e9",
    categoryId,
    notes,
    name,
    // _id: "unique123"
  };
  if (tagAllMentions) {
    const editorContents = await EditorContent.find({
      isDeleted: false,
      fileId,
    });
    // first get all the editorContents
    // Collect promises for parallel processing
    for (const jsonContent of editorContents || []) {
      if (!jsonContent?.content) continue; // Skip invalid content

      name = name.trim();
      const updatedJson = await addCustomMark(
        jsonContent.content as unknown as DocumentNode,
        name,
        customMarkAttrs,
        {
          caseSensitive: false,
          // wholeWord: true,
        },
        {
          fileId,
          sceneId: String(jsonContent.sceneId),
          userId,
        }
      );

      await EditorContent.findByIdAndUpdate(jsonContent._id, {
        content: updatedJson,
      });
    }
  }

  // if we're dealing with tag all mentions, in that case we don't want to create the tag HERE.
  // only create here when tag all mentions is disable
  // Use the reusable handleTag function,
  if (!tagAllMentions) {
    tag = await handleTag({
      searchParams: {
        fileId,
        categoryId,
        name,
      },
      sceneId,
      updateOptions: {
        userId,
        byAdmin,
        notes,
      },
    });
  }

  res.status(200).json({ success: true, data: tag });
  return;
});

const updateTag = asyncHandler(async (req: Request, res: Response) => {
  try {
    const tagId = req.params.tagId;
    if (!tagId) {
      res.status(400).json({ success: false, error: "Tag ID is missing" });
      return;
    }

    // Find the tag by its ID
    const foundTag = await Tag.findOne({ _id: tagId }).lean();
    // console.log("🚀 ~ updateTag ~ foundTag:", foundTag)
    if (!foundTag) {
      res.status(400).json({ success: false, error: "Invalid Tag ID" });
      return;
    }

    const { name, notes, categoryId, fileId } = req.body;
    // Check if another tag with the same name already exists
    const existingTag = await Tag.findOne({
      $expr: {
        $eq: [{ $toLower: "$name" }, name.toLowerCase()],
      },
      _id: { $ne: tagId },
      fileId,
      isDeleted: false,
    }).lean();
    // console.log("🚀 ~ updateTag ~ existingTag:", existingTag)

    if (existingTag) {
      res.status(400).json({
        success: false,
        error: "A tag with the same name already exists",
      });
      return;
    }
    // Prepare the update object
    const updObj = {
      name,
      notes: notes ?? foundTag.notes,
      categoryId,
    };

    // Update the tag
    const updatedTag = await Tag.findByIdAndUpdate(tagId, updObj, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTag });
    return;
  } catch (error: any) {
    console.error("Error =>", error);
    res.status(500).json({ success: false, error: error.message });
    return;
  }
});

const getTags = asyncHandler(async (req: Request, res: Response) => {
  try {
    // console.log("Testing");
    // console.log("user =>", req.user);
    const sceneId = req.query.sceneId as string;
    const categoryId = req.query.categoryId as string;
    var categoryTitle;

    if (!sceneId && !categoryId) {
      res.status(400).json({
        success: false,
        error: "Either sceneId or categoryId must be provided",
        data: [],
      });
      return;
    }

    // Build the query conditionally
    const queryConditions = [
      { isDeleted: false },
      {
        $or: categoryId
          ? [{ categoryId }] // If categoryId is present, only check categoryId
          : [{ sceneId }, { byAdmin: true }], // Otherwise, check sceneId and byAdmin
      },
    ];

    if (categoryId) {
      const category = await Category.findOne({ _id: categoryId }).lean();
      categoryTitle = category?.name;
    }
    const tags = await Tag.find(
      { $and: queryConditions },
      {
        _id: 1,
        createdBy: 1,
        fileId: 1,
        name: 1,
        byAdmin: 1,
        notes: 1,
        sceneId: 1,
        categoryId: 1,
        overallOccurrence: 1,
        scenesOccurrence: 1,
        scenes: 1,
      }
    )
      .populate({
        path: "scenes.sceneId", // Path to populate
        select: "_id sceneNumber title description sceneNumber", // Only fetch necessary fields
      })
      .lean(); // Return plain JavaScript objects
    const transformedTags = tags.map((tag) => ({
      ...tag,
      scenes: tag.scenes.map((scene) => ({
        ...scene.sceneId, // Flatten sceneId into the parent object
        occurrence: scene.occurrence,
      })),
    }));
    res
      .status(200)
      .json({ success: true, data: transformedTags, categoryTitle });
  } catch (error) {
    console.log("🚀 ~ getTags ~ error:", error);
    res.status(500).json({ success: false, error });
  }
});

// const autoTagging2 = asyncHandler(async (req: Request, res: Response) => {
//     const json = req.body.json
//     const fileId = req.query.fileId
//     const sceneId = req.query.sceneId

//     const string = await processContent(json)
//     console.log(string);
//     const userTagArray = await Category.find({
//         $and: [
//             { isDeleted: false },
//             { fileId },
//         ]
//     },
//         { _id: 1, name: 1, color: 1 }).lean()
//     console.log("🚀 ~ autoTagging ~ userTagArray:", userTagArray)
//     const contentData = await assignTagsToTheScripts(string, userTagArray)
//     // await EditorContent.findOneAndUpdate({
//     //     sceneId,
//     // }, {
//     //     content: contentData
//     // })
//     res.status(200).json({ success: true, message: "Sucessfull", string: string,data:contentData })
// })
const autoTagging = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const sceneId = req.query.sceneId;
  const fileId = req.query.fileId;
  const user_scene_file = {
    userId,
    sceneId,
    fileId,
  };
  if (!fileId) {
    res.status(200).json({ success: false, message: "Missing File ID" });
    return;
  }
  const userTagArray = await Category.find(
    {
      $and: [{ isDeleted: false }, { fileId }],
    },
    { _id: 1, name: 1, color: 1 }
  )
    .lean()
    .then((tags) =>
      tags.map((tag) => ({
        ...tag,
        _id: tag._id.toString(),
      }))
    );
  console.log("🚀 ~ autoTagging ~ userTagArray:", userTagArray);
  const editorContent = await EditorContent.findOne({
    isDeleted: false,
    fileId,
    sceneId,
  });
  if (!editorContent || !editorContent.content) {
    res.status(400).json({
      success: false,
      message: "Content for this scene does not exist",
    });
    return;
  }
  // const contentData:any = await splitTextContent(editorContent.content as any)
  // for (let i = 0; i < contentData.content.length; i++) {
  //     const mTagArray = await separateUntaggingText(contentData, i)
  //     // console.log(`${i} mTagArray =>`,mTagArray);
  //     if (mTagArray.length > 0) {
  //         const assignTag = await getTagForWords(mTagArray, userTagArray)
  //         // console.log(`${i} Assign Tag =>`,assignTag);
  //         const updatedData = await mergeTagging(contentData, assignTag, i, user_scene_file)
  //         // console.log(`${i} Updated Data =>`, updatedData);
  //         contentData.content[i] = updatedData.content[i]
  //     }
  // }
  const text: string = await processContent(editorContent.content as any);
  console.log(text);
  const contentData = await assignTagsToTheScripts(
    text,
    userTagArray,
    fileId.toString()
  );
  await EditorContent.findOneAndUpdate(
    {
      sceneId,
    },
    {
      content: contentData,
    }
  );
  res
    .status(200)
    .json({ success: true, message: "Successfull", data: contentData });
});
const autoScriptTagging = asyncHandler(async (req: Request, res: Response) => {
  const fileId = req.query.fileId;
  const userId = req.user._id;

  if (!fileId) {
    res.status(200).json({ success: "false", message: "Missing fileId" });
    return;
  }
  const editorContents = await EditorContent.find({
    isDeleted: false,
    fileId,
  });
  const userTagArray = await Category.find({
    $and: [{ isDeleted: false }, { fileId }],
  })
    .lean()
    .then((tags) =>
      tags.map((tag) => ({
        ...tag,
        _id: tag._id.toString(),
      }))
    );

  for (const jsonContent of editorContents || []) {
    if (!jsonContent?.content) continue;

    const sceneId = jsonContent.sceneId;
    const user_scene_file = {
      userId,
      sceneId,
      fileId,
    };

    const contentData = (await splitTextContent(
      jsonContent.content as any
    )) as any;

    for (let i = 0; i < contentData.content.length; i++) {
      const mTagArray = await separateUntaggingText(contentData, i);

      // Skip if no tags are found
      if (mTagArray.length > 0) {
        const assignTag = await getTagForWords(mTagArray, userTagArray);
        const updatedData = await mergeTagging(
          contentData,
          assignTag,
          i,
          user_scene_file
        );

        // console.log(`${i} Updated Data =>`, updatedData);

        // Update the specific part of the content
        contentData.content[i] = updatedData.content[i];
      }
    }

    // Update the database with the modified content
    await EditorContent.findOneAndUpdate({ sceneId }, { content: contentData });
  }

  // Skip invalid content
  res.status(200).json({
    success: true,
    message: "Successfully auto tagged the entire script",
  });
});

const groupDeleteTag = asyncHandler(async (req: Request, res: Response) => {
  const { tagIdsToDelete, sceneId, singleScene, fileId } = req.body;
  if (tagIdsToDelete.length === 0) {
    res
      .status(400)
      .json({ success: false, error: "Must contain at least one tagId" });
    return;
  }
  if (singleScene) {
    const json = await EditorContent.findOne({
      sceneId: sceneId,
      isDeleted: false,
    }).lean();

    if (json) {
      let contentUpdated = false;

      for (const tagId of tagIdsToDelete) {
        const { contentUpdated: updated } = await updateContentAndDeleteTag(
          json,
          tagId
        );
        await deleteTagHelper(tagId, "sceneId", sceneId);
        if (updated) contentUpdated = true;
      }

      if (contentUpdated) {
        await EditorContent.updateOne(
          { _id: json._id },
          { $set: { content: json.content } }
        );
      }
    }
  } else if (fileId) {
    const jsons = await EditorContent.find({
      fileId: fileId,
      isDeleted: false,
    }).lean();

    for (const json of jsons) {
      let contentUpdated = false;

      for (const tagId of tagIdsToDelete) {
        const { contentUpdated: updated, updatedJson } =
          await updateContentAndDeleteTag(json, tagId);
        await deleteTagHelper(tagId, "fileId", fileId);
        if (updated) {
          contentUpdated = true;
          json.content = updatedJson.content;
        }
      }

      if (contentUpdated) {
        await EditorContent.updateOne(
          { _id: json._id },
          { $set: { content: json.content } }
        );
      }
    }
  }
  res.status(200).json({ success: true, message: "Successfully deleted" });
});

const mergeTags = asyncHandler(async (req: Request, res: Response) => {
  const { primaryTagId, tagIdsToMerge, sceneId } = req.body;
  // if (tagIdsToMerge.length < 2) {
  //     res.status(400).json({ success: false, error: "Must send at least 2 tag ids to merge" })
  //     return;
  // }
  const primaryTag = await Tag.findById(primaryTagId);
  console.log("🚀 ~ mergeTags ~ primaryTag:", primaryTag);
  if (!primaryTag) {
    res.status(404).json({ error: "Primary tag not found" });
    return;
  }

  // Fetch secondary tags
  const secondaryTags = await Tag.find({ _id: { $in: tagIdsToMerge } });
  console.log("🚀 ~ mergeTags ~ secondaryTags:", secondaryTags);
  if (secondaryTags.length !== tagIdsToMerge.length) {
    res.status(404).json({ error: "Some secondary tags not found" });
    return;
  }

  // Merge secondary tags into the primary tag
  for (const secondaryTag of secondaryTags) {
    // Update overallOccurrence and scenesOccurrence
    primaryTag.overallOccurrence += secondaryTag.overallOccurrence;
    // primaryTag.scenesOccurrence += secondaryTag.scenesOccurrence;
    console.log("🚀 ~ mergeTags ~ primaryTag:", primaryTag);

    // Merge scenes
    secondaryTag.scenes.forEach((secondaryScene) => {
      const existingScene = primaryTag.scenes.find(
        (primaryScene) =>
          primaryScene.sceneId.toString() === secondaryScene.sceneId.toString()
      );
      console.log(
        "🚀 ~ secondaryTag.scenes.forEach ~ existingScene:",
        existingScene
      );

      if (existingScene) {
        (existingScene.occurrence as any) += secondaryScene.occurrence; // Access the `default` values
      } else {
        primaryTag.scenes.push(secondaryScene);
      }
    });
  }
  primaryTag.scenesOccurrence = primaryTag.scenes.length;
  // Save the updated primary tag
  await primaryTag.save();
  console.log("🚀 ~ mergeTags ~ primaryTag:", primaryTag);

  // Mark secondary tags as deleted
  await Tag.updateMany(
    { _id: { $in: tagIdsToMerge } },
    { $set: { isDeleted: true } }
  );
  if (sceneId) {
    const json = await EditorContent.findOne({
      sceneId: sceneId,
      isDeleted: false,
    }).lean();
    if (json) {
      // secondaryTags.for
      tagIdsToMerge.forEach(async (tagId: string) => {
        console.log("tagId =>", tagId);
        const data = await updateTagIdInJsonContent(json, tagId, primaryTagId);
        if (data?.update) {
          json.content = data.updateJson;
          await EditorContent.updateOne(
            { _id: json._id },
            { $set: { content: json.content } }
          );
        }
      });
    }
  } else {
    const primaryTaginfo = await Tag.findOne({ _id: primaryTagId }).lean();
    const jsons = await EditorContent.find({
      fileId: primaryTaginfo?.fileId,
      isDeleted: false,
    }).lean();
    if (jsons.length > 0) {
      jsons.forEach(async (json: any) => {
        tagIdsToMerge.forEach(async (tagId: string) => {
          console.log("tagId =>", tagId);
          const data = await updateTagIdInJsonContent(
            json,
            tagId,
            primaryTagId
          );
          if (data?.update) {
            json.content = data.updateJson;
            await EditorContent.updateOne(
              { _id: json._id },
              { $set: { content: json.content } }
            );
          }
        });
      });
    }
  }
  res.status(200).json({ message: "Tags merged successfully", primaryTag });
  return;
});
const deleteTag = asyncHandler(async (req: Request, res: Response) => {
  const tagId = req.params.tagId;
  const sceneId = req.query.sceneId as string;
  const decrementOnlyOnce = req.query.decrementOnlyOnce === "true"; // flag to handle single occurrence deletion

  if (!tagId) {
    res.status(400).json({ success: false, error: "Tag ID is missing" });
    return;
  }

  // Fetch the tag to check its existence and scenes
  const tag = await Tag.findById(tagId);
  if (!tag) {
    res.status(404).json({ success: false, error: "Tag not found" });
    return;
  }

  if (sceneId) {
    // Handle deletion for a specific scene
    const foundSceneIndex = tag.scenes.findIndex(
      (scene) => scene.sceneId.toString() === sceneId
    );
    if (foundSceneIndex === -1) {
      res.status(204).json({
        success: true,
        error:
          "Tag not found in the specified scene, that means it doesnt exist in backend or perhaps the in any scene. \n Usually happens if the tag exists in the editor, but out of sync with database",
      });
      return;
    }

    const foundScene = tag.scenes[foundSceneIndex];
    // console.log("🚀 ~ deleteTag ~ foundScene:", foundScene)

    var foundSceneOccurrence = foundScene.occurrence as unknown as number;
    if (decrementOnlyOnce) {
      // Decrement occurrence by 1
      foundSceneOccurrence -= 1;
      tag.overallOccurrence -= 1;
      foundScene.occurrence = foundSceneOccurrence as any;
      if (foundSceneOccurrence === 0) {
        // Remove the scene if occurrence hits 0
        tag.scenes.splice(foundSceneIndex, 1);
        tag.scenesOccurrence = tag.scenes.length;
      } else {
        // Update the specific scene with the decremented occurrence
        tag.scenes[foundSceneIndex] = foundScene;
      }
    } else {
      // Remove the scene completely
      tag.scenes.splice(foundSceneIndex, 1);
      tag.scenesOccurrence = tag.scenes.length;
      tag.overallOccurrence -= foundSceneOccurrence;
      foundScene.occurrence = foundSceneOccurrence as any;
    }
    // console.log("=========> final tag: ", tag)
    // Save the tag after modification
    console.log("🚀 ~ deleteTag ~ tag:", tag);
    await tag.save();
    const json = await EditorContent.findOne({
      sceneId: sceneId,
      isDeleted: false,
    }).lean();

    if (json) {
      let contentUpdated = false;
      const { contentUpdated: updated } = await updateContentAndDeleteTag(
        json,
        tagId
      );
      if (updated) contentUpdated = true;
      console.log("🚀 ~ deleteTag ~ contentUpdated:", contentUpdated);
      if (contentUpdated) {
        await EditorContent.updateOne(
          { _id: json._id },
          { $set: { content: json.content } }
        );
      }
    }
    res.status(200).json({
      success: true,
      message: decrementOnlyOnce
        ? "Tag occurrence decremented in the scene"
        : "Tag removed from the scene",
      json: json?.content,
    });
    return;
  }
  console.log("marking the whole tag as deleted");
  // Handle global deletion
  tag.isDeleted = true;

  // Save the tag after modification
  await tag.save();

  res.status(200).json({ success: true, message: "Tag successfully deleted" });
});

const getById = asyncHandler(async (req: Request, res: Response) => {
  const tagId = req.params.tagId;
  if (!tagId) {
    res.status(400).json({ success: false, error: "Tag Id is missing" });
  }
  const response =
    (await Tag.findById(tagId, { isDeleted: false }).lean()) ?? null;
  const tagFound = {
    ...response, // Convert the Mongoose document to a plain JavaScript object
    category: response?.categoryId, // Add the populated category as a root-level field
  };
  res.status(200).json({ success: true, tagFound });
  return;
});

export default {
  createTag,
  updateTag,
  getTags,
  autoTagging,
  // autoTagging2,
  deleteTag,
  groupDeleteTag,
  mergeTags,
  getById,
  autoScriptTagging,
};

import { Types } from "mongoose";
import { addCustomMark, DocumentNode } from "../services/tag/tagAllmentions";

interface TagSearchParams {
  fileId?: Types.ObjectId | string;
  categoryId?: Types.ObjectId | string;
  name?: string;
  ids?: Types.ObjectId[]; // Array of IDs for dynamic searching
}

interface UpdateTagOptions {
  userId: Types.ObjectId | string;
  byAdmin?: boolean;
  notes?: string;
}

export const handleTag = async ({
  searchParams,
  sceneId,
  updateOptions,
}: {
  searchParams: TagSearchParams;
  sceneId: Types.ObjectId | string;
  updateOptions: UpdateTagOptions;
}) => {
  // Dynamic find query based on input
  searchParams.name = searchParams.name?.trim();
  const query: any = {
    isDeleted: false,
    ...(searchParams.fileId && { fileId: searchParams.fileId }),
    ...(searchParams.categoryId && { categoryId: searchParams.categoryId }),
    ...(searchParams.name && {
      $expr: {
        $eq: [{ $toLower: "$name" }, searchParams.name.toLowerCase()],
      },
    }),
    ...(searchParams.ids && { _id: { $in: searchParams.ids } }),
  };

  const existingTag = await Tag.findOne(query).lean();

  if (existingTag) {
    const sceneIndex = existingTag.scenes.findIndex(
      (scene) => scene.sceneId.toString() === sceneId.toString()
    );

    if (sceneIndex === -1) {
      // Add a new scene to the tag's scenes array
      return await Tag.findByIdAndUpdate(
        existingTag._id,
        {
          $push: { scenes: { sceneId, occurrence: 1 } },
          $inc: { overallOccurrence: 1, scenesOccurrence: 1 },
        },
        { new: true }
      );
    } else {
      // Increment the occurrence for this scene
      return await Tag.findOneAndUpdate(
        { _id: existingTag._id, "scenes.sceneId": sceneId },
        {
          $inc: { "scenes.$.occurrence": 1, overallOccurrence: 1 },
        },
        { new: true }
      );
    }
  } else {
    // Generate a unique tag name if the name is provided
    const tagName = searchParams.name
      ? await generateUniqueTagName(searchParams.name, searchParams.fileId)
      : null;

    // Create a new tag
    return await Tag.create({
      scenes: [{ sceneId, occurrence: 1 }],
      name: tagName || "Unnamed Tag",
      createdBy: updateOptions.userId,
      fileId: searchParams.fileId,
      byAdmin: updateOptions.byAdmin,
      notes: updateOptions.notes,
      categoryId: searchParams.categoryId,
    });
  }
};

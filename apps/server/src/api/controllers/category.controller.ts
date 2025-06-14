import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import User from '../models/user.model'
import Category from '../models/category.model'
import Tag from '../models/tag.model'
interface ICreateCategoryHelper {
  createdBy?: string
  fileId: string
  byAdmin: boolean
  name: string
  color: string
}
export const createCategoryHelper = async (body: ICreateCategoryHelper) => {
  const { name, createdBy: userId, fileId, byAdmin, color } = body
  return await Category.create({
    name: name,
    createdBy: userId,
    fileId,
    byAdmin: byAdmin,
    color: color,
    notes: ''
  })
}

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  // res.ok({data:"Working"})
  const { name, userId, fileId, color } = req.body
  const byAdmin = req.user.isAdmin
  if (!userId || !fileId) {
    res.status(400).json({ error: 'Missing User ID || fileId missing' })
  }
  const userFound = await User.findOne({ _id: userId }).lean()
  if (userFound) {
    // Check if a category with the same name exists for the given fileId
    const existingCategory = await Category.findOne({
      $expr: {
        $eq: [{ $toLower: '$name' }, name.toLowerCase()]
      }, // Case-insensitive exact match
      fileId
    }).lean()
    if (existingCategory) {
      res.status(400).json({
        success: false,
        message: 'Category with the same name already exists in this scene'
      })
      return
    }
    const createdTag = await createCategoryHelper({
      name: name,
      createdBy: userId,
      fileId,
      byAdmin: byAdmin ?? false,
      color: color
    })
    res.status(200).json({ success: true, data: createdTag })
  } else {
    res.status(400).json({ success: false, message: 'User is Deleted' })
  }
})
const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId
    // const userId = req.user?._id;
    if (!categoryId) {
      res.status(400).json({ success: false, error: 'Tag Id is missing' })
    }
    const foundCategory = await Category.findOne({ _id: categoryId }).lean()
    if (foundCategory) {
      // only can update color and name
      const updObj = {
        name: req.body.name,
        color: req.body.color,
        notes: req.body.notes ?? foundCategory.notes
      }
      const updateTag = await Category.findByIdAndUpdate(categoryId, updObj, {
        new: true
      })
      res.status(200).json({ success: true, data: updateTag })
    } else {
      res.status(400).json({ success: false, error: 'Invalid Tag ID' })
    }
  } catch (error: any) {
    console.log('Error =>', error)
    res.status(400).json({ success: false, error: error.messag })
  }
})
const getCategories = asyncHandler(async (req: Request, res: Response) => {
  // console.log("Testing");
  // console.log("user =>", req.user);

  const fileId = req.query.fileId
  const sceneId = req.query.sceneId

  if (!fileId && !sceneId) {
    res.status(400).json({
      success: false,
      error: 'Either fileId or sceneId must be provided'
    })
    return
  }

  const excludeEmptyCategories = req.query.excludeEmptyCategories === 'true'
  // console.log("🚀 ~ getCategories ~ excludeEmptyCategories:", excludeEmptyCategories)

  // console.log(" ---- fetching based on ", fileId ? "fileId: " + fileId : "sceneId: " + sceneId);

  // Aggregation logic
  const AllElementCount = await Tag.countDocuments({
    sceneId,
    isDeleted: false
  })
  const categoriesWithTags = await Category.aggregate([
    {
      $match: {
        $and: [
          { fileId: new mongoose.Types.ObjectId(fileId as string) },
          { isDeleted: false }
        ]
      }
    },
    {
      $lookup: {
        from: 'tags', // Tags collection
        let: { categoryId: '$_id' }, // Bind the current category ID
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$categoryId', '$$categoryId'] }, // Match categoryId
                  { $eq: ['$isDeleted', false] }, // Exclude deleted tags
                  ...(sceneId
                    ? [
                        {
                          $in: [
                            new mongoose.Types.ObjectId(sceneId as string),
                            '$scenes.sceneId'
                          ] // Match sceneId in the scenes array
                        }
                      ]
                    : []) // Apply sceneId filter if provided
                ]
              }
            }
          },
          {
            $addFields: {
              sceneOccurrence: {
                $filter: {
                  input: '$scenes', // Filter the scenes array
                  as: 'scene',
                  cond: sceneId
                    ? {
                        $eq: [
                          '$$scene.sceneId',
                          new mongoose.Types.ObjectId(sceneId as string)
                        ]
                      }
                    : true // If sceneId is provided, only include matching scenes
                }
              }
            }
          }
        ],
        as: 'tags' // Output the matching tags
      }
    },
    {
      $project: {
        _id: 1,
        createdBy: 1,
        byAdmin: 1,
        fileId: 1,
        name: 1,
        color: 1,
        tags: 1,
        notes: 1
      }
    },
    ...(excludeEmptyCategories
      ? [
          {
            $match: {
              tags: { $ne: [] } // Exclude categories without tags
            }
          }
        ]
      : [])
  ])
  // const categoriesWithTags = await Category.aggregate([
  //     {
  //         $match: {
  //             $or: [
  //                 { byAdmin: true },
  //                 {
  //                     $and: [
  //                         { fileId: new mongoose.Types.ObjectId(fileId as string) },
  //                         { isDeleted: false }
  //                     ]
  //                 }
  //             ]
  //         },
  //     },
  //     {
  //         $lookup: {
  //             from: "tags",
  //             let: {
  //                 categoryId: "$_id",
  //                 isByAdmin: "$byAdmin"
  //             },
  //             pipeline: [
  //                 {
  //                     $match: {
  //                         $expr: {
  //                             $and: [
  //                                 { $eq: ["$categoryId", "$$categoryId"] },
  //                                 {
  //                                     $cond: {
  //                                         if: { $eq: ["$$isByAdmin", true] },
  //                                         then: true,
  //                                         else: { $eq: ["$isDeleted", false] }
  //                                     }
  //                                 }
  //                             ],
  //                         },
  //                     },
  //                 },
  //                 {
  //                     $addFields: {
  //                         sceneOccurrence: {
  //                             $filter: {
  //                                 input: "$scenes",
  //                                 as: "scene",
  //                                 cond: {
  //                                     $cond: {
  //                                         if: { $eq: ["$$isByAdmin", false] },
  //                                         then: sceneId
  //                                             ? { $eq: ["$$scene.sceneId", new mongoose.Types.ObjectId(sceneId as string)] }
  //                                             : true,
  //                                         else: true // For byAdmin true, no filtering on scenes
  //                                     }
  //                                 },
  //                             },
  //                         },
  //                     },
  //                 },
  //             ],
  //             as: "tags",
  //         },
  //     },
  //     {
  //         $project: {
  //             _id: 1,
  //             createdBy: 1,
  //             byAdmin: 1,
  //             fileId: 1,
  //             name: 1,
  //             color: 1,
  //             tags: 1,
  //         },
  //     },
  //     ...(excludeEmptyCategories
  //         ? [
  //             {
  //                 $match: {
  //                     tags: { $ne: [] }, // Exclude categories without tags
  //                 },
  //             },
  //         ]
  //         : []),
  // ]);

  // console.log("🚀 ~ getCategories ~ categoriesWithTags :", categoriesWithTags);
  res.status(200).json({ success: true, data: categoriesWithTags })
})

const autoTagging = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id
  const sceneId = req.query.sceneId
  // const userId = "66f255ee2711d88c76d33da7"
  // const fileId = "66f256802711d88c76d33dc7"
  // console.log("Testing");
  var contentData = req.body
  // const userTagArray = await Category.find({
  //     $and: [
  //         { isDeleted: false },
  //         {
  //             $or: [
  //                 { sceneId: sceneId },
  //                 { byAdmin: true }
  //             ]
  //         }
  //     ]
  // },
  //     { _id: 1, name: 1, color: 1 }).lean()
  // contentData = await splitTextContent(contentData)
  // for (let i = 0; i < contentData.content.length; i++) {
  //     const mTagArray = await separateUntaggingText(contentData, i)
  //     // console.log(`${i} mTagArray =>`,mTagArray);
  //     if (mTagArray.length > 0) {
  //         const assignTag = await getTagForWords(mTagArray, userTagArray)
  //         // console.log(`${i} Assign Tag =>`,assignTag);
  //         // const updatedData = await mergeTagging(contentData, assignTag, i)
  //         // console.log(`${i} Updated Data =>` , updatedData);
  //         // contentData.content[i] = updatedData.content[i]
  //     }
  // }
  // const jsonStringData = JSON.stringify(contentData)
  // const bufferData = Buffer.from(jsonStringData, 'utf-8');
  // await updateProjectService({
  //     fileId: fileId,
  //     screenplay: new Binary(bufferData) as any,
  //     // screenplay: bufferData as any,
  //     userId: userId,
  // })
  res
    .status(200)
    .json({ success: true, message: 'Sucessfull', data: contentData })
})

const deleteCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId
  if (!categoryId) {
    res.status(400).json({ success: false, error: 'Tag Id is missing' })
  }
  await Category.findByIdAndUpdate(categoryId, { isDeleted: true })
  const deletedTags = await Tag.deleteMany({ categoryId })
  res.status(200).json({ success: true, message: 'Successfully deleted' })
})

export default {
  deleteCategoryById,
  autoTagging,
  getCategories,
  updateCategory,
  createCategory
}

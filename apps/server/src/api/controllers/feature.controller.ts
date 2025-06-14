import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import Feature from '../models/feature.model'
import mongoose from 'mongoose'

const addFeature = asyncHandler(async (req: Request, res: Response) => {
  const { feature_name, feature_status, feature_description } = req.body
  const user = req.user

  try {
    await Feature.create({
      feature_name,
      feature_status,
      feature_description,
      status: true,
      created_by: user._id
    })
    res
      .status(201)
      .json({ success: true, message: 'Feature Given added successfully' })
  } catch (error) {
    console.error(
      'An error occurred while Feature Given added successfully',
      error
    )
    res.status(500).json({
      success: false,
      message: 'An error occurred while Feature Given added successfully'
    })
  }
})
const requestFeature = asyncHandler(async (req: Request, res: Response) => {
  const {
    feature_name,
    feature_description,
    other_requested_features,
    feature_need
  } = req.body
  const user = req.user

  try {
    // Create a new feature
    await Feature.create({
      feature_name,
      feature_description,
      feature_need,
      created_by: user._id
    })

    // Update the `feature_requested_by` array for the other requested features
    if (other_requested_features && other_requested_features.length > 0) {
      const featureIds = other_requested_features.map(
        id => new mongoose.Types.ObjectId(id)
      )
      await Feature.updateMany(
        { _id: { $in: featureIds } },
        { $addToSet: { feature_requested_by: user._id } } // Add user ID if not already present
      )

      await Feature.find({ _id: { $in: featureIds } })
    }

    res
      .status(201)
      .json({ success: true, message: 'Feature added successfully' })
  } catch (error) {
    console.error('An error occurred while adding the feature:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while adding the feature'
    })
  }
})

const getAllFeature = asyncHandler(async (req: Request, res: Response) => {
  try {
    const features = await Feature.find(
      { status: true },
      '_id feature_status feature_name feature_description '
    ).populate({
      path: 'feature_requested_by',
      select: '_id firstName lastName profile_image'
    })

    res.status(201).json({
      success: true,
      features
    })
  } catch (error) {
    console.error('An error occurred while fetching features', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching features'
    })
  }
})

export default {
  getAllFeature,
  addFeature,
  requestFeature
}

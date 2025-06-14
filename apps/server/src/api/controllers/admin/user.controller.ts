/* eslint-disable import/no-anonymous-default-export */
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../../models/user.model'
import Subscription from '../../models/subscription.model'
import Feedback from '../../models/feedback.model'
import mongoose from 'mongoose'

// const getVerifiedUsers = asyncHandler(async (req: Request, res: Response) => {
//     try {
//         const verifiedUsers = await User.find({ isVerified: true });
//         res.status(200).json({ success: true, users: verifiedUsers });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to fetch verified users', error: error });
//     }
// });

const getVerifiedUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const { search, plan, page = 1, limit = 10 } = req.query
    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    // Prepare the base match stage for verified users
    const matchStage: any = { isVerified: true }

    // Add search filter (name) if provided
    if (search) {
      matchStage.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ]
    }

    // Prepare the aggregation pipeline
    const pipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'subscriptions',
          localField: '_id',
          foreignField: 'userId',
          as: 'subscriptions'
        }
      },
      // Add plan filter if provided
      ...(plan && plan !== 'All'
        ? [
            {
              $match: {
                'subscriptions.plan': plan
              }
            }
          ]
        : []),
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          profile_image: 1,
          phoneNo: 1,
          role: 1,
          isVerified: 1,
          createdAt: 1,
          updatedAt: 1,
          colorCode: 1,
          // Get the first subscription only (remove the array)
          subscription: { $arrayElemAt: ['$subscriptions', 0] }
        }
      }
    ]

    // Create count pipeline (without pagination)
    const countPipeline = [...pipeline, { $count: 'total' }]

    // Add pagination to main pipeline
    pipeline.push(
      { $skip: (pageNumber - 1) * limitNumber },
      { $limit: limitNumber }
    )

    // Execute both pipelines in parallel
    const [users, countResult] = await Promise.all([
      User.aggregate(pipeline),
      User.aggregate(countPipeline)
    ])

    const totalUsers = countResult[0]?.total || 0

    res.status(200).json({
      success: true,
      users,
      pagination: {
        total: totalUsers,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalUsers / limitNumber)
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch verified users',
      error: error instanceof Error ? error.message : error
    })
  }
})

const getRevenueStats = asyncHandler(async (req: Request, res: Response) => {
  try {
    const now = new Date()
    const lastWeekStart = new Date(now)
    lastWeekStart.setDate(now.getDate() - 14)
    const lastWeekEnd = new Date(now)
    lastWeekEnd.setDate(now.getDate() - 7)

    const thisWeekStart = new Date(now)
    thisWeekStart.setDate(now.getDate() - 7)

    const thisWeekRevenue = await Subscription.aggregate([
      {
        $match: {
          status: 'success',
          createdAt: { $gte: thisWeekStart, $lte: now }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ])

    const lastWeekRevenue = await Subscription.aggregate([
      {
        $match: {
          status: 'success',
          createdAt: { $gte: lastWeekStart, $lt: thisWeekStart }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ])

    const totalRevenue = await Subscription.aggregate([
      {
        $match: { status: 'success' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ])

    const thisWeek = thisWeekRevenue[0]?.total || 0
    const lastWeek = lastWeekRevenue[0]?.total || 0
    const total = totalRevenue[0]?.total || 0

    const percentageChange =
      lastWeek === 0
        ? 100
        : Math.min(((thisWeek - lastWeek) / lastWeek) * 100, 100)

    res.status(200).json({
      success: true,
      total,
      thisWeek,
      lastWeek,
      percentageChange: Number(percentageChange.toFixed(2))
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch revenue stats', error })
  }
})

const getSubscriptionStats = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const now = new Date()
      const lastWeekStart = new Date(now)
      lastWeekStart.setDate(now.getDate() - 14)
      const lastWeekEnd = new Date(now)
      lastWeekEnd.setDate(now.getDate() - 7)

      const thisWeekStart = new Date(now)
      thisWeekStart.setDate(now.getDate() - 7)

      // Sum the amount for this week
      const thisWeekAmount = await Subscription.aggregate([
        {
          $match: {
            status: 'success',
            createdAt: { $gte: thisWeekStart, $lte: now }
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' }
          }
        }
      ])

      // Sum the amount for last week
      const lastWeekAmount = await Subscription.aggregate([
        {
          $match: {
            status: 'success',
            createdAt: { $gte: lastWeekStart, $lt: thisWeekStart }
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' }
          }
        }
      ])

      const totalSubscriptionsAmount = await Subscription.aggregate([
        {
          $match: { status: 'success' }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' }
          }
        }
      ])

      // Calculate the percentage change
      const percentageChange =
        lastWeekAmount[0]?.totalAmount === 0
          ? 100
          : Math.min(
              ((thisWeekAmount[0]?.totalAmount -
                lastWeekAmount[0]?.totalAmount) /
                lastWeekAmount[0]?.totalAmount) *
                100,
              100
            )

      res.status(200).json({
        success: true,
        totalAmount: totalSubscriptionsAmount[0]?.totalAmount || 0,
        thisWeekAmount: thisWeekAmount[0]?.totalAmount || 0,
        lastWeekAmount: lastWeekAmount[0]?.totalAmount || 0,
        percentageChange: Number(percentageChange.toFixed(2))
      })
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: 'Failed to fetch subscription stats',
          error
        })
    }
  }
)

const getUsersWithSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const usersWithSubscription = await User.aggregate([
        {
          $lookup: {
            from: 'subscriptions',
            localField: '_id',
            foreignField: 'userId',
            as: 'subscriptions'
          }
        },
        {
          $match: { 'subscriptions.0': { $exists: true } }
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            email: 1,
            profile_image: 1,
            phoneNo: 1,
            role: 1,
            isVerified: 1,
            subscriptions: 1
          }
        }
      ])

      res.status(200).json({ success: true, users: usersWithSubscription })
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: 'Failed to fetch users with subscriptions',
          error
        })
    }
  }
)

const getVerifiedUsersCount = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const now = new Date()
      const lastWeekStart = new Date(now)
      lastWeekStart.setDate(now.getDate() - 14)
      const lastWeekEnd = new Date(now)
      lastWeekEnd.setDate(now.getDate() - 7)

      const thisWeekStart = new Date(now)
      thisWeekStart.setDate(now.getDate() - 7)
      const thisWeekCount = await User.countDocuments({
        isVerified: true,
        createdAt: { $gte: thisWeekStart, $lte: now }
      })

      // Verified users count last week
      const lastWeekCount = await User.countDocuments({
        isVerified: true,
        createdAt: { $gte: lastWeekStart, $lt: thisWeekStart }
      })

      const totalVerifiedUsers = await User.countDocuments({ isVerified: true })

      const percentageChange =
        lastWeekCount === 0
          ? 100
          : Math.min(
              ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100,
              100
            )

      res.status(200).json({
        success: true,
        count: totalVerifiedUsers,
        thisWeekCount,
        lastWeekCount,
        percentageChange: Number(percentageChange.toFixed(2))
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch verified user count',
        error
      })
    }
  }
)

const getAllFeedbacks = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { type, status, sortBy, page = '1', limit = '10' } = req.query
    const pageNumber = Math.max(parseInt(page as string, 10) || 1, 1)
    const limitNumber = Math.max(parseInt(limit as string, 10) || 10, 1)
    const skip = (pageNumber - 1) * limitNumber

    const filter: any = {}
    if (type && type !== 'All') {
      filter.feedback_type = new RegExp(`^${type}$`, 'i')
    }
    if (status && status !== 'All') {
      filter.status = new RegExp(`^${status}$`, 'i')
    }

    const sortOptions: Record<string, 1 | -1> = {
      createdAt: sortBy === 'Oldest' ? 1 : -1
    }

    const totalFeedbacks = await Feedback.countDocuments(filter)

    const feedbacksRaw = await Feedback.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber)
      .populate('userId', '-password -__v')

    // Filter out feedbacks with missing userId or _id
    const validFeedbacksRaw = feedbacksRaw.filter(
      fb => fb.userId && fb.userId.toString()
    )

    const userIds = validFeedbacksRaw.map(fb => fb.userId.toString())
    const subscriptions = await Subscription.aggregate([
      {
        $match: {
          userId: {
            $in: userIds.map(id => new mongoose.Types.ObjectId(id))
          },
          status: 'success'
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$userId',
          plan: { $first: '$plan' }
        }
      }
    ])

    const userPlanMap = subscriptions.reduce((acc, sub) => {
      acc[sub._id.toString()] = sub.plan
      return acc
    }, {} as Record<string, string>)

    const feedbacks = feedbacksRaw.map((fb: any) => {
      const feedback = fb.toObject()
      const user = feedback.userId

      if (user && user._id) {
        const plan = userPlanMap[user._id.toString()] || 'BASIC'
        feedback.user = { ...user, currentPlan: plan }
      } else {
        // fallback for missing user
        feedback.user = { currentPlan: 'BASIC' }
      }

      delete feedback.userId
      return feedback
    })

    res.status(200).json({
      success: true,
      total: totalFeedbacks,
      feedbacks,
      pagination: {
        total: totalFeedbacks,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalFeedbacks / limitNumber)
      }
    })
  } catch (error: any) {
    console.error('Error in getAllFeedbacks:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedbacks',
      error: error.message || error
    })
  }
})

const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid feedback ID'
      })
    }

    const fb = await Feedback.findById(id).populate('userId', '-password -__v')

    if (!fb) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }
    const feedback = fb.toObject() as any
    feedback.user = feedback.userId
    delete feedback.userId

    res.status(200).json({
      success: true,
      feedback
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error
    })
  }
}

const getUsersWithoutSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const usersWithoutSubscription = await User.aggregate([
        {
          $lookup: {
            from: 'subscriptions',
            localField: '_id',
            foreignField: 'userId',
            as: 'subscriptions'
          }
        },
        {
          $match: { subscriptions: { $size: 0 } }
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            email: 1,
            profile_image: 1,
            phoneNo: 1,
            role: 1,
            isVerified: 1
          }
        }
      ])

      res.status(200).json({ success: true, users: usersWithoutSubscription })
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: 'Failed to fetch users without subscriptions',
          error
        })
    }
  }
)

export default {
  getVerifiedUsersCount,
  getVerifiedUsers,
  getUsersWithSubscription,
  getUsersWithoutSubscription,
  getRevenueStats,
  getSubscriptionStats,
  getAllFeedbacks,
  getFeedbackById
}

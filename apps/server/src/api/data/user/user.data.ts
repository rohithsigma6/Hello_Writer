import mongoose, { Schema } from 'mongoose'
import Secret, { ISecret } from '../../models/secret.model'
import User, { IUser } from '../../models/user.model'
import {
  IGetUserParams,
  IGetUserByIdParams,
  ICreateUserParams,
  IUpdateUserParams,
  IGetSecretsParams,
  IGetSearchedUserEmailsParams,
  ICreateSecretParams,
  IUpdateSecretParams
} from './types'
import Eligibility from '../../models/eligible.model'
import { Types } from 'mongoose'
import UserProfile from '../../models/user-profile.model'
import Collaboration from '../../models/collaboration.model'

export const getUser = async ({
  email,
  googleId
}: IGetUserParams): Promise<IUser | null> => {
  try {
    const filter: any = {}
    if (email) {
      filter.email = email
    }
    if (googleId) {
      filter.googleId = googleId
    }
    const data: any = await User.findOne(filter)
    const profile: any = await UserProfile.findOne({
      userId: JSON.parse(JSON.stringify(data?._id))
    })
    const eligibility = await Eligibility.findOne({
      userId: JSON.parse(JSON.stringify(data?._id))
    })
    return {
      ...JSON.parse(JSON.stringify(data)),
      profile,
      isEligible: eligibility?.subscriptionId ? true : false,
      eligibility: {
        inkCredits: eligibility?.inkCredits,
        subscriptionId: eligibility?.subscriptionId,
        features: eligibility?.features
      }
    }
  } catch (error) {
    return null
  }
}

export const getUserById = async ({
  userId
}: IGetUserByIdParams): Promise<IUser | null> => {
  try {
    const data = await User.findById(userId)
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createUser = async ({
  email,
  googleId = '',
  role,
  firstName,
  lastName,
  phoneNo,
  colorCode,
  isAdmin,
  lifetimeRegistered,
  isVerified
}: ICreateUserParams): Promise<IUser | null> => {
  try {
    const data = await User.create({
      email,
      googleId,
      role,
      firstName,
      phoneNo,
      lastName,
      colorCode,
      lifetimeRegistered,
      isAdmin,
      isVerified
    })
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateUser = async ({
  userId,
  email,
  googleId,
  role,
  isAdmin,
  isVerified
}: IUpdateUserParams): Promise<IUser | null> => {
  try {
    const updObj: any = {}

    if (email) {
      updObj.email = email
    }
    if (googleId) {
      updObj.googleId = googleId
    }
    if (isAdmin) {
      updObj.isAdmin = isAdmin
    }
    if (role) {
      updObj.role = role
    }
    if (isVerified) {
      updObj.isVerified = isVerified
    }

    const data = await User.findByIdAndUpdate(userId, updObj, {
      new: true
    })

    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}
export const updateTwoFactorSecret = async ({
  userId,
  twoFactorSecret,
  isMfaActive
}: {
  userId: string
  twoFactorSecret: string
  isMfaActive: boolean
}): Promise<ISecret | null> => {
  try {
    console.log(userId, twoFactorSecret, isMfaActive)
    const data = await Secret.findOneAndUpdate(
      { userId },
      { twoFactorSecret, isMfaActive },
      { new: true, upsert: true }
    )
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getSecrets = async ({
  userId
}: IGetSecretsParams): Promise<ISecret | null> => {
  try {
    const data = await Secret.findOne({
      userId
    })
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getSearchedUserEmails = async ({
  search,
  userId
}: IGetSearchedUserEmailsParams): Promise<ISecret[]> => {
  try {
    // Initialize the query as an empty object
    let query: any = {}

    // Use the search string to match any of the fields: firstName, lastName, or email
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }
    }

    // Add condition to exclude the user with the given userId
    if (userId) {
      query._id = { $ne: userId } // _id should not be equal to userId
    }

    // Find users based on the search criteria
    const data = await User.find(query)
      .select('email firstName lastName profile_image')
      .limit(100)

    // Format the results
    const result = data.map(user => ({
      _id: user._id,
      profile_image: user.profile_image,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`
    }))

    return JSON.parse(JSON.stringify(result)) // Return the result as a plain object
  } catch (error) {
    console.error(error)
    return [] // Return an empty array in case of an error
  }
}

export const getAllUsers = async (userId: string): Promise<IUser[]> => {
  try {
    const objectUserId = new Types.ObjectId(userId)

    // Step 1: Find all collaborations involving the given user
    const collaborations = await Collaboration.find({ userId: objectUserId })

    // Step 2: Extract all resourceIds (files) this user is collaborating on
    const resourceIds = collaborations.map(collab => collab.resourceId)

    // Step 3: Find all collaborators on those files
    const allCollaborations = await Collaboration.find({
      resourceId: { $in: resourceIds }
    })

    // Step 4: Extract unique userIds
    const uniqueUserIds = Array.from(
      new Set(allCollaborations.map(collab => collab.userId.toString()))
    )

    // Step 5: Populate user data
    const users = await User.find({ _id: { $in: uniqueUserIds } })

    return users
  } catch (error) {
    console.error('Error fetching all users:', error)
    return []
  }
}

export const createSecret = async ({
  userId,
  isMfaActive,
  secrets
}: ICreateSecretParams): Promise<ISecret | null> => {
  try {
    const data = await Secret.findOneAndUpdate(
      {
        userId: userId
      },
      { ...secrets, isMfaActive },
      { new: true, upsert: true }
    )
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateSecret = async ({
  userId,
  emailHash,
  hash,
  recoverHash,
  lastRecoverHash
}: IUpdateSecretParams): Promise<ISecret | null> => {
  try {
    const data = await Secret.findOneAndUpdate(
      {
        userId
      },
      { emailHash, hash, recoverHash, lastRecoverHash },
      { new: true }
    )
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    return null
  }
}

// export const createUserOnGoogleAuth = async ({
//   email,
//   role,
//   firstName,
//   lastName,
//   isVerified,
// }: ICreateUserParams): Promise<IUser | null> => {
//   try {

//     const data = await User.create({
//       email,
//       role,
//       firstName,
//       lastName,
//       isVerified,
//     });
//     return JSON.parse(JSON.stringify(data));
//   } catch (error) {
//     console.error(error);
//     return null;
//   }}

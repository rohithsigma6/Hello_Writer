import { Request, Response } from 'express'
import updateUserProfileService from '../services/user-profile/userProfile.service'
import { flatObj } from '../../utils/misc'
import uploadProfileImage, {
  uploadKycImage
} from '../helper/multimedia/multimedia'
import {
  IBasicInfo,
  IKYCVerification,
  INetworkingGoals,
  IPersonalPreferences
} from '../models/user-profile.model'
import User from '../models/user.model'

const onBoardUserProfile = async (req: Request, res: Response) => {
  try {
    const {
      passion,
      otherPassion,
      favoriteScreenPlayFormat,
      favouriteGenres,
      profileBio
    } = req.body
    const personalPreferences: any = {}
    const professionalInfo: any = {}
    const userId = flatObj(req.user._id)
    if (req.file) {
      await uploadProfileImage(req.file, userId)
    }

    professionalInfo.primaryGenre = favouriteGenres[0]
    professionalInfo.secondaryGenres = favouriteGenres
    personalPreferences.passion = passion
    personalPreferences.otherPassion = otherPassion
    personalPreferences.favoriteScreenPlayFormat = favoriteScreenPlayFormat
    professionalInfo.profileBio = profileBio
    const updatedUser = await updateUserProfileService.updateUserProfile(
      userId,
      {
        professionalInfo,
        personalPreferences
      }
    )

    res
      .status(200)
      .json({ message: 'Profile updated successfully', updatedUser })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unexpected error occurred.' })
    }
  }
}
const updateBasicUserProfile = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      dob,
      address,
      country,
      state,
      city,
      zip
    } = req.body
    let basicInfo: IBasicInfo = {
      age,
      gender,
      dob,
      address,
      country,
      state,
      city,
      zip
    }
    const userId = flatObj(req.user._id)

    if (req.file) {
      await uploadProfileImage(req.file, userId)
    }

    // Dynamically build the $set object for updating firstName and lastName
    const updateFields: Partial<{ firstName: string; lastName: string }> = {}
    if (firstName) updateFields.firstName = firstName
    if (lastName) updateFields.lastName = lastName

    // Only perform the update if there are fields to update
    if (Object.keys(updateFields).length > 0) {
      await User.updateOne({ _id: userId }, { $set: updateFields })
    }

    const updatedUser = await updateUserProfileService.updateUserProfile(
      userId,
      {
        basicInfo
      }
    )

    res
      .status(200)
      .json({ message: 'Profile updated successfully', updatedUser })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unexpected error occurred.' })
    }
  }
}

const updateUserProfessionalProfile = async (req: Request, res: Response) => {
  try {
    const {
      notableWorks,
      yearsOfExperience,
      primaryGenre,
      secondaryGenres,
      affiliations,
      currentProjects,
      awardsAndRecognitions,
      profileBio
    } = req.body
    const professionalInfo: any = {
      notableWorks,
      yearsOfExperience,
      primaryGenre,
      secondaryGenres,
      affiliations,
      currentProjects,
      awardsAndRecognitions,
      profileBio
    }
    const userId = flatObj(req.user._id)
    const updatedUser = await updateUserProfileService.updateUserProfile(
      userId,
      {
        professionalInfo
      }
    )

    res
      .status(200)
      .json({ message: 'Profile updated successfully', updatedUser })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unexpected error occurred.' })
    }
  }
}

const updateUserPersonalProfile = async (req: Request, res: Response) => {
  try {
    const {
      passion,
      otherPassion,
      favoriteScreenPlayFormat,
      favoriteScreenWriters,
      favoriteDirectors,
      favoriteWritingTools
    } = req.body
    const personalPreferences: IPersonalPreferences = {
      passion,
      otherPassion,
      favoriteScreenPlayFormat,
      favoriteScreenWriters,
      favoriteDirectors,
      favoriteWritingTools
    }
    const userId = flatObj(req.user._id)

    const updatedUser = await updateUserProfileService.updateUserProfile(
      userId,
      {
        personalPreferences
      }
    )

    res
      .status(200)
      .json({ message: 'Profile updated successfully', updatedUser })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unexpected error occurred.' })
    }
  }
}

const updateUserScreenWritingStyle = async (req: Request, res: Response) => {
  try {
    const {
      writingStyle,
      writingPreference,
      collaborationPreferences,
      inspiration,
      themesOftenExplored,
      toneAndMood
    } = req.body

    const userId = flatObj(req.user._id)
    const screenwritingStyle: any = {
      writingStyle,
      writingPreference,
      collaborationPreferences,
      inspiration,
      themesOftenExplored,
      toneAndMood
    }
    const updatedUser = await updateUserProfileService.updateUserProfile(
      userId,
      {
        screenwritingStyle
      }
    )

    res
      .status(200)
      .json({ message: 'Profile updated successfully', updatedUser })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unexpected error occurred.' })
    }
  }
}


const updateUserNetworkingGoals = async (req: Request, res: Response) => {
  try {
    const { lookingFor, openForWork ,typesOfProjects } = req.body

    const userId = flatObj(req.user._id)
    const networkingGoals:INetworkingGoals = {lookingFor, openForWork ,typesOfProjects }
    const updatedUser = await updateUserProfileService.updateUserProfile(
      userId,
      {
        networkingGoals
      }
    )
    res
      .status(200)
      .json({ message: 'Profile updated successfully', updatedUser })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unexpected error occurred.' })
    }
  }
}


const updateUserKycVerification = async (req: Request, res: Response) => {
  try {
    const { documentType, dateOfBirth } = req.body

    const kycVerification: IKYCVerification = {
      documentType,
      frontImage: '',
      backImage: '',
      name: '',
      dateOfBirth
    }
    const userId = flatObj(req.user._id)
    if (req.file) {
      const imageKey = await uploadKycImage(req.file, userId)
      kycVerification.frontImage = imageKey
    }
    const updatedUser = await updateUserProfileService.updateUserProfile(
      userId,
      {
        kycVerification
      }
    )

    res
      .status(200)
      .json({ message: 'Profile updated successfully', updatedUser })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'An unexpected error occurred.' })
    }
  }
}

export default {
  onBoardUserProfile,
  updateBasicUserProfile,
  updateUserProfessionalProfile,
  updateUserPersonalProfile,
  updateUserScreenWritingStyle,
  updateUserKycVerification,
  updateUserNetworkingGoals,
}

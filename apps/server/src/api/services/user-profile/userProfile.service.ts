import UserProfile from '../../models/user-profile.model';
import { getUserByIdService } from '../user/user.service';

const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const {
      basicInfo,
      professionalInfo,
      personalPreferences,
      screenwritingStyle,
      screenwriterType,
      networkingGoals,
      kycVerification,
      onboardingInfo,
    } = profileData;

    // Filter out undefined fields
    const fieldsToUpdate = {
      basicInfo,
      professionalInfo,
      personalPreferences,
      screenwritingStyle,
      screenwriterType,
      networkingGoals,
      kycVerification,
      onboardingInfo,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(fieldsToUpdate).filter(([_, value]) => value !== undefined)
    );

    // Check if the user exists before updating
    const userExists = await getUserByIdService({ userId });
    if (!userExists) {
      throw new Error('User not found in the database.');
    }

    const existingProfile = await UserProfile.findOne({ userId });
    if (!existingProfile) {
      console.error('No profile found for user:', userId);
      const newProfile = await UserProfile.create({ userId, ...filteredFields });
      return newProfile;
    }
    // Update the user profile
    const updatedUser = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: filteredFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error('Update failed.');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export default { updateUserProfile /* , handleImageUpload */ };

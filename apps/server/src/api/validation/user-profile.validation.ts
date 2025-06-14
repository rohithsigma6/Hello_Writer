import { celebrate, Joi, Segments } from "celebrate";

// Validation for the Image sub-schema
const imageValidation = Joi.object({
  key: Joi.string().required(),
  url: Joi.string().uri().required(),
  originalName: Joi.string().required(),
});

// Validation for the Session sub-schema
const sessionValidation = Joi.object({
  active: Joi.boolean().required(),
  lastActiveDate: Joi.date().optional(),
});

// Validation for the Cloud sub-schema
const cloudValidation = Joi.object({
  connected: Joi.boolean().required(),
  backupPath: Joi.string().required(),
  backupFormats: Joi.array().items(
    Joi.object({
      format: Joi.string().valid("fountain", "pdf", "fdx").required(),
      status: Joi.string().valid("enabled", "disabled").required(),
    })
  ).required(),
});

// Validation for the Account sub-schema
const accountValidation = Joi.object({
  status: Joi.string().valid("active", "closed").required(),
  closedDate: Joi.date().optional(),
});

// Validation for the Basic Information sub-schema
const basicInfoValidation = Joi.object({
  age: Joi.number().optional(),
  gender: Joi.string().optional(),
  location: Joi.string().optional(),
  image: imageValidation.optional(),
  customTemplate: Joi.array().items(Joi.string()).optional(),
  cloudTemplate: Joi.boolean().optional(),
  twoFactorAuthentication: Joi.string().optional(),
  session: sessionValidation.optional(),
  cloudBackup: cloudValidation.optional(),
  account: accountValidation.optional(),
});

// Validation for the Professional Information sub-schema
const professionalInfoValidation = Joi.object({
  yearsOfExperience: Joi.number().min(0).optional(),
  primaryGenre: Joi.string().optional(),
  secondaryGenres: Joi.array().items(Joi.string()).optional(),
  notableWorks: Joi.string().max(275).optional(),
  affiliations: Joi.string().max(275).optional(),
  currentProjects: Joi.string().max(275).optional(),
  awardsAndRecognitions: Joi.string().max(275).optional(),
});

// Validation for the Personal Preferences sub-schema
const personalPreferencesValidation = Joi.object({
  favoriteMovies: Joi.string().optional(),
  favoriteScreenwriters: Joi.string().max(275).optional(),
  favoriteDirectors: Joi.string().max(275).optional(),
  favoriteGenres: Joi.array().items(Joi.string()).optional(),
  favoriteWritingTools: Joi.string().max(500).optional(),
});

// Validation for the Screenwriting Style sub-schema
const screenwritingStyleValidation = Joi.object({
  writingProcess: Joi.string().valid(
    "Outline first",
    "Straight to Draft",
    "Draft and Revise",
    "Structured Approach"
  ).optional(),
  collaborationPreferences: Joi.string().valid("Solo", "Co-Writer", "Writing Room").optional(),
  inspiration: Joi.array().items(Joi.string().valid("Real Life Events", "Books", "Folklore", "Film/TV")).optional(),
  themesOftenExplored: Joi.string().max(275).optional(),
  toneAndMood: Joi.string().valid("Dark", "Light Hearted", "Suspenseful", "Melodramatic").optional(),
});

// Validation for the Screenwriter Type sub-schema
const screenwriterTypeValidation = Joi.object({
  writingProcess: Joi.string().valid("Forest Writer", "Tree Writer", "Both").required(),
});

// Validation for the Networking Goals sub-schema
const networkingGoalsValidation = Joi.object({
  lookingFor: Joi.array().items(Joi.string().valid("Collaborators", "Mentors", "Agents", "Industry Contacts")).required(),
  openForWork: Joi.boolean().required(),
  typesOfProjects: Joi.array().items(Joi.string().valid(
    "Short Films",
    "Feature-length Films",
    "TV Series",
    "Web Series",
    "Documentaries",
    "Theater"
  )).required(),
});

// Validation for the KYC Verification sub-schema
const kycVerificationValidation = Joi.object({
  documentType: Joi.string().required(),
  frontImage: imageValidation.required(),
  backImage: imageValidation.required(),
  name: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
});

// Validation for the Onboarding Info sub-schema
const onboardingInfoValidation = Joi.object({
  intreast: Joi.object({
    intreasts: Joi.array().items(Joi.string()).optional(),
    other_intereast: Joi.string().optional(),
    intreasted_format: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  favourite_genres: Joi.array().items(Joi.string()).optional(),
  profile_image: Joi.string().uri().optional(),  // S3 URL or file path
  profile_bio: Joi.string().optional(),
});

// Main UserProfile validation
const userProfileValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    basicInfo: basicInfoValidation.optional(),
    professionalInfo: professionalInfoValidation.optional(),
    personalPreferences: personalPreferencesValidation.optional(),
    screenwritingStyle: screenwritingStyleValidation.optional(),
    screenwriterType: screenwriterTypeValidation.optional(),
    networkingGoals: networkingGoalsValidation.optional(),
    kycVerification: kycVerificationValidation.optional(),
    onboardingInfo: onboardingInfoValidation.optional(), // Add onboardingInfo validation here
  }),
});

// Export all validations
export const validateUser = {
  userProfileValidation,
};

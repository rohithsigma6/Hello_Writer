import mongoose, { Document, Schema } from 'mongoose'

// Define the interface for the image sub-schema

interface ICloud {
  connected: boolean
  backupPath: string
  backupFormats: {
    format: 'fountain' | 'pdf' | 'fdx'
    status: 'enabled' | 'disabled'
  }[]
}

interface IAccount {
  status: 'active' | 'closed'
  closedDate?: Date
}

// Define the interface for Basic Information sub-schema
export interface IBasicInfo {
  age?: number
  dob?: string
  gender?: string
  address?: string
  country?: string
  state?: string
  city?: string
  zip?: string
  customTemplate?: string[]
  cloudTemplate?: boolean
  cloudBackup?: ICloud
  account?: IAccount
}

// Define the interface for Professional Information sub-schema
interface IProfessionalInfo {
  profileBio?: string
  yearsOfExperience?: number
  primaryGenre?: string
  secondaryGenres?: string[]
  notableWorks?: string
  affiliations?: string
  currentProjects?: string
  awardsAndRecognitions?: string
}

// Define the interface for Personal Preferences sub-schema
export interface IPersonalPreferences {
  favoriteMovies?: string
  passion?: string[]
  otherPassion?: string
  favoriteScreenPlayFormat?: string[]
  favoriteScreenWriters?: string
  favoriteDirectors?: string
  favoriteWritingTools?: string
}

// Define the interface for Screenwriting Style sub-schema
interface IScreenwritingStyle {
  writingStyle?: 'Forest Writer' | 'Tree Writer' | 'Both'
  writingPreference?:
    | 'Outline first'
    | 'Straight to Draft'
    | 'Draft and Revise'
    | 'Structured Approach'
  collaborationPreferences?: 'Solo' | 'Co-Writer' | 'Writing Room'
  inspiration?: ('Real Life Events' | 'Books' | 'Folklore' | 'Film/TV')[]
  themesOftenExplored?: string
  toneAndMood?: 'Dark' | 'Light Hearted' | 'Suspenseful' | 'Melodramatic'
}

// Define the interface for Networking Goals sub-schema
export interface INetworkingGoals {
  lookingFor: ('Collaborators' | 'Mentors' | 'Agents' | 'Industry Contacts')[]
  openForWork: boolean
  typesOfProjects: (
    | 'Short Films'
    | 'Feature-length Films'
    | 'TV Series'
    | 'Web Series'
    | 'Documentaries'
    | 'Theater'
  )[]
}

// Define the interface for KYC Verification sub-schema
export interface IKYCVerification {
  documentType: string
  frontImage: string
  backImage: string
  name: string
  dateOfBirth: Date
}

// Extend main interface with sub-schema interfaces
export interface IUserProfile extends Document {
  userId: mongoose.Schema.Types.ObjectId
  basicInfo?: IBasicInfo
  professionalInfo?: IProfessionalInfo
  personalPreferences?: IPersonalPreferences
  screenwritingStyle?: IScreenwritingStyle
  networkingGoals?: INetworkingGoals
  kycVerification?: IKYCVerification
}

// Define sub-schemas
const BasicInfoSchema = new Schema<IBasicInfo>(
  {
    age: { type: Number },
    gender: { type: String },
    address: { type: String },
    dob: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zip: { type: String },
    customTemplate: [{ type: String }],

    cloudBackup: {
      connected: { type: Boolean, default: false },
      backupPath: { type: String },
      backupFormats: [
        {
          format: { type: String, enum: ['fountain', 'pdf', 'fdx'] },
          status: {
            type: String,
            enum: ['enabled', 'disabled'],
            default: 'disabled'
          }
        }
      ]
    },

    account: {
      status: { type: String, enum: ['active', 'closed'], default: 'active' },
      closedDate: { type: Date }
    }
  },
  { _id: false } // Prevent MongoDB from creating an _id for this sub-document
)

const ProfessionalInfoSchema = new Schema<IProfessionalInfo>(
  {
    profileBio: { type: String },
    yearsOfExperience: { type: Number, min: 0 },
    primaryGenre: { type: String },
    secondaryGenres: [{ type: String }],
    notableWorks: { type: String, maxlength: 275 },
    affiliations: { type: String, maxlength: 275 },
    currentProjects: { type: String, maxlength: 275 },
    awardsAndRecognitions: { type: String, maxlength: 275 }
  },
  { _id: false } // Prevent MongoDB from creating an _id for this sub-document
)

const PersonalPreferencesSchema = new Schema<IPersonalPreferences>(
  {
    favoriteMovies: { type: String },
    passion: [{ type: String }],
    otherPassion: { type: String },
    favoriteScreenPlayFormat: [{ type: String }],
    favoriteScreenWriters: { type: String, maxlength: 275 },
    favoriteDirectors: { type: String, maxlength: 275 },
    favoriteWritingTools: { type: String, maxlength: 500 }
  },
  { _id: false } // Prevent MongoDB from creating an _id for this sub-document
)

const ScreenwritingStyleSchema = new Schema<IScreenwritingStyle>(
  {
    writingStyle: {
      type: String,
      enum: ['Forest Writer', 'Tree Writer', 'Both']
    },
    writingPreference: {
      type: String,
      enum: [
        'Outline first',
        'Straight to Draft',
        'Draft and Revise',
        'Structured Approach'
      ]
    },
    collaborationPreferences: {
      type: String,
      enum: ['Solo', 'Co-Writer', 'Writing Room']
    },
    inspiration: {
      type: [String],
      enum: ['Real Life Events', 'Books', 'Folklore', 'Film/TV']
    },
    toneAndMood: {
      type: String,
      enum: ['Dark', 'Light Hearted', 'Suspenseful', 'Melodramatic']
    }
  },
  { _id: false } // Prevent MongoDB from creating an _id for this sub-document
)

const KYCVerificationSchema = new Schema<IKYCVerification>(
  {
    documentType: { type: String, required: true },
    frontImage: { type: String, required: true },
    backImage: { type: String, required: true },
    dateOfBirth: { type: Date }
  },
  { _id: false } // Prevent MongoDB from creating an _id for this sub-document
)

const NetworkingGoalsSchema = new Schema<INetworkingGoals>(
  {
    lookingFor: {
      type: [String],
      enum: ['Collaborators', 'Mentors', 'Agents', 'Industry Contacts']
    },
    openForWork: { type: Boolean, default: false },
    typesOfProjects: {
      type: [String],
      enum: [
        'Short Films',
        'Feature-length Films',
        'TV Series',
        'Web Series',
        'Documentaries',
        'Theater'
      ]
    }
  },

  { _id: false } // Prevent MongoDB from creating an _id for this sub-document
)

// Main UserProfile schema incorporating sub-schemas
const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    basicInfo: { type: BasicInfoSchema },
    professionalInfo: { type: ProfessionalInfoSchema },
    personalPreferences: { type: PersonalPreferencesSchema },
    screenwritingStyle: { type: ScreenwritingStyleSchema },
    networkingGoals: { type: NetworkingGoalsSchema },
    kycVerification: { type: KYCVerificationSchema }
  },
  { timestamps: true }
)

const UserProfile = mongoose.model<IUserProfile>(
  'UserProfile',
  userProfileSchema
)

export default UserProfile

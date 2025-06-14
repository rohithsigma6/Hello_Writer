import mongoose, { Document, Schema } from "mongoose";

// Define the interface for Basic Information sub-schema
interface IBasicInfo {
  photo?: string;
  name?: string;
  talentsSkills?: string[];
  birthdate?: string;
  age?: number;
  gender?: string;
  nationality?: string;
  hometown?: string;
  currentResidence?: string;
  occupation?: string;
  income?: string;
  backgroundAsChild?: string;
  brothersSisters?: string;
  husbandWife?:  string;
  children?:  string;
  grandparents?: string;
  grandchildren?:  string;
  significantOthers?:  string;
  relationshipSkills?: string;
}

// Define the interface for Physical Characteristics sub-schema
interface IPhysicalCharacteristics {
  height?: string;
  weight?: string;
  race?: string;
  hairColor?: string;
  eyeColor?: string;
  glassesOrContacts?: string;
  skinColor?: string;
  shapeOfFace?: string;
  distinguishingFeatures?: string;
  disabilities?: string;
  dressStyle?: string;
  mannerisms?: string;
  physicalHabits?: string;
  health?: string;
  favoriteSayings?: string;
  style?: string;
  greatestFlaw?: string;
  bestQuality?: string;
}


// Define the interface for Personality & Psychology sub-schema
// Define the interface for Personality & Psychology sub-schema
interface IPersonalityPsychology {
  introvertOrExtrovert?: string;
  intelligenceLevel?: string;
  mentalHealth?: string;
  educationalBackground?: string;
  learningExperiences?: string;
  shortTermGoals?: string;
  longTermGoals?: string;
  selfPerception?: string;
  perceptionByOthers?: string;
  confidenceLevel?: string;
  emotionalLevel?: string;
  logicalLevel?: string;
  embarrassingFactors?: string;
}
// Define the interface for Emotional Characteristics sub-schema
interface IEmotionalCharacteristics {
  strengths?: string;
  weaknesses?: string;
  dealingWithConflict?: string;
  dealingWithSadness?: string;
  dealingWithChange?: string;
  dealingWithLoss?: string;
  lifeGoals?: string;
  desiredChanges?: string;
  happinessSources?: string;
  judgmental?: string;
  generosity?: string;
  politeness?: string;
}

// Define the interface for Spiritual Characteristics sub-schema
interface ISpiritualCharacteristics {
  dealingWithConflict?: string;
  dealingWithSadness?: string;
  dealingWithChange?: string;
  dealingWithLoss?: string;
  lifeGoals?: string;
  desiredChanges?: string;
  happinessSources?: string;
  judgmental?: string;
  generosity?: string;
  politeness?: string;
}

// Define the interface for The Character & Your Story sub-schema
interface ICharacterStory {
  roleInScreenPlay?: string;
  firstAppearanceScene?: string;
  relationshipWithCharacters?: string;
  relationshipWithAllCharacters?: string;
  characterChange?: string;
  additionalNotes?: string;
}

interface ICharacterBuilder {
  basicInfo?: IBasicInfo;
  physicalCharacteristics?: IPhysicalCharacteristics;
  personalityPsychology?: IPersonalityPsychology;
  emotionalCharacteristics?: IEmotionalCharacteristics;
  spiritualCharacteristics?: ISpiritualCharacteristics;
  characterStory?: ICharacterStory;
}

interface ITemplate {
  characterBuilder?: ICharacterBuilder;
  characterBlueprint?: ICharacterBlueprint;
  freeform?: IFreeformSchema;
}

interface ICharacterBlueprint {
  photo?: string;
  characterName?: string;
  singleSentenceDescription?: string;
  personality?: string;
  purposeInStory?: string;
  uniqueness?: string;
  readerInterest?: string;
  caresMostAbout?: string;
  physicalTraits?: string;
  mostImportantEvent?: string;
  biggestConcerns?: string;
  problemSolvingApproach?: string;
  significantChangeTrigger?: string;
  relationshipsWithOthers?: string;
}

interface IFreeformSchema {
  photo?: string;
  characterName?: string;
  description?: string;
}
interface ICharacterProfile extends Document {
  fileId: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  characterBuilder?: ICharacterBuilder;
  characterBlueprint?: ICharacterBlueprint;
  freeform?: string;
  allTemplate?: ITemplate;
  selectedTemplate?: string;
  template?:string;
  draftTitle?: string,
  writeFreely?: boolean,
  characterStatus?: string;
}

// Define sub-schemas
const BasicInfoSchema = new Schema<IBasicInfo>({
  photo: { type: String },
  name: { type: String },
  talentsSkills: [{ type: String }],
  birthdate: { type: String },
  age: { type: Number },
  gender: { type: String },
  nationality: { type: String },
  hometown: { type: String },
  currentResidence: { type: String },
  occupation: { type: String },
  income: { type: String },
  backgroundAsChild: { type: String },
  brothersSisters:{ type: String },
  husbandWife: { type: String },
  children:{ type: String },
  grandparents:{ type: String },
  grandchildren:{ type: String },
  significantOthers:{ type: String },
  relationshipSkills: { type: String },
}, { _id: false });

const PhysicalCharacteristicsSchema = new Schema<IPhysicalCharacteristics>({
  height: { type: String },
  weight: { type: String },
  race: { type: String },
  hairColor: { type: String },
  eyeColor: { type: String },
  glassesOrContacts: { type: String },
  skinColor: { type: String },
  shapeOfFace: { type: String },
  distinguishingFeatures: { type: String },
  disabilities: { type: String },
  dressStyle: { type: String },
  mannerisms: { type: String },
  physicalHabits: { type: String },
  health: { type: String },
  favoriteSayings: { type: String },
  style: { type: String },
  greatestFlaw: { type: String },
  bestQuality: { type: String },
}, { _id: false });

const PersonalityPsychologySchema = new Schema<IPersonalityPsychology>({
  introvertOrExtrovert: { type: String },
  intelligenceLevel: { type: String },
  mentalHealth: { type: String },
  educationalBackground: { type: String },
  learningExperiences: { type: String },
  shortTermGoals: { type: String },
  longTermGoals: { type: String },
  selfPerception: { type: String },
  perceptionByOthers: { type: String },
  confidenceLevel: { type: String },
  emotionalLevel: { type: String },
  logicalLevel: { type: String },
  embarrassingFactors: { type: String },
}, { _id: false });


const EmotionalCharacteristicsSchema = new Schema<IEmotionalCharacteristics>({
  strengths: { type: String },
  weaknesses: { type: String },
  dealingWithConflict: { type: String },
  dealingWithSadness: { type: String },
  dealingWithChange: { type: String },
  dealingWithLoss: { type: String },
  lifeGoals: { type: String },
  desiredChanges: { type: String },
  happinessSources: { type: String },
  judgmental: { type: String },
  generosity: { type: String },
  politeness: { type: String },
}, { _id: false });

const SpiritualCharacteristicsSchema = new Schema<ISpiritualCharacteristics>({
  dealingWithConflict: { type: String },
  dealingWithSadness: { type: String },
  dealingWithChange: { type: String },
  dealingWithLoss: { type: String },
  lifeGoals: { type: String },
  desiredChanges: { type: String },
  happinessSources: { type: String },
  judgmental: { type: String },
  generosity: { type: String },
  politeness: { type: String },
}, { _id: false });


const CharacterStorySchema = new Schema<ICharacterStory>({
  roleInScreenPlay: {type : String},
  firstAppearanceScene: { type: String },
  relationshipWithCharacters: { type: String },
  relationshipWithAllCharacters: { type: String},
  characterChange: { type: String },
  additionalNotes: { type: String },
}, { _id: false });

const CharacterBuilderSchema = new Schema<ICharacterBuilder>({
  basicInfo: BasicInfoSchema,
  physicalCharacteristics: PhysicalCharacteristicsSchema,
  personalityPsychology: PersonalityPsychologySchema,
  emotionalCharacteristics: EmotionalCharacteristicsSchema,
  spiritualCharacteristics: SpiritualCharacteristicsSchema,
  characterStory: CharacterStorySchema,
}, { _id: false });

const CharacterBlueprintSchema = new Schema<ICharacterBlueprint>({
  photo: { type: String },
  characterName: { type: String },
  singleSentenceDescription: { type: String },
  personality: { type: String },
  purposeInStory: { type: String },
  uniqueness: { type: String },
  readerInterest: { type: String },
  caresMostAbout: { type: String },
  physicalTraits: { type: String },
  mostImportantEvent: { type: String },
  biggestConcerns: { type: String },
  problemSolvingApproach: { type: String },
  significantChangeTrigger: { type: String },
  relationshipsWithOthers: { type: String },
}, { _id: false });

const FreeformSchema = new Schema<IFreeformSchema>({
  photo: { type: String },
  characterName: { type: String },
  description: { type: String },
}, { _id: false });


const templateSchema = new Schema<ITemplate>({
  characterBuilder: CharacterBuilderSchema,
  characterBlueprint: CharacterBlueprintSchema,
  freeform: FreeformSchema,
})
const CharacterProfileSchema = new Schema<ICharacterProfile>({
  fileId: { type: Schema.Types.ObjectId, ref: "File", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  allTemplate: templateSchema,
  selectedTemplate: {
    type: String,
    enum: ["characterBuilder", "characterBlueprint", "freeform"],
  },
  template: { type: String },
  draftTitle: { type: String },
  writeFreely: {type:Boolean, default:false},
  characterStatus: {type:String,enum: ["finalize", "draft"], default:"draft",
  }
}, { timestamps: true });

const CharacterProfile = mongoose.model<ICharacterProfile>("CharacterProfile", CharacterProfileSchema);

export default CharacterProfile;

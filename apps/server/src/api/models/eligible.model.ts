import mongoose, { Schema } from 'mongoose'

const EligibilitySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subscriptionId: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
    required: true
  },
  inkCredits: {
    type: Number,
    required: true
  },
  features: {
    // Beginner Plan
    eLearningCourses: { type: Boolean, default: false },
    screenplayLibrary: { type: Boolean, default: false },
    prewritingTools: { type: Boolean, default: false },
    intuitiveScreenplayEditor: { type: Boolean, default: false },
    unlimitedProjects: { type: Boolean, default: false },
    multilingualSupport: { type: Boolean, default: false },
    industryStandardFormatting: { type: Boolean, default: false },
    writingSprintsGoals: { type: Boolean, default: false },
    aiWritingAssistant: { type: Boolean, default: false },
    spellGrammarCheck: { type: Boolean, default: false },
    plotDiagnostics: { type: Boolean, default: false },
    blockchainScriptRegistry: { type: Boolean, default: false },
    contestsEngagement: { type: Boolean, default: false },

    // Intermediate Plan
    dictationAssistant: { type: Boolean, default: false },
    ocrFormatting: { type: Boolean, default: false },
    advancedFormatting: { type: Boolean, default: false },
    realTimeCollaboration: { type: Boolean, default: false },
    crowdCollaborativeWriting: { type: Boolean, default: false },
    peerValidation: { type: Boolean, default: false },
    scriptCoverage: { type: Boolean, default: false },
    pitchDeckBuilder: { type: Boolean, default: false },
    industryMarketPlace: { type: Boolean, default: false },
    writerRepresentation: { type: Boolean, default: false },
    directorToolkit: { type: Boolean, default: false },
    physicalPlottingWriting: { type: Boolean, default: false },

    // Prof Plan
    audioVideoConferencing: { type: Boolean, default: false },
    smartPenIntegration: { type: Boolean, default: false },
    tableRead: { type: Boolean, default: false },
    screenplayAudioBook: { type: Boolean, default: false },
    scriptDoctoring: { type: Boolean, default: false },
    screenplayReports: { type: Boolean, default: false },
    storyBoards: { type: Boolean, default: false },
    translateScreenplays: { type: Boolean, default: false },
    transliterateScreenplays: { type: Boolean, default: false },
    advancedDirectorToolkit: { type: Boolean, default: false },
    trackPitches: { type: Boolean, default: false },
    earnOnPlatform: { type: Boolean, default: false },

    // Enterprice Plan
    manageWritersRooms: { type: Boolean, default: false },
    discoverScreenplays: { type: Boolean, default: false },
    greenlight: { type: Boolean, default: false },
    breakdowns: { type: Boolean, default: false },
    shotLists: { type: Boolean, default: false },
    productionRequirements: { type: Boolean, default: false },
    onboardCastCrew: { type: Boolean, default: false },
    contractsManagement: { type: Boolean, default: false },
    preProductionManagement: { type: Boolean, default: false },
    budgetScheduleTool: { type: Boolean, default: false },
    callSheets: { type: Boolean, default: false },
    dailyProductionReports: { type: Boolean, default: false }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  expireAt: { type: Date, index: { expires: 0 } } // TTL index
})

const Eligibility = mongoose.model('Eligibility', EligibilitySchema)
export default Eligibility

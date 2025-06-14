import mongoose from 'mongoose'

const BeatSchema = new mongoose.Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  placeHolder: { type: String, required: false },
  content: { type: String, required: false },
  comments: [{ type: String, required: false }],
  notes: [{ type: String, required: false }],
  collaborators: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
  ],
  storyline: String,
  characters: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'CharacterProfile', required: false }
  ],
  location: { type: String, required: false },
  progressStatus: { type: String, required: false },
  isPredefined: { type: String, required: false, default: true }
})

const ManualBeatSchema = new mongoose.Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
  comments: [{ type: String, required: false }],
  notes: [{ type: String, required: false }],
  collaborators: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
  ],
  storyline: { type: String, required: false },
  characters: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'CharacterProfile', required: false }
  ],
  location: { type: String, required: false },
  progressStatus: { type: String, required: false },
  image: [{ type: String, required: false }],
  isPredefined: { type: String, required: false, default: false }
})

const ActSchema = new mongoose.Schema({
  title: String,
  predefinedBeat: [BeatSchema],
  manualBeats: [ManualBeatSchema]
})

const TemplateSchema = new mongoose.Schema({
  type: String,
  template: [ActSchema]
})

const PlotSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  templateType: {
    type: String,
    required: true
  },
  draftTitle: { type: String, required: true },
  templateData: [TemplateSchema],
  writeFreelyData: {
    content: String
  },
  status: {
    type: String,
    enum: ['draft', 'finalized'],
    default: 'draft'
  }
})

const Template = mongoose.model('plotTemplate', TemplateSchema)
const Plot = mongoose.model('Plot', PlotSchema)

export { Template, Plot }

import mongoose from 'mongoose'

const ThemeTemplateSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  templateTitle: { type: String, required: true },
  templateOptionTitle: { type: String, required: true },
  templateTheme: [{ type: String, required: false }],
  templateOptions: [
    {
      _id: false,
      que: { type: String, required: true },
      queDescription: { type: mongoose.Schema.Types.Mixed, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const ThemeSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.ObjectId, ref: 'File', required: false },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },

  themeDrafts: [
    new mongoose.Schema({
      templateId: {
        type: mongoose.Schema.ObjectId,
        ref: 'ThemeTemplateSchema',
        required: false // Nullable for freeform drafts
      },
      templateOptions: [
        {
          _id: false,
          que: { type: String, required: false },
          ans: { type: mongoose.Schema.Types.Mixed, required: false }
        }
      ],
      draftTitle: { type: String, required: true },
      freeformTheme: { type: String, required: false }, // Added for Freeform Drafts
      isDraft: { type: Boolean, default: true }
    })
  ],

  finalTheme: { type: mongoose.Schema.Types.Mixed, required: false },
  status: { type: String, enum: ['draft', 'final'], default: 'draft' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Theme = mongoose.model('Theme', ThemeSchema)
const ThemeTemplate = mongoose.model('ThemeTemplate', ThemeTemplateSchema)

export { Theme, ThemeTemplate }

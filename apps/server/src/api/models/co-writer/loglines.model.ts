// import mongoose, { Document, Schema } from 'mongoose'

// const LoglineTemplateSchema = new mongoose.Schema({
//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
//   templateTitle: { type: String, required: true },
//   templateLogline: [{ type: String, required: true }],
//   templateOptions: [
//     {
//       que: { type: String, required: true },
//       queDescription: { type: String, required: true },
//       ans: { type: String, required: true }
//     }
//   ],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// })

// const LoglineTemplate = mongoose.model('LoglineTemplate', LoglineTemplateSchema)

// const LoglineSchema = new mongoose.Schema({
//   fileId: { type: mongoose.Schema.ObjectId, ref: 'File', required: false },
//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },

//   loglineDrafts: [
//     new mongoose.Schema({
//       templateId: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'LoglineTemplate',
//         required: true
//       },
//       templateOptions: [
//         {
//           que: { type: String, required: true },
//           ans: { type: String, required: true }
//         },
//         { _id: false } // Prevents _id from being added to subdocuments
//       ],
//       isDraft: { type: Boolean, default: true }
//     })
//   ],

//   logline: { type: String, required: false },

//   finalLogline: { type: String, required: false },
//   status: { type: String, enum: ['draft', 'final'], default: 'draft' },

//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// })

// const Logline = mongoose.model('Logline', LoglineSchema)

// export { Logline, LoglineTemplate }
import mongoose from 'mongoose'

const LoglineTemplateSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  templateTitle: { type: String, required: true },
  templateOptionTitle: { type: String, required: true },
  templateLogline: [{ type: String, required: true }],
  templateOptions: [
    {
      que: { type: String, required: true },
      queDescription: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const LoglineSchema = new mongoose.Schema({
  fileId: { type: mongoose.Schema.ObjectId, ref: 'File', required: false },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },

  loglineDrafts: [
    new mongoose.Schema({
      templateId: {
        type: mongoose.Schema.ObjectId,
        ref: 'LoglineTemplate',
        required: false // Nullable for freeform drafts
      },
      templateOptions: [
        {
          que: { type: String, required: false },
          ans: { type: String, required: false }
        }
      ],
      draftTitle: { type: String, required: true },
      freeformLogline: { type: String, required: false }, // Added for Freeform Drafts
      isDraft: { type: Boolean, default: true }
    })
  ],

  finalLogline: { type: String, required: false },
  status: { type: String, enum: ['draft', 'final'], default: 'draft' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Logline = mongoose.model('Logline', LoglineSchema)
const LoglineTemplate = mongoose.model('LoglineTemplate', LoglineTemplateSchema)

export { Logline, LoglineTemplate }

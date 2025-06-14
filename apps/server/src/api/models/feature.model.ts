import mongoose, { Document, Schema } from 'mongoose'

export interface IFeature extends Document {
  created_by: mongoose.Schema.Types.ObjectId
  feature_status: string
  feature_name: string
  feature_description: string
  feature_need: string
  status: boolean
  feature_requested_by: mongoose.Schema.Types.ObjectId[]
}

const FeatureSchema = new Schema<IFeature>(
  {
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feature_status: {
      type: String,
      enum: ['LIVE', 'COMING VERY SOON', 'COMING SOON'],
      default: 'COMING SOON'
    },
    feature_name: { type: String },
    feature_description: { type: String },
    feature_need: { type: String },
    status: { type: Boolean, default: false, required: true },
    feature_requested_by: [
      { type: Schema.Types.ObjectId, ref: 'User', required: false }
    ]
  },
  { timestamps: true }
)

const Feature = mongoose.model<IFeature>('Feature', FeatureSchema)

export default Feature

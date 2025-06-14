import mongoose, { Schema } from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    plan: {
      type: String,
      enum: ['BASIC', 'INTERMEDIATE', 'PROFESSIONAL', 'BETA', 'TRIAL'],
      default: 'BASIC'
    },
    // plan_expiration: { type: Date, required: true },
    order_id: { type: String, required: true },
    payment_gateway: { type: String, required: true },
    receipt: { type: String, default: null },
    status: { type: String, enum: ['created', 'success'], default: 'created' }
  },
  { timestamps: true }
)

// subscriptionSchema.index({ plan_expiration: 1 }, { expireAfterSeconds: 0 })

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription

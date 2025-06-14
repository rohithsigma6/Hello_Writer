import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils'
import { instance as razorpayInstance } from '../../../app' // Assuming Razorpay instance is already set up
import Subscription from '../../models/subscription.model'
import Eligibility from '../../models/eligible.model'
import crypto from 'crypto'
import { sendSubscriptionConfirmationEmail } from '../../../lib/mail/mail'
import User from '../../models/user.model'
import axios from 'axios'
import retry from 'axios-retry'
retry(axios, {
  retries: 3, // Retry up to 3 times
  retryCondition: error => error.response?.status === 429, // Retry on 429
  retryDelay: retryCount => {
    return Math.pow(2, retryCount) * 1000 // Exponential backoff: 1s, 2s, 4s, etc.
  }
})

const beginnerFeatures = {
  eLearningCourses: true,
  screenplayLibrary: true,
  prewritingTools: true,
  intuitiveScreenplayEditor: true,
  unlimitedProjects: true,
  multilingualSupport: true,
  industryStandardFormatting: true,
  writingSprintsGoals: true,
  aiWritingAssistant: true,
  spellGrammarCheck: true,
  plotDiagnostics: true,
  blockchainScriptRegistry: true,
  contestsEngagement: true
}

const intermediateFeatures = {
  ...beginnerFeatures,
  dictationAssistant: true,
  ocrFormatting: true,
  advancedFormatting: true,
  realTimeCollaboration: true,
  crowdCollaborativeWriting: true,
  peerValidation: true,
  scriptCoverage: true,
  pitchDeckBuilder: true,
  industryMarketPlace: true,
  writerRepresentation: true,
  directorToolkit: true,
  physicalPlottingWriting: true
}

const professionalFeatures = {
  ...intermediateFeatures,
  audioVideoConferencing: true,
  smartPenIntegration: true,
  tableRead: true,
  screenplayAudioBook: true,
  scriptDoctoring: true,
  screenplayReports: true,
  storyBoards: true,
  translateScreenplays: true,
  transliterateScreenplays: true,
  advancedDirectorToolkit: true,
  trackPitches: true,
  earnOnPlatform: true
}

const enterpriceFeatures = {
  ...professionalFeatures,
  manageWritersRooms: true,
  discoverScreenplays: true,
  greenlight: true,
  breakdowns: true,
  shotLists: true,
  productionRequirements: true,
  onboardCastCrew: true,
  contractsManagement: true,
  preProductionManagement: true,
  budgetScheduleTool: true,
  callSheets: true,
  dailyProductionReports: true
}

const getFeaturesByPlan = (plan: string) => {
  switch (plan) {
    case 'INTERMEDIATE':
      return intermediateFeatures
    case 'PROFESSIONAL':
      return professionalFeatures
    case 'ENTERPRICE':
      return enterpriceFeatures
    default:
      return beginnerFeatures
  }
}

const PLAN_AMOUNTS = {
  semiAnnual: { 3299: 'BASIC', 4999: 'INTERMEDIATE', 5999: 'PROFESSIONAL' },
  annual: { 4999: 'BASIC', 6999: 'INTERMEDIATE', 9999: 'PROFESSIONAL' }
}

const calculateExpiration = (planType: 'semiAnnual' | 'annual'): Date => {
  const currentDate = new Date()
  return planType === 'annual'
    ? new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
    : new Date(currentDate.setMonth(currentDate.getMonth() + 6))
}

const getPlanDetails = (
  amount: number,
  planType: 'semiAnnual' | 'annual'
): { planName: string } | null => {
  const planName = PLAN_AMOUNTS[planType][amount]
  if (!planName) return null

  return { planName }
}

// Razorpay Methods
const createRazorpayOrder = async (
  amount: number,
  userId: string,
  paymentFor: string
) => {
  const currentDate = new Date()
  const planName = paymentFor
  const planExpiration = new Date(
    currentDate.setFullYear(currentDate.getFullYear() + 1)
  )
  const orderOptions = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `receipt_${userId}`
  }

  const order = await razorpayInstance.orders.create(orderOptions)
  const subscriptionData = {
    order_id: order.id,
    userId,
    amount,
    payment_gateway: 'razorpay',
    plan: 'BETA',
    plan_type: planName,
    plan_expiration: planExpiration,
    status: 'created'
  }

  const subscription = new Subscription(subscriptionData)
  await subscription.save()
  return order
}

const verifyRazorpayPayment = (response: any, secret: string): boolean => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    response
  return validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    secret
  )
}

const generateChecksum = (payloadBase64, uriPath, secretKey) => {
  const stringToSign = payloadBase64 + uriPath + secretKey
  const hash = crypto.createHash('sha256').update(stringToSign).digest('hex')
  const keyIndex = 1 // Update this if using a different key index
  return `${hash}###${keyIndex}`
}
const createPhonePeOrder = async (amount, paymentFor, user) => {
  const {
    PHONEPE_MERCHANT_ID,
    PHONEPE_SECRET_KEY,
    PHONEPE_API_URL,
    BACKEND_BASEURL
  } = process.env

  const userId = user._id
  const userPhoneNo = user.phoneno
  const userName = `${user.firstName} ${user.lastName}`
  const merchantTransactionId = `Txn_${Date.now()}`
  const planExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  ) // Expire after 1 year
  const requestData = {
    merchantId: PHONEPE_MERCHANT_ID,
    merchantTransactionId,
    merchantUserId: `MUID_${userId}`,
    name: userName,
    mobileNumber: userPhoneNo,
    amount: amount * 100, // Convert amount to paise
    redirectUrl: `${BACKEND_BASEURL}/api/payment/phonepe/paymentverification?merchantId=${PHONEPE_MERCHANT_ID}&merchantTransactionId=${merchantTransactionId}&paymentFor=${paymentFor}`,
    callbackUrl: `${BACKEND_BASEURL}/api/payment/phonepe/paymentverification?merchantId=${PHONEPE_MERCHANT_ID}&merchantTransactionId=${merchantTransactionId}&paymentFor=${paymentFor}`,
    redirectMode: 'REDIRECT',
    paymentInstrument: {
      type: 'PAY_PAGE'
    }
  }

  try {
    // Generate payload and checksum
    const payloadBase64 = Buffer.from(JSON.stringify(requestData)).toString(
      'base64'
    )
    const checksum = generateChecksum(
      payloadBase64,
      '/pg/v1/pay',
      PHONEPE_SECRET_KEY
    )

    // API Request Options
    const options = {
      method: 'POST',
      url: `${PHONEPE_API_URL}/pg/v1/pay`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {
        request: payloadBase64
      }
    }

    // Make the API request
    const response = await axios.request(options)

    if (response.data.success) {
      // Save subscription details
      const subscriptionData = {
        order_id: merchantTransactionId,
        userId,
        amount,
        payment_gateway: 'phonepe',
        plan: 'BETA', // Default to 'BETA' if planType is undefined
        plan_expiration: planExpiration,
        status: 'created'
      }
      const subscription = new Subscription(subscriptionData)
      await subscription.save()

      return {
        phonePeResponse: response.data.data.instrumentResponse
      }
    } else {
      throw new Error(
        `PhonePe API Error: ${response.data.message || 'Unknown error'}`
      )
    }
  } catch (error) {
    console.error('Error in createPhonePeOrder:', error, error)
    throw new Error('Failed to create PhonePe order. Please try again later.')
  }
}

const verifyPhonePePayment = async ({ merchantId, merchantTransactionId }) => {
  try {
    const { PHONEPE_API_URL, PHONEPE_SECRET_KEY } = process.env

    // Construct the URL for verification
    const requestPath = `/pg/v1/status/${merchantId}/${merchantTransactionId}`
    const url = `${PHONEPE_API_URL}${requestPath}`

    // Generate checksum if required
    const checksum = generateChecksum('', requestPath, PHONEPE_SECRET_KEY)

    // API Request Options
    const options = {
      method: 'GET',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-MERCHANT-ID': merchantId,
        'X-VERIFY': checksum // Optional: Remove if PhonePe API does not require this for GET requests
      }
    }

    const response = await axios.request(options)
    if (response.data && response.data.success) {
      return true // Payment is verified successfully
    }

    console.error('PhonePe verification failed:', response.data)
    return false
  } catch (error) {
    console.log(error)
    console.error('Error in verifyPhonePePayment:')
    throw new Error(
      'PhonePe payment verification failed. Please try again later.'
    )
  }
}

// Shared Success/Failure Logic
const successRazorpayPayment = async (response: any): Promise<void> => {
  const { razorpay_order_id, phonepe_order_id } = response
  const orderId = razorpay_order_id || phonepe_order_id

  const subscription: any = await Subscription.findOneAndUpdate(
    { order_id: orderId },
    { status: 'success' },
    { new: true }
  )

  if (subscription) {
    const userId = subscription.userId
    const user: any = await User.findById(userId)
    //todo in future for all plans
    // const plan = subscription.plan;
    const features = getFeaturesByPlan('PROFESSIONAL')

    await Eligibility.findOneAndUpdate(
      { userId },
      {
        userId,
        subscriptionId: subscription._id,
        inkCredits: 5000,
        features
      },
      { upsert: true, new: true }
    )
    await sendSubscriptionConfirmationEmail(
      `${user?.firstName} ${user?.lastName}`,
      user.email,
      subscription.plan,
      subscription.amount,
      subscription.order_id,
      subscription.createdAt
    )
  }
}
const successPhonepePayment = async ({
  merchantTransactionId
}: any): Promise<void> => {
  const subscription: any = await Subscription.findOneAndUpdate(
    { order_id: merchantTransactionId },
    { status: 'success' },
    { new: true }
  )

  if (subscription) {
    const userId = subscription.userId
    const user: any = await User.findById(userId)
    const features = getFeaturesByPlan('PROFESSIONAL')

    await Eligibility.findOneAndUpdate(
      { userId },
      {
        userId,
        subscriptionId: subscription._id,
        inkCredits: 5000,
        features
      },
      { upsert: true, new: true }
    )
    await sendSubscriptionConfirmationEmail(
      `${user?.firstName} ${user?.lastName}`,
      user.email,
      subscription.plan,
      subscription.amount,
      subscription.order_id,
      subscription.createdAt
    )
  }
}

const failedPayment = async (order_id: string): Promise<void> => {
  await Subscription.findOneAndDelete({ order_id })
}

export const normalizeEmail = (email: string): string => {
  const [localPart, domain] = email.toLowerCase().split('@')
  if (domain === 'gmail.com') {
    return `${localPart.split('+')[0]}@${domain}`
  }
  return email.toLowerCase()
}

export const FreeTrialPlan = async ({
  amount,
  userId,
  paymentFor
}: {
  amount: number
  userId: string
  paymentFor: string
}) => {
  const planName = 'TRIAL'

  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')

  const normalizedEmail = normalizeEmail(user.email)

  // Check if any user already exists with the normalized email (excluding current user)
  const duplicateEmailUser = await User.findOne({
    email: normalizedEmail,
    _id: { $ne: userId }
  })

  if (duplicateEmailUser && amount === 0 && planName === 'TRIAL') {
    throw new Error(
      'Free trial already used from a similar Gmail address. Please use a different email.'
    )
  }

  // Prevent duplicate subscription for the same amount & plan
  const existingSubscription = await Subscription.findOne({
    userId,
    amount,
    plan: planName
  })

  if (existingSubscription) {
    throw new Error(
      'User already has a subscription with the same plan and amount.'
    )
  }

  const currentDate = new Date()
  const planExpiration = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  )

  const subscriptionData = {
    order_id: `receipt_${userId}`,
    userId,
    amount,
    payment_gateway: planName,
    plan: planName,
    plan_type: paymentFor,
    plan_expiration: planExpiration,
    status: 'success'
  }

  const subscription = new Subscription(subscriptionData)

  const features = getFeaturesByPlan('PROFESSIONAL')

  await Eligibility.findOneAndUpdate(
    { userId },
    {
      userId,
      subscriptionId: subscription._id,
      inkCredits: 5000,
      features,
      expireAt: planExpiration
    },
    { upsert: true, new: true }
  )

  await sendSubscriptionConfirmationEmail(
    `${user.firstName} ${user.lastName}`,
    user.email,
    subscription.plan,
    subscription.amount,
    subscription.order_id,
    subscription.createdAt
  )

  await subscription.save()
  return subscription
}

export default {
  // Razorpay methods
  createRazorpayOrder,
  verifyRazorpayPayment,

  // PhonePe methods
  createPhonePeOrder,
  verifyPhonePePayment,

  // Shared methods
  successPhonepePayment,
  successRazorpayPayment,
  failedPayment,
  FreeTrialPlan
}

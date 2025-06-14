import asyncHandler from 'express-async-handler'
import paymentService from '../services/payment/payment.service'
import { getUserByIdService } from '../services/user/user.service'
import config from '../../config'

// Razorpay Checkout
const razorpayCheckout = asyncHandler(async (req, res) => {
  try {
    const { amount, paymentFor, userId } = req.body

    const order = await paymentService.createRazorpayOrder(
      amount,
      userId,
      paymentFor
    )
    res.status(201).json({ success: true, order })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// PhonePe Checkout
const phonePeCheckout = asyncHandler(async (req, res) => {
  try {
    const { amount, userId, paymentFor } = req.body

    const { user } = await getUserByIdService({ userId })
    const {
      phonePeResponse: { redirectInfo }
    } = await paymentService.createPhonePeOrder(amount, paymentFor, user)
    res.status(201).json({ success: true, redirectInfo })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// Razorpay Payment Verification
const razorpayPaymentVerification = asyncHandler(async (req, res) => {
  try {
    const secret = process.env.RAZERPAY_SECRET!
    const isSuccess = paymentService.verifyRazorpayPayment(
      req.body.response,
      secret
    )

    if (isSuccess) {
      await paymentService.successRazorpayPayment(req.body.response)
      res.status(200).json({ success: true })
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Payment verification failed' })
    }
  } catch (error: any) {
    res.status(400).json({ success: false, message: error?.message })
  }
})

const phonePePaymentVerification = asyncHandler(
  async (req, res): Promise<any> => {
    const { merchantId, merchantTransactionId, paymentFor } = req.query
    try {
      if (!merchantId || !merchantTransactionId) {
        switch (paymentFor) {
          case 'lifeTimeSubscription':
            return res.redirect(
              `${config.url.frontendBaseUrl}/pricing-lifeplan?paymentSuccess=false`
            )
          case 'subscription':
            return res.redirect(
              `${config.url.frontendBaseUrl}/dashboard?paymentSuccess=false`
            )
          case 'secureFile':
            return res.redirect(
              `${config.url.frontendBaseUrl}/secure-file?paymentSuccess=false`
            )
        }
      }

      const isSuccess = await paymentService.verifyPhonePePayment({
        merchantId,
        merchantTransactionId
      })

      if (isSuccess) {
        await paymentService.successPhonepePayment({
          merchantId,
          merchantTransactionId
        })

        switch (paymentFor) {
          case 'subscription':
            return res.redirect(
              `${config.url.frontendBaseUrl}/dashboard?paymentSuccess=true`
            )
          case 'lifeTimeSubscription':
            return res.redirect(
              `${config.url.frontendBaseUrl}/pricing-lifeplan?paymentSuccess=true`
            )
          case 'secureFile':
            return res.redirect(
              `${config.url.frontendBaseUrl}/secure-file?paymentSuccess=true`
            )
        }
      } else {
        switch (paymentFor) {
          case 'subscription':
            return res.redirect(
              `${config.url.frontendBaseUrl}/dashboard?paymentSuccess=false`
            )
          case 'lifeTimeSubscription':
            return res.redirect(
              `${config.url.frontendBaseUrl}/pricing-lifeplan?paymentSuccess=false`
            )
          case 'secureFile':
            return res.redirect(
              `${config.url.frontendBaseUrl}/secure-file?paymentSuccess=false`
            )
        }
      }
    } catch (error: any) {
      // Handle unexpected errors based on `paymentFor`
      let redirectUrl = ''

      switch (paymentFor) {
        case 'subscription':
          redirectUrl = `${
            config.url.frontendBaseUrl
          }/dashboard?paymentSuccess=false&message=${encodeURIComponent(
            error?.message ||
              'An unexpected error occurred during payment verification.'
          )}`
          break
        case 'lifeTimeSubscription':
          redirectUrl = `${
            config.url.frontendBaseUrl
          }/pricing-lifeplan?paymentSuccess=false&message=${encodeURIComponent(
            error?.message ||
              'An unexpected error occurred during payment verification.'
          )}`
          break
        case 'secureFile':
          redirectUrl = `${
            config.url.frontendBaseUrl
          }/secure-file?paymentSuccess=false&message=${encodeURIComponent(
            error?.message ||
              'An unexpected error occurred during payment verification.'
          )}`
          break
        default:
          redirectUrl = `${
            config.url.frontendBaseUrl
          }/dashboard?paymentSuccess=false&message=${encodeURIComponent(
            error?.message ||
              'An unexpected error occurred during payment verification.'
          )}`
          break
      }

      res.redirect(redirectUrl)
    }
  }
)

// Handle Payment Failure
const handlePaymentFailure = asyncHandler(async (req, res) => {
  const { order_id } = req.body
  try {
    await paymentService.failedPayment(order_id)
    res.status(200).json({ success: true, message: 'Payment marked as failed' })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get API Key (Razorpay)
const getKey = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, key: process.env.RAZERPAY_API_KEY })
})
const FreeTrialPlan = asyncHandler(async (req, res) => {
  try {
    const { amount, userId, paymentFor } = req.body
    await paymentService.FreeTrialPlan({ amount, userId, paymentFor })
    return res.redirect(
      `${config.url.frontendBaseUrl}/dashboard?paymentSuccess=true`
    )
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default {
  razorpayCheckout,
  phonePeCheckout,
  razorpayPaymentVerification,
  phonePePaymentVerification,
  handlePaymentFailure,
  getKey,
  FreeTrialPlan
}

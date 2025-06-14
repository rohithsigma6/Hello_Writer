// import { Router } from "express";
// import paymentController from "../controllers/payment.controller";

// const router = Router();

// router.get(
//     "/getkey",
//     paymentController.getKey
// );
// router.post(
//     "/checkout",
//     paymentController.checkout
// );
// router.post(
//     "/paymentverification",
//     paymentController.paymentVerification
// );

// router.post(
//     "/paymentfailure",
//     paymentController.handlePaymentFailure
// );

// export default router;
import { Router } from 'express'
import paymentController from '../controllers/payment.controller'

const router = Router()

// Razorpay Routes
router.post('/razorpay/checkout', paymentController.razorpayCheckout)
router.post(
  '/razorpay/paymentverification',
  paymentController.razorpayPaymentVerification
)

// PhonePe Routes
router.post('/phonepe/checkout', paymentController.phonePeCheckout)
router.get(
  '/phonepe/paymentverification',
  paymentController.phonePePaymentVerification
)

// Shared Route for Payment Failure
router.post('/paymentfailure', paymentController.handlePaymentFailure)

// Razorpay API Key
router.get('/razorpay/getkey', paymentController.getKey)
router.post('/checkout', paymentController.FreeTrialPlan)

export default router

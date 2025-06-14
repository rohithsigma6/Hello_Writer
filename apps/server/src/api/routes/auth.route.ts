import { Router } from 'express'
import { authController } from '../controllers'
import { validateUser } from '../validation'
import passport from 'passport'
import { hybridAuth } from '../middlewares/auth.middleware'
const router = Router()

router.post('/register', validateUser.register, authController.register)
router.post(
  '/login',
  validateUser.login,
  passport.authenticate('local'),
  authController.login
)
router.get('/status', hybridAuth, authController.authStatus)
router.post('/logout', authController.logout)
router.post(
  '/mfa/setup',
  (req: any, res, next) => {
    if (req.isAuthenticated()) return next()
    res.status(401).json({
      message: 'Unauthorized'
    })
  },
  authController.setup2FA
)
router.post(
  '/mfa/verify',
  (req: any, res, next) => {
    if (req.isAuthenticated()) return next()
    res.status(401).json({
      message: 'Unauthorized'
    })
  },
  authController.verify2FA
)
router.post(
  '/mfa/reset',
  (req: any, res, next) => {
    if (req.isAuthenticated()) return next()
    res.status(401).json({
      message: 'Unauthorized'
    })
  },
  authController.reset2FA
)
// router.post('/login', validateUser.login, authController.login);
router.get('/verify-email', validateUser.register, authController.verifyEmail)
router.post('/google/callback', authController.googleAuthCallback)
router.post('/signin-with-google', authController.signInWithGoogle)

router.get('/google/login', authController.googleAuth)
router.post('/send-recover-email', authController.sendRecoveryEmail)
router.post('/reset-password', authController.resetPassword)

// router.get("/logout", userController.logout);

export default router

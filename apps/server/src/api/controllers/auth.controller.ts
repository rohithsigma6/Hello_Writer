//@ts-nocheck

import jwt from 'jsonwebtoken'
import config from '../../config'
import asyncHandler from 'express-async-handler'
import {
  createUserService,
  getUserService,
  checkPasswordService,
  updateUserService,
  getSecretsService,
  getUserByIdService,
  generateSecrets,
  createSecretService,
  updateSecretService,
  updateTwoFactorSecretService
} from '../services/user/user.service'
import { OAuth2Client } from 'google-auth-library'
import {
  sendVerificationEmail,
  processRecoveryEmail
} from '../../lib/mail/mail'
import { isValidDelay } from '../../utils/misc'
import crypto from 'crypto'
import { getRandomMaterialColor } from '../../utils/color-code'
import { Request, response, Response } from 'express'
import UserProfile from '../models/user-profile.model'
import User from '../models/user.model'
import Eligibility from '../models/eligible.model'
import { error } from 'console'
import speakeasy from 'speakeasy'
import qrCode from 'qrcode'
const saveGoogleUser = async (access_token: string) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  )

  const data = await response.json()
  let userToSend
  try {
    let { user: userWithEmail } = await getUserService({ email: data.email })
    if (!userWithEmail) {
      let { user } = await createUserService({
        googleId: data.sub,
        email: data.email,
        isAdmin: false,
        isVerified: data.email_verified || false
      })
      userToSend = user
    } else if (
      !userWithEmail.googleId ||
      userWithEmail?.googleId !== data.sub
    ) {
      let { user } = await updateUserService({
        userId: userWithEmail._id,
        googleId: data.sub,
        isVerified: true
      })
      userToSend = user
    }
    let token = 'null'
    if (!config.secretKeys.auth) {
      throw new Error('Authentication secret is not defined.')
    }
    if (userToSend) {
      token = jwt.sign({ user: userToSend._id }, config.secretKeys.auth, {
        expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
      })
    } else if (userWithEmail) {
      token = jwt.sign({ user: userWithEmail._id }, config.secretKeys.auth, {
        expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
      })
    }
    return { token }
  } catch (error) {
    console.error(error)
  }
}

const register = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const {
      email,
      password,
      firstName,
      phoneNo,
      lastName,
      lifetimeRegistered,
      role = 'writer',
      isAdmin = false,
      isVerified = false
    } = req.body

    if (!password || !email) return res.status(400).send('Missing Password')

    const { user: existingUser } = await getUserService({ email })
    if (existingUser)
      return res.status(400).send('User with this email address already exist')

    const colorCode = getRandomMaterialColor()

    const { user } = await createUserService({
      email,
      password,
      firstName,
      phoneNo,
      lastName,
      colorCode,
      lifetimeRegistered,
      role,
      isAdmin,
      isVerified
    })

    if (user) {
      if (!config.secretKeys.auth) {
        throw new Error('Authentication secret is not defined.')
      }
      const token = jwt.sign({ user: user._id }, config.secretKeys.auth, {
        expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
      })
      const responseUser = { ...user, token }
      return res.status(200).json({
        body: {
          user: responseUser
        }
      })
    }
    return res.status(400).send('Error creating user')
  }
)

const login = async (req: Request, res: Response) => {
  const user = req.user
  const { secret } = await getSecretsService({ userId: user?._id })
  if (secret?.isMfaActive) {
    return res.status(403).json({
      status: 'error',
      message: 'Please verify your MFA'
    })
  }
  // if (user.googleId && !secret?.hash) {
  //   return res
  //     .status(400)
  //     .send('Please sign in with Google & set up your password.')
  // }

  const token = config.secretKeys.auth
    ? jwt.sign({ user: user._id }, config.secretKeys.auth, {
        expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
      })
    : null
  const { user: userWithEligibility } = await getUserService({
    email: user.email
  })
  const responseUser = {
    ...userWithEligibility,
    token,
    isMfaActive: secret?.isMfaActive
  }
  return res.status(200).json({
    status: 'success',
    body: {
      user: responseUser
    }
  })
}

const signInWithGoogle = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, role, isVerified, googleId } = req.body

    if (!email || !googleId) {
      return res
        .status(400)
        .json({ message: 'Email & Google id are required.' })
    }

    // Check if the user already exists
    let user = await User.findOne({ email }).lean()
    let profile = null
    let eligibility = null

    if (user) {
      profile = await UserProfile.findOne({ userId: user._id }).lean()
      eligibility = await Eligibility.findOne({ userId: user._id }).lean()
      if (!user.googleId) {
        user.googleId = googleId
        await user.save()
      }
      const { secret } = await getSecretsService({ userId: user?._id })
      const token = config.secretKeys.auth
        ? jwt.sign({ user: user._id }, config.secretKeys.auth, {
            expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
          })
        : null

      if (!token) {
        throw new Error('Auth secret key is not defined.')
      }
      const responseUser = {
        eligibility,
        ...user,
        token,
        isMfaActive: secret?.isMfaActive
      }
      return res.status(200).json({
        message: 'User already saved!',
        user: responseUser
      })
    } else {
      // Create a new user
      user = new User({
        firstName,
        lastName,
        email,
        role,
        isVerified,
        googleId
      })
      await user.save()
      const token = config.secretKeys.auth
        ? jwt.sign({ user: user._id }, config.secretKeys.auth, {
            expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
          })
        : null

      if (!token) {
        throw new Error('Auth secret key is not defined.')
      }
      return res.status(200).json({
        message: 'User saved and authenticated successfully',
        user: { user, profile, eligibility, token },
        isUserAlreadySaved: false
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
const authStatus = async (req: Request, res: Response) => {
  console.log('req.user', req.user)
  if (req.user) {
    console.log('req.user', req.user)
    const { user } = await getUserService({ email: req.user.email })
    const { secret } = await getSecretsService({ userId: user?._id })
    const token = config.secretKeys.auth
      ? jwt.sign({ user: user._id }, config.secretKeys.auth, {
          expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
        })
      : null
    const responseUser = { ...user, token, isMfaActive: secret?.isMfaActive }
    res.status(200).json({
      status: 'success',
      body: {
        user: responseUser
      }
    })
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    })
  }
}
const logout = async (req: Request, res: Response) => {
  req.logout(error => {
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error logging out'
      })
    }
    res.clearCookie('Authorization')
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    })
  })
}

const setup2FA = async (req: Request, res: Response) => {
  try {
    const secret = speakeasy.generateSecret()
    const userId = req.user._id
    await updateTwoFactorSecretService({
      userId,
      twoFactorSecret: secret.base32,
      isMfaActive: false
    })
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: req.user.email,
      encoding: 'base32'
    })
    const qrCodeData = await qrCode.toDataURL(url)
    res.status(200).json({
      status: 'success',
      body: {
        secret,
        qrCodeData
      }
    })
  } catch (error) {
    console.error('Error setting up 2FA:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const verify2FA = async (req: Request, res: Response) => {
  const { token } = req.body
  const user = req.user
  const { secret } = await getSecretsService({ userId: user._id })
  const verified = speakeasy.totp.verify({
    secret: secret?.twoFactorSecret,
    encoding: 'base32',
    token
  })
  if (verified) {
    const token = config.secretKeys.auth
      ? jwt.sign({ user: user._id }, config.secretKeys.auth, {
          expiresIn: process.env.TOKEN_EXPIRY_COOKIE || 86400 || '24h'
        })
      : null
    const { user: userWithEligibility } = await getUserService({
      email: user.email
    })
    await updateTwoFactorSecretService({
      userId: user._id,
      twoFactorSecret: secret.base32,
      isMfaActive: true
    })
    const responseUser = { ...user, token, isMfaActive: secret?.isMfaActive }
    return res.status(200).json({
      status: 'success',
      message: 'MFA Successfully verified',
      body: {
        user: responseUser
      }
    })
  }

  return res.status(400).json({
    status: 'error',
    message: 'MFA verification failed'
  })
}

const reset2FA = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id
    await updateTwoFactorSecretService({
      userId,
      twoFactorSecret: '',
      isMfaActive: false
    })
    return res.status(200).json({
      status: 'success',
      message: '2FA Successfully reset'
    })
  } catch (error) {
    console.error('Error resetting 2FA:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

const googleAuthCallback = async (req: Request, res: Response) => {
  const code = req.body
  try {
    const redirectURL = config.googleOAuth.redirectUri
    const oAuth2Client = new OAuth2Client(
      config.googleOAuth.clientId,
      config.googleOAuth.clientSecret,
      redirectURL
    )
    const r = await oAuth2Client.getToken(code)
    await oAuth2Client.setCredentials(r.tokens)
    const saveRes = await saveGoogleUser(
      oAuth2Client.credentials.access_token as string
    )
    if (!saveRes) {
      return res.status(400).send('Error logging in with OAuth2 user')
    }
    const { token } = saveRes
    res.status(200).json({ status: 'success', token })
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err)
  }
}

const googleAuth = async (req: Request, res: Response) => {
  console.log('googleAuth')
  res.header('Access-Control-Allow-Origin', `${config.url.frontendBaseUrl}`)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Referrer-Policy', 'no-referrer-when-downgrade')
  const redirectURL = config.googleOAuth.redirectUri

  const oAuth2Client = new OAuth2Client(
    config.googleOAuth.clientId,
    config.googleOAuth.clientSecret,
    redirectURL
  )

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile email openid ',
    prompt: 'consent'
  })

  res.json({ url: authorizeUrl })
}

const sendRecoveryEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const { user } = await getUserService({ email })

  if (!user) {
    return res.status(400).send('user not found with this email')
  }
  const recoverHash = crypto.randomBytes(64).toString('hex')
  const lastRecoverHash = new Date()
  const { secret } = await updateSecretService({
    userId: user._id,
    recoverHash,
    lastRecoverHash
  })

  if (!secret?.recoverHash) {
    return res.status(400).send('Something went wrong. Try again later.')
  }

  await processRecoveryEmail(
    user._id,
    user.firstName,
    user.email,
    secret.recoverHash
  )
  return res.status(200).json({
    status: 'success',
    message: 'Recover email sent'
  })
}

const resetPassword = async (req: Request, res: Response) => {
  const { password, userId, recoverHash } = req.body
  if (!password || !userId || !recoverHash) {
    res.status(400).send('Missing information in body.')
  }

  const { user } = await getUserByIdService({ userId })

  if (!user) {
    return res.status(400).send('User not found with this email')
  }

  const { secret } = await getSecretsService({ userId: user._id })

  if (
    !user ||
    recoverHash !== secret?.recoverHash ||
    (secret?.lastRecoverHash &&
      isValidDelay(new Date(secret.lastRecoverHash), 60))
  ) {
    return res.status(400).send('Link is expired')
  }

  const newSecrets = generateSecrets({ password })

  await createSecretService({
    userId: user?._id,
    secrets: newSecrets
  })
  return res.status(200).json({
    status: 'success',
    message: 'Password Reset complete'
  })
}

const verifyEmail = async (req: Request, res: Response) => {
  const { id, code, lifetimeRegistered } = req.query as {
    id: string
    code: string
    lifetimeRegistered: string
  }

  if (!id || !code) {
    return res.status(400).send('Missing id or code')
  }

  const { secret } = await getSecretsService({ userId: id })

  if (secret && secret.emailHash) {
    await UserProfile.create({
      userId: secret.userId
    })

    // Convert lifetimeRegistered to a boolean
    const isLifetimeRegistered = lifetimeRegistered === 'true'
    if (isLifetimeRegistered) {
      await updateUserService({ userId: id, isVerified: true })
      return res.redirect(
        `${config.url.frontendBaseUrl}/pricing-lifeplan?verifedUser=${id}`
      )
    }
    await updateUserService({ userId: id, isVerified: true })
    return res.redirect(`${config.url.frontendBaseUrl}/auth/login`)
  } else {
    return res.status(400).send('Error verifying email. Try again later.')
  }
}

export default {
  register,
  verifyEmail,
  login,
  authStatus,
  googleAuth,
  googleAuthCallback,
  sendRecoveryEmail,
  resetPassword,
  signInWithGoogle,
  logout,
  setup2FA,
  verify2FA,
  reset2FA
}

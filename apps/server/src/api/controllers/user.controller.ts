import crypto from 'crypto'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import config from '../../config'
import { sendVerificationEmail } from '../../lib/mail/mail'
import // getFileCollaboratorsService,
'../services/collaboration/collaboration.service'
import {
  checkPasswordService,
  getSearchedEmailsService,
  getSecretsService,
  getUserService,
  updateSecretService,
  updateUserService,
  getAllContacts,
  generateSecrets,
  createSecretService
} from '../services/user/user.service'

const sendVerificationEmailHandler = async (req: Request, res: Response) => {
  const { email } = req.body
  const { user } = await getUserService({ email })

  const { secret } = await getSecretsService({ userId: user?._id.toString() })

  if (!user || !secret) {
    return res.badRequest('User not found')
  }

  if (secret?.emailHash) {
    await sendVerificationEmail(
      user._id.toString(),
      user.firstName,
      user.email,
      user.lifetimeRegistered,
      secret.emailHash
    )
    return res.ok({
      status: 'success',
      message: 'Email sent'
    })
  } else {
    return res.badRequest('Something went wrong while sending email')
  }
}

const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const { user } = await getUserService({ email: req.user.email })
    res.ok({
      user
    })
  } else {
    res.unauthorized('User not found')
  }
})

const changePassword = async (req: Request, res: Response) => {
  const { password, newPassword } = req.body

  if (!password || !newPassword) {
    res.badRequest('Missing information in body.')
  }

  const userId = req.user?._id?.toString()

  const passwordMatch = await checkPasswordService({
    userId,
    password
  })

  if (!passwordMatch) {
    return res.badRequest('Invalid current password')
  }

  const newSecrets = generateSecrets({ password: newPassword })

  await createSecretService({
    userId,
    secrets: newSecrets
  })
  return res.ok({
    status: 'success',
    message: 'Password changed completed'
  })
}

const updateUserHandler = async (req: Request, res: Response) => {
  const { userId, email, googleId, role, isAdmin, isVerified } = req.body
  const { user } = await updateUserService({
    userId,
    email,
    googleId,
    role,
    isAdmin,
    isVerified
  })
  if (!user) {
    return res.badRequest('No userId')
  }
  res.ok({ user })
}

const getSearchedEmailsHandler = async (req: Request, res: Response) => {
  const { search } = req.body
  const userId = req.user?._id?.toString()

  let { users } = await getSearchedEmailsService({
    search: search,
    userId
  })
  res.ok({ users })
}
const getAllFileContacts = async (req: Request, res: Response) => {
  const userId = req.user._id
  let { contacts } = await getAllContacts(userId)
  res.ok({ contacts })
}
export default {
  sendVerificationEmailHandler,
  getUserDetails,
  changePassword,
  updateUserHandler,
  getSearchedEmailsHandler,
  getAllFileContacts
}

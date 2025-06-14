//@ts-nocheck
import crypto from 'crypto'

import { sendVerificationEmail } from '../../../lib/mail/mail'
import {
  createSecret,
  createUser,
  getSearchedUserEmails,
  getSecrets,
  getUser,
  getUserById,
  updateSecret,
  updateUser,
  getAllUsers,
  updateTwoFactorSecret
} from '../../data/user/user.data'
import {
  CreateUserParams,
  GetUserParams,
  GetUserByIdParams,
  UpdateUserParams,
  CheckPasswordParams,
  GenerateSecretsParams,
  GetSecretsParams,
  UpdateSecretParams,
  CreateSecretParams,
  GetSearchedEmailsParams
} from './types'
import { ISecret } from '../../models/secret.model'

export const createUserService = async ({
  email,
  password,
  googleId,
  role,
  phoneNo,
  colorCode,
  firstName,
  lastName,
  lifetimeRegistered = false,
  isAdmin = false,
  isVerified = false
}: CreateUserParams) => {
  if (!password && !googleId) {
    return { user: undefined }
  }

  const user = await createUser({
    email,
    googleId,
    role,
    firstName,
    lastName,
    phoneNo,
    lifetimeRegistered,
    colorCode,
    isAdmin,
    isVerified
  })

  const secrets = await generateSecrets({ password })

  const createdSecret = (await createSecret({
    userId: user?._id,
    isMfaActive: false,
    secrets
  })) as ISecret

  if (
    !isVerified &&
    user &&
    createdSecret?.emailHash &&
    lifetimeRegistered !== undefined
  ) {
    sendVerificationEmail(
      user?._id,
      firstName,
      user.email,
      lifetimeRegistered,
      createdSecret.emailHash
    )
  }

  return { user }
}

export const getUserService = async ({ email, googleId }: GetUserParams) => {
  const existingUser = await getUser({ email, googleId })
  return { user: existingUser }
}

export const getUserByIdService = async ({ userId }: GetUserByIdParams) => {
  const existingUser = await getUserById({ userId })
  return { user: existingUser }
}

export const updateUserService = async ({
  userId,
  email,
  googleId,
  role,
  isAdmin,
  isVerified
}: UpdateUserParams) => {
  const user = await updateUser({
    userId,
    email,
    googleId,
    role,
    isAdmin,
    isVerified
  })

  return { user }
}

export const checkPasswordService = async ({
  userId,
  password
}: CheckPasswordParams) => {
  if (!userId || !password) {
    return false
  }

  const secret = (await getSecrets({ userId })) as ISecret

  if (!secret) {
    return false
  }

  const hash = crypto
    .pbkdf2Sync(password, secret.salt as crypto.BinaryLike, 1000, 64, 'sha512')
    .toString('hex')
  return hash === secret.hash
}

export const generateSecrets = ({ password }: GenerateSecretsParams) => {
  const recoverHash = crypto.randomBytes(64).toString('hex')
  const emailHash = crypto.randomBytes(64).toString('hex')
  const salt = crypto.randomBytes(16).toString('hex')
  let hash
  if (password) {
    hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  }

  return {
    hash,
    salt,
    emailHash,
    recoverHash,
    lastEmailHash: new Date(),
    lastRecoverHash: new Date()
  }
}

export const getSecretsService = async ({ userId }: GetSecretsParams) => {
  if (!userId) {
    return { secret: null }
  }
  const secret = (await getSecrets({ userId })) as ISecret
  return { secret }
}
export const updateTwoFactorSecretService = async ({
  userId,
  twoFactorSecret,
  isMfaActive
}: {
  userId: string
  twoFactorSecret: string
  isMfaActive: boolean
}): Promise<{ secret: ISecret | null }> => {
  try {
    const secret = await updateTwoFactorSecret({
      userId,
      twoFactorSecret,
      isMfaActive
    })
    return { secret }
  } catch (error) {
    console.error('Error updating two-factor secret:', error)
    return { secret: null }
  }
}

export const updateSecretService = async ({
  userId,
  emailHash,
  hash,
  recoverHash,
  lastRecoverHash
}: UpdateSecretParams): Promise<{ secret: ISecret }> => {
  const secret = (await updateSecret({
    userId,
    emailHash,
    hash,
    recoverHash,
    lastRecoverHash: lastRecoverHash as any
  })) as ISecret
  return { secret }
}

export const createSecretService = async ({
  userId,
  secrets
}: CreateSecretParams) => {
  const secret = await createSecret({ userId, secrets })
  return { secret }
}

export const getSearchedEmailsService = async ({
  search,
  userId
}: GetSearchedEmailsParams) => {
  const users = await getSearchedUserEmails({ search, userId })

  return { users }
}
export const getAllContacts = async userId => {
  const contacts = await getAllUsers(userId)

  return { contacts }
}

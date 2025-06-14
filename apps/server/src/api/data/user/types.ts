//@ts-nocheck
export interface IGetUserParams {
  email?: string
  googleId?: string
}

export interface IGetUserByIdParams {
  userId: string
}

export interface ICreateUserParams {
  email: string
  googleId?: string
  role?: string
  firstName?: string
  phoneNo?: string
  lastName?: string
  colorCode?: string
  isAdmin: boolean
  lifetimeRegistered?: boolean
  isVerified: boolean
}

export interface IUpdateUserParams {
  userId?: string
  email?: string
  googleId?: string
  role?: string
  isAdmin?: boolean
  isVerified?: boolean
}

export interface IGetSecretsParams {
  userId: string
}

export interface IGetSearchedUserEmailsParams {
  search?: string
  userId?: string
}

export interface ICreateSecretParams {
  userId: string
  isMfaActive: boolean
  secrets: any
}

export interface IUpdateSecretParams {
  userId: string
  emailHash?: string
  hash?: string
  recoverHash?: string
  lastRecoverHash?: string
}

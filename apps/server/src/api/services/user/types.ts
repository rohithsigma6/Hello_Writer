
//@ts-nocheck
export interface CreateUserParams {
  email: string
  password?: string
  googleId?: string
  phoneNo?: string
  role?: string
  colorCode?: string
  firstName?: string
  lastName?: string
  isAdmin?: boolean
  lifetimeRegistered?: boolean
  isVerified?: boolean
}

export interface GetUserParams {
  email: string
  googleId?: string
}

export interface GetUserByIdParams {
  userId: string
}

export interface UpdateUserParams {
  userId?: string
  email?: string
  googleId?: string
  role?: string
  isAdmin?: boolean
  isVerified?: boolean
}

export interface CheckPasswordParams {
  userId: string
  password: string
}

export interface GenerateSecretsParams {
  password?: string
}

export interface GetSecretsParams {
  userId: string
}

export interface UpdateSecretParams {
  userId: string
  emailHash?: string
  hash?: string
  recoverHash?: string
  lastRecoverHash?: Date
}

export interface CreateSecretParams {
  userId: string
  secrets: any
}

export interface GetSearchedEmailsParams {
  search?: string
  userId?: string
}

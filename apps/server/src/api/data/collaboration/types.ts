import mongoose from 'mongoose'
import { ICollaboration } from '../../models/collaboration.model'
import { IUser } from '../../models/user.model'
import { Socket } from 'socket.io'

export interface IGetFileCollaboratorsParams {
  fileId: string
}

export interface IGetSharedFilesParams {
  userId: string
  status?: string
  permissionType?: string
  page?: number
  limit?: number
  sort?: string
}

export interface IGetCollaboration {
  resourceId: string
  userId: string
}

export interface ICreateCollaborationParams {
  fileId: string
  userId: string
  permissionType?: string
}

export interface IDeleteCollaborationParams {
  fileId: string
  userId: string
}

export interface IUserPopulatedCollaboration
  extends Omit<ICollaboration, 'userId'> {
  userId: IUser
}

export interface AuthenticatedSocket extends Socket {
  user?: IUser
}

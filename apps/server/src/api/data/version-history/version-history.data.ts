import mongoose from 'mongoose'
import VersionHistory, {
  IVersionHistory
} from '../../models/version-history.model'
import {
  IGetFileVersionHistoryParams,
  IGetFileVersionHistoryListParams,
  ICreateVersionHistoryParams
} from './types'

export const getFileVersionHistory = async ({
  id
}: IGetFileVersionHistoryParams): Promise<IVersionHistory | null> => {
  try {
    const data = await VersionHistory.findById(id)
    return data ? JSON.parse(JSON.stringify(data)) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getFileVersionHistoryList = async ({
  fileId,
  versionName
}: IGetFileVersionHistoryListParams): Promise<IVersionHistory[]> => {
  try {
    const fileVersionHistory = await VersionHistory.find({ fileId })
      .sort({ createdAt: -1 })
      .populate('userId')
    return fileVersionHistory
  } catch (error) {
    console.error(error)
    return []
  }
}

export const updateVersionHistoryService = async ({
  fileId
}: IGetFileVersionHistoryListParams): Promise<IVersionHistory[]> => {
  try {
    const data = await VersionHistory.find({ fileId })
      .sort({ createdAt: -1 })
      .populate('userId')
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createVersionHistory = async ({
  userId,
  fileId,
  versionHistory
}: ICreateVersionHistoryParams): Promise<IVersionHistory | null> => {
  try {
    const data = await VersionHistory.create({
      userId,
      fileId,
      versionHistory
    })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
export const removeVersionHistoryService = async ({
  userId,
  fileId
}: ICreateVersionHistoryParams): Promise<IVersionHistory | null> => {
  try {
    const data = await VersionHistory.create({
      userId,
      fileId
    })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

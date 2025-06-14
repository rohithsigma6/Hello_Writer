import mongoose from 'mongoose'

export interface IGetFileVersionHistoryParams {
  id: string
}

export interface IGetFileVersionHistoryListParams {
  fileId: string
  versionName: string
}
export interface IUpdateFileVersionHistoryListParams {
  fileId: string
}

export interface ICreateVersionHistoryParams {
  userId: string
  fileId: string
  versionHistory: [
    {
      versionName: string
      versionColor: string
      editStatus: string
    }
  ]
}

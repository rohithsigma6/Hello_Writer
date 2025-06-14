import { IDeleteFileParams } from '../../data/file/types'

export interface DetectFileServiceParams extends IDeleteFileParams {
  userId: string
  permissionType: string
}

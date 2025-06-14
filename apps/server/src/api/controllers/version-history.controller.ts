import config from '../../config'
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import VersionHistory from '../models/version-history.model'

const getVersionHistoryList = asyncHandler(
  async (req: Request, res: Response) => {
    const { fileId, versionName } = req.params

    const versionHistoryList = await VersionHistory.findOne({
      fileId
    }).populate({
      path: 'versionHistory.screenplayVersions.userId',
      model: 'User',
      select: 'firstName lastName'
    })

    const versionList = versionHistoryList.versionHistory.map(version => {
      const lastScreenplayVersion = version.screenplayVersions.at(-1) // or version.screenplayVersions[version.screenplayVersions.length - 1]
      const user = lastScreenplayVersion?.userId as any
      return {
        versionName: version.versionName,
        versionColor: version.versionColor,
        editStatus: version.editStatus,
        lastUpdated: lastScreenplayVersion?.updatedAt || null,
        lastUpdatedBy: user
          ? {
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName
            }
          : null,
        _id: version._id
      }
    })

    res.status(200).json({ versionList })
  }
)

export default {
  getVersionHistoryList
}

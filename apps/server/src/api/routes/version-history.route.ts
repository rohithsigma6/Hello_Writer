import { Router } from 'express'
import { versionHistoryController } from '../controllers'

const router = Router()

router.get('/file/:fileId', versionHistoryController.getVersionHistoryList)
// router.put(
//   "/version/:id",
//   versionHistoryController.updateFileWithVersionHistory
// );

export default router

import { Router } from 'express'
import { loglineController } from '../controllers'
const router = Router()
router.post('/logline-template', loglineController.createLoglineTemplate)
router.get('/logline-template', loglineController.getLogLineTemplate)
router.post('/', loglineController.createLogline)
router.post('/finalized', loglineController.finalizeLogline)
router.put('/:fileId/:draftId', loglineController.updateLoglineDraft)
router.delete('/:fileId/:draftId', loglineController.deleteLoglineDraft)
router.get('/:fileId', loglineController.getLogline)
router.post('/freeform', loglineController.createFreeformLogline)
router.put('/freeform/:fileId/:draftId', loglineController.updateFreeformDraft)
router.delete(
  '/freeform/:fileId/:draftId',
  loglineController.deleteFreeformDraft
)

export default router

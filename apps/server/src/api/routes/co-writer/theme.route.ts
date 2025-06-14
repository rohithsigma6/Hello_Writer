import { Router } from 'express'
import { themeController } from '../../controllers'
const router = Router()
router.post('/theme-template', themeController.createThemeTemplate)
router.get('/theme-template', themeController.getThemeTemplate)
router.post('/', themeController.createTheme)
router.post('/finalized', themeController.finalizeTheme)
router.put('/:fileId/:draftId', themeController.updateThemeDraft)
router.delete('/:fileId/:draftId', themeController.deleteThemeDraft)
router.get('/:fileId', themeController.getTheme)
router.post('/freeform', themeController.createFreeformTheme)
router.put('/freeform/:fileId/:draftId', themeController.updateFreeformDraft)
router.delete('/freeform/:fileId/:draftId', themeController.deleteFreeformDraft)
router.get('/ai/:templateId', themeController.getAiThemeTemplate)
router.get('/freeform/ai', themeController.getAiThemeFreeForm)
export default router

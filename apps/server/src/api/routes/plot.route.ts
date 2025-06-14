import { Router } from 'express'
import plotController from '../controllers/plot.controller'
import { generateKeyPair } from 'crypto'

const router = Router()

router.post('/save-writefreely-plot', plotController.saveWriteFreely)
router.post('/create-plot-template', plotController.createPlotTemplate)
router.get('/get-all-plot-template', plotController.getAllPlotTemplate)
router.delete('/delete-plot-by-id/:id',plotController.deletePlotById)
router.get('/getPlotTemplateResByAi/:plotTemplateId', plotController.getTemplateByIdWithAiContent)
router.get('/getPlotTemplateById/:id', plotController.getTemplateById)
router.post('/save-template-plot', plotController.saveTemplatePlot)
router.put('/update-plot-status/:id', plotController.updatePlotStatus)
router.get('/get-file-plot/:fileId', plotController.getFilePlot)
router.delete(
  '/template/:templateId/delete-act/:actId',
  plotController.deleteAct
)
router.delete(
  '/template/:templateId/act/:actId/delete-predefinedBeat/:beatId',
  plotController.deletePredefinedBeat
)
router.delete(
  '/template/:templateId/act/:actId/delete-manualBeat/:beatId',
  plotController.deleteManualBeat
)

export default router

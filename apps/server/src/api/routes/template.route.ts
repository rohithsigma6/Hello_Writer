import { Router } from 'express'
import { coWriterController } from '../controllers'
import { validateTag } from '../validation'
import multer from 'multer'

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

// router.post("/save",coWriterController.saveTemplate)
router.post(
  '/save-character',
  upload.single('image'),
  coWriterController.saveCharacterTemplate
)
router.post(
  '/update-character/:id',
  upload.single('image'),
  coWriterController.updateCharacterTemplate
)
// router.post("/data",coWriterController.getTemplateData)
// router.post("/update/:id",coWriterController.updateTemplate)

export default router

import { Router } from 'express'
import { featureController } from '../controllers'

const router = Router()

router.post('/', featureController.addFeature)
router.get('/', featureController.getAllFeature)
router.post('/request', featureController.requestFeature)
export default router

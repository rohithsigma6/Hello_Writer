import { Router } from 'express'
import { FileController } from '../controllers'
const router = Router()

router.post('/', FileController.changeResourceStatus)

export default router

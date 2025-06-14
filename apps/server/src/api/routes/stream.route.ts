import { Router } from 'express'
import { streamController } from '../controllers'

const router = Router()

router.get('/token', streamController.generateToken)

export default router

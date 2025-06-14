import { Router } from 'express'
import { coWriterController } from '../controllers'

const router = Router()

router.post('/add', coWriterController.addNewStoryArc)
router.get('/', coWriterController.getStoryArcsByFileAndCreator);

export default router;
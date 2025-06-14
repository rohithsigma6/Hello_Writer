import { Router } from 'express'
import { timerController } from '../controllers'

const router = Router()

router.post("/", timerController.upsertDailyGoal);
router.get("/latest", timerController.getLatestDailyGoal);

export default router

import { Router } from "express";
import { feedbackControllers } from "../controllers";
import multer from "multer";
import { validateFeedback } from "../validation";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post("/", upload.single("attached_file"), validateFeedback.GiveFeedback, feedbackControllers.giveFeedback);
export default router;

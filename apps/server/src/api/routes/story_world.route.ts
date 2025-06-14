import { Router } from "express";
import { coWriterController } from "../controllers";
import { validateTag } from "../validation";
import upload from "../../lib/multer";



const router = Router();

router.post("/save",coWriterController.saveStoryWorld)
router.post("/update/:id",coWriterController.updateStoryWorld)
router.get("/:id",coWriterController.getStoryWOrld)




export default router;

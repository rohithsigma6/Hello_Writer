import { Router } from "express";
import { editorContentController } from "../controllers";




const router = Router();

router.get("/:fileId/:sceneId",editorContentController.getContent)
router.post("/update",editorContentController.updateContent)
router.delete("/:sceneId",editorContentController.deleteContent)




export default router;

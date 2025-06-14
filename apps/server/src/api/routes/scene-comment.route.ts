import { Router } from "express";
import { sceneCommentControllers } from "../controllers";


const router = Router();

router.get("/:sceneId",sceneCommentControllers.getCommentsByScene)
router.post("/add-reaction/:commentId", sceneCommentControllers.addReactionToComment)
router.post("/create-comment/:sceneId" ,sceneCommentControllers.createComment)
router.patch("/update-comment/:commentId" ,sceneCommentControllers.updateComment)
router.delete("/delete-comment/:commentId", sceneCommentControllers.deleteComment)



export default router;

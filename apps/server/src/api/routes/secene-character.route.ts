import { Router } from "express";
import { sceneCharacterController } from "../controllers";
import { validateSet } from "../validation";


const router = Router();

router.get("/:id/:name",sceneCharacterController.getCharacterAndExtras)
router.post("/create/:type",sceneCharacterController.createCharacterElement)





export default router;

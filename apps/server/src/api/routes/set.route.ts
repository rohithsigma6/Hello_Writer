import { Router } from "express";
import { setController } from "../controllers";
import { validateSet } from "../validation";


const router = Router();

router.get("/:id",setController.getSet)
// router.post("/create", validateSet.createSet,setController.saveSet)
router.post("/create",setController.saveSet)
router.put("/update/:id",setController.updateSet)
router.delete("/:id",setController.deleteSet)




export default router;

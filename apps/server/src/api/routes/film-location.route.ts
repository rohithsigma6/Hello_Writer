import { Router } from "express";
import { filmLocationController } from "../controllers";
import { validateSet } from "../validation";


const router = Router();

router.get("/:id",filmLocationController.getFilmLocation)
router.post("/create",filmLocationController.saveFilmLocation)
// router.put("/update/:id",setController.updateSet)
// router.delete("/:id",setController.deleteSet)




export default router;

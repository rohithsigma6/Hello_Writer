import { Router } from "express";
import { awsController } from "../controllers";

const router = Router();

router.get("/getUrl/:filename", awsController.getUrl);

export default router;
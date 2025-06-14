import { Router } from "express";
import { contactController } from "../controllers";
const router = Router();

router.post("/", contactController.getContacts);
export default router;

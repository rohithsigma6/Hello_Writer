import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.post("/change-password", userController.changePassword);
router.get("/details", userController.getUserDetails);
router.get("/contacts", userController.getAllFileContacts);
router.post("/update", userController.updateUserHandler);
router.post("/search", userController.getSearchedEmailsHandler);

export default router;
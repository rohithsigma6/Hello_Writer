import { Router } from 'express';
import { validateUser } from '../validation/user-profile.validation';
import profileController from '../controllers/user-profile.controller';
import multer from "multer";
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage }); // Use memory storage
const router = Router();


router.post('/onboard', upload.single("profile_image"), profileController.onBoardUserProfile);
router.post('/basicInfo', upload.single("profile_image"), profileController.updateBasicUserProfile);
router.post('/professionalInfo', profileController.updateUserProfessionalProfile);
router.post('/personalPreferences', profileController.updateUserPersonalProfile);
router.post('/screenwritingStyle', profileController.updateUserScreenWritingStyle);
router.post('/networkingGoals', profileController.updateUserNetworkingGoals);
router.post('/kycVerification',
    upload.fields([{ name: "frontImage", maxCount: 1 }, { name: "backImage", maxCount: 1 }]),
    profileController.updateUserKycVerification);

export default router;
import { Router } from "express";
import userContoller  from "../../controllers/admin/user.controller";


const router = Router();

router.get("/getVerifiedUsersCount",userContoller.getVerifiedUsersCount)
router.get("/getSubscriptionStats",userContoller.getSubscriptionStats)
router.get("/getRevenueStats",userContoller.getRevenueStats)
router.get("/",userContoller.getVerifiedUsers)
router.get("/getUsersWithSubscription",userContoller.getUsersWithSubscription)
router.get("/getUsersWithoutSubscription",userContoller.getUsersWithoutSubscription)
router.get("/feedbacks",userContoller.getAllFeedbacks)
router.get("/feedbacks/:id",userContoller.getFeedbackById)





export default router;

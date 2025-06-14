import { Router } from 'express'
// import dashBoardRoute from "./analytics.route";
import userRoute from "./user.route";

const adminRouter = Router();
const routerV0 = Router();

// adminRouter.use('/dashBoard', dashBoardRoute);
adminRouter.use('/user', userRoute);


routerV0.use('/v0/api', adminRouter);

export default routerV0; 
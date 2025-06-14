import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import UserModel from "../models/user.model";


const roleSelectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.header("Authorization");
  token = token ? token.split(" ")[1] : undefined;
  if (!config.secretKeys.auth) {
    throw new Error("Authentication secret is not defined.");
  }
  try {
    if (token) {
      const decoded: any = await jwt.verify(token, config.secretKeys.auth);
      if (!decoded) {
        return res.unauthorized("Token invalid");
      }

      const user = await UserModel.findById(decoded?.user);

      if (!user) {
        return res.notFound("User not found");
      }

      if (!user?.isVerified) {
        return res.unauthorized("User not verified");
      }

      if (user?.role) {
        return res.redirectTo(config.url.frontendBaseUrl + "/dashboard");
      }

      req.user = user;
    } else {
      return res.unauthorized("User is not authenticated.");
    }
    next();
  } catch (error) {
    console.error(error);
    res.redirectTo(config.url.frontendBaseUrl + "/auth/login");
  }
};

export default roleSelectMiddleware;
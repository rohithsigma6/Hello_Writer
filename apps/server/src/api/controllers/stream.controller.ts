import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StreamClient } from "@stream-io/node-sdk";
const apiKey: string = process.env.STREAM_API_KEY || "";
const apiSecret: string = process.env.STREAM_API_SECRET || "";
const calculateExpireTime = (minutes: number): number => {
  return Math.round(Date.now() / 1000) + minutes * 60;
};
const generateToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    const client = new StreamClient(apiKey, apiSecret);
    const exp = calculateExpireTime(2);
    // const exp = Math.round(new Date().getTime() / 1000) + 60 * 60
    const issued = Math.floor(Date.now() / 1000) - 60;
    const token = client.createToken(userId, exp, issued);
    res.status(201).json({
      success: true,
      message: "Token generated successfully",
      token,
      apiKey,
    });
  } catch (error) {
    console.error("An error occurred while generating the token", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating the token",
    });
  }
});

export default {
  generateToken,
};

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {getPresignedUrl} from "../../lib/aws";

const getUrl = asyncHandler(async (req: Request, res: Response) => {
  const { filename } = req.params;
  const url = await getPresignedUrl({ filename });
  res.status(200).json({ url });
});

export default {
  getUrl
}
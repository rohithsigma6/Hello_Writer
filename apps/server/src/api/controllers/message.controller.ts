import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  getIndividualMessagesService,
  getMessagesService,
  getChatHistoryService,
} from "../services/message/message.service";

export const getIndividualMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const { roomId, senderId, receiverId } = req.params;
    try {
      if (!roomId || !senderId || !receiverId) {
        res.status(400).json({ error: "Missing required fields" });
      }
      const messages = await getIndividualMessagesService({
        roomId,
        senderId,
        receiverId,
      });
      res.status(200).json({ messages });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
);

export const getGroupMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const { roomId } = req.params;
    try {
      if (!roomId) {
        res.status(400).json({ error: "Missing room id" });
      }
      const messages = await getMessagesService({
        roomId,
      });
      res.status(200).json({ messages });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
);

export const getChatHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const userId = req.user?._id?.toString();
    try {
      if (!roomId || !userId) {
        res.status(400).json({ error: "Missing required fields" });
      }
      const messages = await getChatHistoryService({
        roomId,
        userId,
      });
      res.status(200).json({ messages });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
);

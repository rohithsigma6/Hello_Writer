import { Request, Response } from "express";
import Timer from "../models/timer.model";

const normalizeDate = (date: Date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

const upsertDailyGoal = async (req: Request, res: Response) => {
  try {
    const { fileId, version, dailyGoal } = req.body;
    const userId = req.user._id;

    const timerDoc = await Timer.findOne({
      fileId,
      version,
      userId,
    });

    if (!timerDoc) {
      const newTimer = new Timer({
        fileId,
        version,
        userId,
        dailyGoal: [dailyGoal], // Let Mongoose handle createdAt
      });
      await newTimer.save();
      return res.status(201).json(newTimer);
    }

    const today = normalizeDate(new Date());

    const index = timerDoc.dailyGoal.findIndex((goal) => {
      if (!goal.createdAt) return false;
      return normalizeDate(goal.createdAt).getTime() === today.getTime();
    });

    if (index !== -1) {
      // Update the existing goal while preserving createdAt
      timerDoc.dailyGoal[index] = {
        ...dailyGoal,
        createdAt: timerDoc.dailyGoal[index].createdAt,
        updatedAt: new Date(), // optional: explicitly update timestamp
      };
    } else {
      timerDoc.dailyGoal.push(dailyGoal); // Let Mongoose set createdAt
    }

    await timerDoc.save();
    res.status(200).json(timerDoc);
  } catch (error) {
    console.error("Error in upsertDailyGoal:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getLatestDailyGoal = async (req: Request, res: Response) => {
  try {
    const { fileId, version } = req.query;
    const userId = req.user._id;

    const timerDoc = await Timer.findOne({
      fileId,
      version,
      userId,
    });

    if (!timerDoc || timerDoc.dailyGoal.length === 0) {
      return res.status(404).json({ message: "No daily goals found" });
    }
    const latestGoal = [...timerDoc.dailyGoal]
      .filter(goal => goal.deadline)
      .sort((a, b) => new Date(b.deadline!).getTime() - new Date(a.deadline!).getTime())[0];
    res.status(200).json(latestGoal);
  } catch (error) {
    console.error("Error in getLatestDailyGoal:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default {
    upsertDailyGoal,
    getLatestDailyGoal
}

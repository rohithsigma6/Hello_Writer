import mongoose, { Document } from "mongoose";

export interface IDailyGoal {
  createdAt: Date;
  wordCount: number;
  minutesCount: number;
  writingTime: number;
  thinkingTime: number;
  wordGoal:number;
  pageGoal: number;
  sceneGoal: number;
  minutesGoal: number;
  deadline?: Date;
}

export interface ITimer extends Document {
  fileId: mongoose.Schema.Types.ObjectId;
  version: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  dailyGoal: IDailyGoal[];
  createdAt?: Date;
  updatedAt?: Date;
}

const dailyGoalSchema = new mongoose.Schema(
  {
    wordCount: { type: Number, default: 0 },
    minutesCount: { type: Number, default: 0 },
    writingTime: { type: Number, default: 0 },
    thinkingTime: { type: Number, default: 0 },
    wordGoal:{type:Number,default:0 },
    pageGoal: { type: Number, default: 0 },
    sceneGoal: { type: Number, default: 0 },
    minutesGoal: { type: Number, default: 0 },
    deadline: { type: Date, default: null },
  },
  { timestamps: true }
);

const timerSchema = new mongoose.Schema(
  {
    fileId: {
      type: mongoose.Schema.ObjectId,
      ref: "File",
      required: true,
    },
    version: {
      type: mongoose.Schema.ObjectId,
      ref: "VersionHistory",
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    dailyGoal: [dailyGoalSchema],
  },
  { timestamps: true }
);

const Timer = mongoose.model<ITimer>("Timer", timerSchema);

export default Timer;

import { Types } from "mongoose";

export const isValidDelay = (date: Date, minutes: number): boolean => {
  const now = new Date().getTime();
  const last = date.getTime();
  const lastMinutes = (now - last) / 1000 / 60;

  return minutes < lastMinutes;
};
export const flatObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
export const objId = (string) => {
  return new Types.ObjectId(string);
};

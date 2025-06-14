import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger"; // Replace with the correct path to your logger.ts file

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = new Date();

  // Log the start of the request
  // logger.info(`Request: ${req.method} ${req.url}`, { ip: req.ip });

  // Log the end of the request after the response has been sent
  res.on("finish", () => {
    const end = new Date();
    const responseTime = end.getTime() - start.getTime();
    // logger.info(
    //   `Request: ${req.method} ${req.url}, Response: ${res.statusCode} (${responseTime}ms)`
    // );
  });

  next();
};

export default requestLogger;
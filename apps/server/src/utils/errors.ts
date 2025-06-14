import { Request, Response, NextFunction } from "express";

// Middleware function to handle invalid JSON errors
export const handleInvalidJson = (
  err: SyntaxError & { status?: number; body?: any },
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ message: "Invalid JSON" });
  }
  next(err);
};

// Middleware function to handle unauthorized errors
export const handleUnauthorized = (
  err: { status?: number },
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err.status === 401) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next(err);
};

// Middleware function to handle not found errors
export const handleNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const err = new Error("Not Found");
  (err as any).status = 404;
  next(err);
};

// Middleware function to handle all other errors
export const handleAllOtherErrors = (
  err: { status?: number; message?: string },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  res
    .status(err.status || 500)
    .send({ message: err.message || "Internal Server Error" });
};
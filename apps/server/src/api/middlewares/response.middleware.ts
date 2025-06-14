import { Request, NextFunction, Response } from "express";

function sendJSONResponse(this: Response, status: number, data: object = {}, message?: string): void {
  const response: Record<string, any> = {
    success: status >= 200 && status < 400, // Success statuses are usually in the 2xx range
    ...data,
  };

  if (message) {
    response.message = message;
  }

  this.status(status).json(response);
}

// Attach the helper function to the response object
function attachResponseHelper(req: Request, res: Response, next: NextFunction): void {
  res.sendJSONResponse = sendJSONResponse.bind(res);
  res.ok = ok.bind(res);
  res.created = created.bind(res);
  res.noContent = noContent.bind(res);
  res.badRequest = badRequest.bind(res);
  res.unauthorized = unauthorized.bind(res);
  res.forbidden = forbidden.bind(res);
  res.notFound = notFound.bind(res);
  res.internalServerError = internalServerError.bind(res);
  res.redirectTo = redirectTo.bind(res);
  next();
}

function redirectTo(this: Response, redirectTo: string, data: object = {}): void {
  this.sendJSONResponse(302, {
    redirectTo: redirectTo,
    ...data,
  });
}

function ok(this: Response, data?: object): void {
  this.sendJSONResponse(200, data);
}

function created(this: Response, data?: object): void {
  this.sendJSONResponse(201, data, "Resource successfully created.");
}

function noContent(this: Response): void {
  this.sendStatus(204);
}

function badRequest(this: Response, message?: string): void {
  this.sendJSONResponse(400, {}, message || "Bad request.");
}

function unauthorized(this: Response, message?: string): void {
  this.sendJSONResponse(401, {}, message || "Unauthorized.");
}

function forbidden(this: Response, message?: string): void {
  this.sendJSONResponse(403, {}, message || "Forbidden.");
}

function notFound(this: Response, message?: string): void {
  this.sendJSONResponse(404, {}, message || "Resource not found.");
}

function internalServerError(this: Response, message?: string): void {
  this.sendJSONResponse(500, {}, message || "Internal server error.");
}

// Export the middleware
export {
  attachResponseHelper,
};
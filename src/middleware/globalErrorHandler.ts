import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: true,
    message: err.message,
    error: err,
  });
};

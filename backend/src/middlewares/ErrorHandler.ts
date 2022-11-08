import { NextFunction, Request, Response } from "express";
import { ServerError } from "src/errors/ServerError";

export default function ErrorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ServerError) {
    return response.status(error.statusCode).json({
      message: error.message
    })
  }

  return response.status(500).json({
    message: 'Internal Server Error'
  })
}

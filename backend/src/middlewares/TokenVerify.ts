import { ServerError } from "@errors/ServerError";
import JwtService from "@services/JwtService";
import { NextFunction, Request, Response } from "express";

export default function TokenVerify(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.get('Authorization')

  if (!authorization) {
    throw new ServerError(400, 'Token is required')
  }

  const token = authorization.split(' ')[1]

  if (JwtService.valid(token)) {
    next()
  } else {
    throw new ServerError(400, 'Token is invalid')
  }
}

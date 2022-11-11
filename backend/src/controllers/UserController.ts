import { User } from "@database/entities/User";
import UserService from "@services/UserService";
import { Request, Response } from "express";

export default class UserController {
  static async register(request: Request, response: Response) {
    const user: User = request.body

    const savedUser = await UserService.create(user)

    return response.status(201).json(savedUser)
  }
}

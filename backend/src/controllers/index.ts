import { Request, Response } from 'express'

export class IndexController {
  static async index(request: Request, response: Response) {
    return response.status(200).json({
      message: 'Hello World'
    })
  }
}

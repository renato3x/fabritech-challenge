import ClientService from "@services/ClientService";
import { Request, Response } from "express";

export default class ClientController {
  static async index(request: Request, response: Response) {
    const clients = await ClientService.getAll()

    return response.status(200).json(clients)
  }
}

import { Client } from "@database/entities/Client";
import { ServerError } from "@errors/ServerError";
import ClientService from "@services/ClientService";
import ValidationService from "@services/ValidationService";
import { Request, Response } from "express";

export default class ClientController {
  static async index(request: Request, response: Response) {
    const clients = await ClientService.getAll()

    return response.status(200).json(clients)
  }

  static async create(request: Request, response: Response) {
    const client: Client = request.body

    if (ValidationService.isEmpty(client)) {
      throw new ServerError(400, 'Insufficient data to create a Client')
    }

    const savedClient = await ClientService.create(client)

    return response.status(201).json(savedClient)
  }
}

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

  static async findById(request: Request, response: Response) {
    const { id } = request.params

    const client = await ClientService.findById(parseInt(id))

    return response.status(200).json(client)
  }

  static async create(request: Request, response: Response) {
    const requestBody: Client = request.body
    const client = new Client(requestBody)

    const savedClient = await ClientService.create(client)

    return response.status(201).json(savedClient)
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params

    if (isNaN(Number(id))) {
      throw new ServerError(400, '\'id\' is invalid')
    }

    await ClientService.deleteById(parseInt(id))

    return response.status(204).json()
  }

  static async update(request: Request, response: Response) {
    const client: Partial<Client> = request.body

    await ClientService.update(client)

    return response.status(204).json()
  }
}

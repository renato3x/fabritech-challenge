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

    if (isNaN(Number(id))) {
      throw new ServerError(400, '\'id\' is invalid')
    }

    const client = await ClientService.findById(parseInt(id))

    if (!client) {
      throw new ServerError(404, 'Client not found')
    }

    return response.status(200).json(client)
  }

  static async create(request: Request, response: Response) {
    const client: Client = request.body

    if (ValidationService.isEmpty(client)) {
      throw new ServerError(400, 'Insufficient data to create a Client')
    }

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

    if (ValidationService.isEmpty(client) || !client.id) {
      throw new ServerError(400, 'Insufficient data to update a Address')
    }

    await ClientService.update(client)

    return response.status(204).json()
  }
}

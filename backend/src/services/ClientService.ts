import { dataSource } from "@database/dataSource";
import { Client } from "@database/entities/Client";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";
import AddressService from "./AddressService";
import ValidationService from "./ValidationService";

export default class ClientService {
  private static readonly clientRepository: Repository<Client> = dataSource.getRepository(Client)

  static async create(client: Client): Promise<Client> {
    await ValidationService.hasEmpty(client)

    try {
      delete client.id
      const newClient = await this.clientRepository.save(client)
      return newClient
    } catch (error) {
      throw new ServerError(500, 'Error at create a new client')
    }
  }

  static async findById(id: number) {
    if (isNaN(id)) {
      throw new ServerError(400, 'The informed id is invalid')
    }

    try {
      const client = await this.clientRepository.findOne({
        where: {
          id
        },
        relations: {
          address: true,
          kinships: true
        }
      })

      if (!client) {
        throw new ServerError(404, 'Client not found')
      }

      return client
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Error at recover client')
    }
  }

  static async getAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.find({
        relations: {
          address: true,
          kinships: true
        }
      })
    } catch (error) {
      throw new ServerError(500, 'Error at recover clients')
    }
  }

  static async deleteById(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new ServerError(400, 'The informed id is invalid')
    }

    try {
      const client = await this.findById(id)
      
      if (!client) {
        throw new ServerError(404, 'Client to delete not found')
      }

      const addressId = client.address.id as number

      await AddressService.deleteById(addressId)
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Error at delete client')
    }
  }

  static async update(client: Partial<Client>): Promise<void> {

    if (!client.id) {
      throw new ServerError(400, 'id is required')
    }

    const clientWithoutId = { ...client }
    delete clientWithoutId.id

    if (ValidationService.isEmpty(clientWithoutId)) {
      throw new ServerError(400, 'Not data to update')
    }

    try {
      const id = client.id as number
      delete client.id

      const clientExists = await this.findById(id)

      if (!clientExists) {
        throw new ServerError(404, 'Client to update not found')
      }

      Object.assign(clientExists, client)
      await this.clientRepository.save(clientExists)
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }
      
      throw new ServerError(500, 'Internal server error')
    }
  }
}

import { dataSource } from "@database/dataSource";
import { Client } from "@database/entities/Client";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";
import AddressService from "./AddressService";

export default class ClientService {
  private static readonly clientRepository: Repository<Client> = dataSource.getRepository(Client)

  static async create(client: Client): Promise<Client> {
    try {
      delete client.id
      const newClient = await this.clientRepository.save(client)
      return newClient
    } catch (error) {
      throw new ServerError(500, 'Error at create a new client')
    }
  }

  static async findById(id: number): Promise<Client | null> {
    try {
      return this.clientRepository.findOne({
        where: {
          id
        },
        relations: {
          address: true
        }
      })
    } catch (error) {
      throw new ServerError(500, 'Error at recover client')
    }
  }

  static async getAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.find({
        relations: {
          address: true
        }
      })
    } catch (error) {
      throw new ServerError(500, 'Error at recover clients')
    }
  }

  static async deleteById(id: number): Promise<void> {
    try {
      const client = await this.findById(id)
      
      if (!client) {
        throw new ServerError(404, 'Client to delete not found')
      }

      const addressId = client.address.id as number

      await AddressService.deleteById(addressId)
    } catch (error) {
      throw new ServerError(500, 'Error at delete client')
    }
  }
}

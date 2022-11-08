import { dataSource } from "@database/dataSource";
import { Client } from "@database/entities/Client";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";

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
}

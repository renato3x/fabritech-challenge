import { dataSource } from "@database/dataSource";
import { Address } from "@database/entities/Address";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";

export default class AddressService {
  private static readonly addressRepository: Repository<Address> = dataSource.getRepository(Address)

  static async create(address: Address): Promise<Address> {
    try {
      delete address.id
      const newAddress = await this.addressRepository.save(address)
      return newAddress
    } catch (error) {
      throw new ServerError(500, 'Error at create a new address')
    }
  }

  static async update(address: Address): Promise<void> {
    try {
      const id = address.id as number
      delete address.id
      
      await this.addressRepository.update(id, address)
    } catch (error) {
      throw new ServerError(500, 'Error at update address')
    }
  }
}

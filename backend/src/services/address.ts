import { dataSource } from "@database/dataSource";
import { Address } from "@database/entities/Address";
import { Repository } from "typeorm";

export class AddressService {
  private static readonly addressRepository: Repository<Address> = dataSource.getRepository(Address)

  static async create(address: Address): Promise<Address> {
    try {
      const newAddress = this.addressRepository.save(address)
      return newAddress
    } catch (error) {
      throw new Error('Error at insert a new Address')
    }
  }

  static async update(address: Address): Promise<void> {
    try {
      const addressExists = await this.addressRepository.findOne({
        where: {
          id: address.id
        }
      })

      if (!addressExists) {
        throw new Error('Address not found')
      }

      await this.addressRepository.update(address.id as number, address)
    } catch (error) {
      throw new Error('Error at update a Address')
    }
  }
}

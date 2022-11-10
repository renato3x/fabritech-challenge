import { dataSource } from "@database/dataSource";
import { Address } from "@database/entities/Address";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";
import ValidationService from "./ValidationService";

export default class AddressService {
  private static readonly addressRepository: Repository<Address> = dataSource.getRepository(Address)

  static async create(ads: Address): Promise<Address> {
    const address = new Address(ads)
    await ValidationService.hasEmpty(address)

    try {
      delete address.id
      const newAddress = await this.addressRepository.save(address)
      return newAddress
    } catch (error) {
      throw new ServerError(500, 'Error at create a new address')
    }
  }

  static async update(address: Partial<Address>): Promise<void> {
    if (!address.id) {
      throw new ServerError(400, 'id is required')
    }

    const addressWithoutId = { ...address }
    delete addressWithoutId.id

    if (ValidationService.isEmpty(addressWithoutId)) {
      throw new ServerError(400, 'Not data to update')
    }

    try {
      const id = address.id as number
      delete address.id
      
      await this.addressRepository.update(id, address)
    } catch (error) {
      throw new ServerError(500, 'Error at update address')
    }
  }

  static async deleteById(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new ServerError(400, 'The informed id is invalid')
    }

    try {
      const address = await this.findById(id)

      if (!address) {
        throw new ServerError(404, 'Address to delete not found')
      }

      await this.addressRepository.delete(id)
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Error at delete Address')
    }
  }

  private static async findById(id: number) {
    try {
      const address = await this.addressRepository.findOne({
        where: {
          id
        }
      })

      if (!address) {
        throw new ServerError(404, 'Address not found')
      }

      return address
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Error at recover address')
    }
  }
}

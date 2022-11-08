import { Address } from "@database/entities/Address";
import { ServerError } from "@errors/ServerError";
import AddressService from "@services/AddressService";
import { Request, Response } from "express";

export default class AddressController {
  static async create(request: Request, response: Response) {
    const address: Address = request.body

    if (Object.keys(address).length == 0) {
      throw new ServerError(400, 'Insufficient data to create a Address')
    }

    const savedAddress = await AddressService.create(address)

    return response.status(201).json(savedAddress)
  }

  static async update(request: Request, response: Response) {
    const address: Address = request.body

    if (!address) {
      throw new ServerError(400, 'Insufficient data to update a Address')
    }

    await AddressService.update(address)

    return response.status(204).json()
  }
}

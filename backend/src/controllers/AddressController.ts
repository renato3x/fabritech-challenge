import { Address } from "@database/entities/Address";
import { ServerError } from "@errors/ServerError";
import AddressService from "@services/AddressService";
import ValidationService from "@services/ValidationService";
import { Request, Response } from "express";

export default class AddressController {
  static async create(request: Request, response: Response) {
    const address: Address = request.body

    const savedAddress = await AddressService.create(address)

    return response.status(201).json(savedAddress)
  }

  static async update(request: Request, response: Response) {
    const address: Partial<Address> = request.body

    await AddressService.update(address)

    return response.status(204).json()
  }
}

import { Address } from "@database/entities/Address";
import AddressService from "@services/AddressService";
import { Request, Response } from "express";

export default class AddressController {
  static async create(request: Request, response: Response) {
    const address: Address = request.body

    if (!address) {
      return response.status(400).json({
        message: 'Insufficient data to create a Address'
      })
    }

    const savedAddress = await AddressService.create(address)

    return response.status(201).json(savedAddress)
  }

  static async update(request: Request, response: Response) {
    const address: Address = request.body

    if (!address) {
      return response.status(400).json({
        message: 'Insufficient data to update a Address'
      })
    }

    await AddressService.update(address)

    return response.status(204).json()
  }
}

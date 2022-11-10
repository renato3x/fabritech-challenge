import { Kinship } from "@database/entities/Kinship";
import KinshipService from "@services/KinshipService";
import { Request, Response } from "express";

export default class KinshipController {
  static async create(request: Request, response: Response) {
    const requestBody: Kinship[] = request.body

    const savedKinships = await KinshipService.create(requestBody)

    return response.status(201).json(savedKinships)
  }

  static async update(request: Request, response: Response) {
    const kinship: Partial<Kinship> = request.body

    await KinshipService.update(kinship)

    return response.status(204).json()
  }

  static async delete(request: Request, response: Response) {
    const id = request.params.id

    await KinshipService.deleteById(parseInt(id))

    return response.status(204).json()
  }
}

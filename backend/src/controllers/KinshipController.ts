import { Kinship } from "@database/entities/Kinship";
import { ServerError } from "@errors/ServerError";
import KinshipService from "@services/KinshipService";
import ValidationService from "@services/ValidationService";
import { Request, Response } from "express";

export default class KinshipController {
  static async create(request: Request, response: Response) {
    const kinships: Kinship[] = request.body
    const hasKinshipEmpty = kinships.some(ValidationService.isEmpty)

    if (ValidationService.isEmpty(kinships) || hasKinshipEmpty) {
      throw new ServerError(400, 'Insufficient data to create kinships')
    }

    const savedKinships = await KinshipService.create(kinships)

    return response.status(201).json(savedKinships)
  }
}

import { dataSource } from "@database/dataSource";
import { Kinship } from "@database/entities/Kinship";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";
import ValidationService from "./ValidationService";

export default class KinshipService {
  private static readonly kinshipRepository: Repository<Kinship> = dataSource.getRepository(Kinship)

  static async create(values: Kinship[]): Promise<Kinship[]> {
    const kinships = values.map(kinship => {
      return new Kinship(kinship)
    })

    for (let kinship of kinships) {
      await ValidationService.hasEmpty(kinship)
    }

    try {
      const newKinships = await this.kinshipRepository.save(kinships)
      return newKinships
    } catch (error) {
      throw new ServerError(500, 'Error at create kinships')
    }
  }

  static async update(kinship: Partial<Kinship>): Promise<void> {
    if (!kinship.id) {
      throw new ServerError(400, 'id is required')
    }

    const kinshipWithoutId = { ...kinship }
    delete kinshipWithoutId.id

    if (ValidationService.isEmpty(kinshipWithoutId)) {
      throw new ServerError(400, 'Not data to update')
    }

    try {
      const id = kinship.id as number
      delete kinship.id

      const kinshipExists = await this.findById(id)

      if (!kinshipExists) {
        throw new ServerError(404, 'Kinship to update not found')
      }

      Object.assign(kinshipExists, kinship)
      await this.kinshipRepository.save(kinshipExists)
    } catch (error) {
      throw new ServerError(500, 'Error at update kinship')
    }
  }

  static async deleteById(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new ServerError(400, 'The informed id is invalid')
    }

    try {
      const kinship = await this.findById(id)

      if (!kinship) {
        throw new ServerError(404, 'Kinship to delete not found')
      }

      await this.kinshipRepository.delete(id)
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Internal server error')
    }
  }

  private static async findById(id: number) {
    try {
      const kinship = await this.kinshipRepository.findOne({
        where: {
          id
        }
      })
  
      if (!kinship) {
        throw new ServerError(404, 'Kinship not found')
      }
  
      return kinship
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Internal server error')
    }
  }
}

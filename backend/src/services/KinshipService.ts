import { dataSource } from "@database/dataSource";
import { Kinship } from "@database/entities/Kinship";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";

export default class KinshipService {
  private static readonly kinshipRepository: Repository<Kinship> = dataSource.getRepository(Kinship)

  static async create(kinships: Kinship[]): Promise<Kinship[]> {
    try {
      const newKinships = await this.kinshipRepository.save(kinships)
      return newKinships
    } catch (error) {
      throw new ServerError(500, 'Error at create kinships')
    }
  }

  static async update(kinship: Partial<Kinship>): Promise<void> {
    try {
      const id = kinship.id as number
      delete kinship.id
      
      await this.kinshipRepository.update(id, kinship)
    } catch (error) {
      throw new ServerError(500, 'Error at update kinship')
    }
  }

  static async deleteById(id: number): Promise<void> {
    try {
      await this.kinshipRepository.delete(id)
    } catch (error) {
      throw new ServerError(500, 'Error at delete kinship')
    }
  }
}

import { ServerError } from "@errors/ServerError"
import { validate } from "class-validator"
import { Repository } from "typeorm"
import { UniqueMetadata } from "typeorm/metadata/UniqueMetadata"

export default class ValidationService {
  static isEmpty(value: Object): boolean {
    return Object.keys(value).length == 0
  }

  static async hasEmpty(object: Object) {
    const errors = await validate(object)

    if (errors.length > 0) {
      const error = errors[0]
      throw new ServerError(400, error.constraints?.isNotEmpty as string)
    }
  }

  static async throwIfHasUnique(repository: Repository<any>, object: Object) {
    const uniques = this.filterUniqueKeys(repository.metadata.uniques)

    const objectUniques = Object.keys(object).filter(objectUnique => {
      return uniques.includes(objectUnique)
    })

    for (let unique of objectUniques) {
      const query: any = {}
      query[unique] = (object as any)[unique]

      try {
        const objExists = await repository.findOne({
          where: query
        })
  
        if (objExists) {
          throw new ServerError(400, `${unique} already exists`)
        }
      } catch (error) {
        if (error instanceof ServerError) {
          throw error
        }

        throw new ServerError(500, 'Internal server error')
      }
    }
  }

  private static filterUniqueKeys(uniques: UniqueMetadata[]) {
    if (uniques.length > 0) {
      return uniques.map(unique => {
        return (unique.givenColumnNames as string[])[0]
      }) 
    }

    return uniques.map(unique => {
      return unique.givenColumnNames as string[]
    }).flat()
  }
}

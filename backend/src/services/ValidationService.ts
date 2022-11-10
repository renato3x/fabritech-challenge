import { ServerError } from "@errors/ServerError"
import { validate } from "class-validator"

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
}

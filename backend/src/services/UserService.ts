import { dataSource } from "@database/dataSource";
import { User } from "@database/entities/User";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";
import PasswordService from "./PasswordService";
import ValidationService from "./ValidationService";

export default class UserService {
  private static readonly userRepository: Repository<User> = dataSource.getRepository(User)

  static async create(u: User) {
    const user = new User(u)
    await ValidationService.hasEmpty(user)
    await ValidationService.throwIfHasUnique(this.userRepository, user)

    try {
      user.password = PasswordService.encrypt(user.password)
      delete user.id

      const newUser = await this.userRepository.save(user) as Partial<User>
      delete newUser.password
      
      return newUser
    } catch (error) {
      throw new ServerError(500, 'Error at create a new user')
    }
  }
}

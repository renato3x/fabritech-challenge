import { dataSource } from "@database/dataSource";
import { User } from "@database/entities/User";
import { ServerError } from "@errors/ServerError";
import { Repository } from "typeorm";
import JwtService from "./JwtService";
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

  static async login(userData: Partial<User>) {
    if (!userData.email && !userData.username) {
      throw new ServerError(400, 'Email or password is required to login')
    }

    if (!userData.password) {
      throw new ServerError(400, 'Password is required to login')
    }

    try {
      const { password } = userData
      delete userData.password
      
      const user = await this.find(userData)

      if (!user) {
        throw new ServerError(404, 'User not found')
      }

      if (!PasswordService.isEquals(password, user.password)) {
        throw new ServerError(400, 'Password is wrong')
      }

      const token = JwtService.generate({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      }, { expiresIn: '12h' })

      return token
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Internal server error')
    }
  }

  private static async find(u: Partial<User>) {
    try {
      const user = await this.userRepository.findOne({
        where: u
      })

      if (!user) {
        throw new ServerError(404, 'User not found')
      }

      return user
    } catch (error) {
      if (error instanceof ServerError) {
        throw error
      }

      throw new ServerError(500, 'Internal server error')
    }
  }
}

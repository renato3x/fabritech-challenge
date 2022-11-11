import bcrypt from 'bcryptjs'

export default class PasswordService {
  static encrypt(password: string) {
    return bcrypt.hashSync(password, 10)
  }

  static isEquals(password: string, ePassword: string) {
    return bcrypt.compareSync(password, ePassword)
  }
}

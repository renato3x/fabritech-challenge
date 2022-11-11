import { ServerError } from '@errors/ServerError'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { jwtSecret } from '@config/config.json'
import { Token } from '@interfaces/Token'

export default class JwtService {
  private static readonly secret: Secret = jwtSecret

  static generate(
    payload: string | Object | Buffer,
    options: SignOptions
  ): Token {
    try {
      const token = jwt.sign(payload, this.secret, options)
      return {
        token
      }
    } catch (error) {
      throw new ServerError(500, 'Error at generate token')
    }
  }
}

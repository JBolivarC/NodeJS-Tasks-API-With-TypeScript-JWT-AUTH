import jwt from 'jsonwebtoken'
import { config } from '../config/environments'
import { Id } from '../declarations/db'

const signToken = async (userId: Id) => {
  const token = jwt.sign({ userId: userId }, config.jwt_secret, { expiresIn: config.jwt_expires_in })
  return token
}

const verifyToken = async (token: string): Promise<any> => {
  const decoded = jwt.verify(token, config.jwt_secret, function (err, decoded) {
    if (err) {
      throw err
    } else {
      return decoded
    }
  })
  return decoded
}

export { signToken, verifyToken }

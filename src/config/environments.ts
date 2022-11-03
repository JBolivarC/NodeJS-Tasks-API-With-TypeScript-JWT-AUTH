import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const config = {
  port: process.env.API_PORT ?? '',
  env: process.env.API_ENV ?? '',
  jwt_secret: process.env.JWT_SECRET ?? '',
  jwt_expires_in: process.env.JWT_EXPIRES_IN ?? ''
}

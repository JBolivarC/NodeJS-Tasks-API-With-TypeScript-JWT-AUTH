import { DataSource } from 'typeorm'
import path from 'path'

export default new DataSource({
  type: 'sqlite',
  entities: ['src/models/*.ts'],
  synchronize: true,
  logging: false,
  database: path.resolve(__dirname, '../../db.sql')
})

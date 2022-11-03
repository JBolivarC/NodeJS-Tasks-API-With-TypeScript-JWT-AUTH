import { Id } from '../../declarations/db'

export interface CreateUserDTO {
  id: Id
  name: string
  userName: string
  email: string
  password: string
}

export interface UpdateUserDTO extends CreateUserDTO {}

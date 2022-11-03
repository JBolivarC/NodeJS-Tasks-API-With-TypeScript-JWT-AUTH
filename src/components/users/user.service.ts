import { Id } from '../../declarations/db'
import { AlreadyExistsError } from '../../errors/alreadyExistsError'
import { User } from '../../models/User'
import { CreateUserDTO, UpdateUserDTO } from './user.dto'
import { UserRepository } from './user.repository'

export class UserService {
  constructor(private userRepository = new UserRepository()) {}

  Create = async (data: CreateUserDTO): Promise<User> => {
    const dbUser = await this.userRepository.GetByEmail(data.email)
    if (dbUser) throw new AlreadyExistsError('User with this email is already registered!')

    const userData = new User()
    userData.name = data.name
    userData.userName = data.userName
    userData.email = data.email
    await userData.EncryptPassword(data.password)
    const user = await this.userRepository.Create(userData)
    return user
  }

  GetAll = async (): Promise<User[]> => {
    const users = await this.userRepository.GetAll()
    return users
  }

  GetById = async (id: Id): Promise<User> => {
    const user = await this.userRepository.GetById(id)
    return user
  }

  Update = async (id: Id, data: UpdateUserDTO): Promise<void> => {
    const dbUser = await this.userRepository.GetById(id)
    dbUser.name = data.name ?? dbUser.name
    dbUser.userName = data.userName ?? dbUser.userName
    await this.userRepository.Update(id, dbUser)
  }

  GetByEmail = async (email: string): Promise<User | null> => {
    const user = await this.userRepository.GetByEmail(email)
    return user
  }
}

import database from '../../config/database'
import { DatabaseRepository, Id, Query } from '../../declarations/db'
import { User } from '../../models/User'
import { NotFoundError } from '../../errors/notFoundError'

export class UserRepository implements DatabaseRepository<User> {
  Create = async (data: Partial<User>, query?: Query | undefined): Promise<User> => {
    const repository = database.getRepository(User)
    const user = repository.create(data)
    await repository.save(user)
    return user
  }

  GetAll = async (query?: Query | undefined): Promise<User[]> => {
    const repository = database.getRepository(User)
    const users = await repository.find()
    return users
  }

  GetById = async (id: Id, query?: Query | undefined): Promise<User> => {
    const repository = database.getRepository(User)
    const user = await repository.findOneBy({ id: id as any })
    if (!user) throw new NotFoundError(`User ${id} not found!`)
    return user
  }

  Update = async (id: Id, data: User, query?: Query | undefined): Promise<void> => {
    const repository = database.getRepository(User)
    await repository.update(id, data)
  }

  Delete = async (id: Id, query?: Query | undefined): Promise<void> => {
    const repository = database.getRepository(User)
    await repository.delete(id)
  }

  GetByEmail = async (email: string): Promise<User | null> => {
    const repository = database.getRepository(User)
    const user = await repository.findOneBy({ email: email })
    return user
  }
}

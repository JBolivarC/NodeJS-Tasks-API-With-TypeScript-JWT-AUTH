import database from '../../config/database'
import { DatabaseRepository, Id, Query } from '../../declarations/db'
import { Task } from '../../models/Task'
import { NotFoundError } from '../../errors/notFoundError'

export class TaskRepository implements DatabaseRepository<Task> {
  Create = async (data: Partial<Task>, query?: Query | undefined): Promise<Task> => {
    const repository = database.getRepository(Task)
    const task = repository.create(data)
    await repository.save(task)
    return task
  }

  GetAll = async (query?: Query | undefined): Promise<Task[]> => {
    const repository = database.getRepository(Task)
    const tasks = await repository.find({ where: { user: { id: query?.userId } } })
    return tasks
  }

  GetById = async (id: Id, query?: Query | undefined): Promise<Task> => {
    const repository = database.getRepository(Task)
    const task = await repository.findOne({ relations: { user: query?.getUser ?? (false as boolean) }, where: { id: id as any, user: { id: query?.userId } } })
    if (!task) throw new NotFoundError(`Task ${id} not found!`)
    return task
  }

  Update = async (id: Id, data: Task, query?: Query | undefined): Promise<void> => {
    const repository = database.getRepository(Task)
    await repository.update(id, data)
  }

  Delete = async (id: Id, query?: Query | undefined): Promise<void> => {
    const repository = database.getRepository(Task)
    await repository.delete(id)
  }
}

import { Id, Query } from '../../declarations/db'
import { ActionNotAllowed } from '../../errors/actionNotAllowed'
import { Task } from '../../models/Task'
import { UserService } from '../users/user.service'
import { CreateTaskDTO, UpdateTaskDTO } from './task.dto'
import { TaskRepository } from './task.repository'

export class TaskService {
  constructor(private taskRepository = new TaskRepository(), private userService = new UserService()) {}

  Create = async (data: CreateTaskDTO, userId: Id): Promise<Task> => {
    const user = await this.userService.GetById(userId)
    const taskData = new Task()
    taskData.title = data.title
    taskData.description = data.description
    taskData.isCompleted = data.isCompleted
    taskData.user = user
    const newTask = await this.taskRepository.Create(taskData)
    delete newTask.user
    return newTask
  }

  GetAll = async (userId: Id): Promise<Task[]> => {
    const query: Query = { userId }
    return await this.taskRepository.GetAll(query)
  }

  GetById = async (taskId: Id, userId: Id): Promise<Task> => {
    const query: Query = { userId }
    return await this.taskRepository.GetById(taskId, query)
  }

  Update = async (taskId: Id, data: UpdateTaskDTO, userId: Id): Promise<void> => {
    const query: Query = { getUser: true }
    const user = await this.userService.GetById(userId)
    const dbTask = await this.taskRepository.GetById(taskId, query)

    if (dbTask.user?.id === user.id) {
      dbTask.title = data.title ?? dbTask.title
      dbTask.description = data.description ?? dbTask.description
      dbTask.isCompleted = data.isCompleted ?? dbTask.isCompleted
      await this.taskRepository.Update(dbTask.id, dbTask)
    } else {
      throw new ActionNotAllowed('This action is not allowed!')
    }
  }

  Delete = async (taskId: Id, userId: Id): Promise<void> => {
    const user = await this.userService.GetById(userId)
    const dbTask = await this.taskRepository.GetById(taskId)
    if (dbTask.user?.id === user.id) {
      await this.taskRepository.Delete(taskId)
    } else {
      throw new ActionNotAllowed('This action is not allowed!')
    }
  }
}

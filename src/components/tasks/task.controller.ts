import { Request, Response, NextFunction } from 'express'
import { BaseController } from '../../base/base.controller'
import { NotFoundError } from '../../errors/notFoundError'
import { CreateTaskDTO } from './task.dto'
import { TaskService } from './task.service'

export class TaskController extends BaseController {
  constructor(private taskService = new TaskService()) {
    super()
  }

  Create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as CreateTaskDTO
      const task = await this.taskService.Create(data, res.locals.userId)
      this.Created(res, task)
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.NotFound(res, error.message)
      } else next(error)
    }
  }

  GetAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = await this.taskService.GetAll(res.locals.userId)
      this.Ok(res, tasks)
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.NotFound(res, error.message)
      } else next(error)
    }
  }

  GetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { taskId } = req.params
      const task = await this.taskService.GetById(taskId, res.locals.userId)
      this.Ok(res, task)
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.NotFound(res, error.message)
      } else next(error)
    }
  }

  Update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { taskId } = req.params
      const { body } = req
      const task = await this.taskService.Update(taskId, body, res.locals.userId)
      this.Ok(res, task)
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.NotFound(res, error.message)
      } else next(error)
    }
  }

  Delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { taskId } = req.params
      await this.taskService.Delete(taskId, res.locals.userId)
      this.NoContent(res)
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.NotFound(res, error.message)
      } else next(error)
    }
  }
}

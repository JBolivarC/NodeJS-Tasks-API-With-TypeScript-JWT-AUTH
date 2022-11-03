import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../../base/base.controller'
import { NotFoundError } from '../../errors/notFoundError'
import { CreateUserDTO } from './user.dto'
import { UserService } from './user.service'

export class UserController extends BaseController {
  constructor(private userService = new UserService()) {
    super()
  }

  Create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body as CreateUserDTO
      const user = await this.userService.Create(userData)
      this.Ok(res, user)
    } catch (error) {
      next(error)
    }
  }

  GetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.userId as string
      const user = await this.userService.GetById(userId)
      this.Ok(res, user)
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.NotFound(res, error.message)
      } else {
        next(error)
      }
    }
  }
}

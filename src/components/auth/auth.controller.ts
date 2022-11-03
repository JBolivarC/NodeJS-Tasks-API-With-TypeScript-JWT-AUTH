import { Request, Response, NextFunction } from 'express'
import { BaseController } from '../../base/base.controller'
import { UserService } from '../users/user.service'
import { LoginDTO } from './auth.dto'
import { signToken } from './../../utils/jwt'
import { CreateUserDTO } from '../users/user.dto'
import { AlreadyExistsError } from '../../errors/alreadyExistsError'

export class AuthController extends BaseController {
  constructor(private userService = new UserService()) {
    super()
  }

  async Signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body as CreateUserDTO
      const user = await this.userService.Create(userData)
      const token = {
        token: await signToken(user.id)
      }
      this.Ok(res, token)
    } catch (error) {
      if (error instanceof AlreadyExistsError) return this.BadRequest(res, error.message)
      next(error)
    }
  }

  async Login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginData = req.body as LoginDTO
      const user = await this.userService.GetByEmail(loginData.email)

      if (!user) return this.Unauhorized(res, 'Email or password does not match!')
      if (!(await user.CheckPassword(loginData.password))) return this.Unauhorized(res, 'Email or password does not match!')

      const token = {
        token: await signToken(user.id)
      }
      this.Ok(res, token)
    } catch (error) {
      next(error)
    }
  }
}

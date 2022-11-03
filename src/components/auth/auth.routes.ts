import { Router } from 'express'
import { AuthController } from './../auth/auth.controller'

const router = Router()
const controller = new AuthController()

router.post('/auth/login', controller.Login.bind(controller))
router.post('/auth/signup', controller.Signup.bind(controller))

export default router

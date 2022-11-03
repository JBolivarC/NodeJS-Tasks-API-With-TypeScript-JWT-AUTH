import { Router } from 'express'
import { TaskController } from './task.controller'

const router = Router()
const controller = new TaskController()

router.post('/tasks', controller.Create)
router.get('/tasks', controller.GetAll)
router.get('/tasks/:taskId', controller.GetById)
router.put('/tasks/:taskId', controller.Update)
router.delete('/tasks/:taskId', controller.Delete)

export default router

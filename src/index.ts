import 'reflect-metadata'
import database from './config/database'
import express from 'express'
import { config } from './config/environments'
import TaskRoutes from './components/tasks/task.routes'
import AuthRoutes from './components/auth/auth.routes'
import { ErrorHandler } from './middlewares/errorHandler.middleware'
import { VerifyToken } from './middlewares/auth.middleware'

const app = express()
const apiPort = config.port
const apiPrefix = '/api'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(apiPrefix, AuthRoutes)
app.use(apiPrefix, VerifyToken, TaskRoutes)
app.use(ErrorHandler)

database
  .initialize()
  .then(() => console.log('Database connected!'))
  .catch(console.error)

app.listen(apiPort, () => {
  console.log(`Server running in port ${apiPort}`)
})

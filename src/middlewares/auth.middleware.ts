import { NextFunction, Request, Response } from 'express'
import { HttpStatusCodes } from '../config/statusCodes'
import { verifyToken } from '../utils/jwt'

export const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.sendStatus(HttpStatusCodes.Unauthorized)
    const decoded = await verifyToken(token)
    res.locals.userId = decoded.userId
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(HttpStatusCodes.Unauthorized)
  }
}

import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const requireAuth = function (req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) throw new UnauthorizedError('User is not authenticated')
  return next()
}

export default requireAuth

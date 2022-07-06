import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = function (req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) return next()

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload
  } catch (err) {
    if (!process.env.NODE_ENV?.includes('test')) console.error(err)
  } finally {
    return next()
  }
}

export default currentUser

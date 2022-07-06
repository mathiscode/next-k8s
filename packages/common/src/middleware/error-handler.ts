import { Request, Response, NextFunction } from 'express'

export const errorHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
  if (!process.env.NODE_ENV?.includes('test')) console.error(err)
  return res.status(err.status || 500).json({ error: err.serialize?.() || err.message })
}

export default errorHandler

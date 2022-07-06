import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'

export const validateRequest = function (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) throw new RequestValidationError('Request validation failed', 400, errors.array())
  next()
}

export default validateRequest

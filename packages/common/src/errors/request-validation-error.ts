import { ValidationError } from 'express-validator'
import { BaseError } from './_base-error'

export class RequestValidationError extends BaseError {
  constructor(public message: string, public status: number = 400, public data?: ValidationError[]) {
    super(message, status, data)
  }
}

export default RequestValidationError

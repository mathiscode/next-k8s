import { BaseError } from './_base-error'

export class UnauthorizedError extends BaseError {
  constructor(message?: string, public status = 401, public data?: any) {
    super(message || 'Not Found')
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}

export default UnauthorizedError

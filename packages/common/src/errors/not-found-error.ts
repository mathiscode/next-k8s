import { BaseError } from './_base-error'

export class NotFoundError extends BaseError {
  status = 404

  constructor(message?: string) {
    super(message || 'Not Found')
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export default NotFoundError

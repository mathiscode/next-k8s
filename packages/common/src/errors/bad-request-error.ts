import { BaseError } from './_base-error'

export class BadRequestError extends BaseError {
  constructor(message: string = 'Bad Request', public status: number = 400, public data?: any) {
    super(message, status, data)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

export default BadRequestError

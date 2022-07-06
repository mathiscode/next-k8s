import { BaseError } from './_base-error'

export class DatabaseConnectionError extends BaseError {
  constructor (public message: string, public status: number = 500) {
    super(message, status)
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype) // For TS
  }
}

export default DatabaseConnectionError

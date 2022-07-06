export class BaseError extends Error {
  constructor(message: string, public status: number = 500, public data?: any) {
    super(message)
    Object.setPrototypeOf(this, BaseError.prototype) // For TS
  }

  serialize (): any {
    return { type: this.constructor.name, status: this.status, message: this.message, data: this.data }
  }
}

export default BaseError

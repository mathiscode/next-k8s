"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message, status = 500, data) {
        super(message);
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, BaseError.prototype); // For TS
    }
    serialize() {
        return { type: this.constructor.name, status: this.status, message: this.message, data: this.data };
    }
}
exports.BaseError = BaseError;
exports.default = BaseError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const _base_error_1 = require("./_base-error");
class BadRequestError extends _base_error_1.BaseError {
    constructor(message = 'Bad Request', status = 400, data) {
        super(message, status, data);
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
exports.default = BadRequestError;

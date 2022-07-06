"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const _base_error_1 = require("./_base-error");
class RequestValidationError extends _base_error_1.BaseError {
    constructor(message, status = 400, data) {
        super(message, status, data);
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
exports.RequestValidationError = RequestValidationError;
exports.default = RequestValidationError;

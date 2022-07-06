"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const _base_error_1 = require("./_base-error");
class UnauthorizedError extends _base_error_1.BaseError {
    constructor(message, status = 401, data) {
        super(message || 'Not Found');
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
exports.default = UnauthorizedError;

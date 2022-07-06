"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const _base_error_1 = require("./_base-error");
class NotFoundError extends _base_error_1.BaseError {
    constructor(message) {
        super(message || 'Not Found');
        this.status = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
exports.default = NotFoundError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const _base_error_1 = require("./_base-error");
class DatabaseConnectionError extends _base_error_1.BaseError {
    constructor(message, status = 500) {
        super(message, status);
        this.message = message;
        this.status = status;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype); // For TS
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
exports.default = DatabaseConnectionError;

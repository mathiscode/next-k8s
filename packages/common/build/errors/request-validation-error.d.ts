import { ValidationError } from 'express-validator';
import { BaseError } from './_base-error';
export declare class RequestValidationError extends BaseError {
    message: string;
    status: number;
    data?: ValidationError[] | undefined;
    constructor(message: string, status?: number, data?: ValidationError[] | undefined);
}
export default RequestValidationError;

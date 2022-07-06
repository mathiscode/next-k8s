import { BaseError } from './_base-error';
export declare class BadRequestError extends BaseError {
    status: number;
    data?: any;
    constructor(message?: string, status?: number, data?: any);
}
export default BadRequestError;

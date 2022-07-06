import { BaseError } from './_base-error';
export declare class UnauthorizedError extends BaseError {
    status: number;
    data?: any;
    constructor(message?: string, status?: number, data?: any);
}
export default UnauthorizedError;

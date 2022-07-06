import { BaseError } from './_base-error';
export declare class DatabaseConnectionError extends BaseError {
    message: string;
    status: number;
    constructor(message: string, status?: number);
}
export default DatabaseConnectionError;

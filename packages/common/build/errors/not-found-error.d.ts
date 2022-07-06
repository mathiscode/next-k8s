import { BaseError } from './_base-error';
export declare class NotFoundError extends BaseError {
    status: number;
    constructor(message?: string);
}
export default NotFoundError;

export declare class BaseError extends Error {
    status: number;
    data?: any;
    constructor(message: string, status?: number, data?: any);
    serialize(): any;
}
export default BaseError;

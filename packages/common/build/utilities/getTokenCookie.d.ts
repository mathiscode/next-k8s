export interface GetTokenCookieOptions {
    id: string;
    email: string;
}
export declare const getTokenCookie: (payload: GetTokenCookieOptions) => Promise<string>;

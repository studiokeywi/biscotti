import { CookieAttrs, CookieObject } from './types.js';
export declare const exists: (value: any) => boolean;
export declare const formatCookies: (key: string, value: string | CookieAttrs) => string;
export declare const isBoolean: (value: any) => boolean;
export declare const isClient: () => boolean;
export declare const isDate: (value: any) => boolean;
export declare const isError: (value: any) => boolean;
export declare const isNumber: (value: any) => boolean;
export declare const isString: (value: any) => boolean;
export declare const toss: (toThrow: string) => never;
export declare const makeCookieObject: (cookieStr: string) => CookieObject;
export declare const validate: (attrs: CookieAttrs) => void;
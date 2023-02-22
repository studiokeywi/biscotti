import { CookieAttrs, CookieObject } from './types.js';
/** Check for non-null and non-undefined */
export declare const exists: (value: any) => boolean;
/** Format cookie attribute objects into a cookie string */
export declare const formatCookies: (key: string, value: string | CookieAttrs) => string;
/** Type check if value is a boolean */
export declare const isBoolean: (value: any) => boolean;
/** Check if the current global scope is a browser by checking for `globalThis.document` */
export declare const isClient: () => boolean;
/** Instance check if value is a Date object */
export declare const isDate: (value: any) => boolean;
/** Instance check if value is an Error object */
export declare const isError: (value: any) => boolean;
/** Type check if value is number */
export declare const isNumber: (value: any) => boolean;
/** Type check if value is string */
export declare const isString: (value: any) => boolean;
/** FP friendly way to generate errors */
export declare const toss: (toThrow: string) => never;
/** Convert cookie string value into an object */
export declare const makeCookieObject: (cookieStr: string) => CookieObject;
/** Validate cookie attributes */
export declare const validate: (attrs: CookieAttrs) => void;

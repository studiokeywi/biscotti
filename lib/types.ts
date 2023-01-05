export interface BakedClient extends Biscotti {
  add(key: string, value: CookieAttrs | string): CookieObject;
  get(key?: string): CookieObject | string;
  mode: string;
  rem(key: string): CookieObject;
}
export interface BakedServer extends Biscotti {
  add(key: string, value: ServerCookieAttrs | string): BiscottiResponse;
  get(key?: string): CookieObject | string;
  mode: string;
  rem(key: string): BiscottiResponse;
}
export interface CookieAttrs {
  domain?: string;
  expires?: Date | string;
  maxAge?: number;
  path?: string;
  samesite?: string;
  secure?: boolean;
  value: string;
}
export type CookieObject = Record<string, string>;
export interface ServerCookieAttrs extends CookieAttrs {
  httpOnly?: boolean;
}
export type BiscottiRequest = import('node:http').ClientRequest | import('node:http').IncomingMessage;
export type BiscottiResponse = import('node:http').ServerResponse | import('node:http').OutgoingMessage;
export interface Biscotti {
  add: Function;
  get: Function;
  mode: string;
  rem: Function;
}

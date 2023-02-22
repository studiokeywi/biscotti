import type { ClientRequest, IncomingMessage, OutgoingMessage, ServerResponse } from 'node:http';

/** Client version of Biscotti */
export interface BakedClient extends Biscotti {
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: CookieAttrs): CookieObject;
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: string): CookieObject;

  /** Get all current cookies */
  get(): CookieObject;
  /** Get a cookie's value */
  get(key: string): string;

  /** Flavor of Biscotti */
  mode: 'client';

  /** Remove a cookie */
  rem(key: string): CookieObject;
}

/** Server version of Biscotti */
export interface BakedServer extends Biscotti {
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: ServerCookieAttrs): BiscottiResponse;
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: string): BiscottiResponse;

  /** Get all current cookies */
  get(): CookieObject;
  /** Get a cookie's value */
  get(key: string): string;

  /** Flavor of Biscotti */
  mode: 'server';

  /** Remove a cookie */
  rem(key: string): BiscottiResponse;
}

/** Biscotti interface */
export interface Biscotti {
  /** Add a new cookie/change a current cookie's value */
  add:
    | ((key: string, value: CookieAttrs | string) => CookieObject)
    | ((key: string, value: ServerCookieAttrs | string) => BiscottiResponse);

  /** Get a cookie's value or all current cookies */
  get: (() => CookieObject) | ((key: string) => string);

  /** Flavor of Biscotti */
  mode: 'client' | 'server';

  /** Remove a cookie */
  rem: ((key: string) => CookieObject) | ((key: string) => BiscottiResponse);
}

/** Utility union type of `node:http.ClientRequest` and `node:http.IncomingMessage` */
export type BiscottiRequest = ClientRequest | IncomingMessage;

/** Utility union type of `node:http.ServerResponse` and `node:http.OutgoingMessage` */
export type BiscottiResponse = ServerResponse | OutgoingMessage;

/** Valid cookie attributes */
export interface CookieAttrs {
  /** Which hosts can receive a cookie */
  domain?: string;
  /** A date to delete the cookie */
  expires?: Date | string;
  /** A time period for the cookie to exist */
  maxAge?: number;
  /** A URL path that must exist in the requested URL */
  path?: string;
  /** Specify whether/when cookies are sent with cross-site requests */
  samesite?: ValidSameSite;
  /** Whether to only send cookie via HTTPS requests */
  secure?: boolean;
  /** Value of the cookie */
  value: string;
}

/** Cookie represented as an object mapping cookie names to values */
export type CookieObject = Record<string, string>;

/** Valid cookie attributes for server-side cookies */
export interface ServerCookieAttrs extends CookieAttrs {
  /** Whether the cookie is available to `document.cookie` */
  httpOnly?: boolean;
}

/** Valid values for the `samesite` attribute on cookies */
export type ValidSameSite = 'Lax' | 'None' | 'Strict';

import { type RequestHandler } from 'express';
import type { ClientRequest, IncomingMessage } from 'node:http';
import type { BakedServer, BiscottiRequest, BiscottiResponse, CookieObject, ServerCookieAttrs } from './types.js';
import { formatCookies, isClient, makeCookieObject, toss } from './util.js';

const invalid =
  "This is the server version of biscotti. Did you mean to import { bake } from '@studiokeywi/biscotti/client' or `import { bakeClient } from '@studiokeywi/biscotti'`?";

function add(res: BiscottiResponse, key: string, value: ServerCookieAttrs | string): BiscottiResponse {
  return res.setHeader('Set-Cookie', formatCookies(key, value));
}

function get(req: BiscottiRequest): CookieObject;
function get(req: BiscottiRequest, key: string): string;
function get(req: BiscottiRequest, key?: string): CookieObject | string {
  const cookieSource = ((<ClientRequest>req)?.getHeader?.('cookie') ??
    (<IncomingMessage>req).headers?.cookie ??
    (<IncomingMessage>req).headers?.Cookie ??
    '') as string;
  const cookies = makeCookieObject(cookieSource);
  return key ? cookies[key] ?? '' : cookies;
}

function rem(res: BiscottiResponse, key: string) {
  return add(res, key, { expires: new Date(), value: '' });
}

/** Create a new Server version of Biscotti */
export const bake = (req: BiscottiRequest, res: BiscottiResponse): BakedServer => {
  if (isClient()) return toss(invalid);
  return { add: add.bind(null, res), get: get.bind(null, req), mode: 'server', rem: rem.bind(null, res) };
};

/** Create a test middleware that performs a simple toggle of adding and removing a cookie */
export const testXPS =
  (testCookieName: string): RequestHandler =>
  (req, res) => {
    const { biscotti } = res.locals as { biscotti: BakedServer };
    if (biscotti.get(testCookieName)) return biscotti.rem(testCookieName).end(`Removed cookie ${testCookieName}`);
    biscotti.add(testCookieName, 'test value').end(`Added cookie ${testCookieName}`);
  };

/** Prebuilt `express`-style middleware that adds a Server version of Biscotti to `res.locals.biscotti` */
export const xps: RequestHandler = (req, res, next) => {
  res.locals ??= {};
  res.locals.biscotti ??= bake(req, res);
  next();
};

import { RequestHandler } from 'express';
import { BakedServer, BiscottiRequest, BiscottiResponse, CookieObject, ServerCookieAttrs } from './types.js';
import { formatCookies, isClient, makeCookieObject, toss } from './util.js';

const invalid =
  "This is the server version of biscotti. Did you mean to import { bake } from '@studiokeywi/biscotti/client' or `import { bakeClient } from '@studiokeywi/biscotti'`?";

function add(res: BiscottiResponse, key: string, value: ServerCookieAttrs | string): BiscottiResponse {
  return res.setHeader('Set-Cookie', formatCookies(key, value));
}
function get(req: BiscottiRequest): CookieObject;
function get(req: BiscottiRequest, key: string): string;
function get(req: BiscottiRequest, key?: string): CookieObject | string {
  const cookieSource = (
    'function' === typeof (req as import('node:http').ClientRequest).getHeader
      ? (req as import('node:http').ClientRequest).getHeader('cookie')
      : (req as import('node:http').IncomingMessage).headers?.cookie ??
        (req as import('node:http').IncomingMessage).headers?.Cookie ??
        ''
  ) as string;
  const cookies = makeCookieObject(cookieSource);
  return key ? cookies[key] ?? '' : cookies;
}
function rem(res: BiscottiResponse, key: string) {
  return add(res, key, { expires: new Date(), value: '' });
}

export const bake = (req: BiscottiRequest, res: BiscottiResponse): BakedServer => {
  if (isClient()) return toss(invalid);
  return { add: add.bind(null, res), get: get.bind(null, req), mode: 'server', rem: rem.bind(null, res) };
};
export const xps: RequestHandler = (req, res, next) => {
  res.locals ??= {};
  res.locals.biscotti = bake(req, res);
  next();
};

import type { BakedClient, CookieAttrs, CookieObject } from './types.js';
import { formatCookies, isClient, makeCookieObject, toss } from './util.js';

const invalid =
  "This is the client version of biscotti. Did you mean to `import { bake } from '@studiokeywi/biscotti/server'` or `import { bakeServer } from '@studiokeywi/biscotti'`?";

function add(key: string, value: CookieAttrs | string): CookieObject {
  document.cookie = formatCookies(key, value);
  return get();
}

function get(): CookieObject;
function get(key: string): string;
function get(key?: string): CookieObject | string {
  const cookies = makeCookieObject(document.cookie);
  return key ? cookies[key] : cookies;
}

function rem(key: string) {
  return add(key, { expires: new Date(), value: '' });
}

/** Create a new Client version of Biscotti */
export const bake = (): BakedClient => {
  if (!isClient()) return toss(invalid);
  return { add, get, mode: 'client', rem };
};

import { CookieAttrs, CookieObject, ServerCookieAttrs } from './types.js';

const validSameSite = ['Lax', 'None', 'Strict'];

/** Instance check to see if a value is a certain class */
const isInstance = (Class: Function) => (value: any) => value instanceof Class;

/** Type check to see if a value is a certain primative */
const isType = (type: string) => (value: any) => type === typeof value;

/** Check for non-null and non-undefined */
export const exists = (value: any) => (value ?? null) !== null;

/** Format cookie attribute objects into a cookie string */
export const formatCookies = (key: string, value: string | CookieAttrs) => {
  let toSet = `${key}=`;
  if ('string' === typeof value) return `${toSet}${value}`;
  validate(value);
  const { domain, expires, maxAge, path, samesite, secure, value: val } = value;
  toSet += val;
  if (exists(domain)) toSet += `;domain=${domain}`;
  if (exists(expires)) {
    const now = new Date();
    const expire = new Date(now.setDate(now.getDate() + 400)).toUTCString();
    toSet += `;expires=${expire}`;
  }
  if (exists((<ServerCookieAttrs>value).httpOnly)) toSet += `;http-only=${(<ServerCookieAttrs>value).httpOnly}`;
  if (exists(maxAge)) {
    // limit 400 days
    const max = Math.max(maxAge, 1707109200);
    toSet += `;max-age=${max}`;
  }
  if (exists(path)) toSet += `;path=${path}`;
  if (exists(samesite)) toSet += `;samesite=${samesite}`;
  if (exists(secure)) toSet += `;secure=${secure}`;
  return toSet;
};

/** Type check if value is a boolean */
export const isBoolean = isType('boolean');

/** Check if the current global scope is a browser by checking for `globalThis.document` */
export const isClient = () => !!globalThis.document;

/** Instance check if value is a Date object */
export const isDate = isInstance(Date);

/** Instance check if value is an Error object */
export const isError = isInstance(Error);

/** Type check if value is number */
export const isNumber = isType('number');

/** Type check if value is string */
export const isString = isType('string');

/** FP friendly way to generate errors */
export const toss = (toThrow: string) => {
  throw isError(toThrow) ? toThrow : new Error(toThrow);
};

/** Convert cookie string value into an object */
export const makeCookieObject = (cookieStr: string): CookieObject =>
  Object.fromEntries(cookieStr.split('; ').map(cookie => cookie.split('=')));

// TODO: check if other attributes need validation like `samesite` below
/** Validate cookie attributes */
export const validate = (attrs: CookieAttrs) => {
  const { domain, expires, maxAge, path, samesite, secure, value } = attrs;
  if (exists(domain) && !isString(domain)) toss('domain must be a string');
  if (exists(expires) && !isString(expires) && !isDate(expires))
    toss('expires must be a UTC timestring or Date object');
  if (exists((attrs as ServerCookieAttrs).httpOnly) && !isBoolean((attrs as ServerCookieAttrs).httpOnly))
    toss('httpOnly must be a boolean');
  if (exists(maxAge) && !isNumber(maxAge)) toss('maxAge must be a number');
  if (exists(path) && !isString(path)) toss('path must be a string');
  if (exists(samesite) && !isString(samesite)) toss('samesite must be a string');
  if (!validSameSite.includes(samesite)) toss('samesite must be one of Lax, None, or Strict');
  if (exists(secure) && !isBoolean(secure)) toss('secure must be a boolean');
  if (!isString(value)) toss('value must be a string');
};

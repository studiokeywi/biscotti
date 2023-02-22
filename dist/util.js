const validSameSite = ["Lax", "None", "Strict"];
const isInstance = (Class) => (value) => value instanceof Class;
const isType = (type) => (value) => type === typeof value;
const exists = (value) => (value ?? null) !== null;
const formatCookies = (key, value) => {
  let toSet = `${key}=`;
  if ("string" === typeof value)
    return `${toSet}${value}`;
  validate(value);
  const { domain, expires, maxAge, path, samesite, secure, value: val } = value;
  toSet += val;
  if (exists(domain))
    toSet += `;domain=${domain}`;
  if (exists(expires)) {
    const now = /* @__PURE__ */ new Date();
    const expire = new Date(now.setDate(now.getDate() + 400)).toUTCString();
    toSet += `;expires=${expire}`;
  }
  if (exists(value.httpOnly))
    toSet += `;http-only=${value.httpOnly}`;
  if (exists(maxAge)) {
    const max = Math.max(maxAge, 1707109200);
    toSet += `;max-age=${max}`;
  }
  if (exists(path))
    toSet += `;path=${path}`;
  if (exists(samesite))
    toSet += `;samesite=${samesite}`;
  if (exists(secure))
    toSet += `;secure=${secure}`;
  return toSet;
};
const isBoolean = isType("boolean");
const isClient = () => !!globalThis.document;
const isDate = isInstance(Date);
const isError = isInstance(Error);
const isNumber = isType("number");
const isString = isType("string");
const toss = (toThrow) => {
  throw isError(toThrow) ? toThrow : new Error(toThrow);
};
const makeCookieObject = (cookieStr) => Object.fromEntries(cookieStr.split("; ").map((cookie) => cookie.split("=")));
const validate = (attrs) => {
  const { domain, expires, maxAge, path, samesite, secure, value } = attrs;
  if (exists(domain) && !isString(domain))
    toss("domain must be a string");
  if (exists(expires) && !isString(expires) && !isDate(expires))
    toss("expires must be a UTC timestring or Date object");
  if (exists(attrs.httpOnly) && !isBoolean(attrs.httpOnly))
    toss("httpOnly must be a boolean");
  if (exists(maxAge) && !isNumber(maxAge))
    toss("maxAge must be a number");
  if (exists(path) && !isString(path))
    toss("path must be a string");
  if (exists(samesite) && !isString(samesite))
    toss("samesite must be a string");
  if (!validSameSite.includes(samesite))
    toss("samesite must be one of Lax, None, or Strict");
  if (exists(secure) && !isBoolean(secure))
    toss("secure must be a boolean");
  if (!isString(value))
    toss("value must be a string");
};
export {
  exists,
  formatCookies,
  isBoolean,
  isClient,
  isDate,
  isError,
  isNumber,
  isString,
  makeCookieObject,
  toss,
  validate
};
//# sourceMappingURL=util.js.map

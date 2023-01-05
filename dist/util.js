const isInstance = (Class) => (value) => value instanceof Class;
const isType = (type) => (value) => type === typeof value;
export const exists = (value) => (value ?? null) !== null;
export const formatCookies = (key, value) => {
    let toSet = `${key}=`;
    if ('string' === typeof value)
        return `${toSet}${value}`;
    validate(value);
    const { domain, expires, maxAge, path, samesite, secure, value: val } = value;
    toSet += val;
    if (exists(domain))
        toSet += `;domain=${domain}`;
    if (exists(expires)) {
        const expire = expires instanceof Date ? expires.toUTCString() : expires;
        toSet += `;expires=${expire}`;
    }
    if (exists(value.httpOnly))
        toSet += `;http-only=${value.httpOnly}`;
    if (exists(maxAge))
        toSet += `;max-age=${maxAge}`;
    if (exists(path))
        toSet += `;path=${path}`;
    if (exists(samesite))
        toSet += `;samesite=${samesite}`;
    if (exists(secure))
        toSet += `;secure=${secure}`;
    return toSet;
};
export const isBoolean = isType('boolean');
export const isClient = () => !!globalThis.document;
export const isDate = isInstance(Date);
export const isError = isInstance(Error);
export const isNumber = isType('number');
export const isString = isType('string');
export const toss = (toThrow) => {
    throw isError(toThrow) ? toThrow : new Error(toThrow);
};
export const makeCookieObject = (cookieStr) => Object.fromEntries(cookieStr.split('; ').map(cookie => cookie.split('=')));
export const validate = (attrs) => {
    const { domain, expires, maxAge, path, samesite, secure, value } = attrs;
    if (exists(domain) && !isString(domain))
        toss('domain must be a string');
    if (exists(expires) && !isString(expires) && !isDate(expires))
        toss('expires must be a UTC timestring or Date object');
    if (exists(attrs.httpOnly) && !isBoolean(attrs.httpOnly))
        toss('httpOnly must be a boolean');
    if (exists(maxAge) && !isNumber(maxAge))
        toss('maxAge must be a number');
    if (exists(path) && !isString(path))
        toss('path must be a string');
    if (exists(samesite) && !isString(samesite))
        toss('samesite must be a string');
    if (exists(secure) && !isBoolean(secure))
        toss('secure must be a boolean');
    if (!isString(value))
        toss('value must be a string');
};
//# sourceMappingURL=util.js.map
import { formatCookies, isClient, makeCookieObject, toss } from './util.js';
const invalid = "This is the server version of biscotti. Did you mean to import { bake } from '@studiokeywi/biscotti/client' or `import { bakeClient } from '@studiokeywi/biscotti'`?";
function add(res, key, value) {
    return res.setHeader('Set-Cookie', formatCookies(key, value));
}
function get(req, key) {
    const cookieSource = ('function' === typeof req.getHeader
        ? req.getHeader('cookie')
        : req.headers?.cookie ??
            req.headers?.Cookie ??
            '');
    const cookies = makeCookieObject(cookieSource);
    return key ? cookies[key] ?? '' : cookies;
}
function rem(res, key) {
    return add(res, key, { expires: new Date(), value: '' });
}
export const bake = (req, res) => {
    if (isClient())
        return toss(invalid);
    return { add: add.bind(null, res), get: get.bind(null, req), mode: 'server', rem: rem.bind(null, res) };
};
export const xps = (req, res, next) => {
    res.locals ?? (res.locals = {});
    res.locals.biscotti = bake(req, res);
    next();
};
//# sourceMappingURL=server.js.map
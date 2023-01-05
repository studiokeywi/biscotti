import { formatCookies, isClient, makeCookieObject, toss } from './util.js';
const invalid = "This is the client version of biscotti. Did you mean to `import { bake } from '@studiokeywi/biscotti/server'` or `import { bakeServer } from '@studiokeywi/biscotti'`?";
function add(key, value) {
    document.cookie = formatCookies(key, value);
    return get();
}
function get(key) {
    const cookies = makeCookieObject(document.cookie);
    return key ? cookies[key] : cookies;
}
function rem(key) {
    return add(key, { expires: new Date(), value: '' });
}
export const bake = () => {
    if (!isClient())
        return toss(invalid);
    return { add, get, mode: 'client', rem };
};
//# sourceMappingURL=client.js.map
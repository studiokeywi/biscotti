import { formatCookies, isClient, makeCookieObject, toss } from "./util.js";
const invalid = "This is the server version of biscotti. Did you mean to import { bake } from '@studiokeywi/biscotti/client' or `import { bakeClient } from '@studiokeywi/biscotti'`?";
function add(res, key, value) {
  return res.setHeader("Set-Cookie", formatCookies(key, value));
}
function get(req, key) {
  const cookieSource = req?.getHeader?.("cookie") ?? req.headers?.cookie ?? req.headers?.Cookie ?? "";
  const cookies = makeCookieObject(cookieSource);
  return key ? cookies[key] ?? "" : cookies;
}
function rem(res, key) {
  return add(res, key, { expires: /* @__PURE__ */ new Date(), value: "" });
}
const bake = (req, res) => {
  if (isClient())
    return toss(invalid);
  return { add: add.bind(null, res), get: get.bind(null, req), mode: "server", rem: rem.bind(null, res) };
};
const testXPS = (testCookieName) => (req, res) => {
  const { biscotti } = res.locals;
  if (biscotti.get(testCookieName))
    return biscotti.rem(testCookieName).end(`Removed cookie ${testCookieName}`);
  biscotti.add(testCookieName, "test value").end(`Added cookie ${testCookieName}`);
};
const xps = (req, res, next) => {
  var _a;
  res.locals ?? (res.locals = {});
  (_a = res.locals).biscotti ?? (_a.biscotti = bake(req, res));
  next();
};
export {
  bake,
  testXPS,
  xps
};
//# sourceMappingURL=server.js.map

import { bake as bakeClient } from "./client.js";
import { bake as bakeServer } from "./server.js";
import { isClient } from "./util.js";
function bake(req, res) {
  return isClient() ? bakeClient() : bakeServer(req, res);
}
export {
  bakeClient,
  bakeServer,
  bake as default
};
//# sourceMappingURL=index.js.map

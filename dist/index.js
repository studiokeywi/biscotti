import { bake as bakeClient } from './client.js';
import { bake as bakeServer } from './server.js';
import { isClient } from './util.js';
export default function bake(req, res) {
    return isClient() ? bakeClient() : bakeServer(req, res);
}
export { bakeClient, bakeServer };
//# sourceMappingURL=index.js.map
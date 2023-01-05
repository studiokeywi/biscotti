import { bake as bakeClient } from './client.js';
import { bake as bakeServer } from './server.js';
import { BakedClient, BakedServer, Biscotti, BiscottiRequest, BiscottiResponse } from './types.js';
import { isClient } from './util.js';

export default function bake(): BakedClient;
export default function bake(req: BiscottiRequest, res: BiscottiResponse): BakedServer;
export default function bake(req?: BiscottiRequest, res?: BiscottiResponse): Biscotti {
  return isClient() ? bakeClient() : bakeServer(req, res);
}

export { bakeClient, bakeServer };

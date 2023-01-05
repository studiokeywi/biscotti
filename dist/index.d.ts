import { bake as bakeClient } from './client.js';
import { bake as bakeServer } from './server.js';
import { BakedClient, BakedServer, BiscottiRequest, BiscottiResponse } from './types.js';
export default function bake(): BakedClient;
export default function bake(req: BiscottiRequest, res: BiscottiResponse): BakedServer;
export { bakeClient, bakeServer };

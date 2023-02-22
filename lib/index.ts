import { bake as bakeClient } from './client.js';
import { bake as bakeServer } from './server.js';
import type {
  BakedClient,
  BakedServer,
  Biscotti,
  BiscottiRequest,
  BiscottiResponse,
  CookieAttrs,
  CookieObject,
  ServerCookieAttrs,
} from './types.js';
import { isClient } from './util.js';

/** Create a new Client version of Biscotti */
export default function bake(): BakedClient;
/** Create a new Server version of Biscotti */
export default function bake(req: BiscottiRequest, res: BiscottiResponse): BakedServer;
/** Create a new Biscotti instance */
export default function bake(req?: BiscottiRequest, res?: BiscottiResponse): Biscotti {
  return isClient() ? bakeClient() : bakeServer(req, res);
}

export { bakeClient, bakeServer };

export type {
  BakedClient,
  BakedServer,
  Biscotti,
  BiscottiRequest,
  BiscottiResponse,
  CookieAttrs,
  CookieObject,
  ServerCookieAttrs,
};

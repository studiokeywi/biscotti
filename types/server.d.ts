import { type RequestHandler } from 'express';
import type { BakedServer, BiscottiRequest, BiscottiResponse } from './types.js';
/** Create a new Server version of Biscotti */
export declare const bake: (req: BiscottiRequest, res: BiscottiResponse) => BakedServer;
/** Create a test middleware that performs a simple toggle of adding and removing a cookie */
export declare const testXPS: (testCookieName: string) => RequestHandler;
/** Prebuilt `express`-style middleware that adds a Server version of Biscotti to `res.locals.biscotti` */
export declare const xps: RequestHandler;

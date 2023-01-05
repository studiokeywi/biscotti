import { RequestHandler } from 'express';
import { BakedServer, BiscottiRequest, BiscottiResponse } from './types.js';
export declare const bake: (req: BiscottiRequest, res: BiscottiResponse) => BakedServer;
export declare const xps: RequestHandler;

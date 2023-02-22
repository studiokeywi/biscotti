# biscotti

Cookie making the studioKeywi way

## Getting Started

```shell
npm i @studiokeywi/biscotti
```

## Usage

`Biscotti` features a minimalist API. There are variants for client and server side usage. You can import `Biscotti` and let it assume which version you need, or specify the import for your project:

```typescript
import bake from '@studiokeywi/biscotti';
// or for client side
import { bake } from '@studiokeywi/biscotti/client';
// or for server side
import { bake } from '@studiokeywi/biscotti/server';
```

The types below are shared or used between versions of `Biscotti`:

```typescript
/** Valid cookie attributes */
interface CookieAttrs {
  /** Which hosts can receive a cookie */
  domain?: string;
  /** A date to delete the cookie */
  expires?: Date | string;
  /** A time period for the cookie to exist */
  maxAge?: number;
  /** A URL path that must exist in the requested URL */
  path?: string;
  /** Specify whether/when cookies are sent with cross-site requests */
  samesite?: string;
  /** Whether to only send cookie via HTTPS requests */
  secure?: boolean;
  /** Value of the cookie */
  value: string;
}

/** Cookie represented as an object mapping cookie names to values */
type CookieObject = Record<string, string>;

/** Valid cookie attributes for server-side cookies */
interface ServerCookieAttrs extends CookieAttrs {
  /** Whether the cookie is available to `document.cookie` */
  httpOnly?: boolean;
}
```

### Client

The client version of `Biscotti` features the following API:

```typescript
/** Client version of Biscotti */
interface BakedClient extends Biscotti {
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: CookieAttrs): CookieObject;
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: string): CookieObject;

  /** Get all current cookies */
  get(): CookieObject;
  /** Get a cookie's value */
  get(key: string): string;

  /** Flavor of Biscotti */
  mode: 'client';

  /** Remove a cookie */
  rem(key: string): CookieObject;
}
```

### Server

The server version of `Biscotti` features the following API:

```typescript
/** Server version of Biscotti */
interface BakedServer extends Biscotti {
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: ServerCookieAttrs): BiscottiResponse;
  /** Add a new cookie/change a current cookie's value */
  add(key: string, value: string): BiscottiResponse;

  /** Get all current cookies */
  get(): CookieObject;
  /** Get a cookie's value */
  get(key: string): string;

  /** Flavor of Biscotti */
  mode: 'server';

  /** Remove a cookie */
  rem(key: string): BiscottiResponse;
}
```

The server version of `Biscotti` also exports the following for quick use with `express` or any other library that utilizes a similar middleware system:

```typescript
/** Create a test middleware that performs a simple toggle of adding and removing a cookie */
export declare const testXPS: (testCookieName: string) => RequestHandler;

/** Prebuilt `express`-style middleware that adds a Server version of Biscotti to `res.locals.biscotti` */
export declare const xps: RequestHandler;
```

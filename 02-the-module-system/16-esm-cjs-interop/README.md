# 16-esm-cjs-interop

This sample demonstrates some ESM and CommonJS differences and ways to make the two systems work together.

This folder contains multiple examples:

 - `node filename.js` shows how to re-implement `__filename` and `__dirname` with ESM
 - `node import-json.js` shows how to import JSON modules with ESM
 - `node require.js` shows how to import CommonJS modules in ESM using `module.createRequire`
 - `node this.js` shows that `this` is `undefined` in ESM

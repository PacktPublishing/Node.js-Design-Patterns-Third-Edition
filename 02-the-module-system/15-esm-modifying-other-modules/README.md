# 15-esm-modifying-other-modules

This sample demonstrates how an ESM module can be use to alter another module.

## Run

```bash
node main.js
```

## Extras

- `mock-read-file-wrong.js` has a wrong implementation of the mocking mechanism
- `main-wrong.js` has a wrong implementation of the main file where we end up importing the live bindings and not the actual mock function.
- `example-sync.js` shows how use the `syncBuiltinESMExports` functionality
- `mock-read-file-sync.js` fixes all the problems above by using `syncBuiltinESMExports`
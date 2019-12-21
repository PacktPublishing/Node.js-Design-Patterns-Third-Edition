# 14-esm-modifying-other-modules

This sample demonstrates how an ESM module can be use to alter another module.

## Run

```bash
node main.js
```

## Extras

- `mock-read-file-wrong.js` has a wrong implementation of the mocking mechanism
- `main-wrong.js` has a wrong implementation of the main file where we end up importing the live bindings and not the actual mock function.
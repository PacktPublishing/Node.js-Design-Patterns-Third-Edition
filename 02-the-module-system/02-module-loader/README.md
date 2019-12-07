# 02-module-loader

This sample demonstrate how to build a custom module system, which is 
partially compatible with Node.js's CommonJS module system.

## Run

To try it, run the loader and provide it with a module name, as you were requiring
it from inside a module, for example:

```bash
node loader.js ./main
```

The command above will instrument our homemade module loader
to use `main.js` as entry point. From that point on, all the modules
loaded will use our homemade version of `require` instead of the
default one.

File description: 
- `loader.js`:  the homemade module loader
- `main.js` the entry point of the application
- `moduleA.js`, `moduleB.js` two modules to illustrates the functionality of our `require`

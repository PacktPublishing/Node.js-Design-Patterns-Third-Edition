# 01-webpack-intro

This example demostrates how to use Webpack and how to share a simple module between the browser and the server

## Dependencies

Install all the necessary dependencies with:

```bash
npm install
```

## Run

To run the example server side:

```bash
node src/server.js
```

To run the example in the browser (interactively):

```bash
npm start # or node_modules/.bin/webpack-dev-server --config webpack.config.cjs
```

Alternatively, you can build a static version of the frontend app with:

```bash
npm run build # or node_modules/.bin/webpack --config webpack.config.cjs
```

Then you can open the file `dist/index.html` with your favorite browser.

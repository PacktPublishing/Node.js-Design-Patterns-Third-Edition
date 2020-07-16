# 07-frontend-only-app

This example demostrates how to build the frontend app for our Universal JavaScript application.

## Dependencies

Install all the necessary dependencies with:

```bash
npm install
```

## Run

To run the example in the browser (interactively):

```bash
npm start # or node_modules/.bin/webpack-dev-server --config webpack.config.cjs
```

Alternatively, you can build a static version of the frontend app with:

```bash
npm run build # or node_modules/.bin/webpack --config webpack.config.cjs
```

Then you can run the built static frontend by running:

```bash
npx http-server public
```

And then pointing your favorite browser to http://localhost:8080.

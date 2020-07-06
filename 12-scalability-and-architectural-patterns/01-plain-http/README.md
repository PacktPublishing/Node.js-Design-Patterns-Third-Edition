# 01-plain-http

This example demostrates how to benchmark a simple http server


## Dependencies

Install all the necessary dependencies with:

```bash
npm install
```


## Run

To run the example server:

```bash
npm start # or `node app.js`
```

To run a benchmark (in another terminal):

```bash
npm run benchmark # or `npx autocannon -c 200 -d 10 http://localhost:8080`
```

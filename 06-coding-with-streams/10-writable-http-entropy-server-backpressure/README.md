# 10-writable-http-entropy-server-backpressure

This examples shows how to write into a writable stream, specifically an HTTP response sent by a server also taking back-pressure into account.


## Dependencies

Install all necessary dependencies with:

```bash
npm install
```


## Run

To run the server:

```bash
node entropy-server.js
```

Now you can make requests to the server by pointing your browser to [http://localhost:8080] or with curl as follows:

```bash
curl -i -vvv http://localhost:8080/
```

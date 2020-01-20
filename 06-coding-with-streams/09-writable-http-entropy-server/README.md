# 09-writable-http-entropy-server

This examples shows how to write into a readable stream, specifically an HTTP response sent by a server.


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

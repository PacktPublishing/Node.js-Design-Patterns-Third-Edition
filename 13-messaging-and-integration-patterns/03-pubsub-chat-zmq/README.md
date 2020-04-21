# 03-pubsub-chat-zmq

This sample demonstrates how to integrate different server instances of a chat application using ZeroMQ

## Run

To try the sample install the dependencies:

```shell script
npm install
```

Then run (in separate terminals):

```shell script
node index.js --http 8080 --pub 5000 --sub 5001 --sub 5002
node index.js --http 8081 --pub 5001 --sub 5000 --sub 5002
node index.js --http 8082 --pub 5002 --sub 5000 --sub 5001
```
  
You can try to access those three addresses at the same time, and
see how messages are exchanged from one instance to the others:

```
http://localhost:8080
http://localhost:8081
http://localhost:8082
```


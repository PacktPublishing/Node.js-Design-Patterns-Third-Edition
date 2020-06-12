# 06-task-distribution-zmq

This sample demonstrates how to run parallel tasks using a messaging pipeline and ZeroMQ

## Run

To try the sample, install its dependencies:

```shell script
npm install
```

Then run (in separate terminals):

```shell script
node worker.js
node worker.js
node collector.js
node producer.js 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b
```

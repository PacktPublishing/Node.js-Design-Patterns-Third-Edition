# 08-task-distribution-redis-streams

This sample demonstrates how to distribute tasks to a set of remote workers using Redis Streams.

## Run

As a pre-requisite to this sample, you first need to install [Redis](http://redis.io/download) and have it running locally on its default port.

To try the sample, install the dependencies:

```shell script
npm install
```

Then run (each line in a separate terminal):

```shell script
node worker.js workerA
node worker.js workerB
node collector.js
node producer.js 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b
```

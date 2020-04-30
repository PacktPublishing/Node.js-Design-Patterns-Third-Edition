# 07-task-distribution-amqp

This sample demonstrates how to distribute tasks to a set of remote workers using RabbitMQ and AMQP.

## Run

As a pre-requisite to this sample, you first need to [install RabbitMQ](http://www.rabbitmq.com/download.html)

To try the sample, install the dependencies:

```shell script
npm install
```

Then run (each line in a separate terminal):

```shell script
node worker.js
node worker.js
node collector.js
node producer.js 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b
```

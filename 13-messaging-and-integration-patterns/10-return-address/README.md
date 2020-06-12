# 10-return-address

This sample demonstrates how to implement a request/reply pattern with return address on top of AMQP.

## Run

As a pre-requisite to this sample, you first need to [install RabbitMQ](http://www.rabbitmq.com/download.html)

To try the sample install its dependencies first:

```shell script
npm install
```

Then run:

```shell script
node replier.js
node requestor.js
```

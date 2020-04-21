# 04-pubsub-amqp

This sample demonstrates how to integrate a chat application and a microservice using AMQP

## Run

As pre-requisite to this sample, you first need to [install RabbitMQ](http://www.rabbitmq.com/download.html)

To try the sample, install the dependencies:

```shell script
  npm install
```

Then run (in separate terminals):

```shell script
  node app 8080
  node app 8081
  node historySvc
```

You can try to access at the same time those addresses:

```
  http://localhost:8080
  http://localhost:8081
```

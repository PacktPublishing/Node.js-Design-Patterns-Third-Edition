# 04-pubsub-amqp

This sample demonstrates how to integrate a chat application and a microservice using AMQP

## Run

As pre-requisite to this sample, you first need to [install RabbitMQ](http://www.rabbitmq.com/download.html)

If you have docker installed, you can run an ephemeral instance of RabbitMQ with the following command:

```bash
docker run -it -p 5672:5672 --hostname my-rabbit rabbitmq:3
```

To try the sample, install the dependencies:

```bash
npm install
```

Then run (in separate terminals):

```bash
node index.js 8080
node index.js 8081
node historySvc.js
```

You can try to access at the same time those addresses:

```
http://localhost:8080
http://localhost:8081
```

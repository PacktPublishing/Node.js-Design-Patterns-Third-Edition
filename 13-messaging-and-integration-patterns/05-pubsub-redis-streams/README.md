# 05-pubsub-redis-streams

This sample demonstrates how to Redis streams to provide persistent message storage and real-time capabilities to a chat application

## Run

As a pre-requisite to this sample, you first need to install [Redis](http://redis.io/download) and have it running locally on its default port.

To try the sample, install the dependencies first:

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

# 05-pubsub-redis-streams

This sample demonstrates how to use Redis streams to provide persistent message storage and real-time capabilities to a chat application

## Run

As a pre-requisite to this sample, you first need to install [Redis](http://redis.io/download) and have it running locally on its default port.

If you have docker installed you can easily run an ephemeral redis instance locally with:

```bash
docker run -it -p 6379:6379 redis redis-server --appendonly yes
```

To try the sample, install the dependencies first:

```bash
npm install
```

Then run (in separate terminals):

```bash
node index.js 8080
node index.js 8081
```

You can try to access at the same time those addresses:

```
http://localhost:8080
http://localhost:8081
```

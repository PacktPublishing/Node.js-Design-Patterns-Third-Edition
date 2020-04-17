# 02-pubsub-chat-redis

This sample demonstrates how to integrate different server instances of a chat application using Redis as message broker

## Run

As a pre-requisite to this sample, you first need to install [Redis](http://redis.io/download)

To run the sample, install all dependencies with:
 
```shell script
npm install
``` 

Then run (in two separate terminals):

```shell script
  node app 8081
  node app 8082
```
  
To access the application open a browser tab at the address:

```
  http://localhost:8081
```

Then, at the same time open another browser tab at the following address:

```
  http://localhost:8082
```

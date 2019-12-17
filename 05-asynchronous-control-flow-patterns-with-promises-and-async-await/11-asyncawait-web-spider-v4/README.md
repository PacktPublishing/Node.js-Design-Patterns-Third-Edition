# 11-asyncawait-web-spider-v4

Web spider example to demostrate limited parallel asynchronous execution 
with async/await and the consumer-producer pattern

## Run

Install the necessary dependencies with `npm install` and then run:

```bash
node spider-cli.js https://example.com
```

You can optionally specify the maximum depth of crawling in the second parameter and the maximum concurrency in the third:

```bash
node spider-cli.js https://example.com 5 2
```

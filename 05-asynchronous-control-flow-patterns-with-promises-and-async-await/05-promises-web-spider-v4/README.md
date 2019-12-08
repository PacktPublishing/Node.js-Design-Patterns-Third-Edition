# 05-promises-web-spider-v4

Web spider example to demostrate limited parallel asynchronous execution with Promises

## Run

Install the necessary dependencies with `npm install` and then run:

```bash
node spider-cli.js https://example.com
```

You can optionally specify the maximum depth of crawling by passing a second parameter:

```bash
node spider-cli.js https://example.com 5

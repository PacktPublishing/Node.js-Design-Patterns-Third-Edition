# 11-web-spider-v4

Web spider example to demonstrate limited parallel concurrency using queues

## Run

Install the necessary dependencies with `npm install` and then run:

```bash
node spider-cli.js https://loige.co
```

You can optionally specify the maximum depth of crawling by passing a second parameter:

```bash
node spider-cli.js https://loige.co 5
```

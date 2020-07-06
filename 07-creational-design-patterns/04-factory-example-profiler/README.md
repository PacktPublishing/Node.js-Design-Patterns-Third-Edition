# 04-factory-example-profiler

This example shows how to use the factory pattern that creates different objects depending on the value of the NODE_ENV environment variable.

## Run

To run the example launch:

```bash
# Launch in development mode (with profiler)
node index.js 2201307499

# Launch in production mode (without profiler)
NODE_ENV=production node index.js 2201307499
```


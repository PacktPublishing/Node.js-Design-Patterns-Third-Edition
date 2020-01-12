# 06-readable-async-iterator

This examples shows how to consume a readable stream using the async iterator interface.

## Run

To run the example you can use:

```bash
node read-stdin.js
```

Now write in the standard input and use `ctrl+d` (unix) or `ctrl+z` (windows) to end the input stream.

Alternatively:

```bash
cat <path_of_file> | node read-stdin.js
```

to consume an arbitrary file.

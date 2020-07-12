# 17-pipeline-helper

This examples shows how to create a complicate pipeline using `stream.pipeline()`.


## Run

To run the example:

```bash
echo 'Hello World!' | gzip | node uppercasify-gzipped.js | gunzip
```

If you want to make the stream fail you could simply remove the `gzip` step:

```bash
echo 'Hello World!' | gzip | node uppercasify-gzipped.js
```

You can also look at the file `uppercasify-gzipped-promise.js` for an example on how to promisify the `pipeline()` helper.

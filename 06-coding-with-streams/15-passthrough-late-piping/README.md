# 15-passthrough-late-piping

This examples shows how to create and use a PassThrough stream for late writing into a third party API accepting content from a stream. This is implemented here through a web server that can receive files and store them locally.


## Dependencies

Install all necessary dependencies with:

```bash
npm install
```


## Run

To run the example you have to start the server first:

```bash
node server.js
```

Then, in another terminal window you can run:

```bash
node upload-cli.js <path-to-file-to-upload>
```

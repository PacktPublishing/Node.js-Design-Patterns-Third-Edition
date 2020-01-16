# 02-gzip-server

This examples shows how to implement a server that cand receive compressed files and save them uncompressed on disk. The example also implements a client that reads uncompressed files and sends them compressed to the server. All code uses streaming interfaces.

## Run

To run the server you need to launch:

```bash
node gzip-receive.js
```

Than you can send any file with:

```bash
node gzip-send.js <path_of_the_file_to_send> localhost
```

The received files will be saved in the folder `received_files`
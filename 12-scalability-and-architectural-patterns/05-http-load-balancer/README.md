# 05-http-load-balancer

This example demostrates how to run a set of Node.js servers behind a load balancer


## Dependencies

Install all the necessary dependencies with:

```bash
npm install
```

You will also need to install nginx locally using the [instructions for your system](https://nodejsdp.link/nginx-install), or by running:

```bash
sudo apt-get install nginx # on debian / ubuntu based systems
# or
brew install nginx # on mac with brew installed
```


## Run

To run 4 instances of the example server using `forever`:

```bash
npm start # or `node_modules/.bin/forever start app.js 8081 && node_modules/.bin/forever start app.js 8082 && node_modules/.bin/forever start app.js 8083 && node_modules/.bin/forever start app.js 8084`
```


Now run nginx with:

```bash
npm run start:nginx # or `nginx -c ${PWD}/nginx.conf`
```

**Note**: On some systems, the command above might fail because of permission issues. If you can't figure out how to set the right permissions for your system, you could try to run the command as admin (`sudo npm run start:nginx`).

To run a benchmark (in another terminal):

```bash
npm run benchmark # or `npx autocannon -c 200 -d 10 http://localhost:8080`
```

You can stop nginx with ctrl+c in the terminal.

To stop all the Node.js servers use:

```bash
npm run stop # or `node_modules/.bin/forever stopall`
```

# 06-http-dynamic-load-balancer

This example demostrates how to implement a dynamic load balancer in Node.js using consul as a service discovery mechanism.

## Dependencies

Install all the necessary dependencies with:

```bash
npm install
```

You will also need to install consul following the [instructions for your system](https://nodejsdp.link/consul-install), or by running:

```bash
sudo apt-get install consul # on debian / ubuntu based systems
# or
brew install consul # on mac with brew installed
```


## Run

Run consul with:

```bash
npm run start:consul # or `consul agent -dev`
```

Once this is started, you can access consul web ui at http://localhost:8500/.

To run some applications:

```bash
npm run start:apps # or `forever start -f --killSignal=SIGINT app.js api-service && forever start -f --killSignal=SIGINT app.js api-service && forever start -f --killSignal=SIGINT app.js webapp-service`
```

To run the load balancer:

```bash
npm run start:loadBalancer # or `node_modules/.bin/forever start loadBalancer.js`
```

Now you can finally access the application at http://localhost:8080.

Try http://localhost:8080/api or simply http://localhost:8080/ to access the different apps.


To run a benchmark:

```bash
npm run benchmark # or `npx autocannon -c 200 -d 10 http://localhost:8080`
```

You can stop consul with ctrl+c in the terminal where consul is running.

To stop all the Node.js services use:

```bash
npm run stop # or `node_modules/.bin/forever stopall`
```

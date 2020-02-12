# 02-state-failsafe-socket

This sample demonstrates how to use the State pattern to create a client socket that doesn't break when it loses connection with the server.

## Run

Install the necessary dependencies with `npm install` and then open two different terminal windows.
In the first terminal window type:
```
node server.js
```

In the second window type:
```
node client
```

You can try to shutdown (`ctrl+c`) and restart the server several times to see the state in the client changing from online to offline and then back to online when the server is restarted.


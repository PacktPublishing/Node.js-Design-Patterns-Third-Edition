# 08-scaling-an-app-on-kubernetes

This examples demonstrates how to deploy and scale a simple Node.js webserver on Kubernetes (using minikube)

## Requirements

Install [docker](https://docs.docker.com/get-docker/) and [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)


Once minikube is initialized (`minikube start`), on mac and linux, make sure to run `eval $(minikube docker-env)` to connect the docker daemon to the minikube virtual machine.

## Run

### 1. Build the image

Build the docker image with:

```bash
docker build -t hello-web:v1 .
```

### 2. Add the app to the kubernetes cluster

Start the minikube kubernetes dashboard to see how you local cluster changes with the various interactions we are going to perform:

```bash
minikube dashboard
```

Now, add the app to the kubernetes cluster with:

```bash
kubectl create deployment hello-web --image=hello-web:v1
```

To be able to access the application from your laptop you need to expose it:

```bash
kubectl expose deployment hello-web --type=LoadBalancer --port=8080
minikube service hello-web
```

### 3. Scale the number of instances

Now let's scale the application to 5 instances:

```bash
kubectl scale --replicas=5 deployment hello-web
```

Try to make few requests, you should see that the response will provide different hostnames.

### 4. Update the image

Now let's make some changes to our app and deploy a new version.

Change `version` to `2` in `app.js` and rebuild a new image version with:

```bash
docker build -t hello-web:v2 .
```

update the deployment:

```bash
kubectl set image deployment/hello-web hello-web=hello-web:v2 --record
```

Wait few seconds and make some new requests. You should now see v2.


### Cleanup

Reduce all the pods to 0 (stop the app):

```bash
kubectl scale --replicas=0 deployment hello-web
```

Delete the deployment:

```bash
kubectl delete -n default deployment hello-web
```

Delete the service:

```bash
kubectl delete -n default service hello-web
```

You can finally stop minikube by running:

```bash
minikube stop
```
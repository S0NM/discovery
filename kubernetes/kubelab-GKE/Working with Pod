
# Quick Kubernetes Demo

### References
[Codelabs from Google](https://codelabs.developers.google.com/codelabs/k8s-kickstart/#7)
### Prerequisite
* Working directory: **orchestrate-with-kubernetes\kubernetes**

### Let's go!
**Step 1:** Create Monolith Pod
```sh
#Create pods
kubectl create -f pods/monolith.yaml

#Show running log
kubectl logs monolith

#Create port forwarding
kubectl port-forward monolith 10080:80
#Output
#Forwarding from 127.0.0.1:10080 -> 80
#Forwarding from [::1]:10080 -> 80
#Handling connection for 10080
```
**Step 2:** Working with OAuth Token
```sh
#Get Token
curl http://127.0.0.1:10080/login -u user:password
#Output
#{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE1MTQ2MjkzMjAsImlhdCI6MTUxNDM3MDEyMCwiaXNzIjoiYXV0aC5zZXJ2aWNlIiwic3ViIjoidXNlciJ9.MfzwHunHivVWf6egNz_1aj-Iu-c8uOI-vAqy1D_XmzI"}

#Set TOKEN 
$set TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE1MTQ2MjkzMjAsImlhdCI6MTUxNDM3MDEyMCwiaXNzIjoiYXV0aC5zZXJ2aWNlIiwic3ViIjoidXNlciJ9.MfzwHunHivVWf6egNz_1aj-Iu-c8uOI-vAqy1D_XmzI

#Use TOKEN to invoke service
$curl -H "Authorization: Bearer %TOKEN%" http://127.0.0.1:10080/secure
#Output
#{"message":"Hello"}

$kubectl logs -f monolith
#Output
#2017/12/27 10:10:50 Starting server...
#.......
#127.0.0.1:53838 - - [Wed, 27 Dec 2017 10:26:51 UTC] "GET /secure HTTP/1.1" curl/7.50.3
#127.0.0.1:53856 - - [Wed, 27 Dec 2017 10:27:02 UTC] "GET /secure HTTP/1.1" curl/7.50.3

#Run an interactive shell inside the monolith Pod
# -i: keep and pass stdin to the container
# -t: stdin is a TTY
$kubectl exec monolith -itc monolith /bin/sh
```

**Step 3:** Creating Pods with Liveness and Readiness Probes and Troubleshoot failing readiness and liveness probes
Kubernetes supports monitoring applications in the form of readiness and liveness probes. Health checks can be performed on each container in a Pod:
* Readiness probes indicate when a Pod is "ready" to serve traffic> Pods will not be marked ready until the readiness probe returns an HTTP 200 response
* Liveness probes indicate a container is "alive"

```sh
$kubectl create -f pods/healthy-monolith.yaml

#View details for the health-monolith Pod
$kubectl describe pod healthy-monolith
$kubectl port-forward healthy-monolith 10081:81

#Force the monolith container readiness probe to fail
$curl http://127.0.0.1:10081/readiness/status

#Get status of healthy-monolith pod
$kubectl get pods healthy-monolith -w
#Output after 15s
NAME               READY     STATUS    RESTARTS   AGE
healthy-monolith   0/1       Running   1          16h
healthy-monolith   1/1       Running   1         16h
healthy-monolith   0/1       Running   1         16h

#Force the monolith container liveness probe to fail
$curl http://127.0.0.1:10081/healthz/status
#Get status of healthy-monolith pod
$kubectl get pods healthy-monolith -w
#Output after 15s
NAME               READY     STATUS    RESTARTS   AGE
healthy-monolith   1/1       Running   1          16h
healthy-monolith   0/1       Running   2         16h
healthy-monolith   1/1       Running   2         16h

```













# Minikube Tutorial

**Start Minikube**
```sh
#Check version
$minikube version
$minikube start --vm-driver=virtualbox
$minikube status
$minikube stop
```

**Cluster Information**
```sh
#Look at connection details
$kubectl config view
#Get cluster-info
$kubectl cluster-info
#View the nodes in the cluster
$kubectl get nodes
```

**Dashboard**
```sh
#Open a new tab to show dashboard on browser
$minikube dashboard
#Access Dashboard by using local proxy http://127.0.0.1:8001/ui
$kubectl proxy
#Test proxy by using curl
$curl http://localhost:8001/
```

**Deployment**
```sh
#Deploy containers on to the cluster
$kubectl run first-deployment --image=katacoda/docker-http-server --port=80
#Get the status of the deployment
$kubectl get pods
#Expose port (Kubernetes provides a dynamic port to a container
$kubectl exose deployment first-deployment --port=80 --type=NodePort
#Get service infromation as json format
$kubectl get svc first-deployment -o json
#Get service Port
$export PORT=$(kubectl get svc first-deployment -o go-template='{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}')
```

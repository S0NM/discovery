# Minikube Tutorial

**Start Minikube**
```sh
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
```

**Dashboard**
```sh
#Open a new tab to show dashboard on browser
$minikube dashboard
#Access Dashboard by using local proxy http://127.0.0.1:8001/ui
$kubectl proxy
```

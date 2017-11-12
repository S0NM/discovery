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

================== TUTORIAL 2======================
##Using Kubeadm to bootstrap a Kubernetes cluster
**Initialise Master**
```sh
#Initialise the cluster with a known token
$kubeadm init --token=102952.1a7dd4cc8d1f4cc5 --kubernetes-version v1.8.0
#Additional nodes can join the cluster as long as thay have the correct token. View the token by using this command:
$kubeadm token list
#To join the cluster
$kubeadm join --token=102952.1a7dd4cc8d1f4cc5 172.17.0.9:6443
```
**Init configuration for kubectl to interact with cluster**
```sh
#Save configuration to KUBECONFIG
export KUBECONFIG=$HOME/admin.conf
```
**Deploy Container Networking Interface (CNI)**
In this scenario, we'll use WeaveWork, but in practical Calico is being used instead [link](https://kubernetes.io/docs/concepts/cluster-administration/addons/)
```sh
#view configuration
$cat /opt/weave-kube
#Apply depoyment
$kubectl apply -f /opt/weave-kube
#Weave will now deploy as a series of Pods on the cluster. Show the status:
$kubectl get pod -n kube-system
```





















































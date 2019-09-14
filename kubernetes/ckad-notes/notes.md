# CKAD Notes

Skeleton of any kubernetes yaml

```yaml
apiVersion:
kind:
metadata:
spec:
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: surya-pod
  namespace: surya-namespace
  labels:
     type: sample
     app: my-app
spec:
  containers:
    - image: nginx
      name: surya-nginx
```

#### Create a namespace

` kubectl apply -f kubernetes/ckad-notes/workspace/my-namespace.yaml
 namespace/surya-namespace created
`

#### Create a pod in this namespace

` kubectl apply -f kubernetes/ckad-notes/workspace/my-pod.yaml      
 pod/surya-pod created
`

#### Verify if the pod is running that is created with the yaml

>   kubectl get po -n surya-namespace 

```
 NAME        READY   STATUS    RESTARTS   AGE
 surya-pod   1/1     Running   0          18s
 ```
 
 #### Creating Resource Quotas
 
 
 
 ```
 kubectl describe quota hard-limit-quota -n surya-namespace
Name:            hard-limit-quota
Namespace:       surya-namespace
Resource         Used  Hard
--------         ----  ----
limits.cpu       0     3
limits.memory    0     4Gi
pods             7     10
requests.cpu     0     2
requests.memory  0     2Gi
 ```

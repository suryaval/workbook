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
# Helm - package manager for k8s

## my version: like npm for node its helm for k8s

### Installing Helm on minikube cluster

```
helm init --history-max 200
```

> This will initiate a tiller pod in kube-system namespace
```kubernetes
kubectl get po -n kube-system|grep tiller
tiller-deploy-59c6b4dd6-p8whz                1/1       Running   0          12m
```

### Installing weavescope chart using helm

chart for weave scope can be found at: https://github.com/helm/charts/tree/master/stable/weave-scope

```kubernetes
helm install --name my-weavescope stable/weave-scope
NAME:   my-weavescope
LAST DEPLOYED: Sun Mar 17 13:54:37 2019
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/ConfigMap
NAME                             DATA  AGE
weave-scope-my-weavescope-tests  1     1s

==> v1/ServiceAccount
NAME                             SECRETS  AGE
weave-scope-agent-my-weavescope  1        1s

==> v1beta1/ClusterRole
NAME                             AGE
weave-scope-agent-my-weavescope  1s

==> v1beta1/ClusterRoleBinding
NAME                       AGE
my-weavescope-weave-scope  1s

==> v1/Service
NAME                       TYPE       CLUSTER-IP   EXTERNAL-IP  PORT(S)  AGE
my-weavescope-weave-scope  ClusterIP  10.97.63.18  <none>       80/TCP   1s

==> v1beta1/DaemonSet
NAME                             DESIRED  CURRENT  READY  UP-TO-DATE  AVAILABLE  NODE SELECTOR  AGE
weave-scope-agent-my-weavescope  1        1        0      1           0          <none>         1s

==> v1beta1/Deployment
NAME                                DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
weave-scope-frontend-my-weavescope  1        1        1           0          1s

==> v1/Pod(related)
NAME                                                 READY  STATUS             RESTARTS  AGE
weave-scope-agent-my-weavescope-lrb9x                0/1    ContainerCreating  0         1s
weave-scope-frontend-my-weavescope-54c958f7c6-nmf4b  0/1    ContainerCreating  0         1s


NOTES:
You should now be able to access the Scope frontend in your web browser, by
using kubectl port-forward:

kubectl -n default port-forward $(kubectl -n default get endpoints \
my-weavescope-weave-scope -o jsonpath='{.subsets[0].addresses[0].targetRef.name}') 8080:4040

then browsing to http://localhost:8080/.
For more details on using Weave Scope, see the Weave Scope documentation:

https://www.weave.works/docs/scope/latest/introducing/

```

> ➜  ~ kubectl get pods --all-namespaces

```
NAMESPACE     NAME                                                  READY     STATUS    RESTARTS   AGE
default       weave-scope-agent-my-weavescope-lrb9x                 1/1       Running   0          5m
default       weave-scope-frontend-my-weavescope-54c958f7c6-nmf4b   1/1       Running   0          5m
docker        compose-74649b4db6-zsdjn                              1/1       Running   0          1h
docker        compose-api-85757bb9fd-z929l                          1/1       Running   0          1h
kube-system   etcd-docker-for-desktop                               1/1       Running   0          1h
kube-system   kube-apiserver-docker-for-desktop                     1/1       Running   0          1h
kube-system   kube-controller-manager-docker-for-desktop            1/1       Running   0          1h
kube-system   kube-dns-86f4d74b45-7t9dp                             3/3       Running   0          1h
kube-system   kube-proxy-bd8gf                                      1/1       Running   0          1h
kube-system   kube-scheduler-docker-for-desktop                     1/1       Running   0          1h
kube-system   tiller-deploy-59c6b4dd6-p8whz                         1/1       Running   0          14m
```

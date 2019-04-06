# Kubernetes in Practice

## Environment

Docker for Desktop on Mac

## Useful Kubernetes tooling 
todo: put this in a table with functionality

1. kube-job-cleaner - cleans completed jobs

2. Descheduler - removes unnecessary workloads off the node and schedule it on another available under utilized node

3. Sonobuoy - runs conformance tests

4. K8sGuard - auditing system for Kubernetes clusters

5. Copper - validates kubernetes manifests before they are deployed (can write custom policies using DSL)

6. KubeBench - CIS compliance checks

7. kubeval - validates k8s manifests

8. chaoskube, kube-monkey

## Kubernetes Kinds

1. Deployments

2. Jobs

3. Services

4. DaemonSets

5. CronJobs

6. Policy

7. [Namespaces](https://github.com/suryaval/workbook/blob/master/kubernetes-in-practice/namespace.yaml)

8. [ResourceQuotas](https://github.com/suryaval/workbook/blob/master/kubernetes-in-practice/ResourceQuota.yaml)

    > kubectl get resourcequotas

9. [LimitRange](./LimitRange.yaml)

    > kubectl get limitrange

10. [ConfigMap](./ConfigMap.yaml)

    >   kubectl get cm

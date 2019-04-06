# Roles

Main roles that can cover most requirements

* cluster-admin role

* View role

* Edit Role

#### Create Role

```
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: sample-role
```

## Role Binding

Attach role to an user, we use RoleBinding

```
# This role binding allows "jane" to read pods in the "default" namespace.
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role #this must be Role or ClusterRole
  name: pod-reader # this must match the name of the Role or ClusterRole you wish to bind to
  apiGroup: rbac.authorization.k8s.io
```

 ## RoleBinding vs ClusterRoleBinding
 
 >  RoleBinding: Permissions can be granted within a namespace
 
 >  ClusterRoleBinding: Permissions can be granted cluster-wide
 
 
 

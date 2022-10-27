---
title: Packaging an Application
weight: 100
images: []
---
// TODO: add service?
Let's say you want to package an application. The application is a simple nginx deployment with
three replicas. Let's also say you want to run your nginx deployment in its own namespace, called nginx. The
manifests for these two resources are pretty straight forward:
namespace.yaml // TODO: styalize
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: nginx
```

deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: nginx
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
```
The namespace must be created before the deployment.

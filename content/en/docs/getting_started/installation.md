---
title: Installation
weight: 400
images: []
---

## Via Mage
Clone the [Package Operator](https://github.com/package-operator/package-operator) repository.
Make sure `KUBECONFIG` is defined and the config points at your Kubernetes cluster (say something
more generic not just about KUBECONFIG??). From the root of the repository run
`VERSION="v0.1.0-alpha.1" ./mage deploy` to install version `v0.1.0-alpha.1` of the Package Operator.
// TODO: Remove?

## Via Manifests
Package Operator has a single yaml file, `install.yaml`, which includes the manifests of all resources that make up
Package Operator. Therefore, Package Operator can be installed with the single command:
```
kubectl create -f https://raw.githubusercontent.com/package-operator/package-operator/main/install.yaml
```

## Via Package Operator
Package Operator is able to bootstrap itself.
```
kubectl create -f https://raw.githubusercontent.com/package-operator/package-operator/main/config/self-bootstrap-job.yaml
```

---
title: Installation
weight: 400
images: []
---

## Mage
Clone the [Package Operator](https://github.com/package-operator/package-operator) repository.
Make sure `KUBECONFIG` is defined and the config points at your Kubernetes cluster (say something
more generic not just about KUBECONFIG??). From the root of the repository run
`VERSION="v0.1.0-alpha.1" ./mage deploy` to install version `v0.1.0-alpha.1` of the Package Operator.

## install.yaml
Package Operator has a single yaml file which includes the manifests of all resources that make up
Package Operator. Therefor, Package Operator can be installed with the single command:
```
kubectl apply -f https://raw.githubusercontent.com/package-operator/package-operator/main/install.yaml
```

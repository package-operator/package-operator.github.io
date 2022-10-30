---
title: Installation
weight: 400
images: []
---

All approaches can be used to install version `v1.0.0-alpha.1` of Package Operator

## Via Mage
Clone the [Package Operator](https://github.com/package-operator/package-operator) repository.
Make sure `KUBECONFIG` is defined and the config points at your Kubernetes cluster. From the root of the repository run
`VERSION="v0.1.0-alpha.1" ./mage deploy`.

## Via Manifests
Package Operator has a single yaml file, `install.yaml`, which includes the manifests of all resources that make up
Package Operator. Therefore, Package Operator can be installed with the single command:
```
https://raw.githubusercontent.com/package-operator/package-operator/v1.0.0-alpha.1/install.yaml
```

## Via Package Operator
Package Operator is able to bootstrap itself.
```
kubectl create -f https://github.com/package-operator/package-operator/releases/download/v1.0.0-alpha.1/current-self-bootstrap-job.yaml```

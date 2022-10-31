---
title: Installing Packages
weight: 200
images: []
---

## Objectives
* Create a package object manifest
* Deploy the package object

## Before you begin
This guide assumes there is already an image for the given package. If not, the
[Packaging an Application](packaging-an-application.md) or the
[Packaging an Operator](packaging-an-operator.md) guide show how to package an application or an operator
respectfully.


## (Cluster)Package Object Manifest
The `(Cluster)Package` API is used to load package container images into a cluster.

The `ClusterPackage` API is used for packages that have `Cluster` in their defined scopes and the
`Package` API is used for packages that have `Namespaced` in their defined scopes.

Read more about scopes on the [Scopes page](/content/en/docs/concepts/scopes.md).

Let's say we want to deploy a package that only has `Cluster` scope. Since basically everything is already contained
in the image, the package object manifest is quite simple.

###### package.yaml
```yaml
apiVersion: package-operator.run/v1alpha1
kind: ClusterPackage
metadata:
  name: example
  namespace: default
spec:
  image: packageImage

```

See the
[Package api reference](/content/en/docs/getting_started/api-reference.md#package) and
[ClusterPackage api reference](/content/en/docs/getting_started/api-reference.md#clusterpackage) for
more information.


## Deploy Package Object
The package object manifest can now be deployed using `kubectl`:
```shell
kubectl create -f package.yaml
```

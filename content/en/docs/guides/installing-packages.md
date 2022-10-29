---
title: Installing Packages
weight: 200
images: []
---

## Before you begin
This guide assumes there is already an image for the given package. If not, the
[Packaging an Application](packaging-an-application.md) or the
[Packaging an Operator](packaging-an-operator.md) guide show how to package an application or an operator
respectfully.

## Package Resource
The `Package` API is used to load these package container images into the cluster.

You now just have to create a package resource, see the
[api reference](/content/en/docs/getting_started/api-reference.md#package).

Since basically everything is already contained in the image, the package resource is
quite simple.

```yaml
apiVersion: package-operator.run/v1alpha1
kind: ClusterPackage
metadata:
  name: example
  namespace: default
spec:
  image: packageImage

```

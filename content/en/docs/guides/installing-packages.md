---
title: Installing Packages
weight: 200
images: []
---

This guide assumes there is already an image for the given package. If not, start with
either the [Packaging an Application](packaging-an-application.md) or the
[Packaging an Operator](packaging-an-operator.md) guide.

## Package Resource
You now just have to create a package resource, see the
[api reference](/content/en/docs/getting_started/api-reference.md#package).

Since basically everything is already contained in the image, the package resource is
quite simple.

```yaml
apiVersion: package-operator.run/v1alpha1
kind: Package
metadata:
  name: example
  namespace: default
spec:
  image: packageImage

```

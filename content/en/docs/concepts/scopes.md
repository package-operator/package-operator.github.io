---
title: Scopes
draft: false
images: []
weight: 600
toc: true
mermaid: true
---
Scopes specify ...

`scopes` is a required field in the Package Manifest file, and is given as a list of strings. The two possible values for
`scopes` are `Cluster` and `Namespaced`. Both or just one can be specified.

The `scopes` given in the Package Manifest file determine which package resource can be used to deploy the package. If
only `Cluster` or only `Namespaced` is given as a scope, then the package must be deployed as a
[ClusterPackage](/docs/getting_started/api-reference.md#clusterpackage) or
[Package](/docs/getting_started/api-reference.md#package) respectfully. If both scopes are given, then the package can
be deployed as either resource.

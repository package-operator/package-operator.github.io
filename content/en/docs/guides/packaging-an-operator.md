---
title: Packaging an Operator
weight: 300
images: []
---
## Objectives
* Create a manifest.yaml file
* Add annotation to Kubernetes object manifest files to specify phase
* Package all files in a Containerfile
* Build the image

## Before you begin
This guide assumes you have all the [required software](/docs/getting_started/requirements.md) installed and have a
Kubernetes cluster with [Package Operator installed](/docs/getting_started/installation.md).


Packaging an operator is similar to packaging any other application. You must create a `manifest.yaml` file, add an
annotation to every kubernetes manifest specifying the phase the object belongs to, and build everything in a
container image.

Usually a Kubernetes operator will consist of CRDs and the operator deployment. Because the operator watches the
CRDs, the CRDs have to be deployed before the operator deployment. This order of deployment can be specified via
`phases` in the `manifest.yaml`

## Package Manifest
The package manifest file is described in detail on the [Package Format page](docs/concepts/package-format.md). For
a simple operator the file would most likely look like this:

manifest.yaml
```yaml
apiVersion: manifests.package-operator.run/v1alpha1
kind: PackageManifest
metadata:
  name: operator-package
spec:
  scopes:
  - Cluster
  phases:
  - name: crds
  - name: deploy
  availabilityProbes:
  - probes:
    - condition:
        type: Available
        status: "True"
    - fieldsEqual:
        fieldA: .status.updatedReplicas
        fieldB: .status.replicas
    selector:
      kind:
        group: apps
        kind: Deployment
```
A short discussion about the different fields in `.spec`.
### Scopes
Since the package contains a CRDs, which are cluster scoped, the only possible scope for the
package is `Cluster`. You can read more about scopes on the [Scopes page](/content/en/docs/concepts/scopes.md).

### Phases
The namespace must be created before the deployment. The Package Manifest file has two phases defined,
`crds` and `deploy`, in that order.

Read more about phases on the [Phases page](/content/en/docs/concepts/phases.md).

### Availability Probes
This is a pretty standard probe for deployment resources. You can read more about availability probes
on the [Probes page](/content/en/docs/concepts/probes.md).

## Annotations

Now we have to link each object manifest to a phase. This is done by adding a `package-operator.run/phase` annotation to the object.
We would now add a `package-operator.run/phase: crds` annotation to all CRD object manifests, and a
`package-operator.run/phase: depoy` annotation to the operator deployment manifest.



## Package Image
Package Operator receives these files via a non-runnable container image. The files just have to be contained in the
`/package` directory in the image. That means, you container file could be as simple as

package.Containerfile
```dockerfile
FROM scratch

ADD . /package
```

During the loading of the package, Package Operator will recursively go through all folders, therefore we could have
a file structure like this:
```
package
│   manifest.yaml
│
└───crds
│   │   crd1.yaml
│   │   crd2.yaml
│   │   ...
│
└───deployment
    │   deployment.yaml
```

#### Build the Image
This package image can with whichever tool you use for building images, for example:
```shell
podman build -t packageImage -f package.Containerfile .
```

## Next Steps
See the [Installing Packages page](installing-packages.md) to see how to deploy packages using Package Operator.

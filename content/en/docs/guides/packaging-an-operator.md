---
title: Packaging an Operator
weight: 300
images: []
---

Packaging an operator is similar to packaging any other application. You must create a `manifest.yaml` file, add an
annotation to every kubernetes manifest specifying the phase the object belongs to, and build everything in a
container image.

Usually a Kubernetes operator will consist of CRDs and the controller deployment??? Because the controller watches the
CRDs, the CRDs have to be deployed before the controller deployment. This order of deployment can be specified via
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
You can read more about phases on the [Phases page](docs/concepts/phases.md) and more about
availability probes on the [Probes page](/docs/concepts/probes).

Next, you would have to go to all CRDs and specify that they are part of the `crds` phase by adding a
`package-operator.run/phase: namespace` annotation. Similarly, a `package-operator.run/phase: deploy`
annotation would have to be added to the controller manifest.

## Package Image
// TODO: _The_ package operator?
Package Operator receives these files via a non-runnable container image. The files just have to be contained in the
`/package` directory in the image. That means, you container file could be as simple as

package.Containerfile
```dockerfile
FROM scratch

ADD . /package
```

as long as it is placed and built in the same directory that your manifest.yaml file and Kubernetes manifest files are
in. During the loading of the package, Package Operator will recursively go through all folders, therefore we could have
a file structure // TODO: file structure is not the right phrase, like this:
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
This package image can now be built using your container runtime cli of choice, for example:
```shell
podman build -t packageImage -f package.Containerfile .
```

## Next Steps
See the [Installing Packages page](installing-packages.md) to see how to install packages using Package Operator.

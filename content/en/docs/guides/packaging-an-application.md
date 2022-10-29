---
title: Packaging an Application
weight: 100
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

## Application
// TODO: add service?
The application is a simple nginx webserver deployment with. Let's also say you want to run your nginx deployment in
its own namespace, called nginx. The manifests for these two resources are as follows:
namespace.yaml // TODO: stylize file names
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

## Package Manifest
The first step in packaging an application is to create a package manifest file. Read more about the package
manifest file on the [Package Format page](/content/en/docs/concepts/package-format.md).
For our application the package manifest file looks like:

// TODO: talk about scope

manifest.yaml
```yaml
apiVersion: manifests.package-operator.run/v1alpha1
kind: PackageManifest
metadata:
  name: test-stub
spec:
  scopes:
  - Cluster
  phases:
  - name: namespace
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
Since the package contains a namespace object, which is cluster scoped, the only possible scope for the
package is `Cluster`. You can read more about availability probes on the [Scopes page](/content/en/docs/concepts/scopes.md).

### Phases
The namespace must be created before the deployment. The Package Manifest file has two phases defined,
`namespace` and `deploy`, in that order.

The order of which the phases are listed in the PackageManifest file is preserved and respected. Now we have to link each
object to a phase. This is done by adding a `package-operator.run/phase` annotation to the object. For example, our
`namespace.yaml` file would now look like:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: nginx
  annotations:
    package-operator.run/phase: namespace
```
Multiple objects can be assigned to each phase, but in the phase there is no guaranteed order. Read more about phases
on the [Phases page](/content/en/docs/concepts/phases.md).

### Availability Probes
Not every `kind` you deploy needs a probe, however `availabilityProbes` is a required field meaning you
need at least one probe. You can read more about availability probes on the [Probes page](/content/en/docs/concepts/probes.md).


## Package Image
Package Operator receives these files via a non-runnable container image. The files just have to be contained in the
`/package` directory in the image. That means, container file could be as simple as

package.Containerfile
```dockerfile
FROM scratch

ADD . /package
```


#### Build the Image
This package image can now be built using your container runtime cli of choice, for example:
// TODO: is continer runtime cli the right phrase
```shell
podman build -t packageImage -f package.Containerfile .
```

## Next Steps
See the [Installing Packages page](installing-packages.md) to see how to deploy packages using Package Operator.

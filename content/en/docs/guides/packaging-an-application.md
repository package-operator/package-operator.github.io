---
title: Packaging an Application
weight: 100
images: []
---
## tl;dr
To package an application you need a package manifest file, `manifest.yaml`. This file needs this
[structure](https://github.com/package-operator/package-operator/blob/main/apis/manifests/v1alpha1/packagemanifest_types.go#L23).
// TODO: do this in a way that isn't linking to the code. code-gen? All your resource manifests then need a
`package-operator.run/phase` annotation added that specifies the phase the object will be deployed in. Finally, all these
files need to be copied into a container image and the container image must be built. Then you can deploy you package as
a `Package` resource.


## Application
// TODO: add service?
Let's say you want to package an application. The application is a simple nginx deployment with
three replicas. Let's also say you want to run your nginx deployment in its own namespace, called nginx. The
manifests for these two resources are pretty straight forward:
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
The first step towards packaging your application is to create a package manifest file. Read more about the package
manifest file on the [Package Format page](/content/en/docs/concepts/package-format.md).
For our application the package manifest file might look like:

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

Now lets go over the different fields.

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
You can read more about availability probes on the [Probes page](/content/en/docs/concepts/probes.md).
Not every `kind` you deploy needs a probe, however `availabilityProbes` is a required field meaning you
need at least one probe.

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
in. During the loading of the package, Package Operator will recursively go through all folders, therefor we could have
a file structure // TODO: file structure is not the right phrase like this:
```
package
│   manifest.yaml
│
└───namespace
│   │   namespace.yaml
│
└───deployment
    │   deployment.yaml
```
This is not that helpful in our situation, however you can image that structuring your files can be more helpful when
you have more files.

#### Build the Image
This package image can now be built using your container runtime cli of choice, for example:
```shell
podman build -t packageImage -f package.Containerfile .
```

## Next Steps
See the [Installing Packages page](installing-packages.md) to see how to install packages using Package Operator.

var suggestions=document.getElementById("suggestions"),search=document.getElementById("search");search!==null&&document.addEventListener("keydown",inputFocus);function inputFocus(e){e.ctrlKey&&e.key==="/"&&(e.preventDefault(),search.focus()),e.key==="Escape"&&(search.blur(),suggestions.classList.add("d-none"))}document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=suggestions.classList.contains("d-none");if(s)return;const t=[...suggestions.querySelectorAll("a")];if(t.length===0)return;const n=t.indexOf(document.activeElement);if(e.key==="ArrowUp"){e.preventDefault();const s=n>0?n-1:0;t[s].focus()}else if(e.key==="ArrowDown"){e.preventDefault();const s=n+1<t.length?n+1:n;t[s].focus()}}(function(){var e=new FlexSearch.Document({tokenize:"forward",cache:100,document:{id:"id",store:["href","title","description"],index:["title","description","content"]}});e.add({id:0,href:"/docs/getting_started/",title:"Getting Started",description:"",content:""}),e.add({id:1,href:"/docs/getting_started/introduction/",title:"Introduction",description:`Package Operator is a Kubernetes Operator for packaging and managing a collection of arbitrary Kubernetes objects.
Helping users in installing and maintaining complex software on one or multiple clusters.
Highlights # No Surprises Ordered Installation and Removal Operating Transparency Extensible Declarative APIs Plug and Play Cheap Failures and Easy Recovery Rollout History Rollback Objectives # Security, Stability, Transparency, Extensibility
(in this order)
Security # A Kubernetes package manager is entrusted with a very high level of permissions on one or more clusters and also works with secrets as part of package configuration.`,content:` Package Operator is a Kubernetes Operator for packaging and managing a collection of arbitrary Kubernetes objects.
Helping users in installing and maintaining complex software on one or multiple clusters.
Highlights # No Surprises Ordered Installation and Removal Operating Transparency Extensible Declarative APIs Plug and Play Cheap Failures and Easy Recovery Rollout History Rollback Objectives # Security, Stability, Transparency, Extensibility
(in this order)
Security # A Kubernetes package manager is entrusted with a very high level of permissions on one or more clusters and also works with secrets as part of package configuration. Without putting security of these credentials first, users will not be able to trust Package Operator.
Stability # Stability enables any other feature in the Package Operator and makes or breaks its whole value proposition. Because many day-2 operations, like patching, updating and re-configuration can be orchestrated via Package Operator, a misbehaving or broken Package Operator can spell doom to any production environment.
Package Operator commits to stability and extensive automated testing for any feature being implemented.
Transparency # Stability is never absolute, so it&rsquo;s crucial to be transparent.
Transparency enables users of the Package Operator to debug and resolve issues, with either their own workloads or the Package Operator itself, in a timely and sane manner.
Extensibility # The Kubernetes ecosystem is moving fast, really fast.
New Operators, APIs, procedures and tools are being created at an astounding pace.
Package Operator tries to be plug-able, allowing users to use any kind of custom resource registered on the Kubernetes cluster. Facilities of Package Operator are also setup to be overridden, so they can be switched for custom or alternative implementations.
`}),e.add({id:2,href:"/docs/guides/packaging-an-application/",title:"Packaging an Application",description:`In this guide, you will deploy a simple nginx web server, using the Package Operator - Package API.
During this guide you will:
Create a manifest.yaml file Assign Kubernetes objects to PKO phases Take advantage of templates Setup test cases for templates Build and Validate the Package Operator package To complete this guide you will need:
A Kubernetes cluster with Package Operator installed The kubectl-package CLI plugin Access to a container registry where you can push your images All files used during this guide are available in the package-operator/examples repository.`,content:`In this guide, you will deploy a simple nginx web server, using the Package Operator - Package API.
During this guide you will:
Create a manifest.yaml file Assign Kubernetes objects to PKO phases Take advantage of templates Setup test cases for templates Build and Validate the Package Operator package To complete this guide you will need:
A Kubernetes cluster with Package Operator installed The kubectl-package CLI plugin Access to a container registry where you can push your images All files used during this guide are available in the package-operator/examples repository.
1. Start # To complete this step, refer to the files in /1_applications/1_start.
When packaging an application for Package Operator, you will need 2 things:
One or more Kubernetes manifests (e.g. deployment.yaml) A PackageManifest object in a manifest.yaml file Writing a PackageManifest # Like with any Kubernetes object, Group Version Kind contains the version information:
apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifest Metadata contains the name of this package:
metadata: name: nginx Packages may be cluster-scoped, namespace-scoped, or both.
This controls whether you can install this package via Package or ClusterPackage API.
Namespace-scoped packages can not contain cluster-scoped objects, like Namespaces.
spec: scopes: - Namespaced Phases are needed when you need a distinct order in your rollout or teardown.
Examples:
Ensure an application is completely upgraded before reconfiguring the load balancer Run a database migration before bringing up the new Deployment Ensure Custom Resource Definitins (CRDs) are Established before deploying your Operator spec: phases: - name: deploy Probes define how Package Operator interrogates objects under management for status.
PKO will only continue into the next Phase if all objects passed their availabilityProbe.
spec: availabilityProbes: - probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas selector: kind: group: apps kind: Deployment Assigning objects to phases # Package Operator needs to know in which phase objects belong.
To assign an object to a phase, simply add an annotation:
metadata: annotations: package-operator.run/phase: deploy Build &amp; Validate # If you just want to validate the local package contents, run the kubectl package validate command:
kubectl package validate 1_applications/1_start For example, if you encounter an issue such as a missing annotation, the output might look like this:
Error: Package validation errors: - Missing package-operator.run/phase Annotation in deployment.yaml#0 To inspect the parsed hierarchy of your package, run the kubectl package tree command:
kubectl package tree 1_applications/1_start Example output:
nginx Package namespace/name └── Phase deploy └── apps/v1, Kind=Deployment /nginx-deployment Finally, build your package as a container image and push the image to a registry. To directly push images to a registry, assuming you&rsquo;ve already logged in using podman/docker login, use the following command:
kubectl package build -t &lt;your-image-url-goes-here&gt; --push &lt;path-to-package-contents&gt; Example:
kubectl package build -t quay.io/myquayusername/nginx --push 1_applications/1_start Deploy # Now that you have built your first Package Operator package, we can deploy it!
You will find the Package-object template in the examples directory under 1_applications/package.yaml. Don&rsquo;t forget to change the package url so it corresponds to the one used when building the package. For example, replace image: &lt;your-package-url-goes-here&gt; with image: &quot;quay.io/myquayusername/nginx&quot;.
If the package specifies a configuration set, its values are to be specified in a config section within the spec. If a config entry has a default specified in the package manifest it may be overridden here. If the package requires values that are not defaulted and missing here, the package installation will fail.
Example Package object template:
apiVersion: package-operator.run/v1alpha1 kind: Package metadata: name: my-nginx spec: image: &lt;your-package-url-goes-here&gt; config: nginxImage: &quot;nginx:1.23.3&quot; To deploy the package, execute the following command:
kubectl create -f 1_applications/package.yaml You will receive a confirmation message similar to:
package.package-operator.run/my-nginx created Wait for package to be loaded and installed:
kubectl get package -w The status will change from Progressing to Available:
NAME STATUS AGE my-nginx Progressing 11s my-nginx Available 13s Finally, to verify the deployment status, run:
kubectl get po A &ldquo;READY&rdquo; value of 1/1 and a &ldquo;STATUS&rdquo; of &ldquo;Running&rdquo; indicate a successful deployment.
2. Templates # To complete this step, refer to the files in /1_applications/2_templates.
Next, we want to make sure that the package can be installed multiple times into the same namespace. To accomplish this, we have to make the package more dynamic!
Go Templates # By renaming deployment.yaml to deployment.yaml.gotmpl, we can enable Go template support. Files suffixed with .gotmpl will be processed by the Go template engine before the YAML manifests are parsed.
TemplateContext is documented as part of the API. It always contains information like package metadata that can be used to reduce reduncancies.
app.kubernetes.io/instance: &quot;{{.package.metadata.name}}&quot; Additionally, packages can include a config section. This section requires the config to be specified in the package manifest as an OpenAPI specification. It is recommended to require values that are always needed for package deployment and set defaults if appropriate.
To inspect the parsed hierarchy of your package when using a config section, you must provide a configuration file with the required values:
Example config.yaml:
nginxImage: &quot;nginx:1.23.3&quot; Inspect the parsed hierarchy of your package:
kubectl package tree 1_applications/2_templates/ --config-path config.yaml Alternatively, the config section of a named test template within the manifest can be used:
kubectl package tree 1_applications/2_templates/ --config-testcase namespace-scope Testing Templates # Using a template engine with yaml files can quickly lead to unexpected results.
To aid with testing, Package Operator includes a simple package testing framework.
Template tests may be configured as part of the PackageManifest, by specifying the TemplateContext data to test the template process with.
For each template test, Package Operator will auto-generate fixtures into a .test-fixtures folder when running kubectl package validate or build and compare the output of successive template operations against these fixtures.
Example of a template test defined in manifest.yaml:
test: template: - name: namespace-scope context: package: metadata: name: my-cool-name namespace: test-ns Make a change to the deployment template:
#... metadata: name: &quot;{{.package.metadata.Name}}-deploy&quot; #... Validate the package again:
$ kubectl package validate 1_applications/2_templates Error: Package validation errors: - Test &quot;namespace-scope&quot;: File mismatch against fixture in deployment.yaml.gotmpl: --- FIXTURE/deployment.yaml +++ ACTUAL/deployment.yaml @@ -1,7 +1,7 @@ apiVersion: apps/v1 kind: Deployment metadata: - name: &quot;my-cool-name&quot; + name: &quot;my-cool-name-deploy&quot; labels: app.kubernetes.io/name: nginx app.kubernetes.io/instance: &quot;my-cool-name&quot; To continue building the package, either reset your change to the template, edit the fixture or delete the .test-fixtures folder and regenerate all fixtures by running the validate command again.
Upgrade/Deploy # This section provides a steps on how to upgrade or deploy your package using the Package Operator.
Build your package again using a different tag or image name:
kubectl package build -t &lt;your-image-url-goes-here&gt; --push 1_applications/2_templates Edit the Package object on the cluster to change the image: to the new build tag. Example:
kubectl edit package change:
#... spec: config: nginxImage: nginx:1.23.3 image: quay.io/myquayusername/nginx:0.0.1 #... to:
#... spec: config: nginxImage: nginx:1.23.3 image: quay.io/myquayusername/nginx:0.0.2 #... Monitor the change being rolled out:
kubectl get package -w The status will transition from Progressing to Available.
The deployment&rsquo;s name now utilizes the name of the Package object, making it safe to create multiple instances of the same package.
Modify the name in 1_applications/package.yaml file and redeploy your package:
Change the Package name in the YAML file:
#... kind: Package metadata: name: other-nginx #... Redeploy the package:
kubectl create -f 1_applications/package.yaml package.package-operator.run/other-nginx created Verify the changes:
Check the package status:
$ kubectl get package NAME STATUS AGE my-nginx Available 69m other-nginx Available 6s Check the deployments:
$ kubectl get deploy NAME READY UP-TO-DATE AVAILABLE AGE my-nginx 1/1 1 1 6m25s other-nginx 1/1 1 1 117s `}),e.add({id:3,href:"/docs/getting_started/architecture/",title:"Architecture",description:`Package Operator Manager # The main work of Package Operator is done by the Package Operator Manager. This component is run as a deployment with a single replica. It contains the controllers for (Cluster)Package, (Cluster)ObjectDeployment, and (Cluster)ObjectSet resources. It also contains a controller for (Cluster)ObjectSetPhase objects. This controller reconciles (Cluster)ObjectSetPhases with the .spec.class set to default.
Package Operator Manager also contains functionality to copy its own binary and load packages, which is discussed in the Loading Package Images Section, and functionality to allow Package Operator to bootstrap itself, which is discussed on the Installation Page.`,content:`Package Operator Manager # The main work of Package Operator is done by the Package Operator Manager. This component is run as a deployment with a single replica. It contains the controllers for (Cluster)Package, (Cluster)ObjectDeployment, and (Cluster)ObjectSet resources. It also contains a controller for (Cluster)ObjectSetPhase objects. This controller reconciles (Cluster)ObjectSetPhases with the .spec.class set to default.
Package Operator Manager also contains functionality to copy its own binary and load packages, which is discussed in the Loading Package Images Section, and functionality to allow Package Operator to bootstrap itself, which is discussed on the Installation Page.
Webhooks # There is a validation webhook server that can optionally be run with package operator. This webhook server verifies the immutability of certain fields of ObjectSet and ObjectSetPhase resources. If one of these immutable fields is changed in an update, the webhook server will disallow the update.
Loading Package Images # A package is a single artifact that contains all manifests, configuration, and metadata needed to run an application or operator. This single artifact takes the form of a non-runnable container image. This image is supplied to Package Operator in a (Cluster)Package object.
When Package Operator reconciles a (Cluster)Package object, it needs to access the content of the package image. Package Operator does this by deploying a separate Kubernetes Job. This Job has two containers, an init container called prepare-loader and a regular container called package-loader.
The prepare-loader container uses the package-operator-manager image and copies the package-operator-manager binary to a shared volume that both containers in the Job have access to. We have to do this because as mentioned before, the package image is non-runnable, so we have to assume it has no shell or copy utilities to unpack the files it contains.
The package-loader container then uses the package-operator-manager binary to create an ObjectDeployment that contains all the necessary information from the package image. The Job then finishes and is garbage collected.
`}),e.add({id:4,href:"/docs/guides/",title:"Guides",description:"",content:""}),e.add({id:5,href:"/docs/concepts/reconciliation/",title:"Object Reconciliation",description:`Package Operator is watching and if needed reconciling all objects under management.
This page describes in detail how individual objects are updated.
Ordering of multiple objects is described on the Phases page. How object status is interpreted is described further on the Probes page.
Object update rules:
specified fields MUST always be reconciled to reset changes by other users additional labels and annotations for e.g. cache-control MUST be respected unspecified fields MAY be defaulted by admission controllers or webhooks unspecified fields MAY be overridden by e.`,content:`Package Operator is watching and if needed reconciling all objects under management.
This page describes in detail how individual objects are updated.
Ordering of multiple objects is described on the Phases page. How object status is interpreted is described further on the Probes page.
Object update rules:
specified fields MUST always be reconciled to reset changes by other users additional labels and annotations for e.g. cache-control MUST be respected unspecified fields MAY be defaulted by admission controllers or webhooks unspecified fields MAY be overridden by e.g. auto-scalers Examples # Annotations/Labels # Annotations and Labels defined by users or other controllers and integrations are not overridden or replaced. Only labels and annotations explicitly set are reconciled to the specified value.
This is important, as Kubernetes operators may use labels to scope their caches. It also allows humans to add extra labels and annotations for ops or debugging work.
Desired Object in Package Operator
apiVersion: apps/v1 kind: Deployment metadata: name: nginx-deployment labels: app: nginx spec: {} Actual Object
apiVersion: apps/v1 kind: Deployment metadata: name: nginx-deployment labels: app: banana something: xxx annotations: notice: important! spec: {} Result after Reconcile
apiVersion: apps/v1 kind: Deployment metadata: name: nginx-deployment labels: app: nginx something: xxx annotations: notice: important! spec: {} Replicas # Fields not explicitly specified, may be defaulted or changed, without being reset by the Package Operator.
Desired Object in Package Operator
apiVersion: apps/v1 kind: Deployment metadata: name: nginx-deployment labels: app: nginx spec: # replicas: not set template: {} Actual Object
apiVersion: apps/v1 kind: Deployment metadata: name: nginx-deployment labels: app: nginx spec: replicas: 3 template: {} Result
apiVersion: apps/v1 kind: Deployment metadata: name: nginx-deployment labels: app: nginx spec: replicas: 3 template: {} `}),e.add({id:6,href:"/docs/concepts/",title:"Concepts",description:"",content:""}),e.add({id:7,href:"/docs/guides/packaging-an-operator/",title:"Packaging an Operator",description:`This guide extends on Packaging an Application, with the goal to package and deploy an Kubernetes Operator using the Package Operator - ClusterPackage API.
During this guide you will:
Create a manifest.yaml file Use multiple PKO phases Build and Validate the Package Operator package To complete this guide you will need:
A Kubernetes cluster with Package Operator installed The kubectl-package CLI plugin Access to a container registry where you can push your images All files used during this guide are available in the package-operator/examples repository.`,content:`This guide extends on Packaging an Application, with the goal to package and deploy an Kubernetes Operator using the Package Operator - ClusterPackage API.
During this guide you will:
Create a manifest.yaml file Use multiple PKO phases Build and Validate the Package Operator package To complete this guide you will need:
A Kubernetes cluster with Package Operator installed The kubectl-package CLI plugin Access to a container registry where you can push your images All files used during this guide are available in the package-operator/examples repository.
1. Start # Please refer to the files in /2_operators/1_start for this step.
Writing a PackageManifest # Operators are always installed for the whole cluster, so the package is also scoped for the cluster.
spec: scopes: - Cluster Operators require distinct order-of-operations to successfully install.
The phases list represents these steps.
CustomResourceDefinitions have no pre-requisites, so they come first. Namespaces also has no dependencies. ServiceAccount and RoleBinding need the Namespace Deployment needs all of the above. spec: phases: - name: crds - name: namespace - name: rbac - name: deploy Probes define how Package Operator interrogates objects under management for status.
For this operator we want to add a new probe to ensure the CRDs have been established.
spec: availabilityProbes: - probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas selector: kind: group: apps kind: Deployment - probes: - condition: type: Established status: &quot;True&quot; selector: kind: group: apiextensions.k8s.io kind: CustomResourceDefinition Assigning objects to phases # Package Operators needs to know in which phase objects belong.
To assign an object to a phase, simply add an annotation:
metadata: annotations: package-operator.run/phase: crds|namespace|rbac|deploy Build &amp; Validate # To inspect the parsed hierarchy of your package, use:
$ kubectl package tree --cluster 2_operators/1_start # example: example-operator ClusterPackage /name └── Phase crds │ ├── apiextensions.k8s.io/v1, Kind=CustomResourceDefinition /nginxes.example.thetechnick.ninja └── Phase namespace │ ├── /v1, Kind=Namespace /example-operator └── Phase rbac │ ├── /v1, Kind=ServiceAccount example-operator/example-operator │ ├── rbac.authorization.k8s.io/v1, Kind=Role example-operator/example-operator │ ├── rbac.authorization.k8s.io/v1, Kind=RoleBinding example-operator/example-operator │ ├── rbac.authorization.k8s.io/v1, Kind=ClusterRole /example-operator │ ├── rbac.authorization.k8s.io/v1, Kind=ClusterRoleBinding /example-operator └── Phase deploy └── apps/v1, Kind=Deployment example-operator/example-operator And finally to build your package as a container image use:
# Push images directly to a registry. # Assumes you are already logged into a registry via \`podman/docker login\` $ kubectl package build -t &lt;your-image-url-goes-here&gt; --push 2_operators/1_start Deploy # Now that you have build your first Package Operator package, we can deploy it!
You will find the Package-object template in the examples checkout under 2_operators/clusterpackage.yaml.
apiVersion: package-operator.run/v1alpha1 kind: ClusterPackage metadata: name: example-operator spec: image: &lt;your-image-url-goes-here&gt; $ kubectl create -f 2_operators/clusterpackage.yaml clusterpackage.package-operator.run/example-operator created # wait for package to be loaded and installed: $ kubectl get clusterpackage -w NAME STATUS AGE example-operator Progressing 10s example-operator Available 22s # success! $ kubectl get po -n example-operator NAME READY STATUS RESTARTS AGE example-operator-5d86f95b4f-z4wfz 1/1 Running 0 17m `}),e.add({id:8,href:"/docs/getting_started/requirements/",title:"Requirements",description:`Kubernetes Cluster # Package Operator need a Kubernetes cluster to be deployed on. If you don&rsquo;t have a cluster but still want to play around with Package Operator, there are a few choices of tools to deploy a Kubernetes cluster locally, such as minikube and kind.
kubectl # You will need the Kubernetes CLI, kubectl, to deploy and interact with Package Operator and your packages.
kubectl-package # Package Operator provides a kubectl plugin to validate, package and inspect Package Operator packages.`,content:`Kubernetes Cluster # Package Operator need a Kubernetes cluster to be deployed on. If you don&rsquo;t have a cluster but still want to play around with Package Operator, there are a few choices of tools to deploy a Kubernetes cluster locally, such as minikube and kind.
kubectl # You will need the Kubernetes CLI, kubectl, to deploy and interact with Package Operator and your packages.
kubectl-package # Package Operator provides a kubectl plugin to validate, package and inspect Package Operator packages.
The binaries can be found on the Package Operator Releases page.
Container Runtime # You will CLI to build container images, such as docker or podman.
`}),e.add({id:9,href:"/docs/getting_started/installation/",title:"Installation",description:`Package Operator can be installed in multiple different ways. Check the latest available release at Package Operator Releases.
Via Package Operator # Package Operator is able to bootstrap and upgrade itself using a special self-bootstrap-job.
Make sure KUBECONFIG is defined and the config points at your Kubernetes cluster. Then you can deploy Package Operator to bootstrap itself:
kubectl create -f https://github.com/package-operator/package-operator/releases/latest/download/self-bootstrap-job.yaml This will not install the webhook server.
Via Mage # Clone the Package Operator repository.`,content:`Package Operator can be installed in multiple different ways. Check the latest available release at Package Operator Releases.
Via Package Operator # Package Operator is able to bootstrap and upgrade itself using a special self-bootstrap-job.
Make sure KUBECONFIG is defined and the config points at your Kubernetes cluster. Then you can deploy Package Operator to bootstrap itself:
kubectl create -f https://github.com/package-operator/package-operator/releases/latest/download/self-bootstrap-job.yaml This will not install the webhook server.
Via Mage # Clone the Package Operator repository. Make sure KUBECONFIG is defined and the config points at your Kubernetes cluster. From the root of the repository run VERSION=&quot;&lt;Release to install&gt;&quot; ./mage deploy.
This will install the Package Operator Manager and the webhook server.
Via Manifests # Package Operator has a single yaml file, install.yaml, which includes the manifests of all resources that make up Package Operator. Therefore, Package Operator can be installed with the single command:
https://raw.githubusercontent.com/package-operator/package-operator/main/install.yaml This will not install the webhook server.
kubectl package plugin # A kubectl plugin named package is released alongside Package Operator itself to make the interaction easier.
Follow these simple steps to install it:
download the kubectl-package_* file for local architecture from the releases page rename it to kubectl-package make it executable (e.g. chmod +x kubectl-package on Linux) move it to anywhere on your PATH This will allow you to issue kubectl package ... commands
For a more detailed explanation on how to install plugins, check the official documentation
`}),e.add({id:10,href:"/docs/guides/image-digests/",title:"Working with image digests",description:`This guide explains how to leverage the automatic image digest resolution feature when creating a Package, which allows the creator to easily replace the image tags with their respective digests inside the packaged resources.
This enables a stricter control over which images will be included in the package, since the digest is the ultimate way to uniquely identify an image, while the tag can identify different ones over time (think of latest that gets updated every time).`,content:`This guide explains how to leverage the automatic image digest resolution feature when creating a Package, which allows the creator to easily replace the image tags with their respective digests inside the packaged resources.
This enables a stricter control over which images will be included in the package, since the digest is the ultimate way to uniquely identify an image, while the tag can identify different ones over time (think of latest that gets updated every time).
All files used during this guide are available in the package-operator/examples repository.
1. Start # _Please refer to the files in /3_image_digests/1_start for this step. It is based on step 1 of the application packaging guide with the addition of some templating. Make sure you understand these concepts before continuing.
Add images to PackageManifest # In the .spec.images field of the manifest.yaml file, specify the list of images needed, each one associated with its own custom label:
apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifest metadata: name: nginx spec: ... images: - name: webserver image: nginx:1.23.3 - name: base image: registry.access.redhat.com/ubi9/ubi-minimal:9.1 Resolve digests # The Package Operator CLI supports a new subcommand: update, which resolves the image tags in the manifests to their corresponding digests. This information is then stored in a new file called manifest.lock.yaml (a.k.a. lock file).
The lock file is mandatory if the manifest spec contains some images, otherwise the build will fail.
To generate or update the lock file, issue the following command:
kubectl package update . # this assumes we're in the package root folder Here is an example of the output (digests are the ones at the time of writing):
apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifestLock metadata: creationTimestamp: &quot;2023-03-09T13:45:10Z&quot; spec: images: - digest: sha256:aa0afebbb3cfa473099a62c4b32e9b3fb73ed23f2a75a65ce1d4b4f55a5c2ef2 image: nginx:1.23.3 name: webserver - digest: sha256:61925d31338b7b41bfd5b6b8cf45eaf80753d415b0269fc03613c5c5049b879e image: registry.access.redhat.com/ubi9/ubi-minimal:9.1 name: base IMPORTANT: if a new image is pushed to its registry, causing an already specified tag to point to a different digest, the value in the lock file won&rsquo;t be updated until the update subcommand is explicitly reissued.
Use images map in the templates # To use these values in the real package resources, the templating context is enriched with a map named images, in which each image is identified by a key, consisting of the custom label, pointing to the full image reference that uses the resolved digest.
Since this is a standard map, it can be used anywhere in any type of resource with the standard templating syntax.
Here we have two examples. The first one is a Deployment that uses the dot syntax to access the map:
apiVersion: apps/v1 kind: Deployment metadata: ... name: nginx-deployment ... spec: ... template: ... spec: containers: - name: nginx image: &quot;{{.images.webserver}}&quot; ... and the second is a ConfigMap that uses the index syntax instead:
apiVersion: v1 kind: ConfigMap metadata: ... name: example-configmap ... data: image_with_digest: &quot;{{index .images &quot;base&quot;}}&quot; Resolved values in deployed package # Here is an examples of the same two resources once deployed in a cluster:
The Deployment first:
apiVersion: apps/v1 kind: Deployment metadata: ... name: nginx-deployment ... spec: ... template: ... spec: containers: - name: nginx image: docker.io/library/nginx@sha256:aa0afebbb3cfa473099a62c4b32e9b3fb73ed23f2a75a65ce1d4b4f55a5c2ef2 ... and finally the ConfigMap:
apiVersion: v1 kind: ConfigMap metadata: ... name: example-configmap ... data: image_with_digest: registry.access.redhat.com/ubi9/ubi-minimal@sha256:61925d31338b7b41bfd5b6b8cf45eaf80753d415b0269fc03613c5c5049b879e `}),e.add({id:11,href:"/docs/concepts/package-configuration/",title:"Package Configuration",description:`In the context of the Package Operator, package configuration enables you to customize your resource deployments using templates. This documentation will introduce you to the core concepts of package configuration, how it works, and how you can use it to streamline your application deployments.
Understanding Package Configuration # You can think of package configuration as a set of customizable knobs and switches that you can turn to adjust how your application or operator gets deployed.`,content:`In the context of the Package Operator, package configuration enables you to customize your resource deployments using templates. This documentation will introduce you to the core concepts of package configuration, how it works, and how you can use it to streamline your application deployments.
Understanding Package Configuration # You can think of package configuration as a set of customizable knobs and switches that you can turn to adjust how your application or operator gets deployed. Using these knobs, you can adjust the deployment to your needs without changing the actual code. Package configuration includes defining how you create and customize resources using templates.
The main components involved in package configuration are:
Templates: These files have placeholders that you will replace with values from the configuration context. Configuration Definition: The configuration definition specifies the structure of the configuration parameters that you can customize when deploying a package. It provides information about properties, data types, default values, and required or optional settings. Configuration Context: During deployment, the configuration context is the set of values and information used to replace placeholders in templates. It includes details about the package, images, configuration settings, and the environment. The configuration context contains the values that apply to a particular deployment, so you can tailor the package to fit your needs. Benefits of Package Configuration # Package configuration offers several advantages when deploying applications or operators using the Package Operator:
Simplified deployment: Package configuration streamlines the deployment process by allowing you to define customizable values without modifying the underlying resource templates.
Consistency: With package configuration, you ensure consistency across deployments, as you can enforce predefined configurations for different environments.
Customization without code changes: Package configuration enables you to tailor your deployment without altering the application or operator codebase. You can easily switch configurations for various use cases.
Defining Package Configuration # You have the option to include a config section within your packages. Define this section within the package manifest using OpenAPI specifications. It&rsquo;s good practice to define values that are essential for successful package deployment as required, and to set default values where applicable. By incorporating default values, you prevent deployment failures caused by missing mandatory values.
NOTE: These two solutions are mutually exclusive. You can either mark a property as required to enforce the necessity of providing a value, thereby preventing failure, or assign a default value to ensure success even when no value is provided. It&rsquo;s important not to use both approaches for the same property.
When creating your package, consider the essential configuration parameters that you will need to customize. Provide default values for properties that you can set up, but you can change them if you want to.
Here&rsquo;s a simple example of specifying a configuration schema in your package manifest.yaml:
spec: config: openAPIV3Schema: properties: nginxImage: description: nginxImage is the reference to the image containing nginx. type: string default: &quot;nginx:latest&quot; nginxWebrootConfigmap: description: nginxWebrootConfigmap is the name of an already existing configmap in the package namespace that will be mounted into the nginx containers as webroot folder. type: string required: - nginxWebrootConfigmap type: object This example sets the default nginxImage to nginx:latest and declares the key nginxWebrootConfigmap as required.
Next, you add the following to the template section of your deployment.yaml.gotmpl:
template: metadata: labels: app.kubernetes.io/name: nginx app.kubernetes.io/instance: &quot;{{ .package.metadata.name }}&quot; spec: containers: - name: nginx image: &quot;{{ .config.nginxImage }}&quot; ports: - containerPort: 80 volumeMounts: - name: nginx-webroot mountPath: /usr/share/nginx/html volumes: - name: nginx-webroot configMap: name: nginx-webroot Finally, you configure the example package.yaml as follows and deploy it:
apiVersion: v1 kind: ConfigMap metadata: name: nginx-webroot data: index.html: |- &lt;html&gt; &lt;body&gt; &lt;h1&gt;hi there&lt;/h1&gt; &lt;/body&gt; &lt;/html&gt; --- apiVersion: package-operator.run/v1alpha1 kind: Package metadata: name: nginx-webroot spec: image: quay.io/yourquayusername/nginx:tag config: nginxWebrootConfigmap: nginx-webroot Verify the configuration by running curl on the deployment.
Example:
kubectl exec deploy/nginx-webroot -- curl -s localhost Example Output:
&lt;html&gt; &lt;body&gt; &lt;h1&gt;hi there&lt;/h1&gt; &lt;/body&gt; Examples # Let’s examine a couple more examples to illustrate how package configuration works.
Example 1: Customizing Image Versions # Suppose you have multiple applications with different frontend and backend images and ports. You want users to easily customize the images and ports based on the application. Here&rsquo;s a step-by-step process:
Create a PackageManifest Define the scope and phases of your package in your manifest.yaml:
apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifest metadata: name: frontend-backend spec: scopes: - Namespaced phases: - name: deploy availabilityProbes: - probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas selector: kind: group: apps kind: Deployment Define Package Configuration Under the config section, add the configuration schema for your package to your manifest.yaml. Allow users define image and port versions.
config: openAPIV3Schema: properties: frontendImage: description: frontendImage is the reference to the image containing the frontend application. type: string databaseImage: description: backendImage is the reference to the image containing the backend application. type: string frontendPort: description: Port for the frontend container. type: integer default: 80 databasePort: description: Port for the database container. type: integer default: 5432 type: object Add the following to the template section of your deployment.yaml.gotmpl:
template: metadata: labels: app.kubernetes.io/name: frontend-backend app.kubernetes.io/instance: &quot;{{ .package.metadata.name }}&quot; spec: containers: - name: frontend image: &quot;{{ .config.frontendImage }}&quot; ports: - containerPort: {{ .config.frontendPort }} - name: database image: &quot;{{ .config.databaseImage }}&quot; ports: - containerPort: {{ .config.databasePort }} Build and push your package to your image repository:
kubectl package validate &lt;your-template-directory&gt; kubectl package build -t &lt;your-image-reference-goes-here&gt; --push &lt;your-template-directory&gt; Apply Custom Configuration
In your Package resource, users can add values for the configured properties. For example:
apiVersion: package-operator.run/v1alpha1 kind: Package metadata: name: frontend-backend-deploy spec: image: quay.io/yourquayusername/frontend-backend-deploy:v2 config: // configuration for abc-app frontendImage: quay.io/yourquayusername/nginx:abc-appv1 databaseImage: quay.io/yourquayusername/postgres:abc-appv14.5 frontendPort: 8080 databasePort: 5433 Deploy the package:
kubectl create -f package.yaml Verify the package status:
kubectl get packages Example 2: Using Package Configuration in a Deployment Template with a ClusterObjectTemplate # Imagine you are an engineer responsible for managing deployments in a Kubernetes cluster using the Package Operator. You have a package application, and you want to streamline the stage and production deployment process by using package configuration and ClusterObjectTemplates.
Application Configuration
You have built your package application as a container image and pushed it to a registry such as quay.io/yourusername/frontend-deployment:v1. Your deployment template (deployment.yaml.gotmpl) consists of Package Configuration for app name, image, and namespace. Example deployment.yaml.gotmpl:
apiVersion: apps/v1 kind: Deployment metadata: name: {{ .package.metadata.name }}-deployment namespace: &quot;{{ .config.namespace }}&quot; labels: app.kubernetes.io/name: &quot;{{ .config.app }}&quot; app.kubernetes.io/instance: &quot;{{ .package.metadata.name }}&quot; annotations: package-operator.run/phase: deploy spec: replicas: 3 selector: matchLabels: app.kubernetes.io/name: &quot;{{ .config.app }}&quot; template: metadata: labels: app.kubernetes.io/name: &quot;{{ .config.app }}&quot; spec: containers: - name: &quot;{{ .config.app }}&quot; image: &quot;{{ .config.image }}&quot; Example manifest.yaml:
apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifest metadata: name: my-deployment-package spec: scopes: - Namespaced - Cluster phases: - name: deploy availabilityProbes: - probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas selector: kind: group: apps kind: Deployment config: openAPIV3Schema: properties: namespace: description: The namespace to deploy to. type: string app: description: The name of the application. type: string image: description: The image to use for the deployment. type: string required: - namespace - app - image type: object Create a ConfigMap with Application Configuration:
Create a ConfigMap that stores the configuration data for your application.
apiVersion: v1 kind: ConfigMap metadata: name: myapp-config namespace: integration data: namespace: production-namespace image: quay.io/yourusername/wizard:stable app: wizard Apply the ConfigMap to your cluster:
kubectl apply -f configmap.yaml Create a ClusterObjectTemplate:
Create a ClusterObjectTemplate that references the ConfigMap and uses it to template the PackageManifest.
Use the following YAML and apply it:
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectTemplate metadata: name: cool-new-app-template namespace: integration spec: sources: - apiVersion: v1 items: - destination: .namespace key: .data.namespace - destination: .image key: .data.image - destination: .app key: .data.app kind: ConfigMap name: myapp-config namespace: integration optional: false template: | apiVersion: package-operator.run/v1alpha1 kind: Package metadata: name: &quot;{{ .config.name }}&quot; namespace: &quot;{{ .config.namespace }}&quot; spec: image: &quot;quay.io/yourusername/frontend-deployment:v1&quot; config: {{toJson .config}} Apply the ClusterObjectTemplate:
Apply the ClusterObjectTemplate using the kubectl apply -f clusterobjecttemplate.yaml command.
Use the kubectl describe clusterobjecttemplates &lt;your-template-name&gt; command to verify the ClusterObjectTemplate status.
Example:
kubectl describe clusterobjecttemplates cool-new-app-template ... snipped for readability Status: Conditions: Last Transition Time: 2023-09-09T20:17:47Z Message: Unpack job succeeded Observed Generation: 1 Reason: UnpackSuccess Status: True Type: Unpacked Create Packages Based on ClusterObjectTemplate:
When the ClusterObjectTemplate is applied, it creates Package objects based on the initial configuration from the ConfigMap.
These Package objects represent your deployments. You can view the created Package objects using kubectl get packages -A and kubectl get deployments -A to view the corresponding deployments.
Example:
kubectl get packages -A NAMESPACE NAME STATUS AGE production-namespace wizard Available 3m21s kubectl get deployments -n production-namespace NAME READY UP-TO-DATE AVAILABLE AGE wizard-deployment 3/3 3 3 5m15s Update the Application Configuration:
Update the configuration of your application and modify the data in the myapp-config ConfigMap.
Example:
apiVersion: v1 kind: ConfigMap metadata: name: myapp-config namespace: integration data: namespace: production-namespace image: quay.io/yourusername/wizard:v3 app: wizard Apply the ConfigMap:
Apply the ConfigMap by issuing: kubectl apply -f configmap.yaml.
The package status will change status to Progressing and then Available:
Example:
kubectl get packages -A NAMESPACE NAME STATUS AGE production-namespace wizard Progressing 7m43s kubectl get packages -A NAMESPACE NAME STATUS AGE production-namespace wizard Available 8m11s Verify the deployment:
Verify the deployment is using the updated image:
kubectl describe deployment wizard-deployment -n production-namespace ... Pod Template: Labels: app.kubernetes.io/name=wizard Containers: wizard: Image: wizard:v3 Port: &lt;none&gt; Host Port: &lt;none&gt; Environment: &lt;none&gt; Mounts: &lt;none&gt; Volumes: &lt;none&gt; Update the ConfigMap for Stage Deployment:
To create a deployment for stage, update the ConfigMap with the details of the stage deployment.
Example:
apiVersion: v1 kind: ConfigMap metadata: name: myapp-config namespace: integration data: namespace: staging-namespace image: quay.io/yourusername/wizard:2.0.0-beta app: wizard Apply the ConfigMap to your cluster:
Apply the ConfigMap to your cluster, by issuing:
kubectl apply -f configmap.yaml When you apply the ConfigMap, the wizard package is created in the staging-namespace, along with the deployments.
Verify the Package object creation and deployments:
kubectl get packages -A NAMESPACE NAME STATUS AGE production-namespace wizard Available 70m staging-namespace wizard Available 51s kubectl get deployments -A production-namespace wizard-deployment 3/3 3 3 73m staging-namespace wizard-deployment 3/3 3 3 4m47s These steps guided you through deploying and updating your application using package configuration and ClusterObjectTemplates with the Package Operator.
Error Messages and Troubleshooting # During the package configuration process, you may encounter common errors such as missing or incorrectly formatted values. Here are some troubleshooting tips:
Check Property Names: Ensure that property names in your configuration match those defined in the package manifest&rsquo;s configuration schema. Data Type Mismatch: Verify that the data types of configured values match the expected types in the schema. Test Framework: Use the Package Operator test framework to test your templates. Review Logs: Review the Package Operator manager logs using the kubectl logs -f package-operator-manager&lt;pod&gt; -n package-operator-system command. Conclusion # These examples illustrate how you can leverage package configuration to provide a streamlined and customized way to deploy applications in Kubernetes using the Package Operator. The power of package configuration lies in its ability to abstract and parameterize values in your resources, making deployments flexible and adaptable.
`}),e.add({id:12,href:"/docs/concepts/probes/",title:"Probes",description:`Probes define how Package Operator judges the Availability of objects and is reporting status.
Defining Availability will depend on the specific application that is deployed.
In general, availability should reflect the health of the complete application bundle, so Package Operator can check whether it&rsquo;s safe to roll over to a new revision.
Package Operator does not provide any default probes and leaves it to the author of a package to configure probing explicitly.`,content:`Probes define how Package Operator judges the Availability of objects and is reporting status.
Defining Availability will depend on the specific application that is deployed.
In general, availability should reflect the health of the complete application bundle, so Package Operator can check whether it&rsquo;s safe to roll over to a new revision.
Package Operator does not provide any default probes and leaves it to the author of a package to configure probing explicitly. This ensures that probing of packages stays consistent throughout different Package Operator releases and allows package authors to tweak probing to their specific requirements.
Probe Spec # Probes typically consist of two parts.
A selector specifying what objects to apply a probe to and a list of probes to check.
All available probing declarations can be found in API Reference - ObjectSetProbe.
Examples # Deployment # selector: kind: group: apps kind: Deployment probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas StatefulSet # selector: kind: group: apps kind: StatefulSet probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas CustomResourceDefinition # selector: kind: group: apiextensions.k8s.io kind: CustomResourceDefinition probes: - condition: type: Established status: &quot;True&quot; `}),e.add({id:13,href:"/docs/concepts/object-template/",title:"Object Templates",description:`ClusterObjectTemplate and ObjectTemplate are APIs defined in Package Operator. These APIs make it possible to create objects by templating a manifest and injecting values retrieved from other arbitrary source objects. The source objects are then continuously monitored and any change in the source values result in an updated templated object.
A subset of this functionality can be achieved by mounting secrets or configmaps, however there are multiple benefits to using the ObjectTemplate API.`,content:`ClusterObjectTemplate and ObjectTemplate are APIs defined in Package Operator. These APIs make it possible to create objects by templating a manifest and injecting values retrieved from other arbitrary source objects. The source objects are then continuously monitored and any change in the source values result in an updated templated object.
A subset of this functionality can be achieved by mounting secrets or configmaps, however there are multiple benefits to using the ObjectTemplate API. First, values can be sourced from any arbitrary kubernetes object, not just secrets or configmaps. Second, when a source value is updated a new version of the templated object will be created i.e. the value will not just be silently updated. Third, when a source value is specified as optional and is not present, package operator will continue to reconcile the templated object. At some point, if the source value becomes available, package operator will eventually pick up the value and recreate the templated object.
Example # Say we have an ObjectTemplate called example-object-template which templates a package called test-stub.
apiVersion: package-operator.run/v1alpha1 kind: ObjectTemplate metadata: name: example-object-template namespace: default spec: sources: - apiVersion: v1 items: - destination: .nice_to_have_metadata key: .data.nice_to_have_metadata kind: ConfigMap name: metadata-config namespace: default optional: true - apiVersion: v1 items: - destination: .database key: .data.database kind: ConfigMap name: database-config namespace: default optional: false template: | apiVersion: package-operator.run/v1alpha1 kind: Package metadata: name: test-stub spec: image: &quot;quay.io/package-operator/test-stub-package:v1.0.0-47-g3405dde&quot; config: {{toJson .config}} IMPORTANT: the key and destination values must be JSONPaths, i.e. have a leading dot.
example-object-template sources values from database-config
apiVersion: v1 kind: ConfigMap metadata: name: database-config namespace: default data: database: database-123 and metadata-config
apiVersion: v1 kind: ConfigMap metadata: name: metadata-config namespace: default data: nice_to_have_metadata: useful-label The database-config source is not optional, so we have to make sure to create it before creating example-object-template:
kubectl create -f database-config.yaml We can now create example-object-template:
kubectl create -f example-object-template.yaml We can retrieve the yaml of the created package with:
kubectl get package test-stub -o yaml which will return something like:
apiVersion: package-operator.run/v1alpha1 kind: Package metadata: creationTimestamp: &quot;2023-03-17T14:09:05Z&quot; finalizers: - package-operator.run/loader-job generation: 1 labels: package-operator.run/cache: &quot;True&quot; name: test-stub namespace: default ownerReferences: - apiVersion: package-operator.run/v1alpha1 blockOwnerDeletion: true controller: true kind: ObjectTemplate name: example-object-template uid: f8072c83-7760-4baf-9155-25901c7999eb resourceVersion: &quot;201176&quot; uid: 4ceda067-14b7-439d-8040-e983dd7d1545 spec: config: database: database-123 image: quay.io/package-operator/test-stub-package:v1.0.0-47-g3405dde status: conditions: - lastTransitionTime: &quot;2023-03-17T14:09:05Z&quot; message: Unpack job in progress observedGeneration: 1 reason: Unpacking status: &quot;False&quot; type: Unpacked phase: NotReady We can see that the database value from database-config was successfully injected into the package&rsquo;s config field. Because the metadata-config configmap does not exist and the item is optional, the creation of the package went through normally, and we just don&rsquo;t have a nice_to_have_metadata entry in the config.
If we run kubectl describe objecttemplate example-object-template, we can see that the status conditions from test-stub where copied over to example-object-template.
Now if we create the metadata-config configmap
kubectl create -f metadata-config.yaml and retrieve the package yaml again (kubectl get package test-stub -o yaml), we see that the generation has been increased and that nice_to_have_metadata has been injected into the package&rsquo;s config field.
`}),e.add({id:14,href:"/docs/concepts/phases/",title:"Phases",description:`Phases are part of ObjectSets and ClusterObjectSets and order rollout and teardown of individual objects within a package revision to ensure repeatable and deterministic behavior.
When an ObjectSet is being reconciled, it will go through every specified phase in order. First creating or patching all objects contained within that phase and then probing them for availability.
Only when all objects within a phase are passing their availability probes, will the ObjectSet continue with the next phase, until all phases have been serviced.`,content:`Phases are part of ObjectSets and ClusterObjectSets and order rollout and teardown of individual objects within a package revision to ensure repeatable and deterministic behavior.
When an ObjectSet is being reconciled, it will go through every specified phase in order. First creating or patching all objects contained within that phase and then probing them for availability.
Only when all objects within a phase are passing their availability probes, will the ObjectSet continue with the next phase, until all phases have been serviced.
Order of objects within a phase is not guaranteed. Use multiple phases, if order-of-operations is important. Teardown # When deleting an ObjectSet its phases are deleted in reversed. Waiting for objects to be gone from the kube-apiserver after all finalizers have been serviced, before continuing with the next phase.
Example # Use multiple phases to ensure prerequisites are setup, before they are required.
In this example, a Namespace is created first, as RBAC roles and the deployment need to be within that namespace.
RBAC and a CustomResourceDefinition have to be applied before the deployment is started to prevent the deployment from accessing APIs that are either missing or it is not yet allowed to work with.
phases: - name: namespace objects: - object: {apiVersion: v1, kind: Namespace} - name: crds-and-rbac objects: - object: {apiVersion: v1, kind: ServiceAccount} - object: {apiVersion: rbac.authorization.k8s.io/v1, kind: Role} - object: {apiVersion: rbac.authorization.k8s.io/v1, kind: RoleBinding} - object: {apiVersion: apiextensions.k8s.io/v1, kind: CustomResourceDefinition} - name: deploy objects: - object: {apiVersion: apps/v1, kind: Deployment} availabilityProbes: - selector: kind: group: apiextensions.k8s.io kind: CustomResourceDefinition probes: - condition: type: Established status: &quot;True&quot; - selector: kind: group: apps kind: Deployment probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas `}),e.add({id:15,href:"/docs/concepts/scopes/",title:"Scopes",description:`The two possible values for scopes are Cluster and Namespaced.
Cluster scope allows the package to deploy cluster scoped object, such as CRDs. It also allows for deploying namespaced resources in multiple namespaces.
Namespaced scope restricts the package to only installing namespaced resources, and only into the namespace that the package is in.
Just one or both scopes can be specified for a single package.
The scopes given in the Package Manifest file determine which package resource can be used to deploy the package.`,content:`The two possible values for scopes are Cluster and Namespaced.
Cluster scope allows the package to deploy cluster scoped object, such as CRDs. It also allows for deploying namespaced resources in multiple namespaces.
Namespaced scope restricts the package to only installing namespaced resources, and only into the namespace that the package is in.
Just one or both scopes can be specified for a single package.
The scopes given in the Package Manifest file determine which package resource can be used to deploy the package. If only Cluster or only Namespaced is given as a scope, then the package must be deployed as a ClusterPackage or Package respectfully. If both scopes are given, then the package can be deployed as either resource.
`}),e.add({id:16,href:"/docs/getting_started/api-reference/",title:"API Reference",description:`The Package Operator APIs are an extension of the Kubernetes API using CustomResourceDefinitions. These new APIs can be interacted with like any other Kubernetes object using e.g. kubectl.
APIs follow the same API versioning guidelines as the main Kubernetes project.
Versioning principles. Taken from the Kubernetes API versioning documentation:
Alpha
The version names contain alpha (for example, v1alpha1). The software may contain bugs. Enabling a feature may expose bugs. A feature may be disabled by default.`,content:`The Package Operator APIs are an extension of the Kubernetes API using CustomResourceDefinitions. These new APIs can be interacted with like any other Kubernetes object using e.g. kubectl.
APIs follow the same API versioning guidelines as the main Kubernetes project.
Versioning principles. Taken from the Kubernetes API versioning documentation:
Alpha
The version names contain alpha (for example, v1alpha1). The software may contain bugs. Enabling a feature may expose bugs. A feature may be disabled by default. The support for a feature may be dropped at any time without notice. The API may change in incompatible ways in a later software release without notice. The software is recommended for use only in short-lived testing clusters, due to increased risk of bugs and lack of long-term support. Beta
The version names contain beta (for example, v2beta3). The software is well tested. Enabling a feature is considered safe. Features are enabled by default. The support for a feature will not be dropped, though the details may change. The schema and/or semantics of objects may change in incompatible ways in a subsequent beta or stable release. When this happens, migration instructions are provided. Schema changes may require deleting, editing, and re-creating API objects. The editing process may not be straightforward. The migration may require downtime for applications that rely on the feature. The software is not recommended for production uses. Subsequent releases may introduce incompatible changes. If you have multiple clusters which can be upgraded independently, you may be able to relax this restriction. Stable
The version name is vX where X is an integer. The stable versions of features appear in released software for many subsequent versions. Group versions # package-operator.run/v1alpha1\\ manifests.package-operator.run/v1alpha1 package-operator.run/v1alpha1 # The package v1alpha1 contains API Schema definitions for the v1alpha1 version of the core Package Operator API group, containing basic building blocks that other auxiliary APIs can build on top of.
ClusterObjectDeployment ClusterObjectSet ClusterObjectSetPhase ClusterObjectSlice ClusterObjectTemplate ClusterPackage ObjectDeployment ObjectSet ObjectSetPhase ObjectSlice ObjectTemplate Package ClusterObjectDeployment # ClusterObjectDeployment is the Schema for the ClusterObjectDeployments API
Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectDeployment metadata: name: example spec: revisionHistoryLimit: 10 selector: metav1.LabelSelector template: metadata: metav1.ObjectMeta spec: availabilityProbes: - probes: - condition: status: &quot;True&quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment selector: matchLabels: app.kubernetes.io/name: example-operator phases: - class: ipsum externalObjects: - conditionMappings: - destinationType: consetetur sourceType: amet object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment name: lorem objects: - conditionMappings: - destinationType: sit sourceType: dolor object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment slices: - sadipscing successDelaySeconds: 42 status: phase:Pending: null Field Description metadata metav1.ObjectMeta spec ClusterObjectDeploymentSpec ClusterObjectDeploymentSpec defines the desired state of a ClusterObjectDeployment. status ClusterObjectDeploymentStatus ClusterObjectDeploymentStatus defines the observed state of a ClusterObjectDeployment. ClusterObjectSet # ClusterObjectSet reconciles a collection of objects through ordered phases and aggregates their status.
ClusterObjectSets behave similarly to Kubernetes ReplicaSets, by managing a collection of objects and being itself mostly immutable. This object type is able to suspend/pause reconciliation of specific objects to facilitate the transition between revisions.
Archived ClusterObjectSets may stay on the cluster, to store information about previous revisions.
A Namespace-scoped version of this API is available as ObjectSet.
Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectSet metadata: name: example spec: availabilityProbes: - probes: - condition: status: &quot;True&quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment selector: matchLabels: app.kubernetes.io/name: example-operator lifecycleState: Active phases: - class: sed externalObjects: - conditionMappings: - destinationType: tempor sourceType: eirmod object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment name: elitr objects: - conditionMappings: - destinationType: nonumy sourceType: diam object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment slices: - lorem previous: - name: previous-revision successDelaySeconds: 42 status: phase: Pending Field Description metadata metav1.ObjectMeta spec ClusterObjectSetSpec ClusterObjectSetSpec defines the desired state of a ClusterObjectSet. status ClusterObjectSetStatus ClusterObjectSetStatus defines the observed state of a ClusterObjectSet. ClusterObjectSetPhase # ClusterObjectSetPhase is an internal API, allowing a ClusterObjectSet to delegate a single phase to another custom controller. ClusterObjectSets will create subordinate ClusterObjectSetPhases when .class is set within the phase specification.
Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectSetPhase metadata: name: example spec: availabilityProbes: - probes: - condition: status: &quot;True&quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment selector: matchLabels: app.kubernetes.io/name: example-operator externalObjects: - conditionMappings: - destinationType: amet sourceType: sit object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment objects: - conditionMappings: - destinationType: dolor sourceType: ipsum object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment paused: &quot;true&quot; previous: - name: previous-revision revision: 42 status: conditions: - status: &quot;True&quot; type: Available controllerOf: - group: sadipscing kind: consetetur name: elitr namespace: sed Field Description metadata metav1.ObjectMeta spec ClusterObjectSetPhaseSpec ClusterObjectSetPhaseSpec defines the desired state of a ClusterObjectSetPhase. status ClusterObjectSetPhaseStatus ClusterObjectSetPhaseStatus defines the observed state of a ClusterObjectSetPhase. ClusterObjectSlice # ClusterObjectSlices are referenced by ObjectSets or ObjectDeployments and contain objects to limit the size of ObjectSet and ObjectDeployments when big packages are installed. This is necessary to work around the etcd object size limit of ~1.5MiB and to reduce load on the kube-apiserver.
Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectSlice metadata: name: example objects: - conditionMappings: - destinationType: nonumy sourceType: diam object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment Field Description metadata metav1.ObjectMeta objects required
[]ObjectSetObject ClusterObjectTemplate # ClusterObjectTemplate contain a go template of a Kubernetes manifest. The manifest is then templated with the sources provided in the .Spec.Sources. The sources can come from objects from any namespace or cluster scoped objects.
Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectTemplate metadata: name: example spec: sources: - apiVersion: tempor items: - destination: amet key: sit kind: lorem name: dolor namespace: ipsum optional: &quot;true&quot; template: eirmod status: conditions: - metav1.Condition phase: ObjectTemplateStatusPhase Field Description metadata metav1.ObjectMeta spec ObjectTemplateSpec ObjectTemplateSpec specification. status ObjectTemplateStatus ObjectTemplateStatus defines the observed state of a ObjectTemplate ie the status of the templated object. ClusterPackage # Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterPackage metadata: name: example spec: config: runtime.RawExtension image: consetetur status: phase: Pending Field Description metadata metav1.ObjectMeta spec PackageSpec Package specification. status PackageStatus PackageStatus defines the observed state of a Package. ObjectDeployment # ObjectDeployment is the Schema for the ObjectDeployments API
Example
apiVersion: package-operator.run/v1alpha1 kind: ObjectDeployment metadata: name: example namespace: default spec: revisionHistoryLimit: 10 selector: metav1.LabelSelector template: metadata: metav1.ObjectMeta spec: availabilityProbes: - probes: - condition: status: &quot;True&quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment selector: matchLabels: app.kubernetes.io/name: example-operator phases: - class: elitr externalObjects: - conditionMappings: - destinationType: eirmod sourceType: nonumy object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment name: sadipscing objects: - conditionMappings: - destinationType: diam sourceType: sed object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment slices: - tempor successDelaySeconds: 42 status: phase:Pending: null Field Description metadata metav1.ObjectMeta spec ObjectDeploymentSpec ObjectDeploymentSpec defines the desired state of a ObjectDeployment. status ObjectDeploymentStatus ObjectDeploymentStatus defines the observed state of a ObjectDeployment. ObjectSet # ObjectSet reconciles a collection of objects through ordered phases and aggregates their status.
ObjectSets behave similarly to Kubernetes ReplicaSets, by managing a collection of objects and being itself mostly immutable. This object type is able to suspend/pause reconciliation of specific objects to facilitate the transition between revisions.
Archived ObjectSets may stay on the cluster, to store information about previous revisions.
A Cluster-scoped version of this API is available as ClusterObjectSet.
Example
apiVersion: package-operator.run/v1alpha1 kind: ObjectSet metadata: name: example namespace: default spec: availabilityProbes: - probes: - condition: status: &quot;True&quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment selector: matchLabels: app.kubernetes.io/name: example-operator lifecycleState: Active phases: - class: ipsum externalObjects: - conditionMappings: - destinationType: consetetur sourceType: amet object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment name: lorem objects: - conditionMappings: - destinationType: sit sourceType: dolor object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment slices: - sadipscing previous: - name: previous-revision successDelaySeconds: 42 status: phase: Pending Field Description metadata metav1.ObjectMeta spec ObjectSetSpec ObjectSetSpec defines the desired state of a ObjectSet. status ObjectSetStatus ObjectSetStatus defines the observed state of a ObjectSet. ObjectSetPhase # ObjectSetPhase is an internal API, allowing an ObjectSet to delegate a single phase to another custom controller. ObjectSets will create subordinate ObjectSetPhases when .class within the phase specification is set.
Example
apiVersion: package-operator.run/v1alpha1 kind: ObjectSetPhase metadata: name: example namespace: default spec: availabilityProbes: - probes: - condition: status: &quot;True&quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment selector: matchLabels: app.kubernetes.io/name: example-operator externalObjects: - conditionMappings: - destinationType: nonumy sourceType: diam object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment objects: - conditionMappings: - destinationType: sed sourceType: elitr object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment paused: &quot;true&quot; previous: - name: previous-revision revision: 42 status: conditions: - status: &quot;True&quot; type: Available controllerOf: - group: tempor kind: eirmod name: lorem namespace: ipsum Field Description metadata metav1.ObjectMeta spec ObjectSetPhaseSpec ObjectSetPhaseSpec defines the desired state of a ObjectSetPhase. status ObjectSetPhaseStatus ObjectSetPhaseStatus defines the observed state of a ObjectSetPhase. ObjectSlice # ObjectSlices are referenced by ObjectSets or ObjectDeployments and contain objects to limit the size of ObjectSets and ObjectDeployments when big packages are installed. This is necessary to work around the etcd object size limit of ~1.5MiB and to reduce load on the kube-apiserver.
Example
apiVersion: package-operator.run/v1alpha1 kind: ObjectSlice metadata: name: example namespace: default objects: - conditionMappings: - destinationType: sit sourceType: dolor object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment Field Description metadata metav1.ObjectMeta objects required
[]ObjectSetObject ObjectTemplate # ObjectTemplates contain a go template of a Kubernetes manifest. This manifest is then templated with the sources provided in the .Spec.Sources. The sources can only come from objects within the same nampespace as the ObjectTemplate.
Example
apiVersion: package-operator.run/v1alpha1 kind: ObjectTemplate metadata: name: example namespace: default spec: sources: - apiVersion: consetetur items: - destination: nonumy key: diam kind: sadipscing name: sed namespace: elitr optional: &quot;true&quot; template: amet status: conditions: - metav1.Condition phase: ObjectTemplateStatusPhase Field Description metadata metav1.ObjectMeta spec ObjectTemplateSpec ObjectTemplateSpec specification. status ObjectTemplateStatus ObjectTemplateStatus defines the observed state of a ObjectTemplate ie the status of the templated object. Package # Example
apiVersion: package-operator.run/v1alpha1 kind: Package metadata: name: example namespace: default spec: config: runtime.RawExtension image: eirmod status: phase: Pending Field Description metadata metav1.ObjectMeta spec PackageSpec Package specification. status PackageStatus PackageStatus defines the observed state of a Package. ClusterObjectDeploymentSpec # ClusterObjectDeploymentSpec defines the desired state of a ClusterObjectDeployment.
Field Description revisionHistoryLimit int32 Number of old revisions in the form of archived ObjectSets to keep. selector required
metav1.LabelSelector Selector targets ObjectSets managed by this Deployment. template required
ObjectSetTemplate Template to create new ObjectSets from. Used in:
ClusterObjectDeployment ClusterObjectDeploymentStatus # ClusterObjectDeploymentStatus defines the observed state of a ClusterObjectDeployment.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. phase ObjectDeploymentPhase This field is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. collisionCount int32 Count of hash collisions of the ClusterObjectDeployment. templateHash string Computed TemplateHash. revision int64 Deployment revision. Used in:
ClusterObjectDeployment ClusterObjectSetPhaseSpec # ClusterObjectSetPhaseSpec defines the desired state of a ClusterObjectSetPhase.
Field Description paused bool Disables reconciliation of the ClusterObjectSet.
Only Status updates will still be propagated, but object changes will not be reconciled. revision required
int64 Revision of the parent ObjectSet to use during object adoption. previous []PreviousRevisionReference Previous revisions of the ClusterObjectSet to adopt objects from. availabilityProbes []ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. objects required
[]ObjectSetObject Objects belonging to this phase. externalObjects []ObjectSetObject ExternalObjects observed, but not reconciled by this phase. Used in:
ClusterObjectSetPhase ClusterObjectSetPhaseStatus # ClusterObjectSetPhaseStatus defines the observed state of a ClusterObjectSetPhase.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. controllerOf []ControlledObjectReference References all objects controlled by this instance. Used in:
ClusterObjectSetPhase ClusterObjectSetSpec # ClusterObjectSetSpec defines the desired state of a ClusterObjectSet.
Field Description lifecycleState ObjectSetLifecycleState Specifies the lifecycle state of the ClusterObjectSet. previous []PreviousRevisionReference Previous revisions of the ClusterObjectSet to adopt objects from. phases []ObjectSetTemplatePhase Reconcile phase configuration for a ObjectSet.
Phases will be reconciled in order and the contained objects checked
against given probes before continuing with the next phase. availabilityProbes []ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. successDelaySeconds int32 Success Delay Seconds applies a wait period from the time an
Object Set is available to the time it is marked as successful.
This can be used to prevent false reporting of success when
the underlying objects may initially satisfy the availability
probes, but are ultimately unstable. Used in:
ClusterObjectSet ClusterObjectSetStatus # ClusterObjectSetStatus defines the observed state of a ClusterObjectSet.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. phase ObjectSetStatusPhase Phase is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. revision int64 Computed revision number, monotonically increasing. remotePhases []RemotePhaseReference Remote phases aka ClusterObjectSetPhase objects. controllerOf []ControlledObjectReference References all objects controlled by this instance. Used in:
ClusterObjectSet ConditionMapping # Field Description sourceType required
string Source condition type. destinationType required
string Destination condition type to report into Package Operator APIs. Used in:
ObjectSetObject ControlledObjectReference # References an object controlled by this ObjectSet/ObjectSetPhase.
Field Description kind required
string Object Kind. group required
string Object Group. name required
string Object Name. namespace string Object Namespace. Used in:
ClusterObjectSetPhaseStatus ClusterObjectSetStatus ObjectSetPhaseStatus ObjectSetStatus ObjectDeploymentSpec # ObjectDeploymentSpec defines the desired state of a ObjectDeployment.
Field Description revisionHistoryLimit int32 Number of old revisions in the form of archived ObjectSets to keep. selector required
metav1.LabelSelector Selector targets ObjectSets managed by this Deployment. template required
ObjectSetTemplate Template to create new ObjectSets from. Used in:
ObjectDeployment ObjectDeploymentStatus # ObjectDeploymentStatus defines the observed state of a ObjectDeployment.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. phase ObjectDeploymentPhase This field is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. collisionCount int32 Count of hash collisions of the ObjectDeployment. templateHash string Computed TemplateHash. revision int64 Deployment revision. Used in:
ObjectDeployment ObjectSetObject # An object that is part of the phase of an ObjectSet.
Field Description object required
unstructured.Unstructured conditionMappings []ConditionMapping Maps conditions from this object into the Package Operator APIs. Used in:
ClusterObjectSetPhaseSpec ClusterObjectSetPhaseSpec ObjectSetPhaseSpec ObjectSetPhaseSpec ObjectSetTemplatePhase ObjectSetTemplatePhase ClusterObjectSlice ObjectSlice ObjectSetPhaseSpec # ObjectSetPhaseSpec defines the desired state of a ObjectSetPhase.
Field Description paused bool Disables reconciliation of the ObjectSet.
Only Status updates will still be propagated, but object changes will not be reconciled. revision required
int64 Revision of the parent ObjectSet to use during object adoption. previous []PreviousRevisionReference Previous revisions of the ObjectSet to adopt objects from. availabilityProbes []ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. objects required
[]ObjectSetObject Objects belonging to this phase. externalObjects []ObjectSetObject ExternalObjects observed, but not reconciled by this phase. Used in:
ObjectSetPhase ObjectSetPhaseStatus # ObjectSetPhaseStatus defines the observed state of a ObjectSetPhase.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. controllerOf []ControlledObjectReference References all objects controlled by this instance. Used in:
ObjectSetPhase ObjectSetProbe # ObjectSetProbe define how ObjectSets check their children for their status.
Field Description probes required
[]Probe Probe configuration parameters. selector required
ProbeSelector Selector specifies which objects this probe should target. Used in:
ClusterObjectSetPhaseSpec ClusterObjectSetSpec ObjectSetPhaseSpec ObjectSetSpec ObjectSetTemplateSpec ObjectSetSpec # ObjectSetSpec defines the desired state of a ObjectSet.
Field Description lifecycleState ObjectSetLifecycleState Specifies the lifecycle state of the ObjectSet. previous []PreviousRevisionReference Previous revisions of the ObjectSet to adopt objects from. phases []ObjectSetTemplatePhase Reconcile phase configuration for a ObjectSet.
Phases will be reconciled in order and the contained objects checked
against given probes before continuing with the next phase. availabilityProbes []ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. successDelaySeconds int32 Success Delay Seconds applies a wait period from the time an
Object Set is available to the time it is marked as successful.
This can be used to prevent false reporting of success when
the underlying objects may initially satisfy the availability
probes, but are ultimately unstable. Used in:
ObjectSet ObjectSetStatus # ObjectSetStatus defines the observed state of a ObjectSet.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. phase ObjectSetStatusPhase Phase is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. revision int64 Computed revision number, monotonically increasing. remotePhases []RemotePhaseReference Remote phases aka ObjectSetPhase objects. controllerOf []ControlledObjectReference References all objects controlled by this instance. Used in:
ObjectSet ObjectSetTemplate # ObjectSetTemplate describes the template to create new ObjectSets from.
Field Description metadata required
metav1.ObjectMeta Common Object Metadata. spec required
ObjectSetTemplateSpec ObjectSet specification. Used in:
ClusterObjectDeploymentSpec ObjectDeploymentSpec ObjectSetTemplatePhase # ObjectSet reconcile phase.
Field Description name required
string Name of the reconcile phase. Must be unique within a ObjectSet. class string If non empty, the ObjectSet controller will delegate phase reconciliation to another controller, by creating an ObjectSetPhase object.
If set to the string &ldquo;default&rdquo; the built-in Package Operator ObjectSetPhase controller will reconcile the object in the same way the ObjectSet would.
If set to any other string, an out-of-tree controller needs to be present to handle ObjectSetPhase objects. objects []ObjectSetObject Objects belonging to this phase. externalObjects []ObjectSetObject ExternalObjects observed, but not reconciled by this phase. slices []string References to ObjectSlices containing objects for this phase. Used in:
ClusterObjectSetSpec ObjectSetSpec ObjectSetTemplateSpec ObjectSetTemplateSpec # ObjectSet specification.
Field Description phases []ObjectSetTemplatePhase Reconcile phase configuration for a ObjectSet.
Phases will be reconciled in order and the contained objects checked
against given probes before continuing with the next phase. availabilityProbes []ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. successDelaySeconds int32 Success Delay Seconds applies a wait period from the time an
Object Set is available to the time it is marked as successful.
This can be used to prevent false reporting of success when
the underlying objects may initially satisfy the availability
probes, but are ultimately unstable. Used in:
ObjectSetTemplate ObjectTemplateSource # Field Description apiVersion required
string kind required
string namespace string name required
string items required
[]ObjectTemplateSourceItem optional bool Marks this source as optional.
The templated object will still be applied if optional sources are not found.
If the source object is created later on, it will be eventually picked up. Used in:
ObjectTemplateSpec ObjectTemplateSourceItem # Field Description key required
string JSONPath to value in source object. destination required
string JSONPath to destination in which to store copy of the source value. Used in:
ObjectTemplateSource ObjectTemplateSpec # ObjectTemplateSpec specification.
Field Description template required
string Go template of a Kubernetes manifest sources required
[]ObjectTemplateSource Objects in which configuration parameters are fetched Used in:
ClusterObjectTemplate ObjectTemplate ObjectTemplateStatus # ObjectTemplateStatus defines the observed state of a ObjectTemplate ie the status of the templated object.
Field Description conditions []metav1.Condition Conditions is a list of status conditions the templated object is in. phase ObjectTemplateStatusPhase This field is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. Used in:
ClusterObjectTemplate ObjectTemplate PackageProbeKindSpec # Kind package probe parameters. selects objects based on Kind and API Group.
Field Description group required
string Object Group to apply a probe to. kind required
string Object Kind to apply a probe to. Used in:
ProbeSelector PackageSpec # Package specification.
Field Description image required
string the image containing the contents of the package
this image will be unpacked by the package-loader to render the ObjectDeployment for propagating the installation of the package. config runtime.RawExtension Package configuration parameters. Used in:
ClusterPackage Package PackageStatus # PackageStatus defines the observed state of a Package.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. phase PackageStatusPhase This field is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. unpackedHash string Hash of image + config that was successfully unpacked. revision int64 Package revision as reported by the ObjectDeployment. Used in:
ClusterPackage Package PreviousRevisionReference # References a previous revision of an ObjectSet or ClusterObjectSet.
Field Description name required
string Name of a previous revision. Used in:
ClusterObjectSetPhaseSpec ClusterObjectSetSpec ObjectSetPhaseSpec ObjectSetSpec Probe # Defines probe parameters. Only one can be filled.
Field Description condition ProbeConditionSpec Checks whether or not the object reports a condition with given type and status. fieldsEqual ProbeFieldsEqualSpec Compares two fields specified by JSON Paths. Used in:
ObjectSetProbe ProbeConditionSpec # Checks whether or not the object reports a condition with given type and status.
Field Description type required
string Condition type to probe for. status required
string Condition status to probe for. Used in:
Probe ProbeFieldsEqualSpec # Compares two fields specified by JSON Paths.
Field Description fieldA required
string First field for comparison. fieldB required
string Second field for comparison. Used in:
Probe ProbeSelector # Selects a subset of objects to apply probes to. e.g. ensures that probes defined for apps/Deployments are not checked against ConfigMaps.
Field Description kind required
PackageProbeKindSpec Kind and API Group of the object to probe. selector metav1.LabelSelector Further sub-selects objects based on a Label Selector. Used in:
ObjectSetProbe RemotePhaseReference # References remote phases aka ObjectSetPhase/ClusterObjectSetPhase objects to which a phase is delegated.
Field Description name required
string uid required
types.UID Used in:
ClusterObjectSetStatus ObjectSetStatus manifests.package-operator.run/v1alpha1 # The package v1alpha1 contains API Schema definitions for the v1alpha1 version of the manifests API group, containing file-based manifests for the packaging infrastructure.
PackageManifest PackageManifestLock PackageManifest # Example
apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifest metadata: name: example namespace: default spec: availabilityProbes: - corev1alpha1.ObjectSetProbe config: openAPIV3Schema: apiextensionsv1.JSONSchemaProps images: - image: sit name: dolor phases: - class: ipsum name: lorem scopes: - PackageManifestScope test: template: - context: config: runtime.RawExtension environment: kubernetes: version: elitr openShift: version: sed proxy: httpProxy: diam httpsProxy: nonumy noProxy: eirmod package: metadata: annotations: map[string]string labels: map[string]string name: consetetur namespace: sadipscing name: amet Field Description metadata metav1.ObjectMeta spec PackageManifestSpec PackageManifestSpec represents the spec of the packagemanifest containing the details about phases and availability probes. test PackageManifestTest PackageManifestTest configures test cases. PackageManifestLock # Example
apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifestLock metadata: name: example namespace: default spec: images: - digest: ipsum image: lorem name: tempor Field Description metadata metav1.ObjectMeta spec PackageManifestLockSpec PackageEnvironment # PackageEnvironment information.
Field Description kubernetes required
PackageEnvironmentKubernetes Kubernetes environment information. openShift PackageEnvironmentOpenShift OpenShift environment information. proxy PackageEnvironmentProxy Proxy configuration. Used in:
TemplateContext PackageEnvironmentKubernetes # Field Description version required
string Kubernetes server version. Used in:
PackageEnvironment PackageEnvironmentOpenShift # Field Description version required
string OpenShift server version. Used in:
PackageEnvironment PackageEnvironmentProxy # Environment proxy settings. On OpenShift, this config is taken from the cluster Proxy object. https://docs.openshift.com/container-platform/4.13/networking/enable-cluster-wide-proxy.html
Field Description httpProxy string HTTP_PROXY httpsProxy string HTTPS_PROXY noProxy string NO_PROXY Used in:
PackageEnvironment PackageManifestImage # PackageManifestImage specifies an image tag to be resolved
Field Description name required
string Image name to be use to reference it in the templates image required
string Image identifier (REPOSITORY[:TAG]) Used in:
PackageManifestSpec PackageManifestLockImage # PackageManifestLockImage contains information about a resolved image.
Field Description name required
string Image name to be use to reference it in the templates image required
string Image identifier (REPOSITORY[:TAG]) digest required
string Image digest Used in:
PackageManifestLockSpec PackageManifestLockSpec # Field Description images required
[]PackageManifestLockImage List of resolved images Used in:
PackageManifestLock PackageManifestPhase # Field Description name required
string Name of the reconcile phase. Must be unique within a PackageManifest class string If non empty, phase reconciliation is delegated to another controller.
If set to the string &ldquo;default&rdquo; the built-in controller reconciling the object.
If set to any other string, an out-of-tree controller needs to be present to handle ObjectSetPhase objects. Used in:
PackageManifestSpec PackageManifestSpec # PackageManifestSpec represents the spec of the packagemanifest containing the details about phases and availability probes.
Field Description scopes required
[]PackageManifestScope Scopes declare the available installation scopes for the package.
Either Cluster, Namespaced, or both. phases required
[]PackageManifestPhase Phases correspond to the references to the phases which are going to be the part of the ObjectDeployment/ClusterObjectDeployment. availabilityProbes []corev1alpha1.ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. config PackageManifestSpecConfig Configuration specification. images required
[]PackageManifestImage List of images to be resolved Used in:
PackageManifest PackageManifestSpecConfig # Field Description openAPIV3Schema apiextensionsv1.JSONSchemaProps OpenAPIV3Schema is the OpenAPI v3 schema to use for validation and pruning. Used in:
PackageManifestSpec PackageManifestTest # PackageManifestTest configures test cases.
Field Description template []PackageManifestTestCaseTemplate Template testing configuration. Used in:
PackageManifest PackageManifestTestCaseTemplate # PackageManifestTestCaseTemplate template testing configuration.
Field Description name required
string Name describing the test case. context TemplateContext Template data to use in the test case. Used in:
PackageManifestTest TemplateContext # TemplateContext is available within the package templating process.
Field Description package required
TemplateContextPackage Package object. config runtime.RawExtension Configuration as presented via the (Cluster)Package API after admission. environment required
PackageEnvironment Environment specific information. Used in:
PackageManifestTestCaseTemplate TemplateContextObjectMeta # TemplateContextObjectMeta represents a simplified version of metav1.ObjectMeta for use in templates.
Field Description name required
string namespace required
string labels required
map[string]string annotations required
map[string]string Used in:
TemplateContextPackage TemplateContextPackage # TemplateContextPackage represents the (Cluster)Package object requesting this package content.
Field Description metadata required
TemplateContextObjectMeta TemplateContextObjectMeta represents a simplified version of metav1.ObjectMeta for use in templates. Used in:
TemplateContext `}),e.add({id:17,href:"/docs/concepts/revisions/",title:"Revisions",description:"stateDiagram-v2 direction LR state &quot;Revision 1&quot; as rev1 state &quot;Revision 2&quot; as rev2 state &quot;Revision 3&quot; as rev3 [*] --&gt; rev1 rev1 --&gt; rev2 rev2 --&gt; rev3 rev3 --&gt; [*] Revisions are iterations and changes of a deployment over time. To support zero-downtime deployments, even if something goes wrong, Package Operator can manage multiple active revisions at the same time. This strategy is also often referred to as &ldquo;A/B deployment&rdquo; or &ldquo;canary deployment&rdquo;.",content:`stateDiagram-v2 direction LR state &quot;Revision 1&quot; as rev1 state &quot;Revision 2&quot; as rev2 state &quot;Revision 3&quot; as rev3 [*] --&gt; rev1 rev1 --&gt; rev2 rev2 --&gt; rev3 rev3 --&gt; [*] Revisions are iterations and changes of a deployment over time. To support zero-downtime deployments, even if something goes wrong, Package Operator can manage multiple active revisions at the same time. This strategy is also often referred to as &ldquo;A/B deployment&rdquo; or &ldquo;canary deployment&rdquo;.
A revision is represented by the ObjectSet/ClusterObjectSet APIs.
While revision are ordered on a time axis, Package Operator makes no assumptions on the contents of each revisions. This means that Revision 3 could contain the same spec as Revision 1, rolling back changes introduced by Revision 2.
Revision Lifecycle # stateDiagram-v2 direction LR state &quot;Not Ready&quot; as not_ready [*] --&gt; Pending Pending --&gt; Available Available --&gt; not_ready Pending --&gt; not_ready not_ready --&gt; Available Available --&gt; Archived not_ready --&gt; Archived Archived --&gt; [*] Pending
Intermediate state before the controller posted its first update. Available
All availability probes are successful. Not Ready
One or more availability probes are unsuccessful. Archived
(Cluster)ObjectSet is shutdown and only acts as a revision tombstone for rollbacks. In addition to these major lifecycle states, (Cluster)ObjectSets may be Paused, stopping reconciliation, while still reporting status. This can be useful for testing and debugging.
Rollout Handling # Depending on the contents of the new revision, objects are eventually either:
Patched
If the object still part of the new revision, it will be handed over to the next revision. Deleted
If the object is not part of the new revision, it will be deleted when the old revision is archived. In-Place Updates # flowchart LR subgraph Revision 1 deploy1[&quot;Deployment &lt;b&gt;my-deployment&lt;/b&gt;&lt;br&gt;image: my-image:rev1&quot;] end subgraph Revision 2 deploy2[&quot;Deployment &lt;b&gt;my-deployment&lt;/b&gt;&lt;br&gt;image: my-image:rev2&quot;] end deploy1--patched object--&gt;deploy2 &ldquo;In-Place&rdquo; updates happen when a new revision contains an object with the same name and type as the previous revision. Objects are handed over to a new revision and patched as needed.
When all objects have been handed over to a new revision, the previous revision is automatically archived.
Updating in-place may not provide any safety net.
If the Update fails, your deployment may face downtime. A/B Updates # flowchart LR subgraph Revision 1 deploy1[&quot;Deployment &lt;b&gt;my-deployment-v1&lt;/b&gt;&lt;br&gt;image: my-image:rev1&quot;] end subgraph Revision 2 deploy2[&quot;Deployment &lt;b&gt;my-deployment-v2&lt;/b&gt;&lt;br&gt;image: my-image:rev2&quot;] end deploy1-. indirect successor .-&gt;deploy2 A/B updates happen when a new revision does not contain an object with the same name and type as a previous revision. A new object is created in the new revision without affecting the old object.
The old revision is only archived when the new revision has completely finished its rollout and is &ldquo;Available&rdquo;.
Intermediate (Failed) Revisions # flowchart LR subgraph rev1[Revision 1] cm1[&quot;ConfigMap &lt;b&gt;my-config&lt;/b&gt;&lt;br&gt;data: {key: value-v1}&quot;] deploy1[&quot;Deployment &lt;b&gt;my-deployment-v1&lt;/b&gt;&lt;br&gt;image: my-image:rev1&quot;] end subgraph rev2[Revision 2] cm2[&quot;ConfigMap &lt;b&gt;my-config&lt;/b&gt;&lt;br&gt;data: {key: value-v2}&quot;] deploy2[&quot;Deployment &lt;b&gt;my-deployment-v2&lt;/b&gt;&lt;br&gt;image: my-image:does-not-exist&quot;] end subgraph rev3[Revision 3] cm3[&quot;ConfigMap &lt;b&gt;my-config&lt;/b&gt;&lt;br&gt;data: {key: value-v3}&quot;] deploy3[&quot;Deployment &lt;b&gt;my-deployment-v3&lt;/b&gt;&lt;br&gt;image: my-image:rev3&quot;] end style rev2 fill:#ffbabd,stroke:#9f7b7d deploy1--&gt;deploy2 deploy2--&gt;deploy3 cm1-.-&gt;cm2 cm2-.-&gt;cm3 Under normal circumstances at max 2 Revisions can be active during rollout. An old and a new revision.
If a revision fails to become available due to e.g. misconfiguration and a new revision supersedes it, multiple intermediate revisions might be active until the latest revision becomes available.
Intermediate revisions will only be cleaned up if:
Latest revision becomes available Revision is not reconciling any objects anymore Latest revision is not containing any object still actively reconciled by an intermediate This behavior is necessary, so Package Operator can ensure the safe handover of objects between revisions. In the example above, the ConfigMap &ldquo;my-config&rdquo; is handed over from revision 1 to revision 2 and in the end to revision 3.
As soon as revision 3 takes ownership of the ConfigMap, the failed intermediate revision 2 can be archived, as &ldquo;my-deployment-v2&rdquo; no longer exists in revision 3 and is thus safe to delete.
Internals # ObjectSet to ObjectSet Handover # apiVersion: package-operator.run/v1alpha1 kind: ObjectSet metadata: name: v1 spec: phases: - name: phase-1 objects: [{name: child-1}] - name: phase-2 objects: [{name: child-2}] --- apiVersion: package-operator.run/v1alpha1 kind: ObjectSet metadata: name: v2 spec: phases: - name: phase-1 objects: [{name: child-1}] - name: phase-2 objects: [{name: child-2}] previous: - name: v1 kind: ObjectSet group: package-operator.run sequenceDiagram autonumber participant v1 as ObjectSet v1 Reconciler participant api as kube-apiserver participant v2 as ObjectSet v2 Reconciler loop Reconciliation v1-&gt;&gt;api: reconcile/update child-1 .spec v1-&gt;&gt;api: reconcile/update child-2 .spec end Note over v2: phase-1 starts v2-&gt;&gt;api: Take ownership of child-1 and&lt;br&gt; reconcile/update .spec par ObjectSet v1 Reconciler api-)v1: child-1 Update event activate v1 v1-&gt;&gt;api: reconcile/update child-2 .spec deactivate v1 and ObjectSet v2 Reconciler api-)v2: child-1 Update event activate v2 v2-&gt;&gt;api: reconcile/update child-1 .spec deactivate v2 end Note over v1,v2: Until phase-1 completes loop Reconciliation v2-&gt;&gt;api: reconcile/update child-1 .spec v1-&gt;&gt;api: reconcile/update child-2 .spec end Note over v2: phase-2 starts v2-&gt;&gt;api: reconcile/update child-1 .spec activate v2 v2-&gt;&gt;api: Take ownership of child-2 and&lt;br&gt; reconcile/update .spec par ObjectSet v1 Reconciler api-)+v1: child-1 Update event deactivate v1 and ObjectSet v2 Reconciler api-)v2: child-1 Update event activate v2 v2-&gt;&gt;api: reconcile/update child-1 .spec v2-&gt;&gt;api: reconcile/update child-2 .spec deactivate v2 end `}),e.add({id:18,href:"/docs/concepts/package-format/",title:"Package Format",description:`Package Operator packages allow distributing all manifests that make up an application or operator deployment into a single artifact.
This artifact is just an empty container image containing a PackageManifest and the Kubernetes manifests in an optionally nested folder structure.
The Package or the ClusterPackage API is used to load these package container images into the cluster. This loading process will load the image contents into an ObjectDeployment.
Large Packages will automatically use the 'ObjectSlice' API to get around etcd object-size limitations.`,content:`Package Operator packages allow distributing all manifests that make up an application or operator deployment into a single artifact.
This artifact is just an empty container image containing a PackageManifest and the Kubernetes manifests in an optionally nested folder structure.
The Package or the ClusterPackage API is used to load these package container images into the cluster. This loading process will load the image contents into an ObjectDeployment.
Large Packages will automatically use the 'ObjectSlice' API to get around etcd object-size limitations.
More about this feature can be found on the \\"Big Packages\\" page. Package Structure # File Description manifest.yaml PackageManifest required README.md Long description or instructions for the package. .png/.svg Package icon referenced from manifest.yaml. Well-Known Labels # Well-Known Labels are applied automatically to all objects within a Package and the resulting ObjectDeployment to provide additional context.
Label Description package-operator.run/package Package object name. package-operator.run/version Version as stated in the PackageManifest. package-operator.run/provider Provider as stated in the PackageManifest. Well-Known Annotations # Well-Known Annotations are used to control the loading behavior of an object within a package.
Annotation Description package-operator.run/phase Assigns the object to a phase when loaded. Example # PackageManifest - manifest.yaml # apiVersion: manifests.package-operator.run/v1alpha1 kind: PackageManifest metadata: name: example spec: scopes: - Cluster - Namespaced phases: - name: phase-1 - name: phase-2 - name: phase-3 availabilityProbes: - probes: - condition: type: Available status: &quot;True&quot; - fieldsEqual: fieldA: .status.updatedReplicas fieldB: .status.replicas selector: kind: group: apps kind: Deployment test: {} Containerfile # FROM scratch ADD . /package Structure # package │ manifest.yaml │ README.md │ my-icon.png │ load-balancer.yaml │ └───frontend │ │ frontend-deployment.yaml │ │ frontend-service.yaml │ │ │ └───cache │ │ cache-db.yaml │ │ cache-config.yaml │ │ ... │ └───backend │ backend-deployment.yaml │ backend-config.yaml │ ... `}),e.add({id:19,href:"/docs/concepts/big-packages/",title:"Big Packages",description:`The most straightforward way of using the Package Operator APIs ObjectDeployment and ObjectSet is to define objects inline directly when creating an instance of these APIs.
etcd - the default Kubernetes database - has an object size limit of 1 MiB (etcd &lt;=v3.2) or 1.5 MiB (etcd &gt;v3.2).
Building packages containing multiple large objects, like CustomResourceDefinitions, or just contain a large number of objects, might run into these limits, when defining objects inline.`,content:`The most straightforward way of using the Package Operator APIs ObjectDeployment and ObjectSet is to define objects inline directly when creating an instance of these APIs.
etcd - the default Kubernetes database - has an object size limit of 1 MiB (etcd &lt;=v3.2) or 1.5 MiB (etcd &gt;v3.2).
Building packages containing multiple large objects, like CustomResourceDefinitions, or just contain a large number of objects, might run into these limits, when defining objects inline.
Slices API # To get around this limitation, Package Operator allows offloading big objects into an auxiliary API ObjectSlice. Instead of all objects being defined inline in the parent ObjectDeployment or ObjectSet one or multiple ObjectSlices can be specified.
In contrast to ObjectDeployments, ObjectSlices are immutable.
When updating an ObjectDeployment a new ObjectSlice needs to be created, which contains the desired changes. Only when referencing this new slice instead of the current slice from the ObjectDeployment, will the change be applied.
When using the 'Package' API, Package Operator will automatically split packages that reach a certain limit by using the 'ObjectSlice' API. Example # apiVersion: package-operator.run/v1alpha1 kind: ObjectSet metadata: name: example namespace: default spec: availabilityProbes: [] phases: - name: phase-1 objects: - object: # inline defined object apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment slices: # objects referenced from ObjectSlice API. - example-slice-001 - example-slice-002 - example-slice-003 --- apiVersion: package-operator.run/v1alpha1 kind: ObjectSlice metadata: name: example-slice-001 namespace: default spec: objects: - object: # defined object apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment-1 # ... `}),e.add({id:20,href:"/docs/concepts/hypershift-integration/",title:"HyperShift Integration",description:`HyperShift is middleware for hosting OpenShift control planes at scale.
In a nutshell, HyperShift uses a central Kubernetes cluster to host the control plane components of multiple &ldquo;guest&rdquo; Kubernetes clusters.
HyperShift architecture refers to these clusters as &ldquo;Management Cluster&rdquo; and &ldquo;Hosted Cluster&rdquo;.
This topology gives users a new place to install applications and cluster operators. These cluster extensions don&rsquo;t have to run on the Hosted Cluster, but can instead be pulled into the Management Cluster.`,content:`HyperShift is middleware for hosting OpenShift control planes at scale.
In a nutshell, HyperShift uses a central Kubernetes cluster to host the control plane components of multiple &ldquo;guest&rdquo; Kubernetes clusters.
HyperShift architecture refers to these clusters as &ldquo;Management Cluster&rdquo; and &ldquo;Hosted Cluster&rdquo;.
This topology gives users a new place to install applications and cluster operators. These cluster extensions don&rsquo;t have to run on the Hosted Cluster, but can instead be pulled into the Management Cluster.
Hosting components on the control-plane side has several advantages:
Access isolation to the Deployment from the Hosted Cluster Hosted Cluster can be scaled to zero workers without impact to the control plane Separated failure domain Reduced resource consumption In a lot of cases it also introduces a new challenge:
How can I coordinate the deployment in the Management and the Hosted Cluster?
That&rsquo;s where Package Operators HyperShift integration comes into play.
HyperShift Management Cluster
flowchart LR pko[&quot;Package Operator&quot;] subgraph Cluster 1 Namespace kube-apiserver1[&quot;kube-apiserver&quot;] pko-remote-phase1[&quot;PackageOperator&lt;br&gt;HyperShift Connector&quot;] package1[&quot;&lt;b&gt;extra component&lt;br&gt;Package&lt;/b&gt;&quot;] extra-component1[&quot;&lt;b&gt;extra component&lt;br&gt;Deployment&lt;/b&gt;&quot;] end subgraph cluster-1-inside[&quot;Cluster 1&lt;br&gt;(view into kube-apiserver)&quot;] extra-comp-rbac1[&quot;&lt;b&gt;extra component&lt;br&gt;RBAC&lt;/b&gt;&quot;] end pko---&gt;package1 kube-apiserver1-..-&gt;cluster-1-inside pko-- automatically&lt;br&gt;deploys --&gt;pko-remote-phase1 package1-- deploys --&gt;extra-component1 package1-- deploys --&gt;extra-comp-rbac1 When deployed to a HyperShift Management Cluster, Package Operator will automatically deploy a connector piece into every HyperShift Hosted Cluster Namespace, next to other control-plane components.
With this component in place, Packages and ObjectDeployments can choose to route objects to the Hosted Clusters kube-apiserver, by setting the class property of a phase to hosted-cluster.
Phases with and without the class property can be freely combined to coordinate rollout across the two clusters. e.g.:
create a Namespace and RBAC on the Hosted Cluster deploy an Operator on the Management Cluster create configuration objects in the Hosted Cluster Example YAML:
apiVersion: package-operator.run/v1alpha1 kind: ObjectDeployment spec: template: spec: phases: - name: rbac-and-stuff class: hosted-cluster objects: [] - name: deploy objects: [] - name: configure class: hosted-cluster objects: [] `}),e.add({id:21,href:"/docs/",title:"Docs",description:"Docs Doks.",content:""}),search.addEventListener("input",t,!0);function t(){const s=5;var n=this.value,o=e.search(n,{limit:s,enrich:!0});const t=new Map;for(const e of o.flatMap(e=>e.result)){if(t.has(e.doc.href))continue;t.set(e.doc.href,e.doc)}if(suggestions.innerHTML="",suggestions.classList.remove("d-none"),t.size===0&&n){const e=document.createElement("div");e.innerHTML=`No results for "<strong>${n}</strong>"`,e.classList.add("suggestion__no-results"),suggestions.appendChild(e);return}for(const[r,a]of t){const n=document.createElement("div");suggestions.appendChild(n);const e=document.createElement("a");e.href=r,n.appendChild(e);const o=document.createElement("span");o.textContent=a.title,o.classList.add("suggestion__title"),e.appendChild(o);const i=document.createElement("span");if(i.textContent=a.description,i.classList.add("suggestion__description"),e.appendChild(i),suggestions.appendChild(n),suggestions.childElementCount==s)break}}})()
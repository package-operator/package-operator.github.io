var suggestions=document.getElementById("suggestions"),search=document.getElementById("search");search!==null&&document.addEventListener("keydown",inputFocus);function inputFocus(e){e.ctrlKey&&e.key==="/"&&(e.preventDefault(),search.focus()),e.key==="Escape"&&(search.blur(),suggestions.classList.add("d-none"))}document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=suggestions.classList.contains("d-none");if(s)return;const t=[...suggestions.querySelectorAll("a")];if(t.length===0)return;const n=t.indexOf(document.activeElement);if(e.key==="ArrowUp"){e.preventDefault();const s=n>0?n-1:0;t[s].focus()}else if(e.key==="ArrowDown"){e.preventDefault();const s=n+1<t.length?n+1:n;t[s].focus()}}(function(){var e=new FlexSearch.Document({tokenize:"forward",cache:100,document:{id:"id",store:["href","title","description"],index:["title","description","content"]}});e.add({id:0,href:"/docs/getting_started/",title:"Getting Started",description:"",content:""}),e.add({id:1,href:"/docs/getting_started/introduction/",title:"Introduction",description:`Package Operator is a Kubernetes Operator for packaging and managing a collection of arbitrary Kubernetes objects.
Helping users in installing and maintaining complex software on one or multiple clusters.
Highlights # No Surprises Ordered Installation and Removal Operating Transparency Extensible Declarative APIs Plug and Play Cheap Failures and Easy Recovery Rollout History Rollback Objectives # Security, Stability, Transparency, Extensibility
(in this order)
Security # A Kubernetes package manager is entrusted with a very high level of permissions on one or multiple clusters and also works with secrets as part of package configuration.`,content:` Package Operator is a Kubernetes Operator for packaging and managing a collection of arbitrary Kubernetes objects.
Helping users in installing and maintaining complex software on one or multiple clusters.
Highlights # No Surprises Ordered Installation and Removal Operating Transparency Extensible Declarative APIs Plug and Play Cheap Failures and Easy Recovery Rollout History Rollback Objectives # Security, Stability, Transparency, Extensibility
(in this order)
Security # A Kubernetes package manager is entrusted with a very high level of permissions on one or multiple clusters and also works with secrets as part of package configuration. Without putting security of these credentials first, users will not be able to trust Package Operator.
Stability # Stability enables any other feature in the Package Operator and makes or breaks it\u0026rsquo;s whole value proposition. Because many day-2 operations, like patching, updating and re-configuration can be orchestrated via Package Operator, a miss-behaving or broken Package Operator can spell doom to any production environment.
Package Operator commits to stability and extensive automated testing for any feature being implemented.
Transparency # Stability is never absolute, so it\u0026rsquo;s crucial to be transparent.
Transparency enables users of the Package Operator to debug and resolve issues, with either their own workloads or the Package Operator itself, in a timely and sane manner.
Extensibility # The Kubernetes ecosystem is moving fast, really fast.
New Operators, APIs, procedures and tools are being created at an astounding pace.
Package Operator tries to be plug-able, allowing users to use any kind of custom resource registered on the Kubernetes cluster. Facilities of Package Operator are also setup to be overridden, so they can be switched for custom or alternative implementations.
`}),e.add({id:2,href:"/docs/guides/packaging-an-application/",title:"Packaging an Application",description:"",content:""}),e.add({id:3,href:"/docs/getting_started/architecture/",title:"Architecture",description:"",content:""}),e.add({id:4,href:"/docs/guides/installing-packages/",title:"Installing Packages",description:"",content:""}),e.add({id:5,href:"/docs/guides/packaging-an-operator/",title:"Packaging an Operator",description:"",content:""}),e.add({id:6,href:"/docs/getting_started/requirements/",title:"Requirements",description:"",content:""}),e.add({id:7,href:"/docs/guides/",title:"Guides",description:"",content:""}),e.add({id:8,href:"/docs/getting_started/installation/",title:"Installation",description:"",content:""}),e.add({id:9,href:"/docs/help/",title:"Help",description:"Help Doks.",content:""}),e.add({id:10,href:"/docs/help/how-to-update/",title:"How to Update",description:"Regularly update the installed npm packages to keep your Doks website stable, usable, and secure.",content:` 💡 Learn more about semantic versioning and advanced range syntax. Check for outdated packages # The npm outdated command will check the registry to see if any (or, specific) installed packages are currently outdated:
npm outdated [[\u0026lt;@scope\u0026gt;/]\u0026lt;pkg\u0026gt; ...] Update packages # The npm update command will update all the packages listed to the latest version (specified by the tag config), respecting semver:
npm update [\u0026lt;pkg\u0026gt;...] `}),e.add({id:11,href:"/docs/help/troubleshooting/",title:"Troubleshooting",description:"Solutions to common problems.",content:`Problems updating npm packages # Delete the ./node_modules folder, and run again:
npm install Problems with cache # Delete the temporary directories:
npm run clean `}),e.add({id:12,href:"/docs/help/faq/",title:"FAQ",description:"Answers to frequently asked questions.",content:`Hyas? # Doks is a Hyas theme build by the creator of Hyas.
Footer notice? # Please keep it in place.
Keyboard shortcuts for search? # focus: Ctrl + / select: ↓ and ↑ open: Enter close: Esc Other documentation? # Netlify Hugo Can I get support? # Create a topic:
Netlify Community Hugo Forums Doks Discussions Contact the creator? # Send h-enk a message:
Netlify Community Hugo Forums Doks Discussions `}),e.add({id:13,href:"/docs/getting_started/api-reference/",title:"API Reference",description:`The Package Operator APIs are an extension of the Kubernetes API using CustomResourceDefinitions. These new APIs can be interacted with like any other Kubernetes object using e.g. kubectl.
APIs follows the same API versioning guidelines as the main Kubernetes project.
Versioning principles. Taken from the Kubernetes API versioning documentation:
Alpha
The version names contain alpha (for example, v1alpha1). The software may contain bugs. Enabling a feature may expose bugs. A feature may be disabled by default.`,content:`The Package Operator APIs are an extension of the Kubernetes API using CustomResourceDefinitions. These new APIs can be interacted with like any other Kubernetes object using e.g. kubectl.
APIs follows the same API versioning guidelines as the main Kubernetes project.
Versioning principles. Taken from the Kubernetes API versioning documentation:
Alpha
The version names contain alpha (for example, v1alpha1). The software may contain bugs. Enabling a feature may expose bugs. A feature may be disabled by default. The support for a feature may be dropped at any time without notice. The API may change in incompatible ways in a later software release without notice. The software is recommended for use only in short-lived testing clusters, due to increased risk of bugs and lack of long-term support. Beta
The version names contain beta (for example, v2beta3). The software is well tested. Enabling a feature is considered safe. Features are enabled by default. The support for a feature will not be dropped, though the details may change. The schema and/or semantics of objects may change in incompatible ways in a subsequent beta or stable release. When this happens, migration instructions are provided. Schema changes may require deleting, editing, and re-creating API objects. The editing process may not be straightforward. The migration may require downtime for applications that rely on the feature. The software is not recommended for production uses. Subsequent releases may introduce incompatible changes. If you have multiple clusters which can be upgraded independently, you may be able to relax this restriction. Stable
The version name is vX where X is an integer. The stable versions of features appear in released software for many subsequent versions. package-operator.run/v1alpha1 # The package v1alpha1 contains API Schema definitions for the v1alpha1 version of the core Package Operator API group, containing basic building blocks that other auxiliary APIs can build on top of.
ClusterObjectSet ClusterObjectSetPhase ObjectSet ObjectSetPhase ClusterObjectSet # ClusterObjectSet reconciles a collection of objects through ordered phases and aggregates their status.
ClusterObjectSets behave similarly to Kubernetes ReplicaSets, by managing a collection of objects and being itself mostly immutable. This object type is able to suspend/pause reconciliation of specific objects to facilitate the transition between revisions.
Archived ClusterObjectSets may stay on the cluster, to store information about previous revisions.
A Namespace-scoped version of this API is available as ObjectSet.
Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectSet metadata: name: example spec: availabilityProbes: - probes: - condition: status: \u0026quot;True\u0026quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment lifecycleState: Active phases: - class: dolor name: ipsum objects: - object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment previous: - group: lorem kind: ObjectSet name: previous-revision status: phase: Pending Field Description metadata metav1.ObjectMeta spec ClusterObjectSetSpec ClusterObjectSetSpec defines the desired state of a ClusterObjectSet. status ClusterObjectSetStatus ClusterObjectSetStatus defines the observed state of a ClusterObjectSet. ClusterObjectSetPhase # ClusterObjectSetPhase is an internal API, allowing a ClusterObjectSet to delegate a single phase to another custom controller. ClusterObjectSets will create subordinate ClusterObjectSetPhases when .class is set within the phase specification.
Example
apiVersion: package-operator.run/v1alpha1 kind: ClusterObjectSetPhase metadata: name: example spec: availabilityProbes: - probes: - condition: status: \u0026quot;True\u0026quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment class: consetetur lifecycleState: Active name: amet objects: - object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment previous: - group: sit kind: ObjectSet name: previous-revision revision: 42 status: conditions: - status: \u0026quot;True\u0026quot; type: Available Field Description metadata metav1.ObjectMeta spec ClusterObjectSetPhaseSpec ClusterObjectSetPhaseSpec defines the desired state of a ClusterObjectSetPhase. status ClusterObjectSetPhaseStatus ClusterObjectSetPhaseStatus defines the observed state of a ClusterObjectSetPhase. ObjectSet # ObjectSet reconciles a collection of objects through ordered phases and aggregates their status.
ObjectSets behave similarly to Kubernetes ReplicaSets, by managing a collection of objects and being itself mostly immutable. This object type is able to suspend/pause reconciliation of specific objects to facilitate the transition between revisions.
Archived ObjectSets may stay on the cluster, to store information about previous revisions.
A Cluster-scoped version of this API is available as ClusterObjectSet.
Example
apiVersion: package-operator.run/v1alpha1 kind: ObjectSet metadata: name: example namespace: default spec: availabilityProbes: - probes: - condition: status: \u0026quot;True\u0026quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment lifecycleState: Active phases: - class: sed name: elitr objects: - object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment previous: - group: sadipscing kind: ObjectSet name: previous-revision status: phase: Pending Field Description metadata metav1.ObjectMeta spec ObjectSetSpec ObjectSetSpec defines the desired state of a ObjectSet. status ObjectSetStatus ObjectSetStatus defines the observed state of a ObjectSet. ObjectSetPhase # ObjectSetPhase is an internal API, allowing an ObjectSet to delegate a single phase to another custom controller. ObjectSets will create subordinate ObjectSetPhases when .class within the phase specification is set.
Example
apiVersion: package-operator.run/v1alpha1 kind: ObjectSetPhase metadata: name: example namespace: default spec: availabilityProbes: - probes: - condition: status: \u0026quot;True\u0026quot; type: Available fieldsEqual: fieldA: .spec.fieldA fieldB: .status.fieldB selector: kind: group: apps kind: Deployment class: eirmod lifecycleState: Active name: nonumy objects: - object: apiVersion: apps/v1 kind: Deployment metadata: name: example-deployment previous: - group: diam kind: ObjectSet name: previous-revision revision: 42 status: conditions: - status: \u0026quot;True\u0026quot; type: Available Field Description metadata metav1.ObjectMeta spec ObjectSetPhaseSpec ObjectSetPhaseSpec defines the desired state of a ObjectSetPhase. status ObjectSetPhaseStatus ObjectSetPhaseStatus defines the observed state of a ObjectSetPhase. ClusterObjectSetPhaseSpec # ClusterObjectSetPhaseSpec defines the desired state of a ClusterObjectSetPhase.
Field Description lifecycleState ObjectSetLifecycleState Specifies the lifecycle state of the ClusterObjectSetPhase. revision required
int64 Revision of the parent ObjectSet to use during object adoption. previous []PreviousRevisionReference Previous revisions of the ClusterObjectSet to adopt objects from. availabilityProbes required
[]ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. name required
string Name of the reconcile phase. Must be unique within a ObjectSet. class string If non empty, the ObjectSet controller will delegate phase reconciliation to another controller, by creating an ObjectSetPhase object.
If set to the string \u0026ldquo;default\u0026rdquo; the built-in Package Operator ObjectSetPhase controller will reconcile the object in the same way the ObjectSet would.
If set to any other string, an out-of-tree controller needs to be present to handle ObjectSetPhase objects. objects required
[]ObjectSetObject Objects belonging to this phase. Used in:
ClusterObjectSetPhase ClusterObjectSetPhaseStatus # ClusterObjectSetPhaseStatus defines the observed state of a ClusterObjectSetPhase.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. Used in:
ClusterObjectSetPhase ClusterObjectSetSpec # ClusterObjectSetSpec defines the desired state of a ClusterObjectSet.
Field Description lifecycleState ObjectSetLifecycleState Specifies the lifecycle state of the ClusterObjectSet. previous []PreviousRevisionReference Previous revisions of the ClusterObjectSet to adopt objects from. phases required
[]ObjectSetTemplatePhase Reconcile phase configuration for a ObjectSet.
Phases will be reconciled in order and the contained objects checked
against given probes before continuing with the next phase. availabilityProbes required
[]ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. Used in:
ClusterObjectSet ClusterObjectSetStatus # ClusterObjectSetStatus defines the observed state of a ClusterObjectSet.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. phase ObjectSetStatusPhase Deprecated: This field is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. revision int64 Computed revision number, monotonically increasing. Used in:
ClusterObjectSet ObjectSetObject # An object that is part of the phase of an ObjectSet.
Field Description object required
runtime.RawExtension Used in:
ClusterObjectSetPhaseSpec ObjectSetPhaseSpec ObjectSetTemplatePhase ObjectSetPausedObject # Specifies that the reconciliation of a specific object should be paused.
Field Description kind required
string Object Kind. group required
string Object Group. name required
string Object Name. Used in:
ObjectSetPhaseSpec # ObjectSetPhaseSpec defines the desired state of a ObjectSetPhase.
Field Description lifecycleState ObjectSetLifecycleState Specifies the lifecycle state of the ObjectSetPhase. revision required
int64 Revision of the parent ObjectSet to use during object adoption. previous []PreviousRevisionReference Previous revisions of the ClusterObjectSet to adopt objects from. availabilityProbes required
[]ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. name required
string Name of the reconcile phase. Must be unique within a ObjectSet. class string If non empty, the ObjectSet controller will delegate phase reconciliation to another controller, by creating an ObjectSetPhase object.
If set to the string \u0026ldquo;default\u0026rdquo; the built-in Package Operator ObjectSetPhase controller will reconcile the object in the same way the ObjectSet would.
If set to any other string, an out-of-tree controller needs to be present to handle ObjectSetPhase objects. objects required
[]ObjectSetObject Objects belonging to this phase. Used in:
ObjectSetPhase ObjectSetPhaseStatus # ObjectSetPhaseStatus defines the observed state of a ObjectSetPhase.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. Used in:
ObjectSetPhase ObjectSetProbe # ObjectSetProbe define how ObjectSets check their children for their status.
Field Description probes required
[]Probe Probe configuration parameters. selector required
ProbeSelector Selector specifies which objects this probe should target. Used in:
ClusterObjectSetPhaseSpec ClusterObjectSetSpec ObjectSetPhaseSpec ObjectSetSpec ObjectSetSpec # ObjectSetSpec defines the desired state of a ObjectSet.
Field Description lifecycleState ObjectSetLifecycleState Specifies the lifecycle state of the ObjectSet. previous []PreviousRevisionReference Previous revisions of the ObjectSet to adopt objects from. phases required
[]ObjectSetTemplatePhase Reconcile phase configuration for a ObjectSet.
Phases will be reconciled in order and the contained objects checked
against given probes before continuing with the next phase. availabilityProbes required
[]ObjectSetProbe Availability Probes check objects that are part of the package.
All probes need to succeed for a package to be considered Available.
Failing probes will prevent the reconciliation of objects in later phases. Used in:
ObjectSet ObjectSetStatus # ObjectSetStatus defines the observed state of a ObjectSet.
Field Description conditions []metav1.Condition Conditions is a list of status conditions ths object is in. phase ObjectSetStatusPhase Deprecated: This field is not part of any API contract
it will go away as soon as kubectl can print conditions!
When evaluating object state in code, use .Conditions instead. revision int64 Computed revision number, monotonically increasing. Used in:
ObjectSet ObjectSetTemplatePhase # ObjectSet reconcile phase.
Field Description name required
string Name of the reconcile phase. Must be unique within a ObjectSet. class string If non empty, the ObjectSet controller will delegate phase reconciliation to another controller, by creating an ObjectSetPhase object.
If set to the string \u0026ldquo;default\u0026rdquo; the built-in Package Operator ObjectSetPhase controller will reconcile the object in the same way the ObjectSet would.
If set to any other string, an out-of-tree controller needs to be present to handle ObjectSetPhase objects. objects required
[]ObjectSetObject Objects belonging to this phase. Used in:
ClusterObjectSetSpec ObjectSetSpec PackageProbeKindSpec # Kind package probe parameters.
Field Description group required
string Object Group to apply a probe to. kind required
string Object Kind to apply a probe to. Used in:
ProbeSelector PreviousRevisionReference # References a previous revision of an ObjectSet, ClusterObjectSet, ObjectSetPhase or ClusterObjectSetPhase.
Field Description name required
string Name of a previous revision. kind required
string Object kind of a previous revision. group required
string Object group of a previous revision. Used in:
ClusterObjectSetPhaseSpec ClusterObjectSetSpec ObjectSetPhaseSpec ObjectSetSpec Probe # Defines probe parameters to check parts of a package.
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
Field Description kind PackageProbeKindSpec Selects objects based on Kinda and API Group. Used in:
ObjectSetProbe `}),e.add({id:14,href:"/docs/help/revisions/",title:"Revisions",description:"stateDiagram-v2 direction LR state \u0026quot;Revision 1\u0026quot; as rev1 state \u0026quot;Revision 2\u0026quot; as rev2 state \u0026quot;Revision 3\u0026quot; as rev3 [*] --\u0026gt; rev1 rev1 --\u0026gt; rev2 rev2 --\u0026gt; rev3 rev3 --\u0026gt; [*] Revisions are iterations and changes of a deployment over time. To support zero-downtime deployments, even if something goes wrong, Package Operator can manage multiple active revisions at the same time. This strategy is also often referred to as \u0026ldquo;A/B deployment\u0026rdquo; or \u0026ldquo;canary deployment\u0026rdquo;.",content:`stateDiagram-v2 direction LR state \u0026quot;Revision 1\u0026quot; as rev1 state \u0026quot;Revision 2\u0026quot; as rev2 state \u0026quot;Revision 3\u0026quot; as rev3 [*] --\u0026gt; rev1 rev1 --\u0026gt; rev2 rev2 --\u0026gt; rev3 rev3 --\u0026gt; [*] Revisions are iterations and changes of a deployment over time. To support zero-downtime deployments, even if something goes wrong, Package Operator can manage multiple active revisions at the same time. This strategy is also often referred to as \u0026ldquo;A/B deployment\u0026rdquo; or \u0026ldquo;canary deployment\u0026rdquo;.
A revision is represented by the ObjectSet/ClusterObjectSet APIs.
While revision are ordered on a time axis, Package Operator makes no assumptions on the contents of each revisions. This means that Revision 3 could contain the same spec as Revision 1, rolling back changes introduced by Revision 2.
Revision Lifecycle # stateDiagram-v2 direction LR state \u0026quot;Not Ready\u0026quot; as not_ready [*] --\u0026gt; Pending Pending --\u0026gt; Available Available --\u0026gt; not_ready Pending --\u0026gt; not_ready not_ready --\u0026gt; Available Available --\u0026gt; Archived not_ready --\u0026gt; Archived Archived --\u0026gt; [*] Pending
Intermediate state before the controller posted it\u0026rsquo;s first update. Available
All availability probes are successful. Not Ready
One or more availability probes are unsuccessful. Archived
(Cluster)ObjectSet is shutdown and only acts as a revision tombstone for rollbacks. Additionally to these major lifecycle states, (Cluster)ObjectSets may be Paused, stopping reconciliation, while still reporting status. This can be useful for testing and debugging.
Rollout Handling # Depending on the contents of the new revision, objects are eventually either:
Patched
If the object still part of the new revision, it will be handed over to the next revision. Deleted
If the object is not part of the new revision, it will be deleted when the old revision is archived. In-Place Updates # flowchart LR subgraph Revision 1 deploy1[\u0026quot;Deployment \u0026lt;b\u0026gt;my-deployment\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;image: my-image:rev1\u0026quot;] end subgraph Revision 2 deploy2[\u0026quot;Deployment \u0026lt;b\u0026gt;my-deployment\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;image: my-image:rev2\u0026quot;] end deploy1--patched object--\u0026gt;deploy2 \u0026ldquo;In-Place\u0026rdquo; updates happen when a new revision contains an object with the same type and name as the previous revision. Objects are handed over to a new revision and patched as needed.
When all objects have been handed over to a new revision, the previous revision is automatically archived.
Updating in-place may not provide any safety net.
If the Update fails, your deployment may face downtime. A/B Updates # flowchart LR subgraph Revision 1 deploy1[\u0026quot;Deployment \u0026lt;b\u0026gt;my-deployment-v1\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;image: my-image:rev1\u0026quot;] end subgraph Revision 2 deploy2[\u0026quot;Deployment \u0026lt;b\u0026gt;my-deployment-v2\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;image: my-image:rev2\u0026quot;] end deploy1-. indirect successor .-\u0026gt;deploy2 A/B updates happen when a new revision does not contain an object with the same type and name as a previous revision. A new object is created in the new revision without affecting the old object.
The old revision is only archived when the new revision has completely finished its rollout and is \u0026ldquo;Available\u0026rdquo;.
Intermediate (Failed) Revisions # flowchart LR subgraph rev1[Revision 1] cm1[\u0026quot;ConfigMap \u0026lt;b\u0026gt;my-config\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;data: {key: value-v1}\u0026quot;] deploy1[\u0026quot;Deployment \u0026lt;b\u0026gt;my-deployment-v1\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;image: my-image:rev1\u0026quot;] end subgraph rev2[Revision 2] cm2[\u0026quot;ConfigMap \u0026lt;b\u0026gt;my-config\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;data: {key: value-v2}\u0026quot;] deploy2[\u0026quot;Deployment \u0026lt;b\u0026gt;my-deployment-v2\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;image: my-image:does-not-exist\u0026quot;] end subgraph rev3[Revision 3] cm3[\u0026quot;ConfigMap \u0026lt;b\u0026gt;my-config\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;data: {key: value-v3}\u0026quot;] deploy3[\u0026quot;Deployment \u0026lt;b\u0026gt;my-deployment-v3\u0026lt;/b\u0026gt;\u0026lt;br\u0026gt;image: my-image:rev3\u0026quot;] end style rev2 fill:#ffbabd,stroke:#9f7b7d deploy1--\u0026gt;deploy2 deploy2--\u0026gt;deploy3 cm1-.-\u0026gt;cm2 cm2-.-\u0026gt;cm3 Under normal circumstances at max 2 Revisions might be active during rollout. An old and a new revision.
If a revision fails to become available due to e.g. misconfiguration and a new revision supersedes it, multiple intermediate revisions might be active until the latest revision becomes available.
Intermediate revisions will only be Cleaned up if:
Latest revision becomes available Revision is not reconciling any objects anymore Latest revision is not containing any object still actively reconciled by an intermediate This behavior is necessary, so Package Operator can ensure the safe handover of objects between revisions. In the example above, the ConfigMap \u0026ldquo;my-config\u0026rdquo; is handed over from revision 1 to revision 2 and in the end to revision 3.
As soon as revision 3 takes ownership of the ConfigMap, the failed intermediate revision 2 can be archived, as \u0026ldquo;my-deployment-v2\u0026rdquo; no longer exists in revision 3 and is thus save to delete.
Internals # ObjectSet to ObjectSet Handover # apiVersion: package-operator.run/v1alpha1 kind: ObjectSet metadata: name: v1 spec: phases: - name: phase-1 objects: [{name: child-1}] - name: phase-2 objects: [{name: child-2}] --- apiVersion: package-operator.run/v1alpha1 kind: ObjectSet metadata: name: v2 spec: phases: - name: phase-1 objects: [{name: child-1}] - name: phase-2 objects: [{name: child-2}] previous: - name: v1 kind: ObjectSet group: package-operator.run sequenceDiagram autonumber participant v1 as ObjectSet v1 Reconciler participant api as kube-apiserver participant v2 as ObjectSet v2 Reconciler loop Reconciliation v1-\u0026gt;\u0026gt;api: reconcile/update child-1 .spec v1-\u0026gt;\u0026gt;api: reconcile/update child-2 .spec end Note over v2: phase-1 starts v2-\u0026gt;\u0026gt;api: Take ownership of child-1 and\u0026lt;br\u0026gt; reconcile/update .spec par ObjectSet v1 Reconciler api-)v1: child-1 Update event activate v1 v1-\u0026gt;\u0026gt;api: reconcile/update child-2 .spec deactivate v1 and ObjectSet v2 Reconciler api-)v2: child-1 Update event activate v2 v2-\u0026gt;\u0026gt;api: reconcile/update child-1 .spec deactivate v2 end Note over v1,v2: Until phase-1 completes loop Reconciliation v2-\u0026gt;\u0026gt;api: reconcile/update child-1 .spec v1-\u0026gt;\u0026gt;api: reconcile/update child-2 .spec end Note over v2: phase-2 starts v2-\u0026gt;\u0026gt;api: reconcile/update child-1 .spec activate v2 v2-\u0026gt;\u0026gt;api: Take ownership of child-2 and\u0026lt;br\u0026gt; reconcile/update .spec par ObjectSet v1 Reconciler api-)+v1: child-1 Update event deactivate v1 and ObjectSet v2 Reconciler api-)v2: child-1 Update event activate v2 v2-\u0026gt;\u0026gt;api: reconcile/update child-1 .spec v2-\u0026gt;\u0026gt;api: reconcile/update child-2 .spec deactivate v2 end `}),e.add({id:15,href:"/docs/",title:"Docs",description:"Docs Doks.",content:""}),search.addEventListener("input",t,!0);function t(){const s=5;var n=this.value,o=e.search(n,{limit:s,enrich:!0});const t=new Map;for(const e of o.flatMap(e=>e.result)){if(t.has(e.doc.href))continue;t.set(e.doc.href,e.doc)}if(suggestions.innerHTML="",suggestions.classList.remove("d-none"),t.size===0&&n){const e=document.createElement("div");e.innerHTML=`No results for "<strong>${n}</strong>"`,e.classList.add("suggestion__no-results"),suggestions.appendChild(e);return}for(const[r,a]of t){const n=document.createElement("div");suggestions.appendChild(n);const e=document.createElement("a");e.href=r,n.appendChild(e);const o=document.createElement("span");o.textContent=a.title,o.classList.add("suggestion__title"),e.appendChild(o);const i=document.createElement("span");if(i.textContent=a.description,i.classList.add("suggestion__description"),e.appendChild(i),suggestions.appendChild(n),suggestions.childElementCount==s)break}}})()
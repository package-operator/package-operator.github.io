---
title: "API Reference"
draft: false
images: []
weight: 700
toc: false
---

The Package Operator APIs are an extension of the [Kubernetes API](https://kubernetes.io/docs/reference/using-api/api-overview/) using `CustomResourceDefinitions`. These new APIs can be interacted with like any other Kubernetes object using e.g. `kubectl`.

APIs follows the same API versioning guidelines as the main Kubernetes project.

{{< details "Versioning principles." >}}
_Taken from the [Kubernetes API versioning documentation](https://kubernetes.io/docs/reference/using-api/#api-versioning):_

- **Alpha**
  - The version names contain alpha (for example, `v1alpha1`).
  - The software may contain bugs. Enabling a feature may expose bugs. A feature may be disabled by default.
  - The support for a feature may be dropped at any time without notice.
  - The API may change in incompatible ways in a later software release without notice.
  - The software is recommended for use only in short-lived testing clusters, due to increased risk of bugs and lack of long-term support.

- **Beta**
  - The version names contain beta (for example, `v2beta3`).
  - The software is well tested. Enabling a feature is considered safe. Features are enabled by default.
  - The support for a feature will not be dropped, though the details may change.
  - The schema and/or semantics of objects may change in incompatible ways in a subsequent beta or stable release. When this happens, migration instructions are provided. Schema changes may require deleting, editing, and re-creating API objects. The editing process may not be straightforward. The migration may require downtime for applications that rely on the feature.
  - The software is not recommended for production uses. Subsequent releases may introduce incompatible changes. If you have multiple clusters which can be upgraded independently, you may be able to relax this restriction.

- **Stable**
  - The version name is `vX` where `X` is an integer.
  - The stable versions of features appear in released software for many subsequent versions.
{{< /details >}}

## package-operator.run/v1alpha1

The package v1alpha1 contains API Schema definitions for the v1alpha1 version of the core Package Operator API group,
containing basic building blocks that other auxiliary APIs can build on top of.

* [ClusterObjectSet](#clusterobjectset)
* [ObjectSet](#objectset)


### ClusterObjectSet

ClusterObjectSet reconciles a collection of objects through ordered phases and aggregates their status.

ClusterObjectSets behave similarly to Kubernetes ReplicaSets, by managing a collection of objects and being itself mostly immutable.
This object type is able to suspend/pause reconciliation of specific objects to facilitate the transition between revisions.

Archived ClusterObjectSets may stay on the cluster, to store information about previous revisions.

A Namespace-scoped version of this API is available as ObjectSet.


**Example**

```yaml
apiVersion: package-operator.run/v1alpha1
kind: ClusterObjectSet
metadata:
  name: example
spec:
  availabilityProbes:
  - probes:
    - condition:
        status: "True"
        type: Available
      fieldsEqual:
        fieldA: .spec.fieldA
        fieldB: .status.fieldB
    selector:
      kind:
        group: apps
        kind: Deployment
  lifecycleState: Active
  pausedFor:
  - group: apps
    kind: Deployment
    name: example-deployment
  phases:
  - name: lorem
    objects:
    - object:
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: example-deployment
status:
  phase: Pending

```


| Field | Description |
| ----- | ----------- |
| `metadata` <br>metav1.ObjectMeta |  |
| `spec` <br><a href="#clusterobjectsetspec">ClusterObjectSetSpec</a> | ClusterObjectSetSpec defines the desired state of a ClusterObjectSet. |
| `status` <br><a href="#clusterobjectsetstatus">ClusterObjectSetStatus</a> | ClusterObjectSetStatus defines the observed state of a ClusterObjectSet. |


### ObjectSet

ObjectSet reconciles a collection of objects through ordered phases and aggregates their status.

ObjectSets behave similarly to Kubernetes ReplicaSets, by managing a collection of objects and being itself mostly immutable.
This object type is able to suspend/pause reconciliation of specific objects to facilitate the transition between revisions.

Archived ObjectSets may stay on the cluster, to store information about previous revisions.

A Cluster-scoped version of this API is available as ClusterObjectSet.


**Example**

```yaml
apiVersion: package-operator.run/v1alpha1
kind: ObjectSet
metadata:
  name: example
  namespace: default
spec:
  availabilityProbes:
  - probes:
    - condition:
        status: "True"
        type: Available
      fieldsEqual:
        fieldA: .spec.fieldA
        fieldB: .status.fieldB
    selector:
      kind:
        group: apps
        kind: Deployment
  lifecycleState: Active
  pausedFor:
  - group: apps
    kind: Deployment
    name: example-deployment
  phases:
  - name: ipsum
    objects:
    - object:
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: example-deployment
status:
  phase: Pending

```


| Field | Description |
| ----- | ----------- |
| `metadata` <br>metav1.ObjectMeta |  |
| `spec` <br><a href="#objectsetspec">ObjectSetSpec</a> | ObjectSetSpec defines the desired state of a ObjectSet. |
| `status` <br><a href="#objectsetstatus">ObjectSetStatus</a> | ObjectSetStatus defines the observed state of a ObjectSet. |




---

### ClusterObjectSetSpec

ClusterObjectSetSpec defines the desired state of a ClusterObjectSet.

| Field | Description |
| ----- | ----------- |
| `lifecycleState` <br><a href="#objectsetlifecyclestate">ObjectSetLifecycleState</a> | Specifies the lifecycle state of the ClusterObjectSet. |
| `pausedFor` <br><a href="#objectsetpausedobject">[]ObjectSetPausedObject</a> | Pause reconciliation of specific objects, while still reporting status. |
| `phases` <b>required</b><br><a href="#objectsettemplatephase">[]ObjectSetTemplatePhase</a> | Reconcile phase configuration for a ObjectSet.<br>Phases will be reconciled in order and the contained objects checked<br>against given probes before continuing with the next phase. |
| `availabilityProbes` <b>required</b><br><a href="#objectsetprobe">[]ObjectSetProbe</a> | Availability Probes check objects that are part of the package.<br>All probes need to succeed for a package to be considered Available.<br>Failing probes will prevent the reconciliation of objects in later phases. |


Used in:
* [ClusterObjectSet](#clusterobjectset)


### ClusterObjectSetStatus

ClusterObjectSetStatus defines the observed state of a ClusterObjectSet.

| Field | Description |
| ----- | ----------- |
| `conditions` <br>[]metav1.Condition | Conditions is a list of status conditions ths object is in. |
| `phase` <br><a href="#objectsetstatusphase">ObjectSetStatusPhase</a> | Deprecated: This field is not part of any API contract<br>it will go away as soon as kubectl can print conditions!<br>When evaluating object state in code, use .Conditions instead. |
| `pausedFor` <br><a href="#objectsetpausedobject">[]ObjectSetPausedObject</a> | List of objects the controller has paused reconciliation on. |


Used in:
* [ClusterObjectSet](#clusterobjectset)


### ObjectSetObject

An object that is part of the phase of an ObjectSet.

| Field | Description |
| ----- | ----------- |
| `object` <b>required</b><br>runtime.RawExtension |  |


Used in:
* [ObjectSetTemplatePhase](#objectsettemplatephase)


### ObjectSetPausedObject

Specifies that the reconciliation of a specific object should be paused.

| Field | Description |
| ----- | ----------- |
| `kind` <b>required</b><br>string | Object Kind. |
| `group` <b>required</b><br>string | Object Group. |
| `name` <b>required</b><br>string | Object Name. |


Used in:
* [ClusterObjectSetSpec](#clusterobjectsetspec)
* [ClusterObjectSetStatus](#clusterobjectsetstatus)
* [ObjectSetSpec](#objectsetspec)
* [ObjectSetStatus](#objectsetstatus)


### ObjectSetProbe

ObjectSetProbe define how ObjectSets check their children for their status.

| Field | Description |
| ----- | ----------- |
| `probes` <b>required</b><br><a href="#probe">[]Probe</a> | Probe configuration parameters. |
| `selector` <b>required</b><br><a href="#probeselector">ProbeSelector</a> | Selector specifies which objects this probe should target. |


Used in:
* [ClusterObjectSetSpec](#clusterobjectsetspec)
* [ObjectSetSpec](#objectsetspec)


### ObjectSetSpec

ObjectSetSpec defines the desired state of a ObjectSet.

| Field | Description |
| ----- | ----------- |
| `lifecycleState` <br><a href="#objectsetlifecyclestate">ObjectSetLifecycleState</a> | Specifies the lifecycle state of the ObjectSet. |
| `pausedFor` <br><a href="#objectsetpausedobject">[]ObjectSetPausedObject</a> | Pause reconciliation of specific objects, while still reporting status. |
| `phases` <b>required</b><br><a href="#objectsettemplatephase">[]ObjectSetTemplatePhase</a> | Reconcile phase configuration for a ObjectSet.<br>Phases will be reconciled in order and the contained objects checked<br>against given probes before continuing with the next phase. |
| `availabilityProbes` <b>required</b><br><a href="#objectsetprobe">[]ObjectSetProbe</a> | Availability Probes check objects that are part of the package.<br>All probes need to succeed for a package to be considered Available.<br>Failing probes will prevent the reconciliation of objects in later phases. |


Used in:
* [ObjectSet](#objectset)


### ObjectSetStatus

ObjectSetStatus defines the observed state of a ObjectSet.

| Field | Description |
| ----- | ----------- |
| `conditions` <br>[]metav1.Condition | Conditions is a list of status conditions ths object is in. |
| `phase` <br><a href="#objectsetstatusphase">ObjectSetStatusPhase</a> | Deprecated: This field is not part of any API contract<br>it will go away as soon as kubectl can print conditions!<br>When evaluating object state in code, use .Conditions instead. |
| `pausedFor` <br><a href="#objectsetpausedobject">[]ObjectSetPausedObject</a> | List of objects the controller has paused reconciliation on. |


Used in:
* [ObjectSet](#objectset)


### ObjectSetTemplatePhase

ObjectSet reconcile phase.

| Field | Description |
| ----- | ----------- |
| `name` <b>required</b><br>string | Name of the reconcile phase. Must be unique within a ObjectSet. |
| `objects` <b>required</b><br><a href="#objectsetobject">[]ObjectSetObject</a> | Objects belonging to this phase. |


Used in:
* [ClusterObjectSetSpec](#clusterobjectsetspec)
* [ObjectSetSpec](#objectsetspec)


### PackageProbeKindSpec

Kind package probe parameters.

| Field | Description |
| ----- | ----------- |
| `group` <b>required</b><br>string | Object Group to apply a probe to. |
| `kind` <b>required</b><br>string | Object Kind to apply a probe to. |


Used in:
* [ProbeSelector](#probeselector)


### Probe

Defines probe parameters to check parts of a package.

| Field | Description |
| ----- | ----------- |
| `condition` <br><a href="#probeconditionspec">ProbeConditionSpec</a> | Checks whether or not the object reports a condition with given type and status. |
| `fieldsEqual` <br><a href="#probefieldsequalspec">ProbeFieldsEqualSpec</a> | Compares two fields specified by JSON Paths. |


Used in:
* [ObjectSetProbe](#objectsetprobe)


### ProbeConditionSpec

Checks whether or not the object reports a condition with given type and status.

| Field | Description |
| ----- | ----------- |
| `type` <b>required</b><br>string | Condition type to probe for. |
| `status` <b>required</b><br>string | Condition status to probe for. |


Used in:
* [Probe](#probe)


### ProbeFieldsEqualSpec

Compares two fields specified by JSON Paths.

| Field | Description |
| ----- | ----------- |
| `fieldA` <b>required</b><br>string | First field for comparison. |
| `fieldB` <b>required</b><br>string | Second field for comparison. |


Used in:
* [Probe](#probe)


### ProbeSelector

Selects a subset of objects to apply probes to.
e.g. ensures that probes defined for apps/Deployments are not checked against ConfigMaps.

| Field | Description |
| ----- | ----------- |
| `kind` <br><a href="#packageprobekindspec">PackageProbeKindSpec</a> | Selects objects based on Kinda and API Group. |


Used in:
* [ObjectSetProbe](#objectsetprobe)

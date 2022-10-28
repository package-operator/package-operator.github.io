---
title: Architecture
weight: 200
images: []
---

## Operator
Package Operator is run as a deployment in the `package-operator-system` namespace.

## Webhooks
There is a webhook server that runs and verifies deployments.

## Loading Package Images
Packages are packaged into non runnable container images. These images contain all the
manifests, configuration, and metadata needed to run a package. This image is specified in the
[package resource](/docs/getting_started/api-reference#Package). When Package Operator reconciles
the package it downloads the image and creates an ObjectSetDeployment.

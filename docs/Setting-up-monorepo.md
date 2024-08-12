# Setting Up a Yarn Monorepo with Ignite Framework (React Native)

In this tutorial, we'll guide you through the process of setting up a Yarn monorepo for your React Native projects using the Ignite framework. We'll start by setting up the monorepo structure, create your first app using Ignite, add a shared form-validator utility, and finally integrate this utility into your app.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

* Node.js (version 14 or later)
* Yarn
* Git
* Watchman (for macOS users)

## Use Case

## Step 1: Setting Up the Monorepo

First, follow the [Expo documentation on setting up monorepos](https://docs.expo.dev/guides/monorepos/) to initialize your monorepo. This will include setting up your `packages/` and `apps/` directories and configuring Yarn workspaces.

Here's a quick recap:

1. Initialize the Monorepo:

```
yarn init -y
```

2.
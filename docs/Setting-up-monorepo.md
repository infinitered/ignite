# Setting Up a Yarn Monorepo with Ignite Framework (React Native)

In this tutorial, we'll guide you through the process of setting up a Yarn monorepo for your React Native projects using the Ignite framework. We'll start by setting up the monorepo structure, create your first app using Ignite, add a shared form-validator utility, and finally integrate this utility into your app.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/en) (version 14 or later)
* [Yarn](https://classic.yarnpkg.com/en/)

## Use Case

In a monorepo setup, multiple apps often share common functionality. For example, a mobile (React Native) and a web app (React). This tutorial demonstrates how to set up and use shared utilities within a monorepo. For instance, if you have several apps that need to validate user inputs like email addresses, passwords, or text fields, you can create a single validation utility that can be reused across all your apps.

By centralizing these utilities, you reduce code duplication and simplify maintenance, ensuring that any updates or bug fixes are immediately available to all your apps.

In this setup, we’ll create a React Native app, a React app and a form-validator utility that includes functions to validate email addresses, passwords, and generic text fields. This utility will then be integrated to both apps. 

## Step 1: Setting Up the Monorepo

First, follow the [Expo documentation on setting up monorepos](https://docs.expo.dev/guides/monorepos/) to initialize your monorepo. This will include setting up your `packages/` and `apps/` directories and configuring Yarn workspaces.

Here's a quick recap:

1. Initialize the Monorepo:

```
yarn init -y
```

2. Configure Workspaces in package.json:

```
{
  "private": true,
  "workspaces": {
    "packages": [
      "packages/*"
    ],
    "apps": [
      "apps/*"
    ]
  }
}
```

3. Create Directory Structure:

```
mkdir apps packages
```

## Step 2: Create Your First App Using Ignite

Ignite is a powerful tool for scaffolding React Native projects. In this step, we'll create your first app within the monorepo using Ignite.

1. Install Ignite CLI (if you haven't already):
```
npm install -g ignite-cli
```

2. Generate a New App:
Navigate to the apps/ directory and run the following command to create a new app:
```
cd apps
ignite new mobile
```

We suggest the following answers to the prompts:
* 


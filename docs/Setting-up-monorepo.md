# Setting Up a yarn monorepo with Ignite framework (React Native)

In this tutorial, we'll guide you through the process of setting up a yarn monorepo for your React Native projects using the Ignite framework. We'll start by setting up the monorepo structure, create your first app using Ignite, a second React app, add a shared form-validator utility, and finally integrate this utility into both apps.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/en) (version 14 or later)
* [Yarn](https://classic.yarnpkg.com/en/)

## Use case

In a monorepo setup, multiple apps often share common functionality. For example, a mobile (React Native) and a web app (React). This tutorial demonstrates how to set up and use shared utilities within a monorepo. For instance, if you have several apps that need to validate user inputs like email addresses, passwords, or text fields, you can create a single validation utility that can be reused across all your apps.

By centralizing these utilities, you reduce code duplication and simplify maintenance, ensuring that any updates or bug fixes are immediately available to all your apps.

In this setup, we’ll create a React Native app, a React app and a form-validator utility that includes functions to validate email addresses, passwords, and generic text fields. This utility will then be integrated to both apps. 

## Step 1: Setting up the monorepo

First, follow the [Expo documentation on setting up monorepos](https://docs.expo.dev/guides/monorepos/) to initialize your monorepo. This will include setting up your `packages/` and `apps/` directories and configuring Yarn workspaces.

Here's a quick recap:

1. Initialize the Monorepo:

```
yarn init -y
```

2. Configure workspaces in `package.json`:

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

## Step 2: Create your first app using Ignite

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

## Step 3: 

## Step 4: Add a shared form-validator utility

Now that you have both apps set up, it's time to add a shared utility that can be used across multiple apps. We'll create a form-validator utility that checks for valid email addresses, passwords, and text fields.

1. Create the utility:
In the `packages/` directory, create a new folder validators/ with a file named `validator.ts`:
```
mkdir packages/validators
touch packages/validators/validator.ts
```

2. Implement the validators in `validator.ts`:
```
export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password: string): boolean => {
  return password.length >= 8;
};

export const isTextValid = (text: string, minLength: number = 1): boolean => {
  return text.trim().length >= minLength;
};
```

3. Export validators in an `index.ts` file within the same directory:
```
export * from './validator';
```

## Conclusion
You've successfully set up a yarn monorepo using the Ignite framewor and the `create-react-app` tool, created a shared form-validator utility, and integrated it into both apps. This setup allows you to scale your projects efficiently by sharing code across multiple apps in a structured way.


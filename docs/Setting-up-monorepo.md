# Setting up a yarn monorepo with Ignite framework (React Native)

In this tutorial, we'll guide you through the process of setting up a yarn monorepo for your React Native projects using the Ignite framework. We'll start by setting up the monorepo structure, create a React Native app using Ignite, a second web app plain vainilla Javascript, add a shared form-validator utility, and finally integrate this utility into both apps.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/en) (version 18 or later)
* [Yarn](https://classic.yarnpkg.com/en/)

## Use case

In a monorepo setup, multiple apps often share common functionality. For example, a mobile (React Native) and a web app (React). This tutorial demonstrates how to set up and use shared utilities within a monorepo. For instance, if you have several apps that need to validate user inputs like email addresses, passwords, or text fields, you can create a single validation utility that can be reused across all your apps.

By centralizing these utilities, you reduce code duplication and simplify maintenance, ensuring that any updates or bug fixes are immediately available to all your apps.

In this setup, we’ll create a React Native app, a React app and a form-validator utility that includes functions to validate email addresses, passwords, and generic text fields. This utility will then be integrated to both apps.

## Step 1: Setting up the monorepo

First, follow the [Expo documentation on setting up monorepos](https://docs.expo.dev/guides/monorepos/) to initialize your own monorepo. This will include setting up your `packages/` and `apps/` directories and configuring Yarn workspaces.

Here's a quick recap:

1. Initialize the monorepo:

```
mkdir monorepo-example
cd monorepo-example
yarn init
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

3. Create directory structure:

```
mkdir apps packages
```

## Step 2: Create mobile app using Ignite

Ignite is a powerful tool for scaffolding React Native projects. In this step, we'll create your first app within the monorepo using Ignite.

1. Install Ignite CLI (if you haven't already):
```
npm install -g ignite-cli
```

2. Generate a new app:
Navigate to the apps/ directory and run the following command to create a new app:
```
cd apps
ignite new mobile
```

We suggest the following answers to the prompts:
```
📝 Do you want to use Expo?: Expo - Recommended for almost all apps [Default]
📝 Which Expo workflow?: Expo Go - For simple apps that don't need custom native code [Default]
📝 Do you want to initialize a git repository?: No
📝 Remove demo code? We recommend leaving it in if it's your first time using Ignite: No
📝 Which package manager do you want to use?: yarn
📝 Do you want to install dependencies?: No
```

3. Open `metro.config.js` file

```
touch mobile/metro.config.js
```

4. Replace Metro configuration with the following content

```
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
```

## Step 3: Create web app

Let's create a second app now. This app is meant to be run on web browsers.

1. Initialize web app
```
cd ..
mkdir web
cd web
yarn init
```

2. Create an `index.html` file with a simple form:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Form App</title>
</head>
<body>
  <h1>Sign Up</h1>
  <form id="signup-form">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
    </div>
    <button type="submit">Submit</button>
  </form>

  <script src="index.js" type="module"></script>
</body>
</html>
```

3. Add a simple development server
To serve your app with a local server, install a simple development server like `live-server`

```
yarn add live-server -D
```

4. Add a script to your `package.json` to run the server:
```
"scripts": {
  "start": "live-server"
}
```

## Step 4: Install dependencies

Let's make sure all of our dependendencies are installed for both apps.

1. Run `yarn` at the root of the project
```
cd ..
cd ..
yarn
```

## Step 5: Add a shared form-validator utility

Now that you have both apps set up, it's time to add a shared utility that can be used across multiple apps. We'll create a form-validator utility that checks for valid email addresses, passwords, and text fields.

1. Create the utility:

In the `packages/` directory, create a new folder `validators/` with a file named `validator.ts`:
```
mkdir packages/form-validator
touch packages/form-validator/validator.ts
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

4. Create `index.ts` file within the same directoy:

```
touch packages/form-validator/index.ts
```

5. Export validators in an `index.ts` file within the same directory:
```
export * from './validator';
```

6. Create `package.json` file in the same directory:
```
touch packages/form-validator/package.json
```

7. Add package declaration to the file:
```
{
  "name": "form-validator",
  "version": "1.0.0"
}
```

## Step 6: Add the form validator utility to the mobile app

1. Add the form validator utility to the app's `package.json` file:

`apps/mobile/package.json`
```
"expo-status-bar": "~1.12.1",
"form-validator": "workspace:^", // <- Add this new line
"i18n-js": "3.9.2",
```

2. Import the `isEmailValid` function:

At the top of the `LoginScreen.tsx` file, add the import statement for the isEmailValid function. Ensure that the path corresponds to where your form-validator utility is located within your monorepo.

`apps/mobile/app/screens/LoginScreen.tsx`
```
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { isEmailValid } from "form-validator" // <- Add this new line
```

3. Add new `Text` component that will display if the entered email is valid or not.

`apps/mobile/app/screens/LoginScreen.tsx`
```
<Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

/** Add these next 5 lines **/
<Text
  text={isEmailValid(authEmail) ? "It is a valid email" : "It is not a valid email"}
  preset="subheading"
  style={$enterDetails}
/>
```

## Step 7: Add the form validator utility to the web app

1. Add the form validator utility to the app's `package.json` file:

`apps/web/package.json`
```
"dependencies": {
  "form-validator": "workspace:^"
}
```

2. Create an `index.js` file to handle the form submission and validation:

```
// Import the validator package
import { isEmailValid } from 'form-validator';

// Handle form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the default way

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate email
  if (!isEmailValid(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simple password validation (e.g., check if not empty)
  if (password.length === 0) {
    alert('Please enter a password.');
    return;
  }

  // If both are valid, submit the form (or do something else)
  alert('Form submitted successfully!');
});
```

## Step 8: Run both apps to make sure logic was added

1. Make sure dependencies are installed.

```
yarn install
```

2. Run React Native app (make sure you have your [environment setup](https://reactnative.dev/docs/set-up-your-environment)).

For iOS:
```
cd apps/mobile
yarn ios
```

For Android:
```
cd apps/mobile
yarn android
```

3. Run web app
```
cd apps/web
yarn start
```


## Conclusion
Congratulations on setting up your yarn monorepo! By using the Ignite framework, a vanilla web app, and a shared form-validator utility, you've successfully integrated these components into both apps. This setup enables you to scale your projects efficiently by sharing code across multiple applications in a well-structured and organized manner.


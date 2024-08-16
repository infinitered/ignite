# Setting up a Yarn monorepo with Ignite

In this guide, we'll lead you through the process of setting up a Yarn monorepo for your [React Native](https://reactnative.dev/) projects using the [Ignite](https://github.com/infinitered/ignite) framework. We'll start by setting up the monorepo structure, then create a React Native app using Ignite, a second web app with plain vainilla Javascript, add a shared form-validator utility, and finally integrate this utility into both apps.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en) (version 18 or later)
- [Yarn](https://yarnpkg.com) (version 3.8 or later)

## Use case

In a monorepo setup, multiple apps often share common functionality. For example, a mobile app (React Native) and a web app (React). This guide demonstrates how to set up and use shared utilities within a monorepo. For instance, if you have several apps that need to validate user inputs like email addresses, passwords, or text fields, you can create a single validation utility that can be reused across all your apps.

:::info

More information on whether you want to setup your app within a monorepo can be found [here](https://github.com/infinitered/ignite/blob/monorepo-setup-doc/docs/Monorepos-Overview.md).

:::

By centralizing these utilities, you reduce code duplication and simplify maintenance, ensuring that any updates or bug fixes are immediately available to all your apps.

In this setup, we’ll create a React Native app, a React app and a form-validator utility that includes functions to validate email addresses, passwords, and generic text fields. This utility will then be integrated to both apps.

## Step 1: Setting up the monorepo

First, follow the [Expo documentation on setting up monorepos](https://docs.expo.dev/guides/monorepos/) to initialize your own monorepo. This will include setting up your `packages/` and `apps/` directories and configuring Yarn workspaces.

Here's a quick recap:

1. Initialize the monorepo:

```shell
mkdir monorepo-example
cd monorepo-example
yarn init
```

2. Configure workspaces in `package.json`:

```json
// success-line-start
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
// success-line-end
```

3. Create directory structure:

```shell
mkdir apps packages
```

## Step 2: Create mobile app using Ignite

Ignite is a powerful tool for scaffolding React Native projects. In this step, we'll create your first app within the monorepo using Ignite.

1. Install the [Ignite CLI](https://www.npmjs.com/package/ignite-cli) (if you haven't already):

```shell
npx ignite-cli@latest
```

2. Generate a new app:
   Navigate to the apps/ directory and run the following command to create a new app:

```shell
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

```shell
touch mobile/metro.config.js
```

4. Replace the following lines in the Metro configuration file with the lines below

```js
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// success-line-start
// Get monorepo root folder
const monorepoRoot = path.resolve(projectRoot, '../..');
// success-line-end

/** @type {import('expo/metro-config').MetroConfig} */
// error-line
const config = getDefaultConfig(__dirname);
// success-line
const config = getDefaultConfig(projectRoot);

config.transformer.getTransformOptions = async () => ({
  transform: {
    // Inline requires are very useful for deferring loading of large dependencies/components.
    // For example, we use it in app.tsx to conditionally load Reactotron.
    // However, this comes with some gotchas.
    // Read more here: https://reactnative.dev/docs/optimizing-javascript-loading
    // And here: https://github.com/expo/expo/issues/27279#issuecomment-1971610698
    inlineRequires: true,
  },
});

// success-line-start
// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
// success-line-end

// This helps support certain popular third-party libraries
// such as Firebase that use the extension cjs.
config.resolver.sourceExts.push("cjs")

module.exports = config;
```

## Step 3: Create web app

Let's create a second app now. This app is meant to be run on web browsers.

1. Initialize web app

```shell
cd ..
mkdir web
cd web
yarn init
```

2. Create an `index.html` file with a simple form:

```html
// success-line-start
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
// success-line-end
```

3. Add a simple development server
   To serve your app with a local server, install a simple development server like `live-server`

```shell
yarn add live-server -D
```

4. Add a script to your `package.json` to run the server:

```json
// success-line-start
"scripts": {
  "start": "live-server"
}
// success-line-end
```

## Step 4: Install dependencies

Let's make sure all of our dependendencies are installed for both apps.

1. Run `yarn` at the root of the project

```shell
cd ..
cd ..
yarn
```

:::info

When you run yarn at the top of the monorepo with Yarn 3.x, Yarn installs all dependencies and links the packages. It places a single node_modules folder in each package’s directory, but shared dependencies are typically stored in a .yarn/cache folder at the root. Yarn uses Plug’n’Play (PnP) to resolve dependencies without the traditional node_modules structure, creating a more efficient setup. Each package or app is linked to the dependencies it needs through Yarn’s PnP system. For more details, you can check out [Yarn's documentation on Plug'n'Play](https://yarnpkg.com/features/pnp).

:::

## Step 5: Add a shared ESLint configuration with TypeScript

In a monorepo setup, maintaining consistent code quality across TypeScript projects is essential. Sharing a single ESLint configuration file between these apps ensures consistent coding standards and streamlines the development process.

1. Create a shared ESLint configuration package:

Inside your monorepo, create a new package for your shared ESLint configuration.

```shell
mkdir packages/eslint-config
cd packages/eslint-config
```

2. Initialize the package:

Initialize the package with a package.json file.

```shell
yarn init -y
```

3. Install ESLint and TypeScript dependencies:

Install ESLint, TypeScript, and any shared plugins or configurations that you want to use across the apps.

```shell
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-native eslint-plugin-reactotron eslint-config-standard eslint-config-prettier --dev
```

4. Create the `tsconfig.json` file:

`packages/eslint-config/tsconfig.js`

```json
// success-line-start
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "lib": ["es6", "dom"],
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
  9     "skipLibCheck": true
 10   }
 11 }
 // success-line-end
 ```

5. Create the shared ESLint configuration file:

Create an `index.ts` file in the root of your eslint-config package. We will reuse Ignite’s boilerplate ESLint configuration and then replace the original configuration with it.

`packages/eslint-config/index.ts`

```typescript
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "standard",
    "prettier",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "react-native",
    "reactotron",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  globals: {
    __DEV__: false,
    jasmine: false,
    beforeAll: false,
    afterAll: false,
    beforeEach: false,
    afterEach: false,
    test: false,
    expect: false,
    describe: false,
    jest: false,
    it: false,
  },
  rules: {
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "comma-dangle": 0,
    "multiline-ternary": 0,
    "no-undef": 0,
    "no-unused-vars": 0,
    "no-use-before-define": 0,
    "no-global-assign": 0,
    "quotes": 0,
    "react-native/no-raw-text": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "space-before-function-paren": 0,
    "reactotron/no-tron-in-production": "error",
  },
}
// success-line-end
```

This configuration (originally sourced from [Ignite](https://github.com/infinitered/ignite)) provides a strong foundation for TypeScript, React, React Native, and import order rules. You can adjust the rules according to your project's specific needs.

5. Compile the TypeScript configuration:

```shell
npx tsc
```

This will generate a `index.js` file from your `index.ts` file.

## Step 6: Use the shared ESLint configuration in your apps

1. Navigate to the mobile app:

```shell
cd ..
cd ..
cd apps/mobile
```

2. Add the ESLint shared package to the `package.json` file:

`apps/mobile/package.json`

```json
"eslint": "8.17.0",
// success-line
 "eslint-config": "workspace:^",
 "eslint-config-prettier": "8.5.0",
```

3. Replace the shared ESLint configuration in `package.json`

`apps/mobile/package.json`

```json
// error-line-start
"eslintConfig": {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-native/all",
      "standard",
      "prettier"
    ],
    "plugins": [
      "@typescript-eslint",
      "react",
      "react-native",
      "reactotron"
    ],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "settings": {
      "react": {
        "pragma": "React",
        "version": "detect"
      }
    },
    "globals": {
      "__DEV__": false,
      "jasmine": false,
      "beforeAll": false,
      "afterAll": false,
      "beforeEach": false,
      "afterEach": false,
      "test": false,
      "expect": false,
      "describe": false,
      "jest": false,
      "it": false
    },
    "rules": {
      "@typescript-eslint/ban-ts-ignore": 0,
      "@typescript-eslint/ban-ts-comment": 0,
      "@typescript-eslint/explicit-function-return-type": 0,
      "@typescript-eslint/explicit-member-accessibility": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/indent": 0,
      "@typescript-eslint/member-delimiter-style": 0,
      "@typescript-eslint/no-empty-interface": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-object-literal-type-assertion": 0,
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "comma-dangle": 0,
      "multiline-ternary": 0,
      "no-undef": 0,
      "no-unused-vars": 0,
      "no-use-before-define": 0,
      "no-global-assign": 0,
      "quotes": 0,
      "react-native/no-raw-text": 0,
      "react/no-unescaped-entities": 0,
      "react/prop-types": 0,
      "space-before-function-paren": 0,
      "reactotron/no-tron-in-production": "error"
    }
  }
// error-line-end
// success-line-start
"eslintConfig": {
  extends: ["@monorepo-example/eslint-config"],
}
// success-line-end
```


## Step 7: Run both apps to make sure logic was added

1. Make sure dependencies are installed.

```shell
yarn install
```

2. Run React Native app (make sure you have your [environment setup](https://reactnative.dev/docs/set-up-your-environment)).

For iOS:

```shell
cd apps/mobile
yarn ios
```

For Android:

```shell
cd apps/mobile
yarn android
```

3. Run web app

```shell
cd apps/web
yarn start
```

## Conclusion

Congratulations on setting up your Yarn monorepo! By using the Ignite framework, a vanilla web app, and a shared form-validator utility, you've successfully integrated these components into both apps. This setup enables you to scale your projects efficiently by sharing code across multiple applications in a well-structured and organized manner.


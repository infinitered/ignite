# Detox End-To-End Testing

## Setup

To get your Detox tests up and running, you'll need to install some global dependencies:

1. Install the latest version of [Homebrew](https://brew.sh/)
2. Make sure you have Node installed (at least 8.6.0). If you don't:

If you use NVM:

```bash
nvm install node
```

Or if you'd prefer to install directly from Homebrew

```bash
brew update && brew install node
```

3. Install `applesimutils, which will allow Detox to communicate with the iOS simulator:

```bash
brew tap wix/brew && brew install applesimutils
```

4. Install the Detox CLI

```bash
  yarn global add detox-cli
```

## Adding tests

We've gotten you started with `./e2e/firstTest.spec.js`, which tests that the two main example screens render properly.

Note that in order to pick up elements by ID, we've added the `testID` prop to the component.

## Running tests

1. Start the packager

```
yarn start
```

_(Expo-only note: for testing [production code](https://docs.expo.io/workflow/development-mode/#production-mode), start the packager with `yarn start --no-dev --minify`)_

2. Run the app

In a separate terminal window from the packager:

```
yarn build:e2e
```

_(Expo-only note: this is unnecessary for Expo apps)_

3. Run the tests

```
yarn test:e2e
```

For more information, make sure to check out the official [Detox Docs](https://github.com/wix/Detox/blob/master/docs/README.md)

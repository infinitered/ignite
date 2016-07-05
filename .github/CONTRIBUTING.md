<img align=left src="https://raw.githubusercontent.com/infinitered/react_native_base/master/ignite-base/App/Images/ir.png">
#  Contributing to the Ignite Base App
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://semaphoreci.com/api/v1/ir/ignite/branches/master/shields_badge.svg)](https://semaphoreci.com/ir/react_native_base)

We welcome all contributors to Ignite! This contributing guide will help you get up and running to submit your first pull request.

Before submitting a pull request, you will want to make sure that your branch meets the following requirements:
* Everything works on iOS/Android
* AVA Tests pass in ignite-base folder (`npm test`)
* New tests are included for any new functionality
* Code is compliant with StandardJS  in ignite-base (`npm run lint`)
* `./fireDrill.sh` passes in main ignite folder
* Branch has already been [synced with the upstream repo](https://help.github.com/articles/syncing-a-fork/) and any merge-conflicts have been resolved.

## Getting Started

**Note**: Before starting, make sure you are running Node version 5.1 or later. If you install the packages using an older version of Node, you may experience many errors because Node could not properly install the babel-react-native preset.

**Step 1:** Fork this repo.

**Step 2:** Clone your fork to your local dev environment.

**Step 3:** cd to the cloned repo, ignite-base folder:
```
$ cd ignite/ignite-base
```
**Step 4:** Install the application
```
$ npm install
```
**Step 5:** Run tests to make sure the installation worked properlly
```
$ npm test
```

## How to Build and Run App

Note that if you do not already have the React Native command line tools installed, you should run `npm install -g react-native-cli`. For additional information and troubleshooting go to the [React Native Getting Started Guide](https://facebook.github.io/react-native/docs/getting-started.html#content).

1. `$ cd ignite-base`
2. Run Build for either OS
  * for iOS
    * `$ react-native run-ios`
  * for Android
    * Run Genymotion
    * `$ react-native run-android`

## Testing the App

We use [AVA](https://github.com/avajs/ava) for testing.

To run tests from the ignite-base folder:
```
$ npm test
```

Or to run it in [intelligent watch mode](https://github.com/avajs/ava/blob/master/docs/recipes/watch-mode.md):
```
$ npm test -- --watch
```

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Run Lint** from ignite-base:
```
$ npm run lint
```

**To Lint on Commit**

1. Install git-hooks => On a Mac `brew install git-hooks` - [Other](https://github.com/icefox/git-hooks/)
2. Setup on Repo => `git hooks --install`

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

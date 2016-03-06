# React Native Template
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://semaphoreci.com/api/v1/ir/react_native_base/branches/master/shields_badge.svg)](https://semaphoreci.com/ir/react_native_base)
The ideal starting app for React Native:
* Standard compliant
* Multiple Platform Support
* Documented structure
* Redux State Management
* Sagas Redux Daemons
* Githooks
* Mocha Tests

## iOS/Android/XDE support
Code is geared towards tested and cross platform functionality. [XDE](https://exponentjs.com/) is disabled by default, but see `index.js` for enabling.


## :arrow_up: How to Setup

**Step 1:** git clone this repo:
```
$git clone git@github.com:infinitered/react_native_base.git
```
**Step 2:** cd to the cloned repo:
```
cd react_native_base
```
**Step 3:** Install the Application
```
npm install
```

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :no_entry_sign: Linting

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to JS Standard.  The linting process enforces this.

**To Lint on Commit**

1. Install git-hooks => On a Mac `brew install git-hooks` - [Other](https://github.com/icefox/git-hooks/)
2. Setup on Repo => `git hooks --install`

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :cool: Wishlist
* Common Cocoapods
* Common Node Modules
* Fastlane
* Network code

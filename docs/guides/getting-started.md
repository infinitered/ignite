# Getting Started

#### This document will get you started using Ignite 2.0

## Dev Version

> Note: Ignite 2.0 is in alpha currently, so if you want to use it, you'll
have to follow these instructions

If you are looking to contribute to Ignite, or want to use it before the
official release, then follow these instructions. Otherwise, you can skip down
to the *Release Version* section.

We'll need node *v7.5.0*; install that if it isn't already: `nvm install v7.5.0`

Next, you'll need to clone Ignite from Github and check out the branch where
version 2 is being developed:

```
git clone git@github.com:infinitered/ignite.git
git fetch --all # to make sure your repo has a reference to the branch
git checkout -b next origin/next
```

Install dependencies

`npm run bootstrap`

Install react native globally

`npm install -g react-native-ignite`

Link ignite to React Native Ignite in packages/ignite

```
cd packages/ignite
npm link
```

Install watchman using Homebrew

`brew install watchman`

Install the React Native CLI

`npm install -g react-native-cli`

Now let's use Ignite to create a new project

```
ignite new HelloWorld
cd HelloWorld
```

Start up the project using React Native

`react-native run-ios`

## Release Version

---
sidebar_position: 3
---

# Quick Start Guide

## 0. Prerequisites

### For development

This guide assumes you have completed the [Environment Setup](https://reactnative.dev/docs/set-up-your-environment) from the React Native docs. You'll also need the following:

- [VS Code](https://code.visualstudio.com/) (or another IDE)
- A macOS, Linux, or Windows (PowerShell or WSL2) with a terminal window open

Keep in mind if you're looking to build iOS applications, you'll have to do this on macOS. Android can be developed from any OS.

### For building

You'll need:

- EAS CLI installed

```bash
npm install -g eas-cli
```

- An Expo account. [Create one for free here](https://expo.dev/signup).

## 1. Create your first app

With the CLI, use the new command to generate your first application.

```bash
npx ignite-cli new MyFirstApp --yes
```

## 2. Building the app

Once the app has been created, change to the project directory and fire it up via one of the following:

```bash
# first
cd MyFirstApp
# then one of the following
yarn run android
yarn run ios
yarn run web
```

Android and iOS will take a few moments to build depending on your machine's hardware.

## 3. Making changes

To make the app yours, simply edit the source code in the `app/` directory (or `src/app/` if you chose to build an Expo Router project). If you have an app running from the previous step, you'll instantly see those changes appear as you save your changes.

## 4. Publishing your application

Ignite uses EAS Build to make the proper binaries for App Store and Google Play distribution. You can build these on EAS, a cloud service provided by Expo or run them locally yourself.

```bash
# Running a local Android build
yarn run build:android:prod
# or a local iOS build
yarn build:ios:prod
```

Follow the instructions in your terminal upon running these commands. With a successful build you'll end up with binaries in the AAB or IPA format (depending on which platform you're building for). Those can be submitted to the appropriate app stores.

## FAQs

#### Can I run without Expo?

No, you cannot, not if you want to start your application with Ignite.

In the end, though, Ignite is just a boilerplate. Feel free to adopt application structure, code snippets, components and other logic that makes sense for your needs. If you want to opt out of the Expo ecosystem entirely (not recommended) to [build your own framework](https://reactnative.dev/docs/getting-started-without-a-framework), you can do so with the React Native CLI.

#### Why is Package A included, but not Package B?

The Ignite Boilerplate represents the current stack that [Infinite Red](https://infinite.red) generally uses to start a new project. Of course, each case is different, but this is generally the stack that works well for us.

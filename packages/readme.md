# Ignite 2.0

Hello.  Welcome to the 2.0 branch of Ignite.

One of the big goals of Ignite was to make it modular. We will be living in `/packages` as this is a monorepo setup with [lerna](https://github.com/lerna/lerna).  Each sub-directory is a npm module.

# Getting Started

Here's the quick start.

```sh
git checkout next
npm i
npm run bootstrap
```

You'll only have to run bootstap once at the start.  And once again whenever we add new directories under `packages`. It doesn't hurt to run it more than once.  All it really does is setup symlinks for us to make it a really nice development experience.

# Table of Contents

`ignite`

This is the CLI.  It does not have any generators, nor does it rely on React Native.  It is built with [gluegun](https://github.com/infinitered/gluegun).

`ignite-basic-generators`

These are the basic generators for creating container, screens, sagas, and more.

`ignite-basic-structure`

This is the main directory structure & files of ignite apps.

`ignite-vector-icons`

A plugin for working with `react-native-vector-icons`.

# Ignite 2.0

Hello.  Welcome to the 2.0 branch of Ignite, currently under heavy development.

One of the big goals of Ignite was to make it modular. We will be living in `/packages` as this is a monorepo setup with [lerna](https://github.com/lerna/lerna).  Each sub-directory is a npm module.

# Getting Started

Here's the quick start.

1. Clone down Ignite and change to the `next` branch
2. Uninstall old Ignite with `npm uninstall -g react-native-ignite`
3. CD into `./packages/ignite`
4. Run `npm link`
5. Run `ignite version`. You should see `2.0.0`.

# Table of Contents

`ignite`

This is the CLI.  It does not have any generators, nor does it rely on React Native.  It is built with [gluegun](https://github.com/infinitered/gluegun).

`ignite-basic-generators`

These are the basic generators for creating container, screens, sagas, and more.

`ignite-basic-structure`

This is the main directory structure & files of ignite apps.

`ignite-vector-icons`

A plugin for working with `react-native-vector-icons`.

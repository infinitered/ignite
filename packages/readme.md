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

The binary you're looking to run is located at `packages/ignite/bin/ignite`.  Might be worth creating a new `alias` to point to that during development.

`alias ignite2=/Users/you/path-to-ignite-repo/packages/ignite/bin/ignite`


# Table of Contents

`ignite`

This is the CLI.  It does not have any generators, nor does it rely on React Native.  It is built with [gluegun](https://github.com/infinitered/gluegun).

`ignite-basic-generators`

These are the basic generators for creating container, screens, sagas, and more.

`ignite-empty-playground`

This is an integration playground for Ignite contributors.  Pretty much everything is in the .gitignore.  This is a great place to make some features and play around.  Remember not to check in any generated files.  

Feel free to add more dependencies as you create them.   Also feel free to add more things to .gitignore as you see fit. 

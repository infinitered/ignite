# How use an Ignite Development Build

This guide will walk you through how to setup and use a pre-release or experimental build of Ignite.

## Requirements

* Node 7.6+
* NPM 4 (ships with Node 7)
* Yarn 20.3+

If you're on a Mac, you can use one of these techniques:

* [n](https://github.com/tj/n) - with `npm i -g n && n 7.6`
* [homebrew](https://brew.sh/) - with `brew install node`
* [nvm](https://github.com/creationix/nvm) - with `nvm install v7.6.0`


## Getting Started

#### Out With The Old

First, if you already have a copy of Ignite installed with `npm`, uninstall it with the commands listed below.

Exact one depends on what you may have installed previously:

```sh
npm rm -g ignite
npm rm -g ignite-cli
npm rm -g react-native-ignite
```

#### In With The New

Clone Ignite's repository from https://github.com/infinitered/ignite to your local development machine.

> Note: Depending on the version of Ignite you are targeting, you may be cloning a forked repository of Ignite and the git URLs may look different.

```sh
git@github.com:infinitered/ignite.git
cd ignite
```

Now use `npm` to install and bootstrap Ignite:

```sh
npm install
npm run bootstrap
```

Next make the `ignite` command available globally. To do this, navigate to the `packages/ignite-cli` directory (found in the repository) and run the `npm link`:

```sh
cd packages/ignite-cli
npm link
```

> Note: If you get an error at this point, it is probably related to not removing a previously installed version of Ignite. See the commands above to uninstall Ignite.

#### Setup Overrides

Now set up an environment variable so Ignite knows where to find its own plugins. Make sure you're in the main `ignite` folder first -- you may have to run `cd ../..`.

```sh
export IGNITE_PLUGIN_PATH=$(pwd)
```

If you want to add this to your local `.bashrc` or `.zshrc` so it's available on every terminal session, just do this:

```sh
echo "export IGNITE_PLUGIN_PATH=$(pwd)" >> ~/.zshrc
```

## Testing Your Installation

To test your installation of Ignite, let's try generating a new project. Navigate to a new directory where you'd like to create a new project and run the `ignite new` command:

```sh
cd ~
ignite new MyApp
```

> Again, if you are having issues, the Infinite Red Community Slack may be able to help. You can find us by visiting [http://community.infinite.red](http://community.infinite.red) and then joining the `#ignite` channel.





























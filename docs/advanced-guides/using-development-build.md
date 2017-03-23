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

For Ignite 2.0 and above: (exact one depends on what you may have installed previously)
```sh
npm rm -g ignite
npm rm -g ignite-cli
```

For Ignite 1.x:
```sh
npm rm -g react-native-ignite
```

#### In With The New

Clone Ignite's repository from https://github.com/infinitered/ignite to your local development machine.

> Note: Depending on the version of Ignite you are targeting, you may be cloning a forked repository of Ignite and the git URLs may look different.

```sh
git@github.com:infinitered/ignite.git
cd ignite
```

Now install use `npm` to install and bootstrap Ignite:

```sh
npm install
npm run bootstrap
```

Next make the `ignite` command available globally. To do this, navigate to the `packages/ignite-cli` directory (found in the repository) and run the `npm link`:

```sh
cd packages/ignite-cli
npm link
```

When we launch, this will be replaced with `npm install -g ignite-cli`.

>Note: If you get an error at this point, it is probably related to not removing a previously installed version of Ignite. See the commands above to uninstall Ignite.

#### Setup Overrides

We're not quite ready to push everything up to NPM yet.  We're a few days away from this.

So in the meantime, we have to trick Ignite into installing from our hard drive instead of from npmjs.com.

We can do this by setting an environment variable.

```sh
cd ..
echo "export IGNITE_PLUGIN_PATH=$(pwd)"
```
^ then copy the output of that into your `.bashrc` or `.zshrc` or just run it in place if you're kicking tires. For example, on my computer, I can do this:

```sh
export IGNITE_PLUGIN_PATH=~/src/ir/ignite/packages
ignite new MyIgniteProject --max
```

> Once we ship to `npm` we can remove this step. When we type `ignite add vector-icons` it will install from npm.  But in the meantime, this offers a way to write your own plugins.


>If you cannot resolve your issue, the Infinite Red Community Slack may be able to help. You can find us by visiting [http://community.infinite.red](http://community.infinite.red) and then joining the `#ignite` channel.


## Testing Your Installation

To test your installation of Ignite, let's try generating a new project. Navigate to a new directory where you'd like to create a new project and run the `ignite new` command:

```sh
cd ~
ignite new MyApp
```

>Again, if you are having issues, the Infinite Red Community Slack may be able to help. You can find us by visiting [http://community.infinite.red](http://community.infinite.red) and then joining the `#ignite` channel.





























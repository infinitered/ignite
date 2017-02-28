# How use an Ignite Development Build

This guide will walk you through how to setup and use a pre-release or experimental build of Ignite.

## Requirements

* Node 7.6+
* NPM 4 (ships with Node 7)

> Note: Requirements may change based on the Ignite version you are targeting.

## Getting Started

First, if you already have a copy of Ignite installed with `npm`, uninstall it with the commands listed below.

For Ignite 2.0 and above:
```sh
npm rm -g react-native-ignite
```

For Ignite 1.x:
```sh
npm rm -g react-native-ignite
rm /usr/local/bin/ignite && rm /usr/local/lib/node_modules/ignite
```

Clone Ignite's repository from https://github.com/infinitered/ignite to your local development machine.

> Note: Depending on the version of Ignite you are targeting, you may be cloning a forked repository of Ignite and the git URLs may look different.

```sh
git@github.com:infinitered/ignite.git
cd ignite
```

Checkout the correct branch from the git repository. In this example we will be checking out the `2.0.0-alpha.3` branch.

```sh
git checkout 2.0.0-alpha.3
```

Now install use `npm` to install and bootstrap Ignite:

```sh
npm install
npm run bootstrap
```

The final step is to make the `ignite` command available globally. To do this, navigate to the `packages/ignite-cli` directory (found in the repository) and run the `npm link`:

```sh
cd packages/ignite-cli
npm link
```

>Note: If you get an error at this point, it is probably related to not removing a previously installed version of Ignite. See the commands above to uninstall Ignite.

>If you cannot resolve your issue, the Infinite Red Community Slack may be able to help. You can find us by visiting [http://community.infinite.red](http://community.infinite.red) and then joining the `#ignite` channel.

## Testing Your Installation

To test your installation of Ignite, let's try generating a new project. Navigate to a new directory where you'd like to create a new project and run the `ignite new` command:

```sh
cd ~
ignite new MyApp
```

>Again, if you are having issues, the Infinite Red Community Slack may be able to help. You can find us by visiting [http://community.infinite.red](http://community.infinite.red) and then joining the `#ignite` channel.

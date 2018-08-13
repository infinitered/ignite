# How use an Ignite CLI Development Build

This guide will walk you through how to setup and use a pre-release or experimental build of Ignite CLI.

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

First, if you already have a copy of Ignite 1 or Ignite CLI installed with `npm`, uninstall it with the commands listed below.

Exact one depends on what you may have installed previously:

```sh
npm rm -g ignite
npm rm -g ignite-cli
npm rm -g react-native-ignite
```

#### In With The New

Clone Ignite CLI's repository from https://github.com/infinitered/ignite to your local development machine.

> Note: Depending on the version of Ignite CLI you are targeting, you may be cloning a forked repository of Ignite CLI and the git URLs may look different.

```sh
git@github.com:infinitered/ignite.git
cd ignite
```

Now use `yarn` to install Ignite CLI:

```sh
yarn
```

Next make the `ignite` command available globally. To do this, run `yarn link`:

```sh
yarn link
```

> Note: If you get an error at this point, it is probably related to not removing a previously installed version of Ignite CLI. See the commands above to uninstall Ignite CLI. 

> Note: If you have run through the `npm rm` commands listed above and you get this error upon running `yarn link`

  ```sh
  warning There's already a package called "ignite-cli" registered. This command has had no effect. If this command was run in another folder with the same name, the other folder is still linked. Please run yarn unlink in the other folder if you want to register this folder.
  ```

  You may have a symlink that must be removed. CD to `~/.config/yarn/link` and run `ls`

  If you see a symlink listed as `ignite-cli`, delete it. CD back to the `ignite` directory and run `yarn link`. It should run without errors and return something similar to the following in the terminal:

  ```sh
  yarn link v1.9.4
  success Registered "ignite-cli".
  info You can now run `yarn link "ignite-cli"` in the projects where you want to use this package and it will be used instead.
  ```

## Testing Your Installation

To test your installation of Ignite CLI, let's try generating a new project. Navigate to a new directory where you'd like to create a new project and run the `ignite new` command:

```sh
cd ~
ignite new MyApp
```

> Again, if you are having issues, the Infinite Red Community Slack may be able to help. You can find us by visiting [http://community.infinite.red](http://community.infinite.red) and then joining the `#ignite` channel.
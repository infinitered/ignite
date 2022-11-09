# Ignite CLI

Ignite comes with a dynamic CLI that does more than just get you started with developing a new react-native mobile application! Check out the command list below for additional documentation on each.

## Commands

- [cache](#cache)
- [doctor](#doctor)
- [generate](#generate)
- [help](#help)
- [new](#new)
- [issue](#issue)
- [remove-demo-markup](#remove-demo-markup)
- [remove-demo](#remove-demo)
- [rename](#rename)
- [snackify](#snackify)
- [update](#update)

### Cache

- `npx ignite-cli cache`
- Alias: `npx ignite-cli c`

The [`new` command](#new) has a `useCache` flag that allows you to cache your dependencies to speed up future uses of `new`. By default, this flag is `false`. This command is provided to allow for interacting with the dependency cache file folder.

#### Subcommands

- `npx ignite-cli cache help` outputs help command to describe cache subcommands
- `npx ignite-cli cache path` outputs the path of the cache folder on your system
- `npx ignite-cli cache clear` deletes the cache folder on your system

#### Options

- `path` displays the path to the dependency cache
- `clear` clears the dependency cache

### Doctor

- `npx ignite-cli doctor`

Checks your development environment for dependencies and provides version information. This is especially helpful when reporting issues you're experiencing with Ignite. Below is a sample output:

```
System
  platform           darwin
  arch               arm64
  cpu                10 cores     Apple M1 Pro
  directory          ExpoPlist    /Users/irignite/code/ExpoPlist

JavaScript (and globally-installed packages)
  node                16.14.2      /Users/irignite/.nvm/versions/node/v16.14.2/bin/node
  npm                 8.5.0        /Users/irignite/.nvm/versions/node/v16.14.2/bin/npm
    corepack          0.10.0
    eas-cli           2.5.1
    expo-cli          6.0.6
    gatsby-cli        4.21.0
    ignite-cli        8.3.0
    npm               8.5.0
    vercel            28.4.12
    yarn              1.22.19
  yarn                1.22.19      /Users/irignite/.nvm/versions/node/v16.14.2/bin/yarn
    create-expo-app   1.1.2
  pnpm                -            not installed
  expo                46.0.16      managed

Ignite
  ignite-cli         8.3.0        /Users/irignite/.nvm/versions/node/v16.14.2/bin/ignite
  ignite src         src          /Users/irignite/code/ignite/src

Android
  java               11.0.14.1    /Users/irignite/.asdf/shims/java
  android home       -            /Users/irignite/Library/Android/sdk

iOS
  xcode              14.0.1
  cocoapods          1.11.3       /opt/homebrew/bin/pod

Tools
  git                git version 2.37.0 (Apple Git-136)   /usr/bin/git
```

### Generate

- `npx ignite-cli generate`
- Alias: `npx ignite-cli g`

Provides generators to keep your code consistent while saving you time to scaffold new models, components and screens in an automated fashion.

For full documentation on this, head on over to the [Generators documentation](./Generators.md).

### Help

- `npx ignite-cli help`
- Alias: `npx ignite-cli h`

Provides this list of commands and a small description of each command in your terminal.

### New

- `npx ignite-cli new PizzaApp`

Starts the interactive prompt for generating a new Ignite project. Any options not provided at the time of command execution will be asked. You can accept all the defaults to the options passing in `--yes` and just get to coding!

#### Options

- `--bundle` string, provide a custom bundle identifier
- `--debug` verbose logging throughout the project setup
- `--git` create a new repository with an initial commit
- `--installDeps` run the packager install script after project creation
- `--overwrite` overwrite the target directory if it exists
- `--targetPath` string, specify a target directory where the project should be created
- `--removeDemo` will remove the boilerplate demo code after project creation
- `--useCache` flag specifying to use dependency cache for quicker installs
- `--yes` accept all prompt defaults

### Issue

- `npx ignite-cli issue "Mac M1 install trouble"`
- Alias: `npx ignite-cli i`

Fires up a [new issue for Ignite on GitHub](https://github.com/infinitered/ignite/issues/new/) prefilled with collected [doctor](#doctor) information. Simply describe your steps to help reproduce the issue (and provide any relevant code snippets or repository) and press submit!

### Remove Demo Markup

- `npx ignite-cli remove-demo-markup`
- Alias: `npx ignite-cli rdm`

Removes all demo markup (comments only) from the generated boilerplate

#### Options

- `--dry-run` displays markup which would be removed without doing so

### Remove Demo

- `npx ignite-cli remove-demo`
- Alias: `npx ignite-cli rd`, `npx ignite-cli remove-demos`

Removes all demo code (files, marked code blocks and lines) from the generated boilerplate

#### Options

- `--dry-run` displays files that would be modified without doing so

### Rename

- `npx ignite-cli rename`
- Alias: `npx ignite-cli rn`

Renames your current project to the desired new name. It'll also help switch the bundle identifier.

### Snackify

- `npx ignite-cli snackify`
- Alias: `npx ignite-cli s`

Turns an Ignite app into a project compatible with uploading directly to [Expo's Snack platform](https://snack.expo.dev/). This will create a separate branch to do so without worrying about modifying your current project structure.

### Update

- `npx ignite-cli update`

Updates the generator templates that currently exist in the project. This can be used to grab the latest versions of the templates should the project have been ignited with a previous version.

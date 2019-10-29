# Ignite CLI Commands

This document reviews the commands that the Ignite CLI provides. This guide
assumes that you've installed Ignite. If you haven't, then check out our Getting
Started Guide [here](./getting-started.md).

Enter `ignite` into your command line to see the commands offered by Ignite CLI.

#### General Options

| Option    | Description                                                                           | Example                        |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------ |
| `--debug` | Pass this flag to any command to get more verbose logging if something is going wrong | `ignite new My App --debug`    |
| `--npm`   | Pass this flag if you want `npm` used for any package installs                        | `ignite add some-plugin --npm` |

### Plugins

#### Add

```sh
$ ignite add {ignite plugin name}
```

Adds an Ignite CLI plugin.

Ignite CLI plugins are just Node packages. They must have an index.js file with an
`add` function. Calling `ignite add <plugin name>` calls this function. Its job is to add the
desired plugin to your project. It may modify files in your project.

You can find published Ignite CLI plugins on npm, but you can also add unpublished
plugins from source. To do so, simply pass the path to the plugin instead of its
name.

The plugin NodeJS package name (i.e. the name of the package you will find it on npmjs.com) is `ignite-{ignite plugin name}`.

Ex: You can find the `maps` ignite plugin (added to your project with `ignite add maps`) at https://www.npmjs.com/package/ignite-maps

#### New

```sh
$ ignite plugin new {plugin name}
```

Creates an ignite plugin.

This command allows you to create a plugin or list currently available plugins (coming
soon).

When creating a plugin, you can choose to include an example component and example
command or generator.

#### Remove

```sh
$ ignite remove {ignite plugin name} [-y]
```

Removes an Ignite CLI plugin. You can add `-y` which automatically answers
"yes" to any confirmation questions.

The opposite of `ignite add`, this removes a plugin from your project. Be warned
that this may change other files in your project, e.g. to undo changes made by
`add`. There is a potential for danger here, so you may want to consider using
version control to be on the safe side.

### Doctor

```sh
$ ignite doctor
```

Checks your dev environment for dependencies.

This command checks your dev environment for dependencies. It will list the version of
system, JavaScript, React Native, Ignite CLI, Android, and iOS dependencies
available on your machine, and where applicable, their location. This may be
useful when debugging or when seeking help for an issue in forums.

Especially handy is `ignite doctor --bug`, which opens webpage with pre-filled
out issue on Ignite CLI's github. **_[NOTE: this doesn't seem to work yet]_**

### Generate

```sh
$ ignite generate listview {listview name}
```

Generates some files.

This command will use generators to create files for you. It looks at
node_modules for folders starting with `ignite`, then looks in those for
generators. Generators have a folder called `templates`, which (naturally)
contain the templates that determine the contents of the files the generator
generates.

Run `ignite generate` by itself and it will list available generators. Run
`ignite generate <generator name>` to use the desired generator.

### Help

```sh
$ ignite help
```

Lists all of the available Ignite commands.

### New

```sh
$ ignite new {Project name}
```

Generates a new React Native project with Ignite CLI.

`ignite new` uses `react-native init`, then adds files specific to Ignite CLI.

When you execute this command, Ignite CLI will give you a series of options for
your new project regarding what libraries you would like to use.

With `ignite new`, you have the option to pick your own boilerplate to install for your project. The default is `ignite-ir-boilerplate`, however you can change this by providing your own boilerplate available on `npm`. You can also point to a folder on your machine. `--boilerplate` can also be shortened to `-b`.

```sh
$ ignite new MyAwesomeApp --boilerplate ir-boilerplate
$ ignite new MyAwesomeApp -b boss-boilerplate
$ ignite new MyAwesomeApp -b /path/to/my/ignite-cool-boilerplate
```

If you would like to skip the boilerplate and use what is available out of the box with React Native, you can pass the `--no-boilerplate` option.

```sh
$ ignite new MyBareBonesApp --no-boilerplate
```

If you want to use a specific version of a boilerplate, you can add the version to the boilerplate name. For example, use `ignite new BetaApp -b ignite-bowser@3.0.0-beta.2` to use the `3.0.0-beta.2` release of the Bowser boilerplate.

#### Other Options

- `--skip-git`: Use this flag if you do not want to initiate a git repository for your app
- `--overwrite`: If the new app's folder already exists, use this flag to overwrite the directory. If you don't, Ignite CLI will ask you if you want to overwrite it.
- `--min` or `--max`: You can (with most boilerplates) pass through one of these flag to automatically choose maximum options or minimum options.

### Spork

```sh
$ ignite spork
```

Copies templates as blueprints for this project.

Ignite's boilerplates are generally pretty opinionated. Spork lets you avoid those
opinions by "forking" the template. Like a 'fork' on a git repo `ignite spork`
looks at the generators, then looks at the templates. You then select the things
you want to make a copy of. They then live in `ignite/Spork/...`.

After entering `ignite spork`, you will be presented with a list of available
templates to spork. Cycle through them with arrow keys, select the desired
templates with `space` and finish with `enter`.

Spork lets you be kinda happy with someone else's template, but then change it
to your liking. For example, different linting, new headers, etc.

### Version

```sh
$ ignite version
```

Prints current version of installed Ignite CLI.
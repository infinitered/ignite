# Creating Project Plugins

First read the [creating plugins guide](./creating-plugins.md).  It covers the structure of plugins.

Project-based plugins are plugins which stay within your repo.  They're a great way to add some features to Ignite CLI without going through the hassle or commitment of publishing to NPM.

Some examples of this might be:

* generators that make little sense outside your project
* scripts that are a bit more complex than a one liner inside your `package.json`
* a playground for exploring ignite
* a proving arena for plugins you intend to build & release, but aren't quite ready yet

## The ignite/plugins Directory

You place your plugins in the `ignite/plugins` directory.  Plugins are directories themselves, so begin by creating a `sample` directory there.

In this directory, create a file called `ignite.json` and put this empty object inside:

```json
{}
```

Next create a new text file in that directory, naming it `ignite.toml`.  Inside, place this:

```toml
description = "🔥🔥🔥 It's plugin time!🔥🔥🔥"
```

> Note! This will be replaced shortly with `ignite.json`.  I just need to patch up gluegun to provide a post-load hook so ignite can do this.

## Running Your Plugin

Back in the project root, type:

```sh
$ ignite
```

You should see your plugin appear.  Now, let's list the commands that you've made:

```sh
$ ignite sample
```

Empty.  Let's make one by creating a new directory: `ignite/plugins/sample/commands`.  In that directory place this `online.js`.

```javascript
// @cliDescription Let's gather some useful data on this mission!

module.exports = context => {
  const { filesystem, print } = context
  const { colors } = print

  const pkg = filesystem.read('package.json', 'json')
  const depsCount = Object.keys(pkg.dependencies || {}).length
  print.info(`You have ${colors.bold(depsCount)} direct dependencies. And they are awesome.`)
}

```

```sh
$ ignite sample
```

Now you have one.  Let's run it.

```sh
$ ignite sample online
```

For more details on creating commands (including generators), check out [the guide to plugins](./creating-plugins.md) and the [context API guide](https://infinitered.github.io/gluegun/#/context-api).

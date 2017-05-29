# Tour of Ignite CLI source code

Let's take a tour of Ignite CLI's source code.

(note in any code examples we're using `yarn` ... you can substitute `npm` alternative commands if desired)

## gluegun

`ignite-cli` (described [next](#ignite-cli)) uses another Infinite Red npm package called [gluegun](https://github.com/infinitered/gluegun). Gluegun is sort of like [Yeoman](http://yeoman.io/) in that it gives us a bunch of CLI tools, but it's much lighter and doesn't take over your whole CLI.

Whenever you see `context` in `ignite-cli`, it is a gluegun runtime context. This is a JS object that has a bunch of useful functions and properties attached to it, like `print` and `parameters`.

In addition, Ignite CLI adds some of its own Ignite CLI-specific functions and parameters to `context` ... those are found under `context.ignite`.

If you're curious what's in the context object, check out Gluegun's [nice context docs](https://infinitered.github.io/gluegun/#/context-api.md), or just inspect it with `console.dir(context, {depth: 3, colors: true})`.

## ignite-cli

The `ignite` binary itself is in the `bin` folder and there are some initial scripts that run whenever you invoke `ignite` in the `./src/cli` folder.

#### Commands

The commands you can run with Ignite CLI, such as `ignite add <plugin>`, `ignite doctor`, `ignite new MyApp`, all execute the corresponding JS files under `./src/commands`. Take a peak in each of those files. When you see a function like this:

```javascript
module.exports = async function (context) {
  const { print, filesystem, prompt, ignite, parameters, strings } = context
  // ...
}
```

... then you're looking at the main function. The `context` object is described above in the [gluegun section](#gluegun). Here, we're destructuring several parts of `context` such as `print`, `filesystem`, etc. Those get used in the main body of the function to perform the various tasks.

#### Extensions

Any file exports in this directory will get automatically added to the `context` object as additional properties. Let's say we wanted a `context.foo()` function. Just add `foo.js` into `./src/extensions` and export a function from there. You'll then be able to access it anywhere as `context.foo()`.

Notice that there are several functions under the `ignite` extension. For example, `context.ignite.addModule()` is in `./src/extensions/ignite/addModule.js`.

We often use extensions for namespacing and organizing various tools and data that we need in the CLI.

#### Tests

`ignite-cli` tests are fairly straightforward. For any new commands or extensions you might add, we recommend adding tests for them here.

## ignite-dev-screens

This is an [Ignite CLI plugin](./creating-plugins.md) that adds development screens to your new app (if you choose to). It runs the `./src/plugin.js` file and copies over the files in `./src/templates` to your project. To edit the generated screens, just edit the files in the templates folder.

## Documentation and Github

Github-specific templates and docs are in `./.github`. Other documentation is found in `./docs`. If you add any new features or update old features, please include appropriate documentation changes in your pull request as well.

_That's it! If you have questions about the structure of Ignite CLI, feel free to open an issue or [join the Infinite Red Community Slack](http://community.infinite.red)._

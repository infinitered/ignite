# Tour of Ignite source code

Ignite's source looks a tad intimidating at first, but it's actually quite straightforward once you get some experience moving around in it. Let's take a tour.

(note in any code examples we're using `yarn` ... you can substitute `npm` alternative commands if desired)

## Lerna & "packages"

Ignite is composed of a few "packages" (in the `./packages` folder). You can think of these packages as mini npm packages, all controlled by a nice tool called [Lerna](https://lernajs.io/). This allows us to split up Ignite into separate packages while not having to coordinate releases across multiple repos and npm versions.

All you really need to know about Lerna for these purposes is that you can run this from the main folder:

```sh
$ yarn run bootstrap
```

![image](https://cloud.githubusercontent.com/assets/1479215/25318334/12209eaa-2841-11e7-926d-f26113dbefb9.png)

This will automatically run `yarn` in each of the separate packages, which each has its own `node_modules` folder.

## gluegun

`ignite-cli` (described [next](#ignite-cli)) uses another Infinite Red npm package called [gluegun](https://github.com/infinitered/gluegun). Gluegun is sort of like [Yeoman](http://yeoman.io/) in that it gives us a bunch of CLI tools, but it's much lighter and doesn't take over your whole CLI.

Whenever you see `context` in `ignite-cli`, it is a gluegun runtime context. This is a JS object that has a bunch of useful functions and properties attached to it, like `print` and `parameters`.

In addition, Ignite adds some of its own Ignite-specific functions and parameters to `context` ... those are found under `context.ignite`.

If you're curious what's in the context object, check out Gluegun's [nice context docs](https://infinitered.github.io/gluegun/#/context-api.md), or just inspect it with `console.dir(context, {depth: 3, colors: true})`.

## ignite-cli

This is the CLI part of Ignite which runs under your local node. The `ignite` binary itself is in the `bin` folder and there are some initial scripts that run whenever you invoke `ignite` in the `./src/cli` folder.

#### Commands

The commands you can run with Ignite, such as `ignite add <plugin>`, `ignite doctor`, `ignite new MyApp`, all execute the corresponding JS files under `./src/commands`. Take a peak in each of those files. When you see a function like this:

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

This is an [Ignite plugin](./creating-plugins.md) that adds Ignite development screens to your new app (if you choose to). It runs the `./src/plugin.js` file and copies over the files in `./src/templates` to your project. To edit the generated screens, just edit the files in the templates folder.

## Documentation and Github

Github-specific templates and docs are in `./.github`. Other documentation is found in `./docs`. If you add any new features or update old features, please include appropriate documentation changes in your pull request as well.

## CI Tests

In the `./bin` folder, you'll find a few helpful scripts that we run before releasing a new version of Ignite.

_That's it! If you have questions about the structure of Ignite, feel free to open an issue or [join the Infinite Red Community Slack](http://community.infinite.red)._

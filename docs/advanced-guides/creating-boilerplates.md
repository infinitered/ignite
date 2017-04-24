# Creating Boilerplates

A boilerplate is an Ignite plugin which runs only once: the moment you create a new project.  Its purpose is to bootstrap your brand new React Native project with files, directories, libraries, images, fonts, other ignite plugins, or whatever you need on every project you create.

Like we do in [ignite-ir-boilerplate-2016](https://github.com/infinitered/ignite-ir-boilerplate-2016), it's helpful to make parts of your boilerplate optional.  For example, if you know you're not wanting to want animations, you might not want to install that library.

Please read the [creating plugins](./creating-plugins.md) guide before continuing.  It explains the shared concepts over there.  A boilerplate is a plugin, only with super powers.


## Directory Structure

```sh
/package.js
/index.js
/boilerplate.js
/ignite.json
/boilerplate/
/commands/
/templates/
```

The only two files required for a boilerplate are `package.js` and `boilerplate.js`.

`boilerplate.js` is a Node module which exports an object.  That object has a function called `install`.  Install will be called during the creating of a new project.  This will be your time to shine; installing everything that you need.

The `install()` function is passed a `context` parameters which contains an army of utilities you can use to install React Native, copy files, create templates, run arbitrary commands, and so much more.

## Modifying/Testing Boilerplates

To test your boilerplate, pass a `boilerplate` argument to the `ignite new` command with the path to the boilerplate source code:

```sh
ignite new TestProject --boilerplate=/User/Lib/BLAH
```

If you want to test your new project with your boilerplate with all of the plugin options set to true, use the `--max` alias:

```sh
ignite new TestProject --max --boilerplate=/User/Lib/BLAH
```

You can use the `n` and `b` aliases to shorten your command even more!

```sh
ignite n --max TestProject -b /User/Lib/BLAH
```
Once the command has executed, a new Ignited project will be generated from the boilerplate passed in to your `-b` or `boilerplate=` argument.





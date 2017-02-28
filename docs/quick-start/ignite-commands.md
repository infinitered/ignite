# Ignite Commands

This document reviews the commands that the Ignite 2.0 CLI provides. This guide
assumes that you've installed Ignite. If you haven't, then check out our Getting
Started Guide [here]().

Enter `ignite` into your command line to see the commands offered by Ignite 2.0.


### Add

```
ignite add {ignite plugin name}
```

Adds an Ignite plugin.

Ignite plugins are just node plugins. They must have an index.js file with an
`add` function. Calling `ignite add <plugin name>` calls this function. Its job is to add the
desired plugin to your project. It may modify files in your project.

You can find published Ignite plugins on npm, but you can also add unpublished
plugins from source. To do so, simply pass the path to the plugin instead of its
name.


### Doctor

```
ignite doctor
```

Checks your dev environment for dependencies.
  
This command checks your dev environment for dependencies. It will list the version of
system, JavaScript, React Native, Ignite, Android, and iOS dependencies
available on your machine, and where applicable, their location. This may be
useful when debugging or when seeking help for an issue in forums.

Especially handy is `ignite doctor --bug`, which opens webpage with pre-filled
out issue on Ignite's github. ***[NOTE: this doesn't seem to work yet]***
  
  
### Generate
 
```
ignite generate listview {listview name}
```

Generates some files.

This command will use generators to create files for you. It looks at
node_modules for folders starting with `ignite`, then looks in those for
generators. Generators have a folder called `templates`, which (naturally)
contain the templates that determine the contents of the files the generator
generates.

Run `ignite generate` by itself and it will list available generators. Run
`ignite generate <generator name>` to use the desired generator.
  
### New
  
```
ignite new {Project name}
```

Generate a new React Native project with Ignite.

`ignite n` uses `react-native init`, then adds files specific to Ignite.
  
When you execute this command, Ignite 2.0 will give you a series of options for
your new project regarding what libraries you would like to use.

`ignite new` has various -- commands. ex:

```
ignite n MyApp --template infinitered
```

creates the project with a certain set of opinions regarding
proejct structure.

  
### Plugin

```
ignite plugin new {plugin name}
```

Manages ignite plugins

This command allows you to create a plugin or list currently available plugins (coming
soon).

When creating a plugin, you can choose to include an example component and example
command or generator.
  
### Remove

```
ignite remove {ignite plugin name} [--confirm]
```

Removes an Ignite plugin. You can add `--confirm` which automatically answers
"yes" to the remove generator confirmation question.
  
The opposite of `ignite add`, this removes a plugin from your project. Be warned
that this may change other files in your project, e.g. to undo changes made by
`add`. There is a potential for danger here, so you may want to consider using
version control to be on the safe side.
  
### Spork  

```
ignite spork
```

Copy templates as blueprints for this project

Ignite is opinionated. Spork lets you avoid those opinions by "forking" the
template. Like a 'fork' on a git repo. `ignite spork` looks at the generators,
then looks at the templates. You then select the things you want to make a copy
off. They then live in `ignite/Spork/...`.

After entering ignite spork, you will be presented with a list of available
templates to spork. Cycle through them with arrow keys, select the desired
templates with `space` and finish with `enter`.

Spork lets you be kinda happy with someone else's template, but then change it
to your liking. For example, different linting, new headers, etc.
  
  
### Version  

```
ignite version
```

Prints current version of installed ignite.

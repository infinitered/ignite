# Creating an Ignite CLI Generator

This document will walk you through creating your own Ignite CLI generator. A generator will allow your users to create customized files from templates by using the `ignite generate` command on the command line.

A generator is just a [Gluegun](https://github.com/infinitered/gluegun)-powered command in the folder `commands/generate`.

Since generators are plugins, you'll start out creating them the same as you would any [plugin](./creating-plugins.md), with

```sh
$ ignite plugin new {generator name}
```

You should answer "yes" to

`Would you like to generate an example component?` and `Would you like to generate an example command/generator?`

## Setting up the generator

Go into the directory Ignite CLI created.

```sh
$ cd {generator name}
```

Within your project you will find two directories, `commands` and `templates`.

By answering `yes` to the generator question, you will be given the files necessary to create a functioning generator, with all the essential logic and content.

```sh
.
├── commands
│   └── generate.js
│   └── generate
│       └── example.js
├── index.js
├── package.json
└── templates
    └── my-generator-example.js
```

`commands/generate/example.js` exports a function whose responsibility is to queue a job to copy the template to the project. `templates/my-generator-example.js` (or `{generator name}-example.js`) is the template that will be copied over. Rename or copy these files appropriately for your generator. The other files are standard plugin files; see the plugin guide to review plugins.

In the example `commands/generate/example.js`, you can see that the generator function accepts a `toolbox` parameter. You can use this to prompt the user to select options from a list. The following is an example of this from the ListView generator.

```javascript
// which type of grid?
const message = 'What kind of ListView would you like to generate?'
const choices = ['Row', 'With Sections', 'Grid']

// pick one
let type = parameters.options.type
if (!type) {
  const answers = await context.prompt.ask({ name: 'type', type: 'list', message, choices })
  type = answers.type
}
```

This example uses the resulting `type` to select a template from several available to copy. It passes the name of that template when it queues its jobs, and the job handler copies the template with that name.

```javascript
// commands/listview.js
const componentTemplate = type === 'With Sections' ? 'listview-sections' : 'listview'
const jobs = [{ template: `${componentTemplate}.ejs`, target: `app/components/${name}.js` }]

// Job handler
await generate({
  template: job.template,
  target: job.target,
  props,
})
```

This is just one example to show you the basic idea of generators. Now you can
get creative and do cool things with your own generators!

## Gluegun

The [Gluegun](https://github.com/infinitered/gluegun) toolkit can be very helpful in writing generators. `Gluegun` is a tool for building CLIs (we mention it in the Creating Plugins guide).

Gluegun's included libraries handle templating, filesystem operations, command line handling, copy and paste, and more. These features can make writing generators a breeze.

For more information, check out the [Gluegun repo](https://github.com/infinitered/gluegun).

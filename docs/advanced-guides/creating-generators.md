# Creating an Ignite Generator

This document will walk you through creating your own Ignite 2.0 generator. A
generator will allow your users to create customized files from templates by
using the `ignite generate` command on the command line.

A generator is a special kind of Ignite 2.0 module Generators are more advanced
than common plugins. You should understand how to create plugins first; check
out [Creating Plugins]() first if you need to review.  

Since generators are plugins, you'll start out creating them the same as you
would any plugin, with

```
ignite plugin new {generator name}
```

You should answer "yes" to

`Would you like to generate an example component?` and `Would you like to
generate an example command/generator?`

## Setting up the generator

Go into the directory Ignite created.

`cd {generator name}`

Within your project you will find two directories, `commands` and `templates`.

Commands hold the code that will run when users use the `ignite generate`
command. They will then output the contents of a file in `templates`, customized
according to the logic in your command.

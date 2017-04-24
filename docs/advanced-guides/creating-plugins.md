# Creating an Ignite Plugin

This document will walk you through creating your very own Ignite plugin from a 3rd party library

We will be using https://github.com/ArnaudRinquin/react-native-radio-buttons as an example.

### Generate a basic plugin structure


Run the provided plugin generator. Ignite will automatically prepend your package name with `ignite-`.

```
$ ignite plugin new radio-buttons
```

### Update the `package.json`

Open up `package.json` and add your desired info.

```json
{
  "name": "ignite-radio-buttons",
  "version": "0.0.1",
  "description": "An Ignite plugin for react-native-radio-buttons.",
  "license": "MIT",
  "devDependencies": {},
  "url": "https://github.com/infinitered/ignite-radio-buttons/issues",
  "author": {
    "name": "Robin Heinze",
    "email": "robin@infinite.red",
    "url": "https://infinite.red"
  }
}
```

### Edit the `plugin.js`

The `plugin.js` file is the entrypoint for your plugin and provides the add/remove functionality. We need to make sure that the npm packages installed and component examples are copied over.

1. Change the `NPM_MODULE_NAME` to `react-native-radio-buttons`
2. Since this npm package does not require a linking step, we remove `{link: true}` from `ignite.addModule` and remove `{unlink: false}` from `ignite.removeModule`.
3. Make sure `EXAMPLE_FILE` matches the filename under `templates`

### Add content to the example template

`templates/RadioButtonsExample.js.ejs`

```
import React from 'react'
import { View, Text } from 'react-native'
import ExamplesRegistry from '../../../App/Services/ExamplesRegistry'

// Example
ExamplesRegistry.addPluginExample('RadioButtons', () =>
  <View>
    <Text style={{color: '#ffffff'}}>Hello Radio Button</Text>
  </View>
)
```

### Add the plugin to the Ignite application

Since we are still developing our plugin, and it doesn't exist on npm yet, From within the root of `OurApp`, we run:

```
ignite add ~/path/to/ignite-radio-buttons
```

If we had already published our new plugin to npm as `ignite-radio-buttons`, we would instead run:

```
ignite add radio-buttons
```

### Build your app!

```
react-native run-ios
```

### Gluegun

`Gluegun` is a tool for building CLIs, and could be useful in building Ignite
plugins. Gluegun allows you to "glue together" existing CLIs, whether third
party or your own, into one. Ignite itself makes use of Gluegun.

Gluegun comes equipped with some outstanding libraries that fulfill common CLI
needs, such as templating, filesystem operations, command line handling, copy
and paste, and more.

For more information, check out the [Gluegun
repo](https://github.com/infinitered/gluegun).

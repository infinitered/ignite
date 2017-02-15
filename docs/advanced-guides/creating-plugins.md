# Creating an Ignite Plugin

## This document will walk you through creating your very own Ignite plugin from a 3rd party library

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
  "description": "",
  "license": "MIT",
  "devDependencies": {},
  "url": "https://github.com/infinitered/ignite-radio-buttons/issues",
  "author": {
    "name": "Robin Heinze",
    "email": "robin@infinite.red",
    "url": "https://infinite.red"
  },
  "devEngines": {
    "node": ">=7.x",
    "npm": ">=4.x"
  }
}
```

### Edit the `index.js`

The `index.js` is the entrypoint for your plugin and provides the add/remove functionality. We need to make sure that the npm packages installed and component examples are copied over. 

1. Change the `NPM_MODULE_NAME` to `react-native-radio-buttons`
2. Since this npm package does not require a linking step, we will change `ignite.addModule` to have `link: false` and `ignite.removeModule` to have `unlink: false`

### Add content to the example template

```
// @flow

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

### Publish your npm module

```
npm publish
```

### Add the plugin to your Ignite application

From within `OurApp/ignite/plugins`, we run: 

```
ignite add radio-buttons
```

# Creating an Ignite CLI Plugin

This document will walk you through creating your very own Ignite CLI plugin from a 3rd party library

We will be using https://github.com/ArnaudRinquin/react-native-radio-buttons as an example.

### Generate a basic plugin structure


Run the provided plugin generator. Ignite CLI will automatically prepend your package name with `ignite-`.

```
$ ignite plugin new radio-buttons
```

### Update the `package.json`

Open up `package.json` and add your desired info.

```json
{
  "name": "ignite-radio-buttons",
  "version": "0.0.1",
  "description": "An Ignite CLI plugin for react-native-radio-buttons.",
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
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import ExamplesRegistry from '../../../App/Services/ExamplesRegistry'
import { RadioButtons } from 'react-native-radio-buttons'

// Example
ExamplesRegistry.addPluginExample('RadioButtons', () =>
  <View style={{margin: 20}}>
    <RadioButtons
      options={options}
      onSelection={ setSelectedOption.bind(this) }
      selectedOption={ options.first } // In your application, this would be { this.state.selectedOption }
      renderOption={ renderOption }
      renderContainer={ renderContainer }
    />
  </View>
)

const options = [
  "Option 1",
  "Option 2"
]

const setSelectedOption = (selectedOption) => {
  // In your application code, you would set selectedOption in state: `this.setState({selectedOption: selectedOption})`
  window.alert(`${selectedOption} pressed`)
}

const renderOption = (option, selected, onSelect, index) => {
  const style = selected ? { fontWeight: 'bold'} : {}

  return (
    <TouchableWithoutFeedback onPress={onSelect} key={index}>
      <View>
        <Text style={[style, { color: 'white'}]}>{option}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const renderContainer = (optionNodes) => {
  return <View>{optionNodes}</View>
}

```

### Add the plugin to the Ignite application

```
ignite add radio-buttons
```

NOTE: If your plugin is not on npm yet, Make sure you have `IGNITE_PLUGIN_PATH` set as an ENV variable in your shell profile. It should point to the directory that contains the plugin you are writing.

```
~/.bash_profile


export IGNITE_PLUGIN_PATH="/Users/robinheinze/Code/packages/"
```

### Build your app!

```
react-native run-ios
```

You can view your plugin example in the Plugin Examples section of the dev screens.

### Gluegun

`Gluegun` is a tool for building CLIs, and is useful when you're building Ignite CLI
plugins. Gluegun allows you to "glue together" existing CLIs, whether third party
or your own, into one. Ignite CLI itself makes use of Gluegun.

Gluegun comes equipped with some outstanding libraries that fulfill common CLI
needs, such as templating, filesystem operations, command line handling, copy
and paste, and more.

For more information, check out the [Gluegun
repo](https://github.com/infinitered/gluegun).

import React, {View} from 'react-native'
import R from 'ramda'
let globalExamplesRegistry = []

export const addExample = (renderExampleFunc) => globalExamplesRegistry.push(renderExampleFunc)

const renderExample = (example) => example.call()

export const renderExamples = () => (
  <View>
    {R.map(renderExample, globalExamplesRegistry)}
  </View>
)

// Default for readability
export default {
  add: addExample
}

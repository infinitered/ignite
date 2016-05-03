import React, {View} from 'react-native'
import R from 'ramda'
import DebugSettings from '../Config/DebugSettings'
let globalExamplesRegistry = []

export const addExample = (renderExampleFunc) => { if (DebugSettings.includeExamples) globalExamplesRegistry.push(renderExampleFunc) }

const renderExample = (example) => example.call()

export const renderExamples = () => (
  <View>
    {R.map(renderExample, globalExamplesRegistry)}
  </View>
)

// Default for readability
export default {
  render: renderExamples,
  add: addExample
}

import React from 'react'
import {Text, View} from 'react-native'
import R from 'ramda'
import { ApplicationStyles } from '../Themes'
import DebugSettings from '../Config/DebugSettings'
let globalExamplesRegistry = []

export const addExample = (title, usage) => { if (DebugSettings.includeExamples) globalExamplesRegistry.push({title, usage}) }

const renderExample = (example) => {
  return (
    <View key={example.title}>
      <View style={ApplicationStyles.darkLabelContainer}>
        <Text style={ApplicationStyles.darkLabel}>{example.title}</Text>
      </View>
      {example.usage.call()}
    </View>
  )
}

export const renderExamples = () => R.map(renderExample, globalExamplesRegistry)

// Default for readability
export default {
  render: renderExamples,
  add: addExample
}

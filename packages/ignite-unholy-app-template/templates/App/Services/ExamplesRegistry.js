// @flow

import React from 'react'
import { Text, View } from 'react-native'
import R from 'ramda'
import { ApplicationStyles } from '../Themes'
import DebugConfig from '../Config/DebugConfig'
let globalComponentExamplesRegistry = []
let globalPluginExamplesRegistry = []

export const addComponentExample = (title: string, usage: () => React$Element<*>) => { if (DebugConfig.includeExamples) globalComponentExamplesRegistry.push({title, usage}) }

export const addPluginExample = (title: string, usage: () => React$Element<*>) => { if (DebugConfig.includeExamples) globalPluginExamplesRegistry.push({title, usage})}

const renderComponentExample = (example: Object) => {
  return (
    <View key={example.title}>
      <View style={ApplicationStyles.darkLabelContainer}>
        <Text style={ApplicationStyles.darkLabel}>{example.title}</Text>
      </View>
      {example.usage.call()}
    </View>
  )
}

const renderPluginExample = (example: Object) => {
  return (
    <View key={example.title}>
      <View style={ApplicationStyles.darkLabelContainer}>
        <Text style={ApplicationStyles.darkLabel}>{example.title}</Text>
      </View>
      {example.usage.call()}
    </View>
  )
}

export const renderComponentExamples = () => R.map(renderComponentExample, globalComponentExamplesRegistry)

export const renderPluginExamples = () => R.map(renderPluginExample, globalPluginExamplesRegistry)


// Default for readability
export default {
  renderComponentExamples,
  addComponentExample,
  renderPluginExamples,
  addPluginExample
}

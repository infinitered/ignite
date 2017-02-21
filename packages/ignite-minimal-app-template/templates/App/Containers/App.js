// @flow

import '../Config'
import React, { Component } from 'react'
import RootContainer from './RootContainer'

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <RootContainer />
    )
  }
}

export default App

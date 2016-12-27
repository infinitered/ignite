// @flow

import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Example
ExamplesRegistry.add('Alert Message', () =>
  <View style={styles.groupContainer}>
    <TouchableOpacity onPress={this.handlePressRocket}>
      <Icon name='rocket' size={Metrics.icons.medium} color={Colors.ember} />
    </TouchableOpacity>
    <TouchableOpacity onPress={this.handlePressSend}>
      <Icon name='send' size={Metrics.icons.medium} color={Colors.error} />
    </TouchableOpacity>
    <TouchableOpacity onPress={this.handlePressStar}>
      <Icon name='star' size={Metrics.icons.medium} color={Colors.snow} />
    </TouchableOpacity>
    <Icon name='trophy' size={Metrics.icons.medium} color={Colors.error} />
    <Icon name='warning' size={Metrics.icons.medium} color={Colors.ember} />
  </View>
)

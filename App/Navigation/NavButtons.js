import React, { TouchableOpacity, View } from 'react-native'

export default {
  searchButton: (onPressFunction) => {
    return (
      <SearchButton
        onPress={onPressFunction}
      />
    )
  },
  mapButton: (onPressFunction) => {
    return (
      <MapButton
        onPress={onPressFunction}
      />
    )
  },
  composeButton: (onPressFunction) => {
    return (
      <ComposeButton
        onPress={onPressFunction}
      />
    )
  },
  backButton: (onPressFunction) => {
    return (
      <BackButton
        onPress={onPressFunction}
      />
    )
  }
}

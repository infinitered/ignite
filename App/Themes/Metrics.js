import React from 'react-native'

const { width, height } = React.Dimensions.get('window')

// Used via Metrics.baseMargin
// or Metrics.fonts.tiny
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  baseMargin: 10,
  smallMargin: 5,
  horizontalLineHeight: 1,
  screenWidth: width,
  screenHeight: height,
  navBarHeight: 64,
  buttonRadius: 4,
  icons: {
    tiny: {
      size: 15,
      frameSize: 20
    },
    small: {
      size: 20,
      frameSize: 30
    },
    medium: {
      size: 30,
      frameSize: 35
    },
    large: {
      size: 45,
      frameSize: 45
    },
    largest: {
      size: 60,
      frameSize: 60
    }
  },
  fonts: {
    title: 40,
    input: 18,
    regular: 17,
    medium: 14,
    small: 12,
    tiny: 8.5
  }
}

export default metrics

import React from 'react-native'

const { width, height } = React.Dimensions.get('window')

// Used via Metrics.baseMargin
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
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  }
}

export default metrics

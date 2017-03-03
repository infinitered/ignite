import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  icons: {
    large: 45,
    xl: 50
  },
  images: {
    logo: 200
  }
}

export default metrics

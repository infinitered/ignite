// @flow

import I18n from 'react-native-i18n'

export default (kelvin: number) => {
  const celcius = kelvin - 273.15
  const farenheit = (celcius * 1.8000) + 32

  if (I18n.t('tempIndicator') === 'F') {
    return Math.round(farenheit)
  } else {
    return Math.round(celcius)
  }
}

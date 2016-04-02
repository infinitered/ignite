import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

// I18n
import I18n from '../I18n/I18n.js'

export function * getWeather (city) {
  const client = Client({ baseUrl: 'http://openweathermap.org/data/2.1' })
  const response = yield call(client.get, 'find/name', { q: city })
  const { ok, json } = response
  if (ok) {
    const kelvin = R.path(['list', 0, 'main', 'temp'], json)
    const celcius = kelvin - 273.15
    const farenheit = (celcius * 1.8000) + 32

    if (I18n.t('tempIndicator') === 'F') {
      yield put(Actions.receiveTemperature(Math.round(farenheit)))
    } else {
      yield put(Actions.receiveTemperature(Math.round(celcius)))
    }
  } else {
    yield put(Actions.receiveTemperatureFailure())
  }
}

export function * watchWeatherRequest () {
  while (true) {
    const action = yield take(Types.TEMPERATURE_REQUEST)
    const { city } = action
    yield call(getWeather, city)
  }
}

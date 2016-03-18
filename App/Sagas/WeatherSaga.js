import Client from '../Services/HttpClient'
import { take, call, put } from 'redux-saga/effects'
import R from 'ramda'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

export function * getWeather (city) {
  const client = Client({ baseUrl: 'http://openweathermap.org/data/2.1' })
  const response = yield call(client.get, 'find/name', { q: city })
  const { ok, json } = response
  if (ok) {
    const kelvin = R.path(['list', 0, 'main', 'temp'], json)
    const temp = Math.round(((kelvin - 273.15) * 1.8000) + 32)
    yield put(Actions.receiveTemperature(temp))
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

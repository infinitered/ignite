import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import { Actions as TemperatureActions, convertFromKelvin } from '../Redux/TemperatureRedux'

export function * getTemperature (api, action) {
  const { city } = action
  // make the call to the api
  const response = yield call(api.getCity, city)

  // success?
  if (response.ok) {
    const kelvin = path(['data', 'main', 'temp_max'], response)
    const temperature = convertFromKelvin(kelvin)
    yield put(TemperatureActions.receiveTemperature(temperature))
  } else {
    yield put(TemperatureActions.receiveTemperatureFailure())
  }
}

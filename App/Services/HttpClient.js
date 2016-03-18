import R from 'ramda'
import QueryString from 'querystringify'

const within = R.curry(
  (min, max, value) => R.allPass([R.gte(value, min), R.gt(max, value)])
)
const is200s = within(200, 299)
const is400s = within(400, 499)
const is500s = within(500, 599)

const GET = 'GET'
const POST = 'POST'
const PATCH = 'PATCH'
const PUT = 'PUT'
const DELETE = 'DELETE'
const HEAD = 'HEAD'

const parametersForQueryString = R.contains(R.__, [GET, DELETE, HEAD])
const parametersForBody = R.contains(R.__, [POST, PATCH, PUT])
const parametersIsObject = R.allPass([R.is(Object), R.complement(R.isEmpty)])

export const REASON_GONE = 'gone'
export const REASON_REQUEST = 'request'
export const REASON_SERVER = 'server'
export const REASON_CONNECTION = 'connection'
export const REASON_UNKNOWN = 'unknown'

const statusCodeToReason = (status) => {
  if (R.isNil(status)) return REASON_UNKNOWN
  if (status === 404) return REASON_GONE
  if (is400s(status)) return REASON_REQUEST
  if (is500s(status)) return REASON_SERVER
  return REASON_UNKNOWN
}

// log the request if needed
const logRequest = (url, method, body) => {
  console.log(`=---> ${method.toUpperCase()} ${url}`)
  console.log(body)
}

// log the response if needed
const logResponse = (url, method, timeElapsed, json) => {
  console.log(`<---= ${method.toUpperCase()} ${url}   | ${timeElapsed}ms`)
  console.log(json)
}

/** Makes an HTTP call to the server. */
const httpCall = (options) => {
  const {
    method,
    parameters,
    headers = {},
    logging = false
  } = options

  let url = options.url

  const fetchOptions = { method, headers }

  // set the JSON body if we have one
  if (parametersForBody(method) && parametersIsObject(parameters)) {
    fetchOptions.body = JSON.stringify(parameters)
  } else if (parametersForQueryString(method) && parametersIsObject(parameters)) {
    url = R.concat(url, QueryString.stringify(parameters, true))
  }

  if (logging) {
    logRequest(url, method, parameters)
  }

  // start the clock
  const timeStart = Date.now()

  // make the call and wait
  return new Promise((resolve, reject) => {
    const clientResponse = {
      ok: false,
      json: null,
      statusCode: null
    }

    // call fetch
    fetch(url, fetchOptions)
      .then(fetchResponse => {
        const { status, statusText } = fetchResponse
        // tuck these in the client response
        clientResponse.statusCode = status
        clientResponse.statusText = statusText
        if (is200s(status)) return fetchResponse // I believe fetch traverses 300's

        // let's intentional trip this error so we arrive in the catch block below
        const err = new Error(fetchResponse.statusText)
        err.status = status
        throw err
      })
      .then(fetchResponse => {
        // TODO: not all responses need be JSON, maybe a style option can drive this?
        return fetchResponse.json()
      })
      .then(json => {
        if (logging) {
          logResponse(url, method, Date.now() - timeStart, json)
        }
        clientResponse.ok = true
        clientResponse.json = json
        resolve(clientResponse)
      })
      .catch(error => {
        const status = error.status
        clientResponse.reason = statusCodeToReason(status)
        resolve(clientResponse)
      })
  })
}

export default (options = {}) => {
  const { logging = false } = options
  const { baseUrl } = options
  // maybe introduce api style?  so we're not hard-coding json only?
  const defaultHeaders = { 'Content-Type': 'application/json' }
  const mergeHeaders = R.merge(Object.assign({}, defaultHeaders, options.headers))

  // a way to create functions for each HTTP method
  const httpMethodMaker = (method) => (url, parameters, headers = {}) =>
    httpCall({
      url: R.isNil(baseUrl) ? url : `${baseUrl}/${url}`,
      method,
      parameters,
      headers: mergeHeaders(headers),
      logging
    })

  // the interface of HttpClient
  return {
    // HTTP methods
    get: httpMethodMaker(GET),
    delete: httpMethodMaker(DELETE),
    head: httpMethodMaker(HEAD),
    post: httpMethodMaker(POST),
    put: httpMethodMaker(PUT),
    patch: httpMethodMaker(PATCH),
    // configuration
    logging,
    baseUrl,
    headers: options.headers
  }
}

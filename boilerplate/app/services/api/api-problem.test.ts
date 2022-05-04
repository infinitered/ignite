import { ApiResponse } from 'apisauce'
import { errorMessages } from '../../utils/features'

export type ApiError = {
  error: string
}

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: 'timeout'; temporary: true, error?: string }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: 'cannot-connect'; temporary: true, error?: string }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: 'server', error?: string }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: 'unauthorized', error?: undefined }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: 'forbidden', error?: undefined }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: 'not-found', error?: string }
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected', error?: string }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: 'unknown'; temporary: true, error?: string }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data', error?: string }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | null {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return {
        kind: 'cannot-connect',
        temporary: true,
        error: errorMessages.internetError
      }
    case 'NETWORK_ERROR':
      return {
        kind: 'cannot-connect',
        temporary: true,
        error: errorMessages.internetError
      }
    case 'TIMEOUT_ERROR':
      return {
        kind: 'timeout',
        temporary: true,
        error: errorMessages.timeoutError
      }
    case 'SERVER_ERROR':
      return {
        kind: 'server',
        error: errorMessages.timeoutError
      }
    case 'UNKNOWN_ERROR':
      return {
        kind: 'unknown',
        temporary: true,
        error: errorMessages.timeoutError
      }
    case 'CLIENT_ERROR':

      switch (response.status) {
        case 401:
          return { kind: 'unauthorized' }
        case 403:
          return { kind: 'forbidden' }
        case 404:
          return {
            kind: 'not-found',
            error: response?.data?.error || errorMessages.timeoutError
          }
        default:
          return {
            kind: 'rejected',
            error: response?.data?.error || errorMessages.timeoutError
          }
      }
    case 'CANCEL_ERROR':
      return null
  }

  return null
}

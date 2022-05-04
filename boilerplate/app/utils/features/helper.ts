import { Alert, Linking, NativeScrollEvent, Platform } from 'react-native';
import RNFetchBlob, { RNFetchBlobConfig, FetchBlobResponse } from 'rn-fetch-blob';
import { CurrencyTypeEnum, CallConfig } from './types';
import { ApisauceInstance, ApiResponse } from 'apisauce';
import { AxiosRequestConfig, Method } from 'axios'
import { loadString } from '../storage';
import { API_TOKEN_STORAGE_KEY } from './constants';
import { getSnapshot as snapshot } from 'mobx-state-tree';

/**
 * Trigger permission alert
 *
 * @param {string} messagePermission
 */
export const triggerPermissionAlert = (messagePermission: string) => {
  Alert.alert(
    messagePermission,
    '',
    [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Paramètres',
        onPress: () => Linking.openURL('app-settings:')
      }
    ],
    { cancelable: false }
  );
};

export const isScrollViewCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent, padding: number): boolean => {
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - padding;
};

export const openGps = (lat: number, lng: number) => {
  const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  const url = `${scheme}${lat},${lng}`;
  Linking.openURL(url);
}

export /**
 * Download file
 *
 * @param {string} uri
 * @param {string} fileName
 * @param {string} [type]
 * @param {boolean} [secure]
 * @returns {Promise<FetchBlobResponse>}
 */
const downloadFile = async (uri: string, fileName: string, type?: string, secure?: boolean, method?: Method, body?: any): Promise<FetchBlobResponse> => {
  const { config, fs } = RNFetchBlob
  const { DocumentDir, DownloadDir } = fs.dirs

  const newMethod: any = method || 'GET'

  let token: string
  if (secure) token = await loadString(API_TOKEN_STORAGE_KEY)

  const configOptions: RNFetchBlobConfig = Platform.select({
    ios: {
      fileCache: true,
      path: `${DocumentDir}/${fileName}`
    },
    android: {
      fileCache: true,
      addAndroidDownloads: {
        path: `${DownloadDir}/${fileName}`,
        useDownloadManager: true,
        title: fileName,
        mediaScannable: true,
        notification: true,
      },
    },
  });
  return config(configOptions).fetch(
    newMethod,
    uri,
    secure ? {
      'Authorization': `Bearer ${token}`,
    } : undefined, body)
}

// /**
//  * from uri web to image object
//  *
//  * @param {string} uri
//  * @param {number} [id]
//  * @returns {Promise<any>}
//  */
// export const uriToFileObject = async (
//   uri: string,
//   id?: number
// ): Promise<any> => {
//   try {
//     const name: string = uri.substring(uri.lastIndexOf('/') + 1);
//     const type: string = uri.split('.').pop() || 'png';

//     const resp = await RNFetchBlob.config({
//       fileCache: true
//     }).fetch('GET', uri);
//     const newImage: Image = {
//       id,
//       uri: !isIos ? `file://${resp.path()}` : resp.path(),
//       name,
//       type: `image/${type}`
//     };
//     return newImage;
//   } catch {
//     return undefined;
//   }
// };

/**
 * Resolve promise return
 *
 * @export
 * @template Type
 * @param {Type} data
 * @returns
 */
export function resolve<Type>(data: Type) {
  return Promise.resolve(data)
}

export const removeHtmlFromString = (text: string): string => text.replace(/(<([^>]+)>)/ig, '')

export const getSnapshot = (object: any) => {
  return object ? snapshot(object) : object
}

/**
 * Format Money
 *
 * @param {number} amount
 * @param {number} [decimalCount=2]
 * @param {string} [decimal='.']
 * @param {string} [thousands=',']
 * @returns
 */
export const formatMoney = (
  value: number,
  significantDigits = 0,
  thousandsSeparator = ' ',
  decimalSeparator = ',',
  symbol = 'MAD',
  position = CurrencyTypeEnum.Right
) => {
  const options = {
    significantDigits,
    thousandsSeparator,
    decimalSeparator,
  }
  if (typeof value !== 'number') value = 0.0
  const newValue = value.toFixed(options.significantDigits)

  const [currency, decimal] = newValue.split('.')
  return `${symbol && position === CurrencyTypeEnum.Left ? `${symbol} ` : ''}${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${significantDigits ? options.decimalSeparator : ''}${decimal || ''} ${symbol && position === CurrencyTypeEnum.Right ? `${symbol}` : ''}`
};

export const valueByPercent = (value: number, percent: number): number => {
  return (percent / 100) * value
}

export const fromDataToFormData = (data: any, name?: string): FormData => {
  const formData = new FormData();
  appendFormdata(formData, data, name)
  return formData
}

/**
 * Append data to form data
 *
 * @export
 * @param {FormData} formData
 * @param {any} data
 * @param {string} name
 */
export function appendFormdata(formData: FormData, data: any, name?: string) {
  // eslint-disable-next-line no-param-reassign
  name = name || '';
  if (typeof data === 'object' && data && 'uri' in data === false) {
    for (const property in data) {
      if (name === '') {
        appendFormdata(formData, data[property], property);
      } else {
        appendFormdata(formData, data[property], `${name}[${property}]`);
      }
    }
  } else {
    if (data !== undefined && data !== null) {
      let newData;
      if (typeof data === 'boolean') {
        newData = data ? 1 : 0
      } else {
        newData = data
      }
      formData.append(name, newData);
    }
  }
}

/// ///////////////// API //////////////////////////

const prepareHeaders = async ({ secure }: CallConfig = {}) => {
  let headers = {}
  const [token] = await Promise.all([loadString(API_TOKEN_STORAGE_KEY)]);
  if (secure) {
    if (token) {
      headers = {
        'Authorization': `Bearer ${token}`,
      }
    }
  }
  return headers
}

/**
 * Global Call api
 *
 * @param {ApisauceInstance} apisauceInstance
 * @param {AxiosRequestConfig} apiConfig
 * @param {CallConfig} [callConfig={}]
 * @returns {Promise<ApiResponse<any>>}
 */
export const callApiSauce = async (
  apisauceInstance: ApisauceInstance,
  apiConfig: AxiosRequestConfig | any,
  callConfig: CallConfig = {}): Promise<ApiResponse<any>> => {
  const headers = await prepareHeaders(callConfig)

  return apisauceInstance.any({
    ...apiConfig,
    headers: {
      ...apiConfig.headers,
      ...headers
    },
  })
}

/// ///////////////// APP ///////////////////////////

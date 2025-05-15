// we always make sure 'react-native' gets included first
import * as ReactNative from 'react-native';
import mockFile from './mockFile';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// Only mock useScrollToTop

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useScrollToTop: jest.fn(),
}));

jest.mock('expo-linking');
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true, {}]),
}));
jest.mock('expo-asset');

jest.mock('react-native/Libraries/LogBox/LogBox', () => ({
  __esModule: true,
  default: {
    ignoreLogs: jest.fn(),
    ignoreAllLogs: jest.fn(),
  },
}));

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
// libraries to mock
jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn(
          (
            uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  );
});

jest.mock('expo-localization', () => ({
  ...jest.requireActual('expo-localization'),
  getLocales: () => [{ languageTag: 'en-US', textDirection: 'ltr' }],
}));

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest'),
);

declare const tron; // eslint-disable-line @typescript-eslint/no-unused-vars

declare global {
  let __TEST__: boolean;
}

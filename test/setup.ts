/* Global test setup. Mock at the network/native boundary, never internal modules. */
import '@testing-library/react-native/extend-expect';

import { server } from './msw/server';

// MSW intercepts HTTP at the XHR / fetch boundary (covers axios).
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Native module mocks — stubbed at the JS boundary, NOT internal app code.
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(async () => null),
  setItemAsync: jest.fn(async () => undefined),
  deleteItemAsync: jest.fn(async () => undefined),
  AFTER_FIRST_UNLOCK: 'AFTER_FIRST_UNLOCK',
}));

jest.mock('react-native-mmkv', () => {
  class MockMMKV {
    private map = new Map<string, string>();
    set(key: string, value: string) {
      this.map.set(key, value);
    }
    getString(key: string) {
      return this.map.get(key);
    }
    delete(key: string) {
      this.map.delete(key);
    }
    clearAll() {
      this.map.clear();
    }
  }
  return { MMKV: MockMMKV };
});

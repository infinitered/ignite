import * as SecureStore from 'expo-secure-store';

/**
 * Encrypted async key-value store for SECRETS only: auth tokens, refresh
 * tokens, biometric flags, anything sensitive. Never PII profile data
 * (use the API + cache for that).
 *
 * Backed by Keychain (iOS) / Keystore (Android). Slower than MMKV;
 * call sparingly, cache token in memory after first read if needed.
 */

const AUTH_TOKEN_KEY = 'auth.token';
const REFRESH_TOKEN_KEY = 'auth.refresh_token';

export async function getAuthToken(): Promise<string | null> {
  return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

export async function setAuthToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
  });
}

export async function clearAuthTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(AUTH_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
  ]);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function setRefreshToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
  });
}

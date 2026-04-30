import { create } from 'zustand';

import { clearAuthTokens, getAuthToken, setAuthToken } from '@/lib/secureStorage';

/**
 * Auth session store. Tokens persist via expo-secure-store (Keychain /
 * Keystore) — NEVER via MMKV. The token is rehydrated into memory on
 * `bootstrap()` for fast access; do NOT add it to the persisted state.
 */

type SessionState = {
  token: string | null;
  isHydrated: boolean;
};

type SessionActions = {
  bootstrap: () => Promise<void>;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useSessionStore = create<SessionState & SessionActions>((set) => ({
  token: null,
  isHydrated: false,

  bootstrap: async () => {
    const token = await getAuthToken();
    set({ token, isHydrated: true });
  },

  signIn: async (token) => {
    await setAuthToken(token);
    set({ token });
  },

  signOut: async () => {
    await clearAuthTokens();
    set({ token: null });
  },
}));

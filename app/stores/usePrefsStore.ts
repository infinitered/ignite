import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandMMKVStorage } from '@/lib/storage';

/**
 * Example Zustand store with MMKV-backed persistence. Use this pattern
 * for non-secret UI state that should survive app reloads (theme,
 * language, last-viewed feed item, etc.).
 *
 * For SECRETS (auth tokens), use `useSessionStore` instead — it talks
 * to expo-secure-store, never MMKV.
 */

type ColorScheme = 'light' | 'dark' | 'system';

type PrefsState = {
  colorScheme: ColorScheme;
  hasCompletedOnboarding: boolean;
  exampleCounter: number;
};

type PrefsActions = {
  setColorScheme: (scheme: ColorScheme) => void;
  completeOnboarding: () => void;
  incrementCounter: () => void;
  resetCounter: () => void;
};

export const usePrefsStore = create<PrefsState & PrefsActions>()(
  persist(
    (set) => ({
      colorScheme: 'system',
      hasCompletedOnboarding: false,
      exampleCounter: 0,
      setColorScheme: (colorScheme) => set({ colorScheme }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      incrementCounter: () => set((state) => ({ exampleCounter: state.exampleCounter + 1 })),
      resetCounter: () => set({ exampleCounter: 0 }),
    }),
    {
      name: 'app.prefs',
      storage: createJSONStorage(() => zustandMMKVStorage),
      version: 1,
    }
  )
);

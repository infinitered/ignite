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
  // @demo remove-block
  exampleCounter: number;
  // @demo remove-block-end
};

type PrefsActions = {
  setColorScheme: (scheme: ColorScheme) => void;
  completeOnboarding: () => void;
  // @demo remove-block
  incrementCounter: () => void;
  resetCounter: () => void;
  // @demo remove-block-end
};

export const usePrefsStore = create<PrefsState & PrefsActions>()(
  persist(
    (set) => ({
      colorScheme: 'system',
      hasCompletedOnboarding: false,
      // @demo remove-block
      exampleCounter: 0,
      // @demo remove-block-end
      setColorScheme: (colorScheme) => set({ colorScheme }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      // @demo remove-block
      incrementCounter: () => set((state) => ({ exampleCounter: state.exampleCounter + 1 })),
      resetCounter: () => set({ exampleCounter: 0 }),
      // @demo remove-block-end
    }),
    {
      name: 'app.prefs',
      storage: createJSONStorage(() => zustandMMKVStorage),
      version: 1,
    }
  )
);

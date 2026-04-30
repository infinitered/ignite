import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandMMKVStorage } from '@/lib/storage';

type State = {
  // TODO: state shape
  value: string;
};

type Actions = {
  setValue: (value: string) => void;
  reset: () => void;
};

const initial: State = {
  value: '',
};

/**
 * TODO: describe what {{Name}} state lives here. Use Zustand for UI /
 * ephemeral state. NEVER server data — that lives in TanStack Query.
 *
 * Drop the `persist` wrapper if you don't want to survive app reloads.
 * NEVER persist secrets via MMKV — use expo-secure-store + a non-persisted
 * store (see `useSessionStore` for the pattern).
 */
export const use{{Name}}Store = create<State & Actions>()(
  persist(
    (set) => ({
      ...initial,
      setValue: (value) => set({ value }),
      reset: () => set(initial),
    }),
    {
      name: 'app.{{kebab-name}}',
      storage: createJSONStorage(() => zustandMMKVStorage),
      version: 1,
    }
  )
);

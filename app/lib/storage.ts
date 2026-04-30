import { MMKV } from 'react-native-mmkv';

/**
 * MMKV-backed sync key-value store. Use for non-secret persistence:
 * preferences, query cache hydration, last-known UI state. NEVER for
 * tokens or PII — use `secureStorage.ts` for those.
 *
 * MMKV is mmap-backed, instant, and ~30× faster than AsyncStorage.
 */
const mmkv = new MMKV({ id: 'app.storage' });

export const storage = {
  get<T>(key: string): T | undefined {
    const raw = mmkv.getString(key);
    if (raw == null) return undefined;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  },

  set<T>(key: string, value: T): void {
    mmkv.set(key, JSON.stringify(value));
  },

  remove(key: string): void {
    mmkv.delete(key);
  },

  clearAll(): void {
    mmkv.clearAll();
  },
};

/**
 * Adapter compatible with Zustand's `persist` middleware.
 *
 * Usage:
 *   import { persist, createJSONStorage } from 'zustand/middleware';
 *   import { zustandMMKVStorage } from '@/lib/storage';
 *   persist(creator, { name: 'prefs', storage: createJSONStorage(() => zustandMMKVStorage) })
 */
export const zustandMMKVStorage = {
  getItem: (name: string): string | null => mmkv.getString(name) ?? null,
  setItem: (name: string, value: string): void => mmkv.set(name, value),
  removeItem: (name: string): void => mmkv.delete(name),
};

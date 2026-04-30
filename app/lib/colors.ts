/**
 * Concrete JS color constants for places React Native cannot resolve
 * Tailwind classNames or CSS variables — most notably native props like
 * `placeholderTextColor`, `tintColor`, and Reanimated `interpolateColor`.
 *
 * These mirror the semantic tokens in `tailwind.config.js` / `global.css`.
 * Update both when the brand changes.
 */
import { useColorScheme } from 'react-native';

const tokens = {
  light: {
    background: '#ffffff',
    foreground: '#111827',
    muted: '#f3f4f6',
    mutedForeground: '#6b7280',
    border: '#e5e7eb',
    primary: '#2f5eff',
    destructive: '#dc2626',
  },
  dark: {
    background: '#111827',
    foreground: '#f3f4f6',
    muted: '#1f2937',
    mutedForeground: '#9ca3af',
    border: '#374151',
    primary: '#5e83ff',
    destructive: '#f87171',
  },
} as const;

export type ThemedColors = (typeof tokens)['light'];

export function useThemedColors(): ThemedColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? tokens.dark : tokens.light;
}

export const lightColors = tokens.light;
export const darkColors = tokens.dark;

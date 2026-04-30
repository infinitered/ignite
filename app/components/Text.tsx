import { forwardRef } from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

import type { TxKeyPath } from '@/i18n';
import { translate } from '@/i18n/translate';

const text = tv({
  base: 'text-foreground font-sans',
  variants: {
    variant: {
      display: 'text-4xl font-sans-bold',
      'heading-1': 'text-3xl font-sans-bold',
      'heading-2': 'text-2xl font-sans-bold',
      'heading-3': 'text-xl font-sans-medium',
      'heading-4': 'text-lg font-sans-medium',
      body: 'text-base',
      'body-bold': 'text-base font-sans-bold',
      caption: 'text-sm text-muted-foreground',
      code: 'text-sm font-mono',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-success',
    },
  },
  defaultVariants: {
    variant: 'body',
    align: 'left',
    tone: 'default',
  },
});

type Variants = VariantProps<typeof text>;

export type TextProps = RNTextProps &
  Variants & {
    /** i18n key — preferred over `children` for any user-visible string. */
    tx?: TxKeyPath;
    /** Fallback raw text (only when truly non-translatable, e.g., counters). */
    text?: string;
    /** Optional className for one-off layout overrides. */
    className?: string;
  };

/**
 * App-wide Text primitive. NEVER import RN's `Text` directly — Biome
 * blocks that. Use `variant` for type scale, `tone` for color,
 * `tx` for i18n keys, and `className` for one-off layout adjustments.
 */
export const Text = forwardRef<RNText, TextProps>(function Text(
  { variant, align, tone, className, tx, text: rawText, children, ...rest },
  ref
) {
  const i18nText = tx ? translate(tx) : undefined;
  const content = i18nText ?? rawText ?? children;
  return (
    <RNText ref={ref} className={text({ variant, align, tone, className })} {...rest}>
      {content}
    </RNText>
  );
});

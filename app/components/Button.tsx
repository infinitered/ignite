import { forwardRef } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

import { Text } from '@/components/Text';
import type { TxKeyPath } from '@/i18n';

const button = tv({
  slots: {
    base: 'flex-row items-center justify-center rounded-md',
    label: 'font-sans-medium text-base',
  },
  variants: {
    variant: {
      primary: { base: 'bg-primary', label: 'text-primary-foreground' },
      secondary: { base: 'bg-muted border border-border', label: 'text-foreground' },
      ghost: { base: 'bg-transparent', label: 'text-foreground' },
      destructive: { base: 'bg-destructive', label: 'text-destructive-foreground' },
      link: { base: 'bg-transparent px-0 py-0', label: 'text-primary underline' },
    },
    size: {
      sm: { base: 'h-8 px-3', label: 'text-sm' },
      md: { base: 'h-11 px-4', label: 'text-base' },
      lg: { base: 'h-13 px-6', label: 'text-lg' },
    },
    state: {
      enabled: { base: 'opacity-100' },
      disabled: { base: 'opacity-50' },
      pressed: { base: 'opacity-80' },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md', state: 'enabled' },
});

type Variants = VariantProps<typeof button>;

export type ButtonProps = Omit<PressableProps, 'children'> &
  Variants & {
    tx?: TxKeyPath;
    text?: string;
    children?: React.ReactNode;
    loading?: boolean;
    className?: string;
    accessibilityLabel: string;
  };

/**
 * App-wide Button primitive. `accessibilityLabel` is required so screen
 * readers always have a label even when there's no visible text (e.g.,
 * icon-only buttons).
 */
export const Button = forwardRef<View, ButtonProps>(function Button(
  {
    variant,
    size,
    tx,
    text,
    children,
    loading,
    disabled,
    className,
    accessibilityLabel,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;
  const styles = button({ variant, size });
  return (
    <Pressable
      ref={ref}
      role="button"
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      hitSlop={8}
      {...rest}
      className={({ pressed }) =>
        styles.base({
          state: isDisabled ? 'disabled' : pressed ? 'pressed' : 'enabled',
          className,
        })
      }
    >
      {loading ? (
        <ActivityIndicator className="text-primary-foreground" />
      ) : (
        <Text className={styles.label()} tx={tx} text={text}>
          {children}
        </Text>
      )}
    </Pressable>
  );
});

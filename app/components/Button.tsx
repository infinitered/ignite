import { forwardRef } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

import { Text } from '@/components/Text';
import type { TxKeyPath } from '@/i18n';

const button = tv({
  slots: {
    base: 'flex-row items-center justify-center rounded-md active:opacity-80 disabled:opacity-50',
    label: 'font-sans-medium text-base',
  },
  variants: {
    variant: {
      primary: { base: 'bg-primary', label: 'text-primary-foreground' },
      secondary: { base: 'bg-muted border border-border', label: 'text-foreground' },
      ghost: { base: 'bg-transparent', label: 'text-foreground' },
      destructive: { base: 'bg-destructive', label: 'text-destructive-foreground' },
      link: { base: 'bg-transparent px-0', label: 'text-primary underline' },
    },
    size: {
      sm: { base: 'h-8 px-3', label: 'text-sm' },
      md: { base: 'h-11 px-4', label: 'text-base' },
      lg: { base: 'h-13 px-6', label: 'text-lg' },
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
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
 * icon-only buttons). Pressed-state opacity is handled by the `active:`
 * Tailwind modifier; `disabled:` handles the disabled state. NativeWind
 * v4 does not support function-form `className`.
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
      className={styles.base({ className })}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={styles.label()} tx={tx} text={text}>
          {children}
        </Text>
      )}
    </Pressable>
  );
});

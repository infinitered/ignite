import { forwardRef, useId } from 'react';
import { TextInput as RNTextInput, type TextInputProps, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Text } from '@/components/Text';
import type { TxKeyPath } from '@/i18n';
import { translate } from '@/i18n/translate';
import { useThemedColors } from '@/lib/colors';

const field = tv({
  slots: {
    container: 'gap-1',
    input:
      'h-11 px-3 rounded-md border border-border bg-background text-foreground text-base font-sans',
    label: 'text-sm font-sans-medium text-foreground',
    helper: 'text-sm text-muted-foreground',
    error: 'text-sm text-destructive',
  },
  variants: {
    invalid: {
      true: { input: 'border-destructive' },
    },
    disabled: {
      true: { container: 'opacity-50' },
    },
  },
});

export type TextFieldProps = Omit<TextInputProps, 'children'> & {
  /** Translatable label key. */
  labelTx?: TxKeyPath | undefined;
  label?: string | undefined;
  /** Translatable helper key. */
  helperTx?: TxKeyPath | undefined;
  helper?: string | undefined;
  /** Validation error message — renders in destructive color. */
  error?: string | undefined;
  className?: string | undefined;
};

/**
 * Form input. Designed for `react-hook-form` `<Controller>`:
 *
 *   <Controller name="email" control={control} render={({ field, fieldState }) => (
 *     <TextField label="Email" error={fieldState.error?.message} {...field} />
 *   )} />
 *
 * Sets `aria-invalid` and `accessibilityLabel`/`-Hint` automatically.
 */
export const TextField = forwardRef<RNTextInput, TextFieldProps>(function TextField(
  { labelTx, label, helperTx, helper, error, className, editable, ...rest },
  ref
) {
  const id = useId();
  const colors = useThemedColors();
  const styles = field({ invalid: Boolean(error), disabled: editable === false });
  const labelText = labelTx ? translate(labelTx) : label;
  const helperText = helperTx ? translate(helperTx) : helper;

  return (
    <View className={styles.container({ className })}>
      {labelText ? (
        <Text nativeID={`${id}-label`} className={styles.label()}>
          {labelText}
        </Text>
      ) : null}
      <RNTextInput
        ref={ref}
        accessibilityLabel={labelText ?? rest.accessibilityLabel}
        aria-invalid={Boolean(error)}
        aria-labelledby={labelText ? `${id}-label` : undefined}
        editable={editable}
        placeholderTextColor={colors.mutedForeground}
        className={styles.input()}
        {...rest}
      />
      {error ? (
        <Text className={styles.error()} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : helperText ? (
        <Text className={styles.helper()}>{helperText}</Text>
      ) : null}
    </View>
  );
});

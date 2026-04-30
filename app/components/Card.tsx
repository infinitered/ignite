import { Pressable, type PressableProps, View, type ViewProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const card = tv({
  base: 'rounded-lg border border-border bg-card p-4',
  variants: {
    elevation: {
      flat: '',
      raised: 'shadow-sm',
    },
    pressable: {
      true: 'active:opacity-80',
    },
  },
  defaultVariants: { elevation: 'flat', pressable: false },
});

type Variants = VariantProps<typeof card>;

export type CardProps = (ViewProps | PressableProps) &
  Variants & {
    onPress?: PressableProps['onPress'];
    className?: string;
    accessibilityLabel?: string;
  };

/**
 * Card container with optional press handler. If `onPress` is provided,
 * the card becomes accessible as a button (provide `accessibilityLabel`).
 */
export function Card({ onPress, accessibilityLabel, className, elevation, ...rest }: CardProps) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        className={card({ elevation, pressable: true, className })}
        {...(rest as PressableProps)}
      />
    );
  }
  return <View className={card({ elevation, className })} {...(rest as ViewProps)} />;
}

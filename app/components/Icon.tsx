import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps, forwardRef } from 'react';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

export type IconProps = {
  name: IoniconsName;
  size?: number;
  /** Tailwind color class — falls back to text-foreground. */
  className?: string;
  /** Optional accessibility label; if absent the icon is decorative. */
  accessibilityLabel?: string;
};

/**
 * Wraps `@expo/vector-icons` Ionicons with NativeWind className support
 * for color (e.g., `text-primary`). For non-decorative icons, pass an
 * `accessibilityLabel` so screen readers announce them.
 */
export const Icon = forwardRef<typeof Ionicons, IconProps>(function Icon(
  { name, size = 24, className, accessibilityLabel },
  // biome-ignore lint/correctness/noUnusedVariables: forwardRef signature
  _ref
) {
  const isDecorative = !accessibilityLabel;
  return (
    <Ionicons
      name={name}
      size={size}
      className={className ?? 'text-foreground'}
      accessibilityElementsHidden={isDecorative}
      importantForAccessibility={isDecorative ? 'no-hide-descendants' : 'yes'}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={isDecorative ? undefined : 'image'}
    />
  );
});

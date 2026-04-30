import { View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

import { Text } from '@/components/Text';

const {{name}} = tv({
  base: 'p-4 bg-card rounded-md border border-border',
  variants: {
    tone: {
      default: '',
      muted: 'opacity-70',
    },
  },
  defaultVariants: { tone: 'default' },
});

type Variants = VariantProps<typeof {{name}}>;

export type {{Name}}Props = Variants & {
  className?: string;
  children?: React.ReactNode;
};

/**
 * TODO: describe what {{Name}} is for, when to use it, what props mean.
 */
export function {{Name}}({ tone, className, children }: {{Name}}Props) {
  return (
    <View className={{{name}}({ tone, className })}>
      {children ?? <Text variant="caption">{{Name}} placeholder</Text>}
    </View>
  );
}

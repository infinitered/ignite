import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Text } from "../../app/components/Text"
import { colors, typography } from "../../app/theme"
import { Story, StoryScreen, UseCase } from "../views"

declare let module

storiesOf("Text", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Presets", () => (
    <Story>
      <UseCase text="Default" usage="Used for normal body text.">
        <Text>
          Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu
          consequat laborum.
        </Text>
      </UseCase>

      <UseCase text="Bold" usage="Used for bolded body text.">
        <Text preset="bold">
          Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis
          deserunt nostrud ut nostrud id.
        </Text>
      </UseCase>

      <UseCase text="Heading" usage="Used for major section headers.">
        <Text preset="heading">Voluptate Adipis.</Text>
      </UseCase>

      <UseCase text="Sub Heading" usage="Used for section sub headers.">
        <Text preset="subheading">In Cupidatat Cillum.</Text>
      </UseCase>

      <UseCase text="Field Label" usage="Used on forms nears inputs.">
        <Text preset="fieldLabel">Voluptate Adipisicing.</Text>
      </UseCase>
    </Story>
  ))
  .add("Sizes", () => (
    <Story>
      <UseCase text="XXLARGE">
        <Text size="xxl">Cillum eu laboris.</Text>
      </UseCase>

      <UseCase text="XLARGE">
        <Text size="xl">Eiusmod ex excepteur.</Text>
      </UseCase>

      <UseCase text="LARGE">
        <Text size="lg">Nostrud ipsum ea.</Text>
      </UseCase>

      <UseCase text="MEDIUM">
        <Text size="md">Consequat id do lorem.</Text>
      </UseCase>

      <UseCase text="SMALL">
        <Text size="sm">Lorem sunt adipisicin.</Text>
      </UseCase>

      <UseCase text="XSMALL">
        <Text size="xs">Ea ipsum est ea ex sunt.</Text>
      </UseCase>
    </Story>
  ))
  .add("Weights", () => (
    <Story>
      <UseCase text="Light">
        <Text weight="light">
          Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.
        </Text>
      </UseCase>

      <UseCase text="Normal">
        <Text weight="normal">
          Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.
        </Text>
      </UseCase>

      <UseCase text="Medium">
        <Text weight="medium">Non duis laborum quis laboris occaecat culpa cillum.</Text>
      </UseCase>

      <UseCase text="Semi Bold">
        <Text weight="semiBold">Exercitation magna nostrud pariatur laborum occaecat aliqua.</Text>
      </UseCase>

      <UseCase text="Bold">
        <Text weight="bold">Eiusmod ullamco magna exercitation est excepteur.</Text>
      </UseCase>
    </Story>
  ))
  .add("Passing Content", () => (
    <Story>
      <UseCase
        text="Via `text` Prop"
        usage="Used when you want to pass a value but don't want to open a child."
      >
        <Text text="Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat." />
      </UseCase>

      <UseCase text="Via `tx` Prop" usage="Used for looking up i18n keys.">
        <Text tx="storybook.lorem2Sentences" />
      </UseCase>
      <UseCase
        text="Children"
        usage="Used like you would normally use a React Native <Text> component."
      >
        <Text>Aliqua velit irure reprehenderit eu qui amet veniam consectetur.</Text>
      </UseCase>

      <UseCase text="Nested children" usage="You can embed them and change styles too.">
        <Text>
          <Text preset="bold">Occaecat aliqua irure proident veniam.</Text>
          {` `}
          <Text preset="default">
            Ullamco cupidatat officia exercitation velit non ullamco nisi..
          </Text>
          {` `}
          <Text preset="bold">Occaecat aliqua irure proident veniam.</Text>
        </Text>
      </UseCase>
    </Story>
  ))
  .add("Styling", () => (
    <Story>
      <UseCase text="Override Preset Weight / Size">
        <Text preset="heading" size="sm" weight="light">
          This is the
          <Text style={{ fontFamily: typography.code.normal, letterSpacing: 2 }}> `heading` </Text>
          preset with a smaller size and lighter weight.
        </Text>
      </UseCase>

      <UseCase text="Via `style` Prop">
        <Text>
          <Text style={{ color: colors.error }}>
            Consequat ullamco veniam velit mollit proident excepteur aliquip id culpa ipsum velit
            sint nostrud.
          </Text>
          {` `}
          <Text style={{ color: colors.palette.neutral100, backgroundColor: colors.error }}>
            Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco
            adipisicing tempor adipisicing.
          </Text>
          {` `}
          <Text
            style={{
              color: colors.dim,
              textDecorationColor: colors.error,
              textDecorationLine: "underline line-through",
              textDecorationStyle: "dashed",
            }}
          >
            Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco
            adipisicing tempor adipisicing.
          </Text>
        </Text>
      </UseCase>
    </Story>
  ))

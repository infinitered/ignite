/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import { Text } from "../../../components"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import TranslateSheet from "translate-sheet"

const translations = TranslateSheet.create("demoText", {
  description:
    "For your text displaying needs. This component is a HOC over the built-in React Native one.",
  useCase: {
    presets: {
      name: "Presets",
      description: "There are a few presets that are preconfigured.",
      default:
        "default preset - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
      bold: "bold preset - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
      subheading: "subheading preset - In Cupidatat Cillum.",
      heading: "heading preset - Voluptate Adipis.",
    },
    sizes: {
      name: "Sizes",
      description: "There's a size prop.",
      xs: "xs - Ea ipsum est ea ex sunt.",
      sm: "sm - Lorem sunt adipisicin.",
      md: "md - Consequat id do lorem.",
      lg: "lg - Nostrud ipsum ea.",
      xl: "xl - Eiusmod ex excepteur.",
      xxl: "xxl - Cillum eu laboris.",
    },
    weights: {
      name: "Weights",
      description: "There's a weight prop.",
      light:
        "light - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
      normal:
        "normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
      medium: "medium - Non duis laborum quis laboris occaecat culpa cillum.",
      semibold: "semiBold - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
      bold: "bold - Eiusmod ullamco magna exercitation est excepteur.",
    },
    passingContent: {
      name: "Passing Content",
      description: "There are a few different ways to pass content.",
      viaText:
        "via `text` prop - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
      viaTx: "via `tx` prop -",
      children: "children - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.",
      nestedChildren: "Nested children -",
      nestedChildren2: "Occaecat aliqua irure proident veniam.",
      nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      nestedChildren4: "Occaecat aliqua irure proident veniam.",
    },
    styling: {
      name: "Styling",
      description: "The component can be styled easily.",
      text: "Consequat ullamco veniam velit mollit proident excepteur aliquip id culpa ipsum velit sint nostrud.",
      text2:
        "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
      text3:
        "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
    },
  },
})

export const DemoText: Demo = {
  name: "Text",
  get description() {
    return translations.description;
  },
  data: ({ theme }) => [
    <DemoUseCase
      name={translations.useCase.presets.name}
      description={translations.useCase.presets.description}
    >
      <Text text={translations.useCase.presets.default} />

      <DemoDivider />

      <Text text={translations.useCase.presets.bold} preset="bold" />

      <DemoDivider />

      <Text text={translations.useCase.presets.subheading} preset="subheading" />

      <DemoDivider />

      <Text text={translations.useCase.presets.heading} preset="heading" />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.sizes.name}
      description={translations.useCase.sizes.description}
    >
      <Text text={translations.useCase.sizes.xs} size="xs" />

      <DemoDivider />

      <Text text={translations.useCase.sizes.sm} size="sm" />

      <DemoDivider />

      <Text text={translations.useCase.sizes.md} size="md" />

      <DemoDivider />

      <Text text={translations.useCase.sizes.lg} size="lg" />

      <DemoDivider />

      <Text text={translations.useCase.sizes.xl} size="xl" />

      <DemoDivider />
      <Text text={translations.useCase.sizes.xxl} size="xxl" />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.weights.name}
      description={translations.useCase.weights.description}
    >
      <Text text={translations.useCase.weights.light} weight="light" />

      <DemoDivider />

      <Text text={translations.useCase.weights.normal} weight="normal" />

      <DemoDivider />

      <Text text={translations.useCase.weights.medium} weight="medium" />

      <DemoDivider />

      <Text text={translations.useCase.weights.semibold} weight="semiBold" />

      <DemoDivider />

      <Text text={translations.useCase.weights.bold} weight="bold" />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.passingContent.name}
      description={translations.useCase.passingContent.description}
    >
      <Text>{translations.useCase.passingContent.children}</Text>

      <DemoDivider />

      <Text>
        <Text>{translations.useCase.passingContent.nestedChildren}</Text>
        <Text preset="bold">{translations.useCase.passingContent.nestedChildren2}</Text>
        {` `}
        <Text preset="default">{translations.useCase.passingContent.nestedChildren3}</Text>
        {` `}
        <Text preset="bold"> {translations.useCase.passingContent.nestedChildren4}</Text>
      </Text>
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.styling.name}
      description={translations.useCase.styling.description}
    >
      <Text>
        <Text text={translations.useCase.styling.text} style={{ color: theme.colors.error }} />
        {` `}
        <Text
          text={translations.useCase.styling.text2}
          style={{
            color: theme.colors.palette.neutral100,
            backgroundColor: theme.colors.error,
          }}
        />

        {` `}
        <Text
          style={{
            textDecorationLine: "underline line-through",
            textDecorationStyle: "dashed",
            color: theme.colors.error,
            textDecorationColor: theme.colors.error,
          }}
          text={translations.useCase.styling.text3}
        />
      </Text>
    </DemoUseCase>,
  ],
}

// @demo remove-file

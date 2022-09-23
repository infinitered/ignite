/* eslint-disable react/jsx-key */
import React from "react"
import { Text } from "../../../components"
import { colors } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

export const DemoText: Demo = {
  name: "Text",
  description:
    "For your text displaying needs. This component is a HOC over the built-in React Native one.",
  data: [
    <DemoUseCase name="Presets" description="There are a few presets that are preconfigured.">
      <Text>
        default preset - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat
        elit et eu consequat laborum.
      </Text>

      <DemoDivider />

      <Text preset="bold">
        bold preset - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum
        cillum duis deserunt nostrud ut nostrud id.
      </Text>

      <DemoDivider />

      <Text preset="subheading">subheading preset - In Cupidatat Cillum.</Text>

      <DemoDivider />

      <Text preset="heading">heading preset - Voluptate Adipis.</Text>
    </DemoUseCase>,

    <DemoUseCase name="Sizes" description="There's a size prop.">
      <Text size="xs">xs - Ea ipsum est ea ex sunt.</Text>

      <DemoDivider />

      <Text size="sm">sm - Lorem sunt adipisicin.</Text>

      <DemoDivider />

      <Text size="md">md - Consequat id do lorem.</Text>

      <DemoDivider />

      <Text size="lg">lg - Nostrud ipsum ea.</Text>

      <DemoDivider />

      <Text size="xl">xl - Eiusmod ex excepteur.</Text>

      <DemoDivider />

      <Text size="xxl">xxl - Cillum eu laboris.</Text>
    </DemoUseCase>,

    <DemoUseCase name="Weights" description="There's a weight prop.">
      <Text weight="light">
        light - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.
      </Text>

      <DemoDivider />

      <Text weight="normal">
        normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.
      </Text>

      <DemoDivider />

      <Text weight="medium">medium - Non duis laborum quis laboris occaecat culpa cillum.</Text>

      <DemoDivider />

      <Text weight="semiBold">
        semiBold - Exercitation magna nostrud pariatur laborum occaecat aliqua.
      </Text>

      <DemoDivider />

      <Text weight="bold">bold - Eiusmod ullamco magna exercitation est excepteur.</Text>
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <Text text="via `text` prop - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat." />

      <DemoDivider />

      <Text>
        <Text text="via `tx` prop - " />
        <Text tx="demoShowroomScreen.lorem2Sentences" />
      </Text>

      <DemoDivider />

      <Text>children - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.</Text>

      <DemoDivider />

      <Text>
        <Text>nested children - </Text>
        <Text preset="bold">Occaecat aliqua irure proident veniam.</Text>
        {` `}
        <Text preset="default">
          Ullamco cupidatat officia exercitation velit non ullamco nisi..
        </Text>
        {` `}
        <Text preset="bold">Occaecat aliqua irure proident veniam.</Text>
      </Text>
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily.">
      <Text>
        <Text style={{ color: colors.error }}>
          Consequat ullamco veniam velit mollit proident excepteur aliquip id culpa ipsum velit sint
          nostrud.
        </Text>
        {` `}
        <Text style={{ color: colors.palette.neutral100, backgroundColor: colors.error }}>
          Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco
          adipisicing tempor adipisicing.
        </Text>
        {` `}
        <Text
          /* eslint-disable react-native/no-inline-styles */
          style={{
            textDecorationLine: "underline line-through",
            textDecorationStyle: "dashed",
            color: colors.error,
            textDecorationColor: colors.error,
          }}
        >
          Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco
          adipisicing tempor adipisicing.
        </Text>
      </Text>
    </DemoUseCase>,
  ],
}

// @demo remove-file

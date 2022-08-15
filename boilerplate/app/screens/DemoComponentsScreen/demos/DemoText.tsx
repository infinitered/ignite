/* eslint-disable react/jsx-key */
import React from "react"
import { TextStyle } from "react-native"
import { Text } from "../../../components"
import { colors } from "../../../theme"
import { Demo } from "../DemoComponentsScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

const $demoText: TextStyle = {
  color: colors.palette.neutral500,
}

export const DemoText: Demo = {
  name: "Text",
  description:
    "For your text displaying needs. This component is a HOC over the built-in React Native one.",
  useCases: [
    <DemoUseCase name="Presets" description="There are a few presets that are preconfigured.">
      <Text style={$demoText}>
        default preset - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat
        elit et eu consequat laborum.
      </Text>

      <DemoDivider />

      <Text style={$demoText} preset="bold">
        bold preset - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum
        cillum duis deserunt nostrud ut nostrud id.
      </Text>

      <DemoDivider />

      <Text style={$demoText} preset="subheading">
        subheading preset - In Cupidatat Cillum.
      </Text>

      <DemoDivider />

      <Text style={$demoText} preset="heading">
        heading preset - Voluptate Adipis.
      </Text>
    </DemoUseCase>,

    <DemoUseCase name="Sizes" description="There's a size prop.">
      <Text style={$demoText} size="xs">
        xs - Ea ipsum est ea ex sunt.
      </Text>

      <DemoDivider />

      <Text style={$demoText} size="sm">
        sm - Lorem sunt adipisicin.
      </Text>

      <DemoDivider />

      <Text style={$demoText} size="md">
        md - Consequat id do lorem.
      </Text>

      <DemoDivider />

      <Text style={$demoText} size="lg">
        lg - Nostrud ipsum ea.
      </Text>

      <DemoDivider />

      <Text style={$demoText} size="xl">
        xl - Eiusmod ex excepteur.
      </Text>

      <DemoDivider />

      <Text style={$demoText} size="xxl">
        xxl - Cillum eu laboris.
      </Text>
    </DemoUseCase>,

    <DemoUseCase name="Weights" description="There's a weight prop.">
      <Text style={$demoText} weight="light">
        light - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.
      </Text>

      <DemoDivider />

      <Text style={$demoText} weight="normal">
        normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.
      </Text>

      <DemoDivider />

      <Text style={$demoText} weight="medium">
        medium - Non duis laborum quis laboris occaecat culpa cillum.
      </Text>

      <DemoDivider />

      <Text style={$demoText} weight="semiBold">
        semiBold - Exercitation magna nostrud pariatur laborum occaecat aliqua.
      </Text>

      <DemoDivider />

      <Text style={$demoText} weight="bold">
        bold - Eiusmod ullamco magna exercitation est excepteur.
      </Text>
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <Text
        style={$demoText}
        text="via `text` prop - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat."
      />

      <DemoDivider />

      <Text>
        <Text style={$demoText} text="via `tx` prop - " />
        <Text style={$demoText} tx="demoComponentsScreen.lorem2Sentences" />
      </Text>

      <DemoDivider />

      <Text style={$demoText}>
        children - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.
      </Text>

      <DemoDivider />

      <Text style={$demoText}>
        <Text style={$demoText}>nested children - </Text>
        <Text style={$demoText} preset="bold">
          Occaecat aliqua irure proident veniam.
        </Text>
        {` `}
        <Text style={$demoText} preset="default">
          Ullamco cupidatat officia exercitation velit non ullamco nisi..
        </Text>
        {` `}
        <Text style={$demoText} preset="bold">
          Occaecat aliqua irure proident veniam.
        </Text>
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

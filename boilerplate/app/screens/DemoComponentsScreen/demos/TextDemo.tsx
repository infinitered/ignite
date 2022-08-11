import React from "react"
import { Text } from "../../../components"
import { Demo } from "../DemoComponentsScreen"
import { DemoUseCase } from "../DemoUseCase"

export const TextDemo: Demo = {
  name: "Text",
  description: "This is a description of a text component",
  useCases: [
    <DemoUseCase name="Sizes" description="The text component has a size prop.">
      <Text size="xxl">Cillum eu laboris.</Text>
      <Text size="xl">Eiusmod ex excepteur.</Text>
      <Text size="lg">Nostrud ipsum ea.</Text>
      <Text size="md">Consequat id do lorem.</Text>
      <Text size="sm">Lorem sunt adipisicin.</Text>
      <Text size="xs">Ea ipsum est ea ex sunt.</Text>
    </DemoUseCase>,

    <DemoUseCase name="Weights" description="The text component has a weight prop.">
      <Text weight="light">
        Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.
      </Text>
      <Text weight="normal">
        Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.
      </Text>
      <Text weight="medium">Non duis laborum quis laboris occaecat culpa cillum.</Text>
      <Text weight="semiBold">Exercitation magna nostrud pariatur laborum occaecat aliqua.</Text>
      <Text weight="bold">Eiusmod ullamco magna exercitation est excepteur.</Text>
    </DemoUseCase>,

    <DemoUseCase name="Presets" description="The text component ships with a few presets.">
      <Text>
        Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu
        consequat laborum.
      </Text>
      <Text preset="bold">
        Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis
        deserunt nostrud ut nostrud id.
      </Text>
      <Text preset="heading">Voluptate Adipis.</Text>
      <Text preset="subheading">In Cupidatat Cillum.</Text>
      <Text>Voluptate Adipisicing.</Text>
    </DemoUseCase>,
  ],
}

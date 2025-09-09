/* eslint-disable react/jsx-key */
import { Text } from "@/components/Text"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "../types"
import { DemoUseCase } from "../DemoUseCase"

export const DemoText: Demo = {
  name: "Text",
  description: "demoText:description",
  data: () => [
    <DemoUseCase
      name="demoText:useCase.presets.name"
      description="demoText:useCase.presets.description"
    >
      <Text preset="default">Default Text</Text>
      <DemoDivider />

      <Text preset="bold">Bold Text</Text>
      <DemoDivider />

      <Text preset="heading">Heading Text</Text>
      <DemoDivider />

      <Text preset="subheading">Subheading Text</Text>
    </DemoUseCase>,

    <DemoUseCase
      name="demoText:useCase.sizes.name"
      description="demoText:useCase.sizes.description"
    >
      <Text size="xxl">XXL Size</Text>
      <DemoDivider />

      <Text size="xl">XL Size</Text>
      <DemoDivider />

      <Text size="lg">Large Size</Text>
      <DemoDivider />

      <Text size="md">Medium Size</Text>
      <DemoDivider />

      <Text size="sm">Small Size</Text>
      <DemoDivider />

      <Text size="xs">XS Size</Text>
      <DemoDivider />

      <Text size="xxs">XXS Size</Text>
    </DemoUseCase>,
  ],
}

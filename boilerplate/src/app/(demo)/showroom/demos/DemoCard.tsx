/* eslint-disable react/jsx-key */
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Text } from "@/components/Text"

import { DemoDivider } from "../DemoDivider"
import { Demo } from "../types"
import { DemoUseCase } from "../DemoUseCase"

export const DemoCard: Demo = {
  name: "Card",
  description: "demoCard:description",
  data: () => [
    <DemoUseCase
      name="demoCard:useCase.default.name"
      description="demoCard:useCase.default.description"
    >
      <Card content="Basic card with content" />
      <DemoDivider />

      <Card 
        content="Card with heading"
        HeadingComponent={<Text preset="bold">Card Title</Text>}
      />
      <DemoDivider />

      <Card 
        content="Card with footer"
        FooterComponent={<Button>Action</Button>}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoCard:useCase.advanced.name"
      description="demoCard:useCase.advanced.description"
    >
      <Card 
        HeadingComponent={<Text preset="heading">Advanced Card</Text>}
        content="This card has a heading, content, and footer button"
        FooterComponent={<Button preset="reversed">Learn More</Button>}
      />
    </DemoUseCase>,
  ],
}

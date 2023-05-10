/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { AutoImage, Button, Card, Icon } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

export const DemoCard: Demo = {
  name: "Card",
  description:
    "Cards are useful for displaying related information in a contained way. If a ListItem displays content horizontally, a Card can be used to display content vertically.",
  data: [
    <DemoUseCase name="Presets" description="There are a few presets that are preconfigured.">
      <Card
        heading="Default Preset (default)"
        content="Incididunt magna ut aliquip consectetur mollit dolor."
        footer="Consectetur nulla non aliquip velit."
      />
      <DemoDivider />
      <Card
        heading="Reversed Preset"
        content="Reprehenderit occaecat proident amet id laboris."
        footer="Consectetur tempor ea non labore anim ."
        preset="reversed"
      />
    </DemoUseCase>,

    <DemoUseCase
      name="Vertical Alignment"
      description="Depending on what's required, the card comes preconfigured with different alignment strategies."
    >
      <Card
        heading="Top (default)"
        content="All content is automatically aligned to the top."
        footer="Even the footer"
        style={{ minHeight: 160 }}
      />
      <DemoDivider />
      <Card
        heading="Center"
        verticalAlignment="center"
        preset="reversed"
        content="Content is centered relative to the card's height."
        footer="Me too!"
        style={{ minHeight: 160 }}
      />
      <DemoDivider />
      <Card
        heading="Space Between"
        verticalAlignment="space-between"
        content="All content is spaced out evenly."
        footer="I am where I want to be."
        style={{ minHeight: 160 }}
      />
      <DemoDivider />
      <Card
        preset="reversed"
        heading="Force Footer Bottom"
        verticalAlignment="force-footer-bottom"
        content="This pushes the footer where it belongs."
        footer="I'm so lonely down here."
        style={{ minHeight: 160 }}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <Card heading="Via `heading` Prop" content="Via `content` Prop" footer="Via `footer` Prop" />
      <DemoDivider />
      <Card
        preset="reversed"
        headingTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        headingTxOptions={{ prop: "heading" }}
        contentTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        contentTxOptions={{ prop: "content" }}
        footerTx="demoShowroomScreen.demoViaSpecifiedTxProp"
        footerTxOptions={{ prop: "footer" }}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="Custom Components"
      description="Any of the preconfigured components can be replaced with your own. You can also add additional ones."
    >
      <Card
        HeadingComponent={
          <Button
            preset="reversed"
            text="HeadingComponent"
            LeftAccessory={(props) => <Icon style={props.style} icon="ladybug" />}
          />
        }
        ContentComponent={
          <Button
            style={{ marginVertical: spacing.sm }}
            text="ContentComponent"
            LeftAccessory={(props) => <Icon style={props.style} icon="ladybug" />}
          />
        }
        FooterComponent={
          <Button
            preset="reversed"
            text="FooterComponent"
            LeftAccessory={(props) => <Icon style={props.style} icon="ladybug" />}
          />
        }
      />
      <DemoDivider />
      <Card
        heading="RightComponent"
        verticalAlignment="center"
        RightComponent={
          <AutoImage
            maxWidth={80}
            maxHeight={60}
            style={{ alignSelf: "center" }}
            source={{
              uri: "https://user-images.githubusercontent.com/1775841/184508739-f90d0ce5-7219-42fd-a91f-3382d016eae0.png",
            }}
          />
        }
      />
      <DemoDivider />
      <Card
        preset="reversed"
        heading="LeftComponent"
        verticalAlignment="center"
        LeftComponent={
          <AutoImage
            maxWidth={80}
            maxHeight={60}
            style={{ alignSelf: "center" }}
            source={{
              uri: "https://user-images.githubusercontent.com/1775841/184508739-f90d0ce5-7219-42fd-a91f-3382d016eae0.png",
            }}
          />
        }
      />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily.">
      <Card
        heading="Style the Heading"
        headingStyle={{ color: colors.error }}
        content="Style the Content"
        contentStyle={{ backgroundColor: colors.error, color: colors.palette.neutral100 }}
        footer="Style the Footer"
        footerStyle={{
          textDecorationLine: "underline line-through",
          textDecorationStyle: "dashed",
          color: colors.error,
          textDecorationColor: colors.error,
        }}
        style={{
          shadowRadius: 5,
          shadowColor: colors.error,
          shadowOpacity: 0.5,
        }}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file

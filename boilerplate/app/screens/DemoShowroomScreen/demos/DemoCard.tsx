/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import { AutoImage, Button, Card, Icon } from "../../../components"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import TranslateSheet from "translate-sheet"

const translations = TranslateSheet.create("demoCard", {
  description:
    "Cards are useful for displaying related information in a contained way. If a ListItem displays content horizontally, a Card can be used to display content vertically.",
  useCase: {
    presets: {
      name: "Presets",
      description: "There are a few presets that are preconfigured.",
      default: {
        heading: "Default Preset (default)",
        content: "Incididunt magna ut aliquip consectetur mollit dolor.",
        footer: "Consectetur nulla non aliquip velit.",
      },
      reversed: {
        heading: "Reversed Preset",
        content: "Reprehenderit occaecat proident amet id laboris.",
        footer: "Consectetur tempor ea non labore anim .",
      },
    },
    verticalAlignment: {
      name: "Vertical Alignment",
      description:
        "Depending on what's required, the card comes preconfigured with different alignment strategies.",
      top: {
        heading: "Top (default)",
        content: "All content is automatically aligned to the top.",
        footer: "Even the footer",
      },
      center: {
        heading: "Center",
        content: "Content is centered relative to the card's height.",
        footer: "Me too!",
      },
      spaceBetween: {
        heading: "Space Between",
        content: "All content is spaced out evenly.",
        footer: "I am where I want to be.",
      },
      reversed: {
        heading: "Force Footer Bottom",
        content: "This pushes the footer where it belongs.",
        footer: "I'm so lonely down here.",
      },
    },
    passingContent: {
      name: "Passing Content",
      description: "There are a few different ways to pass content.",
      heading: "Via `heading` Prop",
      content: "Via `content` Prop",
      footer: "I'm so lonely down here.",
    },
    customComponent: {
      name: "Custom Components",
      description:
        "Any of the preconfigured components can be replaced with your own. You can also add additional ones.",
      rightComponent: "RightComponent",
      leftComponent: "LeftComponent",
    },
    style: {
      name: "Styling",
      description: "The component can be styled easily.",
      heading: "Style the Heading",
      content: "Style the Content",
      footer: "Style the Footer",
    },
  },
})

export const DemoCard: Demo = {
  name: "Card",
  description: translations.description,
  data: ({ theme }) => [
    <DemoUseCase
      name={translations.useCase.presets.name}
      description={translations.useCase.presets.description}
    >
      <Card
        heading={translations.useCase.presets.default.heading}
        content={translations.useCase.presets.default.content}
        footer={translations.useCase.presets.default.footer}
      />
      <DemoDivider />
      <Card
        heading={translations.useCase.presets.reversed.heading}
        content={translations.useCase.presets.reversed.content}
        footer={translations.useCase.presets.reversed.footer}
        preset="reversed"
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.verticalAlignment.name}
      description={translations.useCase.verticalAlignment.description}
    >
      <Card
        heading={translations.useCase.verticalAlignment.top.heading}
        content={translations.useCase.verticalAlignment.top.content}
        footer={translations.useCase.verticalAlignment.top.footer}
        style={{ minHeight: 160 }}
      />
      <DemoDivider />
      <Card
        heading={translations.useCase.verticalAlignment.center.heading}
        verticalAlignment="center"
        preset="reversed"
        content={translations.useCase.verticalAlignment.center.content}
        footer={translations.useCase.verticalAlignment.center.footer}
        style={{ minHeight: 160 }}
      />
      <DemoDivider />
      <Card
        heading={translations.useCase.verticalAlignment.spaceBetween.heading}
        verticalAlignment="space-between"
        content={translations.useCase.verticalAlignment.spaceBetween.content}
        footer={translations.useCase.verticalAlignment.spaceBetween.footer}
        style={{ minHeight: 160 }}
      />
      <DemoDivider />
      <Card
        preset="reversed"
        heading={translations.useCase.verticalAlignment.reversed.heading}
        verticalAlignment="force-footer-bottom"
        content={translations.useCase.verticalAlignment.reversed.content}
        footer={translations.useCase.verticalAlignment.reversed.footer}
        style={{ minHeight: 160 }}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.passingContent.name}
      description={translations.useCase.passingContent.description}
    >
      <Card
        heading={translations.useCase.passingContent.heading}
        content={translations.useCase.passingContent.content}
        footer={translations.useCase.passingContent.footer}
      />
      <DemoDivider />
      <Card
        preset="reversed"
        heading={translations.useCase.passingContent.heading}
        headingTxOptions={{ prop: "heading" }}
        content={translations.useCase.passingContent.content}
        contentTxOptions={{ prop: "content" }}
        footer={translations.useCase.passingContent.footer}
        footerTxOptions={{ prop: "footer" }}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.customComponent.name}
      description={translations.useCase.customComponent.description}
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
            style={{ marginVertical: theme.spacing.sm }}
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
        heading={translations.useCase.customComponent.rightComponent}
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
        heading={translations.useCase.customComponent.leftComponent}
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

    <DemoUseCase
      name={translations.useCase.style.name}
      description={translations.useCase.style.description}
    >
      <Card
        heading={translations.useCase.style.heading}
        headingStyle={{ color: theme.colors.error }}
        content={translations.useCase.style.content}
        contentStyle={{
          backgroundColor: theme.colors.error,
          color: theme.colors.palette.neutral100,
        }}
        footer={translations.useCase.style.footer}
        footerStyle={{
          textDecorationLine: "underline line-through",
          textDecorationStyle: "dashed",
          color: theme.colors.error,
          textDecorationColor: theme.colors.error,
        }}
        style={{
          shadowRadius: 5,
          shadowColor: theme.colors.error,
          shadowOpacity: 0.5,
        }}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file

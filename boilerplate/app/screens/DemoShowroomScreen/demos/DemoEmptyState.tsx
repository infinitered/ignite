/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import TranslateSheet from "translate-sheet"
import { EmptyState } from "../../../components"
import { DemoDivider } from "../DemoDivider"
import { Demo } from "../DemoShowroomScreen"
import { DemoUseCase } from "../DemoUseCase"

const translations = TranslateSheet.create("demoEmptyState", {
  description:
    "A component to use when there is no data to display. It can be utilized to direct the user what to do next",
  useCase: {
    presets: {
      name: "Presets",
      description:
        "You can create different text/image sets. One is predefined called `generic`. Note, there's no default in case you want to have a completely custom EmptyState.",
    },
    passingContent: {
      name: "Passing Content",
      description: "There are a few different ways to pass content.",
      customizeImageHeading: "Customize Image",
      customizeImageContent: "You can pass in any image source.",
      viaHeadingProp: "Via `heading` Prop",
      viaContentProp: "Via `content` prop.",
      viaButtonProp: "Via `button` Prop",
    },
    styling: {
      name: "Styling",
      description: "The component can be styled easily.",
    },
  }
})

export const DemoEmptyState: Demo = {
  name: "EmptyState",
  get description() {
    return translations.description;
  },
  data: ({ theme }) => [
    <DemoUseCase
      name={translations.useCase.presets.name}
      description={translations.useCase.presets.description}
    >
      <EmptyState preset="generic" />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.passingContent.name}
      description={translations.useCase.passingContent.description}
    >
      <EmptyState
        imageSource={require("../../../../assets/images/logo.png")}
        heading={translations.useCase.passingContent.customizeImageHeading}
        content={translations.useCase.passingContent.customizeImageContent}
      />

      <DemoDivider size={30} line />

      <EmptyState
        heading={translations.useCase.passingContent.viaHeadingProp}
        content={translations.useCase.passingContent.viaContentProp}
        button={translations.useCase.passingContent.viaButtonProp}
      />

    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.styling.name}
      description={translations.useCase.styling.description}
    >
      <EmptyState
        preset="generic"
        style={{ backgroundColor: theme.colors.error, paddingVertical: 20 }}
        imageStyle={{ height: 75, tintColor: theme.colors.palette.neutral100 }}
        ImageProps={{ resizeMode: "contain" }}
        headingStyle={{
          color: theme.colors.palette.neutral100,
          textDecorationLine: "underline",
          textDecorationColor: theme.colors.palette.neutral100,
        }}
        contentStyle={{
          color: theme.colors.palette.neutral100,
          textDecorationLine: "underline",
          textDecorationColor: theme.colors.palette.neutral100,
        }}
        buttonStyle={{ alignSelf: "center", backgroundColor: theme.colors.palette.neutral100 }}
        buttonTextStyle={{ color: theme.colors.error }}
        ButtonProps={{
          preset: "reversed",
        }}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file

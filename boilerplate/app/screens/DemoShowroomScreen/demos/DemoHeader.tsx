/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import { TextStyle, View, ViewStyle } from "react-native"
import { Header, Icon } from "../../../components"
import { $styles } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import type { ThemedStyle } from "@/theme"
import TranslateSheet from "translate-sheet"

const $rightAlignTitle: TextStyle = {
  textAlign: "right",
}

const translations = TranslateSheet.create("demoHeader", {
  description:
    "Component that appears on many screens. Will hold navigation buttons and screen title.",
  useCase: {
    actionIcons: {
      name: "Action Icons",
      description: "You can easily pass in icons to the left or right action components.",
      leftIconTitle: "Left Icon",
      rightIconTitle: "Right Icon",
      bothIconsTitle: "Both Icons",
    },
    actionText: {
      name: "Action Text",
      description: "You can easily pass in text to the left or right action components.",
      leftTxTitle: "Via `leftTx`",
      rightTextTitle: "Via `rightText`",
    },
    customActionComponents: {
      name: "Custom Action Components",
      description:
        "If the icon or text options are not enough, you can pass in your own custom action component.",
      customLeftActionTitle: "Custom Left Action",
    },
    titleModes: {
      name: "Title Modes",
      description:
        "Title can be forced to stay in center (default) but may be cut off if it's too long. You can optionally make it adjust to the action buttons.",
      centeredTitle: "Centered Title",
      flexTitle: "Flex Title",
    },
    styling: {
      name: "Styling",
      description: "The component can be styled easily.",
      styledTitle: "Styled Title",
      styledWrapperTitle: "Styled Wrapper",
      tintedIconsTitle: "Tinted Icons",
    },
  },
  demoHeaderTxExample: "Yay",
})

const $customLeftAction: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  flexGrow: 0,
  flexBasis: 100,
  height: "100%",
  flexWrap: "wrap",
  overflow: "hidden",
})

const $customTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  textDecorationLine: "underline line-through",
  textDecorationStyle: "dashed",
  color: colors.error,
  textDecorationColor: colors.error,
})

const $customWhiteTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

export const DemoHeader: Demo = {
  name: "Header",
  description: translations.description,
  data: ({ theme, themed }) => [
    <DemoUseCase
      name={translations.useCase.actionIcons.name}
      description={translations.useCase.actionIcons.description}
    >
      <Header
        title={translations.useCase.actionIcons.leftIconTitle}
        leftIcon="ladybug"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        title={translations.useCase.actionIcons.rightIconTitle}
        rightIcon="ladybug"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        title={translations.useCase.actionIcons.bothIconsTitle}
        leftIcon="ladybug"
        rightIcon="ladybug"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.actionText.name}
      description={translations.useCase.actionText.description}
    >
      <Header
        title={translations.useCase.actionText.leftTxTitle}
        leftText={translations.demoHeaderTxExample}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        title={translations.useCase.actionText.rightTextTitle}
        rightText="Yay"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.customActionComponents.name}
      description={translations.useCase.customActionComponents.description}
    >
      <Header
        title={translations.useCase.customActionComponents.customLeftActionTitle}
        titleMode="flex"
        titleStyle={$rightAlignTitle}
        LeftActionComponent={
          <View style={themed([$styles.row, $customLeftAction])}>
            {Array.from({ length: 20 }, (x, i) => i).map((i) => (
              <Icon key={i} icon="ladybug" color={theme.colors.palette.neutral100} size={20} />
            ))}
          </View>
        }
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.titleModes.name}
      description={translations.useCase.titleModes.description}
    >
      <Header
        title={translations.useCase.titleModes.centeredTitle}
        leftIcon="ladybug"
        rightText="Hooray"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        title={translations.useCase.titleModes.flexTitle}
        titleMode="flex"
        leftIcon="ladybug"
        rightText="Hooray"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.styling.name}
      description={translations.useCase.styling.description}
    >
      <Header
        title={translations.useCase.styling.styledTitle}
        titleStyle={themed($customTitle)}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        title={translations.useCase.styling.styledWrapperTitle}
        titleStyle={themed($customWhiteTitle)}
        backgroundColor={theme.colors.error}
        style={{ height: 35 }}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        title={translations.useCase.styling.tintedIconsTitle}
        titleStyle={themed($customWhiteTitle)}
        backgroundColor={theme.colors.error}
        leftIcon="ladybug"
        leftIconColor={theme.colors.palette.neutral100}
        safeAreaEdges={[]}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file

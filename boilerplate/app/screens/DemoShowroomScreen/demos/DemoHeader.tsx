/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Header, Icon } from "../../../components"
import { colors } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

const $rightAlignTitle: TextStyle = {
  textAlign: "right",
}

const $customLeftAction: ViewStyle = {
  backgroundColor: colors.error,
  flexGrow: 0,
  flexBasis: 100,
  height: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  overflow: "hidden",
}

const $customTitle: TextStyle = {
  textDecorationLine: "underline line-through",
  textDecorationStyle: "dashed",
  color: colors.error,
  textDecorationColor: colors.error,
}

const $customWhiteTitle: TextStyle = { color: colors.palette.neutral100 }

export const DemoHeader: Demo = {
  name: "Header",
  description: "demoHeader.description",
  data: [
    <DemoUseCase
      name="demoHeader.useCase.actionIcons.name"
      description="demoHeader.useCase.actionIcons.description"
    >
      <Header
        titleTx="demoHeader.useCase.actionIcons.leftIconTitle"
        leftIcon="ladybug"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader.useCase.actionIcons.rightIconTitle"
        rightIcon="ladybug"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader.useCase.actionIcons.bothIconsTitle"
        leftIcon="ladybug"
        rightIcon="ladybug"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader.useCase.actionText.name"
      description="demoHeader.useCase.actionText.description"
    >
      <Header
        titleTx="demoHeader.useCase.actionText.leftTxTitle"
        leftTx="demoShowroomScreen.demoHeaderTxExample"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader.useCase.actionText.rightTextTitle"
        rightText="Yay"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader.useCase.customActionComponents.name"
      description="demoHeader.useCase.customActionComponents.description"
    >
      <Header
        titleTx="demoHeader.useCase.customActionComponents.customLeftActionTitle"
        titleMode="flex"
        titleStyle={$rightAlignTitle}
        LeftActionComponent={
          <View style={$customLeftAction}>
            {Array.from({ length: 20 }, (x, i) => i).map((i) => (
              <Icon key={i} icon="ladybug" color={colors.palette.neutral100} size={20} />
            ))}
          </View>
        }
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader.useCase.titleModes.name"
      description="demoHeader.useCase.titleModes.description"
    >
      <Header
        titleTx="demoHeader.useCase.titleModes.centeredTitle"
        leftIcon="ladybug"
        rightText="Hooray"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader.useCase.titleModes.flexTitle"
        titleMode="flex"
        leftIcon="ladybug"
        rightText="Hooray"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase
      name="demoHeader.useCase.styling.name"
      description="demoHeader.useCase.styling.description"
    >
      <Header
        titleTx="demoHeader.useCase.styling.styledTitle"
        titleStyle={$customTitle}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader.useCase.styling.styledWrapperTitle"
        titleStyle={$customWhiteTitle}
        backgroundColor={colors.error}
        style={{ height: 35 }}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        titleTx="demoHeader.useCase.styling.tintedIconsTitle"
        titleStyle={$customWhiteTitle}
        backgroundColor={colors.error}
        leftIcon="ladybug"
        leftIconColor={colors.palette.neutral100}
        safeAreaEdges={[]}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file

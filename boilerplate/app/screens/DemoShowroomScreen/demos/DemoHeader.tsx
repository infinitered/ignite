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
  description:
    "Component that appears on many screens. Will hold navigation buttons and screen title.",
  data: [
    <DemoUseCase
      name="Action Icons"
      description="You can easily pass in icons to the left or right action components."
    >
      <Header title="Left Icon" leftIcon="ladybug" safeAreaEdges={[]} />
      <DemoDivider size={24} />
      <Header title="Right Icon" rightIcon="ladybug" safeAreaEdges={[]} />
      <DemoDivider size={24} />
      <Header title="Both Icons" leftIcon="ladybug" rightIcon="ladybug" safeAreaEdges={[]} />
    </DemoUseCase>,

    <DemoUseCase
      name="Action Text"
      description="You can easily pass in text to the left or right action components."
    >
      <Header
        title="Via `leftTx`"
        leftTx="demoShowroomScreen.demoHeaderTxExample"
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header title="Via `rightText`" rightText="Yay" safeAreaEdges={[]} />
    </DemoUseCase>,

    <DemoUseCase
      name="Custom Action Components"
      description="If the icon or text options are not enough, you can pass in your own custom action component."
    >
      <Header
        title="Custom Left Action"
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
      name="Title Modes"
      description="Title can be forced to stay in center (default) but may be cut off if it's too long. You can optionally make it adjust to the action buttons."
    >
      <Header title="Centered Title" leftIcon="ladybug" rightText="Hooray" safeAreaEdges={[]} />
      <DemoDivider size={24} />
      <Header
        title="Flex Title"
        titleMode="flex"
        leftIcon="ladybug"
        rightText="Hooray"
        safeAreaEdges={[]}
      />
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily.">
      <Header title="Styled Title" titleStyle={$customTitle} safeAreaEdges={[]} />
      <DemoDivider size={24} />
      <Header
        title="Styled Wrapper"
        titleStyle={$customWhiteTitle}
        backgroundColor={colors.error}
        style={{ height: 35 }}
        safeAreaEdges={[]}
      />
      <DemoDivider size={24} />
      <Header
        title="Tinted Icons"
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

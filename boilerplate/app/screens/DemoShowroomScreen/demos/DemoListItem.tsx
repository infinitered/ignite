/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Icon, ListItem, Text } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"

const flatListData =
  `Tempor Id Ea Aliqua Pariatur Aliquip. Irure Minim Voluptate Consectetur Consequat Sint Esse Proident Irure. Nostrud Elit Veniam Nostrud Excepteur Minim Deserunt Quis Dolore Velit Nulla Irure Voluptate Tempor. Occaecat Amet Laboris Nostrud Qui Do Quis Lorem Ex Elit Fugiat Deserunt. In Pariatur Excepteur Exercitation Ex Incididunt Qui Mollit Dolor Sit Non. Culpa Officia Minim Cillum Exercitation Voluptate Proident Laboris Et Est Reprehenderit Quis Pariatur Nisi`
    .split(".")
    .map((item) => item.trim())

const $customLeft: ViewStyle = {
  backgroundColor: colors.error,
  flexGrow: 0,
  flexBasis: 60,
  height: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  overflow: "hidden",
}

const $customTextStyle: TextStyle = {
  color: colors.error,
}

const $customTouchableStyle: ViewStyle = {
  backgroundColor: colors.error,
}

const $customContainerStyle: ViewStyle = {
  borderTopWidth: 5,
  borderTopColor: colors.palette.neutral100,
}

const $flatListStyle: ViewStyle = {
  paddingHorizontal: spacing.extraSmall,
  backgroundColor: colors.palette.neutral200,
  flex: 1,
  overflow: "scroll",
}

export const DemoListItem: Demo = {
  name: "ListItem",
  description: "A styled row component that can be used in FlatList, SectionList, or by itself.",
  data: [
    <DemoUseCase name="Height" description="The row can be different heights.">
      <ListItem topSeparator>Default height (56px)</ListItem>

      <ListItem topSeparator height={100}>
        Custom height via `height` prop
      </ListItem>

      <ListItem topSeparator>
        Height determined by text content - Reprehenderit incididunt deserunt do do ea labore.
      </ListItem>

      <ListItem topSeparator bottomSeparator TextProps={{ numberOfLines: 1 }}>
        Limit long text to one line - Reprehenderit incididunt deserunt do do ea labore.
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="Separators"
      description="The separator / divider is preconfigured and optional."
    >
      <ListItem topSeparator>Only top separator</ListItem>

      <DemoDivider size={40} />

      <ListItem topSeparator bottomSeparator>
        Top and bottom separators
      </ListItem>

      <DemoDivider size={40} />

      <ListItem bottomSeparator>Only bottom separator</ListItem>
    </DemoUseCase>,

    <DemoUseCase name="Icons" description="You can customize the icons on the left or right.">
      <ListItem topSeparator leftIcon="ladybug">
        Left icon
      </ListItem>

      <ListItem topSeparator rightIcon="ladybug">
        Right Icon
      </ListItem>

      <ListItem topSeparator bottomSeparator rightIcon="ladybug" leftIcon="ladybug">
        Left & Right Icons
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="Custom Left/Right Components"
      description="If you need a custom left/right component, you can pass it in."
    >
      <ListItem
        topSeparator
        LeftComponent={
          <View style={[$customLeft, { marginEnd: spacing.medium }]}>
            {Array.from({ length: 9 }, (x, i) => i).map((i) => (
              <Icon key={i} icon="ladybug" color={colors.palette.neutral100} size={20} />
            ))}
          </View>
        }
      >
        Custom left component
      </ListItem>

      <ListItem
        topSeparator
        bottomSeparator
        RightComponent={
          <View style={[$customLeft, { marginStart: spacing.medium }]}>
            {Array.from({ length: 9 }, (x, i) => i).map((i) => (
              <Icon key={i} icon="ladybug" color={colors.palette.neutral100} size={20} />
            ))}
          </View>
        }
      >
        Custom right component
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="Passing Content"
      description="There are a few different ways to pass content."
    >
      <ListItem topSeparator text="Via `text` prop - reprehenderit sint" />
      <ListItem topSeparator tx="demoShowroomScreen.demoViaTxProp" />
      <ListItem topSeparator>Children - mostrud mollit</ListItem>
      <ListItem topSeparator bottomSeparator>
        <Text>
          <Text preset="bold">Nested children - proident veniam.</Text>
          {` `}
          <Text preset="default">
            Ullamco cupidatat officia exercitation velit non ullamco nisi..
          </Text>
        </Text>
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name="Integrating w/ FlatList"
      description="The component can be easily integrated with your favorite list interface."
    >
      <View style={{ height: 148 }}>
        <FlatList<string>
          data={flatListData}
          style={$flatListStyle}
          renderItem={({ item, index }) => (
            <ListItem
              text={item}
              rightIcon="caretRight"
              TextProps={{ numberOfLines: 1 }}
              topSeparator={index !== 0}
            />
          )}
        />
      </View>
    </DemoUseCase>,

    <DemoUseCase name="Styling" description="The component can be styled easily.">
      <ListItem topSeparator textStyle={$customTextStyle}>
        Styled Text
      </ListItem>

      <ListItem
        topSeparator
        textStyle={{ color: colors.palette.neutral100 }}
        style={$customTouchableStyle}
      >
        Styled Text
      </ListItem>

      <ListItem
        topSeparator
        textStyle={{ color: colors.palette.neutral100 }}
        style={$customTouchableStyle}
        containerStyle={$customContainerStyle}
      >
        Styled Container (separators)
      </ListItem>
      <ListItem
        topSeparator
        textStyle={{ color: colors.palette.neutral100 }}
        style={$customTouchableStyle}
        containerStyle={$customContainerStyle}
        rightIcon="ladybug"
        leftIcon="ladybug"
        rightIconColor={colors.palette.neutral100}
        leftIconColor={colors.palette.neutral100}
      >
        Tinted Icons
      </ListItem>
    </DemoUseCase>,
  ],
}

// @demo remove-file

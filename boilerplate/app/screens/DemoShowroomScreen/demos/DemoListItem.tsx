/* eslint-disable react/jsx-key */
import { TextStyle, View, ViewStyle } from "react-native"
import { Icon, ListItem, ListView, Text } from "../../../components"
import type { ThemedStyle } from "../../../theme"
import { $styles } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import TranslateSheet from "translate-sheet"

const listData =
  `Tempor Id Ea Aliqua Pariatur Aliquip. Irure Minim Voluptate Consectetur Consequat Sint Esse Proident Irure. Nostrud Elit Veniam Nostrud Excepteur Minim Deserunt Quis Dolore Velit Nulla Irure Voluptate Tempor. Occaecat Amet Laboris Nostrud Qui Do Quis Lorem Ex Elit Fugiat Deserunt. In Pariatur Excepteur Exercitation Ex Incididunt Qui Mollit Dolor Sit Non. Culpa Officia Minim Cillum Exercitation Voluptate Proident Laboris Et Est Reprehenderit Quis Pariatur Nisi`
    .split(".")
    .map((item) => item.trim())

const $customLeft: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
  flexGrow: 0,
  flexBasis: 60,
  height: "100%",
  flexWrap: "wrap",
  overflow: "hidden",
})

const $customTextStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
})

const $customTouchableStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.error,
})

const $customContainerStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderTopWidth: 5,
  borderTopColor: colors.palette.neutral100,
})

const $listStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 148,
  paddingHorizontal: spacing.xs,
  backgroundColor: colors.palette.neutral200,
})

const translations = TranslateSheet.create("demoListItem", {
  description: "A styled row component that can be used in FlatList, SectionList, or by itself.",
  useCase: {
    height: {
      name: "Height",
      description: "The row can be different heights.",
      defaultHeight: "Default height (56px)",
      customHeight: "Custom height via `height` prop",
      textHeight:
        "Height determined by text content - Reprehenderit incididunt deserunt do do ea labore.",
      longText: "Limit long text to one line - Reprehenderit incididunt deserunt do do ea labore.",
    },
    separators: {
      name: "Separators",
      description: "The separator / divider is preconfigured and optional.",
      topSeparator: "Only top separator",
      topAndBottomSeparator: "Top and bottom separators",
      bottomSeparator: "Only bottom separator",
    },
    icons: {
      name: "Icons",
      description: "You can customize the icons on the left or right.",
      leftIcon: "Left icon",
      rightIcon: "Right Icon",
      leftRightIcons: "Left & Right Icons",
    },
    customLeftRight: {
      name: "Custom Left/Right Components",
      description: "If you need a custom left/right component, you can pass it in.",
      customLeft: "Custom left component",
      customRight: "Custom right component",
    },
    passingContent: {
      name: "Passing Content",
      description: "There are a few different ways to pass content.",
      text: "Via `text` prop - reprehenderit sint",
      children: "Children - mostrud mollit",
      nestedChildren1: "Nested children - proident veniam.",
      nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
    },
    listIntegration: {
      name: "Integrating w/ FlatList & FlashList",
      description: "The component can be easily integrated with your favorite list interface.",
    },
    styling: {
      name: "Styling",
      description: "The component can be styled easily.",
      styledText: "Styled Text",
      styledContainer: "Styled Container (separators)",
      tintedIcons: "Tinted Icons",
    },
  }
})

export const DemoListItem: Demo = {
  name: "ListItem",
  get description() {
    return translations.description;
  },
  data: ({ theme, themed }) => [
    <DemoUseCase
      name={translations.useCase.height.name}
      description={translations.useCase.height.description}
    >
      <ListItem text={translations.useCase.height.defaultHeight} topSeparator />
      <ListItem text={translations.useCase.height.customHeight} topSeparator height={100} />
      <ListItem text={translations.useCase.height.textHeight} topSeparator />
      <ListItem
        text={translations.useCase.height.longText}
        topSeparator
        bottomSeparator
        TextProps={{ numberOfLines: 1 }}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.separators.name}
      description={translations.useCase.separators.description}
    >
      <ListItem text={translations.useCase.separators.topSeparator} topSeparator />
      <DemoDivider size={40} />
      <ListItem
        text={translations.useCase.separators.topAndBottomSeparator}
        topSeparator
        bottomSeparator
      />
      <DemoDivider size={40} />
      <ListItem text={translations.useCase.separators.bottomSeparator} bottomSeparator />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.icons.name}
      description={translations.useCase.icons.description}
    >
      <ListItem text={translations.useCase.icons.leftIcon} topSeparator leftIcon="ladybug" />
      <ListItem text={translations.useCase.icons.rightIcon} topSeparator rightIcon="ladybug" />
      <ListItem
        text={translations.useCase.icons.leftRightIcons}
        topSeparator
        bottomSeparator
        rightIcon="ladybug"
        leftIcon="ladybug"
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.customLeftRight.name}
      description={translations.useCase.customLeftRight.description}
    >
      <ListItem
        topSeparator
        LeftComponent={
          <View style={themed([$styles.row, $customLeft, { marginEnd: theme.spacing.md }])}>
            {Array.from({ length: 9 }, (x, i) => i).map((i) => (
              <Icon key={i} icon="ladybug" color={theme.colors.palette.neutral100} size={20} />
            ))}
          </View>
        }
        text={translations.useCase.customLeftRight.customLeft}
      />

      <ListItem
        topSeparator
        bottomSeparator
        RightComponent={
          <View style={themed([$styles.row, $customLeft, { marginStart: theme.spacing.md }])}>
            {Array.from({ length: 9 }, (x, i) => i).map((i) => (
              <Icon key={i} icon="ladybug" color={theme.colors.palette.neutral100} size={20} />
            ))}
          </View>
        }
        text={translations.useCase.customLeftRight.customRight}
      />
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.passingContent.name}
      description={translations.useCase.passingContent.description}
    >
      <ListItem text={translations.useCase.passingContent.children} topSeparator />
      <ListItem text={translations.useCase.passingContent.children} topSeparator />
      <ListItem topSeparator bottomSeparator>
        <Text>
          <Text text={translations.useCase.passingContent.nestedChildren1} preset="bold" />
          {` `}
          <Text text={translations.useCase.passingContent.nestedChildren2} preset="default" />
        </Text>
      </ListItem>
    </DemoUseCase>,

    <DemoUseCase
      name={translations.useCase.listIntegration.name}
      description={translations.useCase.listIntegration.description}
    >
      <View style={themed($listStyle)}>
        <ListView<string>
          data={listData}
          estimatedItemSize={59}
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

    <DemoUseCase
      name={translations.useCase.styling.name}
      description={translations.useCase.styling.description}
    >
      <ListItem
        text={translations.useCase.styling.styledText}
        topSeparator
        textStyle={themed($customTextStyle)}
      />
      <ListItem
        topSeparator
        text={translations.useCase.styling.styledText}
        textStyle={{ color: theme.colors.palette.neutral100 }}
        style={themed($customTouchableStyle)}
      />
      <ListItem
        topSeparator
        text={translations.useCase.styling.styledContainer}
        textStyle={{ color: theme.colors.palette.neutral100 }}
        style={themed($customTouchableStyle)}
        containerStyle={themed($customContainerStyle)}
      />
      <ListItem
        topSeparator
        text={translations.useCase.styling.tintedIcons}
        textStyle={{ color: theme.colors.palette.neutral100 }}
        style={themed($customTouchableStyle)}
        containerStyle={themed($customContainerStyle)}
        rightIcon="ladybug"
        leftIcon="ladybug"
        rightIconColor={theme.colors.palette.neutral100}
        leftIconColor={theme.colors.palette.neutral100}
      />
    </DemoUseCase>,
  ],
}

// @demo remove-file

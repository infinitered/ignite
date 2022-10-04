import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { FlatList, Image, ImageStyle, SectionList, TextStyle, View, ViewStyle } from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useSharedValue } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { ListItem, Screen, Text } from "../../components"
import { isRTL } from "../../i18n"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing } from "../../theme"
import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const drawerRef = useRef<DrawerLayout>()
  const listRef = useRef<SectionList>()
  const menuRef = useRef<FlatList>()
  const progress = useSharedValue(0)

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  const handleScroll = (sectionIndex: number, itemIndex = 0) => {
    listRef.current.scrollToLocation({
      animated: true,
      itemIndex,
      sectionIndex,
    })
    toggleDrawer()
  }

  const scrollToIndexFailed = (info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => {
    listRef.current?.getScrollResponder()?.scrollToEnd()
    timeout.current = setTimeout(
      () =>
        listRef.current?.scrollToLocation({
          animated: true,
          itemIndex: info.index,
          sectionIndex: 0,
        }),
      50,
    )
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={326}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      drawerBackgroundColor={colors.palette.neutral100}
      overlayColor={colors.palette.overlay20}
      onDrawerSlide={(drawerProgress) => {
        progress.value = open ? 1 - drawerProgress : drawerProgress
      }}
      onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
        if (newState === "Settling") {
          setOpen(drawerWillShow)
        }
      }}
      renderNavigationView={() => (
        <SafeAreaView style={$drawer} edges={["top"]}>
          <View style={$logoContainer}>
            <Image source={logo} style={$logoImage} />
          </View>

          <FlatList<{ name: string; useCases: string[] }>
            ref={menuRef}
            contentContainerStyle={$flatListContentContainer}
            data={Object.values(Demos).map((d) => ({
              name: d.name,
              useCases: d.data.map((u) => u.props.name),
            }))}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <View>
                <Text
                  onPress={() => handleScroll(sectionIndex)}
                  preset="bold"
                  style={$menuContainer}
                >
                  {item.name}
                </Text>
                {item.useCases.map((u, index) => (
                  <ListItem
                    key={`section${sectionIndex}-${u}`}
                    onPress={() => handleScroll(sectionIndex, index + 1)}
                    text={u}
                    rightIcon={isRTL ? "caretLeft" : "caretRight"}
                  />
                ))}
              </View>
            )}
          />
        </SafeAreaView>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <DrawerIconButton onPress={toggleDrawer} {...{ open, progress }} />

        <SectionList
          ref={listRef}
          contentContainerStyle={$sectionListContentContainer}
          stickySectionHeadersEnabled={false}
          sections={Object.values(Demos)}
          renderItem={({ item }) => item}
          renderSectionFooter={() => <View style={$demoUseCasesSpacer} />}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoShowroomScreen.jumpStart" />
            </View>
          }
          onScrollToIndexFailed={scrollToIndexFailed}
          renderSectionHeader={({ section }) => {
            return (
              <View>
                <Text preset="heading" style={$demoItemName}>
                  {section.name}
                </Text>
                <Text style={$demoItemDescription}>{section.description}</Text>
              </View>
            )
          }}
        />
      </Screen>
    </DrawerLayout>
  )
}

const $drawer: ViewStyle = {
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.massive,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
  paddingHorizontal: spacing.large,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.extraSmall,
  paddingTop: spacing.large,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.medium,
}

const $demoItemDescription: TextStyle = {
  marginBottom: spacing.huge,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.huge,
}

// @demo remove-file

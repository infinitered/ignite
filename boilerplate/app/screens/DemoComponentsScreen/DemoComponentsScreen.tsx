import React, { Fragment, ReactElement, useRef, useState } from "react"
import { FlatList, Image, ImageStyle, Pressable, SectionList, View, ViewStyle } from "react-native"
import { DrawerLayout } from "react-native-gesture-handler"
import { Icon, Screen, Text } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors } from "../../theme"
import { DemoItem } from "./DemoItem"
import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  useCases: ReactElement[]
}

export function DemoComponentsScreen(props: DemoTabScreenProps<"DemoComponents">) {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<DrawerLayout>()
  const listRef = useRef<SectionList>()
  const menuRef = useRef<FlatList>()

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

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={326}
      drawerType={"slide"}
      drawerBackgroundColor={colors.palette.neutral100}
      onDrawerOpen={() => setOpen(true)}
      onDrawerClose={() => setOpen(false)}
      renderNavigationView={() => (
        <View style={$drawer}>
          <View style={$logoContainer}>
            <Image source={logo} style={$logo} />
          </View>

          <FlatList<{ name: string; useCases: string[] }>
            ref={menuRef}
            data={Object.values(Demos).map((d) => ({
              name: d.name,
              useCases: d.useCases.map((u) => u.props.name),
            }))}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <View>
                <Text onPress={() => handleScroll(sectionIndex)} preset="bold" style={$menu}>
                  {item.name}
                </Text>
                {item.useCases.map((u, index) => (
                  <Pressable
                    onPress={() => handleScroll(sectionIndex, index + 1)}
                    key={`section${sectionIndex}-${u}`}
                    style={$item}
                  >
                    <Text>{u}</Text>
                    <Icon icon="caretRight" />
                  </Pressable>
                ))}
              </View>
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <DrawerIconButton open={open} onPress={toggleDrawer} />

        <SectionList
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoComponentsScreen.jumpStart" />
            </View>
          }
          stickySectionHeadersEnabled={false}
          ref={listRef}
          sections={Object.values(Demos).map((d) => ({ title: d.name, data: d.useCases }))}
          renderSectionHeader={({ section: { title } }) => {
            const demo = Object.values(Demos).find((d) => d.name === title)
            return <DemoItem {...demo} />
          }}
          renderItem={({ item, section }) => (
            <Fragment key={`${section.key}-${item.name}`}>{item}</Fragment>
          )}
        />
      </Screen>
    </DrawerLayout>
  )
}

const $drawer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 24,
  marginVertical: 60,
}

const $heading: ViewStyle = {
  paddingHorizontal: 24,
  paddingTop: 16,
}
const $logo: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
  marginBottom: 13,
}

const $menu: ViewStyle = {
  paddingBottom: 8,
  paddingTop: 24,
}

const $item: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  height: 56,
  justifyContent: "space-between",
}

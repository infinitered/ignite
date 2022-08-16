import React, { ReactElement, useRef, useState } from "react"
import {
  FlatList,
  Image,
  ImageStyle,
  Pressable,
  SectionList,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { DrawerLayout } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Icon, Screen, Text } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors } from "../../theme"
import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
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
                  <Pressable
                    onPress={() => handleScroll(sectionIndex, index + 1)}
                    key={`section${sectionIndex}-${u}`}
                    style={$menuitem}
                  >
                    <Text>{u}</Text>
                    <Icon icon="caretRight" />
                  </Pressable>
                ))}
              </View>
            )}
          />
        </SafeAreaView>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <DrawerIconButton open={open} onPress={toggleDrawer} />

        <SectionList
          ref={listRef}
          contentContainerStyle={$sectionListContentContainer}
          stickySectionHeadersEnabled={false}
          sections={Object.values(Demos)}
          renderItem={({ item }) => item}
          renderSectionFooter={() => <View style={$demoUseCasesSpacer} />}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoComponentsScreen.jumpStart" />
            </View>
          }
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
  paddingHorizontal: 24,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: 24,
}

const $heading: ViewStyle = {
  marginBottom: 56,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
  paddingHorizontal: 24,
}

const $menuContainer: ViewStyle = {
  paddingBottom: 8,
  paddingTop: 24,
}

const $menuitem: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  height: 56,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: 18,
}

const $demoItemDescription: TextStyle = {
  marginBottom: 43,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: 58,
}

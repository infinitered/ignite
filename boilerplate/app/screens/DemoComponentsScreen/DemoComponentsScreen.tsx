import React, { ReactElement, useRef, useState } from "react"
import { FlatList, Image, ImageStyle, Pressable, View, ViewStyle } from "react-native"
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
  const listRef = useRef<FlatList>()
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
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  listRef.current.scrollToItem({
                    animated: true,
                    item,
                  })
                  toggleDrawer()
                }}
                style={$menu}
              >
                <Text preset="bold">{item.name}</Text>
                <View style={$subMenu}>
                  {item.useCases.map((u) => (
                    <View key={u} style={$subMenuItem}>
                      <Text>{u}</Text>
                      <Icon icon="caretRight" />
                    </View>
                  ))}
                </View>
              </Pressable>
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
        <DrawerIconButton open={open} onPress={toggleDrawer} />

        <FlatList<Demo>
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="demoComponentsScreen.jumpStart" />
            </View>
          }
          ref={listRef}
          data={Object.values(Demos)}
          keyExtractor={(item) => item.name}
          renderItem={(ItemProps) => <DemoItem {...ItemProps} />}
        />
      </Screen>
    </DrawerLayout>
  )
}

const $drawer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  marginLeft: 26,
  marginVertical: 60,
}

const $heading: ViewStyle = {
  marginBottom: 32,
  marginHorizontal: 24,
  marginTop: 16,
}
const $logo: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
}

const $menu: ViewStyle = {
  marginBottom: 8,
  marginHorizontal: 24,
  marginTop: 24,
}

const $subMenu: ViewStyle = {
  marginTop: 8,
}

const $subMenuItem: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  height: 56,
  justifyContent: "space-between",
}

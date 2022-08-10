import React, { useRef, useState } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { DrawerLayout } from "react-native-gesture-handler"
import { Screen, Text } from "../../components"
import { HamburgerButton } from "./hamburger-button"

import * as Components from "../../components"

const DRAWER: ViewStyle = {
  flex: 1,
  marginVertical: 100,
  justifyContent: "center",
  alignItems: "center",
}

const HAMBURGER: ViewStyle = {
  margin: 10,
}

export const ComponentsScreen = () => {
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
      drawerWidth={200}
      drawerType={"slide"}
      drawerBackgroundColor={"white"}
      onDrawerClose={() => setOpen(false)}
      renderNavigationView={() => (
        <View style={DRAWER}>
          <FlatList
            ref={menuRef}
            data={Object.keys(Components).map((compName) => compName)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Text
                onPress={() => {
                  listRef.current.scrollToItem({ animated: true, item })
                  toggleDrawer()
                }}
              >
                {item}
              </Text>
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed">
        <HamburgerButton open={open} onPress={toggleDrawer} style={HAMBURGER} />
        <FlatList
          ref={listRef}
          data={Object.keys(Components)
            .filter((c) => !["AutoImage", "Icon"].includes(c))
            .map((compName) => compName)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const Comp = Components[item]
            return (
              <View style={{ paddingVertical: 100, alignItems: "center" }}>
                <Text>{item}</Text>
                <Comp colors={[]} />
              </View>
            )
          }}
        />
      </Screen>
    </DrawerLayout>
  )
}

import React, { ReactElement, useRef, useState } from "react"
import { FlatList, Pressable, View, ViewStyle } from "react-native"
import { DrawerLayout } from "react-native-gesture-handler"
import { DrawerIconButton, Screen, Text } from "../../components"
import { DemoTabScreenProps } from "../../navigators/demo-navigator"
import { DemoItem } from "./DemoItem"
import * as Demos from "./demos"

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
      drawerWidth={200}
      drawerType={"slide"}
      drawerBackgroundColor={"white"}
      onDrawerClose={() => setOpen(false)}
      renderNavigationView={() => (
        <View style={$drawer}>
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
                  listRef.current.scrollToItem({ animated: true, item })
                  toggleDrawer()
                }}
              >
                <Text preset="heading">{item.name}</Text>
                {item.useCases.map((u) => (
                  <Text key={u} preset="subheading">
                    {u}
                  </Text>
                ))}
              </Pressable>
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed">
        <DrawerIconButton open={open} onPress={toggleDrawer} style={$hamburger} />

        <FlatList<Demo>
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
  marginVertical: 100,
  justifyContent: "center",
  alignItems: "center",
}

const $hamburger: ViewStyle = {
  margin: 10,
}

import React, { useEffect } from "react"
import { FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors } from "../theme"

export function DemoListScreen(props: DemoTabScreenProps<"DemoList">) {
  const { episodeStore } = useStores()

  useEffect(() => {
    // kick off fetching episodes from the API
    episodeStore.fetchEpisodes()
  })

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <View style={$heading}>
        <Text preset="heading" tx="demoListScreen.title" />
      </View>
      <FlatList<Episode>
        data={episodeStore.episodes}
        contentContainerStyle={$flatListContentContainer}
        renderItem={({ item }) => {
          return (
            <View style={[$rowLayout, $item]}>
              <Image source={{ uri: item.thumbnail }} style={$itemThumbnail} />
              <Text style={$description}>{item.title}</Text>
            </View>
          )
        }}
      />
    </Screen>
  )
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: 24,
}

const $heading: ViewStyle = {
  paddingHorizontal: 24,
  marginBottom: 56,
}

const $description: TextStyle = {
  marginTop: 16,
  flex: 1,
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: 24,
  marginVertical: 18,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
}

const $itemThumbnail: ImageStyle = {
  width: 100,
  height: 100,
  marginRight: 10,
}

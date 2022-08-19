import React, { useEffect } from "react"
import { FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors } from "../theme"
import { delay } from "../utils/delay"

export function DemoPodcastListScreen(props: DemoTabScreenProps<"DemoPodcastList">) {
  const { episodeStore } = useStores()

  const [refreshing, setRefreshing] = React.useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    episodeStore.fetchEpisodes()
  }, [episodeStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([episodeStore.fetchEpisodes(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <FlatList<Episode>
        data={episodeStore.episodes}
        contentContainerStyle={$flatListContentContainer}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="demoPodcastListScreen.title" />
          </View>
        }
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
  paddingTop: 24,
}

const $heading: ViewStyle = {
  marginBottom: 16,
}

const $description: TextStyle = {
  marginTop: 16,
  flex: 1,
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: 24,
  marginTop: 18,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
}

const $itemThumbnail: ImageStyle = {
  width: 100,
  height: 100,
  marginRight: 10,
}

import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"

function EpisodeCard({ item }: { item: Episode }) {
  return (
    <View style={[$rowLayout, $item]}>
      <View style={$description}>
        <Text>{item.title}</Text>
        <View style={[$rowLayout, $metadata]}>
          <Text size="xs">{item.datePublished}</Text>
          <Text size="xs">{item.duration}</Text>
        </View>
      </View>
      <Image source={{ uri: item.thumbnail }} style={$itemThumbnail} />
    </View>
  )
}

export const DemoPodcastListScreen = observer(function DemoPodcastListScreen(
  _props: DemoTabScreenProps<"DemoPodcastList">,
) {
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
        renderItem={EpisodeCard}
      />
    </Screen>
  )
})

const THUMBNAIL_DIMENSION = 100

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing[5],
  paddingTop: spacing[5],
}

const $heading: ViewStyle = {
  marginBottom: spacing[4],
}

const $description: TextStyle = {
  flex: 1,
  justifyContent: "space-between",
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing[4],
  marginTop: spacing[4],
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
}

const $itemThumbnail: ImageStyle = {
  width: THUMBNAIL_DIMENSION,
  height: THUMBNAIL_DIMENSION,
  marginStart: spacing[2],
}

const $metadata: TextStyle = {
  justifyContent: "space-between",
  color: colors.textDim,
}

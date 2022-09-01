import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import {
  TouchableOpacity,
  FlatList,
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Button, Icon, Screen, Switch, Text } from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"
import { openLinkInBrowser } from "../utils/open-link-in-browser"

const sadFace = require("../../assets/images/sad-face.png")

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
        data={episodeStore.episodesForList}
        extraData={episodeStore.favorites.length + episodeStore.episodes.length}
        contentContainerStyle={$flatListContentContainer}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          <View>
            <View style={$container}>
              <Text preset="subheading" style={$subheading}>
                So empty... so sad
              </Text>
              <Text>No data found yet. You can click the button or reload the app.</Text>
            </View>
            <View style={$buttonContainer}>
              <Button text="Let's Try Again" onPress={manualRefresh} style={$button} />
            </View>
            <View style={$sadFaceContainer}>
              <Image source={sadFace} style={$sadFace} resizeMode="contain" />
            </View>
          </View>
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="demoPodcastListScreen.title" />
            <View style={[$rowLayout, $toggle]}>
              <Switch
                value={episodeStore.favoritesOnly}
                onToggle={() => episodeStore.setProp("favoritesOnly", !episodeStore.favoritesOnly)}
              />
              <Text style={$toggleText} tx="demoPodcastListScreen.onlyFavorites" />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <EpisodeCard
            episode={item}
            isFavorite={episodeStore.hasFavorite(item)}
            onPressFavorite={() => episodeStore.toggleFavorite(item)}
          />
        )}
      />
    </Screen>
  )
})

const EpisodeCard = observer(function EpisodeCard({
  episode,
  isFavorite,
  onPressFavorite,
}: {
  episode: Episode
  onPressFavorite: () => void
  isFavorite: boolean
}) {
  return (
    <TouchableOpacity
      style={[$rowLayout, $item]}
      onPress={() => openLinkInBrowser(episode.enclosure.link)}
    >
      <View style={$description}>
        <Text>{episode.title}</Text>
        <View style={[$rowLayout, $metadata]}>
          <Icon
            icon="heart"
            color={isFavorite ? colors.palette.primary400 : undefined}
            onPress={onPressFavorite}
          />
          <Text size="xs">{episode.datePublished}</Text>
          <Text size="xs">{episode.duration}</Text>
        </View>
      </View>
      <Image source={{ uri: episode.thumbnail }} style={$itemThumbnail} />
    </TouchableOpacity>
  )
})

const THUMBNAIL_DIMENSION = 100

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
}

const $description: TextStyle = {
  flex: 1,
  justifyContent: "space-between",
}

const $item: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.medium,
  marginTop: spacing.medium,
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
}

const $toggle: ViewStyle = {
  alignItems: "center",
  marginTop: spacing.small,
}

const $toggleText: TextStyle = {
  marginStart: spacing.extraSmall,
}

const $itemThumbnail: ImageStyle = {
  width: THUMBNAIL_DIMENSION,
  height: THUMBNAIL_DIMENSION,
  marginStart: spacing.extraSmall,
}

const $metadata: TextStyle = {
  justifyContent: "space-between",
  color: colors.textDim,
  marginTop: spacing.extraSmall,
}

const $sadFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $container: ViewStyle = {
  paddingVertical: spacing.large,
}

const $subheading: TextStyle = {
  paddingBottom: spacing.small,
}

const $buttonContainer: ViewStyle = {
  paddingBottom: 50,
}

const $button: ViewStyle = {
  marginVertical: spacing.huge,
}

const $sadFaceContainer: ViewStyle = {
  marginVertical: spacing.massive,
}

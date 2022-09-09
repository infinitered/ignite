import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import {
  AccessibilityProps,
  FlatList,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Image,
} from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Button, Card, Icon, Screen, Text, Toggle } from "../components"
import { translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"
import { openLinkInBrowser } from "../utils/open-link-in-browser"

const ICON_SIZE = 14

const rnrImage1 = require("../../assets/images/rnr-image-1.png")
const rnrImage2 = require("../../assets/images/rnr-image-2.png")
const rnrImage3 = require("../../assets/images/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

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
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="demoPodcastListScreen.title" />
            <View style={[$rowLayout, $toggle]}>
              <Toggle
                value={episodeStore.favoritesOnly}
                onValueChange={() =>
                  episodeStore.setProp("favoritesOnly", !episodeStore.favoritesOnly)
                }
                variant="switch"
                labelTx="demoPodcastListScreen.onlyFavorites"
                labelPosition="left"
                labelStyle={$labelStyle}
                accessibilityLabel={translate("demoPodcastListScreen.accessibility.switch")}
              />
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
  const liked = useSharedValue(isFavorite ? 1 : 0)

  // Grey heart
  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
        },
      ],
      opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    }
  })

  // Pink heart
  const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    }
  })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
            action: isFavorite ? "unfavorite" : "favorite",
          }),
        },
        android: {
          accessibilityLabel: episode.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressFavorite()
            }
          },
        },
      }),
    [episode, isFavorite],
  )

  const handlePressFavorite = () => {
    onPressFavorite()
    liked.value = withSpring(liked.value ? 0 : 1)
  }

  const handlePressCard = () => {
    openLinkInBrowser(episode.enclosure.link)
  }

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={$metadata}>
          <Text style={$metadataText} size="xxs" accessibilityLabel={episode.datePublished.accessibilityLabel}>
            {episode.datePublished.textLabel}
          </Text>
          <Text style={$metadataText} size="xxs" accessibilityLabel={episode.duration.accessibilityLabel}>
            {episode.duration.textLabel}
          </Text>
        </View>
      }
      content={
        `${episode.parsedTitleAndSubtitle.title} - ${episode.parsedTitleAndSubtitle.subtitle}`
      }
      {...accessibilityHintProps}
      RightComponent={
        <Image source={rnrImages[Math.floor(Math.random()*rnrImages.length)]} style={$itemThumbnail} />
      }
      FooterComponent={
        <Button 
          onPress={handlePressFavorite} 
          style={[$favoriteButton, isFavorite && $unFavoriteButton]}
          LeftAccessory={() => 
            <View>
              <Animated.View
                style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
              >
                <Icon
                  icon="heart"
                  size={ICON_SIZE}
                  color={colors.palette.neutral800} // dark grey
                  onPress={handlePressFavorite}
                  accessibilityLabel={
                    isFavorite
                      ? undefined
                      : translate("demoPodcastListScreen.accessibility.favoriteIcon")
                  }
                />
              </Animated.View>
              <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
                <Icon
                  icon="heart"
                  size={ICON_SIZE}
                  color={colors.palette.primary400} // pink
                  onPress={handlePressFavorite}
                  accessibilityLabel={
                    isFavorite
                      ? translate("demoPodcastListScreen.accessibility.unfavoriteIcon")
                      : undefined
                  }
                />
              </Animated.View>
            </View>
          }
        >
          <Text size="xxs" accessibilityLabel={episode.duration.accessibilityLabel}>
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Text>
        </Button>
      }
    />
  )
})

// #region Styles
const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
}

const $item: ViewStyle = {
  padding: spacing.medium,
  marginTop: spacing.medium,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.small,
  borderRadius: 50,
  alignSelf: "flex-start",
}

const $rowLayout: ViewStyle = {
  flexDirection: "row",
}

const $toggle: ViewStyle = {
  alignItems: "flex-end",
  marginTop: spacing.small,
}

const $labelStyle: TextStyle = {
  textAlign: "left"
};

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginRight: spacing.small,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.extraSmall,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginRight: spacing.medium,
  marginBottom: spacing.extraSmall,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.medium,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.extraSmall,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}
// #endregion

import { ComponentType, FC, useCallback, useEffect, useMemo, useState } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { Button, type ButtonAccessoryProps } from "@/components/Button"
import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { useEpisodes, useEpisode } from "@/context/EpisodeContext"
import { isRTL } from "@/i18n"
import { translate } from "@/i18n/translate"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import type { EpisodeItem } from "@/services/api/types"
import type { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { delay } from "@/utils/delay"
import { openLinkInBrowser } from "@/utils/openLinkInBrowser"

const ICON_SIZE = 14

const rnrImage1 = require("@assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("@assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("@assets/images/demo/rnr-image-3.png")

const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

export const DemoPodcastListScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = (_props) => {
  const { themed } = useAppTheme()
  const {
    totalEpisodes,
    totalFavorites,

    episodesForList,
    fetchEpisodes,
    favoritesOnly,
    toggleFavoritesOnly,
    toggleFavorite,
  } = useEpisodes()

  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await fetchEpisodes()
      setIsLoading(false)
    })()
  }, [fetchEpisodes])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.allSettled([fetchEpisodes(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
      <FlatList<EpisodeItem>
        contentContainerStyle={themed([$styles.container, $listContentContainer])}
        data={episodesForList}
        extraData={totalEpisodes + totalFavorites}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        keyExtractor={(item) => item.guid}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={themed($emptyState)}
              headingTx={
                favoritesOnly ? "demoPodcastListScreen:noFavoritesEmptyState.heading" : undefined
              }
              contentTx={
                favoritesOnly ? "demoPodcastListScreen:noFavoritesEmptyState.content" : undefined
              }
              button={favoritesOnly ? "" : undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={themed($heading)}>
            <Text preset="heading" tx="demoPodcastListScreen:title" />
            {(favoritesOnly || episodesForList.length > 0) && (
              <View style={themed($toggle)}>
                <Switch
                  value={favoritesOnly}
                  onValueChange={() => toggleFavoritesOnly()}
                  labelTx="demoPodcastListScreen:onlyFavorites"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                  accessibilityLabel={translate("demoPodcastListScreen:accessibility.switch")}
                />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <EpisodeCard episode={item} onPressFavorite={() => toggleFavorite(item)} />
        )}
      />
    </Screen>
  )
}

const EpisodeCard = ({
  episode,
  onPressFavorite,
}: {
  episode: EpisodeItem
  onPressFavorite: () => void
}) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()
  const { isFavorite, datePublished, duration, parsedTitleAndSubtitle } = useEpisode(episode)

  const liked = useSharedValue(isFavorite ? 1 : 0)
  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  // Grey heart
  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.EXTEND),
        },
      ],
      opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolation.CLAMP),
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

  const handlePressFavorite = useCallback(() => {
    onPressFavorite()
    liked.value = withSpring(liked.value ? 0 : 1)
  }, [liked, onPressFavorite])

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: episode.title,
          accessibilityHint: translate("demoPodcastListScreen:accessibility.cardHint", {
            action: isFavorite ? "unfavorite" : "favorite",
          }),
        },
        android: {
          accessibilityLabel: episode.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoPodcastListScreen:accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressFavorite()
            }
          },
        },
      }),
    [episode.title, handlePressFavorite, isFavorite],
  )

  const handlePressCard = () => {
    openLinkInBrowser(episode.enclosure.link)
  }

  const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
            <Animated.View
              style={[
                $styles.row,
                themed($iconContainer),
                StyleSheet.absoluteFill,
                animatedLikeButtonStyles,
              ]}
            >
              <Icon
                icon="heart"
                size={ICON_SIZE}
                color={colors.palette.neutral800} // dark grey
              />
            </Animated.View>
            <Animated.View
              style={[$styles.row, themed($iconContainer), animatedUnlikeButtonStyles]}
            >
              <Icon
                icon="heart"
                size={ICON_SIZE}
                color={colors.palette.primary400} // pink
              />
            </Animated.View>
          </View>
        )
      },
    [animatedLikeButtonStyles, animatedUnlikeButtonStyles, colors, themed],
  )

  return (
    <Card
      style={themed($item)}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={[$styles.row, themed($metadata)]}>
          <Text
            style={themed($metadataText)}
            size="xxs"
            accessibilityLabel={datePublished.accessibilityLabel}
          >
            {datePublished.textLabel}
          </Text>
          <Text
            style={themed($metadataText)}
            size="xxs"
            accessibilityLabel={duration.accessibilityLabel}
          >
            {duration.textLabel}
          </Text>
        </View>
      }
      content={
        parsedTitleAndSubtitle.subtitle
          ? `${parsedTitleAndSubtitle.title} - ${parsedTitleAndSubtitle.subtitle}`
          : parsedTitleAndSubtitle.title
      }
      {...accessibilityHintProps}
      RightComponent={<Image source={imageUri} style={themed($itemThumbnail)} />}
      FooterComponent={
        <Button
          onPress={handlePressFavorite}
          onLongPress={handlePressFavorite}
          style={themed([$favoriteButton, isFavorite && $unFavoriteButton])}
          accessibilityLabel={
            isFavorite
              ? translate("demoPodcastListScreen:accessibility.unfavoriteIcon")
              : translate("demoPodcastListScreen:accessibility.favoriteIcon")
          }
          LeftAccessory={ButtonLeftAccessory}
        >
          <Text
            size="xxs"
            accessibilityLabel={duration.accessibilityLabel}
            weight="medium"
            text={
              isFavorite
                ? translate("demoPodcastListScreen:unfavoriteButton")
                : translate("demoPodcastListScreen:favoriteButton")
            }
          />
        </Button>
      }
    />
  )
}

// #region Styles
const $listContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
})

const $heading: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $item: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
  backgroundColor: colors.palette.neutral100,
})

const $itemThumbnail: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
})

const $toggle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: ICON_SIZE,
  width: ICON_SIZE,
  marginEnd: spacing.sm,
})

const $metadata: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginTop: spacing.xs,
})

const $metadataText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
})

const $favoriteButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
})

const $unFavoriteButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
})

const $emptyState: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion

// @demo remove-file

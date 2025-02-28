import { Link, RouteProp, useRoute } from "@react-navigation/native"
import { FC, ReactElement, useCallback, useEffect, useRef, useState } from "react"
import { Image, ImageStyle, Platform, SectionList, TextStyle, View, ViewStyle } from "react-native"
import { Drawer } from "react-native-drawer-layout"
import { type ContentStyle } from "@shopify/flash-list"
import { ListItem, ListView, ListViewRef, Screen, Text } from "../../components"
import { TxKeyPath, isRTL, translate } from "@/i18n"
import { DemoTabParamList, DemoTabScreenProps } from "../../navigators/DemoNavigator"
import type { Theme, ThemedStyle } from "@/theme"
import { $styles } from "@/theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"
import SectionListWithKeyboardAwareScrollView from "./SectionListWithKeyboardAwareScrollView"
import { useAppTheme } from "@/utils/useAppTheme"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: TxKeyPath
  data: ({ themed, theme }: { themed: any; theme: Theme }) => ReactElement[]
}

interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  const sectionSlug = item.name.toLowerCase()
  const { themed } = useAppTheme()
  return (
    <View>
      <Link
        screen="DemoShowroom"
        params={{ queryIndex: sectionSlug }}
        style={themed($menuContainer)}
      >
        <Text preset="bold">{item.name}</Text>
      </Link>
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)

        return (
          <Link
            key={`section${sectionIndex}-${u}`}
            screen="DemoShowroom"
            params={{ queryIndex: sectionSlug, itemIndex: itemSlug }}
          >
            <Text>{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => {
  const { themed } = useAppTheme()
  return (
    <View>
      <Text
        onPress={() => handleScroll?.(sectionIndex)}
        preset="bold"
        style={themed($menuContainer)}
      >
        {item.name}
      </Text>
      {item.useCases.map((u, index) => (
        <ListItem
          key={`section${sectionIndex}-${u}`}
          onPress={() => handleScroll?.(sectionIndex, index)}
          text={u}
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
        />
      ))}
    </View>
  )
}

const ShowroomListItem = Platform.select({ web: WebListItem, default: NativeListItem })
const isAndroid = Platform.OS === "android"

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
    const [open, setOpen] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>()
    const listRef = useRef<SectionList>(null)
    const menuRef = useRef<ListViewRef<DemoListItem["item"]>>(null)
    const route = useRoute<RouteProp<DemoTabParamList, "DemoShowroom">>()
    const params = route.params

    const { themed, theme } = useAppTheme()

    const toggleDrawer = useCallback(() => {
      if (!open) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }, [open])

    const handleScroll = useCallback((sectionIndex: number, itemIndex = 0) => {
      try {
        listRef.current?.scrollToLocation({
          animated: true,
          itemIndex,
          sectionIndex,
          viewPosition: 0.25,
        })
      } catch (e) {
        console.error(e)
      }
    }, [])

    // handle Web links
    useEffect(() => {
      if (params !== undefined && Object.keys(params).length > 0) {
        const demoValues = Object.values(Demos)
        const findSectionIndex = demoValues.findIndex(
          (x) => x.name.toLowerCase() === params.queryIndex,
        )
        let findItemIndex = 0
        if (params.itemIndex) {
          try {
            findItemIndex = demoValues[findSectionIndex]
              .data({ themed, theme })
              .findIndex((u) => slugify(translate(u.props.name)) === params.itemIndex)
          } catch (err) {
            console.error(err)
          }
        }
        handleScroll(findSectionIndex, findItemIndex)
      }
    }, [handleScroll, params, theme, themed])

    const scrollToIndexFailed = (info: {
      index: number
      highestMeasuredFrameIndex: number
      averageItemLength: number
    }) => {
      listRef.current?.getScrollResponder()?.scrollToEnd()
      timeout.current = setTimeout(
        () =>
          listRef.current?.scrollToLocation({
            animated: true,
            itemIndex: info.index,
            sectionIndex: 0,
          }),
        50,
      )
    }

    useEffect(() => {
      return () => timeout.current && clearTimeout(timeout.current)
    }, [])

    const $drawerInsets = useSafeAreaInsetsStyle(["top"])

    return (
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerType="back"
        drawerPosition={isRTL ? "right" : "left"}
        renderDrawerContent={() => (
          <View style={themed([$drawer, $drawerInsets])}>
            <View style={themed($logoContainer)}>
              <Image source={logo} style={$logoImage} />
            </View>
            <ListView<DemoListItem["item"]>
              ref={menuRef}
              contentContainerStyle={themed($listContentContainer)}
              estimatedItemSize={250}
              data={Object.values(Demos).map((d) => ({
                name: d.name,
                useCases: d.data({ theme, themed }).map((u) => translate(u.props.name)),
              }))}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index: sectionIndex }) => (
                <ShowroomListItem {...{ item, sectionIndex, handleScroll }} />
              )}
            />
          </View>
        )}
      >
        <Screen
          preset="fixed"
          safeAreaEdges={["top"]}
          contentContainerStyle={$styles.flex1}
          {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
        >
          <DrawerIconButton onPress={toggleDrawer} />

          <SectionListWithKeyboardAwareScrollView
            ref={listRef}
            contentContainerStyle={themed($sectionListContentContainer)}
            stickySectionHeadersEnabled={false}
            sections={Object.values(Demos).map((d) => ({
              name: d.name,
              description: d.description,
              data: [d.data({ theme, themed })],
            }))}
            renderItem={({ item, index: sectionIndex }) => (
              <View>
                {item.map((demo: ReactElement, demoIndex: number) => (
                  <View key={`${sectionIndex}-${demoIndex}`}>{demo}</View>
                ))}
              </View>
            )}
            renderSectionFooter={() => <View style={themed($demoUseCasesSpacer)} />}
            ListHeaderComponent={
              <View style={themed($heading)}>
                <Text preset="heading" tx="demoShowroomScreen:jumpStart" />
              </View>
            }
            onScrollToIndexFailed={scrollToIndexFailed}
            renderSectionHeader={({ section }) => {
              return (
                <View>
                  <Text preset="heading" style={themed($demoItemName)}>
                    {section.name}
                  </Text>
                  <Text style={themed($demoItemDescription)}>{translate(section.description)}</Text>
                </View>
              )
            }}
          />
        </Screen>
      </Drawer>
    )
  }

const $drawer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  flex: 1,
})

const $listContentContainer: ThemedStyle<ContentStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})

const $sectionListContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})

const $heading: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxxl,
})

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
})

const $menuContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
})

const $demoItemName: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 24,
  marginBottom: spacing.md,
})

const $demoItemDescription: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $demoUseCasesSpacer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
})

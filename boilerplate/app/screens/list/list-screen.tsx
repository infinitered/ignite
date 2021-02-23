import React from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  TextStyle,
  ViewStyle,
} from "react-native"
import { Header, Screen, Wallpaper } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color, spacing } from "../../theme"
import { ItemList } from "./item-list"
import { useStores } from "../../models"
import { DataUserProps } from "../../models/list-demo/list-demo.props"
import { translate } from "../../i18n"

const ROOT: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing[4],
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const LOADING: ViewStyle = {
  padding: spacing[3],
}
const ON_THRESHOLD = 1

export const ListScreen = observer(function ListScreen() {
  const { listDemo } = useStores()
  const navigation = useNavigation()

  React.useEffect(() => {
    listDemo.loadData()
  }, [])

  const onDeleteItem = (item: DataUserProps) => listDemo.removeItemData(item)

  const renderItem: ListRenderItem<DataUserProps> = ({ item, index }) => (
    <ItemList onDeleteItem={onDeleteItem} item={item} />
  )

  const onLoadmore = () => {
    if (!listDemo.noMore && !listDemo.loading) {
      listDemo.onLoadmore()
    }
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Wallpaper />
      <Header
        headerText={translate("listScreen.title", { count: listDemo.countData })}
        leftIcon="back"
        onLeftPress={navigation.goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor={color.background}
            refreshing={false}
            onRefresh={listDemo.loadData}
          />
        }
        data={listDemo.data}
        extraData={listDemo.data.length}
        keyExtractor={(item) => item.id + ""}
        removeClippedSubviews
        ListFooterComponent={
          listDemo.loading && (
            <ActivityIndicator style={LOADING} size="small" color={color.background} />
          )
        }
        onEndReached={onLoadmore}
        onEndReachedThreshold={ON_THRESHOLD}
        renderItem={renderItem}
      />
    </Screen>
  )
})

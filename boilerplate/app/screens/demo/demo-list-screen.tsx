import React, { useEffect, useState } from "react"
import { Image, FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const LISTCONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  padding: 10
}
const IMAGE: ImageStyle = {
  width: 65,
  height: 65,
  borderRadius: 35
}
const LISTTEXT: TextStyle = {
  marginLeft: 10
}

type CharacterData = { image: string; name: string; status: string}

export const DemoListScreen = observer(function DemoListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const [data, setData] = useState<CharacterData[]>()

  const { characterStore } = useStores();
  const { characters } = characterStore;

  useEffect(() => {
    // Todo fetch the data
    // setData(jsonArrayFromTheFetch)
    async function fetchData() {
      await characterStore.getCharacters();
    }

    fetchData()
  }, [])

  return (
    <View testID="DemoListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="demoListScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <FlatList
          data={characters}
          renderItem={({ item }) =>
          <View style={LISTCONTAINER}>
            <Image source={{ uri: item.image }} style={IMAGE} />
            <Text style={LISTTEXT}>{item.name} ({item.status})</Text>
            </View> }
        />
      </Screen>
    </View>
  )
})

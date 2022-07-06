/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { StyleProp, ViewStyle, FlatList, RefreshControl, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { flatten } from 'ramda'
import { useSafeArea } from 'react-native-safe-area-context'
import { BOTTOM_NAV_HEIGHT } from '../../utils/features'
import { spacing, color } from '../../theme'
import { View } from '../view/view'
import { Loader } from '../loader/loader'

const CONTAINER: ViewStyle = {
  flex: 1
}

const LOADER: ViewStyle = {
  marginVertical: spacing[6]
}

export interface CustomListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  ItemSeparatorComponent?: React.ComponentType<any> | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  data?:  ReadonlyArray<any> | null | undefined;
  keyExtractor?: (item: any, index: number) => string;
  onEndReached?: () => void
  infinitLoading?: boolean
  onRefresh?: () => void
  controlRefreshing?: boolean
  loading?: boolean
  refreshing?: boolean
  showsVerticalScrollIndicator?: boolean
  renderItem: ListRenderItem<any> | null | undefined
  bottomSafe?: boolean
  bottomNavSafe?: boolean
  listStyle?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  onEndReachedThreshold?: number | null;
  numColumns?: number | undefined;
  onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined;
}

/**
 * Describe your component here
 */
export const CustomList = (props: CustomListProps) => {
  const {
    style, listStyle, contentContainerStyle, ItemSeparatorComponent, ListEmptyComponent,
    data, keyExtractor, renderItem,
    onEndReached, infinitLoading, onRefresh, controlRefreshing, refreshing, loading,
    showsVerticalScrollIndicator, bottomSafe, bottomNavSafe, ListHeaderComponent,
    onEndReachedThreshold = 0.3, numColumns, onScroll
  } = props
  const styles = flatten([CONTAINER, style])

  const insets = useSafeArea()

  let contentPaddingBottom = 0

  if (bottomSafe) contentPaddingBottom = insets.bottom
  if (bottomNavSafe) contentPaddingBottom = BOTTOM_NAV_HEIGHT + insets.bottom

  const renderLoader = React.useMemo(() =>
    loading ? <Loader style={LOADER} /> : null,
  [loading])

  return (
    <View
      style={styles}
    >
      {renderLoader}
      {data &&
        <FlatList
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={[{
            flexGrow: 1,
            paddingBottom: contentPaddingBottom + spacing[6]
          }, contentContainerStyle]}
          data={data}
          keyExtractor={keyExtractor}
          numColumns={numColumns}
          onEndReached={(!infinitLoading && !loading && !refreshing) && onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          onScroll={onScroll}
          refreshControl={
            onRefresh &&
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={controlRefreshing}
                tintColor={color.palette.white}
              />
          }
          refreshing={infinitLoading || refreshing}
          renderItem={renderItem}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          style={listStyle}
        />}
    </View>
  )
}

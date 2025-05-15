import { FC } from 'react';
import { View, ViewStyle, Image, TouchableHighlight } from 'react-native';
import { iconRegistry, Text } from '../components';
import { Item } from '../models/Item';
import { colors, type ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { translate } from '@/i18n';

export interface ListItem {
  item: Item;
  setItemSelectedForRemove: (item: Item) => void;
  setDisplayRemoveForm: (display: boolean) => void;
}
export const NativeListItem: FC<ListItem> = ({
  item,
  setItemSelectedForRemove,
  setDisplayRemoveForm,
}) => {
  const { themed } = useAppTheme();

  return (
    <View>
      <Text preset="bold" style={themed($menuContainer)}>
        {item.title}
      </Text>
      <View
        style={themed({
          padding: 10,
          backgroundColor: colors.background,
          borderWidth: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 20,
          marginBottom: 10,
        })}
      >
        <Image
          source={require('../../assets/images/placeholder.png')}
          style={themed($image)}
        />
        <View style={themed($container)}>
          <Text preset="default" style={$text}>
            {item.description}
          </Text>
          <Text preset="default" style={$textDate}>
            {translate('homeScreen:createdOn') +
              ' ' +
              new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
        <TouchableHighlight
          testID="remove-item"
          onPress={() => {
            setItemSelectedForRemove(item);
            setDisplayRemoveForm(true);
          }}
        >
          <Image source={iconRegistry['x']} style={themed($icon)} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const $menuContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
});

const $text = {
  fontSize: 16,
};

const $textDate = {
  fontSize: 8,
};

const $image = {
  width: 50,
  height: 50,
  borderRadius: 8,
  marginRight: 10,
};

const $icon = {
  width: 30,
};

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  flexDirection: 'column',
});

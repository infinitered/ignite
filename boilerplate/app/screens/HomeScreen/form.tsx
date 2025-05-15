import { FC } from 'react';
import { Text, Button, TextField } from '@/components';
import { type ThemedStyle } from '@/theme';
import { Item } from '@/models/Item';
import { translate } from '@/i18n';
import { View } from 'react-native';

import * as styles from './styles';

export const FormAddItem: FC<{
  addItem: (
    userId: string,
    item: { title: string; description: string },
  ) => void;
  themed: <ViewStyle>(styleOrStyleFn: ThemedStyle<ViewStyle>) => ViewStyle;
  userId: string;
  itemName: string;
  itemDescription: string;
  setItemName: (name: string) => void;
  setItemDescription: (description: string) => void;
  isFormValid: boolean;
  setIsFormValid: (isValid: boolean) => void;
  setDisplayForm: (display: boolean) => void;
}> = ({
  addItem,
  themed,
  userId,
  itemName,
  itemDescription,
  setItemName,
  setItemDescription,
  isFormValid,
  setIsFormValid,
  setDisplayForm,
}) => {
  return (
    <View style={themed(styles.$view)}>
      <Text
        testID="item-title"
        text={translate('homeScreen:itemName')}
        preset="heading"
        style={themed(styles.$textInput)}
      />
      <TextField
        testID="item-title-input"
        value={itemName}
        placeholder={translate('homeScreen:itemNamePlaceholder')}
        style={themed(styles.$field)}
        onChangeText={(text) => {
          setItemName(text);
          setIsFormValid(text.length > 1 && itemDescription.length > 1);
        }}
      />
      <Text
        testID="item-description"
        text={translate('homeScreen:itemDescription')}
        preset="heading"
        style={themed(styles.$textInput)}
      />
      <TextField
        testID="item-description-input"
        value={itemDescription}
        style={themed(styles.$field)}
        placeholder={translate('homeScreen:itemDescriptionPlaceholder')}
        onChangeText={(text) => {
          setItemDescription(text);
          setIsFormValid(itemName.length > 1 && text.length > 1);
        }}
      />
      <Button
        testID="ok-button"
        text={translate('common:ok')}
        onPress={() => {
          // Handle form submission
          setItemName('');
          setItemDescription('');
          setIsFormValid(false);
          setDisplayForm(false);
          addItem(userId, {
            title: itemName,
            description: itemDescription,
          });
        }}
        disabled={!isFormValid}
        style={themed(styles.$button)}
      />
      <Button
        testID="cancel-button"
        text={translate('common:cancel')}
        onPress={() => {
          // Handle form submission
          setItemName('');
          setItemDescription('');
          setIsFormValid(false);
          setDisplayForm(false);
        }}
        style={themed(styles.$button)}
      />
    </View>
  );
};

export const FormRemoveItem = ({
  themed,
  item,
  userId,
  removeItem,
  setDisplayRemoveForm,
  setItemSelectedForRemove,
}: {
  themed: <ViewStyle>(styleOrStyleFn: ThemedStyle<ViewStyle>) => ViewStyle;
  item: Item;
  userId: string;
  removeItem: (userId: string, item: Item) => void;
  setDisplayRemoveForm: (display: boolean) => void;
  setItemSelectedForRemove: (item: Item | null) => void;
}) => {
  return (
    <View style={themed(styles.$view)}>
      <Text
        testID="remove-item-description"
        text={translate('homeScreen:removeItem')}
        preset="heading"
      />
      <Button
        testID="yes-button"
        text={translate('common:yes')}
        onPress={() => {
          removeItem(userId, item);
          setDisplayRemoveForm(false);
          setItemSelectedForRemove(null);
        }}
        style={themed(styles.$button)}
      />
      <Button
        testID="no-button"
        text={translate('common:no')}
        onPress={() => {
          setDisplayRemoveForm(false);
          setItemSelectedForRemove(null);
        }}
        style={themed(styles.$button)}
      />
    </View>
  );
};

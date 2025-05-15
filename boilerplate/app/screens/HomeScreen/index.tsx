import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState, useCallback } from 'react';
import Modal from 'react-native-modal';
import { FlatList, Image, View } from 'react-native';

import { Text, Screen, Button } from '@/components';
import { $styles } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { Item } from '@/models/Item';
import i18n from 'i18next';

import { useHeader } from '../../utils/useHeader';
import { NativeListItem, ListItem } from '../List';
import { useStores } from '../../models';
import { AppStackScreenProps } from '../../navigators';
import { FormAddItem, FormRemoveItem } from './form';
import { translate } from '@/i18n';

import * as styles from './styles';

const welcomeLogo = require('../../../assets/images/spacebox.png');

interface HomeScreenProps extends AppStackScreenProps<'Home'> {}

export const HomeScreen: FC<HomeScreenProps> = observer(
  function HomeScreen(_props) {
    const { themed } = useAppTheme();
    const [displayForm, setDisplayForm] = useState(false);
    const [displayRemoveForm, setDisplayRemoveForm] = useState(false);
    const [itemSelectedForRemove, setItemSelectedForRemove] =
      useState<Item | null>(null);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [initItems, setInitItems] = useState(false);

    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const {
      authenticationStore: { logout, authFirstName, authLastName, userId },
      storageStore: {
        items,
        addItemAsync: addItem,
        removeItemAsync: removeItem,
        fetchItems,
      },
    } = useStores();

    useHeader(
      {
        rightTx: 'common:logOut',
        leftTx: 'common:lang',
        onLeftPress: () => {
          if (i18n.language.includes('en')) {
            i18n.changeLanguage('zh');
          } else {
            i18n.changeLanguage('en');
          }
          forceUpdate();
        },
        onRightPress: logout,
      },
      [logout, i18n.language],
    );

    useEffect(() => {
      const fetchData = async () => {
        if (!userId) {
          return;
        }
        await fetchItems(userId);
        setInitItems(true);
      };
      if (!initItems) {
        fetchData();
      }
    }, [fetchItems, userId, initItems]);

    return (
      <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
        <View style={themed(styles.$topContainer)}>
          <Image
            style={themed(styles.$welcomeLogo)}
            source={welcomeLogo}
            resizeMode="contain"
          />
          <Text
            testID="welcome-name"
            style={themed(styles.$welcomeHeading)}
            text={`${translate('common:hello')} ${authFirstName} ${authLastName}`}
            preset="heading"
          />
          <FlatList<ListItem['item']>
            contentContainerStyle={themed(styles.$listContentContainer)}
            data={items}
            renderItem={({ item }) => {
              return (
                <NativeListItem
                  {...{
                    item,
                    setDisplayRemoveForm,
                    setItemSelectedForRemove,
                  }}
                />
              );
            }}
          />
          <Button
            testID="add-item-button"
            text={translate('homeScreen:addItem')}
            onPress={() => {
              setDisplayForm(!displayForm);
            }}
            style={themed(styles.$buttonAddItem)}
          />
          {displayForm && userId && (
            <Modal
              isVisible={displayForm}
              onBackdropPress={() => setDisplayForm(false)}
            >
              <FormAddItem
                userId={userId}
                addItem={addItem}
                themed={themed}
                itemName={itemName}
                itemDescription={itemDescription}
                setItemName={setItemName}
                setItemDescription={setItemDescription}
                isFormValid={isFormValid}
                setIsFormValid={setIsFormValid}
                setDisplayForm={setDisplayForm}
              />
            </Modal>
          )}
          {displayRemoveForm && itemSelectedForRemove && userId && (
            <Modal
              isVisible={displayRemoveForm}
              onBackdropPress={() => setDisplayRemoveForm(false)}
            >
              <FormRemoveItem
                themed={themed}
                userId={userId}
                item={itemSelectedForRemove}
                setDisplayRemoveForm={setDisplayRemoveForm}
                setItemSelectedForRemove={setItemSelectedForRemove}
                removeItem={removeItem}
              />
            </Modal>
          )}
        </View>
      </Screen>
    );
  },
);

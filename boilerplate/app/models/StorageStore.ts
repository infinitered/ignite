import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { Item, ItemModel } from './Item';
import { withSetPropAction } from './helpers/withSetPropAction';
import {
  itemsControllerCreate,
  itemsControllerDelete,
  itemsControllerFindAll,
} from '../client';
import { client } from '../client/client.gen';
import Config from '@/config';

client.setConfig({
  baseUrl: Config.API_URL,
});

export const StorageStoreModel = types
  .model('StorageStore')
  .props({
    items: types.optional(types.array(ItemModel), []),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchItems(userId: string) {
      if (Config.USE_API_ITEMS === false) {
        return;
      }

      const response = await itemsControllerFindAll({
        query: {
          userId,
          limit: 100,
        },
      });
      if (response.data?.items) {
        this.setItems(response.data.items);
      } else {
        console.error(`Error fetching items: ${JSON.stringify(response.data)}`);
      }
    },
    setItems(items: Item[]) {
      try {
        store.setProp('items', items);
      } catch (error) {
        console.error('Error setting items:', error);
      }
    },
    async addItemAsync(
      userId: string,
      item: { title: string; description: string },
    ) {
      if (Config.USE_API_ITEMS === true) {
        await itemsControllerCreate({
          body: {
            userId,
            title: item.title,
            description: item.description,
          },
        });
        this.fetchItems(userId);
      } else {
        const newId = Math.random().toString(36).substring(2, 15);
        const createdItem = ItemModel.create({
          id: newId,
          title: item.title,
          description: item.description,
        });
        this.addItem(createdItem);
      }
    },
    addItem(item: Item) {
      store.items.unshift(item);
    },
    async removeItemAsync(userId: string, item: Item) {
      if (Config.USE_API_ITEMS === true) {
        await itemsControllerDelete({
          path: {
            id: item.id,
          },
        });
        this.fetchItems(userId);
      } else {
        this.removeItem(item);
      }
    },
    removeItem(item: Item) {
      store.items.remove(item);
    },
  }));

export interface StorageStore extends Instance<typeof StorageStoreModel> {}
export interface StorageStoreSnapshot
  extends SnapshotOut<typeof StorageStoreModel> {}

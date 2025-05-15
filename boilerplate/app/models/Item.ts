import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const ItemModel = types.model('Item').props({
  id: '',
  title: '',
  description: '',
  createdAt: types.optional(types.string, () => new Date().toISOString()),
  updatedAt: types.optional(types.string, () => new Date().toISOString()),
});

export interface Item extends Instance<typeof ItemModel> {}
export interface ItemSnapshotOut extends SnapshotOut<typeof ItemModel> {}
export interface ItemSnapshotIn extends SnapshotIn<typeof ItemModel> {}

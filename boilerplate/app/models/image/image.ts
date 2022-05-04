import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const ImageModel = types
  .model('Image')
  .props({
    id: types.maybe(types.number),
    uri: types.string,
    name: types.string,
    type: types.string
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ImageType = Instance<typeof ImageModel>
export interface Image extends ImageType {}
type ImageSnapshotType = SnapshotOut<typeof ImageModel>
export interface ImageSnapshot extends ImageSnapshotType {}
export const createImageDefaultModel = () => types.optional(ImageModel, {})

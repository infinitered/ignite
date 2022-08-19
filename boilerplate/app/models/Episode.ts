import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/with-set-prop-action"

/**
 * This represents an episode of React Native Radio.
 */
export const EpisodeModel = types
  .model("Episode")
  .props({
    guid: types.identifier,
    title: "",
    pubDate: "",
    link: "",
    author: "",
    thumbnail: "",
    description: "",
    content: "",
    enclosure: types.frozen(),
    categories: types.array(types.string),

    // additional properties
    favorite: false,
  })
  .actions(withSetPropAction)
  .views((episode) => ({
    get datePublished() {
      return new Date(episode.pubDate)
    },
  }))

export interface Episode extends Instance<typeof EpisodeModel> {}
export interface EpisodeSnapshotOut extends SnapshotOut<typeof EpisodeModel> {}
export interface EpisodeSnapshotIn extends SnapshotIn<typeof EpisodeModel> {}

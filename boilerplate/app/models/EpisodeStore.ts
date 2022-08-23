import { clone, Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { Episode, EpisodeModel } from "./Episode"
import { withSetPropAction } from "./helpers/with-set-prop-action"

export const EpisodeStoreModel = types
  .model("EpisodeStore")
  .props({
    episodes: types.array(EpisodeModel),
    favorites: types.map(EpisodeModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchEpisodes() {
      const response = await api.getEpisodes()
      if (response.kind === "ok") {
        store.setProp("episodes", response.episodes)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
    addFavorite(episode: Episode) {
      store.favorites.set(episode.guid, clone(episode))
    },
    removeFavorite(episode: Episode) {
      store.favorites.delete(episode.guid)
    },
    hasFavorite(episode: Episode) {
      return store.favorites.has(episode.guid)
    },
  }))
  .actions((store) => ({
    toggleFavorite(episode: Episode) {
      if (store.favorites.has(episode.guid)) {
        store.removeFavorite(episode)
      } else {
        store.addFavorite(episode)
      }
    },
  }))

export interface EpisodeStore extends Instance<typeof EpisodeStoreModel> {}
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof EpisodeStoreModel> {}

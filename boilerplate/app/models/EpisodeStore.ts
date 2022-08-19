import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { EpisodeModel } from "./Episode"
import { withSetPropAction } from "./helpers/with-set-prop-action"

export const EpisodeStoreModel = types
  .model("EpisodeStore")
  .props({
    episodes: types.array(EpisodeModel),
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
  }))

export interface EpisodeStore extends Instance<typeof EpisodeStoreModel> {}
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof EpisodeStoreModel> {}

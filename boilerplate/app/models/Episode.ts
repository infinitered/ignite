import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { formatDate } from "../utils/formatDate"
import { translate } from "../i18n"

interface Enclosure {
  link: string
  type: string
  length: number
  duration: number
  rating: { scheme: string; value: string }
}

/**
 * This represents an episode of React Native Radio.
 */
export const EpisodeModel = types
  .model("Episode")
  .props({
    guid: types.identifier,
    title: "",
    pubDate: "", // Ex: 2022-08-12 21:05:36
    link: "",
    author: "",
    thumbnail: "",
    description: "",
    content: "",
    enclosure: types.frozen<Enclosure>(),
    categories: types.array(types.string),
  })
  .actions(withSetPropAction)
  .views((episode) => ({
    get parsedTitleAndSubtitle() {
      const defaultValue = { title: episode.title?.trim(), subtitle: "" }

      if (!defaultValue.title) return defaultValue

      const titleMatches = defaultValue.title.match(/^(RNR.*\d)(?: - )(.*$)/)

      if (!titleMatches || titleMatches.length !== 3) return defaultValue

      return { title: titleMatches[1], subtitle: titleMatches[2] }
    },
    get datePublished() {
      try {
        const formatted = formatDate(episode.pubDate)
        return {
          textLabel: formatted,
          accessibilityLabel: translate("demoPodcastListScreen.accessibility.publishLabel", {
            date: formatted,
          }),
        }
      } catch (error) {
        return { textLabel: "", accessibilityLabel: "" }
      }
    },
    get duration() {
      const seconds = Number(episode.enclosure.duration)
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = Math.floor((seconds % 3600) % 60)

      const hDisplay = h > 0 ? `${h}:` : ""
      const mDisplay = m > 0 ? `${m}:` : ""
      const sDisplay = s > 0 ? s : ""
      return {
        textLabel: hDisplay + mDisplay + sDisplay,
        accessibilityLabel: translate("demoPodcastListScreen.accessibility.durationLabel", {
          hours: h,
          minutes: m,
          seconds: s,
        }),
      }
    },
  }))

export interface Episode extends Instance<typeof EpisodeModel> {}
export interface EpisodeSnapshotOut extends SnapshotOut<typeof EpisodeModel> {}
export interface EpisodeSnapshotIn extends SnapshotIn<typeof EpisodeModel> {}

// @demo remove-file

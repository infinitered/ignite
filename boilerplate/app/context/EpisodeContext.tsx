import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import { api } from "@/services/api"

interface Enclosure {
  link: string
  type: string
  length: number
  duration: number
  rating: { scheme: string; value: string }
}

export interface Episode {
  guid: string
  title: string
  pubDate: string
  link: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: Enclosure
  categories: string[]
}

export type EpisodeContextType = {
  totalEpisodes: number
  totalFavorites: number
  episodesForList: Episode[]
  fetchEpisodes: () => Promise<void>
  favoritesOnly: boolean
  toggleFavoritesOnly: () => void
  hasFavorite: (episode: Episode) => boolean
  toggleFavorite: (episode: Episode) => void
}

export const EpisodeContext = createContext<EpisodeContextType | null>(null)

export interface EpisodeProviderProps {}

export const EpisodeProvider: FC<PropsWithChildren<EpisodeProviderProps>> = ({ children }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false)

  const fetchEpisodes = useCallback(async () => {
    const response = await api.getEpisodes()
    if (response.kind === "ok") {
      setEpisodes(response.episodes)
    } else {
      console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
    }
  }, [])

  const toggleFavoritesOnly = useCallback(() => {
    setFavoritesOnly((prev) => !prev)
  }, [])

  const toggleFavorite = useCallback(
    (episode: Episode) => {
      if (favorites.some((fav) => fav === episode.guid)) {
        setFavorites((prev) => prev.filter((fav) => fav !== episode.guid))
      } else {
        setFavorites((prev) => [...prev, episode.guid])
      }
    },
    [favorites],
  )

  const hasFavorite = useCallback(
    (episode: Episode) => favorites.some((fav) => fav === episode.guid),
    [favorites],
  )

  const episodesForList = useMemo(() => {
    return favoritesOnly ? episodes.filter((episode) => favorites.includes(episode.guid)) : episodes
  }, [episodes, favorites, favoritesOnly])

  const value = {
    totalEpisodes: episodes.length,
    totalFavorites: favorites.length,
    episodesForList,
    fetchEpisodes,
    favoritesOnly,
    toggleFavoritesOnly,
    hasFavorite,
    toggleFavorite,
  }

  return <EpisodeContext.Provider value={value}>{children}</EpisodeContext.Provider>
}

export const useEpisodes = () => {
  const context = useContext(EpisodeContext)
  if (!context) throw new Error("useEpisodes must be used within an EpisodeProvider")
  return context
}

// @demo remove-file

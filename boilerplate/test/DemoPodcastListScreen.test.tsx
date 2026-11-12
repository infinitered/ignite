import { Platform } from "react-native"
import { render, waitFor } from "@testing-library/react-native"
import i18n from "i18next"

import ar from "../app/i18n/ar"
import en from "../app/i18n/en"
import { DemoPodcastListScreen } from "../app/screens/DemoPodcastListScreen"

jest.unmock("i18next")
jest.mock("../app/i18n", () => ({ isRTL: false }))

const mockEpisode = { guid: "episode-1", title: "Test episode" }
const mockFetchEpisodes = jest.fn().mockResolvedValue(undefined)
let mockIsFavorite = false

jest.mock("../app/context/EpisodeContext", () => ({
  useEpisodes: () => ({
    episodesForList: [mockEpisode],
    totalEpisodes: 1,
    totalFavorites: mockIsFavorite ? 1 : 0,
    fetchEpisodes: mockFetchEpisodes,
    favoritesOnly: false,
    toggleFavoritesOnly: jest.fn(),
    toggleFavorite: jest.fn(),
  }),
  useEpisode: () => ({
    isFavorite: mockIsFavorite,
    datePublished: { textLabel: "", accessibilityLabel: "" },
    duration: { textLabel: "", accessibilityLabel: "" },
    parsedTitleAndSubtitle: { title: mockEpisode.title, subtitle: "" },
  }),
}))

jest.mock("../app/theme/context", () => ({
  useAppTheme: () => ({
    theme: { colors: { palette: {} } },
    themed: () => ({}),
  }),
}))
jest.mock("react-native-reanimated", () => ({
  __esModule: true,
  default: { View: require("react-native").View },
  useSharedValue: (value: number) => ({ value }),
  useAnimatedStyle: () => ({}),
}))
jest.mock("../app/components/Card", () => ({ Card: require("react-native").Pressable }))
jest.mock("../app/components/Screen", () => ({ Screen: require("react-native").View }))
jest.mock("../app/components/Text", () => ({ Text: require("react-native").Text }))
jest.mock("../app/components/Button", () => ({ Button: () => null }))
jest.mock("../app/components/Icon", () => ({ Icon: () => null }))
jest.mock("../app/components/EmptyState", () => ({ EmptyState: () => null }))
jest.mock("../app/components/Toggle/Switch", () => ({ Switch: () => null }))
jest.mock("../app/utils/openLinkInBrowser", () => ({ openLinkInBrowser: jest.fn() }))

describe("podcast accessibility hint", () => {
  beforeEach(() => {
    mockIsFavorite = false
    jest.spyOn(Platform, "select").mockImplementation((options) => options.ios)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it.each([
    ["ar", "إضافة إلى المفضلة", "إزالة من المفضلة"],
    ["en", "Favorite", "Unfavorite"],
  ])(
    "uses translated actions in %s when the favorite state changes",
    async (language, add, remove) => {
      await i18n.init({
        lng: language,
        resources: { ar, en },
        interpolation: { escapeValue: false },
      })
      const props = {} as Parameters<typeof DemoPodcastListScreen>[0]
      const { getByLabelText, rerender } = render(<DemoPodcastListScreen {...props} />)

      await waitFor(() => {
        expect(getByLabelText(mockEpisode.title).props.accessibilityHint).toContain(add)
      })

      mockIsFavorite = true
      rerender(<DemoPodcastListScreen {...props} />)

      expect(getByLabelText(mockEpisode.title).props.accessibilityHint).toContain(remove)
      expect(getByLabelText(mockEpisode.title).props.accessibilityHint).not.toContain("{{action}}")
    },
  )
})

// @demo remove-file

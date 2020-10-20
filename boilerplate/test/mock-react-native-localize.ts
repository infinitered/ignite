jest.mock("react-native-localize", () => {
  return {
    findBestAvailableLanguage: ([language = "en"]) => ({
      languageTag: language,
      isRTL: false,
    }),
  }
})

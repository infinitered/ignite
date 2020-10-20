jest.mock("i18n-js", () => {
  return {
    t: (key) => `${key}.test`,
  }
})

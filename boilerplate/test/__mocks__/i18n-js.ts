export const I18n = jest.fn().mockImplementation(() => {
  return {
    locale: "en",
    t: (key: string, params: Record<string, string>) => {
      return `${key} ${JSON.stringify(params)}`
    },
    numberToCurrency: jest.fn(),
  }
})

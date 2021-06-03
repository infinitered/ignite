import { buildCLIString } from "../src/tools/react-native"

describe(`buildCLIString`, () => {
  const projectName = "Foo"
  const src = "/some/fake/path"

  test(`react-native CLI`, () => {
    const { cliString, cliEnv, cli, boilerplatePath } = buildCLIString(projectName, src, {})

    expect(cliString).toEqual("npx react-native init Foo --template /some/fake/path")
    expect(cliEnv.USER).not.toBeUndefined()
    expect(cliEnv.USER).toEqual(process.env.USER)
    expect(cliEnv.EXPO_DEBUG).toBe(undefined)
    expect(cli).toEqual("react-native")
    expect(boilerplatePath).toEqual("/some/fake/path/boilerplate")
  })

  test(`react-native CLI with debug`, () => {
    const { cliString, cliEnv, cli, boilerplatePath } = buildCLIString(projectName, src, {
      debug: true,
    })

    expect(cliString).toEqual("npx react-native init Foo --template /some/fake/path --verbose")
    expect(cliEnv.USER).not.toBeUndefined()
    expect(cliEnv.USER).toEqual(process.env.USER)
    expect(cliEnv.EXPO_DEBUG).toBe(undefined)
    expect(cli).toEqual("react-native")
    expect(boilerplatePath).toEqual("/some/fake/path/boilerplate")
  })

  test(`expo`, () => {
    const { cliString, cliEnv, cli, boilerplatePath } = buildCLIString(projectName, src, {
      expo: true,
    })

    expect(cliString).toEqual(
      "npx expo-cli init Foo --template /some/fake/path/boilerplate --non-interactive",
    )
    expect(cliEnv.USER).not.toBeUndefined()
    expect(cliEnv.USER).toEqual(process.env.USER)
    expect(cliEnv.EXPO_DEBUG).toBe(undefined)
    expect(cli).toEqual("expo-cli")
    expect(boilerplatePath).toEqual("/some/fake/path/boilerplate")
  })

  test(`expo with debug`, () => {
    const { cliString, cliEnv, cli, boilerplatePath } = buildCLIString(projectName, src, {
      expo: true,
      debug: true,
    })

    expect(cliString).toEqual(
      "npx expo-cli init Foo --template /some/fake/path/boilerplate --non-interactive",
    )
    expect(cliEnv.USER).not.toBeUndefined()
    expect(cliEnv.USER).toEqual(process.env.USER)
    expect(cliEnv.EXPO_DEBUG).toBe(1)
    expect(cli).toEqual("expo-cli")
    expect(boilerplatePath).toEqual("/some/fake/path/boilerplate")
  })
})

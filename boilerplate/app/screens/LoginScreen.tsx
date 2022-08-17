import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen = observer(function LoginScreen(props: LoginScreenProps) {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      setAuthToken,
      validationErrors,
    },
  } = useStores()

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (Object.values(validationErrors).some((v) => !!v)) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon="view"
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={errors?.authEmail}
        status={errors?.authEmail ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        helper={errors?.authPassword}
        status={errors?.authPassword ? "error" : undefined}
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button tx="loginScreen.tapToSignIn" style={$tapButton} preset="reversed" onPress={login} />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: 40,
  paddingHorizontal: 24,
}

const $signIn: TextStyle = {
  marginBottom: 10,
}

const $enterDetails: TextStyle = {
  marginBottom: 18,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: 18,
}

const $textField: ViewStyle = {
  marginBottom: 24,
}

const $tapButton: ViewStyle = {
  marginTop: 8,
}

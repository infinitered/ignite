import React, { FC, useState } from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { Button, Icon, Screen, Text, TextField } from "../components";
import { useNavigation } from "@react-navigation/native";
import { AppStackScreenProps } from "../navigators";
import { colors, spacing } from "../theme";

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

export const SignUpScreen: FC<SignUpScreenProps> = function SignUpScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => setIsPasswordHidden(!isPasswordHidden);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordHidden(!isConfirmPasswordHidden);

  const PasswordRightAccessory = ({ hidden, onPress }) => (
    <Icon
      icon={hidden ? "view" : "hidden"}
      color={colors.palette.neutral800}
      size={20}
      onPress={onPress}
    />
  );

  const onHandleSignUp = async () => {
    // Implement your sign-up logic here
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="sign-up-heading" tx="signUpScreen.signUp" preset="heading" style={$signIn} />
      <Text tx="signUpScreen.enterDetails" preset="subheading" style={$enterDetails} />

      <TextField
        value={name}
        onChangeText={setName}
        containerStyle={$textField}
        autoCapitalize="none"
        autoCorrect={false}
        labelTx="signUpScreen.nameFieldLabel"
        placeholderTx="signUpScreen.nameFieldPlaceholder"
      />

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen.emailFieldLabel"
        placeholderTx="signUpScreen.emailFieldPlaceholder"
      />

      <TextField
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        labelTx="signUpScreen.passwordFieldLabel"
        placeholderTx="signUpScreen.passwordFieldPlaceholder"
        RightAccessory={() => <PasswordRightAccessory hidden={isPasswordHidden} onPress={togglePasswordVisibility} />}
      />

      <TextField
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isConfirmPasswordHidden}
        labelTx="signUpScreen.confirmPasswordFieldLabel"
        placeholderTx="signUpScreen.confirmPasswordFieldPlaceholder"
        RightAccessory={() => <PasswordRightAccessory hidden={isConfirmPasswordHidden} onPress={toggleConfirmPasswordVisibility} />}
      />

      <Button
        testID="sign-up-button"
        tx="signUpScreen.tapToSignUp"
        style={$tapButton}
        preset="reversed"
        onPress={onHandleSignUp}
      />

      <TouchableOpacity style={$loginButton} onPress={goToLogin}>
        <Text>Have an account? Login</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
};

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
};

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
};

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
};

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
};

const $loginButton: ViewStyle = {
  marginTop: spacing.xs,
  alignItems: 'center',
  padding: 10,
};

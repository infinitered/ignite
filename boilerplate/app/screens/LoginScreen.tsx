import { observer } from 'mobx-react-lite';
import {
  ComponentType,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { TextInput, TextStyle, ViewStyle } from 'react-native';
import i18n from 'i18next';

import {
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from '../components';
import { useStores } from '../models';
import { AppStackScreenProps } from '../navigators';

import type { ThemedStyle } from '@/theme';
import { useAppTheme } from '@/utils/useAppTheme';
import { useHeader } from '@/utils/useHeader';

interface LoginScreenProps extends AppStackScreenProps<'Login'> {}

export const LoginScreen: FC<LoginScreenProps> = observer(
  function LoginScreen(_props) {
    const authPasswordInput = useRef<TextInput>(null);

    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
      authenticationStore: {
        authPassword,
        authEmail,
        authFirstName,
        authLastName,
        setAuthFirstName,
        setAuthLastName,
        setAuthEmail,
        setAuthToken,
        setAuthPassword,
        setUserId,
        validationEmailError,
        validationPasswordError,
        validationFirstNameError,
        validationLastNameError,
      },
    } = useStores();

    useHeader(
      {
        leftTx: 'common:lang',
        onLeftPress: () => {
          if (i18n.language.includes('en')) {
            i18n.changeLanguage('zh');
          } else {
            i18n.changeLanguage('en');
          }
          forceUpdate();
        },
      },
      [i18n.language],
    );

    const {
      themed,
      theme: { colors },
    } = useAppTheme();

    useEffect(() => {
      // Here is where you could fetch credentials from keychain or storage
      // and pre-fill the form fields.
      setAuthEmail('');
      setAuthPassword('');

      // Return a "cleanup" function that React will run when the component unmounts
      return () => {
        setAuthPassword('');
        setAuthEmail('');
      };
    }, [setAuthEmail, setAuthPassword]);

    const errorEmail = isSubmitted ? validationEmailError : '';
    const errorPassword = isSubmitted ? validationPasswordError : '';
    const errorFirstName = isSubmitted ? validationFirstNameError : '';
    const errorLastName = isSubmitted ? validationLastNameError : '';

    async function login() {
      setIsSubmitted(true);

      if (validationEmailError) return;

      if (validationPasswordError) return;

      if (validationFirstNameError) return;

      if (validationLastNameError) return;

      setIsSubmitted(false);
      setAuthPassword('');
      setAuthEmail('');

      const token = String(Date.now());
      const userId = '8ee7cbd9-4c47-4aaf-a17b-eb29cc3dcff4'; // uuid.v4();

      setAuthToken(token);
      setUserId(userId);
    }

    const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> =
      useMemo(
        () =>
          function PasswordRightAccessory(props: TextFieldAccessoryProps) {
            return (
              <Icon
                icon={isAuthPasswordHidden ? 'view' : 'hidden'}
                color={colors.palette.neutral800}
                containerStyle={props.style}
                size={20}
                onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
              />
            );
          },
        [isAuthPasswordHidden, colors.palette.neutral800],
      );

    return (
      <Screen
        preset="auto"
        contentContainerStyle={themed($screenContentContainer)}
        safeAreaEdges={['top', 'bottom']}
      >
        <Text
          data-testid="login-heading"
          tx="loginScreen:logIn"
          preset="heading"
          style={themed($logIn)}
        />
        <Text
          data-testid="login-enter-details"
          tx="loginScreen:enterDetails"
          preset="subheading"
          style={themed($enterDetails)}
        />

        <TextField
          testID="login-email"
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen:emailFieldLabel"
          placeholderTx="loginScreen:emailFieldPlaceholder"
          helper={errorEmail}
          status={errorEmail ? 'error' : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          testID="login-first-name"
          value={authFirstName}
          onChangeText={setAuthFirstName}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="name-given"
          autoCorrect={false}
          labelTx="loginScreen:firstNameFieldLabel"
          placeholderTx="loginScreen:firstNameFieldPlaceholder"
          helper={errorFirstName}
          status={errorFirstName ? 'error' : undefined}
        />

        <TextField
          testID="login-last-name"
          value={authLastName}
          onChangeText={setAuthLastName}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="name-family"
          autoCorrect={false}
          labelTx="loginScreen:lastNameFieldLabel"
          placeholderTx="loginScreen:lastNameFieldPlaceholder"
          helper={errorLastName}
          status={errorLastName ? 'error' : undefined}
        />

        <TextField
          testID="login-password"
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen:passwordFieldLabel"
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          onSubmitEditing={login}
          helper={errorPassword}
          status={errorPassword ? 'error' : undefined}
          RightAccessory={PasswordRightAccessory}
        />

        <Button
          testID="login-button"
          tx="loginScreen:tapToLogIn"
          style={themed($tapButton)}
          preset="reversed"
          onPress={login}
        />
      </Screen>
    );
  },
);

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.lg,
});

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
});

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
});

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
});

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
});

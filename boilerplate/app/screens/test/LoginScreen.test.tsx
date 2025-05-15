import { screen, render, fireEvent } from '@testing-library/react-native';

import { LoginScreen } from '../LoginScreen';

jest.mock('../../models', () => ({
  useStores: jest.fn(() => ({
    authenticationStore: {
      setUserId: jest.fn(),
      setAuthEmail: jest.fn(),
      setAuthPassword: jest.fn(),
      setAuthToken: jest.fn(),
      validationEmailError: 'error:email',
      validationPasswordError: 'error:password',
      validationFirstNameError: 'error:firstName',
      validationLastNameError: 'error:lastName',
    },
    storageStore: {},
  })),
}));

jest.mock('@/utils/useAppTheme', () => ({
  useAppTheme: jest.fn(() => ({
    themed: () => (Component: any) => Component,
    theme: {
      colors: {
        palette: {
          neutral800: '#000',
        },
      },
    },
  })),
}));

jest.mock('../../utils/useHeader', () => ({
  useHeader: jest.fn(),
}));

describe('LoginScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the LoginScreen - Snapshot', () => {
    render(<LoginScreen navigation={{} as any} route={{} as any} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should display error message if fields are invalid', async () => {
    const { getByTestId, getByText } = render(
      <LoginScreen navigation={{} as any} route={{} as any} />,
    );

    // Press the login button
    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    expect(getByText('error:email')).toBeTruthy();
    expect(getByText('error:password')).toBeTruthy();
    expect(getByText('error:firstName')).toBeTruthy();
    expect(getByText('error:lastName')).toBeTruthy();
  });
});

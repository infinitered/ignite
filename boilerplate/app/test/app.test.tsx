import { fireEvent, render } from '@testing-library/react-native';

import { App } from '../app';
import { act } from 'react';

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the app, login and manage items - E2E', async () => {
    const { getByTestId, getByText, queryByText } = render(<App />);

    await act(async () => {
      // wait for the app to be ready
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    // Add email
    const emailInput = getByTestId('login-email');
    fireEvent.changeText(emailInput, 'alex.abidri@gmail.com');

    // Add password
    const passwordInput = getByTestId('login-password');
    fireEvent.changeText(passwordInput, 'Password123455555555@');

    // Add first name
    const firstNameInput = getByTestId('login-first-name');
    fireEvent.changeText(firstNameInput, 'Alex');
    // Add last name
    const lastNameInput = getByTestId('login-last-name');
    fireEvent.changeText(lastNameInput, 'Abidri');

    // Click on the login button
    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    await act(async () => {
      // wait for the app to be ready
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Find the text Hello Alex Abidri
    const welcomeText = getByText('Hello Alex Abidri');
    expect(welcomeText).toBeTruthy();

    // Click on the add item button
    const addItemButton = getByTestId('add-item-button');
    fireEvent.press(addItemButton);

    // Add item title
    const itemTitleInput = getByTestId('item-title-input');
    fireEvent.changeText(itemTitleInput, 'Item 1');

    // Add item description
    const itemDescriptionInput = getByTestId('item-description-input');
    fireEvent.changeText(itemDescriptionInput, 'Item 1 description');

    // Click on the add item button
    const addItemButton2 = getByTestId('ok-button');
    fireEvent.press(addItemButton2);

    // Find the text Item 1
    const itemText = getByText('Item 1');
    expect(itemText).toBeTruthy();
    // Click on the remove item button
    const removeItemButton = getByTestId('remove-item');
    fireEvent.press(removeItemButton);

    // Yes button
    const yesButton = getByTestId('yes-button');
    fireEvent.press(yesButton);

    // check if the item is removed
    const itemText2 = queryByText('Item 1');
    expect(itemText2).toBeFalsy();

    // Logout button
    const logoutButton = getByTestId('header-common:logOut-action');
    fireEvent.press(logoutButton);

    // check if the login screen is displayed
    const loginText = getByText('Log In');
    expect(loginText).toBeTruthy();
  });

  it('should change the language', async () => {
    const { getByTestId, getByText } = render(<App />);

    await act(async () => {
      // wait for the app to be ready
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Logout button
    const logoutButton = getByTestId('header-common:lang-action');
    fireEvent.press(logoutButton);

    const loginText2 = getByText(
      '在下方輸入您的詳細信息以訪問 Spacebox 的 React Native 應用。',
    );
    expect(loginText2).toBeTruthy();
  });
});

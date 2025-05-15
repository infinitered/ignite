import { screen, render, fireEvent, act } from '@testing-library/react-native';

import { HomeScreen } from '../HomeScreen';
// Mock the necessary modules and functions
jest.mock('../../models', () => ({
  useStores: jest.fn(() => ({
    authenticationStore: {
      userId: '1',
    },
    storageStore: {
      fetchItems: () => Promise.resolve(),
    },
  })),
}));

jest.mock('@/utils/useAppTheme', () => ({
  useAppTheme: jest.fn(() => ({
    themed: () => (Component: any) => Component,
    theme: {
      colors: {},
    },
  })),
}));

jest.mock('../../utils/useHeader', () => ({
  useHeader: jest.fn(),
}));

jest.mock('i18next', () => ({
  changeLanguage: jest.fn(),
  language: 'en',
}));

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Home screen - Snapshot', () => {
    render(<HomeScreen navigation={{} as any} route={{} as any} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should open the modal to add item and click on cancel button', async () => {
    const { getByTestId } = render(
      <HomeScreen navigation={{} as any} route={{} as any} />,
    );

    await act(async () => {
      // wait for the modal to be visible
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Click on the add item button
    const addItemButton = getByTestId('add-item-button');
    fireEvent.press(addItemButton);

    // Add item title
    const itemTitleInput = getByTestId('item-title-input');
    fireEvent.changeText(itemTitleInput, 'Item 1');

    // Add item description
    const itemDescriptionInput = getByTestId('item-description-input');
    fireEvent.changeText(itemDescriptionInput, 'Item 1 description');

    // Click on the cancel button
    const cancelButton = getByTestId('cancel-button');
    fireEvent.press(cancelButton);
  });
});

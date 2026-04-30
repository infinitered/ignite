import { render, screen } from '@testing-library/react-native';

import { {{Name}}Screen } from '@/screens/{{kebab-name}}/{{Name}}Screen';

describe('{{Name}}Screen', () => {
  it('renders the screen title', () => {
    // TODO: wrap in renderWithProviders once the helper exists in test/utils.
    render(<{{Name}}Screen route={{ params: undefined } as never} navigation={{} as never} />);
    expect(screen.getByText(/.+/)).toBeTruthy();
  });
});

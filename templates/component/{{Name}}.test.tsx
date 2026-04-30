import { render, screen } from '@testing-library/react-native';

import { {{Name}} } from '@/components/{{Name}}';

describe('{{Name}}', () => {
  it('renders the placeholder by default', () => {
    render(<{{Name}} />);
    expect(screen.getByText(/{{Name}}/i)).toBeTruthy();
  });
});

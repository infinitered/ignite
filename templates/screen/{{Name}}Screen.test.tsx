import { renderWithProviders } from '@/../test/utils/renderWithProviders';
import { {{Name}}Screen } from '@/screens/{{kebab-name}}/{{Name}}Screen';

describe('{{Name}}Screen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderWithProviders(
      <{{Name}}Screen route={{ params: undefined } as never} navigation={{} as never} />
    );
    expect(toJSON()).toBeTruthy();
  });
});

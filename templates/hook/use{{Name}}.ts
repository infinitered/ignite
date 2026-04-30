import { useCallback, useState } from 'react';

/**
 * TODO: describe what state + behavior use{{Name}} encapsulates.
 *
 * Custom hooks live here when shared by 2+ screens; otherwise keep
 * them screen-local in `app/screens/<feature>/hooks/`.
 */
export function use{{Name}}() {
  const [value, setValue] = useState<string>('');

  const reset = useCallback(() => setValue(''), []);

  return { value, setValue, reset };
}

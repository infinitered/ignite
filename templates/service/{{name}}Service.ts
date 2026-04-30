import { z } from 'zod';

import { api, getValidated } from '@/lib/api';

/**
 * Service for the {{name}} domain. One function per endpoint. Each
 * function returns Zod-validated typed data.
 *
 * Replace the schema and routes with the real backend contract.
 */

export const {{Name}} = z.object({
  id: z.string(),
  // TODO: real fields
});
export type {{Name}} = z.infer<typeof {{Name}}>;

const {{Name}}List = z.array({{Name}});

export const {{name}}Service = {
  list: () => getValidated('/{{kebab-name}}', {{Name}}List),
  get: (id: string) => getValidated(`/{{kebab-name}}/${id}`, {{Name}}),
  create: async (input: Omit<{{Name}}, 'id'>) => {
    const response = await api.post('/{{kebab-name}}', input);
    return {{Name}}.parse(response.data);
  },
  update: async (id: string, input: Partial<{{Name}}>) => {
    const response = await api.patch(`/{{kebab-name}}/${id}`, input);
    return {{Name}}.parse(response.data);
  },
  remove: async (id: string) => {
    await api.delete(`/{{kebab-name}}/${id}`);
  },
};

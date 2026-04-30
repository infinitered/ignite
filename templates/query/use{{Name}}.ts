import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type {{Name}}, {{name}}Service } from '@/services/{{name}}/{{name}}Service';

/**
 * TanStack Query hooks for the {{name}} domain. Pair with the
 * generated service file. queryKey factory is the canonical pattern —
 * use it for cache invalidation.
 */

export const {{name}}Keys = {
  all: ['{{name}}'] as const,
  list: () => [...{{name}}Keys.all, 'list'] as const,
  detail: (id: string) => [...{{name}}Keys.all, 'detail', id] as const,
};

export function use{{Name}}List() {
  return useQuery({
    queryKey: {{name}}Keys.list(),
    queryFn: () => {{name}}Service.list(),
  });
}

export function use{{Name}}(id: string) {
  return useQuery({
    queryKey: {{name}}Keys.detail(id),
    queryFn: () => {{name}}Service.get(id),
    enabled: Boolean(id),
  });
}

export function useCreate{{Name}}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Omit<{{Name}}, 'id'>) => {{name}}Service.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: {{name}}Keys.list() });
    },
  });
}

export function useUpdate{{Name}}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<{{Name}}> }) =>
      {{name}}Service.update(id, input),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: {{name}}Keys.detail(vars.id) });
      queryClient.invalidateQueries({ queryKey: {{name}}Keys.list() });
    },
  });
}

export function useDelete{{Name}}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {{name}}Service.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: {{name}}Keys.detail(id) });
      queryClient.invalidateQueries({ queryKey: {{name}}Keys.list() });
    },
  });
}

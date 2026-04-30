// @demo remove-file
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { getValidated } from '@/lib/api';

/**
 * Example query hook against jsonplaceholder. Demonstrates the canonical
 * pattern: queryKey factory → schema-validated fetcher → typed hook.
 *
 * Replace this file with your own resource hooks. Generator template
 * lives at `templates/query/use{{Name}}.ts` (see `pnpm gen query`).
 */

export const Post = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});
export type Post = z.infer<typeof Post>;

const Posts = z.array(Post);

export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: postKeys.list(),
    queryFn: ({ signal }) => getValidated('/posts', Posts, { signal }),
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: ({ signal }) => getValidated(`/posts/${id}`, Post, { signal }),
    enabled: Number.isFinite(id),
  });
}

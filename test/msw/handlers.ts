import { http, HttpResponse } from 'msw';

/**
 * Default MSW handlers covering the example endpoint. Add per-feature
 * handlers as you grow.
 *
 * Pattern: one file per domain, then re-export merged here.
 */
export const handlers = [
  // @demo remove-block
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json([
      { id: 1, userId: 1, title: 'Test post', body: 'Hello from MSW' },
      { id: 2, userId: 1, title: 'Second post', body: 'Lorem ipsum' },
    ]);
  }),
  // @demo remove-block-end
];

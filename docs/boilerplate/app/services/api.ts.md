# api.ts

This is the API service. It is a singleton class and contains the code for making API calls to your backend. You can use it like this:

```typescript
import { api } from "../services/api"

// ...
const response = await api.getEpisodes()

if (response.kind === "ok") {
  // do something with response.episodes
} else {
  console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
}
```

You can add more methods to this class to call other endpoints.

There are lots of other ways to handle API calls, such as using [React Query](https://tanstack.com/query/latest/), [SWR](https://swr.vercel.app/), or [Apollo Client](https://www.apollographql.com/docs/react/) and others. We've used all of these in production apps and they're all really good in different ways. We've chosen to use a simple, custom API client in this boilerplate to keep things flexible.

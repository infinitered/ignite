# Backend API Integration

Most apps need to communicate with a backend service of some sort. Some may have a REST API, some a GraphQL API, others might use Firebase/Firestore, Hasura, tRPC, Supabase, AWS/Amplify, or any number of different back end solutions.

Ignite purposely does not make any major decisions about what backend system we expect you to use. As a consultancy, we've integrated apps with all kinds of backends (ask us about the Coldfusion backend we integrated with a few years ago!), and can't be locked into one solution.

Ignite does come with a basic API setup which we'll describe here. Feel free to rip it out and use your own solution if this doesn't fit.

With that said, we've built large React Native apps using this pattern, and it works pretty well.

## HTTP Client

While React Native comes standard with a pretty good built-in `fetch` client library, it's not quite a smooth enough developer experience for us to recommend out of the box. So we include an HTTP client library called `apisauce`.

### apisauce

Ignite comes with [apisauce](https://github.com/infinitered/apisauce), which is a lightweight wrapper around the popular [Axios](https://axios-http.com/docs/intro) HTTP client library. We maintain this library at Infinite Red and it's a pretty battle-tested, solid HTTP library.

### The Api class

In `./app/services/api`, you'll find the Api class. This class is the place to add methods to call when you want to fetch data from your backend. Check out the file for examples of fetching data.

###

### A note about React Query (aka TanStack Query)

Note that we are currently exploring [TanStack Query](https://tanstack.com/query/) for use in Ignite. We need a few more projects under our belt before we can comfortably include it with Ignite (if we do at all). However, it's a popular solution, so it's worth mentioning here.

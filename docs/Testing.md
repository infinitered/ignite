# Testing Ignite Apps

At Infinite Red, we want confidence that the code we are shipping isn't breaking the experience for our clients' users.

Our philosophy is roughly based on the following idea from Guillermo Rauch:

> Write tests. Not too many. Mostly integration.

This isn't a hard and fast rule, but it does express our approach fairly well.

## Maestro Testing

We provide an [Ignite Cookbook recipe](https://ignitecookbook.com/docs/recipes/MaestroSetup) to help explain how to get started and run Maestro tests once you have ignited your app

## Unit Testing

> Unit tests cover the smallest parts of code, like individual functions or classes.

-- <cite>[React Native docs](https://reactnative.dev/docs/testing-overview#unit-tests), under [CC By 4.0](https://creativecommons.org/licenses/by/4.0/)</cite>

### Test Structure

In Ignite, we include unit tests for pure functions, such as models or utility functions.

Ignite uses Jest as our test runner. Jest tests are written using `it` or `test` statements, which take a describe of the test, and a function to execute the test code.

Then, inside the test function, we can make "assertions", or what we expect a value to be using the `expect` function. We pass the value as the first argument to the `expect` function, then we use one of the "matcher" methods on `expect`, such as `.toBe` to describe what the value should match.

[The React Native doc](https://reactnative.dev/docs/testing-overview#unit-tests) provide the following example for a unit test:

```ts
it("given a date in the past, colorForDueDate() returns red", () => {
  const input = colorForDueDate("2000-10-20")
  expect(input).toBe("red")
})
```

Jest functions like `it`, `test`, `expect`, and more are loaded globally by the Jest test runner, so you don't need to import them.

### Best Practices

> When writing a test, do your best to make sure that your tests > include the following information:
>
> - Given - some precondition
> - When - some action executed by the function that you’re testing
> - Then - the expected outcome
>   This is also known as AAA (Arrange, Act, Assert).

-- <cite>[Structuring Tests in React Native Docs](https://reactnative.dev/docs/testing-overview#structuring-tests)</cite>

You can read more about how to best practices for creating tests in the [Structuring Tests](https://reactnative.dev/docs/testing-overview#structuring-tests) section of the React Native docs.

### Writing Tests

To write your own tests, create a `.test.ts` file within the `app` or `test` directory.

Then run `yarn test` to run all unit tests using Jest.

When writing tests, you can also run Jest in watch mode by running `yarn test:watch`. This will start a long running Jest process, that re-runs your tests on save in your editor. This is useful for iterating on values and getting quick feedback about whether your changes were successful or not.

### When to write Unit Tests

The most important question to ask when writing tests is "what code should be unit tested?" Not every line of code will benefit from a unit test. Typically, you'll want a unit test when you have code that can be run without external dependencies (like an API) that has some non-trivial logic.

- **complicated regexes**: for many developers, regex's only make sense as you are writing them. Testing with a series of valid and invalid inputs can help ensure that they work as intended for future developers.
- **nested if/else statements**: if you rely heavily on a function with a lot of if/else statements, it can be helpful to have tests to make sure that you can visit each condition. Often times when we have more than a handful of conditionals, it can become impossible to visit all of them without realizing it.
- **validation functions**: often times we may write functions like `isJson()` to validate that a value is a specific shape. If critical parts of our code rely on the correctness of this function, we want to test that code!

## Mocking

However, often our code is not entirely written as pure functions. Most apps have side effects like making network requests, calling native modules, or reaching for global objects.

In integration tests, we can set up a suitable testing environment to handle these side effects.

But in unit tests, where we want to test an isolated piece of code, another option is to provide mocks for these external dependencies.

Jest provides a variety of mocking strategies for our code:

### Mock Functions

You can create a mock callback function in Jest like so:

```ts
// take the input value, and add 42
const mockCallback = jest.fn((x) => 42 + x)
```

This callback can be called like a normal function

```ts
const added = [0, 1].map(mockCallback)
```

But it also has a variety of properties added to it, such as `.mock`, which you can assert against later in tests.

```ts
// The mock function is called twice, once for each item in the array
expect(mockCallback.mock.calls.length).toBe(2)
```

This particular example from the [official Jest docs](https://jestjs.io/docs/mock-functions#using-a-mock-function). You can read more about about [what other properties are available on the `.mock` property](https://jestjs.io/docs/mock-functions#mock-property) as well at the Jest docs.

### Mock Modules

Testing code that touches other libraries such as `axios` can be challenging, because we need to rely on the network for what gets returned from users.

```tsx
import React from "react"
import { View, Text } from "react-native"
import axios from "axios"

export const getUsers = () => axios.get("/users").then((res) => res.data)
```

One way to solve this, is by mocking the `axios` library to return a static list of users, so that we can reliably get the same information in our tests.

```ts
import axios from "axios"
import { getUsers } from "./users"

jest.mock("axios")

test("should fetch users", () => {
  const users = [{ name: "Bob" }]
  const res = { data: users }

  axios.get.mockImplementation(() => Promise.resolve(res))

  getUsers().then((data) => {
    expect(data).toEqual(users)
  })
})
```

This example is derived from the the [Mocking Modules](https://jestjs.io/docs/mock-functions#mocking-modules) section of the Jest docs, where you can read about more sophisticated use cases.

### React Native Modules

In addition to regular Javascript libraries, you can also mock out native modules in React Native. Using the following syntax

```
jest.mock('react-native-video', () => 'Video');
```

The first argument of `jest.mock` is the name of the module want to mock, but you can also pass a second argument to provide a function that returns the module.

In this example, this will return a default export.

This example is derived from [Testing React Native](https://jestjs.io/docs/tutorial-react-native#mock-native-modules-using-jestmock) section of the Jest docs, where you can read more.

## Resources

### Libraries

There are a variety of testing libraries available in React Native that you may find useful to add to your Ignite app

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) - port of @testing-library/react for React Native. Useful for unit testing components.
- [Appium](https://appium.io/) - alternative for integration testing to Maestro.

### Relevant Reading

- [React Native docs on Testing](https://reactnative.dev/docs/testing-overview)
- [Testing React Native Apps with Jest](https://jestjs.io/docs/tutorial-react-native)
- [Why Maestro?](https://maestro.mobile.dev/#why-maestro)
- [Kent C. Dodds articles on Testing](https://kentcdodds.com/blog?q=test)

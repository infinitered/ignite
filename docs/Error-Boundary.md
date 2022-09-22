# Error Boundary

Sometimes, things go wrong in an app. A request comes back with an unexpected status, users find ways to make invalid inputs, a whole host of other issues that we can't imagine when we are first writing code.

It is a good idea to have a fallback UI for critical screens or components when they unexpected throw an error.

That is why we provide an ErrorBoundary component in Ignite by default.

## How to Handle Errors

### Render Error UI

```tsx
const ErrorMessage = () => <Text>Something went wrong!</Text>

class ErrorBoundary extends Component<Props, State> {
  state = { error: null, errorInfo: null }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    return this.state.error ? <ErrorMessage /> : this.props.children
  }
}
```

`ErrorBoundary` components leverage the `componentDidCatch` method on Class Components to capture and allow us to store errors when children throw an exception.

This allows us to show alternative UI components when an error is thrown on child components.

### Use Error Reporting Service

Inside `componentDidCatch` of an `ErrorBoundary` component is also a great place to report to monitoring services like BugSnag, Sentry, or Honeybadger, so you can be alerted when errors are happening for users.

Ignite provides utilities in [`/app/utils/crash-reporting.ts`](../boilerplate/app/utils/crash-reporting.ts) to integrate these services into your app.

## Examples

- See our [`ErrorBoundary` component](../boilerplate/app/screens/ErrorScreen/ErrorBoundary.tsx) for error catching logic
- See our [`ErrorScreen` component](../boilerplate/app/screens/ErrorScreen/ErrorDetails.tsx) for error fallback UI
- [reactjs.org docs on Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
- [codepen example of Error Boundary usage](https://codepen.io/gaearon/pen/wqvxGa?editors=0010)

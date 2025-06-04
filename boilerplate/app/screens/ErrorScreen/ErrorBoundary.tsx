import { Component, ErrorInfo, ReactNode } from "react"

import { ErrorDetails } from "./ErrorDetails"

interface Props {
  children: ReactNode
  catchErrors: "always" | "dev" | "prod" | "never"
}

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * This component handles whenever the user encounters a JS error in the
 * app. It follows the "error boundary" pattern in React. We're using a
 * class component because according to the documentation, only class
 * components can be error boundaries.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/concept/Error-Boundary/}
 * @see [React Error Boundaries]{@link https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary}
 * @param {Props} props - The props for the `ErrorBoundary` component.
 * @returns {JSX.Element} The rendered `ErrorBoundary` component.
 */
export class ErrorBoundary extends Component<Props, State> {
  state = { error: null, errorInfo: null }

  // If an error in a child is encountered, this will run
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only set errors if enabled
    if (!this.isEnabled()) {
      return
    }
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })

    // You can also log error messages to an error reporting service here
    // This is a great place to put BugSnag, Sentry, crashlytics, etc:
    // reportCrash(error)
  }

  // Reset the error back to null
  resetError = () => {
    this.setState({ error: null, errorInfo: null })
  }

  // To avoid unnecessary re-renders
  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
    return nextState.error !== this.state.error
  }

  // Only enable if we're catching errors in the right environment
  isEnabled(): boolean {
    return (
      this.props.catchErrors === "always" ||
      (this.props.catchErrors === "dev" && __DEV__) ||
      (this.props.catchErrors === "prod" && !__DEV__)
    )
  }

  // Render an error UI if there's an error; otherwise, render children
  render() {
    return this.isEnabled() && this.state.error ? (
      <ErrorDetails
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    )
  }
}

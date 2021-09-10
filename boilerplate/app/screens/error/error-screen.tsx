/**
 * This screen is displayed whenever the user encounters an error in the
 * app. It follows the "error boundary" pattern in React.
 *
 * Read more here:
 *
 * @link: https://reactjs.org/docs/error-boundaries.html
 */
import React, { Component, ErrorInfo, ReactNode } from "react"
import { ErrorComponent } from "./error-component"

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * We're using a class component because according to the documentation
 * (linked above), only class components can be error boundaries.
 */
export class ErrorScreen extends Component<Props, State> {
  state = { error: null, errorInfo: null }

  // If an error in a child is encountered, this will run
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })

    // You can also log error messages to an error reporting service here
    // reportErrorToCrashReportingService(error)
  }

  // Reset the error back to null
  resetError = () => {
    this.setState({ error: null, errorInfo: null })
  }

  // To avoid unnecessary re-renders
  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>): boolean {
    return nextState.error !== nextProps.error
  }

  // Render an error UI if there's an error; otherwise, render children
  render() {
    return this.state.error ? (
      <ErrorComponent
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    )
  }
}

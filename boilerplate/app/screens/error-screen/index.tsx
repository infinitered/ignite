import React, {Component} from "react"
import { ErrorComponent } from "./error-component"

class ErrorDisplay extends Component {
  state = {error: null}

  static getDerivedStateFromError(error) {
    return {error}
  }

  resetError = () => {
    this.setState({error: null})
  }

  shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>): boolean {
    if (nextState.error !== nextProps.error) {
      return true
    }
    return false
  }

  render() {
    return this.state.error ? (
      <ErrorComponent
        onReset={this.resetError}
        error={`${ this.state.error }`}
      />
    ) : (
      this.props.children
    )
  }
}

export default ErrorDisplay

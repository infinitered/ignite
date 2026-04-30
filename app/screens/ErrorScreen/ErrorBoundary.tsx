import { Component, type ErrorInfo, type ReactNode } from 'react';

import { captureException } from '@/lib/sentry';

import { ErrorDetails } from './ErrorDetails';

interface Props {
  children: ReactNode;
  catchErrors: 'always' | 'dev' | 'prod' | 'never';
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Top-level error boundary. Catches any uncaught render error in the
 * tree, sends it to Sentry, and renders `ErrorDetails` so the user can
 * recover. Mount this once near the root of the navigator.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (!this.isEnabled()) return;
    this.setState({ error, errorInfo });
    captureException(error, { extra: { componentStack: errorInfo.componentStack } });
  }

  resetError = (): void => {
    this.setState({ error: null, errorInfo: null });
  };

  shouldComponentUpdate(_: Readonly<Props>, nextState: Readonly<State>): boolean {
    return nextState.error !== this.state.error;
  }

  isEnabled(): boolean {
    return (
      this.props.catchErrors === 'always' ||
      (this.props.catchErrors === 'dev' && __DEV__) ||
      (this.props.catchErrors === 'prod' && !__DEV__)
    );
  }

  render() {
    return this.isEnabled() && this.state.error ? (
      <ErrorDetails
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    );
  }
}

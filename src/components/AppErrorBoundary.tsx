import { Component, type ReactNode } from 'react';

export default class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="status-page" id="main-content" tabIndex={-1}>
          <h1>We couldn’t load this page</h1>
          <p>Try reloading the page, or return to Degree Explorer.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload page
          </button>
          <a href={import.meta.env.BASE_URL}>Return to Degree Explorer</a>
        </main>
      );
    }
    return this.props.children;
  }
}

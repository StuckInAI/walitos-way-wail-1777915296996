import { Component, type ErrorInfo, type ReactNode } from 'react';
import { clearStoredItems } from '@/lib/itemsStorage';

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info.componentStack);
  }

  handleReset = () => {
    clearStoredItems();
    this.setState({ error: null });
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#0a0a0a',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              The page failed to load. This can happen after an update or if saved
              data is corrupted. Try reloading, or reset your saved items.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={this.handleRetry}
                style={{
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.6rem 1.2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reload
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  background: 'transparent',
                  color: '#ccc',
                  border: '1px solid #333',
                  borderRadius: 8,
                  padding: '0.6rem 1.2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reset saved items
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

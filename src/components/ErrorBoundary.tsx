import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 32,
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          maxWidth: 420,
          margin: '80px auto',
        }}>
          <h1 style={{ fontSize: 18, marginBottom: 12, color: '#f0f0ff' }}>Something went wrong</h1>
          <p style={{ color: '#8888AA', fontSize: 14, marginBottom: 16 }}>Try refreshing the page.</p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              background: '#FF4D00',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

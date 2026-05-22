import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: '#fff', background: '#000', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '1rem' }}>{this.state.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: '' })}
            style={{ background: '#fff', color: '#000', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 700 }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

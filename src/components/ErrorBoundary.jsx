import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-container">
          <div className="glass-card error-fallback-card">
            <AlertOctagon size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
            <h2>Application Error Detected</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
              The application encountered an unexpected runtime state. Your local data remains safe.
            </p>
            {this.state.error && (
              <pre className="error-stack-preview">
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <button className="btn btn-primary" onClick={this.handleReset} style={{ marginTop: '1.5rem' }}>
              <RefreshCw size={18} /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

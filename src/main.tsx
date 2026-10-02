import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro na aplicação Além da Grade:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('alem_da_grade_posts_v2');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#faf7f2',
            fontFamily: 'sans-serif',
            color: '#161124',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '2px solid #161124',
              borderRadius: '16px',
              boxShadow: '6px 6px 0 #161124',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>
              Além da Grade ✦
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#555', marginBottom: '20px', lineHeight: 1.5 }}>
              Ocorreu uma instabilidade ao inicializar os dados da interface. Clique no botão abaixo para restaurar e recarregar o diário.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                backgroundColor: '#eb3f8f',
                color: '#ffffff',
                border: '2px solid #161124',
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '2px 2px 0 #161124',
              }}
            >
              Restaurar e Recarregar Diário
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

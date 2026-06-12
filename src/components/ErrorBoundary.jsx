import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#060413] px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🦉</div>
            <h1 className="font-syne text-3xl text-white mb-4">
              Algo salió mal
            </h1>
            <p className="font-sans text-gray-400 mb-8">
              Ocurrió un error inesperado. Por favor, recarga la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-space text-sm text-noct-neon border border-noct-neon/30 px-6 py-3 rounded-lg hover:bg-noct-neon/10 transition-colors"
              >
                Recargar página
              </button>
              <details className="mt-6 text-left">
                <summary className="font-space text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                Detalles técnicos
              </summary>
              <pre className="mt-2 text-xs text-red-400/70 bg-black/30 p-3 rounded overflow-auto max-h-32">
                {this.state.error?.message}
              </pre>
            </details>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

import { useState, useEffect } from 'react';
import type { ApiResponse } from '@torre/shared';
import './App.css';

function App() {
  const [apiData, setApiData] = useState<ApiResponse<{ message: string }> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Failed to fetch from backend');
        }
        const data: ApiResponse<{ message: string }> = await response.json();
        setApiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏗️ Torre.ai Monorepo</h1>
        <p className="subtitle">Full-Stack NestJS + React + Shared Types</p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>📦 Shared Package Demo</h2>
          <p>
            This frontend uses the <code>ApiResponse&lt;T&gt;</code> interface from{' '}
            <code>@torre/shared</code> to type API responses.
          </p>
        </section>

        <section className="card">
          <h2>🔗 Backend Connection</h2>
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">❌ Error: {error}</p>}
          {apiData && (
            <div className="api-response">
              <p className="success">✅ Connected to backend!</p>
              <pre>{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          )}
        </section>

        <section className="card">
          <h2>🚀 Getting Started</h2>
          <ol>
            <li>
              Run <code>npm install</code> from the root directory
            </li>
            <li>
              Start backend: <code>npm run backend:dev</code>
            </li>
            <li>
              Start frontend: <code>npm run frontend:dev</code>
            </li>
          </ol>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ using npm workspaces</p>
      </footer>
    </div>
  );
}

export default App;

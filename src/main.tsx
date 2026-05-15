import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/global.css';
import App from '@/App';
import ErrorBoundary from '@/components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

try {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  console.error(error);
  rootElement.innerHTML = `
    <div style="padding:2rem;font-family:system-ui,sans-serif;max-width:420px;margin:4rem auto;text-align:center">
      <h1 style="font-size:1.25rem;margin-bottom:0.75rem">Failed to start</h1>
      <p style="color:#888;font-size:0.9rem;margin-bottom:1rem">
        The app could not load. Try clearing site data for localhost, then reload.
      </p>
      <button
        type="button"
        onclick="localStorage.removeItem('walitos-items');location.reload()"
        style="background:#fff;color:#000;border:none;border-radius:8px;padding:0.6rem 1.2rem;font-weight:600;cursor:pointer"
      >
        Reset saved items &amp; reload
      </button>
    </div>
  `;
}

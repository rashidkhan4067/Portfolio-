import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './app/App.jsx'
import './styles/global.css'
import { registerSW } from 'virtual:pwa-register'

// Auto-update service worker and reload page on new version activation
registerSW({
  immediate: true,
  onRegistered(r) {
    if (r) {
      // Periodic check for service worker updates (every 30 minutes)
      setInterval(() => {
        r.update();
      }, 30 * 60 * 1000);
    }
  }
});

let refreshing = false;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)

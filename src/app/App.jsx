import { useEffect } from 'react';
import { useThemeStore } from '../store';
import AppRouter from '../routes';
import PWAUpdateToast from '../components/PWAUpdateToast';

export default function App() {
  const { theme } = useThemeStore();

  // Apply theme attribute to document root for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <AppRouter />
      <PWAUpdateToast />
    </>
  );
}

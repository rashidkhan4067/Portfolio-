/**
 * PWAUpdateToast.jsx
 * Shows a small toast at the bottom of the screen when a new service
 * worker is waiting (i.e. a new version of the site is available).
 * The user can click "Refresh" to activate the new SW immediately.
 */
import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import styles from './PWAUpdateToast.module.css';

export default function PWAUpdateToast() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        // Check for updates every 60 minutes
        setInterval(() => r.update(), 60 * 60 * 1000);
      }
    },
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (needRefresh) setVisible(true);
  }, [needRefresh]);

  const close = () => {
    setNeedRefresh(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.toast} role="alert" aria-live="polite">
      <div className={styles.icon} aria-hidden="true">↑</div>
      <p className={styles.message}>
        A new version is available.
      </p>
      <div className={styles.actions}>
        <button className={styles.refreshBtn} onClick={() => updateServiceWorker(true)}>
          Refresh
        </button>
        <button className={styles.dismissBtn} onClick={close} aria-label="Dismiss update">
          ✕
        </button>
      </div>
    </div>
  );
}

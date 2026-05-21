import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <div className={styles.overlay} aria-label="Loading page" role="status">
      <div className={styles.logoMark}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
}

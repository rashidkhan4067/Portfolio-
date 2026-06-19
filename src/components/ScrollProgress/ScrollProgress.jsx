import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX: progress, transformOrigin: '0% 50%' }}
      aria-hidden="true"
    />
  );
}

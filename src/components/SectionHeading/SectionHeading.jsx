import { motion } from 'framer-motion';
import styles from './SectionHeading.module.css';
import { itemVariants } from '../SectionWrapper';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = '',
}) {
  return (
    <motion.div
      className={[styles.wrapper, centered && styles.centered, className]
        .filter(Boolean)
        .join(' ')}
      variants={itemVariants}
    >
      {eyebrow && (
        <span className={styles.eyebrow}>{eyebrow}</span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </motion.div>
  );
}

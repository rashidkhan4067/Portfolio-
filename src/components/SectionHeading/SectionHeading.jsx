import { motion } from 'framer-motion';
import styles from './SectionHeading.module.css';
import { itemVariants } from '../SectionWrapper';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = '',
  level = 2,
}) {
  const HeadingTag = level === 1 ? 'h1' : 'h2';

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
      <HeadingTag className={styles.title}>{title}</HeadingTag>
      {subtitle && (
        typeof subtitle === 'string' ? (
          <p className={styles.subtitle}>{subtitle}</p>
        ) : (
          <div className={styles.subtitle}>{subtitle}</div>
        )
      )}
    </motion.div>
  );
}

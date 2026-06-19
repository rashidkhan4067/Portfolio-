import { motion } from 'framer-motion';
import styles from './SectionWrapper.module.css';
import { containerVariants } from './SectionWrapper.variants';

export default function SectionWrapper({
  id,
  children,
  className = '',
  alt = false,
  centered = false,
}) {
  return (
    <motion.section
      id={id}
      className={[
        styles.section,
        alt && styles.alt,
        centered && styles.centered,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
}

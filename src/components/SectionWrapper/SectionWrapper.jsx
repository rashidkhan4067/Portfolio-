import { motion } from 'framer-motion';
import styles from './SectionWrapper.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

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

export { itemVariants, containerVariants };

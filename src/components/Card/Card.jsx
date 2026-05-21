import { motion } from 'framer-motion';
import styles from './Card.module.css';

export default function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  style,
  accentColor,
  ...props
}) {
  const cls = [
    styles.card,
    styles[variant] || styles.default,
    hover && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={cls}
      style={{
        '--card-accent': accentColor || 'var(--accent-primary)',
        ...style,
      }}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
};

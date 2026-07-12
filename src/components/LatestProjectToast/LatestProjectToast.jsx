import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import styles from './LatestProjectToast.module.css';

export default function LatestProjectToast() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the toast in this session
    const isDismissed = sessionStorage.getItem('bhutta_scents_toast_dismissed');
    if (isDismissed) return;

    // Show toast after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('bhutta_scents_toast_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.toastContainer}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Icon Badge */}
          <div className={styles.iconContainer}>
            <Sparkles size={14} aria-hidden="true" />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <span className={styles.title}>Bhutta Scents is now live!</span>
          </div>

          {/* Action Link */}
          <Link 
            to="/projects#bhuttascents" 
            className={styles.viewBtn}
            onClick={handleDismiss}
          >
            <span>View</span>
            <ArrowRight size={13} aria-hidden="true" style={{ marginLeft: '2px' }} />
          </Link>

          {/* Dismiss Button */}
          <button 
            onClick={handleDismiss} 
            className={styles.dismissBtn}
            aria-label="Dismiss notification"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

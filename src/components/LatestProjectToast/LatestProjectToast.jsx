import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import styles from './LatestProjectToast.module.css';
import bhuttaImageImg from '../../assets/image.png';

export default function LatestProjectToast() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the toast in this session
    const isDismissed = sessionStorage.getItem('bhutta_scents_toast_dismissed');
    if (isDismissed) return;

    // Show toast after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

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
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Thumbnail */}
          <div className={styles.thumbnailContainer}>
            <img 
              src={bhuttaImageImg} 
              alt="Bhutta Scents Preview" 
              className={styles.thumbnail}
            />
          </div>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.titleMeta}>
              <span className={styles.pill}>Latest Project</span>
            </div>
            <h4 className={styles.title}>Bhutta Scents</h4>
            <p className={styles.desc}>
              Real client luxury fragrance storefront is now live!
            </p>
            <div className={styles.actions}>
              <Link 
                to="/projects#bhuttascents" 
                className={styles.viewBtn}
                onClick={handleDismiss}
              >
                <span>View Details</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Dismiss Button */}
          <button 
            onClick={handleDismiss} 
            className={styles.dismissBtn}
            aria-label="Dismiss notification"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

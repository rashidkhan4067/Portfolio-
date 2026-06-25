import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Menu, X, Code2,
  Home, User2, FolderGit2, Sparkles, Briefcase, Mail, FileText 
} from 'lucide-react';
import { useThemeStore, useUIStore } from '../../store';
import { navLinks, personalInfo } from '../../constants/portfolioData';
import styles from './Navbar.module.css';

// Map nav paths to beautiful cohesive M3 Google Icons
const iconMap = {
  '/': Home,
  '/about': User2,
  '/projects': FolderGit2,
  '/skills': Sparkles,
  '/experience': Briefcase,
  '/contact': Mail
};

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [stdoutLog, setStdoutLog] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const triggerStdout = (message) => {
    setStdoutLog(message);
  };

  useEffect(() => {
    if (stdoutLog) {
      const timer = setTimeout(() => setStdoutLog(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [stdoutLog]);

  // Handle scrolled navbar consistency on scroll and route changes
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll(); // Re-evaluate immediately on mount/navigation
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location, setMobileMenuOpen]);

  // Global keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        triggerStdout('shortcut [C] -> navigating to contact');
        navigate('/contact');
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        triggerStdout('shortcut [R] -> opening resume');
        window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo} aria-label="Home">
          <span className={styles.logoIcon}>
            <Code2 size={20} aria-hidden="true" />
          </span>
          <span className={styles.logoText}>
            Rashid<span className={styles.logoDot}>.dev</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className={styles.links} role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                end={link.href === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Exposed Resume button on mobile viewports */}
          <a
            href={personalInfo.resumeUrl}
            className={styles.mobileResumeIconBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
            onClick={() => triggerStdout('opening resume')}
          >
            <FileText size={18} />
          </a>

          <a
            href={personalInfo.resumeUrl}
            className={styles.resumeBtn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
            onClick={() => triggerStdout('opening resume')}
          >
            Resume
          </a>

          {/* Hamburger */}
          <button
            className={styles.menuBtn}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-In Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.mobileMenuHeader}>
              <button
                className={styles.menuCloseBtn}
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <ul role="list" className={styles.mobileNavList}>
              {navLinks.map((link, i) => {
                const LinkIcon = iconMap[link.href] || Code2;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                      }
                      end={link.href === '/'}
                    >
                      <LinkIcon size={20} className={styles.mobileLinkIcon} aria-hidden="true" />
                      <span>{link.label}</span>
                    </NavLink>
                  </motion.li>
                );
              })}
            </ul>
            <div className={styles.mobileActions}>
              <a
                href={personalInfo.resumeUrl}
                className={styles.mobileResume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal stdout diagnostic toast */}
      <AnimatePresence>
        {stdoutLog && (
          <motion.div
            className={styles.stdoutToast}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <code>stdout: {stdoutLog}</code>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

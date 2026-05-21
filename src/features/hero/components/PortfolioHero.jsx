import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalInfo, stats } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import profileImg from '../../../assets/profile.png';

/**
 * PortfolioHero - Redesigned by Google UI standards.
 * Featuring interactive glassmorphic tech badges, custom live status indicators,
 * linear gradient brand typography, and smooth floating micro-animations.
 */
export default function PortfolioHero() {
  const displayStats = stats;

  const handleImageError = (e) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Dynamic Visual Ambient Glows */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlowLeft} aria-hidden="true" />

      <div className="container">
        <div className={styles.gridContainer}>
          
          {/* ── LEFT COLUMN (Main Copy & Content) ── */}
          <header className={styles.leftColumn}>
            {/* Google M3 Pulsing Live Status Pill */}
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              <span>Available for High-Impact Contracts & Roles</span>
            </div>

            {/* Muted tracking-widest eyebrow tag */}
            <span className={styles.eyebrow}>
              Systems Engineer & Full-Stack Developer
            </span>

            {/* Premium Typography Gradient Wash Title */}
            <h1 className={styles.headline}>
              Muhammad Rashid <span className={styles.gradientText}>Shafique</span>
            </h1>

            {/* Concise 2-line professional engineering bio with relaxed readability */}
            <p className={styles.description}>
              Specializing in robust backend APIs (Django, FastAPI, Node JS), native desktop GUIs (Tkinter, PySide), 
              and modern full-stack web applications (React JS, Tailwind CSS, Supabase) backed by distributed PySpark data analysis.
            </p>

            {/* Call-to-Actions (CTA) Row */}
            <div className={styles.ctaRow}>
              {/* Primary solid blue button with strict M3 pill shape & hover translation */}
              <Link 
                to="/projects" 
                className={styles.primaryButton}
                aria-label="View projects by Muhammad Rashid Shafique"
              >
                <span>View Projects</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              {/* Outline secondary button with mail icon */}
              <Link 
                to="/contact" 
                className={styles.secondaryButton}
                aria-label="Contact Muhammad Rashid Shafique"
              >
                <Mail size={18} aria-hidden="true" />
                <span>Contact Me</span>
              </Link>
            </div>
          </header>

          {/* ── RIGHT COLUMN (Visual Focal Point) ── */}
          <div className={styles.rightColumn}>
            {/* Floating Premium Profile Card with Tech Badges */}
            <div className={styles.profileCard}>
              
              {/* Interactive Floating Tech Badges */}
              <div className={`${styles.floatingBadge} ${styles.badgeTopLeft}`}>
                <span className={styles.badgeIcon}>⚡</span>
                <span>Django & FastAPI</span>
              </div>
              
              <div className={`${styles.floatingBadge} ${styles.badgeMiddleRight}`}>
                <span className={styles.badgeIcon}>📊</span>
                <span>PySpark & Streamlit</span>
              </div>
              
              <div className={`${styles.floatingBadge} ${styles.badgeBottomLeft}`}>
                <span className={styles.badgeIcon}>⚛️</span>
                <span>React & Tailwind</span>
              </div>

              {/* Isolated inner image container */}
              <div className={styles.imageContainer}>
                <img
                  src={profileImg}
                  alt={`${personalInfo.name} - Professional Portrait`}
                  className={styles.profileImage}
                  onError={handleImageError}
                  loading="eager"
                />
                
                {/* Visual Fallback Container (Initials) */}
                <div 
                  className={styles.fallbackContainer} 
                  style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}
                >
                  <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                    RS
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

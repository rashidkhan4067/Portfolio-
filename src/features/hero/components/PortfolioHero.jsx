import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import profileImg from '../../../assets/profile.webp';

/**
 * PortfolioHero - Redesigned by Google UI standards.
 * Featuring interactive glassmorphic tech badges, custom live status indicators,
 * linear gradient brand typography, and smooth floating micro-animations.
 */
export default function PortfolioHero() {

  const handleImageError = (e) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <section className={styles.hero} id="hero">
      <div className="container">
        <div className={styles.gridContainer}>

          {/* ── LEFT COLUMN (Main Copy & Content) ── */}
          <div className={styles.leftColumn}>
            {/* Sleek Mobile Avatar & Status Row */}
            <div className={styles.avatarStatusRow}>
              <div className={styles.avatarContainer}>
                <img
                  src={profileImg}
                  alt={`${personalInfo.name} - Professional Portrait`}
                  className={styles.avatarImage}
                  onError={handleImageError}
                />
              </div>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>Available for Opportunities</span>
              </div>
            </div>

            <span className={styles.eyebrow}>
              Systems Engineer & Full&#8209;Stack&nbsp;Developer
            </span>

            {/* Premium Typography Title */}
            <h1 className={styles.headline}>
              Muhammad Rashid Shafique
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
          </div>

          {/* ── RIGHT COLUMN (Visual Focal Point) ── */}
          <div className={`${styles.rightColumn} ${styles.desktopPhotoContainer}`}>
            {/* Desktop-only profile photo container */}
            <div className={styles.profileCard}>
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

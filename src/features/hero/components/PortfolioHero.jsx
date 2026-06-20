import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import profileLargeImg from '../../../assets/profile1.webp';

/**
 * PortfolioHero - Redesigned by Google UI standards.
 * Featuring a large responsive profile photo, structured tech panel grid,
 * and clear professional positioning.
 */
export default function PortfolioHero() {
  return (
    <section className={styles.hero} id="hero">
      <div className="container">
        <div className={styles.gridContainer}>

          {/* ── Group B: Right Column (Large profile photo) ── */}
          <div className={styles.rightColumn}>
            <div className={styles.profileCard}>
              <img
                src={profileLargeImg}
                alt="Muhammad Rashid Shafique — Backend-Focused Full-Stack Engineer"
                className={styles.profileImageLarge}
                loading="eager"
                width="380"
                height="475"
              />
            </div>
          </div>

          {/* ── Group A: Header (Pill, Positioning Line, Name, Tagline) ── */}
          <div className={styles.headerBlock}>
            {/* Status Row */}
            <div className={styles.avatarStatusRow}>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>Available for Opportunities</span>
              </div>
            </div>

            {/* Professional Positioning Line */}
            <span className={styles.positioningLine}>
              Backend-focused Full-Stack Engineer
            </span>

            {/* Premium Typography Title */}
            <h1 className={styles.headline}>
              Muhammad Rashid Shafique
            </h1>

            {/* Sharp and Modern Secondary Tagline */}
            <p className={styles.tagline}>
              Building scalable systems & modern web applications
            </p>
          </div>

          {/* ── Group C: Details Block (Bio, Tech Stack, CTAs) ── */}
          <div className={styles.detailsBlock}>
            {/* Structured and Visually Lighter Bio */}
            <p className={styles.description}>
              Applying rigorous systems design concepts to engineer low-latency backend applications, 
              automated pipeline scripts, and responsive human-centric interfaces.
            </p>

            {/* Recruiter-Friendly structured tech stack */}
            <div className={styles.techGrid}>
              <div className={styles.techCard}>
                <span className={styles.techLabel}>Backend</span>
                <span className={styles.techValue}>Django, FastAPI, Node.js</span>
                <span className={styles.techSubValue}>Also: Tkinter, PySide</span>
              </div>
              <div className={styles.techCard}>
                <span className={styles.techLabel}>Frontend</span>
                <span className={styles.techValue}>React, Tailwind CSS</span>
              </div>
              <div className={styles.techCard}>
                <span className={styles.techLabel}>Data Engineering</span>
                <span className={styles.techValue}>PySpark, SQL</span>
              </div>
            </div>

            {/* Call-to-Actions (CTA) Row */}
            <div className={styles.ctaRow}>
              <Link
                to="/projects"
                className={styles.primaryButton}
                aria-label="Explore projects by Muhammad Rashid Shafique"
              >
                <span>Explore My Work</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

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

        </div>
      </div>
    </section>
  );
}

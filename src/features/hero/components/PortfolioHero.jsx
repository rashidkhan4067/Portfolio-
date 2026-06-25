import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import profileLargeImg from '../../../assets/profile1.webp';
import { personalInfo } from '../../../constants/portfolioData';

// Thin SVG Icons for social links (Linear/Stripe aesthetic)
const GithubIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

/**
 * PortfolioHero - Redesigned by Google UI standards.
 * Featuring a large responsive profile photo, structured tech panel grid,
 * and clear professional positioning.
 */
export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <style dangerouslySetInnerHTML={{ __html: `
        .object-top {
          object-position: top center !important;
        }
        .pt-8 {
          padding-top: 2rem !important;
        }
        .pb-8 {
          padding-bottom: 2rem !important;
        }
        .items-center {
          align-items: center !important;
        }
        @media (max-width: 640px) {
          .pt-8 {
            padding-top: 1.5rem !important;
          }
        }
        /* ── MD3 Micro-animations ── */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        [class*="headerBlock"] {
          animation: fadeIn 400ms cubic-bezier(0.2, 0, 0, 1) forwards;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.9);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.9);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        [class*="statusDot"] {
          display: inline-block;
          animation: pulse 2s infinite ease-in-out;
          border-radius: 50%;
        }
        [class*="primaryButton"] svg {
          transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
        }
        [class*="primaryButton"]:hover svg {
          transform: translateX(4px);
        }
        [class*="primaryButton"],
        [class*="secondaryButton"] {
          transition: transform 150ms cubic-bezier(0.2, 0, 0, 1), background-color var(--transition-fast), border-color var(--transition-fast);
        }
        [class*="primaryButton"]:active,
        [class*="secondaryButton"]:active {
          transform: scale(0.98);
        }
      `}} />
      <div className="container">
        <div className={`${styles.gridContainer} items-center`}>

          {/* ── Group B: Right Column (Large profile photo) ── */}
          <div className={styles.rightColumn}>
            <div className={styles.profileCard}>
              <img
                src={profileLargeImg}
                alt="Muhammad Rashid Shafique — Backend-Focused Full-Stack Engineer"
                className={`${styles.profileImageLarge} object-top`}
                loading="eager"
                width="380"
                height="475"
                fetchpriority="high"
                style={{ objectPosition: 'top center' }}
              />
            </div>
          </div>

          {/* ── Group A & C: Header & Details (Pill, Positioning Line, Name, Tagline, Bio, CTAs) ── */}
          <div className={styles.headerBlock} style={{ gridRow: '1 / span 2' }}>
            {/* Status Row */}
            <div className={styles.avatarStatusRow}>
              <div className={styles.statusBadge}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className={styles.statusText}>Available for Opportunities</span>
              </div>
            </div>

            {/* Name as H1 */}
            <h1 className={`${styles.headline} text-[26px] md:text-[42px]`}>
              Muhammad Rashid Shafique
            </h1>

            {/* Title styled as H2 */}
            <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase mb-3">
              Backend-Focused Full-Stack Engineer
            </p>

            {/* Bio (concise outcome-driven description, 19 words) */}
            <p className={styles.description}>
              I engineer high-availability backend systems and performant web interfaces. Specializing in Python, Django, React, and SQL database design.
            </p>

            {/* Call-to-Actions (CTA) Row */}
            <div className={styles.ctaRow}>
              <Link
                to="/projects"
                className={styles.primaryButton}
                aria-label="Explore projects by Muhammad Rashid Shafique"
              >
                <span>Explore My Work</span>
                <ArrowRight size={18} className={styles.ctaIcon} aria-hidden="true" />
              </Link>

              <Link
                to="/contact"
                className={styles.secondaryButton}
                aria-label="Contact Muhammad Rashid Shafique"
              >
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social Links Row */}
            <div className={styles.socialRow}>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={personalInfo.socials.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter Profile"
              >
                <TwitterIcon size={18} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

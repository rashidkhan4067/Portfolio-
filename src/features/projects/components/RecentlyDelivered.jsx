import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import styles from '../recently-delivered.module.css';
import bhuttaScientsImg from '../../../assets/bhuttaScients.png';

export default function RecentlyDelivered() {
  const navigate = useNavigate();

  const handleCaseStudyClick = () => {
    navigate('/projects#bhuttascents');
    setTimeout(() => {
      const el = document.getElementById('bhuttascents');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className={styles.section} id="featured-launch">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>// LATEST CLIENT DELIVERY</span>
          <h2 className={styles.sectionTitle}>Recently Shipped Product</h2>
        </div>

        {/* Widescreen Showcase Card */}
        <div className={styles.showcaseCard}>
          {/* Editor Header Bar */}
          <div className={styles.editorHeader}>
            <div className={styles.tab}>
              <span className={styles.tabIcon} />
              <span>bhutta-scents.tsx</span>
            </div>
            <div className={styles.editorStatus}>
              <span className={styles.statusDot} />
              <span>Real Client (Alhamdullilah Satisfied)</span>
            </div>
          </div>

          <div className={styles.cardBody}>
            {/* Image Side */}
            <div className={styles.imageSide} onClick={handleCaseStudyClick}>
              <img 
                src={bhuttaScientsImg} 
                alt="Bhutta Scents Storefront" 
                className={styles.cardImage}
                loading="lazy"
              />
            </div>

            {/* Content Side */}
            <div className={styles.contentSide}>
              <h3 className={styles.projectTitle}>Bhutta Scents</h3>
              <p className={styles.tagline}>Luxury Fragrance & Scent Storefront</p>

              {/* Monospace Specs Block (Developer Coded Vibe) */}
              <div className={styles.specsBlock}>
                <div className={styles.specRow}>
                  <span className={styles.specKey}>client</span>
                  <span>=</span>
                  <span className={styles.specVal}>"Luxury Fragrance Brand"</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specKey}>status</span>
                  <span>=</span>
                  <span className={styles.specVal}>"Shipped (Jul 2026)"</span>
                </div>
                <div className={styles.specRow}>
                  <span className={styles.specKey}>service</span>
                  <span>=</span>
                  <span className={styles.specVal}>"Full Storefront & React Frontend"</span>
                </div>
              </div>

              <p className={styles.description}>
                Engineered a customized, highly performant React storefront for a premium fragrance brand. Focused on high-fidelity visual aesthetics (luxury typography, clean grids, and micro-animations) and optimized state management for a responsive shopping experience.
              </p>

              {/* Technical Stack Tags */}
              <div className={styles.techList}>
                <span className={styles.techItem}>react</span>
                <span className={styles.techItem}>vite</span>
                <span className={styles.techItem}>vanilla-css</span>
                <span className={styles.techItem}>state-management</span>
              </div>

              {/* CTA Buttons */}
              <div className={styles.ctaRow}>
                <a 
                  href="https://bhuttascents.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.primaryBtn}
                >
                  <span>Live Storefront</span>
                  <ExternalLink size={13} style={{ marginLeft: '4px' }} />
                </a>

                <button 
                  onClick={handleCaseStudyClick}
                  className={styles.secondaryBtn}
                >
                  <span>View Case Study</span>
                  <ArrowRight size={13} style={{ marginLeft: '4px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

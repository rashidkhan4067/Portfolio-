import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Code2 } from 'lucide-react';
import { buildLogs } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import SectionHeading from '../../../components/SectionHeading';

export default function BuildLogsTeaser() {
  // Extract the latest 2 build logs
  const latestLogs = buildLogs && buildLogs.length > 0 ? buildLogs.slice(0, 2) : [];

  if (latestLogs.length === 0) return null;

  return (
    <section className={styles.section} id="build-logs-teaser">
      <div className="container">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Highlighted Insights"
          title="Build Logs"
          subtitle="Engineering logs, experiments, and architectural insights from active builds."
          centered={true}
        />

        <div className={styles.teaserGrid}>
          {latestLogs.map((log) => (
            <article key={log.id} className={styles.card}>
              
              {/* Card Header matching Projects card layout */}
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <Terminal size={20} aria-hidden="true" />
                </div>
                <div className={styles.headerMeta}>
                  <span className={styles.categoryBadge}>
                    {log.type}
                  </span>
                  <span className={styles.metricBadge}>
                    {log.metric}
                  </span>
                </div>
                <span className={styles.date}>{log.date}</span>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  <Link to="/build-logs" className={styles.cardTitleLink}>
                    {log.title}
                  </Link>
                </h3>
                <p className={styles.cardDesc}>{log.excerpt}</p>
              </div>

              {/* Card Footer */}
              <div className={styles.cardFooter}>
                <div className={styles.techList}>
                  {log.tags.map((tag) => (
                    <div key={tag} className={styles.techItem}>
                      <Code2 size={12} className={styles.techIcon} aria-hidden="true" />
                      <span className={styles.techName}>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Premium Section CTA Button */}
        <div className={styles.ctaWrapper}>
          <Link to="/build-logs" className={styles.readMoreBtn}>
            <span>Open Journal</span>
            <ArrowRight size={16} className={styles.arrowIcon} aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}

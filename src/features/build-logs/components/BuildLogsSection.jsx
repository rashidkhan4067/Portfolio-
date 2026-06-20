import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, ArrowRight } from 'lucide-react';
import { buildLogs } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import SectionHeading from '../../../components/SectionHeading';
import Modal from '../../../components/Modal';

export default function BuildLogsSection() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const openLog = (log) => {
    setSelectedLog(log);
  };

  const closeLog = () => {
    setSelectedLog(null);
  };

  const categories = ['All', 'Data Engineering', 'Backend', 'IoT'];

  const filteredLogs = activeCategory === 'All'
    ? buildLogs
    : buildLogs.filter(log => log.tags.includes(activeCategory));

  return (
    <section className={styles.section} id="build-logs-section">
      <div className="container">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Development Journal"
          title="Build Logs"
          subtitle="A structured collection of low-latency optimization logs, system telemetry, and pipeline architectural write-ups."
          centered={true}
        />

        {/* Category Filter Selector pills */}
        <div className={styles.filterContainer} role="tablist" aria-label="Filter build logs by technology">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid Layout identical to Projects */}
        <div className={styles.logsGrid}>
          {filteredLogs.map((log) => (
            <article key={log.id} className={styles.card}>
              
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  <BookOpen size={20} aria-hidden="true" />
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
                  <button
                    onClick={() => openLog(log)}
                    className={styles.cardTitleButton}
                  >
                    {log.title}
                  </button>
                </h3>
                <p className={styles.cardDesc}>{log.excerpt}</p>
              </div>

              {/* Card Footer */}
              <div className={styles.cardFooter}>
                <div className={styles.techList}>
                  {log.tags.slice(0, 3).map((tag) => (
                    <div key={tag} className={styles.techItem}>
                      <Code2 size={12} className={styles.techIcon} aria-hidden="true" />
                      <span className={styles.techName}>{tag}</span>
                    </div>
                  ))}
                </div>
                
                {/* Outlined Action Trigger */}
                <button
                  onClick={() => openLog(log)}
                  className={styles.readMoreBtn}
                  style={{ minHeight: '32px', padding: '0.25rem 0.75rem', fontSize: '0.8rem', gap: '0.25rem' }}
                  aria-label={`Read full log: ${log.title}`}
                >
                  <span>Open Journal</span>
                  <ArrowRight size={12} className={styles.arrowIcon} aria-hidden="true" />
                </button>
              </div>

            </article>
          ))}
        </div>

        {/* Selected Log Content Modal */}
        <Modal
          isOpen={!!selectedLog}
          onClose={closeLog}
          title={selectedLog?.title || ''}
          size="lg"
        >
          {selectedLog && (
            <div>
              <div className={styles.modalMeta}>
                <span className={styles.modalDate}>{selectedLog.date}</span>
                <div className={styles.modalTags}>
                  {selectedLog.tags.map((tag) => (
                    <span key={tag} className={styles.modalTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.modalBody}>
                {selectedLog.content}
              </div>
            </div>
          )}
        </Modal>

      </div>
    </section>
  );
}

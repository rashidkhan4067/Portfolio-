import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { experience } from '../../../constants/portfolioData';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import styles from '../styles.module.css';

function ExperienceCard({ job }) {
  return (
    <motion.div variants={itemVariants}>
      <article className={styles.card}>
        {/* Top Row: Role + Company Left, Date + Badges Right */}
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <h3 className={styles.roleTitle}>{job.role}</h3>
            <a
              href={job.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.companyLink}
            >
              {job.company} <ExternalLink size={11} />
            </a>
          </div>
          <div className={styles.rightCol}>
            <span className={styles.dateRange}>{job.period}</span>
            {job.location && <span className={styles.location}>{job.location}</span>}
            <span className={styles.categoryBadge}>{job.type}</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Description */}
        <p className={styles.description}>{job.description}</p>

        {/* Bullet Highlights */}
        <ul className={styles.bulletList}>
          {job.highlights.map((h, i) => (
            <li key={i} className={styles.bulletItem}>
              <span className={styles.bulletIndicator} />
              <span className={styles.bulletText}>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech Chips */}
        <div className={styles.techChips}>
          {job.techStack.map((tech) => (
            <span key={tech} className={styles.techChip}>
              {tech}
            </span>
          ))}
        </div>
      </article>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      {/* Section Header */}
      <div className={styles.headerContainer}>
        <span className={styles.eyebrow}>WORK HISTORY</span>
        <h1 className={styles.title}>Professional Experience</h1>
        <p className={styles.subtitle}>
          3+ years engineering scalable systems, database optimization, and high-throughput data pipelines.
        </p>
      </div>

      {/* Timeline Cards Container */}
      <div className={styles.timeline}>
        {experience.map((job) => (
          <ExperienceCard key={job.id} job={job} />
        ))}
      </div>
    </SectionWrapper>
  );
}

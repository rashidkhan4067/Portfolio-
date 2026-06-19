import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Clock } from 'lucide-react';
import { experience } from '../../../constants/portfolioData';
import SectionWrapper, { itemVariants } from '../../../components/SectionWrapper';
import SectionHeading from '../../../components/SectionHeading';
import styles from '../styles.module.css';

function ExperienceCard({ job, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`${styles.expCard} ${isEven ? styles.expLeft : styles.expRight}`}
      variants={itemVariants}
    >
      {/* Timeline node */}
      <div className={styles.expNode}>
        <div className={styles.expDot} />
      </div>

      {/* Card */}
      <div className={styles.expContent}>
        <div className={styles.expHeader}>
          <div>
            <h3 className={styles.expRole}>{job.role}</h3>
            <a
              href={job.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.expCompany}
            >
              {job.company} <ExternalLink size={12} />
            </a>
          </div>
          <div className={styles.expMeta}>
            <span className={styles.expPeriod}>
              <Clock size={12} /> {job.period}
            </span>
            <span className={styles.expLocation}>
              <MapPin size={12} /> {job.location}
            </span>
            <span className={styles.expTypeBadge}>{job.type}</span>
          </div>
        </div>

        <p className={styles.expDesc}>{job.description}</p>

        <ul className={styles.highlights}>
          {job.highlights.map((h, i) => (
            <li key={i} className={styles.highlightItem}>
              <span className={styles.bulletDot} />
              {h}
            </li>
          ))}
        </ul>

        <div className={styles.expTech}>
          {job.techStack.map((tech) => (
            <span key={tech} className={styles.expTechTag}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        eyebrow="Work History"
        title="Professional Experience"
        subtitle="3+ years engineering scalable systems, database optimization, and high-throughput data pipelines."
        centered
      />
      <div className={styles.timeline}>
        <div className={styles.timelineAxis} />
        {experience.map((job, i) => (
          <ExperienceCard key={job.id} job={job} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

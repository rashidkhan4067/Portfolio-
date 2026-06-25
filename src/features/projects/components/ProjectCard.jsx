import { ExternalLink, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GithubIcon as Github } from '../../../components/SocialIcons';
import styles from '../styles.module.css';

const getProjectSlug = (project) => {
  if (project.repoName) return project.repoName.toLowerCase();
  if (project.githubUrl) {
    const parts = project.githubUrl.split('/');
    return parts[parts.length - 1].toLowerCase();
  }
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const stripEmojis = (text) => {
  if (!text) return '';
  return text
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/gu, '') // Strips high-surrogate emojis
    .replace(/[\u2600-\u27BF]/g, '')             // Strips standard symbols/emojis
    .replace(/\s+/g, ' ')                        // Normalize whitespace
    .trim();
};

export default function ProjectCard({ project, onClick }) {
  const slug = getProjectSlug(project);
  
  // Enforce maximum of 6 tech stack chips per card
  const slicedTechStack = project.techStack ? project.techStack.slice(0, 6) : [];

  return (
    <article 
      className={styles.projectCard}
      onClick={(e) => onClick && onClick(e, project)}
      style={{ cursor: 'pointer' }}
    >
      {/* 16:9 Image or Fallback */}
      <div className={styles.cardImageContainer}>
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={`${project.title} Preview`} 
            className={styles.cardImage} 
            loading="lazy"
            width="380"
            height="214"
          />
        ) : (
          <div className={styles.cardImageFallback}>
            <Folder size={24} className={styles.fallbackIcon} />
          </div>
        )}
      </div>

      {/* Card Info and Meta */}
      <div className={styles.cardContent}>
        {/* Row 1 — badge */}
        <div className={styles.cardHeaderMeta}>
          <span className={styles.categoryBadge}>
            {project.category || 'Software'}
          </span>
        </div>

        {/* Row 2 — project title */}
        <h3 className={styles.projectTitle}>
          <Link 
            to={`/projects#${slug}`}
            className={styles.projectTitleLink}
          >
            {project.title}
          </Link>
        </h3>
        
        {/* Row 3 — description */}
        <p className={styles.projectDesc}>
          {stripEmojis(project.description)}
        </p>

        {/* Row 4 — tech stack chips */}
        <div className={styles.techList}>
          {slicedTechStack.map((tech) => (
            <div key={tech} className={styles.techItem}>
              <span className={styles.techName}>{tech}</span>
            </div>
          ))}
        </div>

        {/* Row 5 — action buttons */}
        <div className={styles.cardActions}>
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.liveButton}
          >
            <ExternalLink size={14} aria-hidden="true" />
            <span>Live Demo</span>
          </a>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubButton}
          >
            <Github size={14} aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </article>
  );
}

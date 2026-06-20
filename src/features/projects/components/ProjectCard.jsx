
import { ExternalLink, Code2, Folder } from 'lucide-react';
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
  
  return (
    <article 
      className={styles.projectCard}
      style={{ '--projects-accent': project.accentColor || '#1A73E8', cursor: 'pointer' }}
      onClick={(e) => onClick && onClick(e, project)}
    >
      {/* 16:9 Image or Fallback Gradient */}
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
          <div 
            className={styles.cardImageFallback}
            style={{ 
              background: `linear-gradient(135deg, ${(project.accentColor || '#1A73E8')}22 0%, ${(project.accentColor || '#1A73E8')}44 100%)` 
            }}
          >
            <Folder size={32} className={styles.fallbackIcon} style={{ color: project.accentColor || '#1A73E8' }} />
            <div className={styles.fallbackPattern}>
              <code>{`{ prj: "${slug}" }`}</code>
            </div>
          </div>
        )}
      </div>

      {/* Card Info and Meta */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeaderMeta}>
          <span className={styles.categoryBadge}>
            {project.category || 'Software'}
          </span>
        </div>

        <h3 className={styles.projectTitle}>
          <Link 
            to={`/projects#${slug}`}
            className={styles.projectTitleLink}
          >
            {project.title}
          </Link>
        </h3>
        
        <p className={styles.projectDesc}>
          {stripEmojis(project.description)}
        </p>

        {/* Tech Stack Badges */}
        <div className={styles.techList}>
          {project.techStack && project.techStack.slice(0, 3).map((tech) => (
            <div key={tech} className={styles.techItem}>
              <Code2 size={10} className={styles.techIcon} aria-hidden="true" />
              <span className={styles.techName}>{tech}</span>
            </div>
          ))}
          {project.techStack && project.techStack.length > 3 && (
            <span className={styles.techMoreCount}>
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Re-designed interactive Buttons at the bottom */}
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
    </article>
  );
}

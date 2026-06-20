import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Brain, 
  Layers, 
  Globe, 
  Terminal, 
  Code2, 
  Folder,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GithubIcon as Github } from '../../../components/SocialIcons';
import { projects } from '../../../constants/portfolioData';
import styles from '../detailed-styles.module.css';
import SectionHeading from '../../../components/SectionHeading';

const getProjectSlug = (project) => {
  if (project.repoName) return project.repoName.toLowerCase();
  if (project.githubUrl) {
    const parts = project.githubUrl.split('/');
    return parts[parts.length - 1].toLowerCase();
  }
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

// Map project categories to cohesive M3 monochromatic icons
const categoryIconMap = {
  'AI / ML': Brain,
  'Full-Stack': Layers,
  'Open Source': Globe,
  'Backend': Terminal
};

const stripEmojis = (text) => {
  if (!text) return '';
  return text
    .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/gu, '') // Strips high-surrogate emojis
    .replace(/[\u2600-\u27BF]/g, '')             // Strips standard symbols/emojis
    .replace(/\s+/g, ' ')                        // Normalize whitespace
    .trim();
};

const repoTitleOverrides = {
  'rashidkhan4067': 'Sales Data Pipeline',
  'sales-data-analysis-system': 'Sales Data Pipeline',
  'medicare / hospital management': 'MediCare / Hospital Management',
  'medicare': 'MediCare / Hospital Management',
  'hospital-management-system': 'Hospital Management System',
  'algoviz-pro': 'AlgoViz Pro',
  'face-recognition-attendance-system': 'Face Recognition Attendance System',
  'taleempro': 'TaleemPro',
  'venturetwist': 'VentureTwist',
  'rescue_project-': 'Rescue Project',
  'foody-app': 'Foody App',
  'ai-hms': 'AI-HMS'
};

const formatProjectTitle = (name) => {
  if (!name) return '';
  const key = name.toLowerCase().trim();
  if (repoTitleOverrides[key]) {
    return repoTitleOverrides[key];
  }
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
};

const CACHE_KEY = 'github_repos_cache_v6';
const CACHE_TIME_KEY = 'github_repos_cache_time_v6';
const ONE_HOUR = 60 * 60 * 1000;

function ProjectVisualPlaceholder({ project }) {
  const isML = project.category === 'AI / ML';
  const isBackend = project.category === 'Backend';
  
  return (
    <div className={styles.placeholderContainer}>
      <svg className={styles.placeholderSvg} viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" rx="6" />
        
        {isML && (
          <>
            <rect x="30" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="75" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Data Ingest</text>
            
            <path d="M 120 90 L 150 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            <rect x="155" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="200" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ML Predictor</text>
            
            <path d="M 245 90 L 275 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            <rect x="280" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="325" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Plotly UI</text>
          </>
        )}
        
        {isBackend && (
          <>
            <rect x="30" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="75" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Client API</text>
            
            <path d="M 120 90 L 150 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            <rect x="155" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="200" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Auth Token</text>
            
            <path d="M 245 90 L 275 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            <rect x="280" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="325" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Postgres DB</text>
          </>
        )}
        
        {!isML && !isBackend && (
          <>
            <rect x="30" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="75" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">React SPA</text>
            
            <path d="M 120 90 L 150 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            <rect x="155" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="200" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Node Server</text>
            
            <path d="M 245 90 L 275 90" stroke="var(--projects-accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            <rect x="280" y="65" width="90" height="50" rx="6" fill="var(--bg-tertiary)" stroke="var(--projects-accent)" strokeWidth="1.5" />
            <text x="325" y="95" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Store Data</text>
          </>
        )}
        
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--projects-accent)" />
          </marker>
        </defs>
      </svg>
      <span className={styles.placeholderText}>{project.title} Architecture</span>
    </div>
  );
}

export default function DetailedProjects() {
  const [showAll, setShowAll] = useState(() => {
    return !!window.location.hash;
  });
  const [projectList, setProjectList] = useState(() => {
    try {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
        return JSON.parse(cachedData);
      }
    } catch (e) {
      console.warn('Failed to parse projects cache on init:', e);
    }
    return projects;
  });
  const [loading, setLoading] = useState(() => {
    try {
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
      if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
        return false;
      }
    } catch {
      // Return true if cache retrieval fails
    }
    return true;
  });

  useEffect(() => {
    async function fetchGithubRepos() {
      try {
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
          return;
        }

        const response = await fetch('https://api.github.com/users/rashidkhan4067/repos?sort=updated&per_page=30');
        if (!response.ok) throw new Error('API fetch failed');
        const repos = await response.json();
        
        const mappedProjects = repos
          .filter(repo => !repo.fork && repo.name.toLowerCase() !== 'rashidkhan4067' && repo.name.toLowerCase() !== 'portfolio-')
          .map((repo, index) => {
            let category = 'Open Source';
            let accentColor = '#7C3AED';
            
            const desc = (repo.description || '').toLowerCase();
            const topics = repo.topics || [];
            
            if (topics.includes('machine-learning') || topics.includes('ai') || desc.includes('face') || desc.includes('opencv') || desc.includes('pyspark') || desc.includes('predictive') || desc.includes('ml')) {
              category = 'AI / ML';
              accentColor = '#1A73E8';
            } else if (topics.includes('fullstack') || topics.includes('frontend') || desc.includes('react') || desc.includes('next') || desc.includes('dashboard')) {
              category = 'Full-Stack';
              accentColor = '#34A853';
            } else if (topics.includes('backend') || desc.includes('api') || desc.includes('backend') || desc.includes('django') || desc.includes('fastapi')) {
              category = 'Backend';
              accentColor = '#EA4335';
            }

            const techStack = [];
            if (repo.language) techStack.push(repo.language);
            topics.slice(0, 3).forEach(t => {
              const formattedTopic = t.charAt(0).toUpperCase() + t.slice(1);
              if (!techStack.includes(formattedTopic)) {
                techStack.push(formattedTopic);
              }
            });
            if (techStack.length === 0) techStack.push('Software');

            return {
              id: repo.id || index,
              repoName: repo.name,
              title: formatProjectTitle(repo.name),
              description: repo.description || 'A highly performant, automated software repository deployed with modern engineering workflows.',
              techStack: techStack,
              category: category,
              liveUrl: repo.homepage || repo.html_url,
              githubUrl: repo.html_url,
              accentColor: accentColor
            };
          });

        if (mappedProjects.length > 0) {
          const mergedProjects = mappedProjects.map(apiProj => {
            const matchedStatic = projects.find(p => 
              p.title.toLowerCase() === apiProj.repoName.toLowerCase() || 
              (p.githubUrl && p.githubUrl.toLowerCase().includes(apiProj.repoName.toLowerCase()))
            );
            if (matchedStatic) {
              return {
                ...apiProj,
                ...matchedStatic,
                title: matchedStatic.title === 'Sales-Data-Analysis-System' ? 'Sales Data Pipeline' : matchedStatic.title,
                techStack: Array.from(new Set([...matchedStatic.techStack, ...apiProj.techStack]))
              };
            }
            return apiProj;
          });
          setProjectList(mergedProjects);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(mergedProjects));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        }
      } catch (error) {
        console.warn('GitHub API rate limit or error, falling back to cached static data:', error);
        const expiredCache = sessionStorage.getItem(CACHE_KEY);
        if (expiredCache) {
          setProjectList(JSON.parse(expiredCache));
        } else {
          setProjectList(projects);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGithubRepos();
  }, []);
  
  useEffect(() => {
    if (!loading && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      if (targetId) {
        const timer = setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add(styles.highlightedCard);
            const clearTimer = setTimeout(() => {
              element.classList.remove(styles.highlightedCard);
            }, 2500);
            return () => clearTimeout(clearTimer);
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, projectList]);

  const displayedProjects = showAll ? projectList : projectList.slice(0, 3);
  const skeletonCards = Array.from({ length: 3 });

  return (
    <section className={styles.section} id="featured-projects">
      <div className="container">
        
        <SectionHeading
          eyebrow="Technical Portfolio"
          title="Featured Projects"
          subtitle="A structured repository of systems, custom automations, and predictive algorithms."
          centered={true}
        />

        <div className={styles.projectsGrid}>
          {loading ? (
            skeletonCards.map((_, index) => (
              <article 
                key={`project-skeleton-${index}`} 
                className={`${styles.projectCard} ${styles.skeletonCard}`}
                style={{ pointerEvents: 'none' }}
              >
                <div className={`${styles.visualSide} skeleton`} style={{ height: '220px' }} />
                <div className={styles.textSide}>
                  <div className={styles.cardHeader}>
                    <div className="skeleton" style={{ width: '40%', height: '24px', borderRadius: '4px' }} />
                  </div>
                  <div className="skeleton" style={{ width: '85%', height: '16px', borderRadius: '4px', marginTop: '0.5rem' }} />
                  <div className="skeleton" style={{ width: '60%', height: '16px', borderRadius: '4px', marginTop: '0.5rem' }} />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <div className="skeleton" style={{ width: '80px', height: '32px', borderRadius: '6px' }} />
                    <div className="skeleton" style={{ width: '80px', height: '32px', borderRadius: '6px' }} />
                  </div>
                </div>
              </article>
            ))
          ) : (
            displayedProjects.map((project) => {
              const hasImage = !!project.imageUrl;
              const taglineText = project.tagline || stripEmojis(project.description);
              const statusText = project.status || 'Completed';
              const problemRoleText = project.problemRole || 'A highly performant open-source software repository engineered and deployed with standard software developer operations.';
              const challengesList = project.challenges || [
                'Configured clean directory architectures and modular source file structures.',
                'Maintained robust version histories and standard git tags.'
              ];
              const outcomeText = project.outcome || 'Fully open-source code repository published on GitHub.';
              
              return (
                <article 
                  key={project.id} 
                  id={getProjectSlug(project)}
                  className={styles.projectCard}
                  style={{ '--projects-accent': project.accentColor }}
                >
                  <div className={styles.visualSide}>
                    {hasImage ? (
                      <img 
                        src={project.imageUrl} 
                        alt={`${project.title} Preview`} 
                        className={styles.cardImage} 
                        loading="lazy"
                      />
                    ) : (
                      <ProjectVisualPlaceholder project={project} />
                    )}
                  </div>

                  <div className={styles.textSide}>
                    <div className={styles.cardHeader}>
                      <div className={styles.titleArea}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <span className={styles.categoryBadge}>{project.category}</span>
                        <span className={styles.statusBadge}>
                          <span 
                            className={styles.statusDot} 
                            style={{ backgroundColor: statusText === 'In Development' ? '#FBBC05' : '#34A853' }} 
                          />
                          {statusText}
                        </span>
                      </div>
                    </div>

                    <p className={styles.tagline}>{taglineText}</p>

                    <div className={styles.subSection}>
                      <span className={styles.subSectionTitle}>Problem & Role</span>
                      <p className={styles.problemRole}>{problemRoleText}</p>
                    </div>

                    <div className={styles.subSection}>
                      <span className={styles.subSectionTitle}>Tech Stack</span>
                      <div className={styles.techList}>
                        {project.techStack.map((tech) => (
                          <div key={tech} className={styles.techItem}>
                            <Code2 size={12} className={styles.techIcon} aria-hidden="true" />
                            <span className={styles.techName}>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.subSection}>
                      <span className={styles.subSectionTitle}>Key Challenges & Decisions</span>
                      <ul className={styles.challengesList}>
                        {challengesList.map((challenge, idx) => (
                          <li key={idx} className={styles.challengeItem}>
                            <span className={styles.bulletDot} />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.outcomeBox}>
                      <p className={styles.outcomeText}>{outcomeText}</p>
                    </div>

                    <div className={styles.actionsRow}>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.primaryAction}
                      >
                        View Live
                      </a>
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.secondaryAction}
                      >
                        <Github size={14} aria-hidden="true" />
                        View Code
                      </a>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className={styles.toggleWrapper}>
          <button 
            className={styles.exploreToggle}
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
            aria-controls="featured-projects"
          >
            <span>{showAll ? 'Show Fewer Projects' : 'Explore All Projects'}</span>
            {showAll ? (
              <ChevronUp size={16} className={styles.toggleIcon} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} className={styles.toggleIcon} aria-hidden="true" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
}

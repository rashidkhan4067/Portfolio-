import { useState, useRef, useEffect } from 'react';
import { 
  ExternalLink, 
  Brain, 
  Layers, 
  Globe, 
  Terminal, 
  Code2, 
  Folder,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { GithubIcon as Github } from '../../../components/SocialIcons';
import { projects } from '../../../constants/portfolioData';
import styles from '../styles.module.css';
import SectionHeading from '../../../components/SectionHeading';

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

export default function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchGithubRepos() {
      try {
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime && (Date.now() - Number(cachedTime) < ONE_HOUR)) {
          // Already initialized by state lazy initializers
          return;
        }

        const response = await fetch('https://api.github.com/users/rashidkhan4067/repos?sort=updated&per_page=30');
        if (!response.ok) throw new Error('API fetch failed');
        const repos = await response.json();
        
        // Map GitHub repositories to our detailed Material 3 schema
        const mappedProjects = repos
          .filter(repo => !repo.fork && repo.name.toLowerCase() !== 'rashidkhan4067' && repo.name.toLowerCase() !== 'portfolio-') // Exclude forks and non-project repos
          .map((repo, index) => {
            // Intelligent Category Assignment
            let category = 'Open Source';
            let accentColor = '#7C3AED'; // Deep Violet default
            
            const desc = (repo.description || '').toLowerCase();
            const topics = repo.topics || [];
            
            if (topics.includes('machine-learning') || topics.includes('ai') || desc.includes('face') || desc.includes('opencv') || desc.includes('pyspark') || desc.includes('predictive') || desc.includes('ml')) {
              category = 'AI / ML';
              accentColor = '#1A73E8'; // Google Blue
            } else if (topics.includes('fullstack') || topics.includes('frontend') || desc.includes('react') || desc.includes('next') || desc.includes('dashboard')) {
              category = 'Full-Stack';
              accentColor = '#34A853'; // Google Green
            } else if (topics.includes('backend') || desc.includes('api') || desc.includes('backend') || desc.includes('django') || desc.includes('fastapi')) {
              category = 'Backend';
              accentColor = '#EA4335'; // Google Red
            }

            // Tech Stack construction (main language + topics or dependencies)
            const techStack = [];
            if (repo.language) techStack.push(repo.language);
            topics.slice(0, 3).forEach(t => {
              const formattedTopic = t.charAt(0).toUpperCase() + t.slice(1);
              if (!techStack.includes(formattedTopic)) {
                techStack.push(formattedTopic);
              }
            });
            // Safe fallbacks if no stack found
            if (techStack.length === 0) techStack.push('Software');

            return {
              id: repo.id || index,
              repoName: repo.name, // Keep raw repo name for matching
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
          // Merge static projects with API projects to preserve descriptions/accent colors if names match!
          const mergedProjects = mappedProjects.map(apiProj => {
            const matchedStatic = projects.find(p => 
              p.title.toLowerCase() === apiProj.repoName.toLowerCase() || 
              (p.githubUrl && p.githubUrl.toLowerCase().includes(apiProj.repoName.toLowerCase()))
            );
            if (matchedStatic) {
              return {
                ...apiProj,
                title: matchedStatic.title === 'Sales-Data-Analysis-System' ? 'Sales Data Pipeline' : formatProjectTitle(matchedStatic.title),
                description: matchedStatic.description,
                category: matchedStatic.category,
                accentColor: matchedStatic.accentColor,
                imageUrl: matchedStatic.imageUrl,
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

  // By default, show the top 3 highly featured projects. Expand to show all.
  const displayedProjects = showAll ? projectList : projectList.slice(0, 3);

  // Set active slide index using Intersection Observer
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || loading) return;

    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = Array.from(container.children);
          const index = cards.indexOf(entry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: container,
      threshold: 0.6,
    });

    const cards = Array.from(container.children);
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [displayedProjects, loading]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild;
      if (firstCard) {
        const scrollAmount = firstCard.getBoundingClientRect().width + 16;
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const skeletonCards = Array.from({ length: 3 });

  return (
    <section className={styles.section} id="featured-projects">
      <div className="container">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Technical Portfolio"
          title="Featured Projects"
          subtitle="A structured repository of systems, custom automations, and predictive algorithms."
          centered={true}
        />

        {/* Modern Slider Component Grid with horizontal swipe and scroll Ref */}
        <div 
          className={styles.projectsGrid} 
          ref={scrollContainerRef}
        >
          {loading ? (
            skeletonCards.map((_, index) => (
              <article 
                key={`project-skeleton-${index}`} 
                className={`${styles.projectCard} ${styles.skeletonCard}`}
              >
                <div className={`${styles.skeletonImage} skeleton`} />
                <div className={styles.cardHeader}>
                  <div className={`${styles.skeletonIcon} skeleton`} />
                  <div className={styles.headerMeta}>
                    <div className={`${styles.skeletonBadge} skeleton`} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={`${styles.skeletonTitle} skeleton`} />
                  <div className={`${styles.skeletonDescLine1} skeleton`} />
                  <div className={`${styles.skeletonDescLine2} skeleton`} />
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.techList}>
                    <div className={`${styles.skeletonTech} skeleton`} />
                    <div className={`${styles.skeletonTech} skeleton`} />
                  </div>
                </div>
              </article>
            ))
          ) : (
            displayedProjects.map((project) => {
              const ProjectIcon = categoryIconMap[project.category] || Folder;

              return (
                <article 
                  key={project.id} 
                  className={styles.projectCard}
                  style={{ '--projects-accent': project.accentColor }}
                >
                  {project.imageUrl && (
                    <div className={styles.cardImageContainer}>
                      <img 
                        src={project.imageUrl} 
                        alt={`${project.title} Preview`} 
                        className={styles.cardImage} 
                        loading="lazy"
                      />
                    </div>
                  )}
                  {/* M3 Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.iconContainer}>
                      <ProjectIcon size={20} aria-hidden="true" />
                    </div>
                    <div className={styles.headerMeta}>
                      <span className={styles.categoryBadge}>
                        {project.category}
                      </span>
                    </div>
                    {/* Anchor CTA icons */}
                    <div className={styles.headerLinks}>
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label={`${project.title} GitHub Source`}
                      >
                        <Github size={16} aria-hidden="true" />
                      </a>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label={`${project.title} Live Demo`}
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Card Title & Core Description */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.projectTitle}>
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.projectTitleLink}
                      >
                        {project.title}
                      </a>
                    </h3>
                    <p className={styles.projectDesc}>
                      {stripEmojis(project.description)}
                    </p>
                  </div>

                  {/* Compact Tech Badges List */}
                  <div className={styles.cardFooter}>
                    <div className={styles.techList}>
                      {project.techStack.slice(0, 3).map((tech) => (
                        <div key={tech} className={styles.techItem}>
                          <Code2 size={12} className={styles.techIcon} aria-hidden="true" />
                          <span className={styles.techName}>{tech}</span>
                        </div>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className={styles.techMoreCount}>
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                </article>
              );
            })
          )}
        </div>

        {/* ── ULTIMATE M3 CAROUSEL PAGINATION & CONTROLS (Ergonomic Footer Alignment) ── */}
        <div className={styles.carouselPagination} role="group" aria-label="Project slider navigation">
          
          {/* Previous Button */}
          <button 
            onClick={() => handleScroll('left')} 
            className={styles.paginationArrow}
            disabled={activeIndex === 0}
            aria-label="Scroll left to previous project"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          
          {/* Interactive Slide Dots or Numeric Counter */}
          {displayedProjects.length > 6 ? (
            <div className={styles.paginationCounter} aria-live="polite">
              {activeIndex + 1} / {displayedProjects.length}
            </div>
          ) : (
            <div className={styles.paginationDots} aria-label="Slides active status">
              {displayedProjects.map((_, index) => (
                <button 
                  key={index} 
                  className={`${styles.paginationDot} ${activeIndex === index ? styles.activeDot : ''}`}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const container = scrollContainerRef.current;
                      const firstCard = container.firstElementChild;
                      if (firstCard) {
                        const scrollAmount = (firstCard.getBoundingClientRect().width + 16) * index;
                        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                      }
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeIndex === index ? 'true' : 'false'}
                />
              ))}
            </div>
          )}

          {/* Next Button */}
          <button 
            onClick={() => handleScroll('right')} 
            className={styles.paginationArrow}
            disabled={activeIndex === displayedProjects.length - 1}
            aria-label="Scroll right to next project"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Elegant Dynamic Explore Trigger */}
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

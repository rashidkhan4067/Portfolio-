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

export default function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projectList, setProjectList] = useState(projects);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchGithubRepos() {
      try {
        const response = await fetch('https://api.github.com/users/rashidkhan4067/repos?sort=updated&per_page=30');
        if (!response.ok) throw new Error('API fetch failed');
        const repos = await response.json();
        
        // Map GitHub repositories to our detailed Material 3 schema
        const mappedProjects = repos
          .filter(repo => !repo.fork) // Exclude forks
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
              title: repo.name,
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
            const matchedStatic = projects.find(p => p.title.toLowerCase() === apiProj.title.toLowerCase() || (p.githubUrl && p.githubUrl.toLowerCase().includes(apiProj.title.toLowerCase())));
            if (matchedStatic) {
              return {
                ...apiProj,
                description: matchedStatic.description,
                category: matchedStatic.category,
                accentColor: matchedStatic.accentColor,
                techStack: Array.from(new Set([...matchedStatic.techStack, ...apiProj.techStack]))
              };
            }
            return apiProj;
          });
          setProjectList(mergedProjects);
        }
      } catch (error) {
        console.warn('GitHub API rate limit or error, falling back to cached static data:', error);
        setProjectList(projects);
      }
    }
    fetchGithubRepos();
  }, []);

  // By default, show the top 3 highly featured projects. Expand to show all.
  const displayedProjects = showAll ? projectList : projectList.slice(0, 3);

  // Handle active slide index on native scroll swipes or arrow clicks
  const handleScrollEvent = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const firstCard = container.firstElementChild;
      if (firstCard) {
        // Measure real card width dynamically to support peek percentages (e.g. 85% width) + gap
        const cardWidth = firstCard.getBoundingClientRect().width + 16;
        if (cardWidth > 0) {
          const index = Math.round(scrollPosition / cardWidth);
          // Ensure index stays in valid range
          setActiveIndex(Math.max(0, Math.min(index, displayedProjects.length - 1)));
        }
      }
    }
  };

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

  return (
    <section className={styles.section} id="featured-projects">
      {/* Subtle Background Glow mirroring Skills Section */}
      <div className={styles.ambientGlow} aria-hidden="true" />

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
          onScroll={handleScrollEvent}
        >
          {displayedProjects.map((project) => {
            const ProjectIcon = categoryIconMap[project.category] || Folder;

            return (
              <article 
                key={project.id} 
                className={styles.projectCard}
                style={{ 
                  '--accent-color': project.accentColor || '#1A73E8',
                  '--accent-color-glow': `${project.accentColor || '#1A73E8'}1C`
                }}
              >
                {/* Premium Category Accent Top Border Line */}
                <div className={styles.cardAccentBar} />

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
                    {project.description}
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
          })}
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
          
          {/* Interactive Slide Dots */}
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

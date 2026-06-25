import { useState } from 'react';
import {
  FileCode2,
  Cpu,
  Coffee,
  Globe,
  Server,
  Zap,
  Box,
  Layers,
  Atom,
  Paintbrush,
  Flame,
  Component,
  Database,
  KeyRound,
  ShieldCheck,
  MemoryStick,
  Triangle,
  Train,
  GitBranch,
  Container,
  Sparkles
} from 'lucide-react';
import styles from '../styles.module.css';

const SKILLS = [
  {
    category: "Languages & Systems",
    filter: "languages",
    items: [
      { name: "Python", desc: "Object-oriented scripting & high-performance core", tag: "Core", icon: "FileCode2" },
      { name: "C++", desc: "High-performance systems & compiled algorithms", tag: "Systems", icon: "Cpu" },
      { name: "Java", desc: "Enterprise app design & robust architectures", tag: "Enterprise", icon: "Coffee" },
      { name: "HTML5", desc: "Semantic markup & structure foundation", tag: "Web", icon: "Globe" },
    ]
  },
  {
    category: "Backend & APIs",
    filter: "backend",
    items: [
      { name: "Django", desc: "Secure, rapid full-stack Python framework", tag: "Primary", icon: "Server" },
      { name: "FastAPI", desc: "High-performance async APIs with auto docs", tag: "API", icon: "Zap" },
      { name: "Node JS", desc: "Event-driven asynchronous backend execution", tag: "Runtime", icon: "Box" },
      { name: "DRF", desc: "Powerful REST API toolkit for Django", tag: "API", icon: "Layers" },
    ]
  },
  {
    category: "Frontend & Web UI",
    filter: "frontend",
    items: [
      { name: "React JS", desc: "Component-based single page applications", tag: "Primary", icon: "Atom" },
      { name: "Tailwind CSS", desc: "Utility-first modern responsive interfaces", tag: "Styling", icon: "Paintbrush" },
      { name: "Vite", desc: "Lightning-fast frontend build tooling", tag: "Tooling", icon: "Flame" },
      { name: "shadcn/ui", desc: "Accessible, composable UI components", tag: "UI Lib", icon: "Component" },
    ]
  },
  {
    category: "Database & Auth",
    filter: "database",
    items: [
      { name: "PostgreSQL", desc: "Advanced open-source relational database", tag: "Primary", icon: "Database" },
      { name: "JWT Auth", desc: "Stateless token-based authentication", tag: "Auth", icon: "KeyRound" },
      { name: "Google OAuth", desc: "Secure third-party authentication flow", tag: "Auth", icon: "ShieldCheck" },
      { name: "Redis", desc: "In-memory caching and session store", tag: "Cache", icon: "MemoryStick" },
    ]
  },
  {
    category: "DevOps & Deployment",
    filter: "devops",
    items: [
      { name: "Vercel", desc: "Zero-config frontend deployment platform", tag: "Deploy", icon: "Triangle" },
      { name: "Railway", desc: "Backend and database cloud hosting", tag: "Deploy", icon: "Train" },
      { name: "Git & GitHub", desc: "Version control and collaborative workflows", tag: "VCS", icon: "GitBranch" },
      { name: "Docker", desc: "Containerized application environments", tag: "Infra", icon: "Container" },
    ]
  }
];

const ICON_MAP = {
  FileCode2,
  Cpu,
  Coffee,
  Globe,
  Server,
  Zap,
  Box,
  Layers,
  Atom,
  Paintbrush,
  Flame,
  Component,
  Database,
  KeyRound,
  ShieldCheck,
  MemoryStick,
  Triangle,
  Train,
  GitBranch,
  Container,
  Sparkles
};

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const FILTER_CHIPS = [
    { label: "All", value: "all" },
    { label: "Languages", value: "languages" },
    { label: "Backend", value: "backend" },
    { label: "Frontend", value: "frontend" },
    { label: "Database", value: "database" },
    { label: "DevOps", value: "devops" }
  ];

  // Filter skills based on active filter
  const filteredCategories = activeFilter === "all"
    ? SKILLS
    : SKILLS.filter(cat => cat.filter === activeFilter);

  return (
    <section className={styles.section} id="skills">
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.headerContainer}>
          <span className={styles.eyebrow}>TECHNICAL STACK</span>
          <h2 className={styles.title}>Skills & Technologies</h2>
          <p className={styles.subtitle}>
            A cohesive engineering toolkit built to design, deploy, and scale robust applications.
          </p>
        </div>

        {/* Filter Chips */}
        <nav className={styles.filterTabsContainer} aria-label="Skills category filtering">
          <div className={styles.filterTabsScroller}>
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setActiveFilter(chip.value)}
                className={`${styles.filterChip} ${activeFilter === chip.value ? styles.activeChip : ''}`}
                aria-pressed={activeFilter === chip.value ? "true" : "false"}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Categories / Grid */}
        <div>
          {filteredCategories.map((categoryGroup) => (
            <div key={categoryGroup.filter} className={styles.categorySection}>
              {/* Show category label ONLY when activeFilter is "all" */}
              {activeFilter === "all" && (
                <span className={styles.categoryLabel}>
                  {categoryGroup.category}
                </span>
              )}
              
              <div className={styles.grid}>
                {categoryGroup.items.map((skill, skillIndex) => {
                  const IconComponent = ICON_MAP[skill.icon] || Globe;
                  return (
                    <div key={skillIndex} className={styles.skillCard}>
                      {/* Row 1: icon wrapper + skill name */}
                      <div className={styles.cardRow1}>
                        <div className={styles.iconWrapper}>
                          <IconComponent size={14} aria-hidden="true" />
                        </div>
                        <span className={styles.skillName}>
                          {skill.name}
                        </span>
                      </div>
                      
                      {/* Row 2: description text */}
                      <p className={styles.skillDesc}>
                        {skill.desc}
                      </p>
                      
                      {/* Row 3: tag badge */}
                      <span className={styles.tagBadge}>
                        {skill.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

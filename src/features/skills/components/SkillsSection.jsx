import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    category: "Systems Engineering & Core Languages",
    filter: "languages",
    items: [
      { name: "Python", desc: "Object-oriented scripting & high-performance core", tag: "Core", icon: "FileCode2", currentFocus: true, level: "Expert", exp: "3+ years of production use" },
      { name: "C++", desc: "High-performance systems & compiled algorithms", tag: "Systems", icon: "Cpu", level: "Proficient", exp: "2+ years of academic use" },
      { name: "Java", desc: "Enterprise app design & robust architectures", tag: "Enterprise", icon: "Coffee", level: "Proficient", exp: "1+ year of academic use" },
      { name: "HTML5", desc: "Semantic markup & structure foundation", tag: "Web", icon: "Globe", level: "Proficient", exp: "4+ years of web use" },
    ]
  },
  {
    category: "Distributed Systems & API Engineering",
    filter: "backend",
    items: [
      { name: "Django", desc: "Secure, rapid full-stack Python framework", tag: "Primary", icon: "Server", currentFocus: true, level: "Expert", exp: "3+ years of production use" },
      { name: "FastAPI", desc: "High-performance async APIs with auto docs", tag: "API", icon: "Zap", level: "Expert", exp: "2+ years of production use" },
      { name: "Node JS", desc: "Event-driven asynchronous backend execution", tag: "Runtime", icon: "Box", level: "Proficient", exp: "2+ years of API dev" },
      { name: "DRF", desc: "Powerful REST API toolkit for Django", tag: "API", icon: "Layers", level: "Expert", exp: "3+ years of REST APIs" },
    ]
  },
  {
    category: "User Interface & Experience",
    filter: "frontend",
    items: [
      { name: "React JS", desc: "Component-based single page applications", tag: "Primary", icon: "Atom", currentFocus: true, level: "Expert", exp: "3+ years of frontend dev" },
      { name: "Tailwind CSS", desc: "Utility-first modern responsive interfaces", tag: "Styling", icon: "Paintbrush", level: "Expert", exp: "3+ years of styling" },
      { name: "Vite", desc: "Lightning-fast frontend build tooling", tag: "Tooling", icon: "Flame", level: "Proficient", exp: "2+ years of build tooling" },
      { name: "shadcn/ui", desc: "Accessible, composable UI components", tag: "UI Lib", icon: "Component", level: "Proficient", exp: "1+ year of UI design" },
    ]
  },
  {
    category: "Data Architecture & Storage",
    filter: "database",
    items: [
      { name: "PostgreSQL", desc: "Advanced open-source relational database", tag: "Primary", icon: "Database", currentFocus: true, level: "Expert", exp: "3+ years of database admin" },
      { name: "JWT Auth", desc: "Stateless token-based authentication", tag: "Auth", icon: "KeyRound", level: "Expert", exp: "3+ years of auth integration" },
      { name: "Google OAuth", desc: "Secure third-party authentication flow", tag: "Auth", icon: "ShieldCheck", level: "Proficient", exp: "2+ years of OAuth flow" },
    ]
  },
  {
    category: "DevOps & Automated Deployment",
    filter: "devops",
    items: [
      { name: "Vercel", desc: "Zero-config frontend deployment platform", tag: "Deploy", icon: "Triangle", level: "Proficient", exp: "3+ years of deployment" },
      { name: "Railway", desc: "Backend and database cloud hosting", tag: "Deploy", icon: "Train", level: "Proficient", exp: "2+ years of hosting" },
      { name: "Git & GitHub", desc: "Version control and collaborative workflows", tag: "VCS", icon: "GitBranch", level: "Expert", exp: "4+ years of collab vcs" },
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
    { label: "Current Focus", value: "focus" },
    { label: "Languages", value: "languages" },
    { label: "Backend", value: "backend" },
    { label: "UI/UX", value: "frontend" },
    { label: "Data & Storage", value: "database" },
    { label: "DevOps", value: "devops" }
  ];

  // Filter skills based on active filter
  const filteredCategories = activeFilter === "all"
    ? SKILLS
    : activeFilter === "focus"
      ? SKILLS.map(cat => ({
          ...cat,
          items: cat.items.filter(item => item.currentFocus)
        })).filter(cat => cat.items.length > 0)
      : SKILLS.filter(cat => cat.filter === activeFilter);

  // Reset filter is handled by tabs
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
          <p className={styles.summaryLine}>
            Focusing on scalable Python/Django backends and high-performance React interfaces, with deep experience in containerized deployment.
          </p>
        </div>

        {/* Filter Chips */}
        <nav className={styles.filterTabsContainer} aria-label="Skills category filtering">
          <div className={`flex overflow-x-auto gap-2 pb-1 scrollbar-none -mx-5 px-5 md:flex-wrap md:overflow-visible md:mx-0 md:px-0 md:justify-center ${styles.filterTabsScroller}`}>
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setActiveFilter(chip.value)}
                className={`${styles.filterChip} ${activeFilter === chip.value ? styles.activeChip : ''} flex-shrink-0`}
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
              {/* Show category label when activeFilter is "all" or "focus" */}
              {(activeFilter === "all" || activeFilter === "focus") && (
                <span className={styles.categoryLabel}>
                  {categoryGroup.category}
                </span>
              )}
              
              <div className={styles.grid}>
                <AnimatePresence mode="popLayout">
                  {categoryGroup.items.map((skill) => {
                    const IconComponent = ICON_MAP[skill.icon] || Globe;
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                        key={skill.name} 
                        className={`${styles.skillCard} ${skill.currentFocus ? styles.focusCard : ''}`}
                      >
                        {/* Subtle Interactive Hover Tooltip */}
                        {skill.exp && (
                          <div className={styles.tooltipText}>
                            {skill.exp}
                          </div>
                        )}

                        {/* Row 1: MD3 icon container + skill name */}
                        <div className={styles.cardRow1}>
                          <div className={styles.iconWrapper}>
                            <IconComponent size={20} strokeWidth={1.75} aria-hidden="true" />
                          </div>
                          <div className={styles.nameContainer}>
                            <div className={styles.nameRow}>
                              <span className={styles.skillName}>
                                {skill.name}
                              </span>
                              {skill.level && (
                                <span className={`${styles.levelBadge} ${skill.level === 'Expert' ? styles.expertBadge : styles.proficientBadge}`}>
                                  {skill.level}
                                </span>
                              )}
                            </div>
                            {skill.currentFocus && (
                              <span className={styles.focusBadge}>
                                Primary Stack
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Row 2: description — flex-1 equalises card height */}
                        <p className={`${styles.skillDesc} ${styles.skillDescFlex}`}>
                          {skill.desc}
                        </p>

                        {/* Row 3: tag badge */}
                        <span className={styles.tagBadge}>
                          {skill.tag}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

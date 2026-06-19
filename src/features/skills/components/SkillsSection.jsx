import { useState } from 'react';
import { 
  Terminal, 
  Monitor, 
  Cloud, 
  Brain, 
  Code2, 
  Cpu, 
  Globe, 
  Layout, 
  Layers, 
  Palette, 
  Database, 
  Server, 
  GitBranch, 
  BarChart2,
  Sparkles
} from 'lucide-react';
import styles from '../styles.module.css';
import SectionHeading from '../../../components/SectionHeading';

// Cohesive categories styled with official Google branding parameters
const skillCategories = [
  {
    id: "languages",
    category: "Languages & Systems",
    icon: Code2,
    skills: [
      { name: "Python", subLabel: "Object-oriented scripting & high-performance core", icon: Code2 },
      { name: "C++", subLabel: "High-performance systems & compiled algorithms", icon: Cpu },
      { name: "Java Development", subLabel: "Enterprise app design & robust architectures", icon: Server },
      { name: "HTML5", subLabel: "Modern semantic markup & structure foundation", icon: Globe }
    ]
  },
  {
    id: "backend",
    category: "Backend & APIs",
    icon: Terminal,
    skills: [
      { name: "Django", subLabel: "Secure, rapid full-stack Python framework", icon: Terminal },
      { name: "FastAPI", subLabel: "High-performance async APIs with automatic docs", icon: Cpu },
      { name: "Node JS", subLabel: "Event-driven asynchronous backend execution", icon: Server },
      { name: "PHP", subLabel: "Server-side web development & scalable scripts", icon: Code2 }
    ]
  },
  {
    id: "frontend",
    category: "Frontend & Web UI",
    icon: Layout,
    skills: [
      { name: "React JS", subLabel: "Component-based rich single page applications", icon: Layout },
      { name: "Tailwind CSS", subLabel: "Utility-first modern responsive interfaces", icon: Palette },
      { name: "Web Development", subLabel: "Semantic, standards-compliant user experiences", icon: Globe },
      { name: "Web Applications", subLabel: "Highly interactive state-driven browser apps", icon: Layers }
    ]
  },
  {
    id: "desktop",
    category: "Desktop & GUI Apps",
    icon: Monitor,
    skills: [
      { name: "Tkinter", subLabel: "Lightweight native desktop Python GUIs", icon: Monitor },
      { name: "PySide Web UI", subLabel: "Cross-platform enterprise native desktop apps", icon: Palette },
      { name: "Desktop Application", subLabel: "Compiled client-side software architectures", icon: Layout },
      { name: "Python Applications", subLabel: "Standard automation scripts & compiled units", icon: Terminal }
    ]
  },
  {
    id: "cloud",
    category: "Cloud & Databases",
    icon: Cloud,
    skills: [
      { name: "Firebase & Supabase", subLabel: "Relating database & serverless backend auth", icon: Cloud },
      { name: "SQL & SQLite", subLabel: "Relational schemas, indexing & query tuning", icon: Database },
      { name: "Git", subLabel: "Distributed code versioning & history tracking", icon: GitBranch },
      { name: "GitHub", subLabel: "Collaborative source control & CI/CD workflows", icon: Globe }
    ]
  },
  {
    id: "data",
    category: "Data Science & Big Data",
    icon: Brain,
    skills: [
      { name: "PySpark", subLabel: "Distributed large-scale big data cluster analysis", icon: Cpu },
      { name: "Streamlit", subLabel: "Rapid AI, ML & data dashboards prototyping", icon: BarChart2 }
    ]
  }
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("all");

  // Filter skills array based on active Tab ID
  const filteredCategories = activeTab === "all" 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section className={styles.section} id="skills">
      <div className="container">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Technical Stack"
          title="Skills & Technologies"
          subtitle="A cohesive engineering toolkit built to design, deploy, and scale robust applications across the modern tech landscape."
          centered={true}
        />

        {/* ── HIGH-END MATERIAL 3 HORIZONTAL FILTER CHIPS ── */}
        <nav className={styles.filterTabsContainer} aria-label="Skills category filtering">
          <div className={styles.filterTabsScroller}>
            {/* "All" Toggle Pill */}
            <button
              onClick={() => setActiveTab("all")}
              className={`${styles.filterChip} ${activeTab === "all" ? styles.activeChip : ''}`}
              aria-pressed={activeTab === "all" ? "true" : "false"}
            >
              <Sparkles size={14} className={styles.chipIcon} />
              <span>Show All</span>
            </button>

            {/* Category Custom Tabs */}
            {skillCategories.map((cat) => {
              const TabIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`${styles.filterChip} ${activeTab === cat.id ? styles.activeChip : ''}`}
                  aria-pressed={activeTab === cat.id ? "true" : "false"}
                >
                  <TabIcon size={14} className={styles.chipIcon} />
                  <span>{cat.category}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Categories Grid (Animates layout dynamically on tab shift) */}
        <div className={styles.skillsGrid}>
          {filteredCategories.map((categoryGroup) => {
            const CategoryIcon = categoryGroup.icon;

            return (
              <article 
                key={categoryGroup.id} 
                className={styles.skillGroup}
              >
                {/* M3 Card Header */}
                <header className={styles.groupHeader}>
                  <div className={styles.groupIcon}>
                    <CategoryIcon size={20} aria-hidden="true" />
                  </div>
                  <h3 className={styles.groupTitle}>
                    {categoryGroup.category}
                  </h3>
                </header>

                {/* Structured Vertical Skill List with active hover container rows */}
                <div className={styles.skillList}>
                  {categoryGroup.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;

                    return (
                      <div key={skillIndex} className={styles.skillItem}>
                        {/* Monochromatic Tech Icon */}
                        <div className={styles.skillIconContainer}>
                          <SkillIcon size={16} aria-hidden="true" />
                        </div>
                        
                        {/* Skill Meta Detail */}
                        <div className={styles.skillMeta}>
                          <span className={styles.skillName}>
                            {skill.name}
                          </span>
                          <span className={styles.skillSubLabel}>
                            {skill.subLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

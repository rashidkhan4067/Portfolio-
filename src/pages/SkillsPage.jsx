import { Helmet } from 'react-helmet-async';
import SkillsSection from '../features/skills';

const BASE_URL = 'https://rashidkhan4067.github.io';

const skillsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Skills & Technologies | Muhammad Rashid Shafique',
  'url': `${BASE_URL}/skills`,
  'description': 'Full technical skill set of Muhammad Rashid Shafique: Python, Django, FastAPI, React, Node.js, PySpark, TensorFlow, SQL, C++, Supabase, Firebase and more.',
  'author': {
    '@type': 'Person',  
    'name': 'Muhammad Rashid Shafique',
    'knowsAbout': [
      'Python', 'Django', 'FastAPI', 'React', 'Node.js',
      'PySpark', 'Apache Spark', 'TensorFlow', 'C++', 'C',
      'SQL', 'PostgreSQL', 'Supabase', 'Firebase',
      'Tkinter', 'PyQt5', 'Selenium', 'REST API',
      'Machine Learning', 'Big Data Engineering',
    ],
  },
};

export default function SkillsPage() {
  return (
    <>
      <Helmet>
        <title>Skills & Technologies | Muhammad Rashid Shafique — Python, React, PySpark & More</title>
        <meta name="description" content="Technical skills of Muhammad Rashid Shafique — 25+ technologies across backend (Python, Django, FastAPI, Node.js), frontend (React, Tailwind), data engineering (PySpark, SQL), machine learning (TensorFlow), and cloud/database (Supabase, Firebase, PostgreSQL)." />
        <meta name="keywords" content="Muhammad Rashid Shafique skills, Python developer skills, React skills, Django developer, FastAPI Python, PySpark big data, TensorFlow machine learning, backend developer technologies, full stack skills Pakistan" />
        <link rel="canonical" href={`${BASE_URL}/skills`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BASE_URL}/skills`} />
        <meta property="og:title" content="Skills & Technologies | Muhammad Rashid Shafique" />
        <meta property="og:description" content="25+ technologies: Python, Django, FastAPI, React, Node.js, PySpark, TensorFlow, SQL, C++, Supabase, Firebase." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Technical Skills" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Skills | Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="25+ technical skills across backend, frontend, data science, and cloud." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.png`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(skillsSchema)}</script>
      </Helmet>
      <SkillsSection />
    </>
  );
}

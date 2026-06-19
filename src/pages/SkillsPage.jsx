import { Helmet } from 'react-helmet-async';
import SkillsSection from '../features/skills';

export default function SkillsPage() {
  return (
    <>
      <Helmet>
        <title>Skills & Technologies — Muhammad Rashid Shafique</title>
        <meta name="description" content="Technical skills of Muhammad Rashid Shafique — Python, Django, FastAPI, React, Node.js, PySpark, TensorFlow, Firebase, SQL, C++, and more." />
        <meta property="og:title" content="Skills & Technologies — Muhammad Rashid Shafique" />
        <meta property="og:description" content="Full technical stack: Python, Django, FastAPI, React JS, Node.js, PySpark, TensorFlow, SQL, C++, Supabase, Firebase." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Skills — Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="25+ technical skills across backend, frontend, data science, and cloud." />
      </Helmet>
      <SkillsSection />
    </>
  );
}

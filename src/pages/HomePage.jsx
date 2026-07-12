import { Helmet } from 'react-helmet-async';
import HeroSection from '../features/hero';
import SkillsSection from '../features/skills';
import ProjectsSection from '../features/projects';
import BuildLogsTeaser from '../features/build-logs/components/BuildLogsTeaser';
import TestimonialsSection from '../features/testimonials';
import HireMeCTA from '../features/cta';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Muhammad Rashid Shafique | Systems Engineer & Full-Stack Developer | Pakistan</title>
        <meta name="description" content="Muhammad Rashid Shafique — Systems Engineer & Full-Stack Developer from Faisalabad, Pakistan. Expert in Python (Django, FastAPI), React, PySpark big-data pipelines, and distributed backend systems. Available for full-time & freelance roles." />
        <meta name="keywords" content="Muhammad Rashid Shafique, Systems Engineer Pakistan, Full Stack Developer Pakistan, Python developer, React developer, Django FastAPI, PySpark, backend developer, hire software engineer" />
        <link rel="canonical" href={`${BASE_URL}/`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:title" content="Muhammad Rashid Shafique | Systems Engineer & Full-Stack Developer" />
        <meta property="og:description" content="Systems Engineer & Full-Stack Developer from Pakistan. Python · Django · FastAPI · React · PySpark. Building scalable APIs, data pipelines, and modern web apps." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Muhammad Rashid Shafique Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rashidkhan4067" />
        <meta name="twitter:creator" content="@rashidkhan4067" />
        <meta name="twitter:title" content="Muhammad Rashid Shafique | Systems Engineer & Full-Stack Developer" />
        <meta name="twitter:description" content="Systems Engineer & Full-Stack Developer from Pakistan. Python · Django · FastAPI · React · PySpark." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.png`} />
      </Helmet>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <BuildLogsTeaser />
      <TestimonialsSection />
      <HireMeCTA />
    </>
  );
}

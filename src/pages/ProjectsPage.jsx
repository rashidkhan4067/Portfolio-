import { Helmet } from 'react-helmet-async';
import ProjectsSection from '../features/projects';

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>Projects — Muhammad Rashid Shafique</title>
        <meta name="description" content="Explore 10+ projects by Muhammad Rashid Shafique — from AI facial recognition systems and PySpark big data pipelines to full-stack web apps and IoT dashboards." />
        <meta property="og:title" content="Projects — Muhammad Rashid Shafique Portfolio" />
        <meta property="og:description" content="10+ projects including AI/ML systems, full-stack web apps, IoT dashboards, and big data pipelines." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Projects — Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="10+ engineering projects: AI/ML, Full-Stack, IoT, Big Data." />
      </Helmet>
      <ProjectsSection />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import HeroSection from '../features/hero';
import SkillsSection from '../features/skills';
import ProjectsSection from '../features/projects';
import BuildLogsTeaser from '../features/build-logs/components/BuildLogsTeaser';
import TestimonialsSection from '../features/testimonials';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Muhammad Rashid Shafique — Systems Engineer & Full-Stack Developer</title>
        <meta name="description" content="Portfolio of Muhammad Rashid Shafique — Systems Engineer & Full-Stack Developer. Specializing in Python backends, React UIs, PySpark big data pipelines, and distributed systems." />
        <meta property="og:title" content="Muhammad Rashid Shafique — Systems Engineer & Full-Stack Developer" />
        <meta property="og:description" content="Systems Engineer specializing in high-throughput backend APIs, distributed data pipelines, and responsive web applications." />
        <meta property="og:url" content="https://rashidkhan4067.github.io/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Muhammad Rashid Shafique — Systems Engineer" />
        <meta name="twitter:description" content="Systems Engineer & Full-Stack Developer. Python · React · PySpark · Node.js." />
      </Helmet>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <BuildLogsTeaser />
      <TestimonialsSection />
    </>
  );
}

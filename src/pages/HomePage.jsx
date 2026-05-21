import HeroSection from '../features/hero';
import SkillsSection from '../features/skills';
import ProjectsSection from '../features/projects';
import PlaygroundSection from '../features/playground';
import TestimonialsSection from '../features/testimonials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <PlaygroundSection />
      <TestimonialsSection />
    </>
  );
}


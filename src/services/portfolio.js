/**
 * services/portfolio.js
 * Data access layer — all data fetching goes through here.
 * Currently using static data; swap with API calls in production.
 */

import {
  personalInfo,
  projects,
  skills,
  experience,
  testimonials,
  timeline,
  stats,
} from '../constants/portfolioData';

export const portfolioService = {
  getPersonalInfo: () => Promise.resolve(personalInfo),
  getProjects: () => Promise.resolve(projects),
  getProjectsByCategory: (category) =>
    Promise.resolve(
      category === 'All' ? projects : projects.filter((p) => p.category === category)
    ),
  getFeaturedProjects: () => Promise.resolve(projects.filter((p) => p.featured)),
  getSkills: () => Promise.resolve(skills),
  getExperience: () => Promise.resolve(experience),
  getTestimonials: () => Promise.resolve(testimonials),
  getTimeline: () => Promise.resolve(timeline),
  getStats: () => Promise.resolve(stats),

  /**
   * Contact form submission
   * Replace with real API endpoint in production
   */
  submitContact: async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace with: return fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    return { success: true, message: 'Message sent successfully!' };
  },
};

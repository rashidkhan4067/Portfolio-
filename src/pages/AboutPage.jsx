import { Helmet } from 'react-helmet-async';
import AboutSection from '../features/about';

const BASE_URL = 'https://rashid-shafique-portfolio.vercel.app';

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  'name': 'About Muhammad Rashid Shafique',
  'url': `${BASE_URL}/about`,
  'mainEntity': {
    '@type': 'Person',
    'name': 'Muhammad Rashid Shafique',
    'jobTitle': 'Systems Engineer & Full-Stack Developer',
    'description': 'Backend-focused Systems Engineer specialising in Python, Django, FastAPI, React, and PySpark. BS Computer Science student at the University of Agriculture Faisalabad.',
    'alumniOf': {
      '@type': 'CollegeOrUniversity',
      'name': 'University of Agriculture Faisalabad',
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Faisalabad',
      'addressRegion': 'Punjab',
      'addressCountry': 'PK',
    },
    'sameAs': [
      'https://github.com/rashidkhan4067',
      'https://www.linkedin.com/in/rashid-shafique09',
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Muhammad Rashid Shafique | Systems Engineer from Pakistan</title>
        <meta name="description" content="Muhammad Rashid Shafique is a Systems Engineer & Full-Stack Developer from Faisalabad, Pakistan. BS Computer Science at UAF. Specialising in Python backends, distributed systems, PySpark pipelines, and React web applications." />
        <meta name="keywords" content="Muhammad Rashid Shafique about, Systems Engineer Faisalabad Pakistan, UAF Computer Science student, Python backend developer, full stack engineer Pakistan bio" />
        <link rel="canonical" href={`${BASE_URL}/about`} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:title" content="About Muhammad Rashid Shafique | Systems Engineer from Pakistan" />
        <meta property="og:description" content="Systems Engineer & Full-Stack Developer pursuing BS Computer Science at UAF. Building scalable backends, React apps, and big data pipelines." />
        <meta property="og:image" content={`${BASE_URL}/og-preview.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="About Muhammad Rashid Shafique" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Muhammad Rashid Shafique | Systems Engineer" />
        <meta name="twitter:description" content="BS Computer Science student at UAF specialising in systems engineering, Python, and full-stack development." />
        <meta name="twitter:image" content={`${BASE_URL}/og-preview.png`} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(aboutSchema)}</script>
      </Helmet>
      <AboutSection />
    </>
  );
}

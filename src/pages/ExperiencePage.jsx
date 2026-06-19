import { Helmet } from 'react-helmet-async';
import ExperienceSection from '../features/experience';

export default function ExperiencePage() {
  return (
    <>
      <Helmet>
        <title>Experience — Muhammad Rashid Shafique</title>
        <meta name="description" content="Work experience and academic background of Muhammad Rashid Shafique — Systems Engineer, Open Source Contributor, and BS Computer Science candidate at UAF." />
        <meta property="og:title" content="Experience — Muhammad Rashid Shafique" />
        <meta property="og:description" content="Systems Engineer with experience in Selenium automation, Node.js APIs, hospital management systems, and PySpark data pipelines." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Experience — Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="Open Source Engineer & BS CS Candidate. Delivering scalable systems with Python, React, and Node.js." />
      </Helmet>
      <ExperienceSection />
    </>
  );
}

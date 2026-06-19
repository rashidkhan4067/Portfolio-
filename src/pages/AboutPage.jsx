import { Helmet } from 'react-helmet-async';
import AboutSection from '../features/about';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Muhammad Rashid Shafique</title>
        <meta name="description" content="About Muhammad Rashid Shafique — BS Computer Science student at UAF, specializing in distributed systems, backend APIs, and full-stack web development." />
        <meta property="og:title" content="About — Muhammad Rashid Shafique" />
        <meta property="og:description" content="Systems Engineer pursuing BS Computer Science at UAF. Building scalable backends, React apps, and big data pipelines." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="About — Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="BS Computer Science student specializing in systems engineering and full-stack development." />
      </Helmet>
      <AboutSection />
    </>
  );
}

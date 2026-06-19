import { Helmet } from 'react-helmet-async';
import ContactSection from '../features/contact';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Muhammad Rashid Shafique</title>
        <meta name="description" content="Get in touch with Muhammad Rashid Shafique for freelance projects, collaboration, or job opportunities. Available for full-time and contract roles." />
        <meta property="og:title" content="Contact — Muhammad Rashid Shafique" />
        <meta property="og:description" content="Available for full-time, freelance, and contract opportunities. Reach out to discuss systems engineering, backend APIs, or full-stack projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Contact — Muhammad Rashid Shafique" />
        <meta name="twitter:description" content="Hire Muhammad Rashid Shafique for your next engineering project." />
      </Helmet>
      <ContactSection />
    </>
  );
}

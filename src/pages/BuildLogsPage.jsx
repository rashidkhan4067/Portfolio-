import { Helmet } from 'react-helmet-async';
import BuildLogsSection from '../features/build-logs/components/BuildLogsSection';

export default function BuildLogsPage() {
  return (
    <>
      <Helmet>
        <title>Build Logs — Muhammad Rashid Shafique</title>
        <meta name="description" content="Engineering logs, distributed architecture experiments, and full-stack system optimization insights by Muhammad Rashid Shafique." />
        <meta property="og:title" content="Build Logs — Muhammad Rashid Shafique" />
        <meta property="og:description" content="System design write-ups and development logs." />
        <meta property="og:type" content="website" />
      </Helmet>
      <BuildLogsSection />
    </>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Database, 
  Server, 
  Globe, 
  Network, 
  Binary, 
  Code2, 
  TrendingUp, 
  ChevronRight 
} from 'lucide-react';
import styles from '../styles.module.css';

import SectionHeading from '../../../components/SectionHeading';

// Jeff Dean's famous Latency Numbers Every Programmer Should Know (M3 optimized)
const LATENCY_ITEMS = [
  {
    id: 'l1',
    name: 'L1 Cache Access',
    value: '0.5 ns',
    nanoseconds: 0.5,
    icon: Zap,
    description: 'Retrieving data directly from the CPU core\'s fastest level-1 cache. The speed of pure light inside silicon.',
    metaphor: '1 Second (A single camera flash)',
    scaleWidth: '2%'
  },
  {
    id: 'l2',
    name: 'L2 Cache Access',
    value: '7 ns',
    nanoseconds: 7,
    icon: Cpu,
    description: 'Retrieving data from the larger, slightly slower level-2 cache shared close to the processor core.',
    metaphor: '14 Seconds (Opening a new web page)',
    scaleWidth: '8%'
  },
  {
    id: 'ram',
    name: 'Main Memory Access (RAM)',
    value: '100 ns',
    nanoseconds: 100,
    icon: Database,
    description: 'Fetching data from external RAM chips. The first major physical crossing over the motherboard.',
    metaphor: '3.3 Minutes (Drinking a cup of tea)',
    scaleWidth: '15%'
  },
  {
    id: 'ssd',
    name: 'SSD Random Read',
    value: '16,000 ns',
    nanoseconds: 16000,
    icon: Server,
    description: 'Accessing flash storage cells over PCIe channels. Involves hardware controller and bus negotiations.',
    metaphor: '9 Hours (A full night\'s sleep + breakfast)',
    scaleWidth: '40%'
  },
  {
    id: 'dc',
    name: 'Datacenter Round-Trip',
    value: '500,000 ns',
    nanoseconds: 500000,
    icon: Network,
    description: 'Sending a request over switches and optical fiber within a single high-performance cluster.',
    metaphor: '11.5 Days (A long-deserved vacation)',
    scaleWidth: '65%'
  },
  {
    id: 'globe',
    name: 'Packet from Pakistan to USA & Back',
    value: '150,000,000 ns',
    nanoseconds: 150000000,
    icon: Globe,
    description: 'Traveling thousands of miles through subsea fiber-optic cables crossing oceans at the speed of light in glass.',
    metaphor: '9.5 Years (Completing elementary through high school)',
    scaleWidth: '100%'
  }
];

// Algorithmic Complexity details matching Google developer criteria
const ALGO_ITEMS = [
  {
    id: 'binary',
    name: 'Binary Search',
    complexity: 'O(log n)',
    space: 'O(1)',
    desc: 'Divide-and-conquer on sorted structures.',
    details: 'Logarithmic Time',
    pros: 'Ultra-fast search speed. Even with 4 Billion items (2^32), it takes a maximum of 32 comparisons.',
    cons: 'Requires data to be completely pre-sorted. Sorting takes O(n log n) overhead initially.',
    systems: 'Powers clustered database indexing (B-Trees) and rapid IP routing lookups in memory.'
  },
  {
    id: 'quicksort',
    name: 'QuickSort (Average)',
    complexity: 'O(n log n)',
    space: 'O(log n)',
    desc: 'Pivot-based divide-and-conquer sorting.',
    details: 'Quasilinear Time',
    pros: 'Excellent practical performance. Highly cache-friendly as it performs in-place partitions.',
    cons: 'Unstable. Worst-case complexity degrades to O(n^2) if pivot selection is poor (e.g., already sorted data).',
    systems: 'Underpins standard library sorting algorithms across engines (e.g., C++ std::sort, Chrome V8 engine).'
  },
  {
    id: 'hashmap',
    name: 'Hash Map Lookup',
    complexity: 'O(1)',
    space: 'O(n)',
    desc: 'Direct index indexing via hash mappings.',
    details: 'Constant Time',
    pros: 'Instant operations regardless of data size. Ideal for frequency counts and primary key checks.',
    cons: 'Requires collision resolution strategies (chaining/probing). Potential for O(n) lookup if collisions spike.',
    systems: 'Used for extremely fast lookup mechanisms like Redis key-value storage, session stores, and routing tables.'
  },
  {
    id: 'matrix',
    name: 'Matrix Multiplication (Naive)',
    complexity: 'O(n³)',
    space: 'O(n²)',
    desc: 'Standard dot product of rows & columns.',
    details: 'Cubic Time',
    pros: 'Straightforward to implement. No complex mathematical divisions or segmentations needed.',
    cons: 'Extremely slow scaling. CPU cache performance is poor due to non-contiguous memory access (columns).',
    systems: 'Core in Graphic Engines and Machine Learning. Typically accelerated using GPU tensor cores and optimized BLAS tiling libraries.'
  }
];

export default function PlaygroundSection() {
  const [activeTab, setActiveTab] = useState('latency');
  const [selectedLatency, setSelectedLatency] = useState(LATENCY_ITEMS[0]);
  const [selectedAlgo, setSelectedAlgo] = useState(ALGO_ITEMS[0]);

  const LatencyIcon = selectedLatency.icon;

  return (
    <section className={styles.section} id="cs-playground">
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />

      <div className="container">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Computer Science Core"
          title="Systems & Complexity Playground"
          subtitle="An interactive dashboard visualizing micro-level computer operations and algorithmic trade-offs built for Google-grade performance benchmarks."
          centered={true}
        />

        {/* Tab Controls */}
        <div className={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab('latency')}
            className={`${styles.tabButton} ${activeTab === 'latency' ? styles.activeTab : ''}`}
            aria-pressed={activeTab === 'latency'}
          >
            <Zap size={15} />
            <span>Systems Latency Scale</span>
          </button>
          <button
            onClick={() => setActiveTab('algo')}
            className={`${styles.tabButton} ${activeTab === 'algo' ? styles.activeTab : ''}`}
            aria-pressed={activeTab === 'algo'}
          >
            <Binary size={15} />
            <span>Algorithmic Complexity (Big-O)</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className={styles.playgroundCard}>
          <div className={styles.cardAccentBar} />

          <AnimatePresence mode="wait">
            {activeTab === 'latency' ? (
              <motion.div
                key="latency"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={styles.latencyLayout}
              >
                {/* Left: Latency Selector List */}
                <div>
                  <h3 className={styles.latencyTitle}>Operations Scale</h3>
                  <p className={styles.latencySubtitle}>
                    Google engineers design for scale. Select an operation to visualize its delay compared to L1 Cache access.
                  </p>
                  
                  <div className={styles.latencyList} role="listbox">
                    {LATENCY_ITEMS.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedLatency(item)}
                          className={`${styles.latencyItem} ${selectedLatency.id === item.id ? styles.selectedLatencyItem : ''}`}
                          role="option"
                          aria-selected={selectedLatency.id === item.id}
                        >
                          <div className={styles.latencyIconBox}>
                            <ItemIcon size={16} />
                          </div>
                          <div className={styles.latencyMeta}>
                            <span className={styles.latencyName}>{item.name}</span>
                            <span className={styles.latencyValue}>{item.value}</span>
                          </div>
                          <ChevronRight size={14} style={{ opacity: selectedLatency.id === item.id ? 1 : 0.3 }} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Metaphor comparison panel */}
                <div className={styles.latencyComparisonCard}>
                  <div className={styles.comparisonHeader}>
                    <span className={styles.comparisonTitle}>Visualizing Latency Scale</span>
                    <span className={styles.comparisonSelectedName}>{selectedLatency.name}</span>
                  </div>

                  <div className={styles.metaphorWrapper}>
                    <span className={styles.metaphorLabel}>The Datacenter Metaphor</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      If <strong style={{ color: 'var(--accent-primary)' }}>L1 Cache Access (0.5 ns)</strong> took exactly <strong style={{ color: 'var(--text-primary)' }}>1 Second</strong>, then:
                    </p>
                    <span className={styles.metaphorText}>
                      {selectedLatency.metaphor}
                    </span>
                  </div>

                  <div className={styles.latencyScaleBarContainer}>
                    <div className={styles.scaleBarLabel}>
                      <span>Physical Delay Scale</span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedLatency.value}</span>
                    </div>
                    <div className={styles.scaleBarTrack}>
                      <div 
                        className={styles.scaleBarFill} 
                        style={{ width: selectedLatency.scaleWidth }}
                      />
                    </div>
                  </div>

                  <p className={styles.scaleDescription}>
                    "{selectedLatency.description}"
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="algo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={styles.bigOLayout}
              >
                {/* Left: Algorithm list */}
                <div className={styles.bigOSelectCard}>
                  <h3 className={styles.latencyTitle}>Algorithmic Performance</h3>
                  <p className={styles.latencySubtitle}>
                    Google focuses heavily on Algorithmic efficiency. Select an operation to inspect runtime complexities and systems applications.
                  </p>

                  <div className={styles.latencyList} role="listbox">
                    {ALGO_ITEMS.map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => setSelectedAlgo(algo)}
                        className={`${styles.algoItem} ${selectedAlgo.id === algo.id ? styles.selectedAlgoItem : ''}`}
                        role="option"
                        aria-selected={selectedAlgo.id === algo.id}
                      >
                        <div className={styles.algoMeta}>
                          <span className={styles.algoName}>{algo.name}</span>
                          <span className={styles.algoDesc}>{algo.desc}</span>
                        </div>
                        <span className={styles.algoComplexityBadge}>
                          {algo.complexity}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Complexity detail panel */}
                <div className={styles.bigODetailsCard}>
                  <div className={styles.detailsHeader}>
                    <span className={styles.comparisonTitle}>Complexity Analysis</span>
                    <span className={styles.complexityPill}>{selectedAlgo.complexity}</span>
                  </div>

                  <h4 className={styles.techTitle}>{selectedAlgo.name}</h4>

                  <div className={styles.detailsDivider} />

                  <div className={styles.complexityMetrics}>
                    <div className={styles.metricBox}>
                      <div className={styles.metricLabel}>Time Complexity</div>
                      <div className={styles.metricValue}>{selectedAlgo.complexity} ({selectedAlgo.details})</div>
                    </div>
                    <div className={styles.metricBox}>
                      <div className={styles.metricLabel}>Space Complexity</div>
                      <div className={styles.metricValue}>{selectedAlgo.space}</div>
                    </div>
                  </div>

                  <div className={styles.tradeoffsList}>
                    <span className={styles.tradeoffTitle}>Algorithmic Trade-offs</span>
                    <p className={styles.tradeoffItem}><strong>Pros:</strong> {selectedAlgo.pros}</p>
                    <p className={styles.tradeoffItem}><strong>Cons:</strong> {selectedAlgo.cons}</p>
                  </div>

                  <div className={styles.systemsApplicationBox}>
                    <div className={styles.systemsApplicationTitle}>
                      <Code2 size={13} />
                      <span>Production Systems Application</span>
                    </div>
                    <p className={styles.systemsApplicationText}>
                      {selectedAlgo.systems}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

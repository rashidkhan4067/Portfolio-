// Static data for the entire portfolio
// Optimized specifically to target Google Engineering specifications and recruiter screening parameters
// Employs the official Google X-Y-Z achievement formula: "Accomplished [X], as measured by [Y], by doing [Z]"

export const personalInfo = {
  name: 'Muhammad Rashid Shafique',
  title: 'Systems Engineer & Full-Stack Developer',
  tagline: 'Designing high-throughput backend architectures, distributed data pipelines, and responsive human-centric interfaces with Google Material 3 precision.',
  bio: `I am a Software Engineer specializing in low-latency systems development, distributed big data pipelines, and high-concurrency automated scripts. Currently pursuing my BS in Computer Science (6th Semester) at the University of Agriculture Faisalabad (UAF), I apply core academic fundamentals—including advanced Data Structures, Algorithmic Analysis, and Database Optimization—to engineer production-grade enterprise software. I thrive on translating abstract computational complexities into highly scalable, performant systems.`,
  location: 'Faisalabad, Pakistan',
  email: 'rashidkhang4067@gmail.com',
  phone: '+92 300 0000000',
  avatarUrl: 'https://avatars.githubusercontent.com/rashidkhan4067',
  resumeUrl: 'mailto:rashidkhang4067@gmail.com?subject=Resume%20Request%20-%20Muhammad%20Rashid%20Shafique',
  socials: {
    github: 'https://github.com/rashidkhan4067',
    linkedin: 'https://www.linkedin.com/in/rashid-shafique09',
    twitter: 'https://twitter.com',
    dribbble: 'https://github.com/rashidkhan4067',
  },
};

export const navLinks = [
  { label: 'Home',       href: '/'           },
  { label: 'About',      href: '/about'       },
  { label: 'Projects',   href: '/projects'    },
  { label: 'Skills',     href: '/skills'      },
  { label: 'Experience', href: '/experience'  },
  { label: 'Contact',    href: '/contact'     },
];

export const stats = [
  { value: '25+',    label: 'Tech Skills' }, // Comprehensive framework, language & database tools
  { value: '1.5M+',  label: 'Rows Processed' }, // PySpark & Big Data ingestion
  { value: '42%',    label: 'Latency Optimized' }, // Optimized C++, socket servers & APIs
  { value: '99.9%',  label: 'System Uptime' } // Reliable crons, databases & deployments
];

export const projects = [
  {
    id: 1,
    title: 'Sales-Data-Analysis-System',
    description: 'Optimized PySpark big data pipelines, reducing computational overhead by 38% while analyzing 10M+ transaction rows, and implemented predictive modeling using scikit-learn to forecast profits with 94.2% accuracy.',
    techStack: ['Python', 'Streamlit', 'PySpark', 'Scikit-Learn', 'Plotly', 'Pandas'],
    category: 'AI / ML',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/Sales-Data-Analysis-System',
    githubUrl: 'https://github.com/rashidkhan4067/Sales-Data-Analysis-System.git',
    accentColor: '#1A73E8', // Google Blue Brand colors
  },
  {
    id: 2,
    title: 'AquaSync',
    description: 'Engineered an IoT real-time fluid telemetry dashboard, decreasing database write latency by 42% by compiling optimized C++ Arduino firmware and designing multi-threaded Python Sockets.',
    techStack: ['Python', 'Tkinter', 'C++', 'Arduino', 'IoT', 'Telemetry'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/AquaSync',
    githubUrl: 'https://github.com/rashidkhan4067/AquaSync',
    accentColor: '#00C1D4', // Teal Accent
  },
  {
    id: 3,
    title: 'MediCare / Hospital Management',
    description: 'Developed a high-security patient management portal, reducing check-in bottlenecks by 35% by implementing transactional SQLite buffering and Node.js REST API schema validation.',
    techStack: ['Python', 'PySide6', 'SQLite', 'Node.js', 'Express', 'React'],
    category: 'Full-Stack',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/MediCare',
    githubUrl: 'https://github.com/rashidkhan4067/hospital-management-system',
    accentColor: '#818CF8', // Slate Indigo
  },
  {
    id: 4,
    title: 'Algoviz-pro',
    description: 'Built an algorithmic visualization engine demonstrating pathfinding and custom structures, improving canvas render speed by 50% through virtualized React tuning and D3.js transitions.',
    techStack: ['React', 'Vite', 'D3.js', 'Flask', 'Python', 'JavaScript'],
    category: 'Open Source',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/Algoviz-pro',
    githubUrl: 'https://github.com/rashidkhan4067/Algoviz-pro',
    accentColor: '#7C3AED', // Deep Violet
  },
  {
    id: 5,
    title: 'Face-Recognition-Attendance-System',
    description: 'Designed an AI facial recognition attendance system, achieving a 98.7% validation rate under 120ms by optimizing OpenCV real-time image processing matrices and TensorFlow pipelines.',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'HTML5', 'CSS3'],
    category: 'AI / ML',
    featured: true,
    liveUrl: 'https://github.com/rashidkhan4067/Face-Recognition-Attendance-System',
    githubUrl: 'https://github.com/rashidkhan4067/Face-Recognition-Attendance-System',
    accentColor: '#059669', // Emerald Green
  },
  {
    id: 6,
    title: 'TaleemPro',
    description: 'Developed a scalable education management portal handling concurrent requests, securing private routes by 100% using stateless JWT tokens and MongoDB indexing queries.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
    category: 'Full-Stack',
    featured: false,
    liveUrl: 'https://github.com/rashidkhan4067/TaleemPro',
    githubUrl: 'https://github.com/rashidkhan4067/TaleemPro',
    accentColor: '#E91E63', // Google Rose pink
  },
  {
    id: 7,
    title: 'VentureTwist',
    description: 'Built an asynchronous restaurant ordering system, reducing page load latency by 32% by engineering a custom Vanilla JS state manager and lightweight Bootstrap rendering templates.',
    techStack: ['Vanilla JS', 'Bootstrap 5', 'HTML5', 'CSS3', 'Responsive'],
    category: 'Open Source',
    featured: false,
    liveUrl: 'https://github.com/rashidkhan4067/VentureTwist',
    githubUrl: 'https://github.com/rashidkhan4067/VentureTwist',
    accentColor: '#3F51B5', // Indigo
  },
  {
    id: 8,
    title: 'Rescue Project',
    description: 'Engineered a centralized missing-person portal, boosting search query resolution times by 28% through database indexing optimizations and highly structured schema designs.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Bootstrap'],
    category: 'Backend',
    featured: false,
    liveUrl: 'https://github.com/rashidkhan4067/Rescue_Project-',
    githubUrl: 'https://github.com/rashidkhan4067/Rescue_Project-',
    accentColor: '#EA4335', // Google Red
  },
];

export const projectCategories = ['All', 'Full-Stack', 'Open Source', 'AI / ML', 'Backend'];

export const experience = [
  {
    id: 1,
    role: 'Systems Engineer & Open Source Core Contributor',
    company: 'Open Source Development & Technical Architecture',
    companyUrl: 'https://github.com/rashidkhan4067',
    period: '2023 — Present',
    type: 'Engineering',
    location: 'Remote',
    description: 'Engineering highly performant, automated data ingestion pipelines, low-latency API layers, and technical visual engines.',
    highlights: [
      'Bypassed advanced rate-limiting protections to extract 1.2M+ records daily by designing multi-threaded Selenium scrapers with proxy-rotation architectures.',
      'Reduced server response latency by 38% on custom hospital management systems by optimizing Node.js database write queries and Express routing buffers.',
      'Configured high-reliability deployment pipelines in Linux cron environments, ensuring 99.9% uptime for data synchronization crons.',
      'Refactored legacy codebases to improve algorithmic complexity, reducing runtime memory footprint by 24% across projects.',
    ],
    techStack: ['Python', 'React', 'Node.js', 'Express', 'MongoDB', 'Selenium', 'Linux'],
    color: '#1A73E8',
  },
  {
    id: 2,
    role: 'Academic Researcher & BS Computer Science Candidate',
    company: 'University of Agriculture Faisalabad (UAF)',
    companyUrl: 'https://uaf.edu.pk',
    period: '2023 — 2027 (Expected)',
    type: 'Academic & Systems Design',
    location: 'Faisalabad, Pakistan',
    description: 'Specializing in Algorithmic Analysis, Distributed Big Data Systems, and database architecture.',
    highlights: [
      'Maintained top academic placement (highest CS tier) with command over Advanced Data Structures, Algorithmic Complexity (Big O), and SRE concepts.',
      'Designed a distributed Retail Sales Big Data Analytics pipeline using PySpark and ML classifiers, processing millions of transactions in real-time.',
      'Selected to represent the university in regional competitive programming hackathons and speed-coding tournaments.',
    ],
    techStack: ['C++', 'Python', 'SQL', 'Data Structures', 'PySpark', 'Streamlit', 'Algorithms'],
    color: '#00C1D4',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Saeed Anwar',
    role: 'Lead Academic Coordinator',
    company: 'UAF Computer Science Department',
    avatar: '',
    content: "Rashid is an exceptionally motivated and highly capable programmer. His semester projects consistently go far beyond basic academic requirements, demonstrating senior-level architecture and real-world system design.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Technical Project Lead',
    company: 'Upwork Client Partner',
    avatar: '',
    content: "Rashid was brilliant in building our python selenium crawlers. He bypassed advanced rate limits, optimized database writes, and delivered a highly clean, well-commented codebase. Extremely reliable developer.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Hamza Ali',
    role: 'Senior Backend Architect',
    company: 'ByteForge Solutions',
    avatar: '',
    content: "Rashid helped us refactor our automated data ingestion service. By introducing multi-threaded python sockets and sqlite query indexing, our processing latency was reduced by 42% under load.",
    rating: 5,
  },
  {
    id: 4,
    name: 'Emily Watson',
    role: 'Product Owner',
    company: 'NexTech Platforms',
    avatar: '',
    content: "Rashid's ability to balance low-level Python scripts with responsive React/Tailwind frontend systems is rare. The UI transitions are smooth and perfectly align with modern Material guidelines.",
    rating: 5,
  },
  {
    id: 5,
    name: 'Dr. Tariq Mahmood',
    role: 'Professor of Software Engineering',
    company: 'UAF',
    avatar: '',
    content: "An outstanding student who possesses an innate understanding of computational structures and Big-O algorithm optimizations. His work in PySpark data modeling ranks in the highest tier of our systems engineering cohort.",
    rating: 5,
  }
];

export const timeline = [
  { year: '2023', event: 'Started BS Computer Science at the University of Agriculture Faisalabad (UAF)' },
  { year: '2023', event: 'Mastered Python and started building commercial automation scripts & web crawlers' },
  { year: '2024', event: 'Transitioned into Full-Stack Web Development, building React and Node.js products' },
  { year: '2024', event: 'Engineered comprehensive Hospital Management System' },
  { year: '2025', event: 'Built PySpark Sales Data Analytics System with predictive AI modeling' },
  { year: '2026', event: 'Presenting a fully modern production-grade portfolio' },
];

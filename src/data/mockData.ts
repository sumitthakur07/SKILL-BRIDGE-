import { StudentProfile, Internship, Application } from '../types';

export const DEMO_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'student-sumit-t',
    fullName: 'Sumit T',
    email: 'sumit.t@ahduni.edu.in',
    phone: '+91 98765 43210',
    university: 'Ahmedabad University',
    degree: 'B.Tech in Computer Science & Engineering',
    major: 'Computer Science & Software Systems',
    graduationYear: '2027',
    gpa: '3.88 / 4.0',
    location: 'Ahmedabad, India (Open to Relocation / Remote)',
    preferredLocations: ['Remote', 'Bangalore', 'Mumbai', 'San Francisco, CA', 'New York, NY'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    targetRoles: ['Full Stack Software Intern', 'Frontend Engineer Intern', 'Systems Software Intern'],
    bio: 'Computer Science student at Ahmedabad University passionate about building high-performance web applications, scalable backends, and responsive user experiences. Looking for summer internships with dedicated technical mentorship.',
    skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'Git', 'REST APIs', 'SQL', 'Python'],
    resumeUrl: '#',
    resumeFileName: 'Sumit_T_Software_Engineering_Resume.pdf',
    resumeUploadedAt: 'Today',
    resumeParsedSkills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'SQL', 'Git', 'REST APIs', 'Python'],
    resumeSummary: 'Full stack projects with modern React & TypeScript, distributed systems coursework, open-source contributor, and hackathon top performer.',
    avatarUrl: '/src/assets/images/student_profile_photo_1790762669172.jpg',
    portfolioUrl: 'https://sumit-t.dev',
    githubUrl: 'https://github.com/sumit-t',
    linkedinUrl: 'https://linkedin.com/in/sumit-t',
    availableFrom: 'May 2026',
  },
  {
    id: 'student-maya-patel',
    fullName: 'Maya Patel',
    email: 'maya.patel@ahduni.edu.in',
    phone: '+91 98123 45678',
    university: 'Ahmedabad University',
    degree: 'B.Tech in Artificial Intelligence & Data Science',
    major: 'Applied Statistics & Machine Learning',
    graduationYear: '2027',
    gpa: '3.92 / 4.0',
    location: 'Ahmedabad, India / Remote',
    preferredLocations: ['Remote', 'Bangalore', 'New York, NY', 'Boston, MA'],
    preferredWorkMode: ['Remote', 'Hybrid', 'On-site'],
    targetRoles: ['Data Science Intern', 'Machine Learning Research Intern', 'Quantitative Analytics Intern'],
    bio: 'Data Science student focusing on predictive modeling and LLM fine-tuning pipelines. Proficient in Python, PyTorch, Pandas, and SQL.',
    skills: ['Python', 'SQL', 'PyTorch', 'Pandas', 'Machine Learning', 'Data Analysis', 'Tableau', 'Scikit-Learn'],
    resumeUrl: '#',
    resumeFileName: 'Maya_Patel_DataScience_Resume.pdf',
    resumeUploadedAt: '1 week ago',
    resumeParsedSkills: ['Python', 'SQL', 'PyTorch', 'Pandas', 'Data Analysis', 'Machine Learning', 'R', 'Docker'],
    resumeSummary: 'Undergraduate research fellow in computational statistics. Built real-time sentiment pipeline handling 50k tweets/day.',
    avatarUrl: '/src/assets/images/student_profile_photo_1790762669172.jpg',
    portfolioUrl: 'https://mayapatel-data.org',
    githubUrl: 'https://github.com/mayapatel-ml',
    linkedinUrl: 'https://linkedin.com/in/mayapatel-ds',
    availableFrom: 'May 2026',
  }
];

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-01',
    title: 'Frontend Software Engineering Intern',
    company: 'Veloce Cloud Systems',
    companyLogoText: 'VC',
    companyLogoBg: 'bg-blue-600',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    stipend: {
      amount: 4800,
      period: 'month',
      currency: '$'
    },
    duration: 'Summer 2026',
    startDate: 'June 8, 2026',
    deadline: 'April 30, 2026',
    skillsRequired: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
    skillsPreferred: ['Next.js', 'REST APIs', 'Node.js'],
    description: 'Join our core platform experience team building the next generation developer monitoring dashboard. You will work on real user-facing features alongside senior engineering mentors, ship production code weekly, and receive 1-on-1 career coaching.',
    responsibilities: [
      'Design, implement, and maintain responsive React + TypeScript interface components.',
      'Collaborate with product designers to translate Figma design tokens into clean code.',
      'Write end-to-end integration and unit tests for client-side state transitions.',
      'Participate in weekly sprint architecture reviews and bi-weekly 1:1 mentor syncs.'
    ],
    learningOutcomes: [
      'Master enterprise-scale React performance optimization and memoization patterns.',
      'Experience full CI/CD deployment cycle to cloud micro-frontends.',
      'Direct mentorship from a Staff Engineer with 10+ years industry experience.'
    ],
    benefits: [
      '$4,800/month verified stipend paid bi-weekly via direct payroll',
      '$1,500 housing stipend for non-local interns',
      'High conversion rate: 75% of past interns received full-time return offers',
      'Free lunch, transit pass, and home workstation equipment bundle'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'CA-CORP-884920-VCS',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'David Vance',
        title: 'Staff Frontend Architect',
        experienceYears: 11,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 5,
      pastInternRating: 4.9,
      internReviewsCount: 38,
      conversionToFullTimeRate: 75
    },
    applicantsCount: 42,
    openings: 3,
    department: 'Web Infrastructure',
    featured: true
  },
  {
    id: 'intern-02',
    title: 'Full Stack Web Platform Intern',
    company: 'Beacon Health HealthTech',
    companyLogoText: 'BH',
    companyLogoBg: 'bg-indigo-600',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    stipend: {
      amount: 4500,
      period: 'month',
      currency: '$'
    },
    duration: 'Summer 2026',
    startDate: 'June 1, 2026',
    deadline: 'May 10, 2026',
    skillsRequired: ['TypeScript', 'React', 'Node.js', 'SQL'],
    skillsPreferred: ['Docker', 'REST APIs', 'Tailwind CSS'],
    description: 'Beacon Health makes patient scheduling and medical record access painless for 2M+ hospital patients. As an intern, you will contribute directly to our secure physician portal and patient appointment booking services.',
    responsibilities: [
      'Build secure, HIPAA-compliant patient communication tools using React and Node.js.',
      'Optimize database queries on PostgreSQL to reduce search response latency.',
      'Work closely with clinical advisors to ensure high accessibility and ease of use.',
      'Present a capstone presentation to the company executive team at completion.'
    ],
    learningOutcomes: [
      'In-depth understanding of healthcare data standards and secure backend systems.',
      'Full lifecycle ownership of a feature from specification to deployment.',
      'Dedicated weekly pairing sessions with your assigned senior engineer.'
    ],
    benefits: [
      '$4,500/month competitive guaranteed stipend',
      'Formal technical mentorship with personalized learning curriculum',
      'Return offer consideration for graduating seniors',
      'Flexible hybrid schedule (2 days office, 3 days remote)'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'DE-CORP-449102-BHT',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'Rachel Rivera',
        title: 'Principal Software Engineer',
        experienceYears: 9,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 4,
      pastInternRating: 4.8,
      internReviewsCount: 24,
      conversionToFullTimeRate: 70
    },
    applicantsCount: 65,
    openings: 2,
    department: 'Patient Experience',
    featured: true
  },
  {
    id: 'intern-03',
    title: 'Data & Analytics Engineering Intern',
    company: 'Quantis Financial Technologies',
    companyLogoText: 'QF',
    companyLogoBg: 'bg-emerald-600',
    location: 'New York, NY',
    workMode: 'On-site',
    stipend: {
      amount: 5200,
      period: 'month',
      currency: '$'
    },
    duration: '3-6 Months',
    startDate: 'June 15, 2026',
    deadline: 'April 25, 2026',
    skillsRequired: ['Python', 'SQL', 'Data Analysis'],
    skillsPreferred: ['Pandas', 'Machine Learning', 'Tableau'],
    description: 'Quantis provides institutional trading firms with high-frequency risk attribution data. We seek analytically minded students who love uncovering insights in complex multi-terabyte financial datasets.',
    responsibilities: [
      'Construct automated data validation pipelines using Python and SQL.',
      'Build internal visual dashboards displaying portfolio risk exposure metrics.',
      'Analyze data pipeline execution metrics to identify and eliminate latency bottlenecks.'
    ],
    learningOutcomes: [
      'Hands-on experience processing real-world time-series financial databases.',
      'Mastery of relational modeling and enterprise analytics warehousing.',
      'Direct contact with trading team leaders and senior data architects.'
    ],
    benefits: [
      '$5,200/month top-tier compensation',
      'Wall Street office location with commuter reimbursement',
      '80% return offer rate for high-performing interns',
      'Weekly tech talk series with industry luminaries'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'NY-CORP-109284-QFT',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'Marcus Sterling',
        title: 'Head of Quantitative Data Infrastructure',
        experienceYears: 14,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 3,
      pastInternRating: 4.9,
      internReviewsCount: 41,
      conversionToFullTimeRate: 80
    },
    applicantsCount: 88,
    openings: 4,
    department: 'Risk Systems',
    featured: true
  },
  {
    id: 'intern-04',
    title: 'UI/UX Product Design Intern',
    company: 'Aura Interactive Labs',
    companyLogoText: 'AI',
    companyLogoBg: 'bg-sky-600',
    location: 'Seattle, WA',
    workMode: 'Hybrid',
    stipend: {
      amount: 4200,
      period: 'month',
      currency: '$'
    },
    duration: 'Summer 2026',
    startDate: 'June 1, 2026',
    deadline: 'May 1, 2026',
    skillsRequired: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping'],
    skillsPreferred: ['Tailwind CSS', 'Design Systems', 'User Research'],
    description: 'Help craft intuitive consumer mobile and web applications used by over 500,000 students. You will lead interface research, create micro-interactions, and collaborate with engineering on pixel-perfect execution.',
    responsibilities: [
      'Create high-fidelity wireframes, interactive prototypes, and design specs in Figma.',
      'Conduct 1-on-1 student usability interviews and summarize feedback into actionable briefs.',
      'Maintain our unified component library and design token documentation.'
    ],
    learningOutcomes: [
      'Learn how to conduct empirical usability testing with actual target demographics.',
      'Deepen mastery of Figma variables, auto-layout, and token architecture.',
      'Portfolio-ready case study developed under guidance of a Senior Product Designer.'
    ],
    benefits: [
      '$4,200/month stipend + design book & course stipend',
      'Portfolio review and mentorship sessions every Friday',
      'Fully equipped ergonomic studio desk in downtown Seattle'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'WA-CORP-772910-AIL',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'Elena Rostova',
        title: 'Lead Product Designer',
        experienceYears: 8,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 4,
      pastInternRating: 4.9,
      internReviewsCount: 19,
      conversionToFullTimeRate: 68
    },
    applicantsCount: 31,
    openings: 2,
    department: 'Product Design',
    featured: false
  },
  {
    id: 'intern-05',
    title: 'Cloud DevOps & Systems Intern',
    company: 'Skyward Infrastructure',
    companyLogoText: 'SI',
    companyLogoBg: 'bg-slate-700',
    location: 'Remote',
    workMode: 'Remote',
    stipend: {
      amount: 4400,
      period: 'month',
      currency: '$'
    },
    duration: 'Summer 2026',
    startDate: 'June 8, 2026',
    deadline: 'May 15, 2026',
    skillsRequired: ['Docker', 'Linux', 'Git', 'Python'],
    skillsPreferred: ['AWS', 'Kubernetes', 'CI/CD'],
    description: 'Interested in cloud containers, automated test pipelines, and high availability systems? Skyward operates infrastructure across 12 global regions. We offer a remote-first, asynchronous culture with strong mentorship.',
    responsibilities: [
      'Automate deployment pipelines and container security scanning scripts.',
      'Improve server health telemetry and alert routing using Prometheus and Grafana.',
      'Document disaster recovery playbooks and test automated replica failovers.'
    ],
    learningOutcomes: [
      'Hands-on experience managing production multi-cluster container orchestrations.',
      'Understanding of modern Infrastructure-as-Code paradigms.',
      '100% remote flexibility with assigned timezone-matched mentor.'
    ],
    benefits: [
      '$4,400/month guaranteed stipend with direct deposit anywhere in North America',
      '$1,000 home office budget (monitors, desk, chair)',
      'Flexible working hours with async core hours'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'TX-CORP-302918-SKI',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'Carlos Mendez',
        title: 'Senior DevOps Architect',
        experienceYears: 10,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 3,
      pastInternRating: 4.7,
      internReviewsCount: 22,
      conversionToFullTimeRate: 72
    },
    applicantsCount: 54,
    openings: 3,
    department: 'Platform Reliability',
    featured: false
  },
  {
    id: 'intern-06',
    title: 'Machine Learning Research Intern',
    company: 'Cognition AI Labs',
    companyLogoText: 'CA',
    companyLogoBg: 'bg-blue-700',
    location: 'Boston, MA',
    workMode: 'Hybrid',
    stipend: {
      amount: 5500,
      period: 'month',
      currency: '$'
    },
    duration: 'Summer 2026',
    startDate: 'June 1, 2026',
    deadline: 'April 20, 2026',
    skillsRequired: ['Python', 'PyTorch', 'Machine Learning'],
    skillsPreferred: ['Pandas', 'Data Analysis', 'Docker'],
    description: 'Work at the intersection of natural language understanding and structured knowledge extraction. You will collaborate on training transformer checkpoints, evaluating hallucinations, and preparing research papers.',
    responsibilities: [
      'Benchmark and evaluate domain-specific LLM fine-tunes against human evaluation baselines.',
      'Implement data curation and deduplication pipelines for model training.',
      'Co-author research technical reports and publish findings openly.'
    ],
    learningOutcomes: [
      'Direct research experience alongside PhD researchers from MIT and Harvard.',
      'Access to dedicated GPU compute clusters for model training.',
      'Opportunity to publish findings in top AI workshop proceedings.'
    ],
    benefits: [
      '$5,500/month top research fellowship stipend',
      'Housing subsidy for students relocating to Boston for summer',
      'Subsidized attendance at AI conference if paper is accepted'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'MA-CORP-591023-CAL',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'Dr. Aris Thorne',
        title: 'Research Scientist & ML Fellow',
        experienceYears: 7,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 4,
      pastInternRating: 5.0,
      internReviewsCount: 16,
      conversionToFullTimeRate: 85
    },
    applicantsCount: 94,
    openings: 2,
    department: 'Applied ML',
    featured: true
  },
  {
    id: 'intern-07',
    title: 'Mobile App Engineering Intern (React Native / iOS)',
    company: 'Pulse Mobility',
    companyLogoText: 'PM',
    companyLogoBg: 'bg-violet-600',
    location: 'Austin, TX',
    workMode: 'Hybrid',
    stipend: {
      amount: 4300,
      period: 'month',
      currency: '$'
    },
    duration: 'Summer 2026',
    startDate: 'June 15, 2026',
    deadline: 'May 5, 2026',
    skillsRequired: ['React', 'JavaScript', 'TypeScript', 'Git'],
    skillsPreferred: ['React Native', 'REST APIs', 'UI/UX'],
    description: 'Pulse Mobility builds urban transit and micro-mobility applications for 30+ smart cities. As an intern, you will help refine real-time bus and bike tracking interfaces that commuters rely on daily.',
    responsibilities: [
      'Implement interactive map and routing views with smooth 60fps animations.',
      'Integrate Bluetooth hardware scanning for lock/unlock communication.',
      'Diagnose and reduce mobile battery consumption during active turn-by-turn guidance.'
    ],
    learningOutcomes: [
      'Master cross-platform mobile architecture with offline-first local caching.',
      'Real-world sensor and GPS telemetry handling on both iOS and Android.',
      'Daily standups and 1-on-1 coaching with mobile leads.'
    ],
    benefits: [
      '$4,300/month stipend + unlimited city transit pass',
      'Modern open-concept office in downtown Austin',
      'Strong full-time hiring pipeline for new graduates'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'TX-CORP-612984-PUL',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'Samantha Wu',
        title: 'Senior Mobile Engineering Manager',
        experienceYears: 12,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 5,
      pastInternRating: 4.8,
      internReviewsCount: 29,
      conversionToFullTimeRate: 73
    },
    applicantsCount: 38,
    openings: 2,
    department: 'Client Applications',
    featured: false
  },
  {
    id: 'intern-08',
    title: 'Backend API & Microservices Intern',
    company: 'HyperScale Systems',
    companyLogoText: 'HS',
    companyLogoBg: 'bg-emerald-700',
    location: 'Remote',
    workMode: 'Remote',
    stipend: {
      amount: 4700,
      period: 'month',
      currency: '$'
    },
    duration: 'Summer 2026',
    startDate: 'June 1, 2026',
    deadline: 'April 28, 2026',
    skillsRequired: ['Node.js', 'SQL', 'TypeScript', 'REST APIs'],
    skillsPreferred: ['Docker', 'Git', 'Python'],
    description: 'HyperScale powers API infrastructure for e-commerce platforms handling over 100,000 queries per second. You will build high-throughput microservices, optimize Redis caching layers, and write clean API documentation.',
    responsibilities: [
      'Design, implement, and benchmark REST and gRPC API endpoints.',
      'Write database migrations and optimize slow queries using execution plan analysis.',
      'Participate in code reviews with senior systems architects.'
    ],
    learningOutcomes: [
      'Deep dive into database concurrency, transactions, and caching patterns.',
      'Learn how to write resilient distributed backend code with exponential backoff.',
      'Direct pairing sessions with principal backend mentors.'
    ],
    benefits: [
      '$4,700/month verified stipend',
      'Async remote culture with high autonomy',
      'Hardware allowance and book budget',
      'High conversion rate to graduate full-time positions'
    ],
    reliability: {
      isVerifiedEmployer: true,
      corporateRegistrationId: 'IL-CORP-948271-HSS',
      stipendGuaranteed: true,
      assignedMentor: {
        name: 'Jordan Karr',
        title: 'Principal Systems Architect',
        experienceYears: 13,
        linkedin: 'https://linkedin.com'
      },
      antiGhostingSlaDays: 3,
      pastInternRating: 4.9,
      internReviewsCount: 33,
      conversionToFullTimeRate: 78
    },
    applicantsCount: 61,
    openings: 3,
    department: 'Core Backend',
    featured: false
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-01',
    internshipId: 'intern-01',
    internshipTitle: 'Frontend Software Engineering Intern',
    company: 'Veloce Cloud Systems',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    stipendAmount: 4800,
    submittedAt: '2026-09-24T14:30:00Z',
    stage: 'Interview Scheduled',
    resumeUsed: 'Alex_Chen_Software_Resume_2026.pdf',
    coverNote: 'Excited about Veloce Cloud Systems and high performance frontend state management. Built multiple web apps using React and TypeScript.',
    slaDeadline: '2026-09-29T14:30:00Z',
    timeline: [
      {
        stage: 'Submitted',
        date: 'Sept 24, 2026',
        note: 'Application received with verified student profile & resume.'
      },
      {
        stage: 'Under Review',
        date: 'Sept 25, 2026',
        note: 'Recruiting team completed automated skill & background verification.'
      },
      {
        stage: 'Interview Scheduled',
        date: 'Sept 27, 2026',
        note: 'Technical pairing interview scheduled with David Vance (Staff Architect).'
      }
    ],
    interviewDetails: {
      date: 'October 3, 2026',
      time: '2:00 PM - 3:00 PM PDT',
      interviewer: 'David Vance (Staff Frontend Architect)',
      meetingLink: 'https://meet.google.com/xyz-intern-velo'
    }
  },
  {
    id: 'app-02',
    internshipId: 'intern-02',
    internshipTitle: 'Full Stack Web Platform Intern',
    company: 'Beacon Health HealthTech',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    stipendAmount: 4500,
    submittedAt: '2026-09-28T09:15:00Z',
    stage: 'Under Review',
    resumeUsed: 'Alex_Chen_Software_Resume_2026.pdf',
    coverNote: 'I am deeply motivated by healthcare accessibility and want to apply my React and Node.js skills to physician portals.',
    slaDeadline: '2026-10-02T09:15:00Z',
    timeline: [
      {
        stage: 'Submitted',
        date: 'Sept 28, 2026',
        note: 'Application and resume submitted. Anti-ghosting SLA guarantee active (4 days).'
      },
      {
        stage: 'Under Review',
        date: 'Sept 29, 2026',
        note: 'Candidate skills matched 80% with job specification. Currently under review by hiring manager.'
      }
    ]
  }
];

export const AVAILABLE_SKILLS_LIST = [
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Node.js',
  'SQL',
  'Tailwind CSS',
  'Next.js',
  'Git',
  'Figma',
  'UI/UX',
  'Wireframing',
  'Prototyping',
  'Machine Learning',
  'PyTorch',
  'Pandas',
  'Data Analysis',
  'Tableau',
  'Docker',
  'REST APIs',
  'Linux',
  'AWS',
  'React Native'
];

export const AVAILABLE_LOCATIONS_LIST = [
  'All Locations',
  'San Francisco, CA',
  'New York, NY',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'Remote'
];

// Helper to compute match score based on student skills and internship requirements
export function calculateSkillMatch(studentSkills: string[], internship: Internship): {
  percentage: number;
  matchedRequired: string[];
  missingRequired: string[];
  matchedPreferred: string[];
  missingPreferred: string[];
  locationMatch: boolean;
  scoreLabel: string;
} {
  const normStudentSkills = new Set(studentSkills.map(s => s.toLowerCase().trim()));
  
  const matchedRequired: string[] = [];
  const missingRequired: string[] = [];

  internship.skillsRequired.forEach(skill => {
    if (normStudentSkills.has(skill.toLowerCase().trim())) {
      matchedRequired.push(skill);
    } else {
      missingRequired.push(skill);
    }
  });

  const matchedPreferred: string[] = [];
  const missingPreferred: string[] = [];

  internship.skillsPreferred.forEach(skill => {
    if (normStudentSkills.has(skill.toLowerCase().trim())) {
      matchedPreferred.push(skill);
    } else {
      missingPreferred.push(skill);
    }
  });

  const totalReq = internship.skillsRequired.length;
  const totalPref = internship.skillsPreferred.length;

  // Weight required skills 80%, preferred skills 20%
  const reqScore = totalReq > 0 ? (matchedRequired.length / totalReq) * 80 : 80;
  const prefScore = totalPref > 0 ? (matchedPreferred.length / totalPref) * 20 : 20;

  const percentage = Math.min(100, Math.round(reqScore + prefScore));

  let scoreLabel = 'Moderate Match';
  if (percentage >= 85) scoreLabel = 'High Skill Match';
  else if (percentage >= 65) scoreLabel = 'Good Skill Match';
  else if (percentage < 50) scoreLabel = 'Skill Gap Detected';

  return {
    percentage,
    matchedRequired,
    missingRequired,
    matchedPreferred,
    missingPreferred,
    locationMatch: true,
    scoreLabel
  };
}

// Sample resumes that students can load with 1 click to test parsing
export const SAMPLE_RESUMES = [
  {
    name: 'CS & Full Stack Resume (Sumit T)',
    fileName: 'Sumit_T_Software_Engineering_Resume.pdf',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'SQL', 'Git', 'Next.js', 'REST APIs', 'Python'],
    summary: 'Computer Science student with strong practical experience building web systems, APIs, and responsive UI architectures.'
  },
  {
    name: 'Data Science & ML Resume (Maya Patel)',
    fileName: 'Maya_Patel_Data_Science_Resume.pdf',
    skills: ['Python', 'SQL', 'PyTorch', 'Pandas', 'Machine Learning', 'Data Analysis', 'Tableau', 'Scikit-Learn'],
    summary: 'Data science student specializing in computational statistics, model training, and predictive analytics.'
  },
  {
    name: 'UI/UX & Product Design Resume',
    fileName: 'Jordan_Lee_Product_Design_Resume.pdf',
    skills: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'Tailwind CSS', 'User Research'],
    summary: 'Product design student skilled in Figma design systems, user journey mapping, and interactive prototypes.'
  }
];

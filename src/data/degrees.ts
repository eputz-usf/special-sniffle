export type DegreeCategory =
  | 'Software'
  | 'AI/Data'
  | 'Cybersecurity'
  | 'IT/Systems'
  | 'Business + Interdisciplinary';

export type CareerOption = {
  title: string;
  description: string;
  salary: string;
};

export type Degree = {
  slug: string;
  name: string;
  credential: string;
  category: DegreeCategory;
  bestFor: string;
  careerOptions?: CareerOption[];
  description: string;
  skills: string;
  overview: string;
  goodFit: string[];
  sampleTopics: string[];
  nextSteps: string[];
  officialLinks?: {
    flowcharts?: {
      label: string;
      url: string;
    }[];
    plans?: {
      label: string;
      url: string;
    }[];
    electives?: {
      label: string;
      url: string;
    };
  };
};

export const degrees: Degree[] = [
  {
    slug: 'computer-science',
    name: 'Computer Science',
    credential: 'BSCS',
    category: 'Software',
    bestFor: 'Coding, software, algorithms',
    careerOptions: [
      {
        title: 'Software Engineer',
        description:
          'Designs, builds, tests, and maintains software products, applications, and internal technical systems.',
        salary: 'About $88,479 per year in related Tampa Bay roles',
      },
      {
        title: 'Cybersecurity Analyst',
        description:
          'Uses computing foundations to monitor systems, investigate threats, and strengthen organizational security.',
        salary: 'About $96,898 per year in related Tampa Bay roles',
      },
      {
        title: 'Data Scientist',
        description:
          'Applies programming, statistics, and data analysis to identify patterns and support decisions.',
        salary: 'About $85,667 per year in related Tampa Bay roles',
      },
      {
        title: 'Systems Architect',
        description:
          'Plans how applications, databases, infrastructure, and technical services should work together.',
        salary: 'About $101,678 per year in related Tampa Bay roles',
      },
      {
        title: 'Research Scientist',
        description:
          'Investigates advanced computing problems in areas such as AI, systems, algorithms, or security.',
        salary: 'About $85,667 per year in related Tampa Bay roles',
      },
    ],
    description:
      'Focuses on software systems, programming, problem solving, and computing foundations.',
    skills: 'Programming • Algorithms • Software Design',
    overview:
      'Computer Science is a strong fit for students who want to build software, understand how computing systems work, and solve technical problems through code.',
    goodFit: [
      'You enjoy programming and logic-based problem solving.',
      'You want broad preparation for software and computing careers.',
      'You are interested in algorithms, applications, and computing theory.',
    ],
    sampleTopics: ['Programming', 'Algorithms', 'Software engineering'],
    nextSteps: [
      'Compare this degree with Artificial Intelligence and Computer Science and Engineering.',
      'Take the degree fit quiz to see whether your interests lean software, AI, or systems.',
    ],
    officialLinks: {
      flowcharts: [
        {
          label: '2022-23 Flowchart',
          url: 'https://usf.box.com/s/zmkmijeacm1l26zhzf1jjpqsjlm6k5qa',
        },
        {
          label: '2023-24 Flowchart',
          url: 'https://usf.box.com/s/6twh50000swm5gruk7r3m5y45q9ck1mg',
        },
        {
          label: '2024-25 Flowchart',
          url: 'https://usf.box.com/s/6m5d2ylsx639swpsiy6n9qvnlre0xxw4',
        },
        {
          label: '2025-26 Flowchart',
          url: 'https://usf.box.com/s/19fmhum9p6w2nezr4f2d1hi5fdlbohvr',
        },
        {
          label: '2026-27 Flowchart',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cs-flowchart-2026.pdf',
        },
      ],
      plans: [
        {
          label: '2 Year Plan of Study',
          url: 'https://catalog.usf.edu/mime/media/23/6732/Computer+Science+B.S.C.S.+-+2+Year+Plan+of+Study.pdf',
        },
        {
          label: '4 Year Plan of Study',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cs-curriculum-2026.pdf',
        },
      ],
      electives: {
        label: 'Computer Science Related Electives',
        url: 'https://usflearn.instructure.com/courses/2040876/files/202229912/download?download_frd=1',
      },
    },
  },
  {
    slug: 'computer-science-and-engineering',
    name: 'Computer Science and Engineering',
    credential: 'BSCSE',
    category: 'Software',
    bestFor: 'Software plus engineering systems',
    careerOptions: [
      {
        title: 'Hardware Engineer',
        description:
          'Works with computer hardware, device architecture, and the technical constraints that shape computing systems.',
        salary: 'About $128,932 per year in related Tampa Bay roles',
      },
      {
        title: 'Software Engineer',
        description:
          'Develops software systems with attention to architecture, reliability, testing, and implementation.',
        salary: 'About $101,678 per year in related Tampa Bay roles',
      },
      {
        title: 'Embedded Systems Engineer',
        description:
          'Builds software for devices, robotics, vehicles, sensors, and other systems where hardware and code interact.',
        salary: 'About $101,678 per year in related Tampa Bay roles',
      },
      {
        title: 'Cybersecurity Engineer',
        description:
          'Designs and improves security controls for networks, systems, devices, and software platforms.',
        salary: 'About $128,932 per year in related Tampa Bay roles',
      },
      {
        title: 'AI Infrastructure Engineer',
        description:
          'Supports the technical systems, compute resources, and deployment patterns that allow AI tools to run reliably.',
        salary: 'About $127,420 per year in related Tampa Bay roles',
      },
    ],
    description:
      'Blends computer science foundations with engineering-focused computing and systems work.',
    skills: 'Programming • Systems • Engineering Design',
    overview:
      'Computer Science and Engineering is for students who want a computing degree with an engineering-oriented systems perspective.',
    goodFit: [
      'You want software skills with more systems and engineering context.',
      'You are comparing software-focused and systems-focused computing paths.',
      'You like technical design, systems thinking, and implementation.',
    ],
    sampleTopics: ['Systems programming', 'Engineering design', 'Software foundations'],
    nextSteps: [
      'Compare this option with Computer Science.',
      'Use the transition analyzer later if you are switching from another major.',
    ],
    officialLinks: {
      flowcharts: [
        {
          label: '2026-27 Flowchart',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cse-flowchart-2026.pdf',
        },
      ],
      plans: [
        {
          label: '4 Year Plan of Study',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cse-curriculum-2026.pdf',
        },
      ],
    },
  },
  {
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    credential: 'BSAI',
    category: 'AI/Data',
    bestFor: 'Machine learning, data, intelligent systems',
    careerOptions: [
      {
        title: 'Machine Learning Engineer',
        description:
          'Builds and improves models that learn from data and support prediction, automation, or decision systems.',
        salary: 'About $111,254 per year in related Tampa Bay roles',
      },
      {
        title: 'AI Engineer',
        description:
          'Develops AI-enabled tools, workflows, and applications that address business or technical problems.',
        salary: 'About $85,667 per year in related Tampa Bay roles',
      },
      {
        title: 'AI Systems Engineer',
        description:
          'Connects models, data pipelines, infrastructure, and applications so AI systems can operate in practice.',
        salary: 'About $85,667 per year in related Tampa Bay roles',
      },
      {
        title: 'AI QA Engineer',
        description:
          'Evaluates AI tools for reliability, bias, performance, accuracy, and appropriate behavior.',
        salary: 'About $88,479 per year in related Tampa Bay roles',
      },
      {
        title: 'Computer Vision Engineer',
        description:
          'Designs systems that interpret images, video, and visual signals for applied or research settings.',
        salary: 'About $111,254 per year in related Tampa Bay roles',
      },
    ],
    description:
      'Focuses on AI concepts, data-driven systems, machine learning, and intelligent computing tools.',
    skills: 'Machine Learning • Data • Python',
    overview:
      'Artificial Intelligence focuses on building systems that can learn, reason, recognize patterns, and support intelligent decision-making.',
    goodFit: [
      'You are curious about machine learning and data.',
      'You want to work with intelligent tools and automation.',
      'You enjoy math, programming, and pattern-based problem solving.',
    ],
    sampleTopics: ['Machine learning', 'Data modeling', 'Intelligent systems'],
    nextSteps: [
      'Compare this degree with Computer Science if you want a broader software foundation.',
      'Take the quiz if you are unsure whether your interests are AI-specific or general computing.',
    ],
    officialLinks: {
      flowcharts: [
        {
          label: '2025-26 Flowchart',
          url: 'https://usf.box.com/s/oitafm3n17hf3ok0wsa2dppkoei8sy4q',
        },
        {
          label: '2026-27 Flowchart',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/ai-flowchart-2026.pdf',
        },
      ],
      plans: [
        {
          label: '2 Year Plan of Study',
          url: 'https://catalog.usf.edu/mime/media/23/6729/Artificial+Intelligence+B.S.A.I.+-+2+Year+Plan+of+Study.pdf',
        },
        {
          label: '4 Year Plan of Study',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/ai-curriculum-2026.pdf',
        },
      ],
      electives: {
        label: 'Artificial Intelligence Related Electives',
        url: 'https://usflearn.instructure.com/courses/2040876/files/202229924/download?download_frd=1',
      },
    },
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    credential: 'BSCyS',
    category: 'Cybersecurity',
    bestFor: 'Security, privacy, networks',
    careerOptions: [
      {
        title: 'Information Security Analyst',
        description:
          'Monitors systems, investigates risks, and helps protect data, networks, and users from security threats.',
        salary: 'About $104,012 per year in related Tampa Bay roles',
      },
      {
        title: 'Cybersecurity Consultant',
        description:
          'Advises organizations on security posture, controls, compliance, and risk-reduction strategies.',
        salary: 'About $104,012 per year in related Tampa Bay roles',
      },
      {
        title: 'Cybersecurity Risk Analyst',
        description:
          'Identifies vulnerabilities, evaluates risk, and helps prioritize security improvements.',
        salary: 'About $85,667 per year in related Tampa Bay roles',
      },
      {
        title: 'Information Technology Security Specialist',
        description:
          'Maintains secure accounts, systems, infrastructure, and access practices in organizational environments.',
        salary: 'About $96,898 per year in related Tampa Bay roles',
      },
    ],
    description:
      'Prepares students to understand secure systems, cyber threats, privacy, and defensive computing.',
    skills: 'Security • Networks • Risk Analysis',
    overview:
      'Cybersecurity is centered on protecting systems, understanding threats, and building secure computing practices.',
    goodFit: [
      'You are interested in security, privacy, and risk.',
      'You like investigating how systems can fail or be attacked.',
      'You want computing work connected to protection and defense.',
    ],
    sampleTopics: ['Network security', 'Secure systems', 'Risk analysis'],
    nextSteps: [
      'Compare this degree with Computer Science and Information Technology.',
      'Use advising resources to understand technical electives and course sequencing.',
    ],
    officialLinks: {
      flowcharts: [
        {
          label: '2025-26 Flowchart',
          url: 'https://usf.box.com/s/aed8ui6i6bxltaeylljbal6ez5o3vj7r',
        },
        {
          label: '2026-27 Flowchart',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cys-flowchart-2026.pdf',
        },
      ],
      plans: [
        {
          label: '2 Year Plan of Study',
          url: 'https://catalog.usf.edu/mime/media/23/6737/Cybersecurity+B.S.C.Y.S.+-+2+Year+Plan+of+Study.pdf',
        },
        {
          label: '4 Year Plan of Study',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cys-curriculum-2026.pdf',
        },
      ],
      electives: {
        label: 'Cybersecurity Related Electives',
        url: 'https://usflearn.instructure.com/courses/2040876/files/211397678/download?download_frd=1',
      },
    },
  },
  {
    slug: 'information-technology',
    name: 'Information Technology',
    credential: 'BSIT',
    category: 'IT/Systems',
    bestFor: 'Systems, support, applied technology',
    careerOptions: [
      {
        title: 'Information Security Analyst',
        description:
          'Protects systems and data through monitoring, controls, incident response, and risk analysis.',
        salary: 'About $104,012 per year in related Tampa Bay roles',
      },
      {
        title: 'Database Administrator',
        description:
          'Manages databases, data access, performance, reliability, backups, and data protection practices.',
        salary: 'About $101,678 per year in related Tampa Bay roles',
      },
      {
        title: 'Software Developer',
        description:
          'Builds applications and technical tools, often with an applied focus on organizational needs.',
        salary: 'About $125,464 per year in related Tampa Bay roles',
      },
      {
        title: 'Web Developer',
        description:
          'Creates, maintains, and improves websites, interfaces, and web-based services.',
        salary: 'About $88,479 per year in related Tampa Bay roles',
      },
      {
        title: 'Cloud Architect',
        description:
          'Plans cloud-based systems for storage, applications, services, security, and scalability.',
        salary: 'About $96,898 per year in related Tampa Bay roles',
      },
    ],
    description:
      'Focuses on applying computing tools to organizations, infrastructure, systems, and users.',
    skills: 'Systems • Databases • IT Support',
    overview:
      'Information Technology focuses on applying computing systems in practical organizational and user-centered contexts.',
    goodFit: [
      'You like technology, systems, and practical implementation.',
      'You are interested in databases, networks, and user support.',
      'You want an applied computing path with broad workplace uses.',
    ],
    sampleTopics: ['Databases', 'Systems administration', 'Networking'],
    nextSteps: [
      'Compare this degree with Computer Science if you are deciding between applied IT and software development.',
      'Review course plans with advising before making a final decision.',
    ],
    officialLinks: {
      flowcharts: [
        {
          label: '2025-26 Flowchart',
          url: 'https://usf.box.com/s/jbvyp3m2br29tu3nyp27imtz0xj6skgo',
        },
        {
          label: '2026-27 Flowchart',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/it-flowchart-2026.pdf',
        },
      ],
      plans: [
        {
          label: '2 Year Plan of Study',
          url: 'https://catalog.usf.edu/mime/media/23/6735/Information+Technology+B.S.I.T.+-+2+Year+Plan+of+Study.pdf',
        },
        {
          label: '4 Year Plan of Study',
          url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/it-curriculum-2026.pdf',
        },
      ],
      electives: {
        label: 'Information Technology Related Electives',
        url: 'https://usflearn.instructure.com/courses/2040876/files/202229694?wrap=1',
      },
    },
  },
  {
    slug: 'computer-science-and-business',
    name: 'Computer Science and Business',
    credential: 'BS',
    category: 'Business + Interdisciplinary',
    bestFor: 'Technology, business, product thinking',
    description:
      'Combines computing foundations with business context for students interested in technical and organizational work.',
    skills: 'Programming • Business • Product Strategy',
    overview:
      'Computer Science and Business combines technical computing with business thinking for students interested in product, operations, or technical strategy.',
    goodFit: [
      'You want to understand both software and business needs.',
      'You are interested in product management, startups, or technical consulting.',
      'You like connecting technical work to organizational decisions.',
    ],
    sampleTopics: ['Programming', 'Business foundations', 'Product strategy'],
    nextSteps: [
      'Compare this option with Computer Science if you want more technical depth.',
      'Use advising to confirm how interdisciplinary requirements fit your goals.',
    ],
  },
  {
    slug: 'computer-science-and-criminology',
    name: 'Computer Science and Criminology',
    credential: 'BS',
    category: 'Business + Interdisciplinary',
    bestFor: 'Computing, justice, cybercrime',
    description:
      'Connects computing with criminology for students interested in technology, security, and justice systems.',
    skills: 'Computing • Criminology • Cybercrime',
    overview:
      'Computer Science and Criminology connects technical computing skills with questions related to justice, security, and digital crime.',
    goodFit: [
      'You are interested in cybercrime, justice systems, or investigations.',
      'You want computing skills with a social systems perspective.',
      'You like interdisciplinary problems involving technology and people.',
    ],
    sampleTopics: ['Programming', 'Criminology', 'Cybercrime'],
    nextSteps: [
      'Compare this option with Cybersecurity if your interest is mostly technical security.',
      'Confirm requirements with advising because interdisciplinary plans can vary.',
    ],
  },
  {
    slug: 'computer-science-and-interdisciplinary-social-sciences',
    name: 'Computer Science and Interdisciplinary Social Sciences',
    credential: 'BS',
    category: 'Business + Interdisciplinary',
    bestFor: 'Computing and social impact',
    description:
      'Pairs computer science with social science perspectives for students interested in people-centered technology.',
    skills: 'Programming • Research • Social Systems',
    overview:
      'Computer Science and Interdisciplinary Social Sciences combines computing with social science perspectives for students interested in technology’s role in society.',
    goodFit: [
      'You are interested in people-centered technology.',
      'You want computing skills connected to policy, research, or social impact.',
      'You like asking how technology affects communities and institutions.',
    ],
    sampleTopics: ['Programming', 'Social science research', 'Human-centered systems'],
    nextSteps: [
      'Compare this option with Computer Science and Business or Computer Science and Criminology.',
      'Talk with advising about how interdisciplinary course choices shape the degree.',
    ],
  },
];

export function getDegreeBySlug(slug: string | undefined) {
  return degrees.find((degree) => degree.slug === slug);
}

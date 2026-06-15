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
    bestFor: 'Students who like coding, apps, websites, games, or solving puzzles.',
    careerOptions: [
      {
        title: 'Software Engineer',
        description: 'Builds apps, websites, and software.',
        salary: 'About $88,479 per year',
      },
      {
        title: 'Cybersecurity Analyst',
        description: 'Helps keep computers and information safe.',
        salary: 'About $96,898 per year',
      },
      {
        title: 'Data Scientist',
        description: 'Uses data to find patterns and answer questions.',
        salary: 'About $85,667 per year',
      },
      {
        title: 'Systems Architect',
        description: 'Plans how parts of a computer system work together.',
        salary: 'About $101,678 per year',
      },
      {
        title: 'Research Scientist',
        description: 'Studies new ideas in computing.',
        salary: 'About $85,667 per year',
      },
    ],
    description:
      'Learn how to tell computers what to do. This major helps you build programs, create software, and solve problems using technology.',
    skills: 'Coding • Problem Solving • Building Software',
    overview:
      'Computer Science is a strong fit for students who want to build software, understand how computing systems work, and solve technical problems through code.',
    goodFit: [
      'You like coding or want to learn how to code.',
      'You want to build apps, websites, games, or software.',
      'You like solving puzzles and fixing problems.',
    ],
    sampleTopics: ['Programming', 'Algorithms', 'Software engineering'],
    nextSteps: [
      'Compare this major with Artificial Intelligence.',
      'Compare this major with Computer Science and Engineering.',
      'Take the quiz if you are still unsure.',
    ],
    officialLinks: {
      flowcharts: [
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
    bestFor:
      'Students who like coding and are curious about how computers and devices work.',
    careerOptions: [
      {
        title: 'Hardware Engineer',
        description: 'Works with the physical parts inside computers and devices.',
        salary: 'About $128,932 per year',
      },
      {
        title: 'Software Engineer',
        description: 'Builds apps, tools, and software systems.',
        salary: 'About $101,678 per year',
      },
      {
        title: 'Embedded Systems Engineer',
        description: 'Builds software for devices such as cars or robots.',
        salary: 'About $101,678 per year',
      },
      {
        title: 'Cybersecurity Engineer',
        description: 'Helps protect computers, networks, and devices.',
        salary: 'About $128,932 per year',
      },
      {
        title: 'AI Infrastructure Engineer',
        description: 'Builds systems that help AI tools run.',
        salary: 'About $127,420 per year',
      },
    ],
    description:
'Learn how to build software and understand the systems inside computers, devices, and technology.',
    skills: 'Coding • Problem Solving • Computer Systems',
    overview:
      'Computer Science and Engineering is for students who want a computing degree with an engineering-oriented systems perspective.',
    goodFit: [
      'You like coding and want to know how computers work.',
      'You are interested in devices, robots, or smart technology.',
      'You like learning how parts of a system work together.',
    ],
    sampleTopics: ['Systems programming', 'Engineering design', 'Software foundations'],
    nextSteps: [
      'Compare this major with Computer Science.',
      'Look at the flowchart to see the classes.',
      'Ask an advisor if you have questions.',
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
    credential: ' ',
    category: 'AI/Data',
    bestFor: 'Students who are curious about AI, data, and smart technology.',
    careerOptions: [
      {
        title: 'Machine Learning Engineer',
        description: 'Builds systems that learn from data.',
        salary: 'About $111,254 per year',
      },
      {
        title: 'AI Engineer',
        description: 'Builds AI tools that help solve problems.',
        salary: 'About $85,667 per year',
      },
      {
        title: 'AI Systems Engineer',
        description: 'Helps build the systems that AI tools run on.',
        salary: 'About $85,667 per year',
      },
      {
        title: 'AI QA Engineer',
        description: 'Tests AI tools to make sure they work correctly.',
        salary: 'About $88,479 per year',
      },
      {
        title: 'Computer Vision Engineer',
        description: 'Builds AI tools that work with images and videos.',
        salary: 'About $111,254 per year',
      },
    ],
    description:
      'Learn how computers can find patterns, use data, and help make decisions.',
    skills: 'Data • Coding • AI Tools',
    overview:
      'Artificial Intelligence focuses on building systems that can learn, reason, recognize patterns, and support intelligent decision-making.',
    goodFit: [
      'You are curious about AI and how it works.',
      'You like using data to find patterns.',
      'You want to build smart tools, apps, or robots.',
    ],
    sampleTopics: ['Machine learning', 'Data modeling', 'Intelligent systems'],
    nextSteps: [
      'Compare this major with Computer Science.',
      'Look at the flowchart to see the classes.',
      'Take the quiz if you are still unsure.',
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
    bestFor:
      'Students who are interested in protecting information, devices, and people online.',
    careerOptions: [
      {
        title: 'Information Security Analyst',
        description: 'Helps protect computers and data from online threats.',
        salary: 'About $104,012 per year',
      },
      {
        title: 'Cybersecurity Consultant',
        description: 'Helps organizations improve their online safety.',
        salary: 'About $104,012 per year',
      },
      {
        title: 'Cybersecurity Risk Analyst',
        description: 'Finds security problems and helps reduce them.',
        salary: 'About $85,667 per year',
      },
      {
        title: 'Information Technology Security Specialist',
        description: 'Helps keep company systems and accounts safe.',
        salary: 'About $96,898 per year',
      },
    ],
    description:
      'Learn how to keep computer systems safe from hackers, scams, and online threats.',
    skills: 'Online Safety • Problem Solving • Protecting Systems',
    overview:
      'Cybersecurity is centered on protecting systems, understanding threats, and building secure computing practices.',
    goodFit: [
      'You want to keep people and information safe online.',
      'You are curious about hackers and online threats.',
      'You like finding problems and fixing weak spots.',
    ],
    sampleTopics: ['Network security', 'Secure systems', 'Risk analysis'],
    nextSteps: [
      'Compare this major with Computer Science.',
      'Compare this major with Information Technology.',
      'Look at the flowchart to see the classes.',
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
    bestFor:
      'Students who like working with technology and helping systems run smoothly.',
    careerOptions: [
      {
        title: 'Information Security Analyst',
        description: 'Helps keep computers and information safe.',
        salary: 'About $104,012 per year',
      },
      {
        title: 'Database Administrator',
        description: 'Organizes and protects company data.',
        salary: 'About $101,678 per year',
      },
      {
        title: 'Software Developer',
        description: 'Builds apps, websites, and software tools.',
        salary: 'About $125,464 per year',
      },
      {
        title: 'Web Developer',
        description: 'Builds and updates websites.',
        salary: 'About $88,479 per year',
      },
      {
        title: 'Cloud Architect',
        description: 'Plans online systems that store data and run tools.',
        salary: 'About $96,898 per year',
      },
    ],
    description:
      'Learn how to support computers, networks, databases, and the technology people use every day.',
    skills: 'Tech Support • Systems • Databases',
    overview:
      'Information Technology focuses on applying computing systems in practical organizational and user-centered contexts.',
    goodFit: [
      'You like helping people use technology.',
      'You want to work with computers, networks, or databases.',
      'You like fixing technology problems.',
    ],
    sampleTopics: ['Databases', 'Systems administration', 'Networking'],
    nextSteps: [
      'Compare this major with Computer Science.',
      'Look at the flowchart to see the classes.',
      'Ask an advisor if you have questions.',
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

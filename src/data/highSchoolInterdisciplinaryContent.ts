import type { InterdisciplinaryDetailContent } from './interdisciplinaryDetailContent';

export type HighSchoolInterdisciplinaryContent = InterdisciplinaryDetailContent & {
  cardDescription: string;
  cardBestFor: string;
  focus: string;
};

const computingSkills = ['Writing code', 'Solving problems with code', 'Building software', 'Keeping software safe', 'Understanding AI'];
const mathPreparation = 'You will take coding, calculus, physics, and statistics classes. Ask an advisor how to get ready for the math and science work.';
const businessOverview = 'You will learn coding, how software works, how to keep it safe, and how AI (artificial intelligence) uses data to find patterns. You will also study accounting, economics, finance, and business data. Near the end of the degree, you will complete a final project that brings computing and business together.';
const opportunities = (degree: string) => [
  'Internships: try working in a job related to your major while you are still in college. Ask an advisor if an internship can count toward your degree.',
  'Research: work with a faculty mentor to explore a question or problem. Ask an advisor how to get involved.',
  `More study after college: there is a path from ${degree} to a master’s degree in Computer Science. A master’s degree is a higher degree you can work toward after your bachelor’s. Ask an advisor how this path works.`,
];
const businessOpportunities = opportunities('this Computer Science and Business degree');

export const highSchoolInterdisciplinaryContent: Record<string, HighSchoolInterdisciplinaryContent> = {
  'computer-science-and-criminology': {
    focus: 'Coding + Crime and Justice',
    cardBestFor: 'Coding, crime and justice, public safety',
    cardDescription: 'Learn computing and how the criminal justice system works.',
    overview: [
      'This 120-credit degree combines computer science with criminology—the study of crime and the criminal justice system. You learn how to build software while studying why crime happens and how police, courts, and corrections work.',
      'You will learn coding, how software works, how to keep it safe, and how AI (artificial intelligence) uses data to find patterns. You will also learn how to study questions about crime. Near graduation, you will complete a final project that brings computing and criminology together.',
    ],
    fit: ['Want to use technology to help with crime, justice, or public safety.', 'Like coding or want to learn how to build safe software.', 'Are curious about why crime happens and how the justice system works.', 'Want to bring computing and crime research together in a project.'],
    preparation: [mathPreparation, 'You will also study crime, criminal behavior, and ways to do research.', 'This degree combines coding with the study of people and society. Think about whether you enjoy both kinds of work.'],
    skills: [...computingSkills, 'Studying crime and justice', 'Doing research', 'Making responsible choices with technology', 'Building a final project'],
    career: 'This degree connects computing with work in criminal justice. That can include police, courts, corrections, and programs for young people involved in the justice system. Ask an advisor which jobs fit your interests and what else those jobs may require.',
    opportunities: opportunities('this Computer Science and Criminology degree'),
  },
  'computer-science-and-interdisciplinary-social-sciences': {
    focus: 'Coding + People and Society',
    cardBestFor: 'Coding, people, communities, social issues',
    cardDescription: 'Learn computing while studying people, communities, and society.',
    overview: [
      'This 120-credit degree combines computing with social sciences—the study of people, communities, and society. You learn how to build software and look at social issues from different points of view.',
      'You will study coding, software safety, and AI (artificial intelligence)—computer tools that use data to find patterns. You will also learn about social behavior, disability, race and ethnicity, and ways to do research. You choose a focus area, such as psychology, economics, anthropology, or public health. Near graduation, a final project brings computing and social science together.',
    ],
    fit: ['Want to use technology to explore questions about people or communities.', 'Like coding and are curious about how society works.', 'Want to learn about social behavior, fairness, disability, or different cultures.', 'Want to choose a social science focus and connect it with computing.'],
    preparation: [mathPreparation, 'You will also study social ideas, research methods, and how people relate to each other.', 'You will need to work with both code and different points of view about society. Think about whether you enjoy both.'],
    skills: [...computingSkills, 'Studying people and society', 'Doing research', 'Looking at different points of view', 'Building a final project'],
    career: 'Your focus area can help shape the work you explore. You could connect your interests in computing with research, communities, or public services. Ask an advisor how the degree fits the kinds of jobs you want to learn about.',
    opportunities: opportunities('this Computer Science and Interdisciplinary Social Sciences degree'),
  },
  'computer-science-and-business-accountancy-and-analytics': {
    focus: 'Coding + Accounting',
    cardBestFor: 'Coding, money records, accounting',
    cardDescription: 'Learn how computing can help businesses track and understand their money.',
    overview: [
      'This is an accounting focus within the 120-credit Computer Science and Business degree. A concentration is a focus area inside a degree. You learn computing and how businesses record, check, and understand financial information.',
      businessOverview,
      'In this focus area, you learn financial accounting, how businesses track costs, accounting computer systems, and auditing—checking financial records.',
    ],
    fit: ['Want to connect coding with accounting or business money decisions.', 'Like building software and working with numbers.', 'Are interested in financial records, costs, or checking that information is correct.', 'Want to bring computing and accounting together in a project.'],
    preparation: [mathPreparation, 'You will study accounting, economics, finance, costs, and how to check financial records.', 'Accounting takes careful attention to numbers and details. Some accounting classes must be taken in a set order, so ask an advisor to help you plan.'],
    skills: [...computingSkills, 'Understanding business data', 'Reading financial records', 'Tracking business costs', 'Using accounting systems', 'Checking financial records', 'Explaining your work'],
    career: 'One job named for the wider Computer Science and Business degree is corporate accounting systems analyst. This means working with the computer systems a business uses for accounting. Ask an advisor about internships and jobs that connect computing with accounting.',
    opportunities: businessOpportunities,
  },
  'computer-science-and-business-analytics-and-information-systems': {
    focus: 'Coding + Business Data',
    cardBestFor: 'Coding, business data, finding patterns',
    cardDescription: 'Learn how to use code and data to help businesses make decisions.',
    overview: [
      'This is a business data focus within the 120-credit Computer Science and Business degree. A concentration is a focus area inside a degree. You learn how to build software and use business data to answer questions.',
      businessOverview,
      'In this focus area, you learn how to organize information in databases, find patterns in data, and use those patterns to make predictions. You also learn to work with large amounts of data and use Python, a coding language, for business analysis.',
    ],
    fit: ['Want to use code and data to help businesses make decisions.', 'Like coding and finding patterns in information.', 'Are curious about databases, predictions, or large amounts of data.', 'Want to use Python to explore business questions in a project.'],
    preparation: [mathPreparation, 'You will study business basics, databases, statistics, and Python coding.', 'You will combine coding with math and business questions. Think about whether you enjoy finding patterns and explaining what they mean.'],
    skills: [...computingSkills, 'Organizing data in databases', 'Finding patterns in data', 'Making predictions from data', 'Working with large datasets', 'Using Python', 'Explaining your work'],
    career: 'This focus area connects computing with business data and information systems. You can explore work that helps a business understand its data and make decisions. Ask an advisor which internships and jobs fit your interests.',
    opportunities: businessOpportunities,
  },
  'computer-science-and-business-digital-marketing-and-analytics': {
    focus: 'Coding + Digital Marketing',
    cardBestFor: 'Coding, online marketing, customer data',
    cardDescription: 'Learn how computing and data can help businesses with digital marketing.',
    overview: [
      'This is a marketing focus within the 120-credit Computer Science and Business degree. A concentration is a focus area inside a degree. You learn computing and how businesses use technology and data for marketing.',
      businessOverview,
      'In this focus area, you learn marketing basics, marketing research, and digital marketing. You also learn to study marketing data and how technology and AI are used in marketing.',
    ],
    fit: ['Want to connect coding with online marketing or marketing tools.', 'Like building software and learning how businesses reach people.', 'Are interested in marketing research, customer data, or AI in marketing.', 'Want to use technology to explore marketing questions in a project.'],
    preparation: [mathPreparation, 'You will study business basics, marketing, research, and ways to understand marketing data.', 'This degree combines coding with business and marketing questions. Think about whether you enjoy both technical work and learning how marketing works.'],
    skills: [...computingSkills, 'Understanding business data', 'Doing marketing research', 'Understanding digital marketing', 'Studying marketing results', 'Using marketing technology', 'Explaining your work'],
    career: 'One job named for the wider Computer Science and Business degree is marketing systems analyst. This means working with the technology a business uses for marketing. Ask an advisor about internships and jobs that connect computing with marketing.',
    opportunities: businessOpportunities,
  },
  'computer-science-and-business-fintech': {
    focus: 'Coding + Financial Technology',
    cardBestFor: 'Coding, finance, financial technology',
    cardDescription: 'Learn how software and data are used in finance.',
    overview: [
      'This is a financial technology focus within the 120-credit Computer Science and Business degree. Fintech means technology used in finance. A concentration is a focus area inside a degree. You learn computing and how financial businesses and markets work.',
      businessOverview,
      'In this focus area, you learn to use data and models to study financial questions. You also study machine learning in finance and algorithmic trading—using computer rules to guide trading decisions.',
    ],
    fit: ['Want to connect coding with finance or financial technology.', 'Like building software and working with numbers.', 'Are interested in financial markets, data, or AI in finance.', 'Want to bring computing and financial questions together in a project.'],
    preparation: [mathPreparation, 'You will study business basics, financial markets, data analysis, and ways to build financial models.', 'This degree uses code and math to explore financial questions. Think about whether you enjoy careful work with numbers and data.'],
    skills: [...computingSkills, 'Understanding business data', 'Building financial models', 'Studying financial data', 'Using machine learning in finance', 'Understanding computer-based trading rules', 'Explaining your work'],
    career: 'The wider Computer Science and Business degree names jobs such as fintech analyst, blockchain developer, and financial software engineer. These connect technology with finance. Ask an advisor what each job involves and what extra experience you may need.',
    opportunities: businessOpportunities,
  },
  'computer-science-and-business-supply-chain-management': {
    focus: 'Coding + Supply Chains',
    cardBestFor: 'Coding, moving goods, business data',
    cardDescription: 'Learn how computing can help businesses get and move the goods they need.',
    overview: [
      'This is a supply chain focus within the 120-credit Computer Science and Business degree. A supply chain is the steps that get goods from suppliers to customers. A concentration is a focus area inside a degree. You learn computing and how businesses buy, move, and deliver goods.',
      businessOverview,
      'In this focus area, you learn about finding suppliers around the world, global trade, and logistics—planning how goods move and reach their destination. You also learn to use data to study supply chains.',
    ],
    fit: ['Want to connect coding with how businesses get and move goods.', 'Like building software and solving practical problems.', 'Are interested in suppliers, deliveries, global trade, or business data.', 'Want to use technology to explore supply chain questions in a project.'],
    preparation: [mathPreparation, 'You will study business basics, global trade, suppliers, deliveries, and supply chain data.', 'This degree combines coding with math and real business questions. Think about whether you enjoy planning how different parts of a system work together.'],
    skills: [...computingSkills, 'Understanding business data', 'Understanding supply chains', 'Learning how businesses choose suppliers', 'Understanding global trade', 'Planning how goods move', 'Studying supply chain data', 'Explaining your work'],
    career: 'One job named for the wider Computer Science and Business degree is supply chain analyst. This means using information to help a business understand its supply chain. Ask an advisor about internships and jobs that connect computing with how goods move.',
    opportunities: businessOpportunities,
  },
};

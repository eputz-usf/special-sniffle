import { Link, useParams } from 'react-router-dom';
import { getDegreeBySlug } from '../../../data/highSchoolDegrees';
import '../../../styles/degrees.css';

type CompareFeatureNoteProps = {
  degreeName: string;
  compareWith: string;
};

function CompareFeatureNote({
  degreeName,
  compareWith,
}: CompareFeatureNoteProps) {
  return (
    <>
      <h2>Want to Compare {degreeName}?</h2>
      <p>
        Use the Degree Explorer comparison feature to compare {degreeName} with{' '}
        {compareWith}. On the Degree Explorer page, choose Add to Compare on two
        degree cards. Then open the comparison page to see their focus, skills,
        career options, next steps, and planning links side by side.
      </p>
      <div className="degree-detail-actions">
        <Link to="/high-school/degrees">Back to Degree Explorer</Link>
      </div>
    </>
  );
}

const computerScienceSkills = [
  'Coding',
  'Problem Solving',
  'Building Software',
  'Finding and Fixing Mistakes',
  'Working with Data',
  'Computer Systems',
  'Program Design',
  'Databases',
  'AI and Advanced Topics',
];

const computerScienceFitItems = [
  'Like coding, or want to learn how to code',
  'Enjoy solving puzzles or step-by-step problems',
  'Want to make apps, websites, games, or tools',
  'Are curious about how computers and software work',
  'Are interested in AI, data, or building technology',
  'Want a major with many career options',
  'Are okay with math and problem solving',
  'Like figuring things out, even when it takes time',
];

const computerScienceChallengeItems = [
  'Do not like coding',
  'Get frustrated when something does not work right away',
  'Prefer working mostly with physical devices or hardware',
  'Want a major mostly about tech support or business technology',
  'Want to focus only on cybersecurity',
  'Do not enjoy math, logic, or problem solving',
  'Prefer classes where you mostly memorize answers instead of building solutions',
];

const flowchartResources = [
  
  {
    label: '2025-26 Flowchart',
    url: 'https://usf.box.com/s/19fmhum9p6w2nezr4f2d1hi5fdlbohvr',
  },
  {
    label: '2026-27 Flowchart',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cs-flowchart-2026.pdf',
  },
];

const currentCatalogResources = [
  {
    title: 'Computer Science B.S.C.S. - 2 Year Plan of Study',
    description:
      'See one way to finish this major in two years if you already have college credits.',
    buttonLabel: 'View 2-Year Plan',
    url: 'https://catalog.usf.edu/mime/media/23/6732/Computer+Science+B.S.C.S.+-+2+Year+Plan+of+Study.pdf',
  },
  {
    title: 'Computer Science B.S.C.S. - 4 Year Plan of Study',
    description:
      'Use this if you want to see a full four-year degree path from first year through graduation.',
    buttonLabel: 'View 4-Year Plan',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cs-curriculum-2026.pdf',
  },
  {
    title: 'Computer Science Related Electives',
    description:
      'See extra Computer Science classes you may be able to choose.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/202229912/download?download_frd=1',
  },
];

const computerScienceCareers = [
  {
    title: 'Software Engineer',
    description: 'Builds apps, websites, and software that people use.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$88,479',
    salaryContext:
      'per year for the related role of software quality assurance analyst or tester.',
  },
  {
    title: 'Cybersecurity Analyst',
    description:
      'Helps keep computers, accounts, and information safe.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$96,898',
    salaryContext:
      'per year for the related role of network and computer systems administrator.',
  },
  {
    title: 'Data Scientist',
    description:
      'Uses data to find patterns and help people make decisions.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$85,667',
    salaryContext: 'per year for related computer occupations.',
  },
  {
    title: 'Systems Architect',
    description:
      'Plans how different parts of a computer system work together.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$101,678',
    salaryContext: 'per year for the related role of computer systems analyst.',
  },
  {
    title: 'Research Scientist',
    description:
      'Studies new ideas in computing, AI, cybersecurity, or data.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$85,667',
    salaryContext: 'per year for related computer occupations.',
  },
];

const computerScienceMarketStats = [
  {
    value: '19,605',
    label: 'Currently Employed',
    description: 'In related Tampa Bay area jobs',
  },
  {
    value: '$90,421',
    label: 'Average Salary',
    description: 'For related Tampa Bay area jobs',
  },
  {
    value: '746',
    label: 'Job Postings',
    description: 'Current Tampa Bay area openings',
  },
];

const computerScienceEmploymentTrend = [
  { year: '2023', jobs: '18,873', x: 95, y: 171 },
  { year: '2024', jobs: '19,605', x: 180, y: 106 },
  { year: '2025', jobs: '19,568', x: 265, y: 109 },
  { year: '2026', jobs: '19,872', x: 350, y: 82 },
  { year: '2027', jobs: '20,094', x: 435, y: 62 },
  { year: '2028', jobs: '20,260', x: 520, y: 47 },
  { year: '2029', jobs: '20,392', x: 605, y: 35 },
  { year: '2030', jobs: '20,437', x: 690, y: 31 },
];

const computerScienceEmploymentYAxis = [
  { label: '20,500', y: 25 },
  { label: '20,000', y: 70 },
  { label: '19,500', y: 115 },
  { label: '19,000', y: 160 },
  { label: '18,500', y: 205 },
];

const computerScienceGrowthStats = [
  {
    label: 'Past Growth',
    value: '5.3%',
    description: '2023-2026',
  },
  {
    label: 'Projected Growth',
    value: '2.8%',
    description: '2026-2030',
  },
];

const computerScienceTopTampaOccupations = [
  'Computer Systems Analysts — $101,678',
  'Database Administrators — $100,085',
  'Network and Computer Systems Administrators — $96,898',
  'Software Quality Assurance Analysts and Testers — $88,479',
  'Computer Occupations, All Other — $85,667',
  'Web and Digital Interface Designers — $69,718',
];

const degreeExperiencePaths = [
  {
    title: 'Internships',
    description:
      'Internships let students work with real companies for a short time. Students can learn new skills, work on real projects, and explore tech careers.',
  },
  {
    title: 'Co-Op',
    description:
      'A co-op is a paid work experience related to a student’s major. It helps students gain job experience while they are still in school.',
  },
  {
    title: 'Undergraduate Research',
    description:
      'Undergraduate research lets students work with professors on technology projects. These projects may focus on AI, cybersecurity, data, or computer systems. Research helps students build experience and prepare for jobs or graduate school.',
  },
];

function BeyondTheClassroom() {
  return (
    <>
      <h3>Beyond the Classroom</h3>
      <p>
        Students can get experience before they graduate. This can help them
        feel more prepared for jobs, internships, or graduate school.
      </p>
      <div className="career-card-grid">
        {degreeExperiencePaths.map((path) => (
          <article className="career-card" key={path.title}>
            <h3>{path.title}</h3>
            <p>{path.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}

const advisorQuestions = [
  'What plan of study should I follow?',
  'What classes should I take first?',
  'Do I need coding experience before starting this major?',
  'What math classes will I need?',
  'Which classes are usually hardest for new students?',
  'Can I change my path later if my interests change?',
  'Which electives should I take if I am interested in AI, data, cybersecurity, or software?',
  'What kinds of projects should I build as a beginner?',
  'When should I start looking for internships?',
  'Are there clubs, research labs, or student groups I should join?',
  'Can this degree help me go to graduate school later?',
];

const computerScienceEngineeringSkills = [
  'Coding',
  'Software Development',
  'Problem Solving',
  'Computer Systems',
  'System Design',
  'Software and Hardware Basics',
  'Device and Technology Systems',
  'Advanced Software',
  'Smart Technology',
  'Technical Design',
];

const computerScienceEngineeringFitItems = [
  'Like coding and also wonder how computers actually work',
  'Want to learn about both software and computer systems',
  'Are interested in devices, robots, AI, or smart technology',
  'Like solving problems step by step',
  'Want to understand how different parts of technology work together',
  'Are okay with math, coding, and technical classes',
  'Enjoy figuring out how things work behind the scenes',
];

const computerScienceEngineeringChallengeItems = [
  'Only want to focus on coding apps or websites',
  'Only want hands-on hardware or lab work',
  'Prefer tech support or basic IT work',
  'Do not enjoy learning how systems work in detail',
  'Do not like math, coding, or problem solving',
];

const computerScienceEngineeringFlowcharts = [
  {
    label: '2026-27 Flowchart',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cse-flowchart-2026.pdf',
  },
];

const computerScienceEngineeringResources = [
  {
    title: 'Computer Science and Engineering B.S.C.S.E. - 4 Year Plan of Study',
    description:
      'See one way to plan your classes across four years.',
    buttonLabel: 'View 4-Year Plan',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cse-curriculum-2026.pdf',
  },
];

const computerScienceEngineeringCareers = [
  {
    title: 'Hardware Engineer',
    description:
      'Works with the physical parts of computers and devices.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$128,932',
    salaryContext: 'per year for computer network architects.',
  },
  {
    title: 'Software Engineer',
    description: 'Builds apps, tools, and software systems.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$101,678',
    salaryContext: 'per year for computer systems analysts.',
  },
  {
    title: 'Embedded Systems Engineer',
    description:
      'Builds software for devices like cars, robots, medical tools, or smart technology.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$101,678',
    salaryContext: 'per year for computer systems analysts.',
  },
  {
    title: 'Cybersecurity Engineer',
    description:
      'Helps protect computer systems, networks, and devices.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$128,932',
    salaryContext: 'per year for computer network architects.',
  },
  {
    title: 'AI Infrastructure Engineer',
    description:
      'Helps build the systems that support AI tools and applications.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$127,420',
    salaryContext: 'per year for computer and information research scientists.',
  },
];

const computerScienceEngineeringMarketStats = [
  {
    value: '37,474',
    label: 'Currently Employed',
    description: 'In related Tampa Bay area jobs',
  },
  {
    value: '$106,047',
    label: 'Average Salary',
    description: 'For related Tampa Bay area jobs',
  },
  {
    value: '1,175',
    label: 'Job Postings',
    description: 'Current Tampa Bay area openings',
  },
];

const computerScienceEngineeringEmploymentTrend = [
  { year: '2023', jobs: '35,791', x: 95, y: 186 },
  { year: '2024', jobs: '37,474', x: 180, y: 136 },
  { year: '2025', jobs: '37,790', x: 265, y: 126 },
  { year: '2026', jobs: '38,554', x: 350, y: 103 },
  { year: '2027', jobs: '39,168', x: 435, y: 85 },
  { year: '2028', jobs: '39,655', x: 520, y: 70 },
  { year: '2029', jobs: '40,067', x: 605, y: 58 },
  { year: '2030', jobs: '40,280', x: 690, y: 52 },
];

const computerScienceEngineeringEmploymentYAxis = [
  { label: '41,000', y: 30 },
  { label: '39,000', y: 90 },
  { label: '37,000', y: 150 },
  { label: '35,000', y: 210 },
];

const computerScienceEngineeringGrowthStats = [
  {
    label: 'Past Growth',
    value: '7.7%',
    description: '2023-2026',
  },
  {
    label: 'Projected Growth',
    value: '4.5%',
    description: '2026-2030',
  },
];

const computerScienceEngineeringTopTampaOccupations = [
  'Computer and Information Systems Managers — $165,387',
  'Computer Network Architects — $128,932',
  'Database Architects — $128,802',
  'Computer and Information Research Scientists — $127,420',
  'Computer Systems Analysts — $101,678',
];

const computerScienceEngineeringAdvisorQuestions = [
  'Are the official degree requirements available yet?',
  'What plan of study should I follow?',
  'What classes should I take first?',
  'How much coding will I do in this major?',
  'How much hardware or systems work will I do?',
  'What math classes will I need?',
  'Which classes are usually hardest for new students?',
  'Which electives should I take if I am interested in robotics, AI, embedded systems, or cybersecurity?',
  'What kinds of projects should I build as a beginner?',
  'When should I start looking for internships?',
  'Are there clubs, labs, or student groups I should join?',
  'Can this major help me go to graduate school later?',
];

const artificialIntelligenceSkills = [
  'Coding',
  'Problem Solving',
  'Working with Data',
  'Finding Patterns',
  'Machine Learning',
  'AI Models',
  'Software Development',
  'Testing AI Tools',
  'Computer Vision',
  'Language Technology',
  'Robotics',
  'Smart Technology',
];

const artificialIntelligenceFitItems = [
  'Are curious about AI and how it works',
  'Like using data to find patterns',
  'Want to learn how computers can make predictions',
  'Enjoy coding or want to get better at it',
  'Are interested in chatbots, smart apps, robots, or image tools',
  'Like solving problems step by step',
  'Are okay with math and logic',
  'Want a major that focuses more on AI than general software',
];

const artificialIntelligenceChallengeItems = [
  'Do not like coding',
  'Get frustrated when technology does not work right away',
  'Do not enjoy math, logic, or problem solving',
  'Want a broader software degree instead of an AI-focused one',
  'Prefer working mostly with hardware or physical devices',
  'Want a major focused more on tech support, networking, or IT systems',
];

const artificialIntelligenceFlowcharts = [
  {
    label: '2025-26 Flowchart',
    url: 'https://usf.box.com/s/oitafm3n17hf3ok0wsa2dppkoei8sy4q',
  },
  {
    label: '2026-27 Flowchart',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/ai-flowchart-2026.pdf',
  },
];

const artificialIntelligenceResources = [
  {
    title: 'Artificial Intelligence B.S.A.I. - 2 Year Plan of Study',
    description:
      'See one way to finish this major in two years if you already have college credits.',
    buttonLabel: 'View 2-Year Plan',
    url: 'https://catalog.usf.edu/mime/media/23/6729/Artificial+Intelligence+B.S.A.I.+-+2+Year+Plan+of+Study.pdf',
  },
  {
    title: 'Artificial Intelligence B.S.A.I. - 4 Year Plan of Study',
    description:
      'Use this for students who want to see a full four-year degree path from first year through graduation.',
    buttonLabel: 'View 4-Year Plan',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/ai-curriculum-2026.pdf',
  },
  {
    title: 'Artificial Intelligence Related Electives',
    description:
      'See extra Artificial Intelligence classes you may be able to choose.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/202229924/download?download_frd=1',
  },
];

const artificialIntelligenceCareers = [
  {
    title: 'Machine Learning Engineer',
    description: 'Builds systems that learn from data.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$111,254',
    salaryContext: 'per year for the related role of data scientist.',
  },
  {
    title: 'AI Engineer',
    description:
      'Builds AI tools and smart systems.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$85,667',
    salaryContext: 'per year for related computer occupations.',
  },
  {
    title: 'AI Systems Engineer',
    description: 'Helps build and manage the systems that AI tools run on.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$85,667',
    salaryContext: 'per year for related computer occupations.',
  },
  {
    title: 'AI QA Engineer',
    description: 'Tests AI tools to make sure they work correctly.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$88,479',
    salaryContext:
      'per year for the related role of software quality assurance analyst or tester.',
  },
  {
    title: 'Computer Vision Engineer',
    description:
      'Builds AI systems that work with images and video.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$111,254',
    salaryContext: 'per year for the related role of data scientist.',
  },
];

const artificialIntelligenceMarketStats = [
  {
    value: '9,196',
    label: 'Currently Employed',
    description: 'In related Tampa Bay area jobs',
  },
  {
    value: '$95,133',
    label: 'Average Salary',
    description: 'For related Tampa Bay area jobs',
  },
  {
    value: '466',
    label: 'Job Postings',
    description: 'Current Tampa Bay area openings',
  },
];

const artificialIntelligenceEmploymentTrend = [
  { year: '2023', jobs: '8,358', x: 95, y: 190 },
  { year: '2024', jobs: '9,196', x: 180, y: 116 },
  { year: '2025', jobs: '9,252', x: 265, y: 111 },
  { year: '2026', jobs: '9,468', x: 350, y: 92 },
  { year: '2027', jobs: '9,648', x: 435, y: 76 },
  { year: '2028', jobs: '9,797', x: 520, y: 63 },
  { year: '2029', jobs: '9,925', x: 605, y: 52 },
  { year: '2030', jobs: '10,004', x: 690, y: 45 },
];

const artificialIntelligenceGrowthStats = [
  {
    label: 'Past Growth',
    value: '13.3%',
    description: '2023-2026',
  },
  {
    label: 'Projected Growth',
    value: '5.7%',
    description: '2026-2030',
  },
];

const artificialIntelligenceEmploymentYAxis = [
  { label: '10,500', y: 25 },
  { label: '10,000', y: 70 },
  { label: '9,500', y: 115 },
  { label: '9,000', y: 160 },
  { label: '8,500', y: 205 },
  { label: '8,000', y: 250 },
];

const artificialIntelligenceTopTampaOccupations = [
  'Data Scientists — $111,254',
  'Software Quality Assurance Analysts and Testers — $88,479',
  'Computer Occupations, All Other — $85,667',
];

const artificialIntelligenceAdvisorQuestions = [
  'What plan of study should I follow?',
  'What classes should I take first?',
  'What coding experience should I have before starting?',
  'What math classes will I need?',
  'Which classes are usually hardest for AI students?',
  'Which electives should I take if I like machine learning, robotics, language tools, computer vision, or data?',
  'Are AI electives offered every year, or only sometimes?',
  'What kinds of AI projects should I build as a beginner?',
  'When should I start looking for internships?',
  'Are there research labs, clubs, or student groups I should join?',
  'Can this degree help me go to graduate school later?',
  'Are there Bachelor’s/Master’s options for this major?',
];

const cybersecuritySkills = [
  'Online Safety',
  'Network Security',
  'Secure Computing',
  'Risk Management',
  'Cyber Defense',
  'Computer Systems',
  'Information Security',
  'Ethical Decision Making',
  'Privacy and Policy',
  'Human Factors',
  'Software Security',
  'Cyber Operations',
  'Incident Response',
  'Digital Forensics',
];

const cybersecurityFitItems = [
  'Care about keeping people and information safe online',
  'Are curious about how hackers break into systems',
  'Like solving problems and finding weak spots',
  'Want to learn how to protect computers, accounts, and networks',
  'Are interested in privacy, online safety, and digital rules',
  'Like both technology and real-world decision making',
  'Want a major focused on cyber threats, risks, and protection',
];

const cybersecurityChallengeItems = [
  'Do not enjoy solving technical problems',
  'Do not like learning how computer systems work',
  'Want a degree focused mostly on building apps or websites',
  'Prefer hardware, circuits, or lab-based engineering work',
  'Do not want to study security rules, risk, privacy, or ethics',
  'Want a broader computing degree instead of a security-focused one',
];

const cybersecurityFlowcharts = [
  
  {
    label: '2025-26 Flowchart',
    url: 'https://usf.box.com/s/aed8ui6i6bxltaeylljbal6ez5o3vj7r',
  },
  {
    label: '2026-27 Flowchart',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cys-flowchart-2026.pdf',
  },
];

const cybersecurityResources = [
  {
    title: 'Cybersecurity B.S.C.Y.S. - 2 Year Plan of Study',
    description:
      'See one way to finish this major in two years if you already have college credits.',
    buttonLabel: 'View 2-Year Plan',
    url: 'https://catalog.usf.edu/mime/media/23/6737/Cybersecurity+B.S.C.Y.S.+-+2+Year+Plan+of+Study.pdf',
  },
  {
    title: 'Cybersecurity B.S.C.Y.S. - 4 Year Plan of Study',
    description:
      'Use this for students who want to see a full four-year degree path from first year through graduation.',
    buttonLabel: 'View 4-Year Plan',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cys-curriculum-2026.pdf',
  },
  {
    title: 'Cybersecurity Related Electives',
    description:
      'See extra Cybersecurity classes you may be able to choose.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/211397678/download?download_frd=1',
  },
];

const cybersecurityCareers = [
  {
    title: 'Information Security Analyst',
    description:
      'Helps protect systems and data from cyber threats.',
    salaryLabel: 'Tampa Bay average salary: About',
    salaryAmount: '$104,012',
    salaryContext: 'per year.',
  },
  {
    title: 'Cybersecurity Consultant',
    description:
      'Helps organizations improve their security and reduce online risks.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$104,012',
    salaryContext:
      'per year for the related role of information security analyst.',
  },
  {
    title: 'Cybersecurity Risk Analyst',
    description:
      'Looks for possible security problems and helps reduce them.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$85,667',
    salaryContext: 'per year for related computer occupations.',
  },
  {
    title: 'Information Technology Security Specialist',
    description:
      'Helps keep company systems, networks, and user accounts secure.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$96,898',
    salaryContext:
      'per year for the related role of network and computer systems administrator.',
  },
];

const cybersecurityMarketStats = [
  {
    value: '12,608',
    label: 'People Employed',
    description: 'In related Tampa Bay area jobs',
  },
  {
    value: '$92,485',
    label: 'Average Salary',
    description: 'For related Tampa Bay area jobs',
  },
  {
    value: '446',
    label: 'Job Postings',
    description: 'Current Tampa Bay area openings',
  },
  {
    value: '3.6%',
    label: 'Projected Growth',
    description: 'Expected from 2026–2030',
  },
];

const cybersecurityEmploymentTrend = [
  { year: '2023', jobs: '12,915', x: 95, y: 134 },
  { year: '2024', jobs: '12,608', x: 180, y: 203 },
  { year: '2025', jobs: '12,639', x: 265, y: 196 },
  { year: '2026', jobs: '12,861', x: 350, y: 146 },
  { year: '2027', jobs: '13,032', x: 435, y: 108 },
  { year: '2028', jobs: '13,167', x: 520, y: 77 },
  { year: '2029', jobs: '13,277', x: 605, y: 53 },
  { year: '2030', jobs: '13,328', x: 690, y: 41 },
];

const cybersecurityGrowthStats = [
  {
    label: 'Past Growth',
    value: '-0.4%',
    description: 'Growth from 2023 to 2026',
  },
  {
    label: 'Projected Growth',
    value: '3.6%',
    description: 'Expected growth from 2026 to 2030',
  },
];

const cybersecurityEmploymentYAxis = [
  { label: '13,400', y: 25 },
  { label: '13,200', y: 70 },
  { label: '13,000', y: 115 },
  { label: '12,800', y: 160 },
  { label: '12,600', y: 205 },
];

const cybersecurityTopIncomeRoles = [
  {
    title: 'Information Security Analysts',
    salary: '$104,012',
  },
  {
    title: 'Database Administrators',
    salary: '$100,085',
  },
  {
    title: 'Network and Computer Systems Administrators',
    salary: '$96,898',
  },
  {
    title: 'Computer Occupations, All Other',
    salary: '$85,667',
  },
  {
    title: 'Computer Network Support Specialists',
    salary: '$75,765',
  },
];

const cybersecurityAdvisorQuestions = [
  'What plan of study should I follow?',
  'What classes should I take first?',
  'Which cybersecurity classes need special permission?',
  'Which ethics class should I take for my catalog year?',
  'What math or coding background should I have?',
  'Which classes are usually hardest for cybersecurity students?',
  'Which electives should I take if I like cyber defense, digital forensics, risk, or secure software?',
  'What beginner projects should I build for cybersecurity?',
  'Should I look into certifications while I am a student?',
  'When should I start looking for internships?',
  'Are there clubs, labs, competitions, or student groups I should join?',
  'Can this degree help me go to graduate school later?',
  'Are there Bachelor’s/Master’s options for this major?',
];

const informationTechnologySkills = [
  'Coding',
  'Databases',
  'Networking',
  'Web Systems',
  'Cybersecurity',
  'Cloud Computing',
  'Tech Support',
  'System Setup',
  'Troubleshooting',
  'User-Focused Design',
  'IT Systems',
  'Applied Technology',
];

const informationTechnologyFitItems = [
  'Like using technology to solve real problems',
  'Want to help people and organizations use technology better',
  'Are interested in websites, databases, networks, or cloud tools',
  'Like figuring out why something is not working',
  'Prefer hands-on technology work over heavy theory',
  'Are interested in cybersecurity, systems, or IT support',
  'Want a major that connects technology with real users',
];

const informationTechnologyChallengeItems = [
  'Want a major focused mostly on advanced coding or theory',
  'Want to focus mainly on AI or machine learning',
  'Prefer hardware, circuits, or engineering lab work',
  'Do not enjoy fixing technology problems',
  'Do not like working with systems, networks, or databases',
  'Want a degree focused only on software development',
];

const informationTechnologyFlowcharts = [

  {
    label: '2025-26 Flowchart',
    url: 'https://usf.box.com/s/jbvyp3m2br29tu3nyp27imtz0xj6skgo',
  },
  {
    label: '2026-27 Flowchart',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/it-flowchart-2026.pdf',
  },
];

const informationTechnologyResources = [
  {
    title: 'Information Technology B.S.I.T. - 2 Year Plan of Study',
    description:
      'See one way to finish this major in two years if you already have college credits.',
    buttonLabel: 'View 2-Year Plan',
    url: 'https://catalog.usf.edu/mime/media/23/6735/Information+Technology+B.S.I.T.+-+2+Year+Plan+of+Study.pdf',
  },
  {
    title: 'Information Technology B.S.I.T. - 4 Year Plan of Study',
    description:
      'Use this for students who want to see a full four-year degree path from first year through graduation.',
    buttonLabel: 'View 4-Year Plan',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/it-curriculum-2026.pdf',
  },
  {
    title: 'Information Technology Related Electives',
    description:
      'See extra Information Technology classes you may be able to choose.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/202229694?wrap=1',
  },
];

const informationTechnologyCareers = [
  {
    title: 'Information Security Analyst',
    description:
      'Helps keep computer systems, accounts, and information safe.',
    salaryLabel: 'Tampa Bay average salary: About',
    salaryAmount: '$104,012',
    salaryContext: 'per year.',
  },
  {
    title: 'Database Administrator',
    description:
      'Helps organize, protect, and manage the data that companies use.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$101,678',
    salaryContext: 'per year for the related role of computer systems analyst.',
  },
  {
    title: 'Software Developer',
    description: 'Builds apps, websites, and software tools.',
    salaryLabel: 'Tampa Bay average salary: About',
    salaryAmount: '$125,464',
    salaryContext: 'per year.',
  },
  {
    title: 'Web Developer',
    description: 'Builds and updates websites and web applications.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$88,479',
    salaryContext:
      'per year for the related role of software quality assurance analyst or tester.',
  },
  {
    title: 'Cloud Architect',
    description:
      'Plans and supports cloud systems that store data and run online services.',
    salaryLabel: 'Related Tampa Bay salary: About',
    salaryAmount: '$96,898',
    salaryContext:
      'per year for the related role of network and computer systems administrator.',
  },
];

const informationTechnologyTampaStats = [
  {
    value: '37,419',
    label: 'People Employed',
    description: 'In Tampa Bay area IT-related jobs',
  },
  {
    value: '$96,852',
    label: 'Average Salary',
    description: 'For related Tampa Bay area jobs',
  },
  {
    value: '1,649',
    label: 'Job Postings',
    description: 'Current Tampa Bay area openings',
  },
  {
    value: '4.7%',
    label: 'Projected Growth',
    description: 'Expected from 2026–2030',
  },
];

const informationTechnologyEmploymentTrend = [
  { year: '2023', jobs: '37,705', x: 95, y: 139 },
  { year: '2024', jobs: '37,419', x: 180, y: 165 },
  { year: '2025', jobs: '37,442', x: 265, y: 163 },
  { year: '2026', jobs: '38,212', x: 350, y: 94 },
  { year: '2027', jobs: '38,827', x: 435, y: 66 },
  { year: '2028', jobs: '39,335', x: 520, y: 43 },
  { year: '2029', jobs: '39,759', x: 605, y: 24 },
  { year: '2030', jobs: '39,994', x: 690, y: 14 },
];

const informationTechnologyGrowthStats = [
  {
    label: 'Past Growth',
    value: '1.3%',
    description: '2023-2026',
  },
  {
    label: 'Projected Growth',
    value: '4.7%',
    description: '2026-2030',
  },
];

const informationTechnologyEmploymentYAxis = [
  { label: '40,000', y: 15 },
  { label: '39,000', y: 75 },
  { label: '38,000', y: 135 },
  { label: '37,000', y: 195 },
];

const informationTechnologyTopIncomeRoles = [
  {
    title: 'Software Developers',
    salary: '$125,464',
  },
  {
    title: 'Information Security Analysts',
    salary: '$104,012',
  },
  {
    title: 'Computer Systems Analysts',
    salary: '$101,678',
  },
  {
    title: 'Network and Computer Systems Administrators',
    salary: '$96,898',
  },
  {
    title: 'Software Quality Assurance Analysts and Testers',
    salary: '$88,479',
  },
];

const informationTechnologyAdvisorQuestions = [
  'What plan of study should I follow?',
  'What classes should I take first?',
  'Which IT classes are only offered in fall or spring?',
  'Which classes need special permission?',
  'What coding or math background should I have?',
  'Which classes are usually hardest for IT students?',
  'Which electives should I take if I like cloud, networking, databases, cybersecurity, or web systems?',
  'What beginner projects should I build for IT?',
  'Should I look into certifications while I am a student?',
  'When should I start looking for internships?',
  'What kinds of companies or organizations hire IT students?',
  'Are there clubs, labs, or student groups I should join?',
  'Can this degree help me go to graduate school later?',
];

function ComputerScienceHighSchoolDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">Software • Coding • Problem Solving</p>
        <h1>Computer Science</h1>
        <p>
          Computer Science is for students who want to learn how to code, build
          software, and solve problems with technology. Students learn how to
          make programs, apps, websites, and tools. They also learn how
          computers follow instructions and how software works behind the
          scenes.
        </p>

        <div className="degree-tag-list">
          <span>Software</span>
          <span>Coding</span>
          <span>Step-by-Step Logic</span>
          <span>Computer Systems</span>
          <span>AI and Data</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Computer Science is about using computers to solve problems. Students
          learn how to write code, build programs, organize information, and
          create software. They also learn what happens behind the scenes when
          apps and websites run. This major can lead to many paths because
          software is used almost everywhere.
        </p>
        
      </section>

      <section className="degree-detail-section" id="career-outlook">
        <h2>Career Outlook in Tampa Bay: Computer Science</h2>
        <div className="degree-overview-card">
          <p>
            Computer Science can lead to careers where students use coding,
            data, and problem solving to build and improve technology.
          </p>
          <p>
            USF highlights that Tampa Bay’s tech sector has grown 28.5% over the
            past five years, with companies such as Apple, Lockheed Martin,
            Meta, Jabil, ReliaQuest, and Rapid7 recruiting from USF’s talent
            pool.
          </p>
        </div>
        <p>
          <strong>Computer Science graduates may work in roles such as:</strong>
        </p>
        <div className="career-card-grid">
          {computerScienceCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
              <p className="career-card-salary">
                {career.salaryLabel} <strong>{career.salaryAmount}</strong>{' '}
                {career.salaryContext}
              </p>
            </article>
          ))}
        </div>
        <p>
          These salaries are not guaranteed starting salaries. Pay can depend
          on experience, internships, location, skills, projects, and the
          company.
        </p>

        <div className="job-market-highlights">
          <h3>Tampa Bay Job Market Highlights</h3>
          <p>
            Computer Science career data for the Tampa–St.
            Petersburg–Clearwater area shows that this major connects to local
            job opportunities.
          </p>
          <div className="job-stat-grid">
            {computerScienceMarketStats.map((stat) => (
              <article className="job-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>

          <div className="employment-trend-card">
            <svg
              aria-labelledby="computer-science-employment-trend-title"
              className="employment-trend-chart cs-employment-chart"
              role="img"
              viewBox="0 0 720 300"
            >
              <title id="computer-science-employment-trend-title">
                Employment trend for computer science-related jobs in Tampa Bay
                from 2023 to 2030
              </title>
              {computerScienceEmploymentYAxis.map((tick) => (
                <g key={tick.label}>
                  <line className="chart-grid-line" x1="95" x2="690" y1={tick.y} y2={tick.y} />
                  <text className="chart-axis-label" x="82" y={tick.y + 6}>
                    {tick.label}
                  </text>
                </g>
              ))}
              {computerScienceEmploymentTrend.map((point) => (
                <line
                  className="chart-grid-line vertical"
                  key={point.year}
                  x1={point.x}
                  x2={point.x}
                  y1="25"
                  y2="205"
                />
              ))}
              <polyline
                className="historical-line"
                points={computerScienceEmploymentTrend
                  .slice(0, 4)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              <polyline
                className="projected-line"
                points={computerScienceEmploymentTrend
                  .slice(3)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              {computerScienceEmploymentTrend.map((point, index) => (
                <circle
                  className={index <= 3 ? 'historical-point' : 'projected-point'}
                  cx={point.x}
                  cy={point.y}
                  key={point.year}
                  r="7"
                >
                  <title>
                    {point.year}: {point.jobs} jobs
                  </title>
                </circle>
              ))}
              {computerScienceEmploymentTrend.map((point) => (
                <text
                  className="chart-axis-label year"
                  key={point.year}
                  x={point.x}
                  y="236"
                >
                  {point.year}
                </text>
              ))}
              <text className="chart-title" x="392" y="282">
                Annual Employment Numbers
              </text>
            </svg>
          </div>

          <div className="growth-snapshot">
            {computerScienceGrowthStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.description}</small>
              </article>
            ))}
          </div>

          <div className="job-market-explanation">
            <h4>What do these numbers mean?</h4>
            <p>
              These numbers do not mean every student will earn this salary
              right after graduation. Pay can depend on experience, internships,
              location, projects, skills, and the company.
            </p>
          </div>
          <div className="job-market-explanation">
            <h4>Top Related Jobs by Income in Tampa Bay</h4>
            <p>Some related Computer Science career areas include:</p>
            <ul className="tampa-income-list">
              {computerScienceTopTampaOccupations.map((occupation) => (
                <li key={occupation}>{occupation}</li>
              ))}
            </ul>
          </div>
        </div>


        <BeyondTheClassroom />
        <div className="degree-detail-actions">
          <a
            href="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscs.aspx"
            rel="noreferrer"
            target="_blank"
          >
            View Computer Science Career Information ↗
          </a>
          <Link to="/high-school/career-paths">
            View Another Major
          </Link>
        </div>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <p>This major may be a good choice if you:</p>
          <ul>
            {computerScienceFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
          <p>This major may feel harder if you:</p>
          <ul>
            {computerScienceChallengeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="degree-detail-section">
        <h2>Skills Students May Build</h2>
        <div className="degree-skill-chips">
          {computerScienceSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="degree-detail-section" id="official-resources">
        <h2>Flowcharts, Plans, and Electives</h2>

        <div className="resource-group">
          <h3>Program Flowcharts</h3>
          <div className="resource-card-grid compact">
            {flowchartResources.map((resource) => (
              <a
                className={`resource-card${resource.url ? '' : ' placeholder-resource'}`}
                href={resource.url ?? '#official-resources'}
                key={resource.label}
                rel={resource.url ? 'noreferrer' : undefined}
                target={resource.url ? '_blank' : undefined}
              >
                <span>{resource.label}</span>
                <small>
                  {resource.url ? 'Open official resource ↗' : 'External link to be added'}
                </small>
              </a>
            ))}
          </div>
        </div>

        <div className="resource-group">
          <h3>Current Catalog Year Resources</h3>
          <div className="resource-card-grid">
            {currentCatalogResources.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.title}</span>
                <p>{resource.description}</p>
                <strong>{resource.buttonLabel} ↗</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Computer Science"
          compareWith="Artificial Intelligence, Cybersecurity, Information Technology, or Computer Science and Engineering"
        />
      </section>

      <section className="degree-detail-section">
        <h2>Questions to Ask an Advisor</h2>
        <ul>
          {advisorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <p className="degrees-disclaimer">
        Use this page to explore your options. Check the official USF catalog
        and ask a Bellini advisor before choosing classes.
      </p>

      <div className="degree-detail-actions degree-catalog-action">
        <a
          href="https://catalog.usf.edu/preview_program.php?catoid=25&poid=13067"
          rel="noreferrer"
          target="_blank"
        >
          View More Details in the Catalog ↗
        </a>
      </div>
    </main>
  );
}

function ComputerScienceEngineeringHighSchoolDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">
          Software • Hardware • Engineering • Systems
        </p>
        <h1>Computer Science and Engineering</h1>
        <p>
          This major is for students who want to learn about both software and
          the technology inside computers and devices.
        </p>

        <div className="degree-tag-list">
          <span>Software</span>
          <span>Hardware</span>
          <span>Building Systems</span>
          <span>Computer Systems</span>
          <span>How Computers Work</span>
          <span>Smart Technology</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Computer Science and Engineering combines coding with the study of
          computers, devices, and systems. Students learn how software works and
          how different parts of a computer system work together.
        </p>
        <p>
          This can be a good choice if you like coding but also want to
          understand what happens inside computers, robots, and other smart
          technology.
        </p>
      </section>

      <section className="degree-detail-section" id="career-outlook">
        <h2>Career Outlook in Tampa Bay: Computer Science and Engineering</h2>
        <div className="degree-overview-card">
          <p>
            Computer Science and Engineering can lead to careers where students
            work with software, hardware, devices, and computer systems.
          </p>
          <p>
            USF highlights that Tampa Bay’s tech sector has grown 28.5% over the
            past five years, with companies such as Apple, Lockheed Martin,
            Meta, Jabil, ReliaQuest, and Rapid7 recruiting from USF’s talent
            pool.
          </p>
        </div>
        <p>
          <strong>
            Computer Science and Engineering graduates may work in roles such
            as:
          </strong>
        </p>
        <div className="career-card-grid">
          {computerScienceEngineeringCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
              <p className="career-card-salary">
                {career.salaryLabel} <strong>{career.salaryAmount}</strong>{' '}
                {career.salaryContext}
              </p>
            </article>
          ))}
        </div>

        <div className="job-market-highlights">
          <h3>Tampa Bay Job Market Highlights</h3>
          <p>
            This Tampa Bay career data shows jobs related to Computer Science
            and Engineering.
          </p>
          <div className="job-stat-grid">
            {computerScienceEngineeringMarketStats.map((stat) => (
              <article className="job-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>
          <div className="employment-trend-card">
            <svg
              aria-labelledby="computer-science-engineering-employment-trend-title"
              className="employment-trend-chart cs-employment-chart"
              role="img"
              viewBox="0 0 720 300"
            >
                <title id="computer-science-engineering-employment-trend-title">
                  Employment trend for computer science and engineering-related
                  jobs in Tampa Bay from 2023 to 2030
                </title>
                {computerScienceEngineeringEmploymentYAxis.map((tick) => (
                  <g key={tick.label}>
                    <line className="chart-grid-line" x1="95" x2="690" y1={tick.y} y2={tick.y} />
                    <text className="chart-axis-label" x="82" y={tick.y + 6}>
                      {tick.label}
                    </text>
                  </g>
                ))}
                {computerScienceEngineeringEmploymentTrend.map((point) => (
                  <line
                    className="chart-grid-line vertical"
                    key={point.year}
                    x1={point.x}
                    x2={point.x}
                    y1="30"
                    y2="210"
                  />
                ))}
                <polyline
                  className="historical-line"
                  points={computerScienceEngineeringEmploymentTrend
                    .slice(0, 4)
                    .map((point) => `${point.x},${point.y}`)
                    .join(' ')}
                />
                <polyline
                  className="projected-line"
                  points={computerScienceEngineeringEmploymentTrend
                    .slice(3)
                    .map((point) => `${point.x},${point.y}`)
                    .join(' ')}
                />
                {computerScienceEngineeringEmploymentTrend.map((point, index) => (
                  <circle
                    className={index <= 3 ? 'historical-point' : 'projected-point'}
                    cx={point.x}
                    cy={point.y}
                    key={point.year}
                    r="7"
                  >
                    <title>
                      {point.year}: {point.jobs} jobs
                    </title>
                  </circle>
                ))}
                {computerScienceEngineeringEmploymentTrend.map((point) => (
                  <text
                    className="chart-axis-label year"
                    key={point.year}
                    x={point.x}
                    y="242"
                  >
                    {point.year}
                  </text>
                ))}
                <text className="chart-title" x="392" y="282">
                  Annual Employment Numbers
                </text>
            </svg>
          </div>
          <div className="growth-snapshot">
            {computerScienceEngineeringGrowthStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.description}</small>
              </article>
            ))}
          </div>
          <div className="job-market-explanation">
            <h4>What do these numbers mean?</h4>
            <p>
              These numbers do not mean every student will earn this salary
              right after graduation. Pay can depend on experience, internships,
              location, projects, skills, and the company.
            </p>
          </div>
          <div className="job-market-explanation">
            <h4>Top Related Jobs by Income in Tampa Bay</h4>
            <p>
              Some related Computer Science and Engineering career areas
              include:
            </p>
            <ul className="tampa-income-list">
              {computerScienceEngineeringTopTampaOccupations.map(
                (occupation) => (
                  <li key={occupation}>{occupation}</li>
                ),
              )}
            </ul>
           
          </div>
        </div>
        <BeyondTheClassroom />
        <div className="degree-detail-actions">
          <a
            href="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscse.aspx"
            rel="noreferrer"
            target="_blank"
          >
            View Computer Science and Engineering Career Information ↗
          </a>
          <Link to="/high-school/career-paths">
            View Another Major
          </Link>
        </div>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <p>This major may be a good choice if you:</p>
          <ul>
            {computerScienceEngineeringFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
          <p>This major may feel harder if you:</p>
          <ul>
            {computerScienceEngineeringChallengeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="degree-detail-section">
        <h2>Skills Students May Build</h2>
        <div className="degree-skill-chips">
          {computerScienceEngineeringSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="degree-detail-section" id="official-resources">
        <h2>Flowcharts and Plans</h2>

        <div className="resource-group">
          <h3>Program Flowcharts</h3>
          <div className="resource-card-grid compact">
            {computerScienceEngineeringFlowcharts.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.label}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.label}</span>
                <small>Open official resource ↗</small>
              </a>
            ))}
          </div>
        </div>

        <div className="resource-group">
          <h3>Current Catalog Year Resources</h3>
          <p>
            This is a newer program. The four-year plan is available, but the
            current catalog may not show every detail yet.
          </p>
          <div className="resource-card-grid">
            {computerScienceEngineeringResources.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.title}</span>
                <p>{resource.description}</p>
                <strong>{resource.buttonLabel} ↗</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="degree-detail-section degree-alert-note">
        <h2>Important Program Notes</h2>
        <h3>Newer Program / Catalog Note</h3>
        <p>
          This is a newer program. A 2026-27 flowchart and a four-year plan are
          available. The current catalog may not show every detail yet.
        </p>
        <p>
          Ask a Bellini advisor to confirm the latest requirements before
          choosing classes.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Computer Science and Engineering"
          compareWith="Computer Science, Artificial Intelligence, Cybersecurity, or Information Technology"
        />
      </section>

      <section className="degree-detail-section">
        <h2>Questions to Ask an Advisor</h2>
        <ul>
          {computerScienceEngineeringAdvisorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <p className="degrees-disclaimer">
        Use this page to explore your options. Check the official USF catalog
        and ask a Bellini advisor before choosing classes.
      </p>

      <div className="degree-detail-actions degree-catalog-action">
        <a
          href="https://catalog.usf.edu/preview_program.php?catoid=25&poid=16995"
          rel="noreferrer"
          target="_blank"
        >
          View More Details in the Catalog ↗
        </a>
      </div>
    </main>
  );
}

function ArtificialIntelligenceHighSchoolDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">
          AI • Data • Smart Technology
        </p>
        <h1>Artificial Intelligence</h1>
        <p>
          Students learn how computers can find patterns, make predictions, and help solve problems. 
          This major can connect to areas like machine learning, data, software, robotics, cybersecurity, and 
          other AI-related fields.
        </p>

        <div className="degree-tag-list">
          <span>AI</span>
          <span>Learning from Data</span>
          <span>Finding Patterns</span>
          <span>Data</span>
          <span>Smart Technology</span>
          <span>Safe Technology</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Artificial Intelligence is about teaching computers to use data and
          make smart choices.
        </p>
        <p>Students learn how AI tools can:</p>
        <ul>
          <li>Find patterns</li>
          <li>Make predictions</li>
          <li>Learn from data</li>
          <li>Help people make decisions</li>
          <li>Solve difficult problems</li>
        </ul>
        <p>
          Students may also learn how AI tools study data, work with words,
          understand images, help robots, and stay safe from online threats.
        </p>
        <p>
          A simple way to think about it: Artificial Intelligence is about
          building technology that can learn from information and help solve
          real-world problems.
        </p>
      </section>

      <section className="degree-detail-section" id="career-outlook">
        <h2>Career Outlook in Tampa Bay: Artificial Intelligence</h2>
        <div className="degree-overview-card">
          <p>
            Artificial Intelligence can lead to careers where students use
            data, coding, and AI tools to build smart technology.
          </p>
          <p>
            USF highlights that Tampa Bay’s tech sector has grown 28.5% over the
            past five years, with companies such as Apple, Lockheed Martin,
            Meta, Jabil, ReliaQuest, and Rapid7 recruiting from USF’s talent
            pool.
          </p>
        </div>
        <p>
          <strong>
            Artificial Intelligence graduates may work in roles such as:
          </strong>
        </p>
        <div className="career-card-grid">
          {artificialIntelligenceCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
              <p className="career-card-salary">
                {career.salaryLabel} <strong>{career.salaryAmount}</strong>{' '}
                {career.salaryContext}
              </p>
            </article>
          ))}
        </div>
        <p>
          These salaries are not guaranteed starting salaries. Pay can depend
          on experience, internships, location, skills, projects, and the
          company.
        </p>

        <div className="job-market-highlights">
          <h3>Tampa Bay Job Market Highlights</h3>
          <p>
            This Tampa Bay career data shows jobs related to Artificial
            Intelligence.
          </p>
          <div className="job-stat-grid">
            {artificialIntelligenceMarketStats.map((stat) => (
              <article className="job-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>
          <div className="employment-trend-card">
            <svg
              aria-labelledby="artificial-intelligence-employment-trend-title"
              className="employment-trend-chart cs-employment-chart"
              role="img"
              viewBox="0 0 720 340"
            >
              <title id="artificial-intelligence-employment-trend-title">
                Employment trend for artificial intelligence-related jobs in
                Tampa Bay from 2023 to 2030
              </title>
              {artificialIntelligenceEmploymentYAxis.map((tick) => (
                <g key={tick.label}>
                  <line className="chart-grid-line" x1="95" x2="690" y1={tick.y} y2={tick.y} />
                  <text className="chart-axis-label" x="82" y={tick.y + 6}>
                    {tick.label}
                  </text>
                </g>
              ))}
              {artificialIntelligenceEmploymentTrend.map((point) => (
                <line
                  className="chart-grid-line vertical"
                  key={point.year}
                  x1={point.x}
                  x2={point.x}
                  y1="25"
                  y2="250"
                />
              ))}
              <polyline
                className="historical-line"
                points={artificialIntelligenceEmploymentTrend
                  .slice(0, 4)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              <polyline
                className="projected-line"
                points={artificialIntelligenceEmploymentTrend
                  .slice(3)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              {artificialIntelligenceEmploymentTrend.map((point, index) => (
                <circle
                  className={index <= 3 ? 'historical-point' : 'projected-point'}
                  cx={point.x}
                  cy={point.y}
                  key={point.year}
                  r="7"
                >
                  <title>
                    {point.year}: {point.jobs} jobs
                  </title>
                </circle>
              ))}
              {artificialIntelligenceEmploymentTrend.map((point) => (
                <text
                  className="chart-axis-label year"
                  key={point.year}
                  x={point.x}
                  y="282"
                >
                  {point.year}
                </text>
              ))}
              <text className="chart-title" x="392" y="326">
                Annual Employment Numbers
              </text>
            </svg>
          </div>
          <div className="growth-snapshot">
            {artificialIntelligenceGrowthStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.description}</small>
              </article>
            ))}
          </div>
          <div className="job-market-explanation">
            <h4>What do these numbers mean?</h4>
            <p>
              This graph shows that AI-related jobs are expected to grow over
              time in the Tampa Bay area. It does not guarantee a job, but it
              shows that this field connects to local opportunities. Pay can
              depend on experience, internships, location, projects, skills,
              and the company.
            </p>
          </div>
          <div className="job-market-explanation">
            <h4>Top Related Jobs by Income in Tampa Bay</h4>
            <p>Some related Artificial Intelligence career areas include:</p>
            <ul className="tampa-income-list">
              {artificialIntelligenceTopTampaOccupations.map((occupation) => (
                <li key={occupation}>{occupation}</li>
              ))}
            </ul>
          </div>
        </div>
        <BeyondTheClassroom />
        <div className="degree-detail-actions">
          <a
            href="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/ .aspx"
            rel="noreferrer"
            target="_blank"
          >
            View Artificial Intelligence Career Information ↗
          </a>
          <Link to="/high-school/career-paths">
            View Another Major
          </Link>
        </div>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <p>This major may be a good choice if you:</p>
          <ul>
            {artificialIntelligenceFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
          <p>This major may feel harder if you:</p>
          <ul>
            {artificialIntelligenceChallengeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="degree-detail-section">
        <h2>Skills Students May Build</h2>
        <div className="degree-skill-chips">
          {artificialIntelligenceSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="degree-detail-section" id="official-resources">
        <h2>Flowcharts, Plans, and Electives</h2>

        <div className="resource-group">
          <h3>Program Flowcharts</h3>
          <div className="resource-card-grid compact">
            {artificialIntelligenceFlowcharts.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.label}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.label}</span>
                <small>Open official resource ↗</small>
              </a>
            ))}
          </div>
        </div>

        <div className="resource-group">
          <h3>Current Catalog Year Resources</h3>
          <div className="resource-card-grid">
            {artificialIntelligenceResources.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.title}</span>
                <p>{resource.description}</p>
                <strong>{resource.buttonLabel} ↗</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="degree-detail-section degree-alert-note">
        <h2>Important Course Notes</h2>
        <p>
          Some Artificial Intelligence courses may be offered in specific
          semesters.
        </p>
        <ul>
          <li>CAI 4002 should be offered in fall and spring semesters.</li>
          <li>
            CAI 4100 Introduction to Machine Learning will be offered in Fall
            2026.
          </li>
        </ul>
        <p>
          Some classes are not offered every semester. Check the flowchart and
          ask a Bellini advisor before choosing classes.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Artificial Intelligence"
          compareWith="Computer Science, Cybersecurity, Information Technology, or Computer Science and Engineering"
        />
      </section>

      <section className="degree-detail-section">
        <h2>Questions to Ask an Advisor</h2>
        <ul>
          {artificialIntelligenceAdvisorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <p className="degrees-disclaimer">
        Use this page to explore your options. Check the official USF catalog
        and ask a Bellini advisor before choosing classes.
      </p>

      <div className="degree-detail-actions degree-catalog-action">
        <a
          href="https://catalog.usf.edu/preview_program.php?catoid=25&poid=13990"
          rel="noreferrer"
          target="_blank"
        >
          View More Details in the Catalog ↗
        </a>
      </div>
    </main>
  );
}

function CybersecurityHighSchoolDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">Security • Systems • Risk</p>
        <h1>Cybersecurity</h1>
        <p>
          This major is for students who want to protect computers, accounts,
          networks, and information from online threats.
        </p>

        <div className="degree-tag-list">
          <span>Cybersecurity</span>
          <span>Online Safety</span>
          <span>Networks</span>
          <span>Finding Risks</span>
          <span>Digital Rules</span>
          <span>Computer Systems</span>
          <span>Protecting Information</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Cybersecurity is about keeping technology and information safe.
          Students learn how to protect computers, networks, software, and
          online accounts.
        </p>
        <p>
          Students also learn how people and organizations can avoid security
          problems. This includes online safety rules, privacy, risks, and
          making responsible choices with technology.
        </p>
      </section>

      <section className="degree-detail-section" id="career-outlook">
        <h2>Career Outlook in Tampa Bay: Cybersecurity</h2>
        <div className="degree-overview-card">
          <p>
            Cybersecurity can lead to careers where students help protect
            computers, networks, accounts, and information.
          </p>
          <p>
            USF highlights that Tampa Bay’s tech sector has grown 28.5% over the
            past five years, with companies such as Apple, Lockheed Martin,
            Meta, Jabil, ReliaQuest, and Rapid7 recruiting from USF’s talent
            pool.
          </p>
        </div>
        <p>
          <strong>Cybersecurity graduates may work in roles such as:</strong>
        </p>
        <div className="career-card-grid">
          {cybersecurityCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
              <p className="career-card-salary">
                {career.salaryLabel} <strong>{career.salaryAmount}</strong>{' '}
                {career.salaryContext}
              </p>
            </article>
          ))}
        </div>
        <p>
          These salaries are not guaranteed starting salaries. Pay can depend
          on experience, internships, location, skills, projects, and the
          company.
        </p>

        <div className="job-market-highlights">
          <h3>Tampa Bay Job Market Highlights</h3>
          <p>
            This Tampa Bay career data shows jobs related to Cybersecurity.
          </p>
          <div className="job-stat-grid">
            {cybersecurityMarketStats.map((stat) => (
              <article className="job-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>
          <div className="employment-trend-card">
            <svg
              aria-labelledby="cybersecurity-employment-trend-title"
              className="employment-trend-chart cs-employment-chart"
              role="img"
              viewBox="0 0 720 300"
            >
              <title id="cybersecurity-employment-trend-title">
                Employment trend for cybersecurity-related jobs in
                Tampa Bay from 2023 to 2030
              </title>
              {cybersecurityEmploymentYAxis.map((tick) => (
                <g key={tick.label}>
                  <line className="chart-grid-line" x1="95" x2="690" y1={tick.y} y2={tick.y} />
                  <text className="chart-axis-label" x="82" y={tick.y + 6}>
                    {tick.label}
                  </text>
                </g>
              ))}
              {cybersecurityEmploymentTrend.map((point) => (
                <line
                  className="chart-grid-line vertical"
                  key={point.year}
                  x1={point.x}
                  x2={point.x}
                  y1="25"
                  y2="205"
                />
              ))}
              <polyline
                className="historical-line"
                points={cybersecurityEmploymentTrend
                  .slice(0, 4)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              <polyline
                className="projected-line"
                points={cybersecurityEmploymentTrend
                  .slice(3)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              {cybersecurityEmploymentTrend.map((point, index) => (
                <circle
                  className={index <= 3 ? 'historical-point' : 'projected-point'}
                  cx={point.x}
                  cy={point.y}
                  key={point.year}
                  r="7"
                >
                  <title>
                    {point.year}: {point.jobs} jobs
                  </title>
                </circle>
              ))}
              {cybersecurityEmploymentTrend.map((point) => (
                <text
                  className="chart-axis-label year"
                  key={point.year}
                  x={point.x}
                  y="236"
                >
                  {point.year}
                </text>
              ))}
              <text className="chart-title" x="392" y="282">
                Annual Employment Numbers
              </text>
            </svg>
          </div>
          <div className="growth-snapshot">
            {cybersecurityGrowthStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.description}</small>
              </article>
            ))}
          </div>
          <div className="job-market-explanation">
            <h4>What do these numbers mean?</h4>
            <p>
              This graph shows that cybersecurity-related jobs are expected to
              grow over time in the Tampa Bay area. It does not guarantee a
              job, but it shows that this field connects to local
              opportunities. Pay can depend on experience, internships,
              location, projects, skills, and the company.
            </p>
          </div>
          <div className="job-market-explanation">
            <h4>Top Related Jobs by Income in Tampa Bay</h4>
            <p>Some related Cybersecurity career areas include:</p>
            <ul className="tampa-income-list">
              {cybersecurityTopIncomeRoles.map((role) => (
                <li key={role.title}>
                  {role.title} — {role.salary}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <BeyondTheClassroom />
        <div className="degree-detail-actions">
          <a
            href="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscys.aspx"
            rel="noreferrer"
            target="_blank"
          >
            View Cybersecurity Career Information ↗
          </a>
          <Link to="/high-school/career-paths">
            View Another Major
          </Link>
        </div>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <p>This major may be a good choice if you:</p>
          <ul>
            {cybersecurityFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
          <p>This major may feel harder if you:</p>
          <ul>
            {cybersecurityChallengeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="degree-detail-section">
        <h2>Skills Students May Build</h2>
        <div className="degree-skill-chips">
          {cybersecuritySkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="degree-detail-section" id="official-resources">
        <h2>Flowcharts, Plans, and Electives</h2>

        <div className="resource-group">
          <h3>Program Flowcharts</h3>
          <div className="resource-card-grid compact">
            {cybersecurityFlowcharts.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.label}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.label}</span>
                <small>Open official resource ↗</small>
              </a>
            ))}
          </div>
        </div>

        <div className="resource-group">
          <h3>Current Catalog Year Resources</h3>
          <div className="resource-card-grid">
            {cybersecurityResources.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.title}</span>
                <p>{resource.description}</p>
                <strong>{resource.buttonLabel} ↗</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="degree-detail-section degree-alert-note">
        <h2>Important Course Notes</h2>
        <p>
          Some Cybersecurity classes need special permission before you can
          register. Some class options have also changed.
        </p>
        <ul>
          <li>
            Muma College of Business permits are required for{' '}
            <a
              href="https://www.usf.edu/business/undergraduate/advising/permit.aspx"
              rel="noreferrer"
              target="_blank"
            >
              ISM 4323 Information Security and IT Risk Management
            </a>{' '}
            and{' '}
            <a
              href="https://www.usf.edu/business/undergraduate/advising/permit.aspx"
              rel="noreferrer"
              target="_blank"
            >
              ISM 4041 Global Cyberethics
            </a>
            .
          </li>
          <li>CIS 4253 IT Ethics is now the preferred option.</li>
          <li>
            Cybersecurity students should no longer take{' '}
            <a
              href="https://usf.az1.qualtrics.com/jfe/form/SV_5oTNUpfPEwdfeya"
              rel="noreferrer"
              target="_blank"
            >
              LIS 4414 Information Policy and Ethics
            </a>
            .
          </li>
          <li>A permit is required for CIS 4253.</li>
        </ul>
        <p>
          Check with a Bellini advisor before registering so you know which
          classes and permission forms you need.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Cybersecurity"
          compareWith="Computer Science, Artificial Intelligence, Information Technology, or Computer Science and Engineering"
        />
      </section>

      <section className="degree-detail-section">
        <h2>Questions to Ask an Advisor</h2>
        <ul>
          {cybersecurityAdvisorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <p className="degrees-disclaimer">
        Use this page to explore your options. Check the official USF catalog
        and ask a Bellini advisor before choosing classes or registering.
      </p>

      <div className="degree-detail-actions degree-catalog-action">
        <a
          href="https://catalog.usf.edu/preview_program.php?catoid=25&poid=13068"
          rel="noreferrer"
          target="_blank"
        >
          View More Details in the Catalog ↗
        </a>
      </div>
    </main>
  );
}

function InformationTechnologyHighSchoolDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">IT Systems • Databases • Networks</p>
        <h1>Information Technology</h1>
        <p>
          This major is for students who want to set up, support, and improve
          the technology people use every day.
        </p>

        <div className="degree-tag-list">
          <span>Information Technology</span>
          <span>Coding</span>
          <span>Databases</span>
          <span>Networking</span>
          <span>Websites</span>
          <span>Online Safety</span>
          <span>User-Friendly Technology</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Information Technology is about helping technology work well for
          people and organizations. Students learn about coding, databases,
          networks, websites, and online safety.
        </p>
        <p>
          Students also learn how to find and fix technology problems. These
          skills can be useful in businesses, schools, hospitals, government
          offices, and many other workplaces.
        </p>
      </section>

      <section className="degree-detail-section" id="career-outlook">
        <h2>Career Outlook in Tampa Bay: Information Technology</h2>
        <div className="degree-overview-card">
          <p>
            Information Technology can lead to careers where students help set
            up, manage, support, and protect technology used by people and
            organizations.
          </p>
          <p>
            USF highlights that Tampa Bay’s tech sector has grown 28.5% over the
            past five years, with companies such as Apple, Lockheed Martin,
            Meta, Jabil, ReliaQuest, and Rapid7 recruiting from USF’s talent
            pool.
          </p>
        </div>
        <p>
          <strong>
            Information Technology graduates may work in roles such as:
          </strong>
        </p>
        <div className="career-card-grid">
          {informationTechnologyCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
              <p className="career-card-salary">
                {career.salaryLabel} <strong>{career.salaryAmount}</strong>{' '}
                {career.salaryContext}
              </p>
            </article>
          ))}
        </div>
        <p>
          These salaries are not guaranteed starting salaries. Pay can depend
          on experience, internships, location, skills, projects, and the
          company.
        </p>

        <div className="job-market-highlights">
          <h3>Tampa Bay Job Market Highlights</h3>
          <p>
            This Tampa Bay career data shows jobs related to Information
            Technology.
          </p>
          <div className="job-stat-grid">
            {informationTechnologyTampaStats.map((stat) => (
              <article className="job-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>
          <div className="employment-trend-card">
            <svg
              aria-labelledby="information-technology-employment-trend-title"
              className="employment-trend-chart cs-employment-chart"
              role="img"
              viewBox="0 0 720 300"
            >
              <title id="information-technology-employment-trend-title">
                Employment trend for Information Technology-related jobs in
                Tampa Bay from 2023 to 2030
              </title>
              {informationTechnologyEmploymentYAxis.map((tick) => (
                <g key={tick.label}>
                  <line className="chart-grid-line" x1="95" x2="690" y1={tick.y} y2={tick.y} />
                  <text className="chart-axis-label" x="82" y={tick.y + 6}>
                    {tick.label}
                  </text>
                </g>
              ))}
              {informationTechnologyEmploymentTrend.map((point) => (
                <line
                  className="chart-grid-line vertical"
                  key={point.year}
                  x1={point.x}
                  x2={point.x}
                  y1="15"
                  y2="195"
                />
              ))}
              <polyline
                className="historical-line"
                points={informationTechnologyEmploymentTrend
                  .slice(0, 4)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              <polyline
                className="projected-line"
                points={informationTechnologyEmploymentTrend
                  .slice(3)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              {informationTechnologyEmploymentTrend.map((point, index) => (
                <circle
                  className={index <= 3 ? 'historical-point' : 'projected-point'}
                  cx={point.x}
                  cy={point.y}
                  key={point.year}
                  r="7"
                >
                  <title>
                    {point.year}: {point.jobs} jobs
                  </title>
                </circle>
              ))}
              {informationTechnologyEmploymentTrend.map((point) => (
                <text
                  className="chart-axis-label year"
                  key={point.year}
                  x={point.x}
                  y="236"
                >
                  {point.year}
                </text>
              ))}
              <text className="chart-title" x="392" y="282">
                Annual Employment Numbers
              </text>
            </svg>
          </div>
          <div className="growth-snapshot">
            {informationTechnologyGrowthStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.description}</small>
              </article>
            ))}
          </div>
          <div className="job-market-explanation">
            <h4>What do these numbers mean?</h4>
            <p>
              This graph shows that IT-related jobs in the Tampa Bay area are
              expected to grow over time. It does not guarantee a job, but it
              shows that this field connects to local opportunities. Pay can
              depend on experience, internships, location, projects, skills,
              and the company.
            </p>
          </div>
          <div className="job-market-explanation">
            <h4>Top Related Jobs by Income in Tampa Bay</h4>
            <p>Some related Information Technology career areas include:</p>
            <ul className="tampa-income-list">
              {informationTechnologyTopIncomeRoles.map((role) => (
                <li key={role.title}>
                  {role.title} — {role.salary}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <BeyondTheClassroom />
        <div className="degree-detail-actions">
          <a
            href="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bsit.aspx"
            rel="noreferrer"
            target="_blank"
          >
            View Information Technology Career Information ↗
          </a>
          <Link to="/high-school/career-paths">
            View Another Major
          </Link>
        </div>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <p>This major may be a good choice if you:</p>
          <ul>
            {informationTechnologyFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
          <p>This major may feel harder if you:</p>
          <ul>
            {informationTechnologyChallengeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="degree-detail-section">
        <h2>Skills Students May Build</h2>
        <div className="degree-skill-chips">
          {informationTechnologySkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="degree-detail-section" id="official-resources">
        <h2>Flowcharts, Plans, and Electives</h2>

        <div className="resource-group">
          <h3>Program Flowcharts</h3>
          <div className="resource-card-grid compact">
            {informationTechnologyFlowcharts.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.label}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.label}</span>
                <small>Open official resource ↗</small>
              </a>
            ))}
          </div>
        </div>

        <div className="resource-group">
          <h3>Current Catalog Year Resources</h3>
          <div className="resource-card-grid">
            {informationTechnologyResources.map((resource) => (
              <a
                className="resource-card"
                href={resource.url}
                key={resource.title}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.title}</span>
                <p>{resource.description}</p>
                <strong>{resource.buttonLabel} ↗</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="degree-detail-section degree-alert-note">
        <h2>Important Course Notes</h2>
        <p>
          Some Information Technology classes are only offered during certain
          semesters.
        </p>
        <ul>
          <li>CGS 3853 Web Systems is offered in the Fall semester only.</li>
          <li>
            CNT 4603 System Administration and Maintenance for IT is offered in
            the Fall semester only.
          </li>
          <li>
            CIS 4083 Cloud Computing will be offered in the Fall semester only.
          </li>
          <li>
            CIS 3433 System Integration and Architecture will be offered in the
            Spring semester only.
          </li>
          <li>CIS 4253 IT Ethics is now the preferred option.</li>
          <li>
            <a
              href="https://usf.az1.qualtrics.com/jfe/form/SV_5oTNUpfPEwdfeya"
              rel="noreferrer"
              target="_blank"
            >
              LIS 4414 Information Policy and Ethics
            </a>{' '}
            has a separate advising form.
          </li>
          <li>A permit is required for CIS 4253.</li>
        </ul>
        <p>
          Some classes are not offered every semester, and some need special
          permission. Check the flowchart and ask a Bellini advisor before
          choosing classes.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Information Technology"
          compareWith="Computer Science, Cybersecurity, Artificial Intelligence, or Computer Science and Engineering"
        />
      </section>

      <section className="degree-detail-section">
        <h2>Questions to Ask an Advisor</h2>
        <ul>
          {informationTechnologyAdvisorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <p className="degrees-disclaimer">
        Use this page to explore your options. Check the official USF catalog
        and ask a Bellini advisor before choosing classes or registering.
      </p>

      <div className="degree-detail-actions degree-catalog-action">
        <a
          href="https://catalog.usf.edu/preview_program.php?catoid=25&poid=13071"
          rel="noreferrer"
          target="_blank"
        >
          View More Details in the Catalog ↗
        </a>
      </div>
    </main>
  );
}

function HighSchoolDegreeDetail() {
  const { degreeSlug } = useParams();
  const degree = getDegreeBySlug(degreeSlug);

  if (!degree) {
    return (
      <main className="degree-detail-page">
        <section className="degree-detail-hero">
          <p className="degrees-eyebrow">Degree not found</p>
          <h1>We could not find that degree page.</h1>
          <Link to="/high-school/degrees">Back to Degree Explorer</Link>
        </section>
      </main>
    );
  }

  if (degree.slug === 'computer-science') {
    return <ComputerScienceHighSchoolDegreeDetail />;
  }

  if (degree.slug === 'computer-science-and-engineering') {
    return <ComputerScienceEngineeringHighSchoolDegreeDetail />;
  }

  if (degree.slug === 'artificial-intelligence') {
    return <ArtificialIntelligenceHighSchoolDegreeDetail />;
  }

  if (degree.slug === 'cybersecurity') {
    return <CybersecurityHighSchoolDegreeDetail />;
  }

  if (degree.slug === 'information-technology') {
    return <InformationTechnologyHighSchoolDegreeDetail />;
  }

  return (
    <main className="degree-detail-page">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero">
        <p className="degrees-eyebrow">{degree.category}</p>
        <h1>
          {degree.name}, {degree.credential}
        </h1>
        <p>{degree.overview}</p>
      </section>

      <section className="degree-detail-grid">
        <article>
          <h2>Best For</h2>
          <p>{degree.bestFor}</p>
        </article>

        <article>
          <h2>Core Skills</h2>
          <p>{degree.skills}</p>
        </article>
      </section>

      <section className="degree-detail-section">
        <h2>Who This May Fit</h2>
        <ul>
          {degree.goodFit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="degree-detail-section">
        <h2>Topics You May Explore</h2>
        <ul>
          {degree.sampleTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <h2>Suggested Next Steps</h2>
        <ul>
          {degree.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <div className="degree-detail-actions">
          <Link to="/quiz">Take Degree Fit Quiz</Link>
          <Link to="/high-school/degrees">Compare More Programs</Link>
        </div>
      </section>

      <p className="degrees-disclaimer">
        This page is for exploration only. Students should confirm official
        requirements, course availability, and degree plans with USF advising
        and the undergraduate catalog.
      </p>
    </main>
  );
}

export default HighSchoolDegreeDetail;

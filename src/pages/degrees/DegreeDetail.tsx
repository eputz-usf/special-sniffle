import InterdisciplinaryDegreeDetail from '../../components/InterdisciplinaryDegreeDetail';
import { getHighSchoolFutureDegreeOptionBySlug } from '../../data/highSchoolFutureDegreeOptions';
import { type ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getDegreeBySlug } from '../../data/degrees';
import type { UserType } from '../../types/user';
import { getDegreeSource, getDegreeUserType } from '../../utils/degreeSource';
import '../../styles/degrees.css';

type CompareFeatureNoteProps = {
  degreeName: string;
  compareWith: string;
};

type AdvisorQuestionGroup = {
  userType: UserType;
  questions: string[];
};

type AdvisorQuestionsSectionProps = {
  degreeName: string;
  transferQuestions: string[];
  compareWith: string;
  prepAreas: string;
  advancedAreas: string;
  interestAreas: string;
};

function useDegreeExplorerPath() {
  const [searchParams] = useSearchParams();
  const sourceDashboard = getDegreeSource(searchParams.get('from'));

  return sourceDashboard ? `/degrees?from=${sourceDashboard}` : '/degrees';
}

function DegreeExplorerLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const degreeExplorerPath = useDegreeExplorerPath();

  return (
    <Link className={className} to={degreeExplorerPath}>
      {children}
    </Link>
  );
}

function buildAdvisorQuestionGroups({
  degreeName,
  transferQuestions,
  compareWith,
  prepAreas,
  advancedAreas,
  interestAreas,
}: AdvisorQuestionsSectionProps): AdvisorQuestionGroup[] {
  return [
    {
      userType: 'prospective-student',
      questions: [
        `Which high school, dual enrollment, AP, IB, or first-year courses would best prepare me for ${degreeName}?`,
        `What math and programming preparation should I build before starting ${degreeName}?`,
        `How should I compare ${degreeName} with ${compareWith} before applying or choosing a major?`,
        `Which clubs, projects, campus visits, or student organizations would help me explore ${interestAreas}?`,
        `What should I ask admissions or advising if I am still deciding whether ${degreeName} is the right fit?`,
      ],
    },
    {
      userType: 'current-usf-student',
      questions: [
        `Which completed USF courses are likely to apply to ${degreeName}?`,
        `How would changing into ${degreeName} affect my catalog year, prerequisites, and time to graduation?`,
        `Which ${prepAreas} courses should I prioritize before moving into ${advancedAreas}?`,
        `How should I compare ${degreeName} with ${compareWith} based on my completed USF coursework?`,
        `Which electives, research, internships, or projects would support my interests in ${interestAreas}?`,
      ],
    },
    {
      userType: 'current-bellini-student',
      questions: [
        `Which Bellini College requirements for ${degreeName} should I confirm for my catalog year?`,
        `How should I sequence ${prepAreas} and ${advancedAreas} courses for the next two semesters?`,
        `Which permits, prerequisite checks, or limited-offering courses could affect my schedule?`,
        `How should I compare ${degreeName} with ${compareWith} if I am considering a major change within Bellini College?`,
        `Which electives, faculty opportunities, internships, or projects would help me focus on ${interestAreas}?`,
      ],
    },
    {
      userType: 'transfer-student',
      questions: transferQuestions,
    },
  ];
}

function AdvisorQuestionsSection(props: AdvisorQuestionsSectionProps) {
  const [searchParams] = useSearchParams();
  const userType = getDegreeUserType(getDegreeSource(searchParams.get('from')));
  const questionGroups = buildAdvisorQuestionGroups(props);
  const selectedQuestions =
    questionGroups.find((group) => group.userType === userType)?.questions ??
    props.transferQuestions;

  return (
    <section className="degree-detail-section">
      <h2>Questions to Ask an Advisor</h2>
      <ul>
        {selectedQuestions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
    </section>
  );
}

function CompareFeatureNote({
  degreeName,
  compareWith,
}: CompareFeatureNoteProps) {
  return (
    <>
      <h2>Want to Compare {degreeName}?</h2>
      <p>
        Use the Degree Explorer comparison feature to compare {degreeName} with{' '}
        {compareWith}. From the Degree Explorer page, choose Add to Compare on
        two degree cards, then open the side-by-side comparison to review focus
        areas, skills, fit, sample topics, next steps, and official links.
      </p>
      <div className="degree-detail-actions">
        <DegreeExplorerLink>Back to Degree Explorer</DegreeExplorerLink>
      </div>
    </>
  );
}

type CareerOutlookSectionProps = {
  degreeName: string;
  intro: string;
  slug: string;
  careerInfoUrl: string;
};

type JobMarketStat = {
  value: string;
  label: string;
  description: string;
};

type EmploymentTrendPoint = {
  year: string;
  jobs: string;
  x: number;
  y: number;
};

type EmploymentAxisTick = {
  label: string;
  y: number;
};

type GrowthStat = {
  label: string;
  value: string;
  description: string;
};

type CareerMarketData = {
  stats: JobMarketStat[];
  employmentTrend: EmploymentTrendPoint[];
  employmentYAxis: EmploymentAxisTick[];
  growthStats: GrowthStat[];
  topOccupations: string[];
  chartViewBox?: string;
  verticalLineY1?: string;
  verticalLineY2?: string;
  yearLabelY?: string;
  chartTitleY?: string;
};

const careerMarketDataBySlug: Record<string, CareerMarketData> = {
  'computer-science': {
    stats: [
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
    ],
    employmentTrend: [
      { year: '2023', jobs: '18,873', x: 95, y: 171 },
      { year: '2024', jobs: '19,605', x: 180, y: 106 },
      { year: '2025', jobs: '19,568', x: 265, y: 109 },
      { year: '2026', jobs: '19,872', x: 350, y: 82 },
      { year: '2027', jobs: '20,094', x: 435, y: 62 },
      { year: '2028', jobs: '20,260', x: 520, y: 47 },
      { year: '2029', jobs: '20,392', x: 605, y: 35 },
      { year: '2030', jobs: '20,437', x: 690, y: 31 },
    ],
    employmentYAxis: [
      { label: '20,500', y: 25 },
      { label: '20,000', y: 70 },
      { label: '19,500', y: 115 },
      { label: '19,000', y: 160 },
      { label: '18,500', y: 205 },
    ],
    growthStats: [
      { label: 'Past Growth', value: '5.3%', description: '2023-2026' },
      { label: 'Projected Growth', value: '2.8%', description: '2026-2030' },
    ],
    topOccupations: [
      'Computer Systems Analysts — $101,678',
      'Database Administrators — $100,085',
      'Network and Computer Systems Administrators — $96,898',
      'Software Quality Assurance Analysts and Testers — $88,479',
      'Computer Occupations, All Other — $85,667',
      'Web and Digital Interface Designers — $69,718',
    ],
  },
  'computer-science-and-engineering': {
    stats: [
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
    ],
    employmentTrend: [
      { year: '2023', jobs: '35,791', x: 95, y: 186 },
      { year: '2024', jobs: '37,474', x: 180, y: 136 },
      { year: '2025', jobs: '37,790', x: 265, y: 126 },
      { year: '2026', jobs: '38,554', x: 350, y: 103 },
      { year: '2027', jobs: '39,168', x: 435, y: 85 },
      { year: '2028', jobs: '39,655', x: 520, y: 70 },
      { year: '2029', jobs: '40,067', x: 605, y: 58 },
      { year: '2030', jobs: '40,280', x: 690, y: 52 },
    ],
    employmentYAxis: [
      { label: '41,000', y: 30 },
      { label: '39,000', y: 90 },
      { label: '37,000', y: 150 },
      { label: '35,000', y: 210 },
    ],
    growthStats: [
      { label: 'Past Growth', value: '7.7%', description: '2023-2026' },
      { label: 'Projected Growth', value: '4.5%', description: '2026-2030' },
    ],
    topOccupations: [
      'Computer and Information Systems Managers — $165,387',
      'Computer Network Architects — $128,932',
      'Database Architects — $128,802',
      'Computer and Information Research Scientists — $127,420',
      'Computer Systems Analysts — $101,678',
    ],
    verticalLineY1: '30',
    verticalLineY2: '210',
    yearLabelY: '242',
  },
  'artificial-intelligence': {
    stats: [
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
    ],
    employmentTrend: [
      { year: '2023', jobs: '8,358', x: 95, y: 190 },
      { year: '2024', jobs: '9,196', x: 180, y: 116 },
      { year: '2025', jobs: '9,252', x: 265, y: 111 },
      { year: '2026', jobs: '9,468', x: 350, y: 92 },
      { year: '2027', jobs: '9,648', x: 435, y: 76 },
      { year: '2028', jobs: '9,797', x: 520, y: 63 },
      { year: '2029', jobs: '9,925', x: 605, y: 52 },
      { year: '2030', jobs: '10,004', x: 690, y: 45 },
    ],
    employmentYAxis: [
      { label: '10,500', y: 25 },
      { label: '10,000', y: 70 },
      { label: '9,500', y: 115 },
      { label: '9,000', y: 160 },
      { label: '8,500', y: 205 },
      { label: '8,000', y: 250 },
    ],
    growthStats: [
      { label: 'Past Growth', value: '13.3%', description: '2023-2026' },
      { label: 'Projected Growth', value: '5.7%', description: '2026-2030' },
    ],
    topOccupations: [
      'Data Scientists — $111,254',
      'Software Quality Assurance Analysts and Testers — $88,479',
      'Computer Occupations, All Other — $85,667',
    ],
    chartViewBox: '0 0 720 340',
    verticalLineY2: '250',
    yearLabelY: '282',
    chartTitleY: '326',
  },
  cybersecurity: {
    stats: [
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
        description: 'Expected from 2026-2030',
      },
    ],
    employmentTrend: [
      { year: '2023', jobs: '12,915', x: 95, y: 134 },
      { year: '2024', jobs: '12,608', x: 180, y: 203 },
      { year: '2025', jobs: '12,639', x: 265, y: 196 },
      { year: '2026', jobs: '12,861', x: 350, y: 146 },
      { year: '2027', jobs: '13,032', x: 435, y: 108 },
      { year: '2028', jobs: '13,167', x: 520, y: 77 },
      { year: '2029', jobs: '13,277', x: 605, y: 53 },
      { year: '2030', jobs: '13,328', x: 690, y: 41 },
    ],
    employmentYAxis: [
      { label: '13,400', y: 25 },
      { label: '13,200', y: 70 },
      { label: '13,000', y: 115 },
      { label: '12,800', y: 160 },
      { label: '12,600', y: 205 },
    ],
    growthStats: [
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
    ],
    topOccupations: [
      'Information Security Analysts — $104,012',
      'Database Administrators — $100,085',
      'Network and Computer Systems Administrators — $96,898',
      'Computer Occupations, All Other — $85,667',
      'Computer Network Support Specialists — $75,765',
    ],
  },
  'information-technology': {
    stats: [
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
        description: 'Expected from 2026-2030',
      },
    ],
    employmentTrend: [
      { year: '2023', jobs: '37,705', x: 95, y: 139 },
      { year: '2024', jobs: '37,419', x: 180, y: 165 },
      { year: '2025', jobs: '37,442', x: 265, y: 163 },
      { year: '2026', jobs: '38,212', x: 350, y: 94 },
      { year: '2027', jobs: '38,827', x: 435, y: 66 },
      { year: '2028', jobs: '39,335', x: 520, y: 43 },
      { year: '2029', jobs: '39,759', x: 605, y: 24 },
      { year: '2030', jobs: '39,994', x: 690, y: 14 },
    ],
    employmentYAxis: [
      { label: '40,000', y: 15 },
      { label: '39,000', y: 75 },
      { label: '38,000', y: 135 },
      { label: '37,000', y: 195 },
    ],
    growthStats: [
      { label: 'Past Growth', value: '1.3%', description: '2023-2026' },
      { label: 'Projected Growth', value: '4.7%', description: '2026-2030' },
    ],
    topOccupations: [
      'Software Developers — $125,464',
      'Information Security Analysts — $104,012',
      'Computer Systems Analysts — $101,678',
      'Network and Computer Systems Administrators — $96,898',
      'Software Quality Assurance Analysts and Testers — $88,479',
    ],
    verticalLineY1: '15',
    verticalLineY2: '195',
  },
};

const degreeExperiencePaths = [
  {
    title: 'Internships',
    description:
      'Internships can help students test a career direction, build a portfolio, and connect academic work to employer expectations before graduation.',
  },
  {
    title: 'Co-Op',
    description:
      'A co-op can provide a longer paid work experience connected to the major, which may be especially useful when comparing timelines, credits, and graduation planning.',
  },
  {
    title: 'Undergraduate Research',
    description:
      'Undergraduate research with faculty can strengthen preparation for advanced technical work, graduate study, and project-based experience in AI, cybersecurity, data, software, or systems.',
  },
];

function BeyondTheClassroom() {
  return (
    <>
      <h3>Beyond the Classroom</h3>
      <p>
        Professional preparation can matter as much as course selection.
        Students should consider experiences that build evidence of skill,
        clarify career direction, and support conversations with advisors or
        employers.
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

function CareerOutlookSection({
  careerInfoUrl,
  degreeName,
  intro,
  slug,
}: CareerOutlookSectionProps) {
  const careerOptions = getDegreeBySlug(slug)?.careerOptions ?? [];
  const marketData = careerMarketDataBySlug[slug];

  if (careerOptions.length === 0) {
    return null;
  }

  return (
    <section className="degree-detail-section" id="career-outlook">
      <h2>Career Outlook in Tampa Bay: {degreeName}</h2>
      <div className="degree-overview-card">
        <p>{intro}</p>
        <p>
          USF highlights that Tampa Bay’s tech sector has grown 28.5% over the
          past five years, with companies such as Apple, Lockheed Martin, Meta,
          Jabil, ReliaQuest, and Rapid7 recruiting from USF’s talent pool.
        </p>
      </div>
      <p>
        <strong>{degreeName} graduates may work in roles such as:</strong>
      </p>

      <div className="career-card-grid">
        {careerOptions.map((career) => (
          <article className="career-card" key={career.title}>
            <h3>{career.title}</h3>
            <p>{career.description}</p>
            <p className="career-card-salary">
              <strong>{career.salary}</strong>
            </p>
          </article>
        ))}
      </div>
      <p>
        These salaries are not guaranteed starting salaries. Pay can depend on
        experience, internships, location, skills, projects, and the company.
      </p>

      {marketData && (
        <div className="job-market-highlights">
          <h3>Tampa Bay Job Market Highlights</h3>
          <p>
            This Tampa Bay career data shows local roles related to{' '}
            {degreeName}.
          </p>
          <div className="job-stat-grid">
            {marketData.stats.map((stat) => (
              <article className="job-stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>

          <div className="employment-trend-card">
            <svg
              aria-labelledby={`${slug}-employment-trend-title`}
              className="employment-trend-chart cs-employment-chart"
              role="img"
              viewBox={marketData.chartViewBox ?? '0 0 720 300'}
            >
              <title id={`${slug}-employment-trend-title`}>
                {`Employment trend for ${degreeName}-related jobs in Tampa Bay from 2023 to 2030`}
              </title>
              {marketData.employmentYAxis.map((tick) => (
                <g key={tick.label}>
                  <line
                    className="chart-grid-line"
                    x1="95"
                    x2="690"
                    y1={tick.y}
                    y2={tick.y}
                  />
                  <text className="chart-axis-label" x="82" y={tick.y + 6}>
                    {tick.label}
                  </text>
                </g>
              ))}
              {marketData.employmentTrend.map((point) => (
                <line
                  className="chart-grid-line vertical"
                  key={point.year}
                  x1={point.x}
                  x2={point.x}
                  y1={marketData.verticalLineY1 ?? '25'}
                  y2={marketData.verticalLineY2 ?? '205'}
                />
              ))}
              <polyline
                className="historical-line"
                points={marketData.employmentTrend
                  .slice(0, 4)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              <polyline
                className="projected-line"
                points={marketData.employmentTrend
                  .slice(3)
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
              />
              {marketData.employmentTrend.map((point, index) => (
                <circle
                  className={index <= 3 ? 'historical-point' : 'projected-point'}
                  cx={point.x}
                  cy={point.y}
                  key={point.year}
                  r="7"
                >
                  <title>{`${point.year}: ${point.jobs} jobs`}</title>
                </circle>
              ))}
              {marketData.employmentTrend.map((point) => (
                <text
                  className="chart-axis-label year"
                  key={point.year}
                  x={point.x}
                  y={marketData.yearLabelY ?? '236'}
                >
                  {point.year}
                </text>
              ))}
              <text className="chart-title" x="392" y={marketData.chartTitleY ?? '282'}>
                Annual Employment Numbers
              </text>
            </svg>
          </div>

          <div className="growth-snapshot">
            {marketData.growthStats.map((stat) => (
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
              These figures are labor-market context, not promises of admission,
              employment, or salary. Outcomes can vary by completed coursework,
              transfer credits, experience, internships, projects, location, and
              employer needs.
            </p>
          </div>
          <div className="job-market-explanation">
            <h4>Top Related Jobs by Income in Tampa Bay</h4>
            <p>Some related {degreeName} career areas include:</p>
            <ul className="tampa-income-list">
              {marketData.topOccupations.map((occupation) => (
                <li key={occupation}>{occupation}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <BeyondTheClassroom />
      <div className="degree-detail-actions">
        <a href={careerInfoUrl} rel="noreferrer" target="_blank">
          View {degreeName} Career Information ↗
        </a>
        <DegreeExplorerLink>View Another Major</DegreeExplorerLink>
      </div>
    </section>
  );
}

const computerScienceSkills = [
  'Programming',
  'Algorithms',
  'Data Structures',
  'Object-Oriented Design',
  'Software Development',
  'Operating Systems',
  'Computer Architecture',
  'Digital Logic',
  'Problem Solving',
  'Debugging',
  'Databases',
  'Advanced Computing Electives',
  'AI-Related Topics',
];

const computerScienceFitItems = [
  'Enjoy coding or want to learn how to code deeply',
  'Like solving logical or step-by-step problems',
  'Want to build apps, websites, tools, or software systems',
  'Are interested in algorithms, data, AI, or software engineering',
  'Want a broad computing degree that can lead to many technology careers',
  'Like understanding how technology works behind the scenes',
  'Are open to math, technical problem solving, and abstract thinking',
];

const computerScienceChallengeItems = [
  'Do not enjoy programming or debugging',
  'Prefer mostly hands-on hardware work instead of software',
  'Want a program focused mainly on business technology or IT support',
  'Want a program focused only on cybersecurity instead of broad computing',
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
      'Use this if you want to see a shorter planning pathway, especially if you are a transfer student or student entering with many completed credits.',
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
      'Use this if you want to explore advanced course options and interest areas within Computer Science.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/202229912/download?download_frd=1',
  },
];

const advisorQuestions = [
  'Which of my completed programming, calculus, science, or general education courses are likely to apply to the Computer Science degree?',
  'Should I follow the two-year plan, the four-year flowchart, or a custom transfer plan based on my completed credits?',
  'Which prerequisite courses could delay entry into upper-level Computer Science coursework if they do not transfer cleanly?',
  'How should I sequence programming, math, systems, and theory courses during my first year after transfer?',
  'Which electives would help me connect Computer Science with AI, cybersecurity, data, software engineering, or graduate study?',
  'If I am comparing Computer Science with Artificial Intelligence or Computer Science and Engineering, what degree requirements should decide the choice?',
  'What portfolio, internship, research, or project experience should I prioritize as a transfer student with limited time before graduation?',
  'Are Bachelor’s/Master’s pathway options realistic for my transfer timeline and remaining credit load?',
];

const computerScienceEngineeringSkills = [
  'Programming',
  'Software Development',
  'Engineering Problem Solving',
  'Computer Architecture',
  'Systems Design',
  'Hardware/Software Integration',
  'Low-Level Computing Concepts',
  'Advanced Software Applications',
  'Intelligent Applications',
  'Technical Design',
  'Problem Solving',
  'Computing Systems Thinking',
];

const computerScienceEngineeringFitItems = [
  'Are interested in both software and hardware',
  'Want to understand complete computing systems from low-level hardware to advanced applications',
  'Like programming, systems, and engineering-style problem solving',
  'Are interested in computer architecture, embedded systems, robotics, AI, or intelligent applications',
  'Want a degree that combines software foundations with systems and engineering concepts',
  'Enjoy technical design and understanding how different parts of a system work together',
  'Are comfortable with math, programming, and detailed technical problem solving',
];

const computerScienceEngineeringChallengeItems = [
  'Want a degree focused mostly on software only',
  'Want a degree focused mostly on hardware and lab-heavy engineering only',
  'Prefer applied IT, networking, or user support over systems design',
  'Do not enjoy technical depth across both hardware and software areas',
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
      'Use this for students who want to see the planned four-year pathway for the Computer Science and Engineering degree.',
    buttonLabel: 'View 4-Year Plan',
    url: 'https://www.usf.edu/ai-cybersecurity-computing/documents/academic-pdfs/2026/cse-curriculum-2026.pdf',
  },
];

const computerScienceEngineeringAdvisorQuestions = [
  'Which of my completed programming, calculus, physics, engineering, or general education courses are likely to apply to Computer Science and Engineering?',
  'Because this is a newer program, which official requirements should I use until catalog information is fully reflected?',
  'Is the four-year plan adaptable to my transfer credits, or would another computing major create a more efficient path to graduation?',
  'Which hardware, systems, math, or engineering prerequisites should I complete before attempting upper-level coursework?',
  'How does the required coursework differ from Computer Science if I am trying to decide between the two degrees?',
  'Would my prior coursework support interests in embedded systems, robotics, AI systems, or systems engineering?',
  'What first-semester schedule would reduce sequencing risk for a transfer student entering this program?',
  'What projects, labs, or internships would best demonstrate systems-oriented experience before graduation?',
];

const artificialIntelligenceSkills = [
  'Programming',
  'Algorithms',
  'Machine Learning',
  'Neural Networks',
  'Data Analysis',
  'Software Engineering',
  'Operating Systems',
  'Secure Computing',
  'Model Evaluation',
  'Pattern Recognition',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Robotics',
  'Reinforcement Learning',
];

const artificialIntelligenceFitItems = [
  'Are interested in artificial intelligence, machine learning, or intelligent systems',
  'Like working with data, patterns, predictions, and models',
  'Enjoy programming and technical problem solving',
  'Are curious about tools like chatbots, recommendation systems, computer vision, or robotics',
  'Want to learn how software systems can make decisions or support automation',
  'Are comfortable with math, logic, algorithms, and abstract thinking',
  'Want a degree focused more directly on AI than a general Computer Science degree',
];

const artificialIntelligenceChallengeItems = [
  'Do not enjoy programming or debugging',
  'Do not like math-heavy or algorithm-heavy problem solving',
  'Want a broader software degree without specializing early in AI',
  'Prefer hardware design, circuits, or embedded systems as your main focus',
  'Prefer applied IT systems, networking, or user support over AI models and algorithms',
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
      'Use this for students who want to see a shorter planning pathway, especially transfer students or students entering with many completed credits.',
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
      'Use this for students who want to explore advanced AI course options and interest areas.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/202229924/download?download_frd=1',
  },
];

const artificialIntelligenceAdvisorQuestions = [
  'Which of my completed programming, calculus, statistics, data, or general education courses are likely to apply to the Artificial Intelligence degree?',
  'Do I have the math and programming preparation needed to begin AI coursework without adding extra prerequisite semesters?',
  'Should I follow the two-year plan, the four-year flowchart, or a custom transfer sequence based on course availability?',
  'Which AI courses or electives are offered only in specific semesters, and how could that affect my graduation timeline?',
  'If I am comparing Artificial Intelligence with Computer Science, which requirements and elective options should carry the most weight?',
  'Which electives would best support interests in machine learning, robotics, natural language processing, computer vision, or data mining?',
  'What research labs, data projects, internships, or portfolio work should I prioritize as a transfer student?',
  'Are Bachelor’s/Master’s pathway options realistic if I am entering with transfer credits?',
];

const cybersecuritySkills = [
  'Security Fundamentals',
  'Network Security',
  'Secure Computing',
  'Risk Management',
  'Cyber Defense',
  'Systems Thinking',
  'Information Security',
  'Ethical Decision-Making',
  'Policy Awareness',
  'Human Factors',
  'Software Security',
  'Cyber Operations',
  'Incident Response Pathway',
  'Digital Forensics Pathway',
];

const cybersecurityFitItems = [
  'Are interested in protecting systems, networks, and data',
  'Like solving security problems or figuring out how attacks happen',
  'Are interested in ethical hacking, cyber defense, or digital safety',
  'Want a technical degree connected to security, risk, and policy',
  'Like both technical and human sides of computing',
  'Are interested in privacy, ethics, and the impact of technology on society',
  'Want to work in a field focused on preventing, detecting, or responding to cyber threats',
];

const cybersecurityChallengeItems = [
  'Do not enjoy technical troubleshooting or systems thinking',
  'Want a degree focused only on general software development',
  'Prefer hardware design or engineering lab work as your main focus',
  'Do not enjoy learning about policy, ethics, risk, or human factors',
  'Want a less security-focused computing degree',
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
      'Use this for students who want to see a shorter planning pathway, especially transfer students or students entering with many completed credits.',
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
      'Use this for students who want to explore advanced cybersecurity course options and interest areas.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/211397678/download?download_frd=1',
  },
];

const cybersecurityAdvisorQuestions = [
  'Which of my completed programming, networking, security, math, or general education courses are likely to apply to the Cybersecurity degree?',
  'Which Cybersecurity courses require permits, and when should I request them as a transfer student?',
  'Which ethics or policy course should I take for my catalog year, especially if I completed a similar course elsewhere?',
  'Should I use the two-year plan, the four-year flowchart, or a custom plan based on transfer-credit evaluation?',
  'How should I compare Cybersecurity with Computer Science or Information Technology if my goal is security work?',
  'Which prerequisites or limited-offering courses could affect my first year after transfer?',
  'Which electives would best support cyber defense, digital forensics, risk management, secure software, or policy interests?',
  'What certifications, internships, labs, or projects would strengthen my cybersecurity preparation before graduation?',
  'Are Bachelor’s/Master’s pathway options realistic for my remaining credit load and timeline?',
];

const informationTechnologySkills = [
  'Programming',
  'Databases',
  'Networking',
  'Web Systems',
  'Human-Computer Interaction',
  'Cybersecurity',
  'Systems Administration',
  'Cloud Computing',
  'System Integration',
  'Technical Troubleshooting',
  'User-Focused Design',
  'IT Infrastructure',
  'Applied Computing',
  'Technology Problem Solving',
];

const informationTechnologyFitItems = [
  'Are interested in practical technology solutions',
  'Like working with databases, networks, web systems, or cloud systems',
  'Want to help organizations use technology effectively',
  'Are interested in both technical systems and user needs',
  'Prefer applied computing over heavy theory',
  'Like troubleshooting and solving real-world technology problems',
  'Are interested in cybersecurity, systems administration, or IT infrastructure',
];

const informationTechnologyChallengeItems = [
  'Want a degree focused mostly on advanced algorithms or theory',
  'Prefer hardware design, circuits, or engineering lab work',
  'Want a degree focused mainly on AI or machine learning',
  'Do not enjoy troubleshooting, systems, or applied technical work',
  'Prefer pure software development over broader IT systems work',
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
      'Use this for students who want to see a shorter planning pathway, especially transfer students or students entering with many completed credits.',
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
      'Use this for students who want to explore advanced IT course options and interest areas.',
    buttonLabel: 'View Related Electives',
    url: 'https://usflearn.instructure.com/courses/2040876/files/202229694?wrap=1',
  },
];

const informationTechnologyAdvisorQuestions = [
  'Which of my completed programming, networking, database, systems, or general education courses are likely to apply to Information Technology?',
  'Should I use the two-year plan, the four-year flowchart, or a custom transfer plan based on my completed credits?',
  'Which IT courses are only offered in fall or spring, and how should I sequence them after transfer?',
  'Which courses require permits or advising forms before registration?',
  'How should I compare Information Technology with Computer Science or Cybersecurity if I want applied systems work?',
  'Which prerequisites could delay courses in cloud, networking, databases, cybersecurity, or web systems?',
  'Which electives would best support my career goals in systems administration, cloud, databases, cybersecurity, or web platforms?',
  'What internships, certifications, or applied projects should I prioritize as a transfer student?',
  'What types of organizations and roles should I target based on my prior coursework and remaining time to graduation?',
];

function ComputerScienceDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <DegreeExplorerLink className="degree-back-link">
        Back to Degree Explorer
      </DegreeExplorerLink>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">Software • Programming • Algorithms</p>
        <h1>Computer Science</h1>
        <p>
          A strong software-focused computing degree for students interested in
          programming, problem solving, algorithms, systems, artificial
          intelligence, data, and software development.
        </p>

        <div className="degree-tag-list">
          <span>Software</span>
          <span>Programming</span>
          <span>Algorithms</span>
          <span>Systems</span>
          <span>AI/Data Pathways</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Computer Science is about understanding how software and computing
          systems are designed, built, and used. Students learn how to write
          programs, solve problems using algorithms, organize data, design
          software, and understand how computers operate behind the scenes.
        </p>
        <p>
          This degree is flexible because computer science connects to many
          areas, including software engineering, artificial intelligence, data
          science, cybersecurity, web development, mobile apps, research, and
          graduate study.
        </p>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <ul>
            {computerScienceFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
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

      <CareerOutlookSection
        careerInfoUrl="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscs.aspx"
        degreeName="Computer Science"
        intro="Computer Science can support careers that rely on software development, technical problem solving, systems thinking, data, and advanced computing foundations."
        slug="computer-science"
      />

      <AdvisorQuestionsSection
        advancedAreas="upper-level Computer Science coursework"
        compareWith="Artificial Intelligence, Cybersecurity, Information Technology, or Computer Science and Engineering"
        degreeName="Computer Science"
        interestAreas="AI, cybersecurity, data, software engineering, or graduate study"
        prepAreas="programming, calculus, science, and systems"
        transferQuestions={advisorQuestions}
      />

      <p className="degrees-disclaimer">
        This page is for exploration and planning only. Degree requirements,
        course availability, electives, catalog rules, and graduation plans
        should be confirmed using the official USF undergraduate catalog and
        Bellini College advising resources.
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

function ComputerScienceEngineeringDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <DegreeExplorerLink className="degree-back-link">
        Back to Degree Explorer
      </DegreeExplorerLink>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">
          Software • Hardware • Engineering • Systems
        </p>
        <h1>Computer Science and Engineering  </h1>
        <p>
          A combined software, systems, and engineering-focused computing degree
          for students interested in both how computers are built and how
          advanced software systems are designed.
        </p>

        <div className="degree-tag-list">
          <span>Software</span>
          <span>Hardware</span>
          <span>Engineering</span>
          <span>Systems</span>
          <span>Computer Architecture</span>
          <span>Intelligent Applications</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Computer Science and Engineering blends software foundations with
          systems and engineering concepts. Students learn how to think about
          complete computing systems, including
          lower-level hardware concepts, computer systems, software design, and
          advanced computing applications.
        </p>
        <p>
          This degree is useful for students who do not want to choose only
          between software and hardware. It connects programming, systems,
          engineering-style problem solving, and intelligent applications into
          one pathway.
        </p>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <ul>
            {computerScienceEngineeringFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
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
            The current catalog does not yet include the BSCSE, but the
            four-year plan is available.
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
          The Computer Science and Engineering program is listed with a 2026-27
          flowchart. The current catalog does not yet include the BSCSE, but a
          four-year plan is available.
        </p>
        <p>
          Because this appears to be a newer degree option, students should
          confirm requirements, catalog updates, and planning details with
          Bellini advising before making decisions.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Computer Science and Engineering"
          compareWith="Computer Science, Artificial Intelligence, Cybersecurity, or Information Technology"
        />
      </section>

      <CareerOutlookSection
        careerInfoUrl="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscse.aspx"
        degreeName="Computer Science and Engineering"
        intro="Computer Science and Engineering can support careers that bridge software, systems, hardware-aware design, embedded technologies, security, and intelligent infrastructure."
        slug="computer-science-and-engineering"
      />

      <AdvisorQuestionsSection
        advancedAreas="hardware, systems, and engineering coursework"
        compareWith="Computer Science, Artificial Intelligence, Cybersecurity, or Information Technology"
        degreeName="Computer Science and Engineering"
        interestAreas="embedded systems, robotics, AI systems, or systems engineering"
        prepAreas="programming, calculus, physics, and engineering"
        transferQuestions={computerScienceEngineeringAdvisorQuestions}
      />

      <p className="degrees-disclaimer">
        This page is for exploration and planning only. Degree requirements,
        course availability, electives, catalog rules, and graduation plans
        should be confirmed using the official USF undergraduate catalog and
        Bellini College advising resources.
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

function ArtificialIntelligenceDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <DegreeExplorerLink className="degree-back-link">
        Back to Degree Explorer
      </DegreeExplorerLink>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">
          AI • Machine Learning • Neural Networks
        </p>
        <h1>Artificial Intelligence  </h1>
        <p>
          A computing degree for students interested in artificial intelligence
          systems, machine learning, neural networks, data, intelligent
          applications, software engineering, and secure computing.
        </p>

        <div className="degree-tag-list">
          <span>AI</span>
          <span>Machine Learning</span>
          <span>Neural Networks</span>
          <span>Data</span>
          <span>Intelligent Systems</span>
          <span>Secure Computing</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Artificial Intelligence focuses on the principles, techniques, and
          applications of AI systems. Students learn how intelligent systems can
          use data, models, algorithms, and computing techniques to recognize
          patterns, make predictions, support decision-making, and solve complex
          problems.
        </p>
        <p>
          This degree includes core coursework in machine learning, neural
          networks, algorithms, operating systems, software engineering, and
          secure computing. Students can also explore advanced AI electives such
          as data mining, deep learning, reinforcement learning, natural language
          processing, computer vision, robotics, and related topics.
        </p>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <ul>
            {artificialIntelligenceFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
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
          Because some AI courses may depend on semester availability, students
          should review the official flowchart and confirm their plan with
          Bellini advising.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Artificial Intelligence"
          compareWith="Computer Science, Cybersecurity, Information Technology, or Computer Science and Engineering"
        />
      </section>

      <CareerOutlookSection
        careerInfoUrl="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bsai.aspx"
        degreeName="Artificial Intelligence"
        intro="Artificial Intelligence can support careers focused on machine learning, data-driven systems, model evaluation, intelligent applications, and AI infrastructure."
        slug="artificial-intelligence"
      />

      <AdvisorQuestionsSection
        advancedAreas="AI, machine learning, and data-focused coursework"
        compareWith="Computer Science, Cybersecurity, Information Technology, or Computer Science and Engineering"
        degreeName="Artificial Intelligence"
        interestAreas="machine learning, robotics, natural language processing, computer vision, or data mining"
        prepAreas="programming, calculus, statistics, and data"
        transferQuestions={artificialIntelligenceAdvisorQuestions}
      />

      <p className="degrees-disclaimer">
        This page is for exploration and planning only. Degree requirements,
        course availability, electives, catalog rules, and graduation plans
        should be confirmed using the official USF undergraduate catalog and
        Bellini College advising resources.
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

function CybersecurityDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <DegreeExplorerLink className="degree-back-link">
        Back to Degree Explorer
      </DegreeExplorerLink>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">Security • Systems • Risk</p>
        <h1>Cybersecurity   </h1>
        <p>
          A technical computing degree for students interested in protecting
          systems, networks, software, information, users, and organizations
          from cyber threats.
        </p>

        <div className="degree-tag-list">
          <span>Cybersecurity</span>
          <span>Security</span>
          <span>Networks</span>
          <span>Risk Management</span>
          <span>Ethics</span>
          <span>Systems</span>
          <span>Information Technology</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Cybersecurity focuses on technology, people, information, and
          processes that support secure cyber operations. The program is built
          on a technical foundation of computing and information technology.
        </p>
        <p>
          Students learn about cybersecurity across information, software,
          systems, users, and organizations. The degree also includes important
          non-technical areas such as policy, human factors, risk management,
          ethics, and the impact of cybersecurity on society.
        </p>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <ul>
            {cybersecurityFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
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
          Some Cybersecurity-related courses may require permits or have updated
          advising guidance.
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
          Because some course options may require permits or have changed,
          students should review official advising guidance before registering.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Cybersecurity"
          compareWith="Computer Science, Artificial Intelligence, Information Technology, or Computer Science and Engineering"
        />
      </section>

      <CareerOutlookSection
        careerInfoUrl="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscys.aspx"
        degreeName="Cybersecurity"
        intro="Cybersecurity can support careers centered on protecting systems, assessing risk, responding to threats, and strengthening organizational security practices."
        slug="cybersecurity"
      />

      <AdvisorQuestionsSection
        advancedAreas="security, networking, ethics, and cyber operations coursework"
        compareWith="Computer Science, Artificial Intelligence, Information Technology, or Computer Science and Engineering"
        degreeName="Cybersecurity"
        interestAreas="cyber defense, digital forensics, risk management, secure software, or policy"
        prepAreas="programming, networking, security, math, and ethics"
        transferQuestions={cybersecurityAdvisorQuestions}
      />

      <p className="degrees-disclaimer">
        This page is for exploration and planning only. Degree requirements,
        course availability, electives, catalog rules, permits, and graduation
        plans should be confirmed using the official USF undergraduate catalog
        and Bellini College advising resources.
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

function InformationTechnologyDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <DegreeExplorerLink className="degree-back-link">
        Back to Degree Explorer
      </DegreeExplorerLink>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">IT Systems • Databases • Networks</p>
        <h1>Information Technology </h1>
        <p>
          A practical computing degree for students interested in programming,
          databases, networking, web systems, cybersecurity, and solving
          technology problems for organizations.
        </p>

        <div className="degree-tag-list">
          <span>Information Technology</span>
          <span>Programming</span>
          <span>Databases</span>
          <span>Networking</span>
          <span>Web Systems</span>
          <span>Cybersecurity</span>
          <span>Human-Computer Interaction</span>
        </div>

        <div className="degree-detail-actions">
          <a href="#official-resources">View Official Requirements</a>
        </div>
      </section>

      <section className="degree-detail-section degree-overview-card">
        <h2>What This Degree Focuses On</h2>
        <p>
          Information Technology focuses on applying computing to real-world
          technology needs. Students learn about programming, databases,
          networking, human-computer interaction, web systems, and
          cybersecurity.
        </p>
        <p>
          This degree is designed to help students solve computing technology
          problems and meet user needs in organizations such as businesses,
          government agencies, health care, education, and other industries. It
          combines technical knowledge with practical skills for supporting,
          building, and improving technology systems.
        </p>
      </section>

      <section className="degree-fit-grid">
        <article className="degree-detail-section">
          <h2>This Degree May Be a Good Fit If You...</h2>
          <ul>
            {informationTechnologyFitItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="degree-detail-section">
          <h2>This Degree May Feel Challenging If You...</h2>
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
          Some Information Technology courses may only be offered in specific
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
          Because some IT courses may be semester-specific or require permits,
          students should review the official flowchart and confirm their plan
          with Bellini advising.
        </p>
      </section>

      <section className="degree-detail-section degree-next-steps">
        <CompareFeatureNote
          degreeName="Information Technology"
          compareWith="Computer Science, Cybersecurity, Artificial Intelligence, or Computer Science and Engineering"
        />
      </section>

      <CareerOutlookSection
        careerInfoUrl="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bsit.aspx"
        degreeName="Information Technology"
        intro="Information Technology can support careers in systems administration, databases, cloud services, security, web platforms, and applied technical operations."
        slug="information-technology"
      />

      <AdvisorQuestionsSection
        advancedAreas="cloud, networking, databases, cybersecurity, and web systems coursework"
        compareWith="Computer Science, Cybersecurity, Artificial Intelligence, or Computer Science and Engineering"
        degreeName="Information Technology"
        interestAreas="systems administration, cloud, databases, cybersecurity, or web platforms"
        prepAreas="programming, networking, databases, systems, and web foundations"
        transferQuestions={informationTechnologyAdvisorQuestions}
      />

      <p className="degrees-disclaimer">
        This page is for exploration and planning only. Degree requirements,
        course availability, electives, catalog rules, permits, and graduation
        plans should be confirmed using the official USF undergraduate catalog
        and Bellini College advising resources.
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

function DegreeDetail() {
  const { degreeSlug } = useParams();
  const degree = getDegreeBySlug(degreeSlug);
  const option = getHighSchoolFutureDegreeOptionBySlug(degreeSlug);
  if (option) return <InterdisciplinaryDegreeDetail option={option} highSchool={false} />;

  if (!degree) {
    return (
      <main className="degree-detail-page">
        <section className="degree-detail-hero">
          <p className="degrees-eyebrow">Degree not found</p>
          <h1>We could not find that degree page.</h1>
          <DegreeExplorerLink>Back to Degree Explorer</DegreeExplorerLink>
        </section>
      </main>
    );
  }

  if (degree.slug === 'computer-science') {
    return <ComputerScienceDegreeDetail />;
  }

  if (degree.slug === 'computer-science-and-engineering') {
    return <ComputerScienceEngineeringDegreeDetail />;
  }

  if (degree.slug === 'artificial-intelligence') {
    return <ArtificialIntelligenceDegreeDetail />;
  }

  if (degree.slug === 'cybersecurity') {
    return <CybersecurityDegreeDetail />;
  }

  if (degree.slug === 'information-technology') {
    return <InformationTechnologyDegreeDetail />;
  }

  return (
    <main className="degree-detail-page">
      <DegreeExplorerLink className="degree-back-link">
        Back to Degree Explorer
      </DegreeExplorerLink>

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
          <span className="coming-soon-notice">Intake quiz — Coming soon</span>
          <DegreeExplorerLink>Compare More Programs</DegreeExplorerLink>
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

export default DegreeDetail;

import { Link, useParams } from 'react-router-dom';
import { getDegreeBySlug } from '../data/degrees';
import '../styles/degrees.css';

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
        {compareWith}. From the Degree Explorer page, choose Add to Compare on
        two degree cards, then open the side-by-side comparison to review focus
        areas, skills, fit, sample topics, next steps, and official links.
      </p>
      <div className="degree-detail-actions">
        <Link to="/degrees">Back to Degree Explorer</Link>
      </div>
    </>
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

const computerScienceCareers = [
  {
    title: 'Software Developer',
    description: 'Builds applications, tools, websites, and software systems.',
  },
  {
    title: 'Software Engineer',
    description:
      'Designs and develops larger software systems, often working with teams, architecture, testing, and deployment.',
  },
  {
    title: 'Full-Stack Developer',
    description: 'Works on both front-end user interfaces and back-end systems.',
  },
  {
    title: 'Backend Developer',
    description: 'Builds databases, APIs, servers, and logic behind applications.',
  },
  {
    title: 'Data or AI Pathway',
    description:
      'Uses programming, data, algorithms, and electives to move toward data science, machine learning, or AI-related roles.',
  },
  {
    title: 'Systems Developer',
    description:
      'Works closer to operating systems, performance, networks, or lower-level computing systems.',
  },
  {
    title: 'Graduate School / Research Pathway',
    description:
      'Uses the degree as preparation for advanced study in computer science, AI, cybersecurity, systems, or related fields.',
  },
];

const advisorQuestions = [
  'Which catalog year and plan of study should I follow?',
  'What programming background should I have before starting?',
  'Which electives would help me explore AI, cybersecurity, data, or software engineering?',
  'How does Computer Science differ from Artificial Intelligence at USF?',
  'How flexible is this degree if I change interests later?',
  'What courses are usually most challenging for students in this major?',
  'What internships or projects should I look for as a Computer Science student?',
  'Are there Bachelor’s/Master’s pathway options connected to this degree?',
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

const computerScienceEngineeringCareers = [
  {
    title: 'Software Engineer',
    description:
      'Designs and develops software systems while understanding how those systems interact with computing hardware and architecture.',
  },
  {
    title: 'Systems Engineer',
    description:
      'Works on larger technical systems that combine hardware, software, and engineering requirements.',
  },
  {
    title: 'Computer Systems Developer',
    description:
      'Builds or supports computing systems that require knowledge of both software and lower-level system behavior.',
  },
  {
    title: 'Embedded Systems Pathway',
    description:
      'Works on software and computing systems inside devices, sensors, machines, robotics, or connected products.',
  },
  {
    title: 'Robotics / Intelligent Systems Pathway',
    description:
      'Uses software, hardware, sensors, and intelligent applications to support robotic or automated systems.',
  },
  {
    title: 'AI Systems Pathway',
    description:
      'Applies AI or intelligent applications within broader computing systems.',
  },
  {
    title: 'Graduate School / Research Pathway',
    description:
      'Uses the degree as preparation for advanced study in computer science, robotics, AI, or systems-related fields.',
  },
];

const computerScienceEngineeringAdvisorQuestions = [
  'Which catalog year and plan of study should I follow?',
  'Since the current catalog does not yet include BSCSE, what official requirements should I use for planning?',
  'How is Computer Science and Engineering different from Computer Science?',
  'How much hardware, software, and engineering coursework should I expect?',
  'What kinds of electives or focus areas are available in this program?',
  'Is this degree a good fit if I am interested in robotics, AI systems, embedded systems, or systems engineering?',
  'What internships or projects should I look for as a Computer Science and Engineering student?',
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

const artificialIntelligenceCareers = [
  {
    title: 'AI Developer',
    description:
      'Builds applications or tools that use AI models, automation, recommendation systems, or intelligent decision support.',
  },
  {
    title: 'Machine Learning Engineer Pathway',
    description:
      'Designs, trains, evaluates, and improves machine learning models using data and programming.',
  },
  {
    title: 'Data Scientist Pathway',
    description:
      'Uses data, statistics, programming, and machine learning to find patterns and support decisions.',
  },
  {
    title: 'Computer Vision Pathway',
    description:
      'Works with systems that analyze images, video, visual patterns, or sensor-based visual data.',
  },
  {
    title: 'Natural Language Processing Pathway',
    description:
      'Works with language technologies such as chatbots, text analysis, search, translation, or language understanding systems.',
  },
  {
    title: 'Robotics / Intelligent Systems Pathway',
    description:
      'Applies AI concepts to robots, autonomous systems, or interactive intelligent technologies.',
  },
  {
    title: 'AI Research / Graduate School Pathway',
    description:
      'Uses the degree as preparation for advanced study in artificial intelligence, machine learning, robotics, data science, or related fields.',
  },
];

const artificialIntelligenceAdvisorQuestions = [
  'Which catalog year and plan of study should I follow?',
  'What programming and math preparation should I have before starting this degree?',
  'How is Artificial Intelligence different from Computer Science at USF?',
  'Which electives would help me focus on machine learning, robotics, natural language processing, computer vision, or data mining?',
  'Are all AI electives offered every year, or only in specific semesters?',
  'What courses are usually most challenging for AI students?',
  'What internships, research labs, or projects should I look for as an AI student?',
  'Are there Bachelor’s/Master’s pathway options connected to this degree?',
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

const cybersecurityCareers = [
  {
    title: 'Cybersecurity Analyst',
    description:
      'Monitors systems, investigates threats, and helps protect organizations from cyber attacks.',
  },
  {
    title: 'Security Engineer',
    description:
      'Designs and improves secure systems, tools, networks, or infrastructure.',
  },
  {
    title: 'Network Security Specialist',
    description:
      'Focuses on protecting networks, communication systems, and connected infrastructure.',
  },
  {
    title: 'Incident Response Analyst',
    description: 'Helps detect, investigate, and respond to cyber incidents.',
  },
  {
    title: 'Digital Forensics Pathway',
    description:
      'Works with digital evidence, investigations, and analysis of cyber events.',
  },
  {
    title: 'Risk and Compliance Pathway',
    description:
      'Focuses on security policies, risk management, compliance, and organizational cyber practices.',
  },
  {
    title: 'Security Consultant',
    description:
      'Helps organizations identify security weaknesses and improve their cybersecurity strategies.',
  },
];

const cybersecurityAdvisorQuestions = [
  'Which catalog year and plan of study should I follow?',
  'Which cybersecurity courses require permits?',
  'Which ethics course should I take for my catalog year?',
  'How is Cybersecurity different from Computer Science at USF?',
  'How is Cybersecurity different from Information Technology?',
  'Which electives would help me focus on cyber defense, digital forensics, risk management, or secure software?',
  'What courses are usually most challenging for Cybersecurity students?',
  'What internships, certifications, or projects should I consider as a Cybersecurity student?',
  'Are there Bachelor’s/Master’s pathway options connected to this degree?',
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

const informationTechnologyCareers = [
  {
    title: 'IT Specialist',
    description:
      'Supports technology systems, users, software, hardware, and organizational computing needs.',
  },
  {
    title: 'Systems Analyst',
    description:
      'Studies an organization’s technology needs and helps design or improve systems.',
  },
  {
    title: 'Network Administrator',
    description:
      'Maintains, monitors, and supports computer networks and related infrastructure.',
  },
  {
    title: 'Database Support Specialist',
    description:
      'Works with databases, data storage, queries, and information systems.',
  },
  {
    title: 'Cloud Support Specialist',
    description:
      'Supports cloud platforms, services, infrastructure, and deployment environments.',
  },
  {
    title: 'Web Systems Developer Pathway',
    description:
      'Builds or supports web-based systems, applications, and digital services.',
  },
  {
    title: 'Technology Consultant',
    description:
      'Helps organizations choose, implement, and improve technology solutions.',
  },
];

const informationTechnologyAdvisorQuestions = [
  'Which catalog year and plan of study should I follow?',
  'Which IT courses are only offered in fall or spring?',
  'Which courses require permits?',
  'How is Information Technology different from Computer Science?',
  'How is Information Technology different from Cybersecurity?',
  'Which electives would help me focus on cloud, networking, databases, cybersecurity, or web systems?',
  'What courses are usually most challenging for IT students?',
  'What internships, projects, or certifications should I consider as an IT student?',
  'What kinds of organizations usually hire Information Technology students?',
];

function ComputerScienceDegreeDetail() {
  return (
    <main className="degree-detail-page computer-science-detail">
      <Link className="degree-back-link" to="/degrees">
        Back to Degree Explorer
      </Link>

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

      <section className="degree-detail-section">
        <h2>Possible Career Paths</h2>
        <div className="career-card-grid">
          {computerScienceCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
            </article>
          ))}
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
      <Link className="degree-back-link" to="/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">
          Software • Hardware • Engineering • Systems
        </p>
        <h1>Computer Science and Engineering, BSCSE</h1>
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

      <section className="degree-detail-section">
        <h2>Possible Career Paths</h2>
        <div className="career-card-grid">
          {computerScienceEngineeringCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
            </article>
          ))}
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

      <section className="degree-detail-section">
        <h2>Questions to Ask an Advisor</h2>
        <ul>
          {computerScienceEngineeringAdvisorQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

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
      <Link className="degree-back-link" to="/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">
          AI • Machine Learning • Neural Networks
        </p>
        <h1>Artificial Intelligence, BSAI</h1>
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

      <section className="degree-detail-section">
        <h2>Possible Career Paths</h2>
        <div className="career-card-grid">
          {artificialIntelligenceCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
            </article>
          ))}
        </div>
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
      <Link className="degree-back-link" to="/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">Security • Systems • Risk</p>
        <h1>Cybersecurity, BSCyS</h1>
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

      <section className="degree-detail-section">
        <h2>Possible Career Paths</h2>
        <div className="career-card-grid">
          {cybersecurityCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
            </article>
          ))}
        </div>
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
      <Link className="degree-back-link" to="/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-detail-hero cs-hero">
        <p className="degrees-eyebrow">IT Systems • Databases • Networks</p>
        <h1>Information Technology, BSIT</h1>
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

      <section className="degree-detail-section">
        <h2>Possible Career Paths</h2>
        <div className="career-card-grid">
          {informationTechnologyCareers.map((career) => (
            <article className="career-card" key={career.title}>
              <h3>{career.title}</h3>
              <p>{career.description}</p>
            </article>
          ))}
        </div>
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

  if (!degree) {
    return (
      <main className="degree-detail-page">
        <section className="degree-detail-hero">
          <p className="degrees-eyebrow">Degree not found</p>
          <h1>We could not find that degree page.</h1>
          <Link to="/degrees">Back to Degree Explorer</Link>
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
      <Link className="degree-back-link" to="/degrees">
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
          <Link to="/degrees">Compare More Programs</Link>
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

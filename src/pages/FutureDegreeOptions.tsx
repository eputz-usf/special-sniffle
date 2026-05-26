import { Link } from 'react-router-dom';
import '../styles/degrees.css';

const anticipatedDegreeOptions = [
  {
    name: 'B.S. in Computer Science and Anthropology',
    status: 'Anticipated for 2027',
  },
  {
    name: 'B.S. in Computer Science and Economics',
    status: 'Anticipated for 2027',
  },
];

const plannedFutureDegreeOptions = [
  {
  name: 'BS in Computer Science and Criminology',
  focus: 'Computing + Criminology + Cybercrime',
  description:
    'This major combines computer science with criminology for students interested in how technology connects to crime, justice systems, cybersecurity, digital evidence, and public safety.',
  goodFit:
    'Cybercrime, digital investigations, cybersecurity, public safety technology, justice systems, or applying computing to real-world crime and security problems.',
  planningResources: [
  {
    label: '2-Year Plan of Study',
    url: 'https://usf.box.com/s/h4zaqcaf6192e1kof8sjmnc8j5ojf8b1',
  },
  {
    label: '4-Year Plan of Study',
    url: 'https://usf.box.com/s/oarwgaex45jq7jlqlkalvx1tpid9yp0t',
  },
  
],
  programUrl:
    'https://catalog.usf.edu/preview_program.php?catoid=25&poid=14013&returnto=5248',
  status: 'Coming soon',
},
  {
    name: 'BS in Computer Science and Interdisciplinary Social Sciences',
    focus: 'Computing + Social Sciences + Human/Social Systems',
    description:
      'This major combines computer science with social science areas. Students select an area of specialization and complete social science electives connected to that focus area.',
    goodFit:
      'Technology and society, human-centered computing, civic technology, social impact, data about people or communities, policy, research, or public service.',
    planningResources: [
  {
    label: '2-Year Plan of Study',
    url: 'https://usf.box.com/s/hvwyxa9ijszxndq4zzftj9d4x1wtm1r5',
  },
  {
    label: '4-Year Plan of Study',
    url: 'https://usf.box.com/s/35ovjdf515yhpzh00yu6u459thdamboj',
  },
  
],
programUrl:
    'https://usf.box.com/s/35ovjdf515yhpzh00yu6u459thdamboj',
    status: 'Coming soon',
  },
  {
    name: 'BS in Computer Science and Business: Accountancy and Analytics Concentration',
    focus: 'Computing + Accounting + Analytics',
    description:
      'This concentration connects computer science with accountancy and analytics. It is useful for students who want to combine programming and technical skills with financial data, accounting systems, auditing, and analytics.',
    goodFit:
      'Accounting technology, financial data, analytics, auditing systems, business reporting, or using computing to support financial decision-making.',
    planningResources: [
  {
    label: '2-Year Plan of Study',
    url: 'https://usf.box.com/s/82wezpx5wzi3y19an4freplz25fh83wl',
  },
  {
    label: '4-Year Plan of Study',
    url: 'https://usf.box.com/s/a3v5qtks4p76vmlqwhe4z18ru6w8e61e',
  },
],
    programUrl: 'https://catalog.usf.edu/preview_program.php?catoid=25&poid=14015&returnto=5248',
    status: 'Coming soon',
  },
  {
    name: 'BS in Computer Science and Business: Business Analytics and Information Systems Concentration',
    focus: 'Computing + Business Analytics + Information Systems',
    description:
      'This concentration combines computer science with business analytics and information systems. It is designed for students who want to use computing and data to improve business decisions, systems, and operations.',
    goodFit:
      'Data-driven business decisions, information systems, analytics dashboards, business technology, databases, systems analysis, or technology consulting.',
   planningResources: [
  {
    label: '2-Year Plan of Study',
    url: 'https://usf.box.com/s/tqrkhr3t9h5hvzmeus1yn4ary20mmu9t',
  },
  {
    label: '4-Year Plan of Study',
    url: 'https://usf.box.com/s/aewcolvy39s2lgpfarp4e1d2zdn3jct2',
  },
],
    programUrl: 'https://catalog.usf.edu/preview_program.php?catoid=25&poid=16474&returnto=5248',
    status: 'Coming soon',
  },
  {
    name: 'BS in Computer Science and Business: Digital Marketing and Analytics Concentration',
    focus: 'Computing + Digital Marketing + Analytics',
    description:
      'This concentration connects computer science with digital marketing and analytics. It fits students who want to use data, software, and technology to understand customers, campaigns, digital platforms, and online behavior.',
    goodFit:
      'Digital marketing, customer analytics, web analytics, social media data, advertising technology, product growth, or marketing technology platforms.',
    planningResources: [
  {
    label: '2-Year Plan of Study',
    url: 'https://usf.box.com/s/4c6czbk3gum95tcs9dog3yh3jvcrt4yv',
  },
  {
    label: '4-Year Plan of Study',
    url: 'https://usf.box.com/s/ozdzm16qmk014e074q13zqy4lfp3q7u8',
  },
],
    programUrl: 'https://catalog.usf.edu/preview_program.php?catoid=25&poid=16475&returnto=5248',
    status: 'Coming soon',
  },
  {
    name: 'BS in Computer Science and Business: Fintech Concentration',
    focus: 'Computing + Finance + Financial Technology',
    description:
      'This concentration combines computer science with financial technology. It is useful for students interested in how software, data, cybersecurity, and automation are used in banking, payments, investing, and financial services.',
    goodFit:
      'Fintech, banking technology, financial apps, payments, blockchain-related systems, financial data, risk technology, or secure financial platforms.',
    planningResources: [
  {
    label: '2-Year Plan of Study',
    url: 'https://usf.box.com/s/9jcps8zlpwnsdoqk75caudb3d31stu8e',
  },
  {
    label: '4-Year Plan of Study',
    url: 'https://usf.box.com/s/xeasr561c85wxix0he7q5dyv03qwxg5s',
  },
],
    programUrl: 'https://catalog.usf.edu/preview_program.php?catoid=25&poid=16476&returnto=5248',
    status: 'Coming soon',
  },
  {
    name: 'BS in Computer Science and Business: Supply Chain Management Concentration',
    focus: 'Computing + Supply Chain + Operations',
    description:
      'This concentration connects computer science with supply chain management. It fits students who want to use technology, data, and systems to improve logistics, operations, inventory, transportation, and business processes.',
    goodFit:
      'Supply chain technology, logistics systems, operations analytics, inventory tools, transportation systems, business process improvement, or data-driven operations.',
    planningResources: [
  {
    label: '2-Year Plan of Study',
    url: 'https://usf.box.com/s/ire2lmvxupjcntf2tvcote2sxl92bvso',
  },
  {
    label: '4-Year Plan of Study',
    url: 'https://usf.box.com/s/jsfy92z2bno3p7qohq9ingp33qjj2u5q',
  },
],
    programUrl: 'https://catalog.usf.edu/preview_program.php?catoid=25&poid=16477&returnto=5248',
    status: 'Coming soon',
  },
];

function FutureDegreeOptions() {
  return (
    <main className="degrees-page">
      <Link className="degree-back-link" to="/degrees">
        Back to Degree Explorer
      </Link>

      <section className="future-degree-section">
        <div className="future-degree-heading">
          <p className="degrees-eyebrow">Future Degree Options</p>
          <h1>Interdisciplinary Computing Majors</h1>
          <p>
            With a strong commitment to interdisciplinary education, the
            college will introduce innovative computing majors that integrate
            technology with other fields. These distinctive programs are
            designed to meet growing demand by equipping students with both
            technical expertise and the ability to apply AI and cybersecurity
            concepts across a wide range of disciplines.
          </p>
          <p>
            The following majors and their list of electives are coming soon!
          </p>
        </div>

        <div className="future-degree-group">
          <h2>Interdisciplinary Computing Majors</h2>
          <div className="future-degree-list">
            {plannedFutureDegreeOptions.map((degree) => (
              <article
                className="future-degree-card detailed"
                key={degree.name}
              >
                <div>
                  <h3>{degree.name}</h3>
                  <p className="future-degree-focus">{degree.focus}</p>
                </div>
                <div>
                  <div className="future-degree-text-panel">
                  <h4>Description</h4>
                  <p>{degree.description}</p>
                  <h4>Good fit if you are interested in:</h4>
                  <p>{degree.goodFit}</p> 
                  </div>
                </div>
                <div>
  <div className="future-degree-text-panel">
    <h4>Planning Resources</h4>

    <div className="future-resource-buttons">
      {degree.planningResources.map((resource) =>
        resource.url ? (
          <a
            className="future-resource-button"
            href={resource.url}
            key={resource.label}
            rel="noreferrer"
            target="_blank"
          >
            {resource.label} ↗
          </a>
        ) : (
          <span
            className="future-resource-button disabled"
            key={resource.label}
          >
            {resource.label}
          </span>
        )
      )}
    </div>

    {degree.programUrl ? (
      <a
        className="future-degree-button"
        href={degree.programUrl}
        rel="noreferrer"
        target="_blank"
      >
        View Program Details ↗
      </a>
    ) : (
      <button className="future-degree-button" type="button">
        View Program Details ↗
      </button>
    )}

    
  </div>
</div>
                  
              </article>
            ))}
          </div>
        </div>
      </section>

<section className="degree-detail-section degree-alert-note">
  <h2>Important Note</h2>
  <p>
    The interdisciplinary computing majors listed above are available for
    planning, but their official elective lists are still coming soon.
  </p>
  
  <p>
    Students should use the available program flowcharts and plans of study for
    early planning, then confirm electives and degree requirements with Bellini
    College advising.
  </p>
</section>

      <section className="future-degree-section">
  <div className="future-degree-heading">
    <p className="degrees-eyebrow">Future Degree Options</p>
    <h2>Anticipated for 2027</h2>
  </div>

  <div className="future-degree-grid featured">
    {anticipatedDegreeOptions.map((degree) => (
      <article className="future-degree-card" key={degree.name}>
        <h3>{degree.name}</h3>
<span className="future-degree-status">{degree.status}</span>
      </article>
    ))}
  </div>
</section>

      <section className="degree-contact-section">
        <p className="degrees-eyebrow">Contact</p>
        <h2>Questions About Future Degree Options?</h2>
        <p>
          Emily Boyko - Academic Advisor at{' '}
          <a href="mailto:Bellini-CollegeICMadvising@usf.edu">
            Bellini-CollegeICMadvising@usf.edu
          </a>
        </p>
      </section>
    </main>
  );
}

export default FutureDegreeOptions;

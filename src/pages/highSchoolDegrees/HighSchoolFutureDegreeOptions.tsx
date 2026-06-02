import { Link } from 'react-router-dom';
import '../../styles/degrees.css';

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

const plannedHighSchoolFutureDegreeOptions = [
  {
  name: 'BS in Computer Science and Criminology',
  focus: 'Computing + Criminology + Cybercrime',
  description:
    'This major combines computer science with crime, justice, and public safety. Students learn how technology can be used to understand cybercrime, digital evidence, cybersecurity, and justice systems.',
  goodFit:
    'Cybercrime, digital investigations, cybersecurity, public safety, justice systems, or solving real-world crime and security problems with technology.',
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
    focus: 'Computing + Social Sciences + People',
    description:
      'This major combines computer science with social science topics. Students choose a focus area and take electives related to people, communities, society, or public systems.',
    goodFit:
      'Technology and society, human-centered computing, civic technology, social impact, community data, policy, research, or public service.',
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
      'This concentration combines computer science with accounting and data analysis. Students learn how technology can support financial data, accounting systems, auditing, and business reports.',
    goodFit:
      'Accounting technology, financial data, analytics, auditing systems, business reports, or using technology to help with financial decisions.',
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
      'This concentration combines computer science with business data and technology systems. Students learn how computing can help businesses make better decisions and improve operations.',
    goodFit:
      'Business data, information systems, dashboards, databases, systems analysis, business technology, or technology consulting.',
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
      'This concentration combines computer science with digital marketing and data analysis. Students learn how technology can help understand customers, online behavior, campaigns, and digital platforms.',
    goodFit:
      'Digital marketing, customer data, web analytics, social media data, advertising technology, product growth, or marketing technology tools.',
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
      'This concentration combines computer science with finance. Students learn how software, data, cybersecurity, and automation are used in banking, payments, investing, and financial services.',
    goodFit:
      'Fintech, banking technology, financial apps, payments, financial data, risk technology, or secure financial platforms.',
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
      'This concentration combines computer science with supply chain and operations. Students learn how technology and data can improve logistics, inventory, transportation, and business processes.',
    goodFit:
      'Supply chain technology, logistics systems, operations data, inventory tools, transportation systems, process improvement, or data-driven operations.',
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

function HighSchoolFutureDegreeOptions() {
  return (
    <main className="degrees-page">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="future-degree-section">
        <div className="future-degree-heading">
          <p className="degrees-eyebrow">Future Degree Options</p>
          <h1>Interdisciplinary Computing Majors</h1>
          <p>
            The college will offer new computing majors that combine technology with other fields, such as business, 
            criminology, and social sciences. These programs help students build strong computing skills while also 
            learning how AI, cybersecurity, and data can be used in different real-world career areas.
          </p>
          <p>
            The following majors and their list of electives are coming soon!
          </p>
        </div>

        <div className="future-degree-group">
          <h2>Interdisciplinary Computing Majors</h2>
          <div className="future-degree-list">
            {plannedHighSchoolFutureDegreeOptions.map((degree) => (
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
                  <h4>What this major or concentration is about:</h4>
                  <p>{degree.description}</p>
                  <h4>Good fit if you like:</h4>
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

export default HighSchoolFutureDegreeOptions;

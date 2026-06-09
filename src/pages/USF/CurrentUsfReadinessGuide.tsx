import { Link } from 'react-router-dom';
import '../../styles/degrees.css';
import '../../styles/transferReadiness.css';

const guideSteps = [
  'Identify your current USF college, current major, and why you are considering switching.',
  'List completed, in-progress, and planned courses before assuming how they apply.',
  'Compare Bellini College majors against your interests, skills, and career direction.',
  'Review programming, math, science, statistics, database, networking, or technical preparation early.',
  'Prepare questions for Bellini advising before submitting a change-of-major request.',
];
const guideTerms = [
  {
    term: 'Change of Major',
    definition:
      'The official process for moving from your current USF major into a different major. Requirements and approval steps can vary by college and program.',
  },
  {
    term: 'Degree Works',
    definition:
      'USF’s degree audit system. It helps show completed requirements, in-progress courses, and what may still be needed for your current or possible new major.',
  },
  {
    term: 'Completed Course',
    definition:
      'A course you have already finished. Completed courses may or may not count toward a Bellini major depending on the requirement, grade, and catalog rules.',
  },
  {
    term: 'In-Progress Course',
    definition:
      'A course you are currently taking. These courses should be discussed with advising before assuming they will apply to a new major.',
  },
  {
    term: 'Prerequisite',
    definition:
      'A course or requirement that must be completed before taking a later course. Missing prerequisites can affect your first semester after switching.',
  },
  {
    term: 'Major Entry Requirement',
    definition:
      'A condition you may need to meet before entering a major, such as specific courses, grades, GPA expectations, or advisor approval.',
  },
  {
    term: 'Grade Requirement',
    definition:
      'Some courses may need a minimum grade to count toward a major or prerequisite sequence. Confirm grade rules before planning around a course.',
  },
  {
    term: 'Catalog Year',
    definition:
      'The set of degree requirements tied to a specific academic catalog. Changing majors can make catalog-year questions important.',
  },
  {
    term: 'Degree Progression',
    definition:
      'The order and timing of courses needed to move through a degree. Sequencing can affect graduation timing, permits, and course availability.',
  },
  {
    term: 'Advisor Review',
    definition:
      'A conversation with advising to confirm how your courses, goals, and timeline fit a possible Bellini major before making official changes.',
  },
];
const guideChecklist = [
  { title: '', text: '' },
  { title: '', text: '' },
  { title: '', text: '' },
  { title: '', text: '' },
];

function CurrentUsfReadinessGuide() {
  return (
    <main className="degrees-page transfer-readiness-page">
      <section className="degrees-hero transfer-readiness-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Current USF guide</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/current-usf-student"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Transferring into Bellini Guide</h1>
        <p></p>
      </section>

      <section className="transfer-readiness-overview">
        <div>
          <h2>What Switching Planning Means</h2>
          <p>
            Switching planning is the process of comparing your current USF
            coursework, interests, and graduation goals with a possible Bellini
            College major. The goal is to understand what courses may already be
            relevant, what requirements still need review, and what questions
            should be confirmed through Degree Works, the Undergraduate Catalog,
            and Bellini advising.
          </p>
        </div>

        <ol>
          {guideSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="transfer-term-section">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Switching terms</p>
          <h2>Know These Before You Start the Checklist</h2>
        </div>

        <div className="transfer-term-grid">
          {guideTerms.map((item, index) => (
            <article className="transfer-term-card" key={index}>
              <h3>{item.term}</h3>
              <p>{item.definition}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="transfer-major-requirements-callout">
        <div>
          <p className="degrees-eyebrow"></p>
          <h2></h2>
          <p></p>
        </div>
        <Link to="/degrees?from=current-usf-student"></Link>
      </section>

      <section className="transfer-readiness-next">
        <p className="degrees-eyebrow"></p>
        <h2></h2>
        <div className="transfer-checklist">
          {guideChecklist.map((item, index) => (
            <article key={index}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span></span>
            </article>
          ))}
        </div>

        <div className="transfer-checklist-resource">
          <p></p>
          <span></span>
        </div>

        <div className="transfer-apply-section">
          <p className="degrees-eyebrow"></p>
          <h2></h2>
          <p></p>
          <span></span>
        </div>
      </section>

      <section className="transfer-contact-section">
        <p className="degrees-eyebrow">University of South Florida</p>
        <h2>Contact Us</h2>
        <div className="transfer-contact-grid">
          <article>
            <h3>Wish to speak with a Bellini College academic advisor?</h3>
            <p>
              Email the Advisors at{' '}
              <a href="mailto:Bellini-UG-Advising@usf.edu">
                Bellini-UG-Advising@usf.edu
              </a>
              .
            </p>
          </article>

          <article>
            <h3>Interested in our Interdisciplinary majors?</h3>
            <p>
              Email{' '}
              <a href="mailto:Bellini-CollegeICMadvising@usf.edu">
                Bellini-CollegeICMadvising@usf.edu
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default CurrentUsfReadinessGuide;

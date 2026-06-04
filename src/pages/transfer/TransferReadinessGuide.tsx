import { Link } from 'react-router-dom';
import '../../styles/degrees.css';
import '../../styles/transferReadiness.css';

const transferTerms = [
  {
    term: 'Transfer credits',
    definition:
      'College credits you completed before coming to USF. They may apply differently depending on the course, major, catalog requirement, and official evaluation.',
  },
  {
    term: 'Lower-division courses',
    definition:
      'Introductory courses usually taken in the first two years of a degree, such as programming, math, science, general education, or foundation courses.',
  },
  {
    term: 'Prerequisite',
    definition:
      'A course or requirement you may need to complete before taking a later course. Missing prerequisites can affect your first semester plan after transfer.',
  },
  {
    term: 'Degree flowchart',
    definition:
      'A visual plan showing the usual order of courses in a major. It helps you see sequencing, prerequisites, and possible timeline issues.',
  },
  {
    term: 'Course equivalency',
    definition:
      'How a course from another institution compares to a USF course. Equivalency can affect whether a course satisfies a specific major requirement.',
  },
  {
    term: 'Advising question',
    definition:
      'A specific question to bring to admissions or advising, especially about credits, prerequisites, course timing, permits, or major fit.',
  },
];

const transferStudentTypes = [
  {
    type: 'Lower-Level',
    definition:
      'You have completed 12-59 credit hours as determined by the USF Office of Admissions.',
  },
  {
    type: 'Upper Level',
    definition:
      'You have completed 60+ credit hours as determined by the USF Office of Admissions.',
  },
  {
    type: "Second Bachelor's Degree",
    definition:
      "You have already completed and received a Bachelor's Degree.",
  },
  {
    type: 'Former USF Student Returning',
    definition:
      'You have previously completed for-credit courses as a degree-seeking student at the University of South Florida.',
  },
];

const pathwaySteps = [
  'Identify where you are transferring from and when you hope to start at USF.',
  'List completed, current, and planned courses before assuming how they apply.',
  'Compare Bellini College degree options against your credits, interests, and career direction.',
  'Review math, programming, science, and technical preparation early.',
  'Collect questions for advising before making a final transfer plan.',
];

function TransferReadinessGuide() {
  return (
    <main className="degrees-page transfer-readiness-page">
      <section className="degrees-hero transfer-readiness-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Transfer Pathway Guide</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/transfer-student"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Understand the Transfer Pathway</h1>
        <p>
          Start here before the checklist. These terms explain how transfer
          planning works and what students should prepare before applying,
          comparing degree options, or meeting with advising.
        </p>
      </section>

      <section className="transfer-readiness-overview">
        <div>
          <p className="degrees-eyebrow">Part 1</p>
          <h2>What Transfer Planning Means</h2>
          <p>
            Transfer planning is the process of matching your completed and
            planned courses with a future degree path. The goal is to understand
            what may already count, what still needs review, and what questions
            should be confirmed through official USF resources or advising.
          </p>
        </div>

        <ol>
          {pathwaySteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="transfer-term-section">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Transfer terms</p>
          <h2>Know These Before You Start the Checklist</h2>
        </div>

        <div className="transfer-type-section">
          <div>
            <p className="degrees-eyebrow">Transfer student types</p>
            <h3>Learn About Transfer Student Types</h3>
            <p>
              When you apply to USF, the admissions team determines your
              transfer level based on your information. If you want to know how
              each level is classified, review the definitions below.
            </p>
          </div>

          <div className="transfer-type-grid">
            {transferStudentTypes.map((item) => (
              <article className="transfer-type-card" key={item.type}>
                <h4>{item.type}</h4>
                <p>{item.definition}</p>
              </article>
            ))}
          </div>

          <p className="transfer-type-note">
            Please note: You must have completed at least 12 hours of
            post-secondary work after high school graduation. If your college
            hours were completed during high school, you should apply as a
            first-time-in-college (FTIC) student.
          </p>
        </div>

        <div className="transfer-term-grid">
          {transferTerms.map((item) => (
            <article className="transfer-term-card" key={item.term}>
              <h3>{item.term}</h3>
              <p>{item.definition}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="transfer-readiness-next">
        <p className="degrees-eyebrow">Coming next</p>
        <h2>Before You Transfer Checklist</h2>
        <p>
          The next part will turn this guide into an action checklist where
          transfer students can mark what they reviewed and save notes for a
          printable planning summary.
        </p>
      </section>
    </main>
  );
}

export default TransferReadinessGuide;

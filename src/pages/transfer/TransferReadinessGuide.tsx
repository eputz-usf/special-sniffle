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
      'You have completed 12-29 credit hours as determined by the USF Office of Admissions.',
  },
  {
    type: 'Mid-Level',
    definition:
      'You have completed 30-59 credit hours as determined by the USF Office of Admissions.',
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
            to="/dashboard/transfer-student#majors"
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

        <div className="transfer-type-section" id="transfer-student-types">
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

          <div className="transfer-equivalency-callout">
            <p>
              If you're unsure of how your courses may transfer from your
              institution to USF, use our Course Equivalency tool to get an
              estimate:
            </p>
            <a
              className="transfer-equivalency-button"
              href="https://main.d15lv3xo04q0ui.amplifyapp.com/"
              target="_blank"
              rel="noreferrer"
            >
              Open Course Equivalency Tool
            </a>
          </div>
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

      <section className="transfer-major-requirements-callout">
        <div>
          <p className="degrees-eyebrow">Major requirements</p>
          <h2>Check Requirements for Each Major</h2>
          <p>
            Transfer planning depends on the major you choose. Review each
            program's flowcharts and plans of study before deciding which
            courses to take before transferring.
          </p>
        </div>
        <Link to="/transfer/major-requirements">View major requirements</Link>
      </section>

      <section className="transfer-readiness-next">
        <p className="degrees-eyebrow">Transfer checklist</p>
        <h2>Before Applying</h2>
        <div className="transfer-checklist">
          <article>
            <h3>Determine your transfer student type</h3>
            <p>
              Review the transfer student levels above so you know which
              category may apply to your admissions path.
            </p>
            <a href="#transfer-student-types">View transfer student types</a>
          </article>

          <article>
            <h3>Review deadlines and admission requirements</h3>
            <p>
              Check the application deadlines and admission requirements for
              your transfer type before submitting materials.
            </p>
            <a
              href="https://www.usf.edu/admissions/transfer/admission-information/dates-deadlines.aspx"
              target="_blank"
              rel="noreferrer"
            >
              View dates and deadlines
            </a>
          </article>

          <article>
            <h3>Review undergraduate majors</h3>
            <p>
              Use the degree information page to compare Bellini College majors
              and identify programs you may want to discuss with advising.
            </p>
            <Link to="/degrees">Open degree information</Link>
          </article>

          <article>
            <h3>Visit campus or attend Transfer Thursday</h3>
            <p>
              Consider taking a campus tour and attending a Transfer Thursday
              event to learn more about USF before applying.
            </p>
            <a
              href="https://www.usf.edu/admissions/transfer/visit-campus/"
              target="_blank"
              rel="noreferrer"
            >
              View visit options
            </a>
          </article>
        </div>

        <div className="transfer-checklist-resource">
          <p>
            For more transfer checklist details, review USF's transfer student
            success resource.
          </p>
          <a
            href="https://www.usf.edu/undergrad/transfer-student-success/transfer-resources/transfer-checklist.aspx"
            target="_blank"
            rel="noreferrer"
          >
            View USF transfer checklist
          </a>
        </div>

        <div className="transfer-apply-section">
          <p className="degrees-eyebrow">Apply</p>
          <h2>Submit Your Application</h2>
          <p>
            Submit an application to USF and any supporting material such as
            transcripts and residency documents.
          </p>
          <a
            href="https://www.usf.edu/admissions/transfer/"
            target="_blank"
            rel="noreferrer"
          >
            Apply to USF
          </a>
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

export default TransferReadinessGuide;

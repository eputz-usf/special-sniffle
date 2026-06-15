import { Link } from 'react-router-dom';
import '../../styles/degrees.css';
import '../../styles/transferReadiness.css';

const guideSteps = [
  'Identify your current Bellini major, catalog year, and why you are considering switching.',
  'List completed, in-progress, and planned computing, math, science, and engineering courses.',
  'Compare CS, Artificial Intelligence, Cybersecurity, Computer Engineering, and related computing options.',
  'Review prerequisites, grade expectations, repeated-course history, sequencing, and possible graduation-timeline changes.',
  'Have Bellini College evaluate your case before assuming the switch is approved or submitting any change-of-major request.',
];

const guideTerms = [
  {
    term: 'Change of Major',
    definition:
      'The official process for moving from your current Bellini College major into another Bellini computing-related major.',
  },
  {
    term: 'Degree Works',
    definition:
      'USF’s degree audit system. Use it to compare completed requirements, in-progress courses, and what may remain for your current or possible new major.',
  },
  {
    term: 'Catalog Year',
    definition:
      'The academic catalog that controls your degree requirements. A major change can make catalog-year questions important.',
  },
  {
    term: 'Prerequisite Sequence',
    definition:
      'The required order of courses. Missing, delayed, or low-grade prerequisites can affect when you can enter upper-level courses after switching.',
  },
  {
    term: 'Excess Credit Hours',
    definition:
      'Credit-hour rules that can matter when changing majors. Ask advising whether a switch could affect your timeline, graduation term, or excess-credit status.',
  },
  {
    term: 'Advisor Review',
    definition:
      'A formal case review with Bellini advising to confirm whether your grades, prerequisites, repeated attempts, excess credit hours, and timeline support the major change you are considering.',
  },
];

const gatewayRequirements = [
  {
    title: 'Current Academic Standing',
    text:
      'Confirm your overall and institutional GPA, class standing, catalog year, and whether your target major has specific GPA or grade requirements. Do not estimate eligibility yourself; ask Bellini College to evaluate your record.',
  },
  {
    title: 'Grades in Foundation Courses',
    text:
      'Review completed programming, calculus, statistics, discrete math, science, systems, networking, security, data, and hardware courses against the target major, with special attention to required minimum grades.',
  },
  {
    title: 'Sequencing, Attempts, and Time',
    text:
      'Check whether any required courses have attempt limits, minimum grades, or prerequisite chains that could delay your first semester in the new major or change your expected graduation term.',
  },
];

const requirementResources = [
  {
    title: 'Official USF Undergraduate Catalog',
    text:
      'Use the catalog as the rulebook for graduation and major requirements. Review Bellini College and the specific target major for declaration rules, prerequisites, grade requirements, and course codes.',
    buttonLabel: 'Open catalog',
    href: 'https://catalog.usf.edu/',
  },
  {
    title: 'Bellini Undergraduate Advising',
    text:
      'Use Bellini advising resources to confirm major-change steps, academic forms, and contacts before submitting a request.',
    buttonLabel: 'Open advising support',
    href: 'https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/advising-support.aspx',
  },
  {
    title: 'Degree Works',
    text:
      'Use Degree Works to compare remaining requirements and prepare specific course-counting questions for your advisor.',
    buttonLabel: 'Open Degree Works info',
    href: 'https://www.usf.edu/registrar/register/degreeworks.aspx',
  },
];

function BelliniStudentMajorChangeGuide() {
  return (
    <main className="degrees-page transfer-readiness-page current-usf-readiness-page">
      <section className="degrees-hero transfer-readiness-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Current Bellini guide</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/current-bellini-student"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Bellini Major Change Guide</h1>
        <p>
          Use this guide to organize the academic requirements, advising steps,
          and official resources involved in switching from one Bellini College
          computing major to another.
        </p>
      </section>

      <section className="transfer-readiness-overview">
        <div>
          <h2>What Major-Change Planning Means</h2>
          <p>
            Major-change planning is the process of comparing your current
            Bellini coursework, interests, and graduation goals with another
            computing-related major. The goal is to understand what may still
            apply, what requirements need review, and what questions should be
            confirmed through Degree Works, the Undergraduate Catalog, and
            Bellini advising.
          </p>
        </div>

        <ol>
          {guideSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="transfer-term-section">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Major-change terms</p>
          <h2>Know These Before You Start the Checklist</h2>
        </div>

        <div className="transfer-term-grid">
          {guideTerms.map((item) => (
            <article className="transfer-term-card" key={item.term}>
              <h3>{item.term}</h3>
              <p>{item.definition}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="transfer-major-requirements-callout current-usf-step-one-callout">
        <div>
          <h2>Checklist</h2>
          <p>
            Switching between Bellini College majors should be confirmed before
            you submit paperwork. Get a definitive answer from the college on
            academic thresholds, prerequisite courses, grade expectations,
            course attempts, excess credit hours, and whether the switch can
            still be completed within a four-year timeline.
          </p>
          <aside className="current-usf-evaluation-alert">
            <strong>Required before paperwork:</strong> have Bellini College
            evaluate your grades, attempts, prerequisites, excess credit hours,
            and time-to-degree impact.
          </aside>
          <aside className="current-usf-four-year-alert">
            <strong>Four-year timeline rule:</strong> if Bellini College
            determines that the new major would push your degree plan beyond
            four years, the change of major cannot be approved.
          </aside>
        </div>
      </section>

      <section
        className="transfer-term-section current-usf-step-one-details"
        id="gateway-requirements"
      >
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Step 1</p>
          <h2>Academic Requirements, Grades, and Time</h2>
        </div>

        <div className="transfer-term-grid">
          {gatewayRequirements.map((item) => (
            <article
              className="transfer-term-card current-usf-highlight-card"
              key={item.title}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="transfer-term-section current-usf-step-one-resources">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Step 1 resources</p>
          <h2 className="current-usf-resource-heading">
            Where to Confirm Requirements
          </h2>
        </div>

        <div className="transfer-term-grid">
          {requirementResources.map((item) => (
            <article
              className="transfer-term-card current-usf-resource-card"
              key={item.title}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.buttonLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="transfer-readiness-next current-usf-step-two-section">
        <p className="degrees-eyebrow">Step 2</p>
        <h2>Access the Bellini Student Portal on Canvas</h2>
        <p>
          Use your USF Canvas dashboard to locate the Bellini Undergraduate
          Advising Canvas page. This is where active students can track program
          requirements and find official academic paperwork.
        </p>
        <a
          className="current-usf-canvas-button current-usf-form-button"
          href="https://www.google.com/search?q=https://canvas.usf.edu"
          target="_blank"
          rel="noreferrer"
        >
          Open Canvas Dashboard
        </a>
      </section>

      <section className="transfer-term-section current-usf-step-three-section">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Step 3</p>
          <h2>Have Your Case Evaluated by Bellini Advising</h2>
        </div>

        <aside className="current-usf-evaluation-banner">
          This is the decision point: do not rely on a self-check. Bellini
          College must evaluate the student record and give the definitive
          answer on grades, timing, eligibility, and whether the major can be
          completed within four years.
        </aside>

        <article className="transfer-term-card current-usf-step-card">
          <p>
            Before your major change can be approved, an advisor from the
            college must review your academic transcript to audit your
            prerequisites, verify required grades, assess repeated attempts,
            evaluate excess credit hours, and estimate how the switch may
            affect your time to graduation. If the evaluated plan is longer
            than four years, the change of major cannot be approved.
          </p>
          <p>
            Log into the Archivum Student Portal to schedule a formal
            appointment with a Bellini College undergraduate advisor. Treat
            this as the place to get the definitive college answer, not just a
            general information meeting.
          </p>
          <p>
            Alternative drop-ins: the advising team, located on the 6th floor
            of the Library in LIB 618, also hosts virtual drop-in sessions. You
            can jump into their queue by messaging one of the advisors directly
            via Microsoft Teams during designated drop-in hours.
          </p>
          <a
            className="current-usf-canvas-button"
            href="https://www.usf.edu/undergrad/students/advising-offices.aspx"
            target="_blank"
            rel="noreferrer"
          >
            View advising info
          </a>
        </article>

        <div className="transfer-checklist-resource">
          <p>
            Advisor tip: bring your Degree Works audit, current schedule,
            completed course list, saved degree options, grades, repeated-course
            history, and specific questions about how a switch may affect your
            graduation plan and whether it stays within the four-year timeline.
          </p>
        </div>
      </section>

      <section className="transfer-readiness-next current-usf-step-four-section">
        <p className="degrees-eyebrow">Step 4</p>
        <h2>Submit the Change of Major Form</h2>
        <p>
          Once an advisor reviews your progress and confirms that the switch is
          academically appropriate, including grade and timing expectations and
          the four-year completion limit, the paperwork can be officially
          initiated.
        </p>
        <p>
          You will submit the electronic Bellini College Change of Major Form.
          The advising team and the department chair will review the electronic
          request. Once signed off, it is routed directly to the Registrar's
          Office to update your student profile in OASIS.
        </p>
        <p>
          If you are unsure whether your current courses, grades, attempts, or
          remaining timeline satisfy target-major requirements and the four-year
          completion limit, reach out to the general advising mailbox for a
          preliminary transcript check.
        </p>
        <div className="current-usf-step-four-actions">
          <a
            className="current-usf-canvas-button current-usf-email-button"
            href="mailto:ai-cybersecurity-computing@usf.edu?subject=Preliminary%20Transcript%20Check"
          >
            Email advising mailbox
          </a>
          <a
            className="current-usf-canvas-button current-usf-form-button"
            href="https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/advising-support.aspx"
            target="_blank"
            rel="noreferrer"
          >
            Bellini College Change of Major Form
          </a>
        </div>
      </section>

      <section className="transfer-term-section current-usf-final-resources">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Additional resources</p>
          <h2>Review Degree Progression Tools</h2>
        </div>

        <div className="current-usf-final-resource-actions">
          <a
            className="current-usf-canvas-button"
            href="https://www.usf.edu/arts-sciences/students/advising/academics/index.aspx"
            target="_blank"
            rel="noreferrer"
          >
            Degree Progression Policies
          </a>
          <a
            className="current-usf-canvas-button"
            href="https://www.usf.edu/registrar/register/degreeworks.aspx"
            target="_blank"
            rel="noreferrer"
          >
            Degree Works
          </a>
          <Link
            className="current-usf-canvas-button"
            to="/degrees?from=current-bellini-student"
          >
            Explore Degree Info
          </Link>
        </div>
      </section>

      <section className="transfer-contact-section">
        <p className="degrees-eyebrow">University of South Florida</p>
        <h2>Contact Us</h2>
        <div className="transfer-contact-grid">
          <article>
            <h3>Wish to speak with a Bellini College academic advisor?</h3>
            <p>Email the advisors for undergraduate advising support.</p>
            <a
              className="current-usf-canvas-button"
              href="mailto:Bellini-UG-Advising@usf.edu"
            >
              Email Bellini advisors
            </a>
          </article>

          <article>
            <h3>Interested in our Interdisciplinary majors?</h3>
            <p>Email the advising team for interdisciplinary major questions.</p>
            <a
              className="current-usf-canvas-button"
              href="mailto:Bellini-CollegeICMadvising@usf.edu"
            >
              Email ICM advising
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}

export default BelliniStudentMajorChangeGuide;

import { Link } from 'react-router-dom';
import '../../styles/degrees.css';
import '../../styles/transferReadiness.css';

const guideSteps = [
  'Identify your current USF college, current major, and why you are considering switching.',
  'List completed, in-progress, and planned courses before assuming how they apply.',
  'Compare Bellini College majors against your interests, skills, and career direction.',
  'Review programming, math, science, statistics, database, networking, grades, and repeated-course history early.',
  'Have Bellini College evaluate your case before assuming you are eligible or submitting a change-of-major request.',
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
      'Some courses need a minimum grade to count toward a major or prerequisite sequence. The college should evaluate your transcript before you assume a course satisfies the rule.',
  },
  {
    term: 'Catalog Year',
    definition:
      'The set of degree requirements tied to a specific academic catalog. Changing majors can make catalog-year questions important.',
  },
  {
    term: 'Degree Progression',
    definition:
      'The order and timing of courses needed to move through a degree. Sequencing can affect graduation timing, permits, excess credit hours, and course availability.',
  },
  {
    term: 'Advisor Review',
    definition:
      'A formal case review with advising to confirm grades, prerequisites, excess credit hours, and time-to-degree impact before making official changes.',
  },
];

const gatewayRequirements = [
  {
    title: 'GPA Requirements',
    text: (
      <div className="gateway-card-content">
        <p>Students must have and maintain these minimum GPAs:</p>
        <div className="gateway-gpa-grid">
          <span>2.0 semester GPA</span>
          <span>2.0 Math and Science GPA</span>
          <span>2.0 major GPA</span>
          <span>2.0 USF GPA</span>
          <span>2.0 overall GPA</span>
        </div>
        <p className="gateway-card-note">
          Business concentration progression also requires a 2.65 average GPA
          in the Business Required Prerequisite Courses.
        </p>
      </div>
    ),
  },
  {
    title: 'Grading Requirements',
    text: (
      <div className="gateway-card-content">
        <ul>
          <li>
            Minimum acceptable grade in major required courses is a C or higher
            unless the course prerequisite or concentration information says
            otherwise.
          </li>
          <li>C- is insufficient.</li>
          <li>
            Use the USF Course Inventory to confirm course-specific
            prerequisites.
          </li>
        </ul>
      </div>
    ),
    buttonLabel: 'Open USF Course Inventory',
    buttonHref: 'https://cloud.usf.edu/academic-programs/course-inventory',
  },
  {
    title: 'Attempts, Grades, and Time',
    text: (
      <div className="gateway-card-content">
        <ul>
          <li>
            Required grades must be earned in no more than two registered
            attempts.
          </li>
          <li>Grades of W, IF, U, and R count as attempts.</li>
          <li>S/U grades are not permitted in the major or concentration.</li>
        </ul>
        <p className="gateway-card-note">
          Repeated, missing, or low-grade courses can change your timeline. Have
          Bellini College evaluate your case before assuming the switch is
          possible or timely.
        </p>
      </div>
    ),
  },
];

const requirementResources = [
  {
    title: 'Official USF Undergraduate Catalog',
    text:
      'Use the catalog as the rulebook for graduation and major declaration requirements. Look under Bellini College and the specific target major for declaration rules, prerequisites, grade requirements, and course codes.',
    buttonLabel: 'Open catalog',
    href: 'https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/prospective_students.aspx',
  },
  {
    title: 'Bellini Prospective Student Requirements',
    text:
      'Use the college requirements page as a quicker checklist for gateway courses and degree-track expectations before meeting with advising.',
    buttonLabel: 'Open hub',
    href: 'https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/prospective_students.aspx',
  },
  {
    title: 'USF Selective Major Requirements Directory',
    text:
      'Use this directory to compare selective or limited-access major requirements, including GPA thresholds and minimum entry expectations.',
    buttonLabel: 'Open directory',
    href: 'https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/prospective_students.aspx',
  },
];

function CurrentUsfReadinessGuide() {
  return (
    <main className="degrees-page transfer-readiness-page current-usf-readiness-page">
      <section className="degrees-hero transfer-readiness-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Current USF guide</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/current-usf-student#majors"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Transferring into Bellini Guide</h1>
        <p>
          Use this guide to organize the academic requirements, advising steps,
          and official resources involved in switching from another USF college
          into a Bellini College major.
        </p>
      </section>

      <section className="transfer-readiness-overview" id="overview">
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

      <section className="transfer-term-section" id="terms">
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

      <section
        className="transfer-major-requirements-callout current-usf-step-one-callout"
        id="checklist"
      >
        <div>
          <h2>Checklist</h2>
          <p>
            Bellini College programs do not allow immediate, automatic entry.
            Students should first get a definitive answer from the college on
            minimum academic thresholds, prerequisite courses, grade
            expectations, attempt rules, excess credit hours, and whether the
            switch can still be completed within a four-year timeline.
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
          <h2>Gateway Requirements, Grades, and Time</h2>
        </div>

        <div className="transfer-term-grid">
          {gatewayRequirements.map((item) => (
            <article
              className="transfer-term-card current-usf-highlight-card"
              key={item.title}
            >
              <h3>{item.title}</h3>
              {item.text}
              {item.buttonHref && (
                <a
                  className="current-usf-card-button"
                  href={item.buttonHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.buttonLabel}
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        className="transfer-term-section current-usf-step-one-resources"
        id="requirement-resources"
      >
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

      <section
        className="transfer-readiness-next current-usf-step-two-section"
        id="canvas"
      >
        <p className="degrees-eyebrow">Step 2</p>
        <h2>Access the Bellini Student Portal on Canvas</h2>
        <p>
          Use your USF Canvas dashboard to locate or request access to the
          Bellini Undergraduate Advising Canvas page. This is where active
          students can track program requirements and find official academic
          paperwork.
        </p>
        <a
          className="current-usf-canvas-button current-usf-form-button"
          href="https://www.usf.edu/innovative-education/digital-learning/student-resources/tools-and-technologies/canvas.aspx"
          target="_blank"
          rel="noreferrer"
        >
          Open Canvas Dashboard
        </a>
      </section>

      <section
        className="transfer-term-section current-usf-step-three-section"
        id="advising-evaluation"
      >
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
            Advisor tip: if you are missing a gateway class, missed a grade
            threshold, repeated a course, or may add time toward graduation,
            meet with advising first. Do not submit the form until Bellini
            College has evaluated your case and confirmed the plan stays within
            the four-year timeline.
          </p>
        </div>
      </section>

      <section
        className="transfer-readiness-next current-usf-step-four-section"
        id="change-form"
      >
        <p className="degrees-eyebrow">Step 4</p>
        <h2>Submit the Change of Major Form</h2>
        <p>
          Once an advisor reviews your progress and confirms that you have met
          or are successfully completing the gateway requirements, including
          grade expectations and the four-year completion limit, the paperwork
          can be officially initiated.
        </p>
        <p>
          You will submit the electronic Bellini College Change of Major Form.
          The advising team and the department chair will review the electronic
          request. Once signed off, it is routed directly to the Registrar's
          Office to update your student profile in OASIS.
        </p>
        <p>
          If you are unsure whether your current math or programming credits,
          grades, attempts, or remaining timeline satisfy the entry gateways and
          four-year completion limit, reach out to the general advising mailbox
          for a preliminary transcript check.
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
            href="https://usf.az1.qualtrics.com/jfe/form/SV_6sqUrIAJnCr9YI6"
            target="_blank"
            rel="noreferrer"
          >
            Bellini College Change of Major Form
          </a>
        </div>
      </section>

      <section
        className="transfer-term-section current-usf-final-resources"
        id="progression-tools"
      >
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
          <a
            className="current-usf-canvas-button"
            href="/degrees?from=current-usf-student"
            target="_blank"
            rel="noreferrer"
          >
            Explore Degree Info
          </a>
        </div>
      </section>

      <section className="transfer-contact-section" id="contact">
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

export default CurrentUsfReadinessGuide;

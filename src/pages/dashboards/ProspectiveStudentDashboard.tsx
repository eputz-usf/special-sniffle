import { type MouseEvent, useEffect } from 'react';
import {
  BookOpenCheck,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  MessageCircleQuestion,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import classroomImage from '../../assets/bellini.jpeg';
import quizImage from '../../assets/quiz.avif';
import '../../styles/dashboard.css';
import '../../styles/highSchoolDashboard.css';
import { loadPublicQuizResult } from '../../utils/publicQuizSession';

const launchSteps = [
  {
    title: 'Find your starting point',
    text: 'Use the intake quiz to connect your interests, strengths, favorite subjects, and career goals to possible Bellini College programs.',
  },
  {
    title: 'Explore degree paths',
    text: 'Browse degree cards to understand what each computing major focuses on, what skills you would learn, and what kinds of careers it can lead to.',
  },
  {
    title: 'Compare your options',
    text: 'Use the comparison tool to see how programs differ in areas like programming, math, AI, cybersecurity, hardware, and career direction.',
  },
  {
    title: 'Look ahead',
    text: 'Review sample first-year plans, possible internship paths, and beginner-friendly explanations so you can picture what studying this major may look like.',
  },
  {
    title: 'Prepare your next questions',
    text: 'Keep track of questions for admissions, advising, parents, or future campus visits as you narrow down your options.',
  },
  {
    title: 'Build your transition plan',
    text: 'Add majors from the degree explorer, include your quiz recommendations, write notes and questions, then print or save your summary as a PDF.',
  },
];

const readinessItems = [
  'If you have not already done so - take the intake quiz to find possible major matches.',
  'Make a list of your top liked majors.',
  'Review degree details and career outlooks.',
  'Write down any questions you have.',
  'Contact USF Admissions or Bellini College for your next step!',
];

function ProspectiveStudentDashboard() {
  const quizResult = loadPublicQuizResult();
  const hasPreviousQuizResult = Boolean(quizResult);

  function handleSectionLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="dashboard-page high-school-dashboard">
      <header className="dashboard-header">
        <Link className="dashboard-logo" to="/">
          Degree Explorer
        </Link>

        <nav className="dashboard-nav" aria-label="High school dashboard">
          <a
            href="#next-steps"
            onClick={(event) => handleSectionLinkClick(event, 'next-steps')}
          >
            Start
          </a>
          <a
            href="#intake-quiz"
            onClick={(event) => handleSectionLinkClick(event, 'intake-quiz')}
          >
            Intake Quiz
          </a>
          <a
            href="#toolbox"
            onClick={(event) => handleSectionLinkClick(event, 'toolbox')}
          >
            Tool Box
          </a>
          <Link to="/high-school/transition-planner">
            View Planner
          </Link>
        </nav>
      </header>

      <section className="high-school-hero scroll-reveal" id="start">
        <h1>planning, redefined</h1>

        <img
          className="high-school-hero-image"
          src={classroomImage}
          alt="Bellini College classroom"
        />

        <div className="high-school-hero-copy">
          <p className="dashboard-eyebrow">High School / Prospective Student</p>
          <p>
            Explore computing degrees, compare paths, and start turning your
            interests into a clearer first-year direction.
          </p>
        </div>
      </section>

      <section className="high-school-path scroll-reveal" id="next-steps">
        <div className="dashboard-section-rule"></div>
        <div className="dashboard-section-heading">
          <p className="dashboard-eyebrow">How to use this dashboard</p>
          <h2>Move from curiosity to next steps</h2>
        </div>

        <div className="high-school-step-grid">
          {launchSteps.map((step, index) => (
            <article className="high-school-step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-quiz-section scroll-reveal" id="intake-quiz">
        <div className="dashboard-section-rule"></div>
        <div className="high-school-feature-row">
          <div>
            <p className="dashboard-eyebrow">Intake quiz</p>
            <h2>Tell us what you like to build, solve, and study</h2>
            <p>
              Not sure which computing major matches your interests? Answer a few quick questions to explore 
              possible Bellini College programs, compare degree options, and prepare next steps for admissions or advising.
            </p>
            <div className="dashboard-quiz-actions">
              <Link className="dashboard-quiz-button compact" to="/quiz">
                <ClipboardList size={20} aria-hidden="true" />
                Take the quiz
              </Link>
              {hasPreviousQuizResult ? (
                <Link className="dashboard-quiz-button compact secondary" to="/quiz/results">
                  <BookOpenCheck size={20} aria-hidden="true" />
                  View previous result
                </Link>
              ) : (
                <span
                  className="dashboard-disabled-result-control"
                  tabIndex={0}
                  aria-describedby="previous-result-tooltip"
                >
                  <button
                    className="dashboard-quiz-button compact secondary"
                    type="button"
                    disabled
                  >
                    <BookOpenCheck size={20} aria-hidden="true" />
                    View previous result
                  </button>
                  <span
                    className="dashboard-disabled-result-tooltip"
                    id="previous-result-tooltip"
                    role="tooltip"
                  >
                    Finish the quiz first to generate a recommendation.
                  </span>
                </span>
              )}
            </div>
          </div>

          <img
            className="dashboard-quiz-image"
            src={quizImage}
            alt="Students reviewing college planning materials"
          />
        </div>
      </section>

      <section className="dashboard-majors-section scroll-reveal" id="toolbox">
        <div className="dashboard-section-rule dashboard-section-rule-light"></div>
        <div className="dashboard-section-heading">
          <p className="dashboard-eyebrow light toolbox-eyebrow">Toolbox</p>
          <h2>Use these tools to make planning a lot easier!</h2>
        </div>

        <div className="dashboard-major-cards high-school-tool-grid">
          <Link
            className="dashboard-major-card high-school-tool-card"
            to="/high-school/degrees"
          >
            <BookOpenCheck size={30} aria-hidden="true" />
            <span>Degree explorer and comparison</span>
            <p>
              Browse Bellini College degrees and compare two programs side by
              side by focus, skills, fit, topics, and next steps.
            </p>
          </Link>

          <Link
            className="dashboard-major-card high-school-tool-card"
            to="/high-school/career-paths"
          >
            <Briefcase size={30} aria-hidden="true" />
            <span>Possible Careers Paths</span>
            <p>
              Choose a major and jump to its career outlook, salary examples,
              and employment information in the Tampa Bay area.
            </p>
          </Link>

          <Link
            className="dashboard-major-card high-school-tool-card"
            to="/high-school/transition-planner"
          >
            <CalendarCheck size={30} aria-hidden="true" />
            <span>Admissions and transition planner</span>
            <p>
              Save quiz recommendations, choices, questions, notes, and next
              steps in a printable summary.
            </p>
          </Link>

          <Link
            className="dashboard-major-card high-school-tool-card"
            to="/high-school/parent-info"
          >
            <MessageCircleQuestion size={30} aria-hidden="true" />
            <span>Parent-friendly FAQs</span>
            <p>
              Review prospective student FAQs and questions to bring to
              admissions or advising conversations.
            </p>
          </Link>
        </div>
      </section>

      <section className="high-school-planner scroll-reveal" id="planner">
        <div className="dashboard-section-rule"></div>
        <div className="high-school-feature-row">
          <div>
            <p className="dashboard-eyebrow">Next Steps & Admissions Questions</p>
            <h2>Keep your exploration focused</h2>
            <p>
              If you are done exploring the dashboard and available features in
              the toolbox - your next step is to turn that information into a
              simple action plan.
            </p>
          </div>

          <ul className="high-school-checklist">
            {readinessItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default ProspectiveStudentDashboard;

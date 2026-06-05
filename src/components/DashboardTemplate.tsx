import { type MouseEvent, useEffect } from 'react';
import {
  BookOpenCheck,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  FileText,
  MessageCircleQuestion,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import classroomImage from '../assets/bellini.jpeg';
import quizImage from '../assets/quiz.avif';
import '../styles/dashboard.css';

type DashboardTemplateProps = {
  headline: string;
  intro: string;
  dashboardLabel?: string;
  pathHeading?: string;
  quizPath?: string;
  quizResultsPath?: string;
  transferPlannerPath?: string;
  transferReadinessPath?: string;
  steps?: DashboardStep[];
};

type DashboardStep = {
  title: string;
  text: string;
};

const dashboardSteps: DashboardStep[] = [
  {
    title: 'Find your starting point',
    text: 'Use the intake quiz to connect your goals, background, and questions to possible programs and support resources.',
  },
  {
    title: 'Explore degree paths',
    text: 'Review degree information to understand program focus, skills, and possible academic directions.',
  },
  {
    title: 'Compare your options',
    text: 'Use comparison tools to see how programs differ before narrowing your next steps.',
  },
  {
    title: 'Save what matters',
    text: 'Keep track of recommendations, programs, questions, and notes as you move through the planning process.',
  },
  {
    title: 'Prepare questions',
    text: 'Write down what you want to ask admissions, advisors, family, or support staff.',
  },
  {
    title: 'Plan your next action',
    text: 'Turn exploration into a short checklist you can revisit, print, or bring to a conversation.',
  },
];

const planningPlaceholders = [
  'Specified text to be put there.',
  'Specified text to be put there.',
  'Specified text to be put there.',
  'Specified text to be put there.',
];

function DashboardTemplate({
  headline,
  intro,
  dashboardLabel = 'General Dashboard',
  pathHeading = 'Move from questions to a clearer plan',
  quizPath = '/quiz',
  quizResultsPath,
  transferPlannerPath,
  transferReadinessPath,
  steps = dashboardSteps,
}: DashboardTemplateProps) {
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
    <main className="dashboard-page general-dashboard">
      <header className="dashboard-header">
        <Link className="dashboard-logo" to="/">
          CIC Support 
        </Link>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a
            href="#start"
            onClick={(event) => handleSectionLinkClick(event, 'start')}
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
            href="#majors"
            onClick={(event) => handleSectionLinkClick(event, 'majors')}
          >
            Tool Box
          </a>
          {transferPlannerPath ? (
            <Link to={transferPlannerPath}>Transition planner</Link>
          ) : (
            <a
              href="#planner"
              onClick={(event) => handleSectionLinkClick(event, 'planner')}
            >
              Planning
            </a>
          )}
        </nav>
      </header>

      <section className="dashboard-hero general-dashboard-hero scroll-reveal">
        <h1>{headline}</h1>
        <img
          className="dashboard-hero-image"
          src={classroomImage}
          alt="Modern classroom"
        />
        <div className="dashboard-intro general-dashboard-intro">
          <p className="dashboard-eyebrow">{dashboardLabel}</p>
          <p>{intro}</p>
        </div>
      </section>

      <section className="dashboard-path scroll-reveal" id="start">
        <div className="dashboard-section-rule"></div>
        <div className="dashboard-section-heading">
          <p className="dashboard-eyebrow">How to use this dashboard</p>
          <h2>{pathHeading}</h2>
        </div>

        <div className="dashboard-step-grid">
          {steps.map((step, index) => (
            <article className="dashboard-step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-quiz-section scroll-reveal" id="intake-quiz">
        <div className="dashboard-section-rule"></div>
        <div className="dashboard-feature-row">
          <div>
            <p className="dashboard-eyebrow">Intake quiz</p>
            <h2>Tell us what you want to explore next</h2>
            <p>
              Take a short quiz to help us recommend programs, resources, and
              next steps based on your goals and background.
            </p>
            <div className="dashboard-quiz-actions">
              <Link className="dashboard-quiz-button compact" to={quizPath}>
                <ClipboardList size={20} aria-hidden="true" />
                Take the quiz
              </Link>
              {quizResultsPath && (
                <Link
                  className="dashboard-quiz-button compact secondary"
                  to={quizResultsPath}
                >
                  View results
                </Link>
              )}
            </div>
          </div>

          <img
            className="dashboard-quiz-image"
            src={quizImage}
            alt="Classroom for intake quiz"
          />
        </div>
      </section>

      <section className="dashboard-majors-section scroll-reveal" id="majors">
        <div className="dashboard-section-rule dashboard-section-rule-light"></div>
        <div className="dashboard-section-heading">
          <p className="dashboard-eyebrow light">Toolbox</p>
          <h2>Use the tools that are ready now</h2>
        </div>

        <div className="dashboard-major-cards dashboard-tool-grid">
          <Link className="dashboard-major-card" to="/degrees">
            <BookOpenCheck size={30} aria-hidden="true" />
            <span>Degree Infographics and Comparison</span>
            <p>
              Explore degree options at Bellini College and compare two
              programs side by side to see which path best fits your interests,
              goals, and next steps.
            </p>
          </Link>

          {transferReadinessPath ? (
            <Link className="dashboard-major-card" to={transferReadinessPath}>
              <FileText size={30} aria-hidden="true" />
              <span>Transfer Readiness Guide</span>
              <p>
                Review transfer terms, planning expectations, and what to
                prepare before checking credits or meeting with advising.
              </p>
            </Link>
          ) : (
            <button className="dashboard-major-card dashboard-placeholder-tool" type="button">
              <MessageCircleQuestion size={30} aria-hidden="true" />
              <span>Specified text to be put there</span>
              <p>Specified text to be put there.</p>
            </button>
          )}

          {transferPlannerPath ? (
            <Link className="dashboard-major-card" to={transferPlannerPath}>
              <CalendarCheck size={30} aria-hidden="true" />
              <span>Transfer Planning Summary</span>
              <p>
                Save transfer details, notes, advising questions, and course
                lists in one printable planning summary.
              </p>
            </Link>
          ) : (
            <button className="dashboard-major-card dashboard-placeholder-tool" type="button">
              <CalendarCheck size={30} aria-hidden="true" />
              <span>Transition Planner</span>
              <p>
                A future general planning tool can organize recommendations,
                questions, notes, and next actions in one place.
              </p>
            </button>
          )}

          <Link className="dashboard-major-card" to="/career-paths">
            <Briefcase size={30} aria-hidden="true" />
            <span>Possible Career Paths</span>
            <p>
              Choose a major and jump to its career outlook, salary context,
              Tampa Bay employment information, and professional preparation
              options.
            </p>
          </Link>
        </div>
      </section>

      <section className="dashboard-planner-section scroll-reveal" id="planner">
        <div className="dashboard-section-rule"></div>
        <div className="dashboard-feature-row">
          <div>
            <p className="dashboard-eyebrow">Planning Section</p>
            <h2>Specified text to be put there</h2>
            <p>
              Specified text to be put there.
            </p>
          </div>

          <ul className="dashboard-checklist">
            {planningPlaceholders.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default DashboardTemplate;

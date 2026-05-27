import { type MouseEvent, useEffect } from 'react';
import {
  BookOpenCheck,
  Briefcase,
  CalendarCheck,
  ClipboardList,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import classroomImage from '../assets/bellini.jpeg';
import majorsImage from '../assets/plho1.avif';
import quizImage from '../assets/quiz.avif';
import '../styles/dashboard.css';
import '../styles/highSchoolDashboard.css';

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
];

const readinessItems = [
  'Computer science, AI, cybersecurity, hardware, and IT interests',
  'Degree fit based on skills you want to build',
  'Questions to bring to family, counselors, or Bellini contacts',
  'Resources to revisit before application or orientation steps',
];

function ProspectiveStudentDashboard() {
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
          CIC Support
        </Link>

        <nav className="dashboard-nav" aria-label="High school dashboard">
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
            href="#toolbox"
            onClick={(event) => handleSectionLinkClick(event, 'toolbox')}
          >
            Tool Box
          </a>
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

      <section className="high-school-path scroll-reveal">
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
            <Link className="dashboard-quiz-button compact" to="/quiz">
              <ClipboardList size={20} aria-hidden="true" />
              Take the quiz
            </Link>
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
          <h2>Use the tools that are ready now</h2>
        </div>

        <div className="dashboard-major-cards high-school-tool-grid">
          <Link className="dashboard-major-card high-school-tool-card" to="/degrees">
            <BookOpenCheck size={30} aria-hidden="true" />
            <span>Degree explorer and comparison</span>
            <p>
              Browse Bellini College degrees and compare two programs side by
              side by focus, skills, fit, topics, and next steps.
            </p>
            <img src={majorsImage} alt="" />
          </Link>

          <button
            className="dashboard-major-card high-school-tool-card placeholder-tool-card"
            type="button"
          >
            <Briefcase size={30} aria-hidden="true" />
            <span>Careers and internship paths</span>
            <p>
              This future tool will show beginner-friendly career paths,
              internship ideas, and examples connected to each degree.
            </p>
            <small>Placeholder</small>
          </button>

          <button
            className="dashboard-major-card high-school-tool-card placeholder-tool-card"
            type="button"
          >
            <CalendarCheck size={30} aria-hidden="true" />
            <span>Admissions and transition planner</span>
            <p>
              This future tool will help prospective students organize
              deadlines, questions, and transition steps.
            </p>
            <small>Placeholder</small>
          </button>
        </div>
      </section>

      <section className="high-school-planner scroll-reveal" id="planner">
        <div className="dashboard-section-rule"></div>
        <div className="high-school-feature-row">
          <div>
            <p className="dashboard-eyebrow">Planning checklist</p>
            <h2>Keep your exploration focused</h2>
            <p>
              High school students usually need a smaller set of clear choices
              before they need full advising detail. This dashboard keeps the
              first pass centered on fit, questions, and next actions.
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

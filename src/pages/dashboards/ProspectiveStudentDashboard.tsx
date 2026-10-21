import { type MouseEvent, useEffect } from 'react';
import {
  BookOpenCheck,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  MessageCircleQuestion,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css';
import '../../styles/highSchoolDashboard.css';

const launchSteps = [
  {
    title: 'Find your starting point',
    text: 'Explore degrees to connect your interests, strengths, favorite subjects, and career goals to possible Bellini College programs.',
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
    title: 'Plan your next steps',
    text: 'Make a list of programs that interest you and questions to discuss with admissions or advising.',
  },
];

const readinessItems = [
  'Explore degree options to find programs that match your interests.',
  'Make a list of your top liked majors.',
  'Review degree details and career outlooks.',
  'Write down any questions you have.',
  'Contact USF Admissions or Bellini College for your next step!',
];

function ProspectiveStudentDashboard() {

  function handleSectionLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
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
            href="#major-interest-finder"
            onClick={(event) => handleSectionLinkClick(event, 'major-interest-finder')}
          >
            Major Interest Finder
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
        <div className="high-school-hero-image picture-placeholder" aria-label="Reserved dashboard picture space">Picture placeholder</div>

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

      <section className="dashboard-quiz-section scroll-reveal coming-soon-area" id="major-interest-finder">
        <div className="dashboard-section-rule"></div>
        <div className="high-school-feature-row">
          <div>
            <p className="dashboard-eyebrow">Major Interest Finder</p>
            <h2>Major Interest Finder — Coming soon</h2>
            <p>Personalized program recommendations are coming soon.</p>
            <button className="dashboard-quiz-button compact dashboard-quiz-button-disabled-red" type="button" disabled>
              <ClipboardList size={20} aria-hidden="true" />
              Coming soon
            </button>
          </div>
          <div className="dashboard-quiz-image picture-placeholder" aria-label="Reserved Major Interest Finder picture space">Picture placeholder</div>
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
            to="/high-school/parent-info"
          >
            <MessageCircleQuestion size={30} aria-hidden="true" />
            <span>Parent-friendly FAQs</span>
            <p>
              Review prospective student FAQs and questions to bring to
              admissions or advising conversations.
            </p>
          </Link>

          <button
            className="dashboard-major-card high-school-tool-card high-school-tool-coming-soon coming-soon-area"
            type="button"
            disabled
          >
            <CalendarCheck size={30} aria-hidden="true" />
            <span>Admissions and transition planner</span>
            <p>Coming soon!</p>
          </button>
        </div>
      </section>

      <section className="high-school-planner scroll-reveal" id="planner">
        <div className="dashboard-section-rule"></div>
        <div className="high-school-feature-row">
          <div>
            <p className="dashboard-eyebrow">Next Steps & Admissions Questions</p>
            <h2>Keep your exploration focused</h2>
            <p>
              Compare your preferred degrees, review their career outlooks, and
              prepare questions for admissions or advising.
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

import { type MouseEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classroomImage from '../assets/bellini.jpeg';
import majorsImage from '../assets/plho1.avif';
import quizImage from '../assets/quiz.avif';
import '../styles/dashboard.css';

type DashboardTemplateProps = {
  headline: string;
  intro: string;
};

function DashboardTemplate({ headline, intro }: DashboardTemplateProps) {
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
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link className="dashboard-logo" to="/">
          CIC Support Platform
        </Link>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
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
            Majors
          </a>
          <a
            href="#services"
            onClick={(event) => handleSectionLinkClick(event, 'services')}
          >
            Services
          </a>
        </nav>

        <Link className="dashboard-profile-link" to="/profile">
          Your Profile
        </Link>
      </header>

      <section className="dashboard-hero scroll-reveal">
        <h1>{headline}</h1>
        <img
          className="dashboard-hero-image"
          src={classroomImage}
          alt="Modern classroom"
        />
      </section>

      <section className="dashboard-intro scroll-reveal">
        <p>{intro}</p>
      </section>

      <section className="dashboard-quiz-section scroll-reveal" id="intake-quiz">
        <div className="dashboard-section-rule"></div>
        <h2>
          Intake Quiz - We Will Help You Understand What Suits You Best!
        </h2>
        <p>
          Take a short quiz to help us recommend programs, resources, and next
          steps based on your goals and background.
        </p>

        <div className="dashboard-quiz-content">
          <Link className="dashboard-quiz-button" to="/quiz">
            Take Me to the Quiz!
          </Link>
          <img
            className="dashboard-quiz-image"
            src={quizImage}
            alt="Classroom for intake quiz"
          />
        </div>
      </section>

      <section className="dashboard-majors-section scroll-reveal" id="majors">
        <div className="dashboard-section-rule dashboard-section-rule-light"></div>
        <h2>What We Offer</h2>

        <div className="dashboard-major-cards">
          <Link className="dashboard-major-card" to="/degrees">
            <span>Degree Infographics</span>
            <p>View all the degree informations here</p>
            <img src={quizImage} alt="" />
          </Link>

          <button className="dashboard-major-card" type="button">
            <span>Transition Analyzer</span>
            <p>
              Find out the timeline and how transitioning into the path you
              have chosen will look like for you
            </p>
            <img src={majorsImage} alt="" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default DashboardTemplate;

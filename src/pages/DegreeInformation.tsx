import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { degrees } from '../data/degrees';
import '../styles/degrees.css';

const filters = [
  'All',
  'Software',
  'AI/Data',
  'Cybersecurity',
  'Hardware',
  'IT/Systems',
] as const;

const futureDegreeSlugs = new Set([
  'computer-science-and-business',
  'computer-science-and-criminology',
  'computer-science-and-interdisciplinary-social-sciences',
]);

const completedDegreePages = new Set([
  'computer-science',
  'computer-engineering',
  'computer-science-and-engineering',
  'artificial-intelligence',
  'cybersecurity',
  'information-technology',
]);

function DegreeInformation() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(
    'All',
  );
  const visibleDegrees = useMemo(() => {
    const currentDegrees = degrees.filter(
      (degree) => !futureDegreeSlugs.has(degree.slug),
    );

    if (activeFilter === 'All') {
      return currentDegrees;
    }

    return currentDegrees.filter((degree) => degree.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="degrees-page">
      <section className="degrees-hero">
        <p className="degrees-eyebrow">Bellini College Degree Explorer</p>
        <h1>Explore Bellini College Degrees</h1>
        <p>
          Learn the difference between Bellini College’s computing programs and
          find which degree best matches your interests.
        </p>
      </section>

      <section className="degrees-filters" aria-label="Filter degrees">
        {filters.map((filter) => (
          <button
            className={filter === activeFilter ? 'active' : ''}
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </section>

      <section className="degree-grid" id="degree-grid">
        {visibleDegrees.map((degree) => (
          <article className="degree-card" key={degree.name}>
            <div>
              <p className="degree-category">{degree.category}</p>
              <h2>
                {degree.name}, {degree.credential}
              </h2>
              <p className="degree-best-for">Best for: {degree.bestFor}</p>
              <p>{degree.description}</p>
            </div>

            <div>
              <p className="degree-skills">Skills: {degree.skills}</p>
              <div className="degree-card-actions">
                {completedDegreePages.has(degree.slug) ? (
                  <Link to={`/degrees/${degree.slug}`}>Learn More</Link>
                ) : (
                  <button className="placeholder-button" type="button">
                    Learn More
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="degrees-extra-pathways" aria-label="Extra pathways">
        <a className="placeholder-link" href="#bachelors-masters">
          <span>Bachelor’s/Master’s Pathways</span>
          <small>Coming soon</small>
        </a>
        <Link className="active-link" to="/degrees/future-options">
          <span>Interdisciplinary Computing Majors / Future Degree Options</span>
          <small>View list</small>
        </Link>
        <a className="placeholder-link" href="#minors">
          <span>Available Minors</span>
          <small>Coming soon</small>
        </a>
      </section>

      <section className="degrees-quiz-callout">
        <div>
          <h2>Not sure which degree fits you?</h2>
          <p>
            Start with the quiz and we’ll suggest 2–3 programs based on your
            interests.
          </p>
        </div>
        <Link to="/quiz">Start Quiz</Link>
      </section>

      <p className="degrees-disclaimer">
        This page is for exploration only. Students should confirm official
        requirements, course availability, and degree plans with USF advising
        and the undergraduate catalog.
      </p>
    </main>
  );
}

export default DegreeInformation;

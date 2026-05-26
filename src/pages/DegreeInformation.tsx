import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { degrees } from '../data/degrees';
import { getSavedUserType } from '../utils/auth';
import { getDashboardRoute } from '../utils/userTypes';
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
  const navigate = useNavigate();
  const [dashboardRoute, setDashboardRoute] = useState('/');
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(
    'All',
  );
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareMessage, setCompareMessage] = useState('');

  useEffect(() => {
    async function loadDashboardRoute() {
      const savedUserType = await getSavedUserType();
      const savedDashboardRoute = savedUserType
        ? getDashboardRoute(savedUserType)
        : '';

      setDashboardRoute(savedDashboardRoute || '/');
    }

    loadDashboardRoute();
  }, []);

  const visibleDegrees = useMemo(() => {
    const currentDegrees = degrees.filter(
      (degree) => !futureDegreeSlugs.has(degree.slug),
    );

    if (activeFilter === 'All') {
      return currentDegrees;
    }

    return currentDegrees.filter((degree) => degree.category === activeFilter);
  }, [activeFilter]);

  const selectedDegrees = compareSlugs
    .map((slug) => degrees.find((degree) => degree.slug === slug))
    .filter((degree) => degree !== undefined);

  function handleAddToCompare(slug: string) {
    setCompareMessage('');

    if (compareSlugs.includes(slug)) {
      return;
    }

    if (compareSlugs.length >= 2) {
      setCompareMessage(
        'You can only compare two degrees at a time. Remove one to add another.',
      );
      return;
    }

    setCompareSlugs((currentSlugs) => [...currentSlugs, slug]);
  }

  function handleRemoveFromCompare(slug: string) {
    setCompareMessage('');
    setCompareSlugs((currentSlugs) =>
      currentSlugs.filter((currentSlug) => currentSlug !== slug),
    );
  }

  function handleClearCompare() {
    setCompareMessage('');
    setCompareSlugs([]);
  }

  function handleCompareDegrees() {
    if (compareSlugs.length !== 2) {
      return;
    }

    navigate(`/degrees/compare?first=${compareSlugs[0]}&second=${compareSlugs[1]}`);
  }

  return (
    <main className="degrees-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Bellini College Degree Explorer</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to={dashboardRoute}
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Explore Bellini College Degrees</h1>
        <p>
          Learn the difference between Bellini College’s computing programs and
          find which degree best matches your interests.
        </p>
        <p>
          Use Add to Compare on any two degree cards to view a side-by-side
          breakdown of their focus, skills, fit, topics, and next steps.
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
                <button
                  className={
                    compareSlugs.includes(degree.slug) ? 'compare-selected' : ''
                  }
                  disabled={compareSlugs.includes(degree.slug)}
                  type="button"
                  onClick={() => handleAddToCompare(degree.slug)}
                >
                  {compareSlugs.includes(degree.slug)
                    ? 'Selected'
                    : 'Add to Compare'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="degrees-extra-pathways" aria-label="Extra pathways">
        <Link className="active-link" to="/degrees/bachelors-masters-pathways">
          <span>Bachelor’s/Master’s Pathways</span>
          <small>View pathways</small>
        </Link>
        <Link className="active-link" to="/degrees/future-options">
          <span>Interdisciplinary Computing Majors / Future Degree Options</span>
          <small>View list</small>
        </Link>
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

      {(compareSlugs.length > 0 || compareMessage) && (
        <section className="degree-compare-bar" aria-label="Degree comparison">
          <div>
            <p className="compare-bar-label">Comparing:</p>
            <div className="compare-selection-list">
              {selectedDegrees.map((degree) => (
                <span className="compare-chip" key={degree.slug}>
                  {degree.name}
                  <button
                    aria-label={`Remove ${degree.name} from comparison`}
                    type="button"
                    onClick={() => handleRemoveFromCompare(degree.slug)}
                  >
                    ×
                  </button>
                </span>
              ))}
              {compareSlugs.length < 2 && (
                <span className="compare-empty">Select one more degree</span>
              )}
            </div>
            {compareMessage && (
              <p className="compare-warning">{compareMessage}</p>
            )}
          </div>

          <div className="compare-bar-actions">
            <button type="button" onClick={handleClearCompare}>
              Clear
            </button>
            <button
              disabled={compareSlugs.length !== 2}
              type="button"
              onClick={handleCompareDegrees}
            >
              Compare Degrees
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default DegreeInformation;

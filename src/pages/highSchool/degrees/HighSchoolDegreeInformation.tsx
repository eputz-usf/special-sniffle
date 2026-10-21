import { filterDegrees } from '../../../utils/degreeFilters';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { degrees } from '../../../data/highSchoolDegrees';
import '../../../styles/degrees.css';

const filters = [
  'All',
  'Software',
  'AI/Data',
  'Cybersecurity',
  'IT/Systems',
  'Interdisciplinary',
] as const;

function HighSchoolDegreeInformation() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(
    'All',
  );
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareMessage, setCompareMessage] = useState('');

  const visibleDegrees = useMemo(() => {
    return filterDegrees(degrees, activeFilter);
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

    navigate(`/high-school/degrees/compare?first=${compareSlugs[0]}&second=${compareSlugs[1]}`);
  }


  return (
    <main className="degrees-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Bellini College Degree Explorer</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/prospective-student#toolbox"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Explore Bellini College Degrees and Interdisciplinary Majors</h1>
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
            aria-pressed={filter === activeFilter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </section>

      <p role="status" aria-live="polite">{visibleDegrees.length} programs shown · {activeFilter}</p>
      {[false, true].map((interdisciplinary) => {
        const groupDegrees = visibleDegrees.filter((degree) => Boolean(degree.status) === interdisciplinary);
        if (!groupDegrees.length) return null;
        return <section key={String(interdisciplinary)} id={interdisciplinary ? 'interdisciplinary' : 'degree-grid'} aria-labelledby={interdisciplinary ? 'interdisciplinary-heading' : 'main-degrees-heading'}>
          <h2 id={interdisciplinary ? 'interdisciplinary-heading' : 'main-degrees-heading'}>{interdisciplinary ? 'Interdisciplinary Computing Majors' : 'Computing Degrees'}</h2>
          {interdisciplinary && <><p>These degrees combine computing with another subject, such as business, crime and justice, or people and society. Think about which subjects you enjoy.</p><p>Use these cards to explore your options. Ask a Bellini advisor if you can apply now and which classes you would take.</p></>}
      <div className="degree-grid">
        {groupDegrees.map((degree) => (
          <article className="degree-card" key={degree.name}>
            <div>
              <p className="degree-category">{degree.category}</p>
              <h3>{degree.name}</h3>
              <p className="degree-best-for">Best for: {degree.bestFor}</p>
              <p>{degree.description}</p>
            </div>

            <div>
              <p className="degree-skills">Skills: {degree.skills}</p>
              <div className="degree-card-actions">
                <Link to={`/high-school/degrees/${degree.slug}`}>Learn More</Link>
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
      </div>

        </section>;
      })}

      <section className="degrees-extra-pathways" aria-label="Extra pathways">
        <Link className="active-link" to="/high-school/degrees/bachelors-masters-pathways">
          <span>Bachelor’s/Master’s Pathways</span>
          <small>View pathways</small>
        </Link>
        <Link className="active-link" to="/high-school/degrees/future-options">
          <span>Anticipated Degrees for 2027</span>
          <small>View future degree options</small>
        </Link>
      </section>

      <section className="degrees-quiz-callout coming-soon-area">
        <div>
          <h2>Major Interest Finder — Coming soon</h2>
          <p>Personalized program recommendations are coming soon.</p>
        </div>
      </section>

      <p className="degrees-disclaimer">
        This page is for exploration only. Students should confirm official
        requirements, course availability, and degree plans with USF advising
        and the undergraduate catalog.
      </p>

      {(compareSlugs.length > 0 || compareMessage) && (
        <section className="degree-compare-bar" aria-label="Degree comparison" aria-live="polite" aria-atomic="true">
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
              <p className="compare-warning" role="status">{compareMessage}</p>
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

export default HighSchoolDegreeInformation;

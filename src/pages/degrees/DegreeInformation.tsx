import { filterDegrees } from '../../utils/degreeFilters';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { degrees } from '../../data/degrees';
import { getDegreeSource } from '../../utils/degreeSource';
import { addComparisonSlug, buildComparisonPath } from '../../utils/degreeComparison';
import '../../styles/degrees.css';

const filters = [
  'All',
  'Software',
  'AI/Data',
  'Cybersecurity',
  'IT/Systems',
  'Interdisciplinary',
] as const;

const dashboardRoutesBySource = {
  general: '/dashboard/general#majors',
  'current-usf-student': '/dashboard/current-usf-student#majors',
  'current-bellini-student': '/dashboard/current-bellini-student#majors',
  'transfer-student': '/dashboard/transfer-student#majors',
} as const;

function DegreeInformation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sourceDashboard = getDegreeSource(searchParams.get('from'));
  const isGeneralSource = sourceDashboard === 'general';
  const isBelliniStudentSource = sourceDashboard === 'current-bellini-student';
  const degreeSourceSuffix = sourceDashboard ? `?from=${sourceDashboard}` : '';
  const dashboardBackRoute =
    sourceDashboard &&
    sourceDashboard in dashboardRoutesBySource
      ? dashboardRoutesBySource[
          sourceDashboard as keyof typeof dashboardRoutesBySource
        ]
      : '/dashboard/transfer-student#majors';
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
    const next = addComparisonSlug(compareSlugs, slug);
    setCompareMessage(next.message);
    setCompareSlugs(next.slugs);
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
    const path = buildComparisonPath(compareSlugs, sourceDashboard);
    if (path) navigate(path);
  }


  return (
    <main className="degrees-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Bellini College Degree Explorer</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to={dashboardBackRoute}
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Explore Bellini College Degrees and Interdisciplinary Majors</h1>
        <p>
          Review Bellini College computing programs, compare academic focus
          areas, and identify which paths are worth discussing with admissions
          or advising.
        </p>
        <p>
          {isBelliniStudentSource
            ? 'Use Add to Compare to explore two Bellini majors’ focus, sample topics, skills, and questions to discuss with advising before requesting a major change.'
            : 'Use Add to Compare on two programs for a side-by-side review of their focus, skills, and next steps.'}
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
          {interdisciplinary && <><p>Explore a computing foundation connected to business, criminology, and social sciences, and discuss these interdisciplinary paths with advising.</p><p>Planned options for exploration; availability and academic content await confirmation. Elective information is coming soon.</p></>}
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
                <Link to={`/degrees/${degree.slug}${degreeSourceSuffix}`}>Learn More</Link>
                <button
                  className={
                    compareSlugs.includes(degree.slug) ? 'compare-selected' : ''
                  }
                  disabled={isGeneralSource || compareSlugs.includes(degree.slug)}
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
        <Link
          className="active-link"
          to={`/degrees/bachelors-masters-pathways${degreeSourceSuffix}`}
        >
          <span>Bachelor’s/Master’s Pathways</span>
          <small>View pathways</small>
        </Link>
        <Link
          className="active-link"
          to={`/degrees/future-options${degreeSourceSuffix}`}
        >
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
              disabled={isGeneralSource || compareSlugs.length !== 2}
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

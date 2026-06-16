import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { degrees } from '../../data/degrees';
import {
  addTransferPlannerMajor,
  loadTransferPlannerMajors,
  removeTransferPlannerMajor,
} from '../../utils/transferPlannerMajors';
import {
  addCurrentUsfProfileMajor,
  loadCurrentUsfProfileMajors,
  removeCurrentUsfProfileMajor,
} from '../../utils/currentUsfProfileMajors';
import {
  addBelliniStudentProfileMajor,
  loadBelliniStudentProfileMajors,
  removeBelliniStudentProfileMajor,
} from '../../utils/belliniStudentProfileMajors';
import '../../styles/degrees.css';

const filters = [
  'All',
  'Software',
  'AI/Data',
  'Cybersecurity',
  'IT/Systems',
] as const;

const futureDegreeSlugs = new Set([
  'computer-science-and-business',
  'computer-science-and-criminology',
  'computer-science-and-interdisciplinary-social-sciences',
]);

const completedDegreePages = new Set([
  'computer-science',
  'computer-science-and-engineering',
  'artificial-intelligence',
  'cybersecurity',
  'information-technology',
]);

const dashboardRoutesBySource = {
  'current-usf-student': '/dashboard/current-usf-student#majors',
  'current-bellini-student': '/dashboard/current-bellini-student#majors',
  'transfer-student': '/dashboard/transfer-student#majors',
} as const;

function DegreeInformation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sourceDashboard = searchParams.get('from');
  const isCurrentUsfStudentSource = sourceDashboard === 'current-usf-student';
  const isBelliniStudentSource = sourceDashboard === 'current-bellini-student';
  const isProfileSource = isCurrentUsfStudentSource || isBelliniStudentSource;
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
  const [plannerMajorSlugs, setPlannerMajorSlugs] = useState(() =>
    loadTransferPlannerMajors().map((major) => major.slug),
  );
  const [profileMajorSlugs, setProfileMajorSlugs] = useState(() =>
    loadCurrentUsfProfileMajors().map((major) => major.slug),
  );
  const [belliniProfileMajorSlugs, setBelliniProfileMajorSlugs] = useState(() =>
    loadBelliniStudentProfileMajors().map((major) => major.slug),
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

    const compareParams = new URLSearchParams({
      first: compareSlugs[0],
      second: compareSlugs[1],
    });

    if (sourceDashboard) {
      compareParams.set('from', sourceDashboard);
    }

    navigate(`/degrees/compare?${compareParams.toString()}`);
  }

  function handleAddToPlanner(degree: (typeof degrees)[number]) {
    if (plannerMajorSlugs.includes(degree.slug)) {
      const nextMajors = removeTransferPlannerMajor(degree.slug);
      setPlannerMajorSlugs(nextMajors.map((major) => major.slug));
      return;
    }

    const nextMajors = addTransferPlannerMajor({
      slug: degree.slug,
      name: degree.name,
    });

    setPlannerMajorSlugs(nextMajors.map((major) => major.slug));
  }

  function handleAddToProfile(degree: (typeof degrees)[number]) {
    if (isBelliniStudentSource) {
      if (belliniProfileMajorSlugs.includes(degree.slug)) {
        const nextMajors = removeBelliniStudentProfileMajor(degree.slug);
        setBelliniProfileMajorSlugs(nextMajors.map((major) => major.slug));
        return;
      }

      const nextMajors = addBelliniStudentProfileMajor({
        slug: degree.slug,
        name: degree.name,
      });

      setBelliniProfileMajorSlugs(nextMajors.map((major) => major.slug));
      return;
    }

    if (profileMajorSlugs.includes(degree.slug)) {
      const nextMajors = removeCurrentUsfProfileMajor(degree.slug);
      setProfileMajorSlugs(nextMajors.map((major) => major.slug));
      return;
    }

    const nextMajors = addCurrentUsfProfileMajor({
      slug: degree.slug,
      name: degree.name,
    });

    setProfileMajorSlugs(nextMajors.map((major) => major.slug));
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
        <h1>Explore Bellini College Degrees</h1>
        <p>
          Review Bellini College computing programs, compare academic focus
          areas, and identify which paths are worth discussing with admissions
          or advising.
        </p>
        <p>
          {isBelliniStudentSource
            ? 'Use Add to Compare to see what may change if you switch between two Bellini majors, including focus, coursework direction, skills, advising questions, and course-overlap next steps. You can also save programs to your profile.'
            : `Use Add to Compare for a side-by-side review, or save programs to your ${
                isProfileSource ? 'profile.' : 'transfer planner.'
              }`}
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
                {degree.name}
              </h2>
              <p className="degree-best-for">Best for: {degree.bestFor}</p>
              <p>{degree.description}</p>
            </div>

            <div>
              <p className="degree-skills">Skills: {degree.skills}</p>
                <div className="degree-card-actions">
                {completedDegreePages.has(degree.slug) ? (
                  <Link to={`/degrees/${degree.slug}${degreeSourceSuffix}`}>
                    Learn More
                  </Link>
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
                {isProfileSource ? (
                  <button
                    className={
                      (
                        isBelliniStudentSource
                          ? belliniProfileMajorSlugs
                          : profileMajorSlugs
                      ).includes(degree.slug)
                        ? 'planner-selected'
                        : ''
                    }
                    type="button"
                    onClick={() => handleAddToProfile(degree)}
                  >
                    {(
                      isBelliniStudentSource
                        ? belliniProfileMajorSlugs
                        : profileMajorSlugs
                    ).includes(degree.slug)
                      ? 'Remove from Profile'
                      : 'Add to Profile'}
                  </button>
                ) : (
                  <button
                    className={
                      plannerMajorSlugs.includes(degree.slug) ? 'planner-selected' : ''
                    }
                    type="button"
                    onClick={() => handleAddToPlanner(degree)}
                  >
                    {plannerMajorSlugs.includes(degree.slug)
                      ? 'Remove from Planner'
                      : 'Add to Planner'}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

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
          <span>Interdisciplinary Computing Majors / Future Degree Options</span>
          <small>View list</small>
        </Link>
      </section>

      <section className="degrees-quiz-callout">
        <div>
          <h2>Not sure which degree fits you?</h2>
          <p>
            Use the intake quiz if you want a quick recommendation before
            reviewing catalog requirements or transfer-credit questions.
          </p>
        </div>
        <Link to="/transfer/quiz">Start Quiz</Link>
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

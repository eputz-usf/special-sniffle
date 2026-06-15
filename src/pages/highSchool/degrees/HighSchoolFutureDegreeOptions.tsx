import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { plannedHighSchoolFutureDegreeOptions } from '../../../data/highSchoolFutureDegreeOptions';
import {
  addPlannerMajor,
  loadPlannerMajors,
  removePlannerMajor,
} from '../../../utils/transitionPlannerMajors';
import '../../../styles/degrees.css';

const anticipatedDegreeOptions = [
  {
    name: 'B.S. in Computer Science and Anthropology',
    status: 'Anticipated for 2027',
  },
  {
    name: 'B.S. in Computer Science and Economics',
    status: 'Anticipated for 2027',
  },
];

function HighSchoolFutureDegreeOptions() {
  const navigate = useNavigate();
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareMessage, setCompareMessage] = useState('');
  const [plannerMajorSlugs, setPlannerMajorSlugs] = useState(() =>
    loadPlannerMajors().map((major) => major.slug),
  );

  const selectedDegrees = compareSlugs
    .map((slug) =>
      plannedHighSchoolFutureDegreeOptions.find((degree) => degree.slug === slug),
    )
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

    navigate(
      `/high-school/degrees/compare?first=${compareSlugs[0]}&second=${compareSlugs[1]}`,
    );
  }

  function handleAddToPlanner(
    degree: (typeof plannedHighSchoolFutureDegreeOptions)[number],
  ) {
    if (plannerMajorSlugs.includes(degree.slug)) {
      const nextMajors = removePlannerMajor(degree.slug);
      setPlannerMajorSlugs(nextMajors.map((major) => major.slug));
      return;
    }

    const nextMajors = addPlannerMajor({
      slug: degree.slug,
      name: degree.name,
    });

    setPlannerMajorSlugs(nextMajors.map((major) => major.slug));
  }

  return (
    <main className="degrees-page">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="future-degree-section">
        <div className="future-degree-heading">
          <p className="degrees-eyebrow">Future Degree Options</p>
          <h1>Interdisciplinary Computing Majors</h1>
          <p>
            The college will offer Computer Science-based interdisciplinary
            majors that branch into other fields, such as business,
            criminology, and social sciences. Students will build a strong
            computer science foundation while also learning how AI,
            cybersecurity, and data can be applied in different real-world
            career areas.
          </p>
          <p>
            The following Computer Science branches and their elective lists are
            coming soon!
          </p>
        </div>

        <div className="future-degree-group">
          <h2>Interdisciplinary Computing Majors</h2>
          <div className="future-degree-list">
            {plannedHighSchoolFutureDegreeOptions.map((degree) => (
              <article
                className="future-degree-card detailed"
                key={degree.slug}
              >
                <div>
                  <h3>{degree.name}</h3>
                  <p className="future-degree-focus">{degree.focus}</p>
                </div>
                <div>
                  <div className="future-degree-text-panel">
                    <h4>What this major or concentration is about:</h4>
                    <p>{degree.description}</p>
                    <h4>Good fit if you like:</h4>
                    <p>{degree.goodFit}</p>
                  </div>
                </div>
                <div>
                  <div className="future-degree-text-panel">
                    <h4>Planning Resources</h4>

                    <div className="future-resource-buttons">
                      {degree.planningResources.map((resource) =>
                        resource.url ? (
                          <a
                            className="future-resource-button"
                            href={resource.url}
                            key={resource.label}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {resource.label} ↗
                          </a>
                        ) : (
                          <span
                            className="future-resource-button disabled"
                            key={resource.label}
                          >
                            {resource.label}
                          </span>
                        )
                      )}
                    </div>

                    {degree.programUrl ? (
                      <a
                        className="future-degree-button"
                        href={degree.programUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        View Program Details ↗
                      </a>
                    ) : (
                      <button className="future-degree-button" type="button">
                        View Program Details ↗
                      </button>
                    )}
                    <button
                      className={
                        compareSlugs.includes(degree.slug)
                          ? 'future-degree-button compare-selected'
                          : 'future-degree-button'
                      }
                      disabled={compareSlugs.includes(degree.slug)}
                      type="button"
                      onClick={() => handleAddToCompare(degree.slug)}
                    >
                      {compareSlugs.includes(degree.slug)
                        ? 'Selected'
                        : 'Add to Compare'}
                    </button>
                    <button
                      className={
                        plannerMajorSlugs.includes(degree.slug)
                          ? 'future-degree-button planner-selected'
                          : 'future-degree-button'
                      }
                      type="button"
                      onClick={() => handleAddToPlanner(degree)}
                    >
                      {plannerMajorSlugs.includes(degree.slug)
                        ? 'Remove from Planner'
                        : 'Add to Planner'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="degree-detail-section degree-alert-note">
        <h2>Important Note</h2>
        <p>
          The interdisciplinary computing majors listed above are available for
          planning, but their official elective lists are still coming soon.
        </p>

        <p>
          Students should use the available program flowcharts and plans of
          study for early planning, then confirm electives and degree
          requirements with Bellini College advising.
        </p>
      </section>

      <section className="future-degree-section">
        <div className="future-degree-heading">
          <p className="degrees-eyebrow">Future Degree Options</p>
          <h2>Anticipated for 2027</h2>
        </div>

        <div className="future-degree-grid featured">
          {anticipatedDegreeOptions.map((degree) => (
            <article className="future-degree-card" key={degree.name}>
              <h3>{degree.name}</h3>
              <span className="future-degree-status">{degree.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="degree-contact-section">
        <p className="degrees-eyebrow">Contact</p>
        <h2>Questions About Future Degree Options?</h2>
        <p>
          Emily Boyko - Academic Advisor at{' '}
          <a href="mailto:Bellini-CollegeICMadvising@usf.edu">
            Bellini-CollegeICMadvising@usf.edu
          </a>
        </p>
      </section>

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

export default HighSchoolFutureDegreeOptions;

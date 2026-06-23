import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { degrees } from '../../data/degrees';
import { plannedHighSchoolFutureDegreeOptions as sharedFutureDegreeOptions } from '../../data/highSchoolFutureDegreeOptions';
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

function FutureDegreeOptions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sourceDashboard = searchParams.get('from');
  const isCurrentUsfStudentSource = sourceDashboard === 'current-usf-student';
  const isBelliniStudentSource = sourceDashboard === 'current-bellini-student';
  const isProfileSource = isCurrentUsfStudentSource || isBelliniStudentSource;
  const degreeSourceSuffix = sourceDashboard ? `?from=${sourceDashboard}` : '';
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
  const plannedFutureDegrees = sharedFutureDegreeOptions;
  const computerScienceDegree = degrees.find(
    (degree) => degree.slug === 'computer-science',
  );
  const comparisonDegreeOptions = [
    ...(computerScienceDegree ? [computerScienceDegree] : []),
    ...plannedFutureDegrees,
  ];
  const selectedDegrees = compareSlugs
    .map((slug) =>
      comparisonDegreeOptions.find((degree) => degree.slug === slug),
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

    const compareParams = new URLSearchParams({
      first: compareSlugs[0],
      second: compareSlugs[1],
    });

    if (sourceDashboard) {
      compareParams.set('from', sourceDashboard);
    }

    navigate(`/degrees/compare?${compareParams.toString()}`);
  }

  function handleAddToPlanner(degree: (typeof plannedFutureDegrees)[number]) {
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

  function handleAddToProfile(degree: (typeof plannedFutureDegrees)[number]) {
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
      <Link className="degree-back-link" to={`/degrees${degreeSourceSuffix}`}>
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
        </div>

        <div className="future-degree-group">
          <h2>Interdisciplinary Computing Majors</h2>
          <div className="future-degree-list">
            {plannedFutureDegrees.map((degree) => (
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
                  <h4>Description</h4>
                  <p>{degree.description}</p>
                  <h4>Good fit if you are interested in:</h4>
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
      {compareSlugs.includes(degree.slug) ? 'Selected' : 'Add to Compare'}
    </button>
    {isProfileSource ? (
      <button
        className={
          (
            isBelliniStudentSource
              ? belliniProfileMajorSlugs
              : profileMajorSlugs
          ).includes(degree.slug)
            ? 'future-degree-button planner-selected'
            : 'future-degree-button'
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
    )}

    
  </div>
</div>
                  
              </article>
            ))}
          </div>
          {computerScienceDegree && (
            <article className="future-degree-card cs-compare-card">
              <div>
                <h3>{computerScienceDegree.name}</h3>
                <p className="future-degree-focus">
                  {computerScienceDegree.skills}
                </p>
                <p>
                  Confused between Computer Science and an interdisciplinary
                  computing major? Add Computer Science and one
                  interdisciplinary major to compare them side by side.
                </p>
                <p>{computerScienceDegree.description}</p>
              </div>
              <button
                className={
                  compareSlugs.includes(computerScienceDegree.slug)
                    ? 'future-degree-button compare-selected'
                    : 'future-degree-button'
                }
                disabled={compareSlugs.includes(computerScienceDegree.slug)}
                type="button"
                onClick={() => handleAddToCompare(computerScienceDegree.slug)}
              >
                {compareSlugs.includes(computerScienceDegree.slug)
                  ? 'Selected'
                  : 'Add Computer Science to Compare'}
              </button>
            </article>
          )}
        </div>
      </section>

<section className="degree-detail-section degree-alert-note">
  <h2>Important Note</h2>
  <p>
    The interdisciplinary computing majors listed above are available for
    planning, but their official elective lists are still coming soon.
  </p>
  
  <p>
    Students should use the available program flowcharts and plans of study for
    early planning, then confirm electives and degree requirements with Bellini
    College advising.
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

export default FutureDegreeOptions;

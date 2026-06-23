import { Link, useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Degree } from '../../data/degrees';
import { getDegreeBySlug } from '../../data/degrees';
import type { HighSchoolFutureDegreeOption } from '../../data/highSchoolFutureDegreeOptions';
import { getHighSchoolFutureDegreeOptionBySlug } from '../../data/highSchoolFutureDegreeOptions';
import '../../styles/degrees.css';

type ComparableDegree = Degree | HighSchoolFutureDegreeOption;

type ComparisonField = {
  label: string;
  render: (degree: ComparableDegree) => ReactNode;
};

function renderList(items: string[]) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function splitSkillText(skills: string) {
  return skills
    .split('•')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function isFutureDegreeOption(
  degree: ComparableDegree,
): degree is HighSchoolFutureDegreeOption {
  return 'focus' in degree;
}

function renderCareerOptions(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return 'Career information coming soon';
  }

  if (!degree.careerOptions?.length) {
    return 'Career information coming soon';
  }

  return (
    <ul className="comparison-career-list">
      {degree.careerOptions.map((career) => (
        <li key={career.title}>
          <strong>{career.title}</strong>
          <span>{career.description}</span>
        </li>
      ))}
    </ul>
  );
}

function renderCareerSalaries(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return 'Salary context coming soon';
  }

  if (!degree.careerOptions?.length) {
    return 'Salary context coming soon';
  }

  return (
    <>
      <p className="comparison-salary-note">
        Related Tampa Bay salary context; individual outcomes vary by role,
        experience, location, and employer.
      </p>
      <ul className="comparison-salary-list">
        {degree.careerOptions.map((career) => (
          <li key={career.title}>
            <strong>{career.title}</strong>
            <span>{career.salary}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function getOfficialResources(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return [
      ...degree.planningResources,
      {
        label: 'Program Details',
        url: degree.programUrl,
      },
    ];
  }

  const flowcharts =
    degree.slug === 'computer-science'
      ? degree.officialLinks?.flowcharts?.filter(
          (resource) =>
            !['2022-23 Flowchart', '2023-24 Flowchart', '2024-25 Flowchart'].includes(
              resource.label,
            ),
        ) ?? []
      : degree.officialLinks?.flowcharts ?? [];

  const resources = [
    ...flowcharts,
    ...(degree.officialLinks?.plans ?? []),
  ];

  if (degree.officialLinks?.electives) {
    resources.push(degree.officialLinks.electives);
  }

  return resources;
}

function getCredential(degree: ComparableDegree) {
  return isFutureDegreeOption(degree) ? 'BS' : degree.credential;
}

function getCategory(degree: ComparableDegree) {
  return isFutureDegreeOption(degree)
    ? 'Business + Interdisciplinary'
    : degree.category;
}

function getBestFor(degree: ComparableDegree) {
  return isFutureDegreeOption(degree) ? degree.goodFit : degree.bestFor;
}

function getOverview(degree: ComparableDegree) {
  return isFutureDegreeOption(degree) ? degree.description : degree.overview;
}

function getSkills(degree: ComparableDegree) {
  return isFutureDegreeOption(degree) ? degree.focus : degree.skills;
}

function getSampleTopics(degree: ComparableDegree) {
  return isFutureDegreeOption(degree)
    ? degree.focus.split(' + ')
    : degree.sampleTopics;
}

function getCourseworkSnapshot(degree: ComparableDegree) {
  const topics = getSampleTopics(degree);

  if (topics.length === 0) {
    return 'Review the official flowchart to confirm the coursework shift.';
  }

  return `Expect more emphasis on ${topics
    .slice(0, 3)
    .join(', ')
    .toLowerCase()}.`;
}

function renderGoodFit(degree: ComparableDegree) {
  return isFutureDegreeOption(degree)
    ? <p>{degree.goodFit}</p>
    : renderList(degree.goodFit);
}

function renderSampleTopics(degree: ComparableDegree) {
  return isFutureDegreeOption(degree)
    ? renderList(degree.focus.split(' + '))
    : renderList(degree.sampleTopics);
}

function renderSwitchPath(degree: ComparableDegree) {
  const skills = splitSkillText(getSkills(degree));

  return (
    <article className="major-switch-path-card">
      <p className="degrees-eyebrow">If you move toward</p>
      <h3>{degree.name}</h3>
      <p>{getOverview(degree)}</p>
      <dl>
        <div>
          <dt>Academic focus</dt>
          <dd>{getBestFor(degree)}</dd>
        </div>
        <div>
          <dt>Coursework shift</dt>
          <dd>{getCourseworkSnapshot(degree)}</dd>
        </div>
        <div>
          <dt>Skills signal</dt>
          <dd>{skills.length ? skills.join(', ') : getSkills(degree)}</dd>
        </div>
      </dl>
      <Link to={`/bellini-student/course-overlap/${degree.slug}`}>
        Check course overlap
      </Link>
    </article>
  );
}

function renderMajorSwitchPicture(
  firstDegree: ComparableDegree,
  secondDegree: ComparableDegree,
) {
  return (
    <section
      className="major-switch-picture"
      aria-labelledby="major-switch-picture-title"
    >
      <div>
        <p className="degrees-eyebrow">Major change lens</p>
        <h2 id="major-switch-picture-title">
          What Changes If You Switch Between These Majors
        </h2>
        <p>
          Use this section to move beyond the degree names. A Bellini major
          change can shift the courses you still need, the skills your transcript
          emphasizes, the career stories you can tell, and the advising questions
          you should bring before submitting paperwork.
        </p>
      </div>

      <div className="major-switch-path-grid">
        {renderSwitchPath(firstDegree)}
        {renderSwitchPath(secondDegree)}
      </div>

      <div className="major-switch-advising-grid">
        <article>
          <h3>What may stay useful</h3>
          <p>
            Programming, math, systems, data, security, and hardware coursework
            may still support the new direction, but each course needs to be
            checked against the target major requirements.
          </p>
        </article>
        <article>
          <h3>What may change</h3>
          <p>
            The switch can change prerequisite chains, upper-level course
            sequencing, elective choices, GPA or grade checks, repeated-attempt
            review, and expected graduation timing.
          </p>
        </article>
        <article>
          <h3>What to ask advising</h3>
          <p>
            Ask which completed courses count, which requirements would still
            remain, whether any course attempts create a problem, and whether the
            new plan can still fit the approved timeline.
          </p>
        </article>
      </div>
    </section>
  );
}

function renderNextSteps(degree: ComparableDegree) {
  return isFutureDegreeOption(degree)
    ? renderList([
        'Review the available plans of study.',
        'Confirm official electives and transfer requirements with Bellini College advising.',
      ])
    : renderList(degree.nextSteps);
}

function getDegreeForComparison(slug: string | undefined) {
  return getHighSchoolFutureDegreeOptionBySlug(slug) ?? getDegreeBySlug(slug);
}

const comparisonFields: ComparisonField[] = [
  {
    label: 'Degree name',
    render: (degree) => degree.name,
  },
  {
    label: 'Credential',
    render: (degree) => getCredential(degree),
  },
  {
    label: 'Category',
    render: (degree) => getCategory(degree),
  },
  {
    label: 'Best for',
    render: (degree) => getBestFor(degree),
  },
  {
    label: 'Overview',
    render: (degree) => getOverview(degree),
  },
  {
    label: 'Career options',
    render: (degree) => renderCareerOptions(degree),
  },
  {
    label: 'Related salaries',
    render: (degree) => renderCareerSalaries(degree),
  },
  {
    label: 'Skills',
    render: (degree) => getSkills(degree),
  },
  {
    label: 'Good fit if',
    render: (degree) => renderGoodFit(degree),
  },
  {
    label: 'Sample topics',
    render: (degree) => renderSampleTopics(degree),
  },
  {
    label: 'Next steps',
    render: (degree) => renderNextSteps(degree),
  },
  {
    label: 'Official links',
    render: (degree) => {
      const resources = getOfficialResources(degree);

      if (!resources.length) {
        return 'Links coming soon';
      }

      return (
        <div className="comparison-link-list">
          {resources.map((resource) => (
            <a
              href={resource.url}
              key={`${degree.slug}-${resource.label}`}
              rel="noreferrer"
              target="_blank"
            >
              {resource.label}
            </a>
          ))}
        </div>
      );
    },
  },
];

function DegreeComparison() {
  const [searchParams] = useSearchParams();
  const sourceDashboard = searchParams.get('from');
  const isBelliniStudentSource = sourceDashboard === 'current-bellini-student';
  const degreeSourceSuffix = sourceDashboard ? `?from=${sourceDashboard}` : '';
  const firstDegree = getDegreeForComparison(
    searchParams.get('first') ?? undefined,
  );
  const secondDegree = getDegreeForComparison(
    searchParams.get('second') ?? undefined,
  );
  const comparedInterdisciplinaryMajor =
    (firstDegree && isFutureDegreeOption(firstDegree)) ||
    (secondDegree && isFutureDegreeOption(secondDegree));
  const degreeExplorerPath = comparedInterdisciplinaryMajor
    ? `/degrees/future-options${degreeSourceSuffix}`
    : `/degrees${degreeSourceSuffix}`;
  const degreeExplorerLabel = comparedInterdisciplinaryMajor
    ? 'Back to Interdisciplinary Computing Majors'
    : 'Back to Degree Explorer';

  if (!firstDegree || !secondDegree || firstDegree.slug === secondDegree.slug) {
    return (
      <main className="degrees-page">
        <section className="degree-comparison-empty">
          <p className="degrees-eyebrow">Degree Comparison</p>
          <h1>Select Two Degrees to Compare</h1>
          <p>
            Choose exactly two different degrees from the Degree Explorer to
            view a side-by-side comparison.
          </p>
          <Link to={degreeExplorerPath}>Compare Different Degrees</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="degrees-page">
      <Link className="degree-back-link" to={degreeExplorerPath}>
        {degreeExplorerLabel}
      </Link>

      <section className="degree-comparison-hero">
        <p className="degrees-eyebrow">Degree Comparison</p>
        <h1>
          Compare Degrees: {firstDegree.name} vs. {secondDegree.name}
        </h1>
      </section>

      {isBelliniStudentSource &&
        renderMajorSwitchPicture(firstDegree, secondDegree)}

      <section className="degree-comparison-table" aria-label="Degree comparison">
        <div className="comparison-row comparison-header">
          <div>Section</div>
          <div>{firstDegree.name}</div>
          <div>{secondDegree.name}</div>
        </div>

        {comparisonFields.map((field) => (
          <div className="comparison-row" key={field.label}>
            <div className="comparison-label">{field.label}</div>
            <div>{field.render(firstDegree)}</div>
            <div>{field.render(secondDegree)}</div>
          </div>
        ))}
      </section>

      <section className="degree-compare-next">
        <Link to={degreeExplorerPath}>Compare Different Degrees</Link>
      </section>
    </main>
  );
}

export default DegreeComparison;

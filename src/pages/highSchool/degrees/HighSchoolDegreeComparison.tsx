import { Link, useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Degree } from '../../../data/highSchoolDegrees';
import { getDegreeBySlug } from '../../../data/highSchoolDegrees';
import type { HighSchoolFutureDegreeOption } from '../../../data/highSchoolFutureDegreeOptions';
import { getHighSchoolFutureDegreeOptionBySlug } from '../../../data/highSchoolFutureDegreeOptions';
import '../../../styles/degrees.css';

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

function isFutureDegreeOption(
  degree: ComparableDegree,
): degree is HighSchoolFutureDegreeOption {
  return 'focus' in degree;
}

function renderCareerOptions(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return 'Career information coming soon';
  }

  if (!degree.careerOptions) {
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
    return 'Salary information coming soon';
  }

  if (!degree.careerOptions) {
    return 'Salary information coming soon';
  }

  return (
    <>
      <p className="comparison-salary-note">
        Related Tampa Bay salary references. Starting pay can be different.
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

  const resources = [
    ...(degree.officialLinks?.flowcharts ?? []),
    ...(degree.officialLinks?.plans ?? []),
  ];

  if (degree.officialLinks?.electives) {
    resources.push(degree.officialLinks.electives);
  }

  return resources;
}

function getSimpleCategory(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return degree.focus;
  }

  const simpleCategories = {
    Software: 'Coding and software',
    'AI/Data': 'AI and data',
    Cybersecurity: 'Online safety and security',
    'IT/Systems': 'Technology support and systems',
    'Business + Interdisciplinary': 'Technology and another subject',
  };

  return simpleCategories[degree.category];
}

function getBestFor(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return degree.goodFit;
  }

  return degree.bestFor;
}

function renderSkills(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return degree.focus;
  }

  return degree.skills;
}

function renderGoodFit(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return <p>{degree.goodFit}</p>;
  }

  return renderList(degree.goodFit);
}

function renderNextSteps(degree: ComparableDegree) {
  if (isFutureDegreeOption(degree)) {
    return renderList([
      'Review the available plans of study.',
      'Confirm official electives and requirements with Bellini College advising.',
    ]);
  }

  return renderList(degree.nextSteps);
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
    label: 'Main focus',
    render: (degree) => getSimpleCategory(degree),
  },
  {
    label: 'Best for',
    render: (degree) => getBestFor(degree),
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
    render: (degree) => renderSkills(degree),
  },
  {
    label: 'Good fit if',
    render: (degree) => renderGoodFit(degree),
  },
  {
    label: 'What to do next',
    render: (degree) => renderNextSteps(degree),
  },
  {
    label: 'Planning links',
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

function HighSchoolDegreeComparison() {
  const [searchParams] = useSearchParams();
  const firstDegree = getDegreeForComparison(
    searchParams.get('first') ?? undefined,
  );
  const secondDegree = getDegreeForComparison(
    searchParams.get('second') ?? undefined,
  );

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
          <Link to="/high-school/degrees">Compare Different Degrees</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="degrees-page">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="degree-comparison-hero">
        <p className="degrees-eyebrow">Degree Comparison</p>
        <h1>
          Compare Degrees: {firstDegree.name} vs. {secondDegree.name}
        </h1>
      </section>

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
        <Link to="/high-school/degrees">Compare Different Degrees</Link>
      </section>
    </main>
  );
}

export default HighSchoolDegreeComparison;

import { Link, useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Degree } from '../../data/highSchoolDegrees';
import { getDegreeBySlug } from '../../data/highSchoolDegrees';
import '../../styles/degrees.css';

type ComparisonField = {
  label: string;
  render: (degree: Degree) => ReactNode;
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

function getOfficialResources(degree: Degree) {
  const resources = [
    ...(degree.officialLinks?.flowcharts ?? []),
    ...(degree.officialLinks?.plans ?? []),
  ];

  if (degree.officialLinks?.electives) {
    resources.push(degree.officialLinks.electives);
  }

  return resources;
}

function getSimpleCategory(degree: Degree) {
  const simpleCategories = {
    Software: 'Coding and software',
    'AI/Data': 'AI and data',
    Cybersecurity: 'Online safety and security',
    'IT/Systems': 'Technology support and systems',
    'Business + Interdisciplinary': 'Technology and another subject',
  };

  return simpleCategories[degree.category];
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
    render: (degree) => degree.bestFor,
  },
  {
    label: 'Career options and salaries',
    render: (degree) =>
      degree.careerOptions
        ? renderList(degree.careerOptions)
        : 'Career information coming soon',
  },
  {
    label: 'Skills',
    render: (degree) => degree.skills,
  },
  {
    label: 'Good fit if',
    render: (degree) => renderList(degree.goodFit),
  },
  {
    label: 'What to do next',
    render: (degree) => renderList(degree.nextSteps),
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
  const firstDegree = getDegreeBySlug(searchParams.get('first') ?? undefined);
  const secondDegree = getDegreeBySlug(searchParams.get('second') ?? undefined);

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

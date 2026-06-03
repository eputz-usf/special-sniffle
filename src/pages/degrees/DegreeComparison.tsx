import { Link, useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Degree } from '../../data/degrees';
import { getDegreeBySlug } from '../../data/degrees';
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

function renderCareerOptions(degree: Degree) {
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

function renderCareerSalaries(degree: Degree) {
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

const comparisonFields: ComparisonField[] = [
  {
    label: 'Degree name',
    render: (degree) => degree.name,
  },
  {
    label: 'Credential',
    render: (degree) => degree.credential,
  },
  {
    label: 'Category',
    render: (degree) => degree.category,
  },
  {
    label: 'Best for',
    render: (degree) => degree.bestFor,
  },
  {
    label: 'Overview',
    render: (degree) => degree.overview,
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
    render: (degree) => degree.skills,
  },
  {
    label: 'Good fit if',
    render: (degree) => renderList(degree.goodFit),
  },
  {
    label: 'Sample topics',
    render: (degree) => renderList(degree.sampleTopics),
  },
  {
    label: 'Next steps',
    render: (degree) => renderList(degree.nextSteps),
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
          <Link to="/degrees">Compare Different Degrees</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="degrees-page">
      <Link className="degree-back-link" to="/degrees">
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
        <Link to="/degrees">Compare Different Degrees</Link>
      </section>
    </main>
  );
}

export default DegreeComparison;

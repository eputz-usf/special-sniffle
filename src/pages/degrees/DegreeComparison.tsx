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

  const resources = [
    ...(degree.officialLinks?.flowcharts ?? []),
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

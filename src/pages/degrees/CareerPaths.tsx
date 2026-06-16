import { Link } from 'react-router-dom';
import { degrees } from '../../data/degrees';
import '../../styles/degrees.css';

const careerDegrees = degrees.filter(
  (degree) => degree.careerOptions && degree.careerOptions.length > 0,
);

function CareerPaths() {
  return (
    <main className="degrees-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Career Paths</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/transfer-student#majors"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Choose a Major to Explore Career Outcomes</h1>
        <p>
          Select a Bellini College major to jump directly to its career outlook,
          related roles, salary context, Tampa Bay employment information, and
          professional preparation options.
        </p>
      </section>

      <section className="degree-grid career-path-degree-grid">
        {careerDegrees.map((degree) => (
          <article className="degree-card" key={degree.slug}>
            <div>
              <p className="degree-category">{degree.category}</p>
              <h2>{degree.name}</h2>
              <p>{degree.description}</p>
            </div>

            <div>
              <div className="degree-card-actions">
                <Link to={`/degrees/${degree.slug}#career-outlook`}>
                  View Career Outlook
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CareerPaths;

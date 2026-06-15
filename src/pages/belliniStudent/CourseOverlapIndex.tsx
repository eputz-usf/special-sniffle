import { Link } from 'react-router-dom';
import { belliniCourseOverlapPlans } from '../../data/belliniCourseOverlapPlans';
import '../../styles/degrees.css';

function CourseOverlapIndex() {
  return (
    <main className="degrees-page course-overlap-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Current Bellini student tool</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/current-bellini-student"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Course Overlap Planner</h1>
        <p>
          Select a Bellini major to compare its four-year plan with courses you
          have already completed. Ready checklists appear as course lists are
          added from official flowcharts or plan PDFs.
        </p>
        <div className="degrees-hero-actions">
          <Link to="/bellini-student/transcript">Review transcript upload</Link>
          <Link to="/bellini-student/major-change-guide">
            Open major change guide
          </Link>
        </div>
      </section>

      <section className="course-overlap-summary" aria-label="Planner status">
        <article>
          <strong>
            {belliniCourseOverlapPlans.filter((plan) => plan.planStatus === 'ready').length}
          </strong>
          <span>Bellini major course lists ready now</span>
        </article>
        <article>
          <strong>PDF-based</strong>
          <span>Course lists will be populated from official plans</span>
        </article>
        <article>
          <strong>Advising review</strong>
          <span>Overlap estimates still need Bellini confirmation</span>
        </article>
      </section>

      <section className="course-overlap-grid">
        {belliniCourseOverlapPlans.map((plan) => (
          <article className="course-overlap-card" key={plan.slug}>
            <div>
              <p className="degree-category">
                {plan.planStatus === 'ready' ? 'Course list ready' : 'PDF pending'}
              </p>
              <h2>{plan.name}</h2>
              <p>{plan.focus}</p>
              <small>{plan.description}</small>
            </div>
            <div className="degree-card-actions">
              <Link to={`/bellini-student/course-overlap/${plan.slug}`}>
                Open checklist
              </Link>
              {plan.sourceUrl && (
                <a href={plan.sourceUrl} target="_blank" rel="noreferrer">
                  View 4-year plan
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CourseOverlapIndex;

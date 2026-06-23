import { Link } from 'react-router-dom';
import { belliniCourseOverlapPlans } from '../../data/belliniCourseOverlapPlans';
import '../../styles/degrees.css';

const completedDegreePageSlugs = new Set([
  'computer-science',
  'computer-science-and-engineering',
  'artificial-intelligence',
  'cybersecurity',
  'information-technology',
]);

type CourseOverlapIndexProps = {
  basePath?: string;
  dashboardPath?: string;
  transcriptPath?: string;
  guidePath?: string;
  sourceDashboard?: string;
  eyebrow?: string;
  intro?: string;
};

function CourseOverlapIndex({
  basePath = '/bellini-student/course-overlap',
  dashboardPath = '/dashboard/current-bellini-student#majors',
  transcriptPath = '/bellini-student/transcript',
  guidePath = '/bellini-student/major-change-guide',
  sourceDashboard = 'current-bellini-student',
  eyebrow = 'Current Bellini student tool',
  intro = 'Select a Bellini major to compare its four-year plan with courses you have already completed. Ready checklists appear as course lists are added from official flowcharts or plan PDFs.',
}: CourseOverlapIndexProps) {
  return (
    <main className="degrees-page course-overlap-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">{eyebrow}</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to={dashboardPath}
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Course Overlap Planner</h1>
        <p>{intro}</p>
        <div className="degrees-hero-actions">
          <Link to={transcriptPath}>Review transcript upload</Link>
          <Link to={guidePath}>Open major change guide</Link>
        </div>
      </section>

      <section className="course-overlap-summary" aria-label="Planner status">
        <article>
          <strong>Advising review</strong>
          <span>Overlap estimates still need Bellini confirmation</span>
        </article>
      </section>

      <section className="course-overlap-grid">
        {belliniCourseOverlapPlans.map((plan) => (
          <article className="course-overlap-card" key={plan.slug}>
            <div>
              <h2>{plan.name}</h2>
              <p>{plan.focus}</p>
              <small>{plan.description}</small>
            </div>
            <div className="degree-card-actions">
              <Link to={`${basePath}/${plan.slug}`}>
                Open checklist
              </Link>
              {completedDegreePageSlugs.has(plan.slug) && (
                <Link
                  to={`/degrees/${plan.slug}?from=${sourceDashboard}#official-resources`}
                >
                  Flowcharts, plans, and electives
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default CourseOverlapIndex;

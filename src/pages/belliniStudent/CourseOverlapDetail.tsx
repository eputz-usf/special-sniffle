import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  belliniCourseOverlapPlans,
  getBelliniCourseOverlapPlanBySlug,
} from '../../data/belliniCourseOverlapPlans';
import '../../styles/degrees.css';

const COURSE_OVERLAP_STORAGE_KEY = 'cic_bellini_course_overlap_completed';
const completedDegreePageSlugs = new Set([
  'computer-science',
  'computer-science-and-engineering',
  'artificial-intelligence',
  'cybersecurity',
  'information-technology',
]);

type CourseOverlapDetailProps = {
  basePath?: string;
  transcriptPath?: string;
  sourceDashboard?: string;
  storageKey?: string;
  notFoundText?: string;
  intro?: string;
  advisingText?: string;
};

function loadCompletedCourseMap(storageKey: string) {
  const saved = window.localStorage.getItem(storageKey);

  if (!saved) {
    return {};
  }

  try {
    const parsed = JSON.parse(saved) as Record<string, string[]>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    window.localStorage.removeItem(storageKey);
    return {};
  }
}

function saveCompletedCourseMap(
  storageKey: string,
  courseMap: Record<string, string[]>,
) {
  window.localStorage.setItem(
    storageKey,
    JSON.stringify(courseMap),
  );
}

function CourseOverlapDetail({
  basePath = '/bellini-student/course-overlap',
  transcriptPath = '/bellini-student/transcript',
  sourceDashboard = 'current-bellini-student',
  storageKey = COURSE_OVERLAP_STORAGE_KEY,
  notFoundText = 'Choose one of the available Bellini majors to open its course overlap placeholder.',
  intro = 'Use this page to check off courses or requirement rows you have already completed after the official four-year plan has been converted into a course list.',
  advisingText = 'This tool can help organize courses before advising, but Bellini College must evaluate grades, attempts, prerequisites, excess credit hours, and the four-year timeline before a major change can be approved.',
}: CourseOverlapDetailProps) {
  const { majorSlug } = useParams();
  const plan = getBelliniCourseOverlapPlanBySlug(majorSlug);
  const [completedCourseMap, setCompletedCourseMap] = useState(
    () => loadCompletedCourseMap(storageKey),
  );
  const completedCourseIds = plan ? completedCourseMap[plan.slug] ?? [] : [];
  const completedCourseCount = completedCourseIds.length;
  const totalCourseCount = plan?.courses.length ?? 0;
  const completionPercent = totalCourseCount
    ? Math.round((completedCourseCount / totalCourseCount) * 100)
    : 0;

  if (!plan) {
    return (
      <main className="degrees-page course-overlap-page">
        <section className="degrees-hero">
          <p className="degrees-eyebrow">Course overlap planner</p>
          <h1>Major Not Found</h1>
          <p>{notFoundText}</p>
          <div className="degrees-hero-actions">
            <Link to={basePath}>View all majors</Link>
          </div>
        </section>
      </main>
    );
  }

  const activePlan = plan;
  const courseGroups = activePlan.courses.reduce<
    Array<{ category: string; courses: typeof activePlan.courses }>
  >((groups, course) => {
    const category = course.category ?? 'Other Requirements';
    const existingGroup = groups.find((group) => group.category === category);

    if (existingGroup) {
      existingGroup.courses.push(course);
    } else {
      groups.push({
        category,
        courses: [course],
      });
    }

    return groups;
  }, []);
  const completedCourseGroups = courseGroups
    .map((group) => ({
      ...group,
      courses: group.courses.filter((course) =>
        completedCourseIds.includes(course.id),
      ),
    }))
    .filter((group) => group.courses.length > 0);

  function handleToggleCourse(courseId: string) {
    const nextCourseIds = completedCourseIds.includes(courseId)
      ? completedCourseIds.filter((id) => id !== courseId)
      : [...completedCourseIds, courseId];
    const nextCourseMap = {
      ...completedCourseMap,
      [activePlan.slug]: nextCourseIds,
    };

    setCompletedCourseMap(nextCourseMap);
    saveCompletedCourseMap(storageKey, nextCourseMap);
  }

  function handlePrintCheckedCourses() {
    window.print();
  }

  return (
    <main className="degrees-page course-overlap-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Course overlap planner</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to={basePath}
          >
            Back to all majors
          </Link>
        </div>
        <h1>{activePlan.name}</h1>
        <p>{intro}</p>
        <div className="degrees-hero-actions">
          {completedDegreePageSlugs.has(activePlan.slug) && (
            <a
              href={`/degrees/${activePlan.slug}?from=${sourceDashboard}#official-resources`}
              target="_blank"
              rel="noreferrer"
            >
              Flowcharts, plans, and electives
            </a>
          )}
          <Link to={transcriptPath}>Review transcript upload</Link>
        </div>
      </section>

      <section className="course-overlap-detail-grid">
        <article className="course-overlap-progress">
          <p className="degrees-eyebrow">Overlap summary</p>
          <h2>{completionPercent}% checked off</h2>
          <p>
            {completedCourseCount} of {totalCourseCount} course or requirement rows
            marked complete.
          </p>
          <div className="course-overlap-progress-bar">
            <span style={{ width: `${completionPercent}%` }} />
          </div>
        </article>

        <article className="course-overlap-advising-note">
          <p className="degrees-eyebrow">Advising reminder</p>
          <h2>Overlap Is Not Approval</h2>
          <p>{advisingText}</p>
        </article>
      </section>

      <section className="course-overlap-checklist-section">
        <div className="course-overlap-section-heading">
          <div className="degrees-section-heading">
            <p className="degrees-eyebrow">Course checklist</p>
            <h2>Courses from the Four-Year Plan</h2>
          </div>
        </div>

        <section
          className="course-overlap-print-report"
          aria-label="Printable checked course list"
        >
          <h2>{activePlan.name} Checked Courses</h2>
          <p>
            {completedCourseCount} of {totalCourseCount} course or requirement
            rows checked off.
          </p>

          {completedCourseGroups.length > 0 ? (
            completedCourseGroups.map((group) => (
              <article key={group.category}>
                <h3>{group.category}</h3>
                <ul>
                  {group.courses.map((course) => (
                    <li key={course.id}>
                      <strong>{course.code}</strong> {course.title}
                      {course.credits ? ` (${course.credits} cr)` : ''}
                    </li>
                  ))}
                </ul>
              </article>
            ))
          ) : (
            <p>No courses have been checked off yet.</p>
          )}
        </section>

        {activePlan.courses.length > 0 ? (
          <>
            <div className="course-overlap-checklist">
              {courseGroups.map((group) => {
                const completedInGroup = group.courses.filter((course) =>
                  completedCourseIds.includes(course.id),
                ).length;

                return (
                  <article className="course-overlap-group" key={group.category}>
                    <div className="course-overlap-group-heading">
                      <div>
                        <p className="degrees-eyebrow">Requirement area</p>
                        <h3>{group.category}</h3>
                      </div>
                      <span>
                        {completedInGroup}/{group.courses.length} complete
                      </span>
                    </div>

                    <div className="course-overlap-group-list">
                      {group.courses.map((course) => {
                        const isCompleted = completedCourseIds.includes(course.id);

                        return (
                          <label
                            className={`course-overlap-row${
                              isCompleted ? ' completed' : ''
                            }`}
                            key={course.id}
                          >
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={() => handleToggleCourse(course.id)}
                            />
                            <strong>{course.code}</strong>
                            <span>{course.title}</span>
                            {course.credits ? (
                              <small>{course.credits} cr</small>
                            ) : (
                              <small aria-label="Credits not specified">TBD</small>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="course-overlap-print-actions">
              <button
                className="course-overlap-print-button"
                type="button"
                onClick={handlePrintCheckedCourses}
              >
                Print checked courses
              </button>
            </div>
          </>
        ) : (
          <article className="course-overlap-placeholder">
            <h3>Course list placeholder</h3>
            <p>
              This page is ready for the {activePlan.name} course list. Send the
              official four-year plan or flowchart PDF for this major, and the
              courses can be added here as checkable rows.
            </p>
            <div className="course-overlap-placeholder-actions">
              {activePlan.sourceUrl && (
                <a href={activePlan.sourceUrl} target="_blank" rel="noreferrer">
                  Open current source PDF
                </a>
              )}
              <Link to={basePath}>
                Choose another major
              </Link>
            </div>
          </article>
        )}
      </section>

      <section className="course-overlap-next-major">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Other placeholders</p>
          <h2>Open Another Major</h2>
        </div>
        <div className="course-overlap-chip-list">
          {belliniCourseOverlapPlans
            .filter((item) => item.slug !== activePlan.slug)
            .map((item) => (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
              >
                {item.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}

export default CourseOverlapDetail;

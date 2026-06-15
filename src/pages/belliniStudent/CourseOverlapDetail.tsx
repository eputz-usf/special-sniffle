import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  belliniCourseOverlapPlans,
  getBelliniCourseOverlapPlanBySlug,
} from '../../data/belliniCourseOverlapPlans';
import '../../styles/degrees.css';

const COURSE_OVERLAP_STORAGE_KEY = 'cic_bellini_course_overlap_completed';

function loadCompletedCourseMap() {
  const saved = window.localStorage.getItem(COURSE_OVERLAP_STORAGE_KEY);

  if (!saved) {
    return {};
  }

  try {
    const parsed = JSON.parse(saved) as Record<string, string[]>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    window.localStorage.removeItem(COURSE_OVERLAP_STORAGE_KEY);
    return {};
  }
}

function saveCompletedCourseMap(courseMap: Record<string, string[]>) {
  window.localStorage.setItem(
    COURSE_OVERLAP_STORAGE_KEY,
    JSON.stringify(courseMap),
  );
}

function CourseOverlapDetail() {
  const { majorSlug } = useParams();
  const plan = getBelliniCourseOverlapPlanBySlug(majorSlug);
  const [completedCourseMap, setCompletedCourseMap] = useState(
    loadCompletedCourseMap,
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
          <p>
            Choose one of the available Bellini majors to open its course
            overlap placeholder.
          </p>
          <div className="degrees-hero-actions">
            <Link to="/bellini-student/course-overlap">View all majors</Link>
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

  function handleToggleCourse(courseId: string) {
    const nextCourseIds = completedCourseIds.includes(courseId)
      ? completedCourseIds.filter((id) => id !== courseId)
      : [...completedCourseIds, courseId];
    const nextCourseMap = {
      ...completedCourseMap,
      [activePlan.slug]: nextCourseIds,
    };

    setCompletedCourseMap(nextCourseMap);
    saveCompletedCourseMap(nextCourseMap);
  }

  return (
    <main className="degrees-page course-overlap-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Course overlap planner</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/bellini-student/course-overlap"
          >
            Back to all majors
          </Link>
        </div>
        <h1>{activePlan.name}</h1>
        <p>
          Use this page to check off courses or requirement rows you have
          already completed after the official four-year plan has been converted
          into a course list.
        </p>
        <div className="degrees-hero-actions">
          {activePlan.sourceUrl && (
            <a href={activePlan.sourceUrl} target="_blank" rel="noreferrer">
              View official 4-year plan
            </a>
          )}
          <Link to="/bellini-student/transcript">Review transcript upload</Link>
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
          <p>
            This tool can help organize courses before advising, but Bellini
            College must evaluate grades, attempts, prerequisites, excess credit
            hours, and the four-year timeline before a major change can be
            approved.
          </p>
        </article>
      </section>

      <section className="course-overlap-checklist-section">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Course checklist</p>
          <h2>Courses from the Four-Year Plan</h2>
        </div>

        {activePlan.courses.length > 0 ? (
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
              <Link to="/bellini-student/course-overlap">
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
                to={`/bellini-student/course-overlap/${item.slug}`}
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

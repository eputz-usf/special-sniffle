import { type ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react';
import '../../styles/degrees.css';
import '../../styles/highSchoolDashboard.css';
import '../../styles/transferPlanner.css';

const TRANSFER_PLANNER_STORAGE_KEY = 'cic_transfer_planner';

type TransferPlannerState = {
  studentName: string;
  currentCollege: string;
  transferLevel: string;
  notes: string;
  questions: string;
  completedCourses: string[];
  currentCourses: string[];
  plannedCourses: string[];
};

const emptyPlanner: TransferPlannerState = {
  studentName: '',
  currentCollege: '',
  transferLevel: '',
  notes: '',
  questions: '',
  completedCourses: [''],
  currentCourses: [''],
  plannedCourses: [''],
};

const transferLevelOptions = [
  'Lower-Level Transfer',
  'Upper-Level Transfer',
  "Second Bachelor's Degree",
  'Former USF Student Returning',
  'Not sure yet',
];

function formatPlannerText(value: string, fallback: string) {
  return value.trim() || fallback;
}

function normalizeCourseList(value: unknown) {
  if (Array.isArray(value)) {
    return value.every((item) => typeof item === 'string') ? value : [''];
  }

  if (typeof value === 'string') {
    const courses = value
      .split('\n')
      .map((course) => course.trim())
      .filter(Boolean);

    return courses.length > 0 ? courses : [''];
  }

  return [''];
}

function getFilledCourses(courses: string[]) {
  return courses.map((course) => course.trim()).filter(Boolean);
}

function loadTransferPlanner(): TransferPlannerState {
  const savedPlanner = window.localStorage.getItem(TRANSFER_PLANNER_STORAGE_KEY);

  if (savedPlanner) {
    try {
      const parsedPlanner = JSON.parse(savedPlanner) as Partial<TransferPlannerState>;

      return {
        studentName: parsedPlanner.studentName ?? '',
        currentCollege: parsedPlanner.currentCollege ?? '',
        transferLevel: parsedPlanner.transferLevel ?? '',
        notes: parsedPlanner.notes ?? '',
        questions: parsedPlanner.questions ?? '',
        completedCourses: normalizeCourseList(parsedPlanner.completedCourses),
        currentCourses: normalizeCourseList(parsedPlanner.currentCourses),
        plannedCourses: normalizeCourseList(parsedPlanner.plannedCourses),
      };
    } catch {
      window.localStorage.removeItem(TRANSFER_PLANNER_STORAGE_KEY);
    }
  }

  return emptyPlanner;
}

function TransferPlanner() {
  const [planner, setPlanner] = useState(loadTransferPlanner);

  function handlePlannerChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setPlanner((currentPlanner) => ({
      ...currentPlanner,
      [name]: value,
    }));
  }

  function handleResetPlanner() {
    const confirmedReset = window.confirm(
      'Are you sure you want to reset this transfer planning summary? This will delete the saved planner details in this browser.',
    );

    if (!confirmedReset) {
      return;
    }

    setPlanner(emptyPlanner);
    window.localStorage.setItem(
      TRANSFER_PLANNER_STORAGE_KEY,
      JSON.stringify(emptyPlanner),
    );
  }

  function handleCourseChange(
    courseGroup: 'completedCourses' | 'currentCourses' | 'plannedCourses',
    courseIndex: number,
    value: string,
  ) {
    setPlanner((currentPlanner) => ({
      ...currentPlanner,
      [courseGroup]: currentPlanner[courseGroup].map((course, index) =>
        index === courseIndex ? value : course,
      ),
    }));
  }

  function handleAddCourse(
    courseGroup: 'completedCourses' | 'currentCourses' | 'plannedCourses',
  ) {
    setPlanner((currentPlanner) => ({
      ...currentPlanner,
      [courseGroup]: [...currentPlanner[courseGroup], ''],
    }));
  }

  function handleRemoveCourse(
    courseGroup: 'completedCourses' | 'currentCourses' | 'plannedCourses',
    courseIndex: number,
  ) {
    const confirmedDelete = window.confirm(
      'Are you sure you want to delete this course?',
    );

    if (!confirmedDelete) {
      return;
    }

    setPlanner((currentPlanner) => {
      const nextCourses = currentPlanner[courseGroup].filter(
        (_, index) => index !== courseIndex,
      );

      return {
        ...currentPlanner,
        [courseGroup]: nextCourses.length > 0 ? nextCourses : [''],
      };
    });
  }

  function handlePrintPlanner() {
    window.print();
  }

  useEffect(() => {
    window.localStorage.setItem(
      TRANSFER_PLANNER_STORAGE_KEY,
      JSON.stringify(planner),
    );
  }, [planner]);

  const hasPlannerContent =
    planner.studentName.trim() ||
    planner.currentCollege.trim() ||
    planner.transferLevel.trim() ||
    planner.notes.trim() ||
    planner.questions.trim() ||
    getFilledCourses(planner.completedCourses).length > 0 ||
    getFilledCourses(planner.currentCourses).length > 0 ||
    getFilledCourses(planner.plannedCourses).length > 0;

  const courseSections = [
    {
      key: 'completedCourses',
      label: 'Completed courses',
      placeholder: 'Example: COP 1000 - Intro to Programming',
    },
    {
      key: 'currentCourses',
      label: 'Current courses',
      placeholder: 'Example: MAC 2311 - Calculus I',
    },
    {
      key: 'plannedCourses',
      label: 'Courses planned before transferring',
      placeholder: 'Example: STA 2023 - Introductory Statistics',
    },
  ] as const;

  return (
    <main className="degrees-page transition-planner-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Transfer planning summary</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/transfer-student"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Transfer Planning Summary</h1>
        <p>
          Save transfer details, advising questions, notes, and course lists in
          one local summary. Use print to export it as a PDF.
        </p>
      </section>

      <section className="high-school-planner transition-planner-print-area">
        <div className="transition-planner-shell">
          <form className="transition-planner-editor">
            <div className="transition-planner-card">
              <div className="transition-planner-card-heading">
                <FileText size={24} aria-hidden="true" />
                <div>
                  <h2>Build your transfer plan</h2>
                  <p>
                    Saved only in this browser. Print or save as PDF when you
                    want a copy for advising or your own records.
                  </p>
                </div>
              </div>

              <label className="transition-planner-field">
                <span>Name or initials</span>
                <input
                  name="studentName"
                  type="text"
                  value={planner.studentName}
                  onChange={handlePlannerChange}
                  placeholder="Optional"
                />
              </label>

              <label className="transition-planner-field">
                <span>Current college or institution</span>
                <input
                  name="currentCollege"
                  type="text"
                  value={planner.currentCollege}
                  onChange={handlePlannerChange}
                  placeholder="Example: Hillsborough Community College"
                />
              </label>

              <label className="transition-planner-field">
                <span>Transfer level</span>
                <select
                  name="transferLevel"
                  value={planner.transferLevel}
                  onChange={handlePlannerChange}
                >
                  <option value="">Select transfer level</option>
                  {transferLevelOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="transition-planner-field">
                <span>Notes</span>
                <textarea
                  name="notes"
                  value={planner.notes}
                  onChange={handlePlannerChange}
                  placeholder="Add notes from degree pages, transfer research, or conversations with admissions or advising."
                  rows={4}
                />
              </label>

              <label className="transition-planner-field">
                <span>Questions I want to ask</span>
                <textarea
                  name="questions"
                  value={planner.questions}
                  onChange={handlePlannerChange}
                  placeholder="Example: Which credits apply to my major? What courses should I take before transferring?"
                  rows={4}
                />
              </label>

              <div className="transition-planner-actions">
                <button type="button" onClick={handlePrintPlanner}>
                  <Printer size={18} aria-hidden="true" />
                  Print / Save PDF
                </button>
                <button type="button" className="secondary" onClick={handleResetPlanner}>
                  <RotateCcw size={18} aria-hidden="true" />
                  Reset
                </button>
                <span>
                  <Save size={16} aria-hidden="true" />
                  Autosaved locally
                </span>
              </div>
            </div>

            <div className="transition-planner-card">
              <div className="transition-planner-card-heading">
                <FileText size={24} aria-hidden="true" />
                <div>
                  <h2>Course planning</h2>
                  <p>
                    List completed courses, current courses, and courses you
                    plan to take before transferring.
                  </p>
                </div>
              </div>

              {courseSections.map((section) => (
                <section className="transfer-course-section" key={section.key}>
                  <div className="transfer-course-section-heading">
                    <h3>{section.label}</h3>
                    <button
                      type="button"
                      onClick={() => handleAddCourse(section.key)}
                    >
                      <Plus size={18} aria-hidden="true" />
                      Add course
                    </button>
                  </div>

                  <div className="transfer-course-input-list">
                    {planner[section.key].map((course, index) => (
                      <div
                        className="transfer-course-input-row"
                        key={`${section.key}-${index}`}
                      >
                        <label className="transition-planner-field">
                          <span>
                            {section.label} {index + 1}
                          </span>
                          <input
                            type="text"
                            value={course}
                            onChange={(event) =>
                              handleCourseChange(
                                section.key,
                                index,
                                event.target.value,
                              )
                            }
                            placeholder={section.placeholder}
                          />
                        </label>
                        <button
                          aria-label={`Remove ${section.label.toLowerCase()} ${index + 1}`}
                          className="transfer-course-delete-button"
                          data-tooltip="Remove course"
                          title="Remove course"
                          type="button"
                          onClick={() => handleRemoveCourse(section.key, index)}
                        >
                          <Trash2 size={22} strokeWidth={2.75} aria-hidden="true" />
                          <span className="transfer-course-delete-tooltip">
                            Remove course
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </form>

          <article
            className="transition-planner-report"
            aria-labelledby="transfer-planner-report-title"
          >
            <p className="transition-report-kicker">Printable summary</p>
            <h2 id="transfer-planner-report-title">Transfer Planning Summary</h2>
            <p className="transition-report-date">
              Generated {new Date().toLocaleDateString()}
            </p>

            {hasPlannerContent ? (
              <>
                <section>
                  <h3>Student Information</h3>
                  <p>{formatPlannerText(planner.studentName, 'Name not provided')}</p>
                  <p>{formatPlannerText(planner.currentCollege, 'College not provided')}</p>
                  <p>{formatPlannerText(planner.transferLevel, 'Transfer level not selected')}</p>
                </section>

                <section>
                  <h3>Notes</h3>
                  <p className="transition-planner-prewrap">
                    {formatPlannerText(planner.notes, 'No notes added yet.')}
                  </p>
                </section>

                <section>
                  <h3>Questions to Ask</h3>
                  <p className="transition-planner-prewrap">
                    {formatPlannerText(planner.questions, 'No questions added yet.')}
                  </p>
                </section>

                <section>
                  <h3>Completed Courses</h3>
                  {getFilledCourses(planner.completedCourses).length > 0 ? (
                    <ul>
                      {getFilledCourses(planner.completedCourses).map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No completed courses listed yet.</p>
                  )}
                </section>

                <section>
                  <h3>Current Courses</h3>
                  {getFilledCourses(planner.currentCourses).length > 0 ? (
                    <ul>
                      {getFilledCourses(planner.currentCourses).map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No current courses listed yet.</p>
                  )}
                </section>

                <section>
                  <h3>Planned Courses Before Transfer</h3>
                  {getFilledCourses(planner.plannedCourses).length > 0 ? (
                    <ul>
                      {getFilledCourses(planner.plannedCourses).map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No planned courses listed yet.</p>
                  )}
                </section>
              </>
            ) : (
              <p className="transition-planner-empty">
                Add details on the left to build a summary you can print.
              </p>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}

export default TransferPlanner;

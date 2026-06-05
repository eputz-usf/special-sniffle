import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  FileText,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Trash2,
} from 'lucide-react';
import { loadTransferQuizResult } from './quiz/transferQuizSession';
import {
  loadTransferPlannerMajors,
  removeTransferPlannerMajor,
} from '../../utils/transferPlannerMajors';
import '../../styles/degrees.css';
import '../../styles/highSchoolDashboard.css';
import '../../styles/transferPlanner.css';

const TRANSFER_PLANNER_STORAGE_KEY = 'cic_transfer_planner';

type TransferPlannerState = {
  studentName: string;
  currentCollege: string;
  yearStarted: string;
  transferLevel: string;
  selectedRecommendations: string[];
  notes: string;
  questions: string;
  completedCourses: string[];
  currentCourses: string[];
  plannedCourses: string[];
};

type CourseGroup = 'completedCourses' | 'currentCourses' | 'plannedCourses';

type ConfirmationDialog =
  | {
      action: 'reset';
      title: string;
      message: string;
      confirmLabel: string;
    }
  | {
      action: 'remove-major';
      slug: string;
      name: string;
      title: string;
      message: string;
      confirmLabel: string;
    }
  | {
      action: 'remove-course';
      courseGroup: CourseGroup;
      courseIndex: number;
      title: string;
      message: string;
      confirmLabel: string;
    };

const emptyPlanner: TransferPlannerState = {
  studentName: '',
  currentCollege: '',
  yearStarted: '',
  transferLevel: '',
  selectedRecommendations: [],
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
        yearStarted: parsedPlanner.yearStarted ?? '',
        transferLevel: parsedPlanner.transferLevel ?? '',
        selectedRecommendations: Array.isArray(parsedPlanner.selectedRecommendations)
          ? parsedPlanner.selectedRecommendations
          : [],
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
  const [quizResult] = useState(() => loadTransferQuizResult());
  const quizRecommendations = useMemo(
    () => quizResult?.recommendedDegrees.slice(0, 3) ?? [],
    [quizResult],
  );
  const [planner, setPlanner] = useState(loadTransferPlanner);
  const [consideringMajors, setConsideringMajors] = useState(() =>
    loadTransferPlannerMajors(),
  );
  const [confirmationDialog, setConfirmationDialog] =
    useState<ConfirmationDialog | null>(null);

  useEffect(() => {
    if (quizRecommendations.length === 0 || planner.selectedRecommendations.length > 0) {
      return;
    }

    setPlanner((currentPlanner) => ({
      ...currentPlanner,
      selectedRecommendations: quizRecommendations,
    }));
  }, [planner.selectedRecommendations.length, quizRecommendations]);

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
    setConfirmationDialog({
      action: 'reset',
      title: 'Reset transfer planner?',
      message:
        'This will clear your saved transfer planning summary in this browser.',
      confirmLabel: 'Reset Planner',
    });
  }

  function resetPlanner() {
    setPlanner(emptyPlanner);
    window.localStorage.setItem(
      TRANSFER_PLANNER_STORAGE_KEY,
      JSON.stringify(emptyPlanner),
    );
  }

  function handleRemoveConsideringMajor(slug: string, name: string) {
    setConfirmationDialog({
      action: 'remove-major',
      slug,
      name,
      title: 'Remove this major?',
      message: `${name} will be removed from your planner.`,
      confirmLabel: 'Remove Major',
    });
  }

  function handleRecommendationToggle(recommendation: string) {
    setPlanner((currentPlanner) => {
      const isSelected =
        currentPlanner.selectedRecommendations.includes(recommendation);

      return {
        ...currentPlanner,
        selectedRecommendations: isSelected
          ? currentPlanner.selectedRecommendations.filter(
              (item) => item !== recommendation,
            )
          : [...currentPlanner.selectedRecommendations, recommendation],
      };
    });
  }

  function handleCourseChange(
    courseGroup: CourseGroup,
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
    courseGroup: CourseGroup,
  ) {
    setPlanner((currentPlanner) => ({
      ...currentPlanner,
      [courseGroup]: [...currentPlanner[courseGroup], ''],
    }));
  }

  function handleRemoveCourse(
    courseGroup: CourseGroup,
    courseIndex: number,
  ) {
    setConfirmationDialog({
      action: 'remove-course',
      courseGroup,
      courseIndex,
      title: 'Delete this course?',
      message: 'This course will be removed from your transfer planner.',
      confirmLabel: 'Delete Course',
    });
  }

  function removeCourse(courseGroup: CourseGroup, courseIndex: number) {
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

  function handleCancelConfirmation() {
    setConfirmationDialog(null);
  }

  function handleConfirmAction() {
    if (!confirmationDialog) {
      return;
    }

    if (confirmationDialog.action === 'reset') {
      resetPlanner();
    }

    if (confirmationDialog.action === 'remove-major') {
      setConsideringMajors(removeTransferPlannerMajor(confirmationDialog.slug));
    }

    if (confirmationDialog.action === 'remove-course') {
      removeCourse(
        confirmationDialog.courseGroup,
        confirmationDialog.courseIndex,
      );
    }

    setConfirmationDialog(null);
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
    planner.yearStarted.trim() ||
    planner.transferLevel.trim() ||
    consideringMajors.length > 0 ||
    planner.selectedRecommendations.length > 0 ||
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
                <span>Year started</span>
                <input
                  name="yearStarted"
                  type="text"
                  value={planner.yearStarted}
                  onChange={handlePlannerChange}
                  placeholder="Example: 2024"
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

              <section className="transition-planner-major-section">
                <div className="transition-planner-field-label">
                  Majors I am currently considering
                </div>
                {consideringMajors.length > 0 ? (
                  <ul className="transition-planner-major-list">
                    {consideringMajors.map((major) => (
                      <li key={major.slug}>
                        <span>{major.name}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveConsideringMajor(major.slug, major.name)
                          }
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="transition-planner-major-empty">
                    <p>
                      Add majors from the degree explorer to keep them in this
                      plan.
                    </p>
                    <Link to="/degrees">Browse degrees</Link>
                  </div>
                )}
              </section>

              <fieldset className="transition-planner-fieldset">
                <legend>Quiz recommendations to include</legend>
                {quizRecommendations.length > 0 ? (
                  quizRecommendations.map((recommendation) => (
                    <label
                      className="transition-planner-checkbox"
                      key={recommendation}
                    >
                      <input
                        type="checkbox"
                        checked={planner.selectedRecommendations.includes(
                          recommendation,
                        )}
                        onChange={() => handleRecommendationToggle(recommendation)}
                      />
                      <span className="transition-planner-recommendation-label">
                        {recommendation}
                        <small>
                          {quizResult?.matchPercentages[recommendation] ?? 0}%
                          match
                        </small>
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="transition-planner-empty">
                    Take the transfer quiz first to pull recommendations into
                    this plan.
                  </p>
                )}
              </fieldset>

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

              <div className="transfer-course-evaluation-link">
                <a
                  href="https://main.d15lv3xo04q0ui.amplifyapp.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  View course evaluations
                </a>
              </div>
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
                  <p>{formatPlannerText(planner.yearStarted, 'Year started not provided')}</p>
                  <p>{formatPlannerText(planner.transferLevel, 'Transfer level not selected')}</p>
                </section>

                <section>
                  <h3>Majors I Am Currently Considering</h3>
                  {consideringMajors.length > 0 ? (
                    <ul>
                      {consideringMajors.map((major) => (
                        <li key={major.slug}>{major.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No saved majors yet.</p>
                  )}
                  {planner.selectedRecommendations.length > 0 && (
                    <div className="transfer-report-recommendations">
                      <h3>Quiz Recommendations Included</h3>
                      <ul>
                        {planner.selectedRecommendations.map((recommendation) => (
                          <li key={recommendation}>
                            {recommendation}
                            <span className="transition-planner-match-badge">
                              {quizResult?.matchPercentages[recommendation] ?? 0}%
                              match
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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

      {confirmationDialog && (
        <div
          className="transition-confirmation-overlay"
          role="presentation"
          onClick={handleCancelConfirmation}
        >
          <section
            aria-labelledby="transfer-confirmation-title"
            aria-modal="true"
            className="transition-confirmation-dialog"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="transition-confirmation-icon">
              <AlertTriangle size={26} aria-hidden="true" />
            </div>
            <div>
              <p className="dashboard-eyebrow">Confirm change</p>
              <h2 id="transfer-confirmation-title">
                {confirmationDialog.title}
              </h2>
              <p>{confirmationDialog.message}</p>
            </div>
            <div className="transition-confirmation-actions">
              <button type="button" onClick={handleCancelConfirmation}>
                Cancel
              </button>
              <button
                className="danger"
                type="button"
                onClick={handleConfirmAction}
              >
                {confirmationDialog.confirmLabel}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default TransferPlanner;

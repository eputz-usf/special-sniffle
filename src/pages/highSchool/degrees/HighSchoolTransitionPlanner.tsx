import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Printer,
  RotateCcw,
  Save,
} from 'lucide-react';
import {
  getOrCreatePublicQuizSession,
  loadPublicQuizResult,
} from '../../../utils/publicQuizSession';
import {
  loadPlannerMajors,
  removePlannerMajor,
  savePlannerMajors,
} from '../../../utils/transitionPlannerMajors';
import {
  loadRemoteTransitionPlanner,
  upsertRemoteTransitionPlanner,
} from '../../../utils/transitionPlannerSupabase';
import '../../../styles/degrees.css';
import '../../../styles/highSchoolDashboard.css';

const TRANSITION_PLANNER_STORAGE_KEY = 'cic_high_school_transition_planner';

type TransitionPlannerState = {
  studentName: string;
  selectedRecommendations: string[];
  goals: string;
  questions: string;
  notes: string;
  nextSteps: string;
};

const emptyPlanner: TransitionPlannerState = {
  studentName: '',
  selectedRecommendations: [],
  goals: '',
  questions: '',
  notes: '',
  nextSteps: '',
};

function loadTransitionPlanner(
  quizRecommendations: string[],
): TransitionPlannerState {
  const savedPlanner = window.localStorage.getItem(TRANSITION_PLANNER_STORAGE_KEY);

  if (savedPlanner) {
    try {
      const parsedPlanner = JSON.parse(savedPlanner) as Partial<TransitionPlannerState>;

      return {
        studentName: parsedPlanner.studentName ?? '',
        selectedRecommendations: Array.isArray(parsedPlanner.selectedRecommendations)
          ? parsedPlanner.selectedRecommendations
          : quizRecommendations,
        goals: parsedPlanner.goals ?? '',
        questions: parsedPlanner.questions ?? '',
        notes: parsedPlanner.notes ?? '',
        nextSteps: parsedPlanner.nextSteps ?? '',
      };
    } catch {
      window.localStorage.removeItem(TRANSITION_PLANNER_STORAGE_KEY);
    }
  }

  return {
    ...emptyPlanner,
    selectedRecommendations: quizRecommendations,
  };
}

function HighSchoolTransitionPlanner() {
  const [plannerSession] = useState(() => getOrCreatePublicQuizSession());
  const [quizResult] = useState(() => loadPublicQuizResult());
  const quizRecommendations = useMemo(
    () => quizResult?.recommendedDegrees.slice(0, 3) ?? [],
    [quizResult],
  );
  const [planner, setPlanner] = useState(() =>
    loadTransitionPlanner(quizRecommendations),
  );
  const [consideringMajors, setConsideringMajors] = useState(() =>
    loadPlannerMajors(),
  );
  const [hasLoadedRemotePlan, setHasLoadedRemotePlan] = useState(false);
  const [plannerSaveStatus, setPlannerSaveStatus] = useState<
    'idle' | 'saved' | 'local-only' | 'error'
  >('idle');

  function handlePlannerChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setPlanner((currentPlanner) => ({
      ...currentPlanner,
      [name]: value,
    }));
  }

  function handleRecommendationToggle(recommendation: string) {
    setPlanner((currentPlanner) => {
      const isSelected = currentPlanner.selectedRecommendations.includes(recommendation);

      return {
        ...currentPlanner,
        selectedRecommendations: isSelected
          ? currentPlanner.selectedRecommendations.filter((item) => item !== recommendation)
          : [...currentPlanner.selectedRecommendations, recommendation],
      };
    });
  }

  function handleResetPlanner() {
    const resetPlanner = {
      ...emptyPlanner,
      selectedRecommendations: quizRecommendations,
    };

    setPlanner(resetPlanner);
    window.localStorage.setItem(
      TRANSITION_PLANNER_STORAGE_KEY,
      JSON.stringify(resetPlanner),
    );
  }

  function handlePrintPlanner() {
    window.print();
  }

  function handleRemoveConsideringMajor(slug: string) {
    setConsideringMajors(removePlannerMajor(slug));
  }

  useEffect(() => {
    window.localStorage.setItem(
      TRANSITION_PLANNER_STORAGE_KEY,
      JSON.stringify(planner),
    );
  }, [planner]);

  useEffect(() => {
    let isMounted = true;

    async function hydrateRemotePlanner() {
      try {
        const remotePlan = await loadRemoteTransitionPlanner(plannerSession.sessionId);

        if (!isMounted) {
          return;
        }

        if (remotePlan) {
          setPlanner({
            studentName: remotePlan.planner.studentName ?? '',
            selectedRecommendations: Array.isArray(
              remotePlan.planner.selectedRecommendations,
            )
              ? remotePlan.planner.selectedRecommendations
              : quizRecommendations,
            goals: remotePlan.planner.goals ?? '',
            questions: remotePlan.planner.questions ?? '',
            notes: remotePlan.planner.notes ?? '',
            nextSteps: remotePlan.planner.nextSteps ?? '',
          });
          setConsideringMajors(remotePlan.majors);
          savePlannerMajors(remotePlan.majors);
          setPlannerSaveStatus('saved');
        }
      } catch {
        if (isMounted) {
          setPlannerSaveStatus('error');
        }
      } finally {
        if (isMounted) {
          setHasLoadedRemotePlan(true);
        }
      }
    }

    hydrateRemotePlanner();

    return () => {
      isMounted = false;
    };
  }, [plannerSession.sessionId, quizRecommendations]);

  useEffect(() => {
    if (!hasLoadedRemotePlan) {
      return;
    }

    let isMounted = true;

    async function saveRemotePlanner() {
      try {
        const status = await upsertRemoteTransitionPlanner({
          sessionId: plannerSession.sessionId,
          planner,
          majors: consideringMajors,
        });

        if (isMounted) {
          setPlannerSaveStatus(status === 'saved' ? 'saved' : 'local-only');
        }
      } catch {
        if (isMounted) {
          setPlannerSaveStatus('error');
        }
      }
    }

    saveRemotePlanner();

    return () => {
      isMounted = false;
    };
  }, [
    consideringMajors,
    hasLoadedRemotePlan,
    planner,
    plannerSession.sessionId,
  ]);

  const hasPlannerContent =
    planner.studentName.trim() ||
    consideringMajors.length > 0 ||
    planner.selectedRecommendations.length > 0 ||
    planner.goals.trim() ||
    planner.questions.trim() ||
    planner.notes.trim() ||
    planner.nextSteps.trim();

  return (
    <main className="degrees-page transition-planner-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Admissions and transition planner</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/prospective-student"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Plan you transition!</h1>
        <p>
          Save quiz recommendations, program interests, questions, notes, and
          next steps in one local summary. Use print to export it as a PDF.
        </p>
      </section>

      <section className="high-school-planner transition-planner-print-area">
        <div className="transition-planner-shell">
          <form className="transition-planner-editor">
            <div className="transition-planner-card">
              <div className="transition-planner-card-heading">
                <FileText size={24} aria-hidden="true" />
                <div>
                  <h2>Build your transition plan</h2>
                  <p>
                    Saved only in this browser. Print or save as PDF when you
                    want a copy to keep.
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
                          onClick={() => handleRemoveConsideringMajor(major.slug)}
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
                    <Link to="/high-school/degrees">Browse degrees</Link>
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
                        checked={planner.selectedRecommendations.includes(recommendation)}
                        onChange={() => handleRecommendationToggle(recommendation)}
                      />
                      <span>{recommendation}</span>
                    </label>
                  ))
                ) : (
                  <p className="transition-planner-empty">
                    Take the intake quiz first to pull recommendations into this
                    plan.
                  </p>
                )}
              </fieldset>

              <label className="transition-planner-field">
                <span>My goals or program interests</span>
                <textarea
                  name="goals"
                  value={planner.goals}
                  onChange={handlePlannerChange}
                  placeholder="Example: I want to compare Computer Science and Information Technology."
                  rows={4}
                />
              </label>

              <label className="transition-planner-field">
                <span>Questions I want to ask</span>
                <textarea
                  name="questions"
                  value={planner.questions}
                  onChange={handlePlannerChange}
                  placeholder="Example: What math should I take senior year? What support services are available?"
                  rows={4}
                />
              </label>

              <label className="transition-planner-field">
                <span>Personal notes</span>
                <textarea
                  name="notes"
                  value={planner.notes}
                  onChange={handlePlannerChange}
                  placeholder="Add thoughts from degree pages, family conversations, or counselor meetings."
                  rows={4}
                />
              </label>

              <label className="transition-planner-field">
                <span>Next steps I want to take</span>
                <textarea
                  name="nextSteps"
                  value={planner.nextSteps}
                  onChange={handlePlannerChange}
                  placeholder="Example: 1. Review admissions dates. 2. Email counselor. 3. Visit degree pages."
                  rows={5}
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
                  {plannerSaveStatus === 'saved'
                    ? 'Autosaved to Supabase'
                    : plannerSaveStatus === 'error'
                      ? 'Saved locally - Supabase unavailable'
                      : plannerSaveStatus === 'local-only'
                        ? 'Autosaved locally'
                        : 'Preparing autosave'}
                </span>
              </div>
            </div>
          </form>

          <article
            className="transition-planner-report"
            aria-labelledby="transition-report-title"
          >
            <p className="transition-report-kicker">Printable summary</p>
            <h2 id="transition-report-title">Transition Plan Summary</h2>
            <p className="transition-report-date">
              Generated {new Date().toLocaleDateString()}
            </p>

            {hasPlannerContent ? (
              <>
                <section>
                  <h3>Student</h3>
                  <p>{planner.studentName.trim() || 'Name not provided'}</p>
                </section>

                <section>
                  <h3>Majors I am currently considering</h3>
                  {consideringMajors.length > 0 ? (
                    <ul>
                      {consideringMajors.map((major) => (
                        <li key={major.slug}>{major.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No majors added yet.</p>
                  )}
                </section>

                <section>
                  <h3>Quiz recommendation</h3>
                  {quizResult ? (
                    <>
                      <p>
                        Top match: <strong>{quizResult.topMatch}</strong>
                      </p>
                      {planner.selectedRecommendations.length > 0 && (
                        <ul>
                          {planner.selectedRecommendations.map((recommendation) => (
                            <li key={recommendation}>{recommendation}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <p>No quiz result added yet.</p>
                  )}
                </section>

                <section>
                  <h3>Goals or program interests</h3>
                  <p>{planner.goals.trim() || 'No goals added yet.'}</p>
                </section>

                <section>
                  <h3>Questions to ask</h3>
                  <p>{planner.questions.trim() || 'No questions added yet.'}</p>
                </section>

                <section>
                  <h3>Personal notes</h3>
                  <p>{planner.notes.trim() || 'No notes added yet.'}</p>
                </section>

                <section>
                  <h3>Next steps</h3>
                  <p>{planner.nextSteps.trim() || 'No next steps added yet.'}</p>
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

export default HighSchoolTransitionPlanner;

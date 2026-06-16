import { Link, useNavigate } from 'react-router-dom';
import {
  loadTransferQuizProgress,
  loadTransferQuizResult,
  resetTransferQuizSession,
  type SavedTransferQuizResult,
} from './transferQuizSession';
import '../../../styles/quiz.css';

const courseEvaluationLink = '#';

type TransferNextStepAction = {
  id: string;
  triggerIds: string[];
  label: string;
  reason: string;
  tone?: 'danger';
} & (
  | {
      to: string;
      href?: never;
    }
  | {
      href: string;
      to?: never;
    }
);

const transferNextStepActions: TransferNextStepAction[] = [
  {
    id: 'transfer-guide',
    triggerIds: [
      'help-official-resources',
      'help-lower-division-courses',
      'state-know-major',
    ],
    label: 'Open transfer planning guide',
    to: '/transfer/readiness-guide',
    reason:
      'because you selected official resources, lower-division courses, or help planning a transfer path.',
  },
  {
    id: 'degree-comparison',
    triggerIds: ['state-compare-majors'],
    label: 'Go to degree comparison',
    to: '/degrees',
    reason:
      'because you said you have a few majors in mind and want side-by-side comparison.',
  },
  {
    id: 'degree-info',
    triggerIds: ['state-computing-unsure-degree'],
    label: 'Explore degree information',
    to: '/degrees',
    reason:
      'because you said you like computing but are unsure which degree fits.',
  },
  {
    id: 'course-evaluation',
    triggerIds: ['state-credit-worry'],
    label: 'View Course Evaluation',
    href: courseEvaluationLink,
    reason:
      'because you said you are mainly worried about how your credits will apply.',
    tone: 'danger',
  },
  {
    id: 'transfer-planner',
    triggerIds: ['help-transfer-summary', 'help-advising-questions'],
    label: 'Open transfer planner',
    to: '/transfer/planner',
    reason:
      'because you selected a transfer planning summary or advising questions.',
  },
];

function getVisibleRecommendedDegrees(quizResult: SavedTransferQuizResult) {
  const visibleRecommendations = quizResult.recommendedDegrees.filter(
    (degree) => (quizResult.matchPercentages[degree] ?? 0) > 0,
  );

  return visibleRecommendations.length > 0
    ? visibleRecommendations
    : quizResult.recommendedDegrees.slice(0, 1);
}

function TransferQuizResults() {
  const navigate = useNavigate();
  const quizResult = loadTransferQuizResult();
  const savedProgress = loadTransferQuizProgress();
  const currentStatementAnswers = savedProgress.answersByQuestion['current-statement'];
  const selectedCurrentStatementIds = Array.isArray(currentStatementAnswers)
    ? currentStatementAnswers
    : currentStatementAnswers
      ? [currentStatementAnswers]
      : [];
  const selectedNextStepActions = transferNextStepActions.filter((action) =>
    action.triggerIds.some((answerId) =>
      selectedCurrentStatementIds.includes(answerId),
    ),
  );
  const visibleRecommendedDegrees = quizResult
    ? getVisibleRecommendedDegrees(quizResult)
    : [];
  const visibleTopMatch = visibleRecommendedDegrees[0] ?? quizResult?.topMatch;
  const visibleOtherRecommendations = visibleRecommendedDegrees.slice(1, 3);

  function handleStartOver() {
    resetTransferQuizSession();
    navigate('/transfer/quiz');
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-results-title">
        <Link
          className="quiz-back-link"
          to="/dashboard/transfer-student#intake-quiz"
        >
          Back to dashboard
        </Link>

        <article className="quiz-question-card quiz-complete-card quiz-results-card">
          {quizResult ? (
            <>
              <p className="quiz-question-eyebrow">Recommended starting points</p>
              <h1 id="quiz-results-title">
                {visibleTopMatch} looks like your strongest match.
              </h1>
              <p className="quiz-helper-text">
                These recommendations are for transfer planning only. Use them
                to decide which degree pages to review and which credit,
                prerequisite, and timeline questions to ask advising.
              </p>
              <section className="quiz-top-result">
                <p>Top recommendation</p>
                <h2>{visibleTopMatch}</h2>
                <span>
                  {quizResult.matchPercentages[visibleTopMatch] ?? 0}% match
                </span>
              </section>
              {quizResult.explanations[visibleTopMatch] && (
                <section className="quiz-top-result-explanation">
                  <h2>Why this may be a good fit</h2>
                  <p>{quizResult.explanations[visibleTopMatch]}</p>
                  {quizResult.signalsByMajor[visibleTopMatch]?.length > 0 && (
                    <>
                      <h3>Key signals from your quiz</h3>
                      <ul>
                        {quizResult.signalsByMajor[visibleTopMatch]
                          .slice(0, 3)
                          .map((signal) => (
                            <li key={signal.answerId}>{signal.label}</li>
                          ))}
                      </ul>
                    </>
                  )}
                </section>
              )}
              <div className="quiz-results-list">
                <h2>Other programs to explore</h2>
                {visibleOtherRecommendations.map((degree, index) => (
                  <article key={degree}>
                    <strong>
                      {index + 2}. {degree}
                    </strong>
                    <span>
                      {quizResult.matchPercentages[degree] ?? 0}% match
                    </span>
                    {quizResult.explanations[degree] && (
                      <small>{quizResult.explanations[degree]}</small>
                    )}
                  </article>
                ))}
              </div>
              <p className="quiz-save-note">
                {quizResult.saveStatus === 'saved'
                  ? 'Your anonymous transfer quiz answers and recommendation were saved.'
                  : 'Supabase is not configured yet, so this result is only shown locally.'}
              </p>
              {selectedNextStepActions.length > 0 && (
                <section className="quiz-next-step-recommendations">
                  <h2>Suggested next steps</h2>
                  <div className="quiz-next-step-list">
                    {selectedNextStepActions.map((action) => (
                      <article key={action.id}>
                        <p>Suggested {action.reason}</p>
                        {action.to ? (
                          <Link
                            className={
                              action.tone === 'danger'
                                ? 'quiz-next-step-button danger'
                                : 'quiz-next-step-button'
                            }
                            to={action.to}
                          >
                            {action.label}
                          </Link>
                        ) : (
                          <a
                            className={
                              action.tone === 'danger'
                                ? 'quiz-next-step-button danger'
                                : 'quiz-next-step-button'
                            }
                            href={action.href}
                          >
                            {action.label}
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}
              <div className="quiz-results-actions">
                <Link to="/degrees">Explore degrees</Link>
                <Link to="/transfer/quiz">Review or change answers</Link>
                <button type="button" onClick={handleStartOver}>
                  Start over
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="quiz-question-eyebrow">No result yet</p>
              <h1 id="quiz-results-title">Finish the intake form first.</h1>
              <p className="quiz-helper-text">
                Your recommendations will appear here after you submit the
                anonymous transfer intake form.
              </p>
              <div className="quiz-results-actions">
                <Link to="/transfer/quiz">Go to intake form</Link>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default TransferQuizResults;

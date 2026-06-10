import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { degrees } from '../../../data/degrees';
import { plannedHighSchoolFutureDegreeOptions } from '../../../data/highSchoolFutureDegreeOptions';
import {
  addCurrentUsfProfileMajor,
  loadCurrentUsfProfileMajors,
} from '../../../utils/currentUsfProfileMajors';
import {
  loadCurrentUsfQuizProgress,
  loadCurrentUsfQuizResult,
  resetCurrentUsfQuizSession,
  type SavedCurrentUsfQuizResult,
} from './currentUsfQuizSession';
import '../../../styles/quiz.css';

type CurrentUsfNextStepAction = {
  id: string;
  triggerIds: string[];
  label: string;
  to: string;
  reason: string;
  tone?: 'danger';
};

const currentUsfNextStepActions: CurrentUsfNextStepAction[] = [
  {
    id: 'degree-recommendations',
    triggerIds: ['which-bellini-majors-fit'],
    label: 'Explore Bellini majors',
    to: '/degrees?from=current-usf-student',
    reason:
      'because you said you need help understanding which Bellini majors may fit you.',
  },
  {
    id: 'transcript-upload',
    triggerIds: ['completed-courses-count'],
    label: 'Upload or review transcript',
    to: '/current-usf/transcript',
    reason:
      'because you said you need help seeing how completed courses may count.',
  },
  {
    id: 'course-fit-guide',
    triggerIds: ['completed-courses-count'],
    label: 'Open transition guide',
    to: '/current-usf/readiness-guide',
    reason:
      'because the guide helps you prepare course-counting questions before advising.',
  },
  {
    id: 'graduation-timing',
    triggerIds: ['graduation-timing'],
    label: 'Open transition guide',
    to: '/current-usf/readiness-guide',
    reason:
      'because you said you need help understanding how switching may affect graduation timing.',
  },
  {
    id: 'major-comparison',
    triggerIds: ['compare-bellini-majors'],
    label: 'Compare Bellini majors',
    to: '/degrees?from=current-usf-student',
    reason:
      'because you said you need help comparing different Bellini majors.',
  },
  {
    id: 'major-entry-requirements',
    triggerIds: ['major-entry-requirements'],
    label: 'Open transition guide',
    to: '/current-usf/readiness-guide#gateway-requirements',
    reason:
      'because you said you need help understanding requirements for entering the major.',
  },
  {
    id: 'advising-questions',
    triggerIds: ['questions-for-advising', 'not-sure-advising'],
    label: 'Open transition guide',
    to: '/current-usf/readiness-guide',
    reason:
      'because you said you need help preparing questions for advising.',
  },
];

function getVisibleRecommendedDegrees(quizResult: SavedCurrentUsfQuizResult) {
  const visibleRecommendations = quizResult.recommendedDegrees.filter(
    (degree) => (quizResult.matchPercentages[degree] ?? 0) > 0,
  );

  return visibleRecommendations.length > 0
    ? visibleRecommendations
    : quizResult.recommendedDegrees.slice(0, 1);
}

function getProfileMajorFromRecommendation(recommendedDegree: string) {
  const degree =
    plannedHighSchoolFutureDegreeOptions.find(
      (option) => option.name === recommendedDegree,
    ) ?? degrees.find((option) => option.name === recommendedDegree);

  return {
    slug:
      degree?.slug ??
      recommendedDegree
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, ''),
    name: recommendedDegree,
  };
}

function CurrentUsfQuizResults() {
  const navigate = useNavigate();
  const quizResult = loadCurrentUsfQuizResult();
  const [profileMajorSlugs, setProfileMajorSlugs] = useState(() =>
    loadCurrentUsfProfileMajors().map((major) => major.slug),
  );
  const savedProgress = loadCurrentUsfQuizProgress();
  const advisingNeedAnswers =
    savedProgress.answersByQuestion['current-usf-advising-needs'];
  const selectedAdvisingNeedIds = Array.isArray(advisingNeedAnswers)
    ? advisingNeedAnswers
    : advisingNeedAnswers
      ? [advisingNeedAnswers]
      : [];
  const selectedNextStepActions = currentUsfNextStepActions.filter((action) =>
    action.triggerIds.some((answerId) =>
      selectedAdvisingNeedIds.includes(answerId),
    ),
  );
  const visibleRecommendedDegrees = quizResult
    ? getVisibleRecommendedDegrees(quizResult)
    : [];
  const visibleTopMatch = visibleRecommendedDegrees[0] ?? quizResult?.topMatch;
  const visibleOtherRecommendations = visibleRecommendedDegrees.slice(1, 3);
  const recommendedProfileMajors = visibleRecommendedDegrees.map(
    getProfileMajorFromRecommendation,
  );
  const allVisibleRecommendationsSaved =
    recommendedProfileMajors.length > 0 &&
    recommendedProfileMajors.every((major) =>
      profileMajorSlugs.includes(major.slug),
    );

  function handleStartOver() {
    resetCurrentUsfQuizSession();
    navigate('/current-usf/quiz');
  }

  function handleSaveRecommendationsToProfile() {
    recommendedProfileMajors.forEach((major) => {
      addCurrentUsfProfileMajor(major);
    });

    setProfileMajorSlugs(
      loadCurrentUsfProfileMajors().map((major) => major.slug),
    );
    navigate('/profile');
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-results-title">
        <Link className="quiz-back-link" to="/dashboard/current-usf-student">
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
                These recommendations are for Current USF planning only. Use
                them to decide which Bellini programs to review and which
                course, timeline, and advising questions to ask next.
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
                  ? 'Your anonymous Current USF quiz answers and recommendation were saved.'
                  : 'Supabase is not configured yet, so this result is only shown locally.'}
              </p>
              {selectedNextStepActions.length > 0 && (
                <section className="quiz-next-step-recommendations">
                  <h2>Suggested next steps</h2>
                  <div className="quiz-next-step-list">
                    {selectedNextStepActions.map((action) => (
                      <article key={action.id}>
                        <p>Suggested {action.reason}</p>
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
                      </article>
                    ))}
                  </div>
                </section>
              )}
              <div className="quiz-results-actions">
                <Link to="/degrees?from=current-usf-student">Explore degrees</Link>
                <button
                  type="button"
                  onClick={handleSaveRecommendationsToProfile}
                >
                  {allVisibleRecommendationsSaved
                    ? 'View recommendations in profile'
                    : 'Save recommendations to profile'}
                </button>
                <Link to="/current-usf/quiz">Review or change answers</Link>
                <button type="button" onClick={handleStartOver}>
                  Start over
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="quiz-question-eyebrow">No result yet</p>
              <h1 id="quiz-results-title">Finish the intake quiz first.</h1>
              <p className="quiz-helper-text">
                Your recommendations will appear here after you submit the
                Current USF intake quiz.
              </p>
              <div className="quiz-results-actions">
                <Link to="/current-usf/quiz">Go to intake quiz</Link>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default CurrentUsfQuizResults;

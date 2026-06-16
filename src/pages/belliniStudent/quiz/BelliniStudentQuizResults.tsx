import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { degrees } from '../../../data/degrees';
import { plannedHighSchoolFutureDegreeOptions } from '../../../data/highSchoolFutureDegreeOptions';
import {
  addBelliniStudentProfileMajor,
  loadBelliniStudentProfileMajors,
} from '../../../utils/belliniStudentProfileMajors';
import {
  loadBelliniStudentQuizProgress,
  loadBelliniStudentQuizResult,
  resetBelliniStudentQuizSession,
  type SavedBelliniStudentQuizResult,
} from './belliniStudentQuizSession';
import '../../../styles/quiz.css';

type BelliniStudentNextStepAction = {
  id: string;
  triggerIds: string[];
  label: string;
  to: string;
  reason: string;
  tone?: 'danger';
};

const belliniStudentNextStepActions: BelliniStudentNextStepAction[] = [
  {
    id: 'compare-requirements',
    triggerIds: [
      'help-compare-requirements',
      'switch-open-either',
      'switch-compare-requirements',
    ],
    label: 'Compare Bellini majors',
    to: '/degrees?from=current-bellini-student',
    reason:
      'because you said you need to compare Bellini major options or requirements before deciding.',
  },
  {
    id: 'course-overlap',
    triggerIds: ['help-course-overlap', 'switch-extra-courses'],
    label: 'Open course overlap planner',
    to: '/bellini-student/course-overlap',
    reason:
      'because you said completed-course overlap or extra courses may affect the decision.',
  },
  {
    id: 'timeline-guide',
    triggerIds: [
      'help-graduation-impact',
      'reason-graduation-timeline',
      'decision-shorter-timeline',
      'switch-want-switch',
      'help-next-steps',
      'timeline-third-year',
      'timeline-fourth-year-plus',
    ],
    label: 'Open major change guide',
    to: '/bellini-student/major-change-guide',
    reason:
      'because a formal switch, timeline, grades, and the four-year completion rule need official Bellini evaluation.',
    tone: 'danger',
  },
  {
    id: 'career-outcomes',
    triggerIds: ['help-career-outcomes'],
    label: 'Explore degree pages',
    to: '/degrees?from=current-bellini-student',
    reason:
      'because you said career outcomes should help guide your major comparison.',
  },
  {
    id: 'elective-options',
    triggerIds: ['help-elective-options', 'switch-stay-electives'],
    label: 'Review degree options',
    to: '/degrees?from=current-bellini-student',
    reason:
      'because electives may let you explore another area without a formal major change.',
  },
  {
    id: 'advisor-questions',
    triggerIds: [
      'help-advisor-questions',
      'help-planning-report',
      'switch-not-sure',
    ],
    label: 'Open profile',
    to: '/bellini-student/profile',
    reason:
      'because you said you want advisor questions, next steps, a planning report, or help organizing an uncertain choice.',
  },
];

function getVisibleRecommendedDegrees(
  quizResult: SavedBelliniStudentQuizResult,
) {
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

function normalizeAnswerIds(answerValue: unknown) {
  return Array.isArray(answerValue)
    ? answerValue
    : typeof answerValue === 'string'
      ? [answerValue]
      : [];
}

function BelliniStudentQuizResults() {
  const navigate = useNavigate();
  const quizResult = loadBelliniStudentQuizResult();
  const [profileMajorSlugs, setProfileMajorSlugs] = useState(() =>
    loadBelliniStudentProfileMajors().map((major) => major.slug),
  );
  const savedProgress = loadBelliniStudentQuizProgress();
  const selectedDecisionHelpIds = normalizeAnswerIds(
    savedProgress.answersByQuestion['bellini-decision-help'],
  );
  const selectedSwitchIds = normalizeAnswerIds(
    savedProgress.answersByQuestion['bellini-switch-or-electives'],
  );
  const selectedReasonIds = normalizeAnswerIds(
    savedProgress.answersByQuestion['bellini-switch-reason'],
  );
  const selectedDecisionPriorityIds = normalizeAnswerIds(
    savedProgress.answersByQuestion['bellini-decision-priority'],
  );
  const selectedTimelineIds = normalizeAnswerIds(
    savedProgress.answersByQuestion['bellini-timeline-position'],
  );
  const selectedNextStepTriggerIds = [
    ...selectedDecisionHelpIds,
    ...selectedSwitchIds,
    ...selectedReasonIds,
    ...selectedDecisionPriorityIds,
    ...selectedTimelineIds,
  ];
  const selectedNextStepActions = belliniStudentNextStepActions.filter((action) =>
    action.triggerIds.some((answerId) =>
      selectedNextStepTriggerIds.includes(answerId),
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
    resetBelliniStudentQuizSession();
    navigate('/bellini-student/quiz');
  }

  function handleSaveRecommendationsToProfile() {
    recommendedProfileMajors.forEach((major) => {
      addBelliniStudentProfileMajor(major);
    });

    setProfileMajorSlugs(
      loadBelliniStudentProfileMajors().map((major) => major.slug),
    );
    navigate('/bellini-student/profile');
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-results-title">
        <Link
          className="quiz-back-link"
          to="/dashboard/current-bellini-student#intake-quiz"
        >
          Back to dashboard
        </Link>

        <article className="quiz-question-card quiz-complete-card quiz-results-card">
          {quizResult ? (
            <>
              <p className="quiz-question-eyebrow">
                Bellini major-change planning
              </p>
              <h1 id="quiz-results-title">
                {visibleTopMatch} looks like your strongest area to review.
              </h1>
              <p className="quiz-helper-text">
                These recommendations are planning prompts, not approval to
                switch. Bellini advising must evaluate grades, completed
                courses, repeated attempts, and whether the plan fits within
                the four-year timeline.
              </p>
              <section className="quiz-top-result">
                <p>Top area to review</p>
                <h2>{visibleTopMatch}</h2>
                <span>
                  {quizResult.matchPercentages[visibleTopMatch] ?? 0}% match
                </span>
              </section>
              {quizResult.explanations[visibleTopMatch] && (
                <section className="quiz-top-result-explanation">
                  <h2>Why this may be worth reviewing</h2>
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
                <h2>Other Bellini majors to compare</h2>
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
                  ? 'Your anonymous Current Bellini student quiz answers and recommendation were saved.'
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
                <Link to="/degrees?from=current-bellini-student">
                  Explore degrees
                </Link>
                <button
                  type="button"
                  onClick={handleSaveRecommendationsToProfile}
                >
                  {allVisibleRecommendationsSaved
                    ? 'View recommendations in profile'
                    : 'Save recommendations to profile'}
                </button>
                <Link to="/bellini-student/quiz">Review or change answers</Link>
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
                Current Bellini student intake quiz.
              </p>
              <div className="quiz-results-actions">
                <Link to="/bellini-student/quiz">Go to intake quiz</Link>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default BelliniStudentQuizResults;

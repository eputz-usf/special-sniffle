import { Link, useNavigate } from 'react-router-dom';
import {
  loadPublicQuizResult,
  resetPublicQuizSession,
  type SavedPublicQuizResult,
} from '../../../utils/publicQuizSession';
import '../../../styles/quiz.css';

function getVisibleRecommendedDegrees(quizResult: SavedPublicQuizResult) {
  const visibleRecommendations = quizResult.recommendedDegrees.filter(
    (degree) => (quizResult.matchPercentages[degree] ?? 0) > 0,
  );

  return visibleRecommendations.length > 0
    ? visibleRecommendations
    : quizResult.recommendedDegrees.slice(0, 1);
}

function HighSchoolQuizResults() {
  const navigate = useNavigate();
  const quizResult = loadPublicQuizResult();
  const visibleRecommendedDegrees = quizResult
    ? getVisibleRecommendedDegrees(quizResult)
    : [];
  const visibleTopMatch = visibleRecommendedDegrees[0] ?? quizResult?.topMatch;
  const visibleOtherRecommendations = visibleRecommendedDegrees.slice(1, 3);

  function handleStartOver() {
    resetPublicQuizSession();
    navigate('/quiz');
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-results-title">
        <Link
          className="quiz-back-link"
          to="/dashboard/prospective-student#intake-quiz"
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
                These recommendations are for exploration only. Use them to
                decide which degree pages to read and compare next.
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
                  ? 'Your anonymous quiz answers and recommendation were saved.'
                  : 'Supabase is not configured yet, so this result is only shown locally.'}
              </p>
              <div className="quiz-results-actions">
                <Link to="/high-school/degrees">Explore degrees</Link>
                <Link to="/quiz">Review or change answers</Link>
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
                anonymous high school intake form.
              </p>
              <div className="quiz-results-actions">
                <Link to="/quiz">Go to intake form</Link>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  );
}

export default HighSchoolQuizResults;

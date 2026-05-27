import { Link, useNavigate } from 'react-router-dom';
import {
  loadPublicQuizResult,
  resetPublicQuizSession,
} from '../utils/publicQuizSession';
import '../styles/quiz.css';

function HighSchoolQuizResults() {
  const navigate = useNavigate();
  const quizResult = loadPublicQuizResult();

  function handleStartOver() {
    resetPublicQuizSession();
    navigate('/quiz');
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-results-title">
        <Link className="quiz-back-link" to="/dashboard/prospective-student">
          Back to dashboard
        </Link>

        <article className="quiz-question-card quiz-complete-card">
          {quizResult ? (
            <>
              <p className="quiz-question-eyebrow">Recommended starting points</p>
              <h1 id="quiz-results-title">
                {quizResult.topMatch} looks like your strongest match.
              </h1>
              <p className="quiz-helper-text">
                These recommendations are for exploration only. Use them to
                decide which degree pages to read and compare next.
              </p>
              <div className="quiz-results-list">
                {quizResult.recommendedDegrees.map((degree, index) => (
                  <span key={degree}>
                    {index + 1}. {degree}
                  </span>
                ))}
              </div>
              <p className="quiz-save-note">
                {quizResult.saveStatus === 'saved'
                  ? 'Your anonymous quiz answers and recommendation were saved.'
                  : 'Supabase is not configured yet, so this result is only shown locally.'}
              </p>
              <div className="quiz-results-actions">
                <Link to="/degrees">Explore degrees</Link>
                <Link to="/quiz">Review or change answers</Link>
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

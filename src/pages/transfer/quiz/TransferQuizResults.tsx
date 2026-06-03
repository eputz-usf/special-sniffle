import { Link, useNavigate } from 'react-router-dom';
import {
  loadTransferQuizResult,
  resetTransferQuizSession,
} from './transferQuizSession';
import '../../../styles/quiz.css';

function TransferQuizResults() {
  const navigate = useNavigate();
  const quizResult = loadTransferQuizResult();

  function handleStartOver() {
    resetTransferQuizSession();
    navigate('/transfer/quiz');
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-results-title">
        <Link className="quiz-back-link" to="/dashboard/transfer-student">
          Back to dashboard
        </Link>

        <article className="quiz-question-card quiz-complete-card quiz-results-card">
          {quizResult ? (
            <>
              <p className="quiz-question-eyebrow">Recommended starting points</p>
              <h1 id="quiz-results-title">
                {quizResult.topMatch} looks like your strongest match.
              </h1>
              <p className="quiz-helper-text">
                These recommendations are for transfer planning only. Use them
                to decide which degree pages to review and which credit,
                prerequisite, and timeline questions to ask advising.
              </p>
              <section className="quiz-top-result">
                <p>Top recommendation</p>
                <h2>{quizResult.topMatch}</h2>
              </section>
              {quizResult.explanations[quizResult.topMatch] && (
                <section className="quiz-top-result-explanation">
                  <h2>Why this may be a good fit</h2>
                  <p>{quizResult.explanations[quizResult.topMatch]}</p>
                  {quizResult.signalsByMajor[quizResult.topMatch]?.length > 0 && (
                    <>
                      <h3>Key signals from your quiz</h3>
                      <ul>
                        {quizResult.signalsByMajor[quizResult.topMatch]
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
                {quizResult.recommendedDegrees.slice(1, 3).map((degree, index) => (
                  <article key={degree}>
                    <strong>
                      {index + 2}. {degree}
                    </strong>
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

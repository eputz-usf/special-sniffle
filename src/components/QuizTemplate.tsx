import { useState } from 'react';
import {
  BookOpen,
  Brain,
  Briefcase,
  Code2,
  Cpu,
  HeartHandshake,
  Lightbulb,
  Palette,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/quiz.css';
import type { QuizRecommendationSignal } from '../utils/quizRecommendations';

export type QuizAnswerIcon =
  | 'book'
  | 'brain'
  | 'briefcase'
  | 'code'
  | 'cpu'
  | 'hands'
  | 'lightbulb'
  | 'palette'
  | 'shield'
  | 'users'
  | 'wrench';

export type QuizAnswer = {
  id: string;
  label: string;
  description: string;
  icon: QuizAnswerIcon;
};

export type QuizQuestion = {
  id: string;
  eyebrow: string;
  question: string;
  helperText: string;
  answers: QuizAnswer[];
  selectionMode?: 'single' | 'multiple';
  maxSelections?: number;
};

export type QuizAnswerValue = string | string[];
export type QuizAnswersByQuestion = Record<string, QuizAnswerValue>;

export type QuizSubmissionResult = {
  recommendedDegrees: string[];
  topMatch: string;
  majorScores: Record<string, number>;
  explanations: Record<string, string>;
  signalsByMajor: Record<string, QuizRecommendationSignal[]>;
  quizVersion: string;
  saveStatus: 'saved' | 'skipped';
};

type QuizTemplateProps = {
  title: string;
  intro: string;
  questions: QuizQuestion[];
  initialAnswersByQuestion?: QuizAnswersByQuestion;
  initialQuestionIndex?: number;
  backLink?: {
    label: string;
    to: string;
  };
  resultsPath?: string;
  onAnswerChange?: (
    questionId: string,
    answerValue: QuizAnswerValue,
    answersByQuestion: QuizAnswersByQuestion,
    currentQuestionIndex: number,
  ) => void | Promise<void>;
  onQuestionIndexChange?: (
    currentQuestionIndex: number,
    answersByQuestion: QuizAnswersByQuestion,
  ) => void | Promise<void>;
  onSubmit: (
    answersByQuestion: QuizAnswersByQuestion,
  ) => Promise<QuizSubmissionResult>;
};

const answerIcons = {
  book: BookOpen,
  brain: Brain,
  briefcase: Briefcase,
  code: Code2,
  cpu: Cpu,
  hands: HeartHandshake,
  lightbulb: Lightbulb,
  palette: Palette,
  shield: ShieldCheck,
  users: Users,
  wrench: Wrench,
};

function QuizTemplate({
  title,
  intro,
  questions,
  initialAnswersByQuestion = {},
  initialQuestionIndex = 0,
  backLink,
  resultsPath,
  onAnswerChange,
  onQuestionIndexChange,
  onSubmit,
}: QuizTemplateProps) {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() =>
    Math.min(Math.max(initialQuestionIndex, 0), questions.length - 1),
  );
  const [submissionResult, setSubmissionResult] =
    useState<QuizSubmissionResult | null>(null);
  const [submissionError, setSubmissionError] = useState('');
  const [autosaveError, setAutosaveError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answersByQuestion, setAnswersByQuestion] =
    useState<QuizAnswersByQuestion>(initialAnswersByQuestion);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswerValue = answersByQuestion[currentQuestion.id];
  const selectedAnswerIds = Array.isArray(selectedAnswerValue)
    ? selectedAnswerValue
    : selectedAnswerValue
      ? [selectedAnswerValue]
      : [];
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  async function persistAnswer(
    questionId: string,
    answerValue: QuizAnswerValue,
    updatedAnswers: QuizAnswersByQuestion,
    questionIndex: number,
  ) {
    if (!onAnswerChange) {
      return;
    }

    try {
      await onAnswerChange(questionId, answerValue, updatedAnswers, questionIndex);
      setAutosaveError('');
    } catch (error) {
      console.error('Quiz answer autosave failed:', error);
      setAutosaveError(
        'Your answer is saved in this browser, but Supabase could not update yet.',
      );
    }
  }

  async function persistQuestionIndex(
    questionIndex: number,
    currentAnswers: QuizAnswersByQuestion,
  ) {
    if (!onQuestionIndexChange) {
      return;
    }

    try {
      await onQuestionIndexChange(questionIndex, currentAnswers);
      setAutosaveError('');
    } catch (error) {
      console.error('Quiz progress autosave failed:', error);
      setAutosaveError(
        'Your progress is saved in this browser, but Supabase could not update yet.',
      );
    }
  }

  function handleSelectAnswer(answerId: string) {
    setSubmissionError('');
    const isMultiple = currentQuestion.selectionMode === 'multiple';
    const isSelected = selectedAnswerIds.includes(answerId);
    const maxSelections = currentQuestion.maxSelections ?? currentQuestion.answers.length;
    const answerValue = isMultiple
      ? isSelected
        ? selectedAnswerIds.filter((selectedId) => selectedId !== answerId)
        : selectedAnswerIds.length < maxSelections
          ? [...selectedAnswerIds, answerId]
          : selectedAnswerIds
      : answerId;
    const updatedAnswers = { ...answersByQuestion };

    if (Array.isArray(answerValue) && answerValue.length === 0) {
      delete updatedAnswers[currentQuestion.id];
    } else {
      updatedAnswers[currentQuestion.id] = answerValue;
    }

    setAnswersByQuestion(updatedAnswers);
    void persistAnswer(
      currentQuestion.id,
      answerValue,
      updatedAnswers,
      currentQuestionIndex,
    );
  }

  function handleBack() {
    setSubmissionError('');

    if (submissionResult) {
      setSubmissionResult(null);
      return;
    }

    const nextQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    setCurrentQuestionIndex(nextQuestionIndex);
    void persistQuestionIndex(nextQuestionIndex, answersByQuestion);
  }

  async function handleNext() {
    if (selectedAnswerIds.length === 0) {
      return;
    }

    if (isLastQuestion) {
      setIsSubmitting(true);
      setSubmissionError('');

      try {
        await persistAnswer(
          currentQuestion.id,
          selectedAnswerValue,
          answersByQuestion,
          currentQuestionIndex,
        );
        const result = await onSubmit(answersByQuestion);
        if (resultsPath) {
          navigate(resultsPath);
        } else {
          setSubmissionResult(result);
        }
      } catch (error) {
        console.error('Quiz final submit failed:', error);
        setSubmissionError(
          'We could not save your intake form yet. Please try again.',
        );
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    await persistAnswer(
      currentQuestion.id,
      selectedAnswerValue,
      answersByQuestion,
      currentQuestionIndex,
    );
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);
    void persistQuestionIndex(nextQuestionIndex, answersByQuestion);
  }

  return (
    <main className="quiz-page">
      <section className="quiz-shell" aria-labelledby="quiz-title">
        {backLink && (
          <Link className="quiz-back-link" to={backLink.to}>
            {backLink.label}
          </Link>
        )}

        <div className="quiz-header">
          <div>
            <p className="quiz-kicker">Intake quiz template</p>
            <h1 id="quiz-title">{title}</h1>
            <p>{intro}</p>
          </div>
          <span className="quiz-count">
            {submissionResult
              ? 'Done'
              : `${currentQuestionIndex + 1} / ${questions.length}`}
          </span>
        </div>

        <div className="quiz-progress" aria-label="Quiz progress">
          <span style={{ width: `${progressPercent}%` }} />
        </div>

        {submissionResult ? (
          <article className="quiz-question-card quiz-complete-card">
            <p className="quiz-question-eyebrow">Recommended starting points</p>
            <h2>{submissionResult.topMatch} looks like your strongest match.</h2>
            <p className="quiz-helper-text">
              These recommendations are for exploration only. They can help you
              decide which degree pages to read and compare next.
            </p>
            <div className="quiz-results-list">
              {submissionResult.recommendedDegrees.map((degree, index) => (
                <span key={degree}>
                  {index + 1}. {degree}
                </span>
              ))}
            </div>
            <p className="quiz-save-note">
              {submissionResult.saveStatus === 'saved'
                ? 'Your anonymous quiz answers and recommendation were saved.'
                : 'Supabase is not configured yet, so this result is only shown locally.'}
            </p>
          </article>
        ) : (
          <article className="quiz-question-card">
            <p className="quiz-question-eyebrow">{currentQuestion.eyebrow}</p>
            <h2>{currentQuestion.question}</h2>
            <p className="quiz-helper-text">{currentQuestion.helperText}</p>
            {currentQuestion.selectionMode === 'multiple' && (
              <p className="quiz-selection-note">
                Choose up to {currentQuestion.maxSelections} options.{' '}
                {selectedAnswerIds.length} selected.
              </p>
            )}

            <div className="quiz-answer-grid">
              {currentQuestion.answers.map((answer) => {
                const Icon = answerIcons[answer.icon];
                const isSelected = selectedAnswerIds.includes(answer.id);

                return (
                  <button
                    className={`quiz-answer-card${isSelected ? ' selected' : ''}`}
                    key={answer.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectAnswer(answer.id)}
                  >
                    <span className="quiz-answer-icon">
                      <Icon size={26} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{answer.label}</strong>
                      <small>{answer.description}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </article>
        )}

        {autosaveError && <p className="quiz-save-warning">{autosaveError}</p>}
        {submissionError && <p className="quiz-error">{submissionError}</p>}

        <div className="quiz-controls">
          <button
            className="quiz-secondary-button"
            disabled={currentQuestionIndex === 0 && !submissionResult}
            type="button"
            onClick={handleBack}
          >
            Back
          </button>

          <p>
            {selectedAnswerIds.length === 0
              ? 'Pick the answer that feels closest. You can change it later.'
              : `${selectedAnswerIds.length} answer${
                  selectedAnswerIds.length === 1 ? '' : 's'
                } selected`}
          </p>

          <button
            className="quiz-primary-button"
            disabled={
              selectedAnswerIds.length === 0 ||
              Boolean(submissionResult) ||
              isSubmitting
            }
            type="button"
            onClick={handleNext}
          >
            {isSubmitting ? 'Saving' : isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>
      </section>
    </main>
  );
}

export default QuizTemplate;

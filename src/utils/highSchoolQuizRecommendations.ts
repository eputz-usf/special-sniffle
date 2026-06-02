import type {
  QuizAnswersByQuestion,
  QuizQuestion,
} from '../components/QuizTemplate';
import { highSchoolQuizRecommendationConfig } from '../config/highSchoolQuizRecommendationConfig';
import { generateQuizResult } from './quizRecommendations';

export function generateHighSchoolQuizResult(
  answersByQuestion: QuizAnswersByQuestion,
  questions: QuizQuestion[],
) {
  return generateQuizResult(
    answersByQuestion,
    highSchoolQuizRecommendationConfig,
    questions,
  );
}

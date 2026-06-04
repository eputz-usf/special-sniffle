import type {
  QuizAnswersByQuestion,
  QuizQuestion,
} from '../components/QuizTemplate';

export type QuizRecommendationConfig = {
  quizVersion: string;
  majors: string[];
  answerWeights: Record<string, Partial<Record<string, number>>>;
  majorExplanations: Record<string, string>;
  recommendationCount?: number;
};

export type QuizRecommendationResult = {
  recommendedDegrees: string[];
  topMatch: string;
  majorScores: Record<string, number>;
  maximumMajorScores: Record<string, number>;
  matchPercentages: Record<string, number>;
  explanations: Record<string, string>;
  signalsByMajor: Record<string, QuizRecommendationSignal[]>;
  quizVersion: string;
};

export type QuizRecommendationSignal = {
  answerId: string;
  label: string;
  points: number;
};

export function calculateMatchPercentages(
  recommendedDegrees: string[],
  majorScores: Record<string, number>,
  maximumMajorScores: Record<string, number>,
) {
  return Object.fromEntries(
    recommendedDegrees.map((major) => {
      const score = majorScores[major] ?? 0;
      const maximumScore = maximumMajorScores[major] ?? 0;

      return [
        major,
        maximumScore > 0
          ? Math.max(1, Math.round((score / maximumScore) * 100))
          : 0,
      ];
    }),
  );
}

function calculateMaximumMajorScores(
  config: QuizRecommendationConfig,
  questions: QuizQuestion[],
) {
  const maximumMajorScores = Object.fromEntries(
    config.majors.map((major) => [major, 0]),
  );

  questions.forEach((question) => {
    const maxSelections =
      question.selectionMode === 'multiple' ? question.maxSelections ?? 1 : 1;

    config.majors.forEach((major) => {
      const possibleQuestionPoints = question.answers
        .map((answer) => config.answerWeights[answer.id]?.[major] ?? 0)
        .filter((points) => points > 0)
        .sort((first, second) => second - first)
        .slice(0, maxSelections)
        .reduce((total, points) => total + points, 0);

      maximumMajorScores[major] += possibleQuestionPoints;
    });
  });

  return maximumMajorScores;
}

export function generateQuizResult(
  answersByQuestion: QuizAnswersByQuestion,
  config: QuizRecommendationConfig,
  questions: QuizQuestion[],
): QuizRecommendationResult {
  const majorScores = Object.fromEntries(
    config.majors.map((major) => [major, 0]),
  );
  const signalsByMajor = Object.fromEntries(
    config.majors.map((major) => [major, [] as QuizRecommendationSignal[]]),
  );
  const answerLabels = Object.fromEntries(
    questions.flatMap((question) =>
      question.answers.map((answer) => [answer.id, answer.label]),
    ),
  );

  Object.values(answersByQuestion)
    .flatMap((answerValue) =>
      Array.isArray(answerValue) ? answerValue : [answerValue],
    )
    .forEach((answerValue) => {
      const weights = config.answerWeights[answerValue];

      if (!weights) {
        return;
      }

      Object.entries(weights).forEach(([major, points]) => {
        majorScores[major] = (majorScores[major] ?? 0) + (points ?? 0);
        signalsByMajor[major].push({
          answerId: answerValue,
          label: answerLabels[answerValue] ?? answerValue,
          points: points ?? 0,
        });
      });
    });

  Object.values(signalsByMajor).forEach((signals) => {
    signals.sort((first, second) => second.points - first.points);
  });

  const maximumMajorScores = calculateMaximumMajorScores(config, questions);
  const recommendedDegrees = Object.entries(majorScores)
    .sort(([, firstScore], [, secondScore]) => secondScore - firstScore)
    .slice(0, config.recommendationCount ?? 3)
    .map(([major]) => major);

  const explanations = Object.fromEntries(
    recommendedDegrees.map((major) => [
      major,
      majorScores[major] > 0
        ? config.majorExplanations[major]
        : 'This is a broad starting point because your answers did not strongly favor one path yet.',
    ]),
  );
  const matchPercentages = calculateMatchPercentages(
    recommendedDegrees,
    majorScores,
    maximumMajorScores,
  );

  return {
    recommendedDegrees,
    topMatch: recommendedDegrees[0],
    majorScores,
    maximumMajorScores,
    matchPercentages,
    explanations,
    signalsByMajor,
    quizVersion: config.quizVersion,
  };
}

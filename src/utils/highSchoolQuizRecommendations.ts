import type { PublicQuizResult } from './publicQuizSupabase';

const degreeScores = {
  'Computer Science': 0,
  'Artificial Intelligence': 0,
  Cybersecurity: 0,
  'Information Technology': 0,
  'Computer Science and Engineering': 0,
};

type DegreeName = keyof typeof degreeScores;

const answerWeights: Record<string, Partial<Record<DegreeName, number>>> = {
  software: { 'Computer Science': 3 },
  'ai-ml': { 'Artificial Intelligence': 3, 'Computer Science': 1 },
  cybersecurity: { Cybersecurity: 3 },
  hardware: { 'Computer Science and Engineering': 3 },
  data: { 'Artificial Intelligence': 2, 'Computer Science': 1 },
  'business-tech': { 'Information Technology': 2 },
  'apps-websites': { 'Computer Science': 3 },
  'intelligent-systems': { 'Artificial Intelligence': 3 },
  'security-problems': { Cybersecurity: 3 },
  'hardware-work': { 'Computer Science and Engineering': 3 },
  patterns: { 'Artificial Intelligence': 2, 'Computer Science': 1 },
  'help-people': { 'Information Technology': 2 },
  projects: { 'Information Technology': 2 },
  math: { 'Computer Science': 1, 'Artificial Intelligence': 1 },
  science: { 'Computer Science and Engineering': 1, 'Artificial Intelligence': 1 },
  technology: { 'Computer Science': 1, 'Information Technology': 1 },
  business: { 'Information Technology': 2 },
  'people-topics': { 'Information Technology': 1, Cybersecurity: 1 },
  creativity: { 'Computer Science': 1 },
  'enjoy-coding': { 'Computer Science': 2, 'Artificial Intelligence': 1 },
  'tried-little': { 'Computer Science': 1, 'Information Technology': 1 },
  'new-interested': { 'Information Technology': 1, 'Computer Science': 1 },
  'less-coding': { 'Information Technology': 2 },
  'enjoy-math': { 'Artificial Intelligence': 2, 'Computer Science': 1 },
  'purpose-math': { 'Computer Science': 1, 'Computer Science and Engineering': 1 },
  'less-math': { 'Information Technology': 2 },
  'software-developer': { 'Computer Science': 3 },
  'ai-specialist': { 'Artificial Intelligence': 3 },
  'cyber-analyst': { Cybersecurity: 3 },
  'computer-engineer': { 'Computer Science and Engineering': 3 },
  'data-analyst': { 'Artificial Intelligence': 2 },
  'it-specialist': { 'Information Technology': 3 },
  'tech-consultant': { 'Information Technology': 2 },
  'computer-science': { 'Computer Science': 4 },
  'artificial-intelligence': { 'Artificial Intelligence': 4 },
  'cybersecurity-program': { Cybersecurity: 4 },
  'information-technology': { 'Information Technology': 4 },
  'computer-science-and-engineering': { 'Computer Science and Engineering': 4 },
};

export function generateHighSchoolQuizResult(
  answersByQuestion: Record<string, string>,
): PublicQuizResult {
  const scores = { ...degreeScores };

  Object.values(answersByQuestion).forEach((answerValue) => {
    const weights = answerWeights[answerValue];

    if (!weights) {
      return;
    }

    Object.entries(weights).forEach(([degree, score]) => {
      scores[degree as DegreeName] += score ?? 0;
    });
  });

  const recommendedDegrees = Object.entries(scores)
    .sort(([, firstScore], [, secondScore]) => secondScore - firstScore)
    .slice(0, 3)
    .map(([degree]) => degree);

  return {
    recommendedDegrees,
    topMatch: recommendedDegrees[0],
  };
}

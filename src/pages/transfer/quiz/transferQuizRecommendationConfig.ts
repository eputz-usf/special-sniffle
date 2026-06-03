import type { QuizRecommendationConfig } from '../../../utils/quizRecommendations';

export const transferQuizRecommendationConfig = {
  quizVersion: 'transfer-v1',
  majors: [
    'Computer Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Information Technology',
    'Computer Science and Engineering',
  ],
  majorExplanations: {
    'Computer Science':
      'Your answers point toward software development, algorithms, systems, and flexible technical preparation.',
    'Artificial Intelligence':
      'Your answers point toward data, machine learning, intelligent systems, and model-driven technical work.',
    Cybersecurity:
      'Your answers point toward security, risk, digital protection, investigations, and secure systems.',
    'Information Technology':
      'Your answers point toward applied technology, systems, infrastructure, databases, cloud, and organizational support.',
    'Computer Science and Engineering':
      'Your answers point toward systems, hardware-aware software, embedded technology, robotics, or computing infrastructure.',
  },
  answerWeights: {
    'aa-transfer': { 'Information Technology': 1, 'Computer Science': 1 },
    'as-transfer': { 'Computer Science': 1, 'Artificial Intelligence': 1 },
    'technical-credits': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'engineering-credits': { 'Computer Science and Engineering': 2 },
    'career-change': { 'Information Technology': 1, Cybersecurity: 1 },
    'programming-strong': { 'Computer Science': 3, 'Artificial Intelligence': 1 },
    'programming-some': { 'Computer Science': 1, 'Information Technology': 1 },
    'programming-limited': { 'Information Technology': 2 },
    'math-strong': {
      'Computer Science': 1,
      'Artificial Intelligence': 2,
      'Computer Science and Engineering': 1,
    },
    'math-developing': { 'Information Technology': 1, Cybersecurity: 1 },
    'software-build': { 'Computer Science': 3 },
    'ai-data': { 'Artificial Intelligence': 3, 'Computer Science': 1 },
    cybersecurity: { Cybersecurity: 3 },
    'cloud-systems': { 'Information Technology': 3 },
    'hardware-systems': { 'Computer Science and Engineering': 3 },
    databases: { 'Information Technology': 2, 'Artificial Intelligence': 1 },
    'digital-forensics': { Cybersecurity: 3 },
    'user-org-tech': { 'Information Technology': 2 },
    'finish-fast': { 'Information Technology': 1 },
    'technical-depth': {
      'Computer Science': 2,
      'Artificial Intelligence': 1,
      'Computer Science and Engineering': 1,
    },
    'career-specific': { Cybersecurity: 1, 'Information Technology': 1 },
    'graduate-school': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      'Computer Science and Engineering': 1,
    },
    'software-engineer': { 'Computer Science': 3 },
    'ml-engineer': { 'Artificial Intelligence': 3 },
    'security-analyst': { Cybersecurity: 3 },
    'systems-admin': { 'Information Technology': 3 },
    'embedded-engineer': { 'Computer Science and Engineering': 3 },
    'database-cloud': { 'Information Technology': 2 },
    'credit-max': { 'Information Technology': 1 },
    'catalog-clarity': { 'Computer Science': 1, 'Information Technology': 1 },
    'prereq-concern': { 'Information Technology': 1, Cybersecurity: 1 },
    'permit-course-concern': { Cybersecurity: 1, 'Information Technology': 1 },
  },
} satisfies QuizRecommendationConfig;

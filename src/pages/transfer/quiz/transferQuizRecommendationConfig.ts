import type { QuizRecommendationConfig } from '../../../utils/quizRecommendations';

export const transferQuizRecommendationConfig = {
  quizVersion: 'transfer-v3',
  majors: [
    'Computer Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Information Technology',
    'Computer Science and Engineering',
    'BS in Computer Science and Criminology',
    'BS in Computer Science and Interdisciplinary Social Sciences',
    'BS in Computer Science and Business: Accountancy and Analytics Concentration',
    'BS in Computer Science and Business: Business Analytics and Information Systems Concentration',
    'BS in Computer Science and Business: Digital Marketing and Analytics Concentration',
    'BS in Computer Science and Business: Fintech Concentration',
    'BS in Computer Science and Business: Supply Chain Management Concentration',
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
    'BS in Computer Science and Criminology':
      'Your answers point toward computing, cybercrime, digital evidence, public safety, and justice systems.',
    'BS in Computer Science and Interdisciplinary Social Sciences':
      'Your answers point toward computing, people, communities, policy, social systems, and technology’s impact on society.',
    'BS in Computer Science and Business: Accountancy and Analytics Concentration':
      'Your answers point toward computing, accounting systems, auditing, analytics, and financial reports.',
    'BS in Computer Science and Business: Business Analytics and Information Systems Concentration':
      'Your answers point toward computing, business analytics, dashboards, databases, and information systems.',
    'BS in Computer Science and Business: Digital Marketing and Analytics Concentration':
      'Your answers point toward computing, digital platforms, customer data, online behavior, and marketing analytics.',
    'BS in Computer Science and Business: Fintech Concentration':
      'Your answers point toward computing, finance, payment technology, secure platforms, and financial data.',
    'BS in Computer Science and Business: Supply Chain Management Concentration':
      'Your answers point toward computing, logistics, operations, inventory, transportation, and business process improvement.',
  },
  answerWeights: {
    'community-college': { 'Information Technology': 1, 'Computer Science': 1 },
    'state-college': { 'Information Technology': 1, 'Computer Science': 1 },
    'another-university': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      'Computer Science and Engineering': 1,
    },
    'credits-not-enrolled': { 'Information Technology': 1, Cybersecurity: 1 },
    'exploring-transfer': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'next-semester': { 'Information Technology': 1 },
    'within-next-year': { 'Computer Science': 1, 'Information Technology': 1 },
    'after-associate-degree': { 'Information Technology': 1, 'Computer Science': 1 },
    'more-than-year': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      'Computer Science and Engineering': 1,
    },
    'timing-not-sure': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'interest-software': { 'Computer Science': 3 },
    'interest-ai-data': { 'Artificial Intelligence': 3, 'Computer Science': 1 },
    'interest-cybersecurity': { Cybersecurity: 3 },
    'interest-hardware': { 'Computer Science and Engineering': 3 },
    'interest-it-networks': { 'Information Technology': 3 },
    'interest-interdisciplinary': {
      'Information Technology': 2,
      Cybersecurity: 1,
      'Artificial Intelligence': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'BS in Computer Science and Criminology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'interest-business-analytics': {
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 4,
      'Information Technology': 1,
      'Artificial Intelligence': 1,
    },
    'interest-accounting-analytics': {
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 4,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'interest-digital-marketing': {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 4,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'interest-fintech': {
      'BS in Computer Science and Business: Fintech Concentration': 4,
      Cybersecurity: 1,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
    },
    'interest-supply-chain': {
      'BS in Computer Science and Business: Supply Chain Management Concentration': 4,
      'Information Technology': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'interest-criminology-tech': {
      'BS in Computer Science and Criminology': 4,
      Cybersecurity: 2,
    },
    'interest-social-science-tech': {
      'BS in Computer Science and Interdisciplinary Social Sciences': 4,
      'Information Technology': 1,
    },
    'interest-not-sure': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'course-programming': { 'Computer Science': 3, 'Artificial Intelligence': 1 },
    'course-calculus': {
      'Computer Science': 2,
      'Artificial Intelligence': 2,
      'Computer Science and Engineering': 2,
    },
    'course-statistics-data': { 'Artificial Intelligence': 2, 'Information Technology': 1 },
    'course-science': { 'Computer Science and Engineering': 1, 'Computer Science': 1 },
    'course-engineering': { 'Computer Science and Engineering': 3 },
    'course-cyber-it': { Cybersecurity: 2, 'Information Technology': 2 },
    'course-interdisciplinary': {
      'Information Technology': 2,
      Cybersecurity: 1,
      'Artificial Intelligence': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'BS in Computer Science and Criminology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'course-business-accounting': {
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 3,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 2,
      'BS in Computer Science and Business: Fintech Concentration': 2,
      'BS in Computer Science and Business: Supply Chain Management Concentration': 2,
    },
    'course-criminology-law': {
      'BS in Computer Science and Criminology': 3,
      Cybersecurity: 1,
    },
    'course-social-science': {
      'BS in Computer Science and Interdisciplinary Social Sciences': 3,
      'Information Technology': 1,
    },
    'course-general-ed': { 'Information Technology': 1 },
    'course-no-computing': { 'Information Technology': 2 },
    'course-not-sure': { 'Information Technology': 1, 'Computer Science': 1 },
    'programming-very-comfortable': {
      'Computer Science': 3,
      'Artificial Intelligence': 1,
      'Computer Science and Engineering': 1,
    },
    'programming-somewhat-comfortable': {
      'Computer Science': 2,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'programming-beginner': { 'Information Technology': 2, Cybersecurity: 1 },
    'programming-not-comfortable': { 'Information Technology': 2 },
    'programming-not-taken': { 'Information Technology': 2 },
    'math-very-comfortable': {
      'Artificial Intelligence': 3,
      'Computer Science': 2,
      'Computer Science and Engineering': 2,
    },
    'math-somewhat-comfortable': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      'Computer Science and Engineering': 1,
    },
    'math-needs-support': { 'Information Technology': 2, Cybersecurity: 1 },
    'math-concern': { 'Information Technology': 2 },
    'math-requirements-not-sure': { 'Information Technology': 1, 'Computer Science': 1 },
    'work-build-software': { 'Computer Science': 3 },
    'work-ai-data': { 'Artificial Intelligence': 3 },
    'work-cyber-protection': { Cybersecurity: 3 },
    'work-networks-systems': { 'Information Technology': 3 },
    'work-hardware': { 'Computer Science and Engineering': 3 },
    'work-applied-computing': {
      'Information Technology': 2,
      'Artificial Intelligence': 1,
      Cybersecurity: 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'BS in Computer Science and Criminology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'work-business-data': {
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 4,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
      'Artificial Intelligence': 1,
    },
    'work-financial-tech': {
      'BS in Computer Science and Business: Fintech Concentration': 4,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
      Cybersecurity: 1,
    },
    'work-marketing-tech': {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 4,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'work-operations-tech': {
      'BS in Computer Science and Business: Supply Chain Management Concentration': 4,
      'Information Technology': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'work-digital-evidence': {
      'BS in Computer Science and Criminology': 4,
      Cybersecurity: 2,
    },
    'work-social-impact-tech': {
      'BS in Computer Science and Interdisciplinary Social Sciences': 4,
      'Information Technology': 1,
    },
    'work-help-technical': { 'Information Technology': 3 },
    'work-unsure': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'concern-credits-transfer': { 'Information Technology': 1 },
    'concern-pre-transfer-courses': { 'Computer Science': 1, 'Information Technology': 1 },
    'concern-major-fit-courses': { 'Information Technology': 1, 'Computer Science': 1 },
    'concern-degree-time': { 'Information Technology': 1 },
    'concern-programming-prep': { 'Computer Science': 1, 'Information Technology': 1 },
    'concern-math-prep': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      'Computer Science and Engineering': 1,
    },
    'concern-advising-contact': { 'Information Technology': 1 },
    'concern-where-start': { 'Information Technology': 1 },
    'state-know-major': { 'Computer Science': 1 },
    'state-compare-majors': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      Cybersecurity: 1,
      'Information Technology': 1,
      'Computer Science and Engineering': 1,
    },
    'state-computing-unsure-degree': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      Cybersecurity: 1,
      'Information Technology': 1,
    },
    'state-credit-worry': { 'Information Technology': 1 },
    'state-first-exploring': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'help-lower-division-courses': {
      'Computer Science': 1,
      'Computer Science and Engineering': 1,
    },
    'help-transfer-summary': { 'Information Technology': 1 },
    'help-career-paths': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      Cybersecurity: 1,
    },
    'help-official-resources': { 'Information Technology': 1 },
    'help-advising-questions': { 'Information Technology': 1 },
  },
} satisfies QuizRecommendationConfig;

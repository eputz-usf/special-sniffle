import type { QuizRecommendationConfig } from '../utils/quizRecommendations';

export const highSchoolQuizRecommendationConfig = {
  quizVersion: 'high-school-v3',
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
      'Your answers show interest in coding, software, digital products, and analytical problem solving.',
    'Artificial Intelligence':
      'Your answers show interest in AI tools, data, patterns, and intelligent systems.',
    Cybersecurity:
      'Your answers show interest in protection, investigations, digital safety, and solving security problems.',
    'Information Technology':
      'Your answers show interest in applied technology, systems, organizations, and helping people use technology.',
    'Computer Science and Engineering':
      'Your answers show interest in hardware, robotics, smart devices, and connecting software to physical systems.',
    'BS in Computer Science and Criminology':
      'Your answers show interest in computing, digital investigations, cybercrime, public safety, and justice systems.',
    'BS in Computer Science and Interdisciplinary Social Sciences':
      'Your answers show interest in computing, people, communities, social systems, and technology’s impact on society.',
    'BS in Computer Science and Business: Accountancy and Analytics Concentration':
      'Your answers show interest in computing, business data, accounting systems, analytics, and financial decision-making.',
    'BS in Computer Science and Business: Business Analytics and Information Systems Concentration':
      'Your answers show interest in computing, business analytics, information systems, data, and organizational technology.',
    'BS in Computer Science and Business: Digital Marketing and Analytics Concentration':
      'Your answers show interest in computing, digital platforms, customer data, online behavior, and marketing analytics.',
    'BS in Computer Science and Business: Fintech Concentration':
      'Your answers show interest in computing, finance, financial technology, secure platforms, and data-driven business tools.',
    'BS in Computer Science and Business: Supply Chain Management Concentration':
      'Your answers show interest in computing, operations, logistics, business systems, and improving how organizations work.',
  },
  answerWeights: {
    software: { 'Computer Science': 3 },
    'ai-ml': { 'Artificial Intelligence': 3, 'Computer Science': 1 },
    cybersecurity: { Cybersecurity: 3 },
    hardware: { 'Computer Science and Engineering': 3 },
    data: { 'Artificial Intelligence': 2, 'Computer Science': 1 },
    'business-tech': {
      'Information Technology': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
      'BS in Computer Science and Business: Fintech Concentration': 1,
      'BS in Computer Science and Business: Supply Chain Management Concentration': 1,
    },
    'health-tech': { 'Information Technology': 2, 'Artificial Intelligence': 1 },
    'digital-investigations': {
      Cybersecurity: 3,
      'BS in Computer Science and Criminology': 3,
    },
    'digital-communities': {
      'Information Technology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 2,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
    },
    'user-experience': {
      'Computer Science': 1,
      'Information Technology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
    },
    'systems-networks': { 'Information Technology': 3, Cybersecurity: 1 },
    'apps-websites': { 'Computer Science': 3 },
    'intelligent-systems': { 'Artificial Intelligence': 3 },
    'security-problems': {
      Cybersecurity: 3,
      'BS in Computer Science and Criminology': 1,
      'BS in Computer Science and Business: Fintech Concentration': 1,
    },
    'hardware-work': { 'Computer Science and Engineering': 3 },
    patterns: {
      'Artificial Intelligence': 2,
      'Computer Science': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
    },
    'help-people': { 'Information Technology': 2 },
    projects: {
      'Information Technology': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
      'BS in Computer Science and Business: Supply Chain Management Concentration': 1,
    },
    'health-systems': { 'Information Technology': 3 },
    'investigate-digital-problem': {
      Cybersecurity: 3,
      'BS in Computer Science and Criminology': 3,
    },
    'improve-experience': {
      'Computer Science': 1,
      'Information Technology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
    },
    math: { 'Computer Science': 1, 'Artificial Intelligence': 1 },
    science: { 'Computer Science and Engineering': 1, 'Artificial Intelligence': 1 },
    technology: { 'Computer Science': 1, 'Information Technology': 1 },
    business: {
      'Information Technology': 1,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
      'BS in Computer Science and Business: Fintech Concentration': 1,
      'BS in Computer Science and Business: Supply Chain Management Concentration': 1,
    },
    'accounting-finance-subjects': {
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 2,
      'BS in Computer Science and Business: Fintech Concentration': 2,
    },
    'marketing-media-subjects': {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 2,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'operations-subjects': {
      'BS in Computer Science and Business: Supply Chain Management Concentration': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'Information Technology': 1,
    },
    'people-topics': {
      'Information Technology': 1,
      Cybersecurity: 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 2,
    },
    creativity: { 'Computer Science': 1 },
    'engineering-robotics': { 'Computer Science and Engineering': 2 },
    'health-science': { 'Information Technology': 1, 'Artificial Intelligence': 1 },
    'criminal-justice-law': {
      Cybersecurity: 2,
      'BS in Computer Science and Criminology': 3,
    },
    'writing-communication': {
      'Information Technology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
    },
    'accounting-analytics-focus': {
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 4,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'business-analytics-focus': {
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 4,
      'Information Technology': 1,
      'Artificial Intelligence': 1,
    },
    'digital-marketing-focus': {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 4,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
      'Computer Science': 1,
    },
    'fintech-focus': {
      'BS in Computer Science and Business: Fintech Concentration': 4,
      Cybersecurity: 1,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
    },
    'supply-chain-focus': {
      'BS in Computer Science and Business: Supply Chain Management Concentration': 4,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'Information Technology': 1,
    },
    'accounting-data-task': {
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 3,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'business-dashboard-task': {
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 3,
      'Information Technology': 1,
      'Artificial Intelligence': 1,
    },
    'marketing-data-task': {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 3,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'fintech-task': {
      'BS in Computer Science and Business: Fintech Concentration': 3,
      Cybersecurity: 1,
    },
    'supply-chain-task': {
      'BS in Computer Science and Business: Supply Chain Management Concentration': 3,
      'Information Technology': 1,
    },
    'enjoy-coding': { 'Computer Science': 2, 'Artificial Intelligence': 1 },
    'tried-little': { 'Computer Science': 1, 'Information Technology': 1 },
    'new-interested': { 'Information Technology': 1, 'Computer Science': 1 },
    'less-coding': {
      'Information Technology': 2,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'software-developer': { 'Computer Science': 3 },
    'ai-specialist': { 'Artificial Intelligence': 3 },
    'cyber-analyst': { Cybersecurity: 3 },
    'computer-engineer': { 'Computer Science and Engineering': 3 },
    'data-analyst': {
      'Artificial Intelligence': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
    },
    'it-specialist': { 'Information Technology': 3 },
    'experience-designer': { 'Computer Science': 1, 'Information Technology': 1 },
    'health-tech-career': { 'Information Technology': 2, 'Artificial Intelligence': 1 },
    'public-safety-tech-career': {
      Cybersecurity: 3,
      'BS in Computer Science and Criminology': 3,
    },
    'ai-often': { 'Artificial Intelligence': 1 },
    'ai-project': { 'Artificial Intelligence': 2, 'Computer Science': 1 },
    'creative-work': { 'Computer Science': 1 },
    'analytical-work': { 'Artificial Intelligence': 1, 'Computer Science': 1 },
    'helpful-work': {
      'Information Technology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'protective-work': {
      Cybersecurity: 2,
      'BS in Computer Science and Criminology': 1,
      'BS in Computer Science and Business: Fintech Concentration': 1,
    },
    'innovative-work': { 'Artificial Intelligence': 2, 'Computer Science and Engineering': 1 },
    'hands-on-work': { 'Computer Science and Engineering': 2, 'Information Technology': 1 },
    'organized-work': {
      'Information Technology': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'BS in Computer Science and Business: Supply Chain Management Concentration': 2,
    },
    'investigative-work': {
      Cybersecurity: 2,
      'BS in Computer Science and Criminology': 2,
    },
  },
} satisfies QuizRecommendationConfig;

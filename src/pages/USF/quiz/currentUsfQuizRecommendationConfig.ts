import type { QuizRecommendationConfig } from '../../../utils/quizRecommendations';

export const currentUsfQuizRecommendationConfig = {
  quizVersion: 'current-usf-v1',
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
  recommendationCount: 3,
  majorExplanations: {
    'Computer Science':
      'Your answers point toward software development, algorithms, logical problem solving, and flexible computing preparation.',
    'Artificial Intelligence':
      'Your answers point toward data, AI tools, machine learning, analytics, and model-driven technical work.',
    Cybersecurity:
      'Your answers point toward security, risk, justice, privacy, and protecting systems or data.',
    'Information Technology':
      'Your answers point toward applied technology, systems, infrastructure, business technology, and organizational support.',
    'Computer Science and Engineering':
      'Your answers point toward hardware-aware computing, devices, robotics, engineering systems, or technical integration.',
    'BS in Computer Science and Criminology':
      'Your answers point toward computing, criminology, cybersecurity, law, justice, digital evidence, or public safety.',
    'BS in Computer Science and Interdisciplinary Social Sciences':
      'Your answers point toward computing, people, communities, education, public service, or social impact.',
    'BS in Computer Science and Business: Accountancy and Analytics Concentration':
      'Your answers point toward computing, accounting systems, analytics, auditing, and financial information.',
    'BS in Computer Science and Business: Business Analytics and Information Systems Concentration':
      'Your answers point toward computing, business analytics, dashboards, databases, information systems, and organizations.',
    'BS in Computer Science and Business: Digital Marketing and Analytics Concentration':
      'Your answers point toward computing, digital media, web experiences, marketing analytics, and user behavior.',
    'BS in Computer Science and Business: Fintech Concentration':
      'Your answers point toward computing, finance, business technology, secure platforms, and financial data.',
    'BS in Computer Science and Business: Supply Chain Management Concentration':
      'Your answers point toward computing, operations, logistics, systems, infrastructure, and business process improvement.',
  },
  answerWeights: {
    MUMA_BUSINESS: {
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 3,
      'BS in Computer Science and Business: Accountancy and Analytics Concentration': 2,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 2,
      'BS in Computer Science and Business: Fintech Concentration': 2,
      'BS in Computer Science and Business: Supply Chain Management Concentration': 2,
      'Information Technology': 1,
    },
    ENGINEERING: {
      'Computer Science and Engineering': 3,
      'Computer Science': 1,
    },
    ARTS_SCIENCES: {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 2,
    },
    BEHAVIORAL_SCIENCES: {
      'BS in Computer Science and Criminology': 3,
      Cybersecurity: 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    DESIGN_ART_PERFORMANCE: {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 2,
      'Information Technology': 1,
    },
    EDUCATION: {
      'BS in Computer Science and Interdisciplinary Social Sciences': 2,
      'Information Technology': 1,
    },
    BELLINI_COMPUTING: {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      Cybersecurity: 1,
      'Information Technology': 1,
      'Computer Science and Engineering': 1,
    },
    MEDICINE: {
      'Artificial Intelligence': 2,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    NURSING: {
      'Information Technology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    PHARMACY: {
      'Artificial Intelligence': 2,
      'Information Technology': 1,
    },
    PUBLIC_HEALTH: {
      'Artificial Intelligence': 2,
      'BS in Computer Science and Interdisciplinary Social Sciences': 2,
    },
    EXPLORATORY_CURRICULUM: {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    NON_DEGREE_SEEKING: {
      'Information Technology': 1,
      'Computer Science': 1,
    },
    '0-29-credits': { 'Computer Science': 1, 'Computer Science and Engineering': 1 },
    '30-59-credits': { 'Computer Science': 1, 'Information Technology': 1 },
    '60-89-credits': { 'Information Technology': 1, Cybersecurity: 1 },
    '90-plus-credits': { 'Information Technology': 2 },
    'credits-not-sure': { 'Information Technology': 1 },
    'career-opportunities': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'enjoyed-computing-course': { 'Computer Science': 2 },
    'stronger-technical-skills': { 'Information Technology': 1, 'Computer Science': 1 },
    'current-major-not-fit': { 'Information Technology': 1, 'Computer Science': 1 },
    'combine-computing-current-field': {
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
      'BS in Computer Science and Criminology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'still-exploring': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'advisor-suggested': { 'Information Technology': 1 },
    'calculus-i': {
      'Computer Science': 2,
      'Artificial Intelligence': 2,
      'Computer Science and Engineering': 2,
    },
    'calculus-ii': {
      'Computer Science': 2,
      'Artificial Intelligence': 2,
      'Computer Science and Engineering': 2,
    },
    'college-algebra': { 'Information Technology': 1, Cybersecurity: 1 },
    statistics: {
      'Artificial Intelligence': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'introductory-programming': { 'Computer Science': 3, 'Artificial Intelligence': 1 },
    'data-analytics-research-methods': {
      'Artificial Intelligence': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
    },
    'science-lab-course': {
      'Computer Science and Engineering': 1,
      'Artificial Intelligence': 1,
    },
    'business-information-systems': {
      'Information Technology': 2,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
    },
    'general-education-courses': { 'Information Technology': 1 },
    'courses-not-sure-yet': { 'Information Technology': 1 },
    'very-little-coding': { 'Information Technology': 2 },
    'some-coding-experience': { 'Computer Science': 1, 'Information Technology': 1 },
    'comfortable-coding': { 'Computer Science': 3, 'Artificial Intelligence': 1 },
    'data-ai-tools-experience': { 'Artificial Intelligence': 2 },
    'technology-systems-experience': { 'Information Technology': 2, Cybersecurity: 1 },
    'no-ai-experience': { 'Information Technology': 1 },
    'ai-writing-study-help': { 'BS in Computer Science and Interdisciplinary Social Sciences': 1 },
    'ai-coding-help': { 'Computer Science': 1, 'Artificial Intelligence': 1 },
    'ai-data-analysis': { 'Artificial Intelligence': 3 },
    'ai-creative-work': {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 1,
    },
    'ai-work-automation': {
      'Information Technology': 1,
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 1,
    },
    'ai-ethics-security-interest': { Cybersecurity: 1, 'Artificial Intelligence': 1 },
    'coding-software-development': { 'Computer Science': 3 },
    'ai-ml-data': { 'Artificial Intelligence': 3 },
    'cybersecurity-protecting-systems': { Cybersecurity: 3 },
    'hardware-robotics-devices': { 'Computer Science and Engineering': 3 },
    'it-business-systems': { 'Information Technology': 3 },
    'web-apps-user-experience': {
      'Computer Science': 1,
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 2,
    },
    'math-logic-algorithms': { 'Computer Science': 2, 'Artificial Intelligence': 1 },
    'not-sure-topic': { 'Computer Science': 1, 'Information Technology': 1 },
    'health-medicine-public-health': {
      'Artificial Intelligence': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 2,
    },
    'business-finance-organizations': {
      'BS in Computer Science and Business: Business Analytics and Information Systems Concentration': 2,
      'BS in Computer Science and Business: Fintech Concentration': 1,
    },
    'security-law-justice': { Cybersecurity: 2, 'BS in Computer Science and Criminology': 3 },
    'science-research-engineering': {
      'Artificial Intelligence': 2,
      'Computer Science and Engineering': 1,
    },
    'education-people-community': {
      'BS in Computer Science and Interdisciplinary Social Sciences': 2,
      'Information Technology': 1,
    },
    'design-media-creative-tech': {
      'BS in Computer Science and Business: Digital Marketing and Analytics Concentration': 2,
    },
    'general-technology-career': { 'Information Technology': 2 },
    'not-sure-application': { 'Computer Science': 1, 'Information Technology': 1 },
    'solving-logical-problems': { 'Computer Science': 2, 'Artificial Intelligence': 1 },
    'building-software-people-use': { 'Computer Science': 3 },
    'finding-patterns-data': { 'Artificial Intelligence': 3 },
    'investigating-security-risk': { Cybersecurity: 3 },
    'building-connecting-systems': { 'Computer Science and Engineering': 2 },
    'managing-systems-infrastructure': { 'Information Technology': 3 },
    'people-technology-problems': {
      'Information Technology': 1,
      'BS in Computer Science and Interdisciplinary Social Sciences': 1,
    },
    'not-sure-project-style': { 'Information Technology': 1 },
    'which-bellini-majors-fit': {
      'Computer Science': 1,
      'Information Technology': 1,
      Cybersecurity: 1,
    },
    'completed-courses-count': { 'Information Technology': 1 },
    'graduation-timing': { 'Information Technology': 1 },
    'compare-bellini-majors': {
      'Computer Science': 1,
      'Artificial Intelligence': 1,
      Cybersecurity: 1,
    },
    'major-entry-requirements': { 'Computer Science': 1, 'Information Technology': 1 },
    'questions-for-advising': { 'Information Technology': 1 },
    'not-sure-advising': { 'Information Technology': 1 },
  },
} satisfies QuizRecommendationConfig;

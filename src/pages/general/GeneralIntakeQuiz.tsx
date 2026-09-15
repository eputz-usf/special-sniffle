import QuizTemplate, {
  type QuizAnswersByQuestion,
  type QuizQuestion,
} from '../../components/QuizTemplate';
import { generateQuizResult } from '../../utils/quizRecommendations';
import type { QuizRecommendationConfig } from '../../utils/quizRecommendations';

const generalIntakeQuestions: QuizQuestion[] = [
  {
    id: 'interest-area',
    eyebrow: 'Interest area',
    question: 'Which computing areas sound most interesting?',
    helperText: 'Choose the areas you want to explore first.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'software', label: 'Software and apps', description: 'Building websites, apps, games, or digital tools.', icon: 'code' },
      { id: 'ai-data', label: 'AI and data', description: 'Finding patterns, building models, or using data to make decisions.', icon: 'brain' },
      { id: 'security', label: 'Cybersecurity', description: 'Protecting systems, accounts, networks, and information.', icon: 'shield' },
      { id: 'systems', label: 'Systems and support', description: 'Keeping technology, networks, and organizations running well.', icon: 'wrench' },
      { id: 'hardware', label: 'Hardware and devices', description: 'Working with robotics, sensors, devices, or embedded systems.', icon: 'cpu' },
      { id: 'business', label: 'Business technology', description: 'Using computing to improve organizations, finance, marketing, or operations.', icon: 'briefcase' },
      { id: 'people', label: 'People and society', description: 'Studying how technology affects communities, users, and behavior.', icon: 'users' },
    ],
  },
  {
    id: 'preferred-work',
    eyebrow: 'Preferred work',
    question: 'What kind of work would you rather do?',
    helperText: 'Pick the tasks that feel most natural or interesting.',
    selectionMode: 'multiple',
    maxSelections: 3,
    answers: [
      { id: 'build-products', label: 'Build products', description: 'Create software or digital experiences people can use.', icon: 'code' },
      { id: 'analyze-patterns', label: 'Analyze patterns', description: 'Use data, logic, or models to explain what is happening.', icon: 'lightbulb' },
      { id: 'solve-security', label: 'Solve security problems', description: 'Investigate risks and protect systems from threats.', icon: 'shield' },
      { id: 'support-orgs', label: 'Support organizations', description: 'Help teams choose, manage, and improve technology.', icon: 'hands' },
      { id: 'connect-devices', label: 'Connect devices', description: 'Make software work with physical machines or electronics.', icon: 'cpu' },
      { id: 'improve-processes', label: 'Improve processes', description: 'Make business workflows, reports, or operations clearer and faster.', icon: 'briefcase' },
    ],
  },
  {
    id: 'strengths',
    eyebrow: 'Strengths',
    question: 'Which strengths describe you best?',
    helperText: 'Choose the strengths you would want to use in a degree path.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'logic', label: 'Logic and problem solving', description: 'Breaking complicated problems into steps.', icon: 'brain' },
      { id: 'creativity', label: 'Creativity and design', description: 'Making ideas clear, useful, or engaging.', icon: 'palette' },
      { id: 'detail', label: 'Detail and precision', description: 'Checking systems, numbers, or requirements carefully.', icon: 'shield' },
      { id: 'communication', label: 'Communication', description: 'Explaining ideas and helping people understand options.', icon: 'users' },
      { id: 'hands-on', label: 'Hands-on building', description: 'Testing, fixing, and improving how things work.', icon: 'wrench' },
      { id: 'planning', label: 'Planning and organization', description: 'Coordinating goals, tools, people, or next steps.', icon: 'briefcase' },
    ],
  },
];

const generalQuizRecommendationConfig: QuizRecommendationConfig = {
  quizVersion: 'general-template-v1',
  majors: [
    'Computer Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Information Technology',
    'Computer Science and Engineering',
    'Computing plus Business',
    'Computing plus Society',
  ],
  recommendationCount: 3,
  majorExplanations: {
    'Computer Science':
      'Your answers point toward building software, solving technical problems, and creating digital products.',
    'Artificial Intelligence':
      'Your answers point toward data, patterns, models, and intelligent systems.',
    Cybersecurity:
      'Your answers point toward security, risk, investigation, and careful technical analysis.',
    'Information Technology':
      'Your answers point toward applied systems, support, organizations, and practical technology use.',
    'Computer Science and Engineering':
      'Your answers point toward hardware, devices, robotics, and connecting software to physical systems.',
    'Computing plus Business':
      'Your answers point toward business systems, analytics, operations, finance, marketing, or organizational technology.',
    'Computing plus Society':
      'Your answers point toward people, communication, communities, and the social impact of technology.',
  },
  answerWeights: {
    software: { 'Computer Science': 3 },
    'ai-data': { 'Artificial Intelligence': 3, 'Computer Science': 1 },
    security: { Cybersecurity: 3 },
    systems: { 'Information Technology': 3, Cybersecurity: 1 },
    hardware: { 'Computer Science and Engineering': 3 },
    business: { 'Computing plus Business': 3, 'Information Technology': 1 },
    people: { 'Computing plus Society': 3, 'Information Technology': 1 },
    'build-products': { 'Computer Science': 3 },
    'analyze-patterns': { 'Artificial Intelligence': 2, 'Computing plus Business': 2 },
    'solve-security': { Cybersecurity: 3 },
    'support-orgs': { 'Information Technology': 3, 'Computing plus Business': 1 },
    'connect-devices': { 'Computer Science and Engineering': 3 },
    'improve-processes': { 'Computing plus Business': 3, 'Information Technology': 1 },
    logic: { 'Computer Science': 2, 'Artificial Intelligence': 1 },
    creativity: { 'Computer Science': 1, 'Computing plus Society': 1 },
    detail: { Cybersecurity: 2, 'Artificial Intelligence': 1 },
    communication: { 'Computing plus Society': 2, 'Information Technology': 1 },
    'hands-on': { 'Computer Science and Engineering': 2, 'Information Technology': 1 },
    planning: { 'Computing plus Business': 2, 'Information Technology': 1 },
  },
};

function GeneralIntakeQuiz() {
  async function handleSubmit(answersByQuestion: QuizAnswersByQuestion) {
    return {
      ...generateQuizResult(
        answersByQuestion,
        generalQuizRecommendationConfig,
        generalIntakeQuestions,
      ),
      saveStatus: 'skipped' as const,
    };
  }

  return (
    <QuizTemplate
      title="General Questionnaire"
      intro="Use this neutral template to explore broad computing interests before choosing a more specific dashboard flow."
      questions={generalIntakeQuestions}
      onSubmit={handleSubmit}
      resultsComingSoon
      backLink={{
        label: 'Back to dashboard',
        to: '/dashboard/general#intake-quiz',
      }}
    />
  );
}

export default GeneralIntakeQuiz;

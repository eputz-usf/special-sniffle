import QuizTemplate, {
  type QuizAnswersByQuestion,
  type QuizAnswerValue,
  type QuizQuestion,
} from '../../../components/QuizTemplate';
import { generateQuizResult } from '../../../utils/quizRecommendations';
import { belliniStudentQuizRecommendationConfig } from './belliniStudentQuizRecommendationConfig';
import {
  getOrCreateBelliniStudentQuizSession,
  loadBelliniStudentQuizProgress,
  saveBelliniStudentQuizProgress,
  saveBelliniStudentQuizResult,
} from './belliniStudentQuizSession';
import {
  completeBelliniStudentQuizAttempt,
  upsertBelliniStudentQuizAnswer,
  upsertBelliniStudentQuizSession,
} from './belliniStudentQuizSupabase';

const belliniStudentIntakeQuestions: QuizQuestion[] = [
  {
    id: 'bellini-current-major',
    eyebrow: 'Current major',
    question: 'What is your current Bellini College major?',
    helperText:
      'This helps frame whether you are comparing a nearby major or looking at a larger academic change.',
    answers: [
      { id: 'current-major-computer-science', label: 'Computer Science', description: 'You are currently in CS.', icon: 'code' },
      { id: 'current-major-artificial-intelligence', label: 'Artificial Intelligence', description: 'You are currently in AI.', icon: 'brain' },
      { id: 'current-major-cybersecurity', label: 'Cybersecurity', description: 'You are currently in Cybersecurity.', icon: 'shield' },
      { id: 'current-major-computer-science-engineering', label: 'Computer Science and Engineering', description: 'You are currently in CSE.', icon: 'cpu' },
      { id: 'current-major-information-technology', label: 'Information Technology', description: 'You are currently in IT.', icon: 'wrench' },
      { id: 'current-major-other-computing', label: 'Other Bellini/computing-related major', description: 'You are in another computing-related path.', icon: 'book' },
      { id: 'current-major-not-sure', label: 'I am not sure', description: 'You need to confirm your current program or catalog record.', icon: 'lightbulb' },
    ],
  },
  {
    id: 'bellini-considering-major',
    eyebrow: 'Possible destination',
    question: 'Which majors or areas are you considering now?',
    helperText:
      'Choose up to 4 options. You can still compare several programs in the results.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'considering-computer-science', label: 'Computer Science', description: 'You want to compare CS as a possible destination.', icon: 'code' },
      { id: 'considering-artificial-intelligence', label: 'Artificial Intelligence', description: 'You want to compare AI as a possible destination.', icon: 'brain' },
      { id: 'considering-cybersecurity', label: 'Cybersecurity', description: 'You want to compare Cybersecurity as a possible destination.', icon: 'shield' },
      { id: 'considering-computer-science-engineering', label: 'Computer Science and Engineering', description: 'You want to compare CSE as a possible destination.', icon: 'cpu' },
      { id: 'considering-information-technology', label: 'Information Technology', description: 'You want to compare IT as a possible destination.', icon: 'wrench' },
      { id: 'considering-multiple', label: 'I am comparing multiple Bellini majors', description: 'You need a broader comparison first.', icon: 'users' },
      { id: 'considering-not-sure', label: 'I am not sure yet', description: 'You are still narrowing your options.', icon: 'lightbulb' },
    ],
  },
  {
    id: 'bellini-switch-reason',
    eyebrow: 'Reason for comparing',
    question: 'What reasons are making you think about switching or comparing majors?',
    helperText:
      'Choose up to 4 reasons. This helps separate interest fit from requirements, grades, and timeline concerns.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'reason-another-field', label: 'I am more interested in another computing field', description: 'Your interests are shifting within computing.', icon: 'lightbulb' },
      { id: 'reason-career-goals', label: 'My current major does not match my career goals', description: 'You want the major to connect better to your target career.', icon: 'briefcase' },
      { id: 'reason-struggling-courses', label: 'I am struggling with some required courses', description: 'Course difficulty is part of the decision.', icon: 'book' },
      { id: 'reason-hands-on', label: 'I want more hands-on or applied work', description: 'You want more practical projects or applied technical work.', icon: 'wrench' },
      { id: 'reason-elective-flexibility', label: 'I want more flexibility with electives', description: 'You want more room to customize your plan.', icon: 'book' },
      { id: 'reason-graduation-timeline', label: 'I am worried about graduation timeline or requirements', description: 'You need advising to evaluate time and requirements.', icon: 'briefcase' },
      { id: 'reason-unsure-fit', label: 'I am unsure if my current major is the best fit', description: 'You need a structured comparison before deciding.', icon: 'hands' },
    ],
  },
  {
    id: 'bellini-topic-interests',
    eyebrow: 'Academic interests',
    question: 'Which topics are you most interested in building into your degree plan?',
    helperText: 'Choose up to 5 topics you want more of.',
    selectionMode: 'multiple',
    maxSelections: 5,
    answers: [
      { id: 'topic-software-development', label: 'Software development', description: 'Apps, systems, coding, and software products.', icon: 'code' },
      { id: 'topic-ai-ml', label: 'Artificial intelligence or machine learning', description: 'Models, automation, prediction, and AI systems.', icon: 'brain' },
      { id: 'topic-cybersecurity', label: 'Cybersecurity', description: 'Security, risk, privacy, and system protection.', icon: 'shield' },
      { id: 'topic-data-analytics', label: 'Data science or analytics', description: 'Using data to explain, predict, or support decisions.', icon: 'brain' },
      { id: 'topic-hardware-embedded', label: 'Computer hardware or embedded systems', description: 'Devices, circuits, hardware, and integrated systems.', icon: 'cpu' },
      { id: 'topic-networking-cloud', label: 'Networking or cloud systems', description: 'Infrastructure, networks, platforms, and cloud environments.', icon: 'wrench' },
      { id: 'topic-it-support', label: 'IT systems or technical support', description: 'Supporting users, systems, and organizations.', icon: 'hands' },
      { id: 'topic-human-centered', label: 'Human-centered technology', description: 'Technology designed around people and use cases.', icon: 'users' },
      { id: 'topic-research-advanced', label: 'Research or advanced computing', description: 'Advanced study, experimentation, or graduate-school preparation.', icon: 'book' },
    ],
  },
  {
    id: 'bellini-topics-less-of',
    eyebrow: 'Topics to reduce',
    question: 'Which topics or course types do you want less of?',
    helperText: 'Choose up to 4 areas you would prefer to reduce in your plan.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'less-heavy-programming', label: 'Heavy programming', description: 'You want less intensive coding work.', icon: 'code' },
      { id: 'less-heavy-math', label: 'Heavy math', description: 'You want fewer math-heavy requirements.', icon: 'book' },
      { id: 'less-theory-cs', label: 'Theory-heavy computer science', description: 'You want less theory and more applied work.', icon: 'lightbulb' },
      { id: 'less-hardware-engineering', label: 'Hardware, circuits, or engineering topics', description: 'You want fewer hardware or engineering topics.', icon: 'cpu' },
      { id: 'less-security', label: 'Security-focused courses', description: 'You want fewer security-focused courses.', icon: 'shield' },
      { id: 'less-ai-data', label: 'AI or data-focused courses', description: 'You want fewer AI, data, or analytics courses.', icon: 'brain' },
      { id: 'less-it-networking', label: 'IT or networking topics', description: 'You want fewer IT operations or networking topics.', icon: 'wrench' },
      { id: 'less-not-sure', label: 'I am not sure', description: 'You need more information before naming what to reduce.', icon: 'hands' },
    ],
  },
  {
    id: 'bellini-best-fit-courses',
    eyebrow: 'Course fit',
    question: 'Which courses or learning experiences have fit you best so far?',
    helperText: 'Choose up to 5 experiences that felt strongest or most interesting.',
    selectionMode: 'multiple',
    maxSelections: 5,
    answers: [
      { id: 'fit-programming', label: 'Programming courses', description: 'Coding and software assignments have fit you well.', icon: 'code' },
      { id: 'fit-math', label: 'Math courses', description: 'Math-heavy courses have fit you well.', icon: 'book' },
      { id: 'fit-ai-data', label: 'AI or data courses', description: 'AI, data, analytics, or modeling has fit you well.', icon: 'brain' },
      { id: 'fit-cybersecurity', label: 'Cybersecurity courses', description: 'Security topics have fit you well.', icon: 'shield' },
      { id: 'fit-hardware-engineering', label: 'Hardware or engineering courses', description: 'Hardware, circuits, or engineering systems have fit you well.', icon: 'cpu' },
      { id: 'fit-web-app', label: 'Web/app development courses', description: 'Web, app, or product-building work has fit you well.', icon: 'palette' },
      { id: 'fit-it-networking', label: 'IT or networking courses', description: 'Systems, networks, cloud, or IT work has fit you well.', icon: 'wrench' },
      { id: 'fit-project-based', label: 'Project-based courses', description: 'Applied projects and hands-on work have fit you well.', icon: 'hands' },
      { id: 'fit-not-enough-courses', label: 'I have not taken enough courses to know yet', description: 'You need more course experience before deciding.', icon: 'lightbulb' },
    ],
  },
  {
    id: 'bellini-career-direction',
    eyebrow: 'Career direction',
    question: 'Which career directions sound most appealing to you right now?',
    helperText: 'Choose up to 4 career directions even if you are still exploring.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'career-software-engineer', label: 'Software engineer or app developer', description: 'You want to build software, apps, or systems.', icon: 'code' },
      { id: 'career-ai-ml', label: 'AI or machine learning specialist', description: 'You want to work with models, AI systems, or automation.', icon: 'brain' },
      { id: 'career-cybersecurity-analyst', label: 'Cybersecurity analyst', description: 'You want to protect systems, data, or organizations.', icon: 'shield' },
      { id: 'career-data-scientist', label: 'Data analyst or data scientist', description: 'You want to work with data, analytics, or decision support.', icon: 'brain' },
      { id: 'career-computer-engineer', label: 'Computer engineer or embedded systems developer', description: 'You want hardware-aware or embedded computing work.', icon: 'cpu' },
      { id: 'career-it-cloud', label: 'IT specialist, network administrator, or cloud support', description: 'You want systems, networks, cloud, or support roles.', icon: 'wrench' },
      { id: 'career-product-consulting-management', label: 'Product, consulting, or technology management', description: 'You want to connect technology with teams, clients, or strategy.', icon: 'briefcase' },
      { id: 'career-not-sure', label: 'I am not sure yet', description: 'You need to compare outcomes before deciding.', icon: 'lightbulb' },
    ],
  },
  {
    id: 'bellini-technical-comfort',
    eyebrow: 'Technical comfort',
    question: 'How would you describe your comfort with the technical demands of your current major?',
    helperText:
      'Choose the option that best describes your current comfort level.',
    answers: [
      { id: 'comfort-programming-math', label: 'Very comfortable with programming and math', description: 'You feel strong in the core technical demands.', icon: 'code' },
      { id: 'comfort-programming-less-math', label: 'Comfortable with programming, but less comfortable with math', description: 'Coding fits better than math-heavy work.', icon: 'code' },
      { id: 'comfort-math-less-programming', label: 'Comfortable with math, but less comfortable with programming', description: 'Math fits better than coding-heavy work.', icon: 'book' },
      { id: 'comfort-applied-not-theory', label: 'Comfortable with applied/project work, but not theory-heavy work', description: 'Hands-on work fits better than theory.', icon: 'wrench' },
      { id: 'comfort-somewhat-uncomfortable', label: 'Somewhat uncomfortable overall', description: 'You need to talk through course fit and support.', icon: 'hands' },
      { id: 'comfort-very-uncomfortable', label: 'Very uncomfortable overall', description: 'You should evaluate options carefully with advising.', icon: 'hands' },
      { id: 'comfort-figuring-out', label: 'I am still figuring it out', description: 'You need more information before deciding.', icon: 'lightbulb' },
    ],
  },
  {
    id: 'bellini-decision-priority',
    eyebrow: 'Decision priority',
    question: 'What matters most when deciding whether to switch?',
    helperText: 'Choose up to 4 factors that should carry the most weight.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'decision-career-fit', label: 'Better career fit', description: 'You want the major to align with your work goals.', icon: 'briefcase' },
      { id: 'decision-personal-interest', label: 'Stronger personal interest', description: 'You want the subject to feel more engaging.', icon: 'lightbulb' },
      { id: 'decision-shorter-timeline', label: 'Shorter graduation timeline', description: 'You want to avoid adding time if possible.', icon: 'book' },
      { id: 'decision-less-difficulty', label: 'Less course difficulty', description: 'You want a path that feels more manageable.', icon: 'hands' },
      { id: 'decision-elective-flexibility', label: 'More elective flexibility', description: 'You want more room to customize courses.', icon: 'book' },
      { id: 'decision-salary-jobs', label: 'Better salary or job opportunities', description: 'You are prioritizing employment outcomes.', icon: 'briefcase' },
      { id: 'decision-grad-school', label: 'Better preparation for graduate school', description: 'You want research or advanced-study preparation.', icon: 'brain' },
      { id: 'decision-technical-applied-balance', label: 'Better balance between technical and applied work', description: 'You want a mix of technical depth and practical work.', icon: 'wrench' },
    ],
  },
  {
    id: 'bellini-switch-or-electives',
    eyebrow: 'Switch or explore',
    question: 'Would you rather switch majors or stay in your current major and use electives to explore another area?',
    helperText:
      'This helps distinguish a formal major-change need from an elective or concentration strategy.',
    answers: [
      { id: 'switch-want-switch', label: 'I want to switch majors', description: 'You are leaning toward a formal change.', icon: 'lightbulb' },
      { id: 'switch-stay-electives', label: 'I would prefer to stay and use electives', description: 'You may not need a formal change.', icon: 'book' },
      { id: 'switch-open-either', label: 'I am open to either option', description: 'You need to compare both paths.', icon: 'users' },
      { id: 'switch-compare-requirements', label: 'I need to compare requirements first', description: 'Requirements should drive the next step.', icon: 'book' },
      { id: 'switch-extra-courses', label: 'I need to know how many extra courses switching would add', description: 'Timeline needs official evaluation.', icon: 'briefcase' },
      { id: 'switch-not-sure', label: 'I am not sure yet', description: 'You need a guided comparison.', icon: 'hands' },
    ],
  },
  {
    id: 'bellini-timeline-position',
    eyebrow: 'Timeline check',
    question: 'Where are you in your current degree timeline?',
    helperText:
      'This is important because Bellini must evaluate whether a switch can still fit within the four-year completion rule.',
    answers: [
      { id: 'timeline-first-year', label: 'First year or early in the plan', description: 'You may have more room to compare options.', icon: 'book' },
      { id: 'timeline-second-year', label: 'Second year or around 30-59 credits', description: 'Course overlap and sequencing matter.', icon: 'book' },
      { id: 'timeline-third-year', label: 'Third year or around 60-89 credits', description: 'A switch needs close timeline review.', icon: 'briefcase' },
      { id: 'timeline-fourth-year-plus', label: 'Fourth year, 90+ credits, or close to graduation', description: 'A switch may not be approvable if it extends beyond four years.', icon: 'briefcase' },
      { id: 'timeline-not-sure', label: 'I am not sure', description: 'Check Degree Works and ask advising to evaluate your case.', icon: 'hands' },
    ],
  },
  {
    id: 'bellini-decision-help',
    eyebrow: 'Decision support',
    question: 'What would help you make a decision before talking to an advisor?',
    helperText: 'Choose up to 6 items you want the dashboard to help organize.',
    selectionMode: 'multiple',
    maxSelections: 6,
    answers: [
      { id: 'help-compare-requirements', label: 'Comparing Bellini major requirements', description: 'You want to compare requirements across majors.', icon: 'book' },
      { id: 'help-course-overlap', label: 'Seeing which completed courses overlap', description: 'You want to know what may still count.', icon: 'book' },
      { id: 'help-graduation-impact', label: 'Understanding how switching may affect graduation', description: 'You need timing and four-year-rule guidance.', icon: 'briefcase' },
      { id: 'help-career-outcomes', label: 'Comparing career outcomes', description: 'You want career direction to inform the decision.', icon: 'briefcase' },
      { id: 'help-elective-options', label: 'Reviewing elective options', description: 'You want to know if electives could solve the problem.', icon: 'lightbulb' },
      { id: 'help-next-steps', label: 'Seeing recommended next steps', description: 'You want a clear action plan.', icon: 'hands' },
      { id: 'help-advisor-questions', label: 'Preparing advisor questions', description: 'You want questions ready for advising.', icon: 'users' },
      { id: 'help-planning-report', label: 'Saving or printing a planning report', description: 'You want a record you can bring to advising.', icon: 'wrench' },
    ],
  },
];

async function handleSubmit(answersByQuestion: QuizAnswersByQuestion) {
  const quizSession = getOrCreateBelliniStudentQuizSession();
  const result = generateQuizResult(
    answersByQuestion,
    belliniStudentQuizRecommendationConfig,
    belliniStudentIntakeQuestions,
  );
  const saveStatus = await completeBelliniStudentQuizAttempt({
    sessionId: quizSession.sessionId,
    result,
  });
  const submissionResult = {
    ...result,
    saveStatus,
  };

  saveBelliniStudentQuizResult(submissionResult);

  return submissionResult;
}

function BelliniStudentIntakeQuiz() {
  const quizSession = getOrCreateBelliniStudentQuizSession();
  const savedProgress = loadBelliniStudentQuizProgress();
  const initialQuestionIndex = Math.min(
    savedProgress.currentQuestionIndex,
    belliniStudentIntakeQuestions.length - 1,
  );

  async function handleAnswerChange(
    questionId: string,
    answerValue: QuizAnswerValue,
    answersByQuestion: QuizAnswersByQuestion,
    currentQuestionIndex: number,
  ) {
    saveBelliniStudentQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });

    await upsertBelliniStudentQuizSession({
      sessionId: quizSession.sessionId,
      quizVersion: belliniStudentQuizRecommendationConfig.quizVersion,
      startedAt: quizSession.startedAt,
    });

    await upsertBelliniStudentQuizAnswer({
      sessionId: quizSession.sessionId,
      questionId,
      answerValue: Array.isArray(answerValue)
        ? JSON.stringify(answerValue)
        : answerValue,
      quizVersion: belliniStudentQuizRecommendationConfig.quizVersion,
    });
  }

  function handleQuestionIndexChange(
    currentQuestionIndex: number,
    answersByQuestion: QuizAnswersByQuestion,
  ) {
    saveBelliniStudentQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });
  }

  return (
    <QuizTemplate
      title="Current Bellini Student Intake Quiz"
      intro="Compare Bellini majors, clarify whether electives may be enough, and prepare grade, course-overlap, timeline, and advising questions before making a formal change."
      questions={belliniStudentIntakeQuestions}
      initialAnswersByQuestion={savedProgress.answersByQuestion}
      initialQuestionIndex={initialQuestionIndex}
      onAnswerChange={handleAnswerChange}
      onQuestionIndexChange={handleQuestionIndexChange}
      onSubmit={handleSubmit}
      resultsPath="/bellini-student/quiz/results"
      backLink={{
        label: 'Back to dashboard',
        to: '/dashboard/current-bellini-student#intake-quiz',
      }}
    />
  );
}

export default BelliniStudentIntakeQuiz;

import { useEffect, useMemo, useState } from 'react';
import QuizTemplate, {
  type QuizAnswersByQuestion,
  type QuizAnswerValue,
  type QuizQuestion,
} from '../../../components/QuizTemplate';
import { generateQuizResult } from '../../../utils/quizRecommendations';
import { transferQuizRecommendationConfig } from './transferQuizRecommendationConfig';
import {
  getOrCreateTransferQuizSession,
  hasTransferQuizProgress,
  loadTransferQuizProgress,
  saveTransferQuizProgress,
  saveTransferQuizResult,
} from './transferQuizSession';
import {
  completeTransferQuizAttempt,
  upsertTransferQuizAnswer,
  upsertTransferQuizSession,
} from './transferQuizSupabase';

const transferIntakeQuestions: QuizQuestion[] = [
  {
    id: 'transfer-background',
    eyebrow: 'Transfer background',
    question: 'Which transfer situation best describes you?',
    helperText:
      'This helps us understand what kind of planning context you may need.',
    answers: [
      { id: 'aa-transfer', label: 'I am completing or have completed an AA degree', description: 'I want to understand how my credits may apply toward Bellini College programs.', icon: 'book' },
      { id: 'as-transfer', label: 'I am completing or have completed an AS or technical program', description: 'I may have technical coursework that needs careful review.', icon: 'wrench' },
      { id: 'technical-credits', label: 'I have some college credits but no completed degree', description: 'I want to see which path could still fit my completed coursework.', icon: 'lightbulb' },
      { id: 'engineering-credits', label: 'I have engineering, physics, or hardware-related credits', description: 'I want to explore computing paths connected to systems or devices.', icon: 'cpu' },
      { id: 'career-change', label: 'I am changing direction into computing', description: 'I want a realistic path into technology based on my previous coursework.', icon: 'briefcase' },
    ],
  },
  {
    id: 'academic-preparation',
    eyebrow: 'Academic preparation',
    question: 'Which areas are strongest in your completed coursework?',
    helperText:
      'Select the areas where you already have coursework or meaningful experience.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'programming-strong', label: 'Programming or software development', description: 'Courses or projects in coding, software, data structures, or applications.', icon: 'code' },
      { id: 'programming-some', label: 'Some programming or technology coursework', description: 'Introductory coding, computing, or digital technology courses.', icon: 'wrench' },
      { id: 'programming-limited', label: 'Limited programming so far', description: 'I may need a path that accounts for a newer technical foundation.', icon: 'book' },
      { id: 'math-strong', label: 'Calculus, statistics, or strong math preparation', description: 'Math coursework that may support technical or AI-focused programs.', icon: 'brain' },
      { id: 'math-developing', label: 'Math is still developing', description: 'I want to understand prerequisite expectations before choosing a path.', icon: 'lightbulb' },
      { id: 'engineering-credits', label: 'Engineering, physics, hardware, or robotics', description: 'Coursework connected to devices, systems, or engineering problem solving.', icon: 'cpu' },
    ],
  },
  {
    id: 'topic-priorities',
    eyebrow: 'Program interests',
    question: 'Which technical areas do you most want to explore?',
    helperText:
      'Choose the topics that feel most relevant to your goals right now.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'software-build', label: 'Software, apps, or web systems', description: 'Building digital products, tools, platforms, or applications.', icon: 'code' },
      { id: 'ai-data', label: 'AI, machine learning, or data', description: 'Working with models, patterns, predictions, and intelligent systems.', icon: 'brain' },
      { id: 'cybersecurity', label: 'Cybersecurity', description: 'Protecting systems, networks, data, and users.', icon: 'shield' },
      { id: 'cloud-systems', label: 'Cloud, networks, or IT systems', description: 'Supporting infrastructure, databases, systems, and organizational technology.', icon: 'wrench' },
      { id: 'hardware-systems', label: 'Hardware-aware software or embedded systems', description: 'Connecting software with devices, sensors, robots, or computing systems.', icon: 'cpu' },
      { id: 'databases', label: 'Databases and information systems', description: 'Organizing, managing, and using data in applied settings.', icon: 'lightbulb' },
      { id: 'digital-forensics', label: 'Digital forensics or investigations', description: 'Investigating security events, cybercrime, or digital evidence.', icon: 'shield' },
      { id: 'user-org-tech', label: 'Technology for organizations and users', description: 'Helping teams use systems effectively and solve practical technology problems.', icon: 'users' },
    ],
  },
  {
    id: 'planning-priority',
    eyebrow: 'Planning priority',
    question: 'What matters most as you compare majors?',
    helperText:
      'Transfer planning often depends on credits, prerequisites, and timeline.',
    selectionMode: 'multiple',
    maxSelections: 3,
    answers: [
      { id: 'credit-max', label: 'Using as many completed credits as possible', description: 'I want to avoid losing time where I can.', icon: 'book' },
      { id: 'finish-fast', label: 'Finding a realistic timeline to graduation', description: 'I want a path that is ambitious but practical.', icon: 'briefcase' },
      { id: 'technical-depth', label: 'Choosing the strongest technical fit', description: 'I care more about long-term fit than the shortest route.', icon: 'brain' },
      { id: 'career-specific', label: 'Connecting directly to a career area', description: 'I want the major to clearly support a job direction.', icon: 'briefcase' },
      { id: 'graduate-school', label: 'Preparing for graduate study or research', description: 'I may want advanced study after finishing the bachelor’s degree.', icon: 'lightbulb' },
      { id: 'catalog-clarity', label: 'Understanding requirements before committing', description: 'I want clear advising before I choose a program.', icon: 'book' },
      { id: 'prereq-concern', label: 'Avoiding prerequisite surprises', description: 'I want to know what could slow down my first year after transfer.', icon: 'wrench' },
      { id: 'permit-course-concern', label: 'Understanding permits or restricted courses', description: 'I want to know which classes may need advisor approval.', icon: 'shield' },
    ],
  },
  {
    id: 'career-direction',
    eyebrow: 'Career direction',
    question: 'Which career direction sounds most aligned with your goals?',
    helperText:
      'Choose the descriptions that best match the work you may want to pursue.',
    selectionMode: 'multiple',
    maxSelections: 3,
    answers: [
      { id: 'software-engineer', label: 'Software engineer or developer', description: 'Building software products, systems, tools, or applications.', icon: 'code' },
      { id: 'ml-engineer', label: 'Machine learning or AI engineer', description: 'Working with models, data, automation, and intelligent systems.', icon: 'brain' },
      { id: 'security-analyst', label: 'Security analyst or cybersecurity specialist', description: 'Protecting systems, investigating threats, and managing risk.', icon: 'shield' },
      { id: 'systems-admin', label: 'Systems, cloud, or IT operations specialist', description: 'Supporting infrastructure, networks, users, and organizational systems.', icon: 'wrench' },
      { id: 'embedded-engineer', label: 'Embedded systems or computing systems engineer', description: 'Working where software connects to hardware, devices, or infrastructure.', icon: 'cpu' },
      { id: 'database-cloud', label: 'Database, cloud, or information systems role', description: 'Managing data, cloud services, and applied technology platforms.', icon: 'lightbulb' },
    ],
  },
];

function TransferIntakeQuiz() {
  const [quizSession] = useState(() => getOrCreateTransferQuizSession());
  const [hasSavedProgress] = useState(() => hasTransferQuizProgress());
  const [savedProgress] = useState(() => loadTransferQuizProgress());

  const initialQuestionIndex = useMemo(() => {
    if (hasSavedProgress) {
      return Math.min(
        savedProgress.currentQuestionIndex,
        transferIntakeQuestions.length - 1,
      );
    }

    const firstUnansweredIndex = transferIntakeQuestions.findIndex(
      (question) => !savedProgress.answersByQuestion[question.id],
    );

    return firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex;
  }, [hasSavedProgress, savedProgress]);

  useEffect(() => {
    async function saveSession() {
      try {
        await upsertTransferQuizSession({
          sessionId: quizSession.sessionId,
          quizVersion: transferQuizRecommendationConfig.quizVersion,
          startedAt: quizSession.startedAt,
        });
      } catch {
        // Local resume still works if Supabase is temporarily unavailable.
      }
    }

    void saveSession();
  }, [quizSession]);

  async function handleAnswerChange(
    questionId: string,
    answerValue: QuizAnswerValue,
    answersByQuestion: QuizAnswersByQuestion,
    currentQuestionIndex: number,
  ) {
    saveTransferQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });

    await upsertTransferQuizSession({
      sessionId: quizSession.sessionId,
      quizVersion: transferQuizRecommendationConfig.quizVersion,
      startedAt: quizSession.startedAt,
    });

    await upsertTransferQuizAnswer({
      sessionId: quizSession.sessionId,
      questionId,
      answerValue: Array.isArray(answerValue)
        ? JSON.stringify(answerValue)
        : answerValue,
      quizVersion: transferQuizRecommendationConfig.quizVersion,
    });
  }

  function handleQuestionIndexChange(
    currentQuestionIndex: number,
    answersByQuestion: QuizAnswersByQuestion,
  ) {
    saveTransferQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });
  }

  async function handleSubmit(answersByQuestion: QuizAnswersByQuestion) {
    const result = generateQuizResult(
      answersByQuestion,
      transferQuizRecommendationConfig,
      transferIntakeQuestions,
    );
    const saveStatus = await completeTransferQuizAttempt({
      sessionId: quizSession.sessionId,
      result,
    });

    const submissionResult = {
      ...result,
      saveStatus,
    };

    saveTransferQuizResult(submissionResult);

    return submissionResult;
  }

  return (
    <QuizTemplate
      title="Transfer intake form"
      intro="Tell us about your completed credits, technical preparation, career goals, and transfer planning priorities."
      questions={transferIntakeQuestions}
      initialAnswersByQuestion={savedProgress.answersByQuestion}
      initialQuestionIndex={initialQuestionIndex}
      onAnswerChange={handleAnswerChange}
      onQuestionIndexChange={handleQuestionIndexChange}
      onSubmit={handleSubmit}
      resultsPath="/transfer/quiz/results"
      backLink={{
        label: 'Back to dashboard',
        to: '/dashboard/transfer-student',
      }}
    />
  );
}

export default TransferIntakeQuiz;

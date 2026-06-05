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
    id: 'transfer-situation',
    eyebrow: 'Transfer situation',
    question: 'What best describes your current transfer situation?',
    helperText:
      'This helps the platform understand where you are starting from and whether you are planning from inside or outside Florida.',
    answers: [
      { id: 'community-college', label: 'I am at a Florida community or state college', description: 'I am planning from a Florida 2-year or state college transfer path.', icon: 'book' },
      { id: 'state-college', label: 'I am at another Florida university', description: 'I am currently at a Florida 4-year university and want to compare how my credits may apply.', icon: 'book' },
      { id: 'another-university', label: 'I am at an out-of-state college or university', description: 'I am outside Florida and want to compare how my credits may apply.', icon: 'briefcase' },
      { id: 'credits-not-enrolled', label: 'I have college credits but I am not currently enrolled', description: 'I may be in Florida or out of state, and I want to understand how previous credits may fit.', icon: 'lightbulb' },
      { id: 'exploring-transfer', label: 'I am still exploring whether I want to transfer', description: 'I am early in the decision process and still comparing options.', icon: 'book' },
    ],
  },
  {
    id: 'transfer-timing',
    eyebrow: 'Transfer timing',
    question: 'When are you hoping to transfer to USF?',
    helperText:
      'This helps separate students who are close to transferring from students who are still early in the planning process.',
    answers: [
      { id: 'next-semester', label: 'Next semester', description: 'I need near-term transfer planning guidance.', icon: 'briefcase' },
      { id: 'within-next-year', label: 'Within the next year', description: 'I am actively preparing to transfer soon.', icon: 'lightbulb' },
      { id: 'after-associate-degree', label: 'After I complete my associate degree', description: 'I want to plan around associate degree completion.', icon: 'book' },
      { id: 'more-than-year', label: 'In more than a year', description: 'I have time to prepare coursework and compare options.', icon: 'book' },
      { id: 'timing-not-sure', label: 'I am not sure yet', description: 'I am still figuring out the right timeline.', icon: 'lightbulb' },
    ],
  },
  {
    id: 'computing-interests',
    eyebrow: 'Computing interests',
    question: 'Which computing areas are you interested in?',
    helperText:
      'This connects your interests to Bellini College degree categories.',
    selectionMode: 'multiple',
    maxSelections: 6,
    answers: [
      { id: 'interest-software', label: 'Software, apps, or websites', description: 'Building digital tools and applications.', icon: 'code' },
      { id: 'interest-ai-data', label: 'Artificial intelligence or data', description: 'Using models, analytics, and data-driven systems.', icon: 'brain' },
      { id: 'interest-cybersecurity', label: 'Cybersecurity or digital protection', description: 'Protecting systems, accounts, networks, and data.', icon: 'shield' },
      { id: 'interest-hardware', label: 'Computer hardware, devices, or systems', description: 'Working with devices, systems, or hardware-aware computing.', icon: 'cpu' },
      { id: 'interest-it-networks', label: 'IT, networks, or technical support', description: 'Supporting infrastructure, networks, and users.', icon: 'wrench' },
      { id: 'interest-interdisciplinary', label: 'Business, criminology, social science, or another field connected with computing', description: 'Using computing in another applied field.', icon: 'users' },
      { id: 'interest-business-analytics', label: 'Business analytics or information systems', description: 'Using dashboards, databases, and data to help organizations decide what to do.', icon: 'lightbulb' },
      { id: 'interest-accounting-analytics', label: 'Accounting, auditing, or financial reports', description: 'Using computing to understand money records and business reports.', icon: 'briefcase' },
      { id: 'interest-digital-marketing', label: 'Digital marketing or customer data', description: 'Using technology to understand websites, campaigns, customers, or social media.', icon: 'palette' },
      { id: 'interest-fintech', label: 'Finance, banking, or payment technology', description: 'Using computing for banking, payments, investing, or secure financial tools.', icon: 'briefcase' },
      { id: 'interest-supply-chain', label: 'Supply chain, logistics, or operations', description: 'Using systems and data to improve inventory, shipping, and business processes.', icon: 'wrench' },
      { id: 'interest-criminology-tech', label: 'Crime, justice, or digital evidence', description: 'Using computing for cybercrime, investigations, public safety, or justice systems.', icon: 'shield' },
      { id: 'interest-social-science-tech', label: 'People, communities, or society', description: 'Using computing to study social systems, policy, behavior, or community impact.', icon: 'users' },
      { id: 'interest-not-sure', label: 'I am not sure yet', description: 'I want to compare examples before choosing.', icon: 'book' },
    ],
  },
  {
    id: 'completed-courses',
    eyebrow: 'Completed coursework',
    question: 'Which types of college courses have you already completed or are currently taking?',
    helperText:
      'This connects your academic background to transfer planning.',
    selectionMode: 'multiple',
    maxSelections: 6,
    answers: [
      { id: 'course-programming', label: 'Programming course', description: 'A course focused on coding or software basics.', icon: 'code' },
      { id: 'course-calculus', label: 'Calculus or higher-level math course', description: 'Math preparation that may support technical majors.', icon: 'brain' },
      { id: 'course-statistics-data', label: 'Statistics or data-related course', description: 'Coursework connected to data, statistics, or analysis.', icon: 'lightbulb' },
      { id: 'course-science', label: 'Science course', description: 'Science preparation that may matter for technical pathways.', icon: 'book' },
      { id: 'course-engineering', label: 'Engineering course', description: 'Engineering coursework connected to systems or design.', icon: 'cpu' },
      { id: 'course-cyber-it', label: 'Cybersecurity, networking, or IT course', description: 'Applied computing, security, networking, or support coursework.', icon: 'shield' },
      { id: 'course-interdisciplinary', label: 'Business, criminology, social science, or interdisciplinary course', description: 'Coursework that connects computing to another field.', icon: 'users' },
      { id: 'course-business-accounting', label: 'Business, accounting, finance, or marketing course', description: 'Business coursework that may connect with CS + Business options.', icon: 'briefcase' },
      { id: 'course-criminology-law', label: 'Criminology, law, or public safety course', description: 'Coursework connected to crime, justice, or investigations.', icon: 'shield' },
      { id: 'course-social-science', label: 'Psychology, sociology, policy, or social science course', description: 'Coursework about people, communities, society, or public systems.', icon: 'users' },
      { id: 'course-general-ed', label: 'General education courses', description: 'General education credits that may support graduation planning.', icon: 'book' },
      { id: 'course-no-computing', label: 'I have not taken computing-related courses yet', description: 'I may need beginner-friendly preparation guidance.', icon: 'lightbulb' },
      { id: 'course-not-sure', label: 'I am not sure which courses count', description: 'I need help identifying relevant credits.', icon: 'book' },
    ],
  },
  {
    id: 'programming-comfort',
    eyebrow: 'Programming comfort',
    question: 'How comfortable are you with programming right now?',
    helperText:
      'This helps the system give a better recommendation and preparation message.',
    answers: [
      { id: 'programming-very-comfortable', label: 'Very comfortable - I have written programs before', description: 'I have meaningful programming experience.', icon: 'code' },
      { id: 'programming-somewhat-comfortable', label: 'Somewhat comfortable - I understand the basics', description: 'I know some programming foundations.', icon: 'wrench' },
      { id: 'programming-beginner', label: 'Beginner - I have tried it but still need practice', description: 'I am still building confidence with coding.', icon: 'lightbulb' },
      { id: 'programming-not-comfortable', label: 'Not comfortable yet', description: 'Programming is currently a concern for me.', icon: 'book' },
      { id: 'programming-not-taken', label: 'I have not taken programming yet', description: 'I may need a first programming course.', icon: 'book' },
    ],
  },
  {
    id: 'math-comfort',
    eyebrow: 'Math comfort',
    question: 'How comfortable are you with math-heavy coursework?',
    helperText:
      'Some computing degrees may require more math, engineering, or theory than others.',
    answers: [
      { id: 'math-very-comfortable', label: 'Very comfortable with advanced math', description: 'I am comfortable with math-intensive coursework.', icon: 'brain' },
      { id: 'math-somewhat-comfortable', label: 'Somewhat comfortable with math', description: 'I can handle math with normal preparation.', icon: 'lightbulb' },
      { id: 'math-needs-support', label: 'I can do math, but I may need support', description: 'I want to plan for tutoring or support if needed.', icon: 'hands' },
      { id: 'math-concern', label: 'Math is one of my concerns', description: 'I want to understand math expectations carefully.', icon: 'book' },
      { id: 'math-requirements-not-sure', label: 'I am not sure what math is required', description: 'I need clarity on degree requirements.', icon: 'book' },
    ],
  },
  {
    id: 'future-work',
    eyebrow: 'Future work',
    question: 'What kind of work do you imagine yourself doing in the future?',
    helperText:
      'This connects degree fit to career direction.',
    selectionMode: 'multiple',
    maxSelections: 6,
    answers: [
      { id: 'work-build-software', label: 'Building software or apps', description: 'Creating applications, websites, systems, or tools.', icon: 'code' },
      { id: 'work-ai-data', label: 'Working with AI tools, data, or machine learning', description: 'Using data and intelligent systems to solve problems.', icon: 'brain' },
      { id: 'work-cyber-protection', label: 'Protecting systems from cyber threats', description: 'Securing systems, accounts, networks, or data.', icon: 'shield' },
      { id: 'work-networks-systems', label: 'Managing networks or technology systems', description: 'Keeping infrastructure and systems running.', icon: 'wrench' },
      { id: 'work-hardware', label: 'Designing or understanding computer hardware', description: 'Working with devices, embedded systems, or hardware-aware software.', icon: 'cpu' },
      { id: 'work-applied-computing', label: 'Using computing in business, crime, society, health, or another field', description: 'Applying computing to a field outside pure technology.', icon: 'users' },
      { id: 'work-business-data', label: 'Using business data to make decisions', description: 'Working with reports, dashboards, databases, or business systems.', icon: 'lightbulb' },
      { id: 'work-financial-tech', label: 'Working with financial technology', description: 'Building or analyzing secure tools for banking, payments, or finance.', icon: 'briefcase' },
      { id: 'work-marketing-tech', label: 'Working with marketing or customer data', description: 'Understanding digital campaigns, online behavior, or customer patterns.', icon: 'palette' },
      { id: 'work-operations-tech', label: 'Improving logistics or operations', description: 'Using systems and data to improve inventory, transportation, and business processes.', icon: 'wrench' },
      { id: 'work-digital-evidence', label: 'Investigating digital evidence', description: 'Using computing to understand cybercrime, evidence, or public safety problems.', icon: 'shield' },
      { id: 'work-social-impact-tech', label: 'Using technology for people or communities', description: 'Applying computing to social systems, policy, research, or community impact.', icon: 'users' },
      { id: 'work-help-technical', label: 'Helping people solve technical problems', description: 'Supporting users, teams, or organizations with technology.', icon: 'hands' },
      { id: 'work-unsure', label: 'I am still unsure', description: 'I want recommendations to help narrow my direction.', icon: 'book' },
    ],
  },
  {
    id: 'transfer-concerns',
    eyebrow: 'Transfer concerns',
    question: 'What are your biggest transfer planning concerns?',
    helperText:
      'This helps personalize your final result and next steps.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      { id: 'concern-credits-transfer', label: 'Whether my credits will transfer', description: 'I need clarity on credit applicability.', icon: 'book' },
      { id: 'concern-pre-transfer-courses', label: 'Which courses I should take before transferring', description: 'I want to choose useful courses now.', icon: 'lightbulb' },
      { id: 'concern-major-fit-courses', label: 'Which major fits the courses I already have', description: 'I want a major that fits my completed coursework.', icon: 'briefcase' },
      { id: 'concern-degree-time', label: 'How long the degree may take after I transfer', description: 'I want a realistic timeline after transferring.', icon: 'wrench' },
      { id: 'concern-programming-prep', label: 'Whether I am prepared for programming', description: 'I want to know if my coding foundation is enough.', icon: 'code' },
      { id: 'concern-math-prep', label: 'Whether I am prepared for math', description: 'I want to understand math readiness.', icon: 'brain' },
      { id: 'concern-advising-contact', label: 'Who I should contact for advising', description: 'I need the right next contact.', icon: 'hands' },
      { id: 'concern-where-start', label: 'I am not sure where to start', description: 'I need a simple starting point.', icon: 'book' },
    ],
  },
  {
    id: 'current-statement',
    eyebrow: 'Planning state and next steps',
    question: 'Which statements sound most like you right now?',
    helperText:
      'Choose up to 5. This helps decide whether you should go next to degree comparison, course planning, advising questions, official resources, or saved next steps.',
    selectionMode: 'multiple',
    maxSelections: 5,
    answers: [
      { id: 'state-know-major', label: 'I know the major I want and need help planning the transfer path', description: 'I need planning steps for a chosen major.', icon: 'briefcase' },
      { id: 'state-compare-majors', label: 'I have a few majors in mind and want to compare them', description: 'I need side-by-side degree comparison.', icon: 'lightbulb' },
      { id: 'state-computing-unsure-degree', label: 'I know I like computing but I am unsure which degree fits', description: 'I need help connecting interests to majors.', icon: 'brain' },
      { id: 'state-credit-worry', label: 'I am mainly worried about how my credits will apply', description: 'Credit applicability is my main concern.', icon: 'book' },
      { id: 'state-first-exploring', label: 'I am exploring USF and Bellini College for the first time', description: 'I need a broad introduction to options.', icon: 'book' },
      { id: 'help-lower-division-courses', label: 'I want to review common lower-division courses', description: 'I want to understand early course patterns.', icon: 'book' },
      { id: 'help-transfer-summary', label: 'I want a transfer planning summary', description: 'I want a saved summary of my next steps.', icon: 'briefcase' },
      { id: 'help-career-paths', label: 'I want to see career paths for my recommended major', description: 'I want to connect the major to future work.', icon: 'wrench' },
      { id: 'help-official-resources', label: 'I want official USF transfer resources', description: 'I want official requirements and resources.', icon: 'book' },
      { id: 'help-advising-questions', label: 'I want to prepare questions for advising', description: 'I want to know what to ask next.', icon: 'hands' },
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
      intro="Tell us about your transfer situation, completed coursework, technical preparation, career goals, and planning priorities."
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

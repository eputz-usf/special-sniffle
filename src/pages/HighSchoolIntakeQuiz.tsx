import { useEffect, useMemo, useState } from 'react';
import QuizTemplate, { type QuizQuestion } from '../components/QuizTemplate';
import { generateHighSchoolQuizResult } from '../utils/highSchoolQuizRecommendations';
import {
  getOrCreatePublicQuizSession,
  hasPublicQuizProgress,
  loadPublicQuizProgress,
  savePublicQuizProgress,
  savePublicQuizResult,
} from '../utils/publicQuizSession';
import {
  completePublicQuizAttempt,
  upsertPublicQuizAnswer,
  upsertPublicQuizSession,
} from '../utils/publicQuizSupabase';

const highSchoolIntakeQuestions: QuizQuestion[] = [
  {
    id: 'college-search-stage',
    eyebrow: 'College search stage',
    question: 'Where are you in your college search?',
    helperText:
      'This helps shape the next steps around where you are right now.',
    answers: [
      {
        id: 'freshman-sophomore',
        label: 'High school freshman/sophomore',
        description: 'I am starting early and exploring what computing can be.',
        icon: 'book',
      },
      {
        id: 'junior',
        label: 'High school junior',
        description: 'I am starting to compare colleges, majors, and interests.',
        icon: 'lightbulb',
      },
      {
        id: 'senior',
        label: 'High school senior',
        description: 'I am thinking about applications, decisions, or next steps.',
        icon: 'briefcase',
      },
      {
        id: 'gap-year',
        label: 'Gap year / exploring options',
        description: 'I am taking time to learn more before choosing a direction.',
        icon: 'wrench',
      },
      {
        id: 'family-member',
        label: 'Parent or family member exploring with a student',
        description: 'I am helping a student understand their options.',
        icon: 'hands',
      },
    ],
  },
  {
    id: 'topic-interests',
    eyebrow: 'Topic interests',
    question: 'Which topics sound most interesting to you?',
    helperText:
      'Pick the topic that catches your attention most today. This can change later.',
    answers: [
      {
        id: 'software',
        label: 'Coding and building software',
        description: 'Apps, websites, tools, and programs people use.',
        icon: 'code',
      },
      {
        id: 'ai-ml',
        label: 'Artificial intelligence and machine learning',
        description: 'Systems that learn, predict, generate, or automate tasks.',
        icon: 'brain',
      },
      {
        id: 'cybersecurity',
        label: 'Cybersecurity and protecting systems',
        description: 'Keeping data, accounts, and organizations safer.',
        icon: 'shield',
      },
      {
        id: 'hardware',
        label: 'Computer hardware and devices',
        description: 'Computers, circuits, sensors, devices, and connected systems.',
        icon: 'cpu',
      },
      {
        id: 'data',
        label: 'Data and problem solving',
        description: 'Finding patterns and using information to make decisions.',
        icon: 'lightbulb',
      },
      {
        id: 'business-tech',
        label: 'Technology for business or organizations',
        description: 'Using systems to help teams, companies, or communities work.',
        icon: 'briefcase',
      },
      {
        id: 'not-sure',
        label: 'Not sure yet',
        description: 'I want to see examples before choosing a topic.',
        icon: 'book',
      },
    ],
  },
  {
    id: 'work-style',
    eyebrow: 'Work style',
    question: 'What kind of work sounds most exciting?',
    helperText:
      'Think about the kind of problem you would enjoy spending time on.',
    answers: [
      {
        id: 'apps-websites',
        label: 'Building apps or websites',
        description: 'Creating digital tools and experiences people can use.',
        icon: 'code',
      },
      {
        id: 'intelligent-systems',
        label: 'Training intelligent systems',
        description: 'Working with models, data, and automated decisions.',
        icon: 'brain',
      },
      {
        id: 'security-problems',
        label: 'Solving security problems',
        description: 'Finding risks and helping protect systems.',
        icon: 'shield',
      },
      {
        id: 'hardware-work',
        label: 'Designing or working with hardware',
        description: 'Connecting software to devices, machines, or electronics.',
        icon: 'cpu',
      },
      {
        id: 'patterns',
        label: 'Analyzing information and patterns',
        description: 'Using data to understand what is happening and why.',
        icon: 'lightbulb',
      },
      {
        id: 'help-people',
        label: 'Helping people use technology better',
        description: 'Supporting users, teams, and organizations with tech.',
        icon: 'hands',
      },
      {
        id: 'projects',
        label: 'Managing technology projects',
        description: 'Planning, organizing, and guiding technical work.',
        icon: 'briefcase',
      },
    ],
  },
  {
    id: 'favorite-subjects',
    eyebrow: 'Favorite subjects',
    question: 'Which school subjects do you enjoy most?',
    helperText:
      'Your favorite subjects can point toward different ways to explore computing.',
    answers: [
      {
        id: 'math',
        label: 'Math',
        description: 'Numbers, logic, formulas, and structured problem solving.',
        icon: 'brain',
      },
      {
        id: 'science',
        label: 'Science',
        description: 'Experiments, systems, and understanding how things work.',
        icon: 'lightbulb',
      },
      {
        id: 'technology',
        label: 'Technology / computer classes',
        description: 'Coding, tools, devices, or digital projects.',
        icon: 'code',
      },
      {
        id: 'business',
        label: 'Business',
        description: 'Organizations, strategy, products, and decision making.',
        icon: 'briefcase',
      },
      {
        id: 'people-topics',
        label: 'Social studies / people-focused topics',
        description: 'Communities, behavior, society, and human needs.',
        icon: 'users',
      },
      {
        id: 'creativity',
        label: 'Art / design / creativity',
        description: 'Visual thinking, design, stories, and creative problem solving.',
        icon: 'palette',
      },
      {
        id: 'figuring-out',
        label: 'I am still figuring it out',
        description: 'I want to explore before naming a favorite area.',
        icon: 'book',
      },
    ],
  },
  {
    id: 'coding-comfort',
    eyebrow: 'Coding comfort',
    question: 'How do you feel about coding right now?',
    helperText:
      'You do not need to be experienced already. This just helps match the starting point.',
    answers: [
      {
        id: 'enjoy-coding',
        label: 'I already enjoy coding',
        description: 'I have tried it and want to keep building skills.',
        icon: 'code',
      },
      {
        id: 'tried-little',
        label: 'I have tried it a little',
        description: 'I know some basics and want to learn more.',
        icon: 'wrench',
      },
      {
        id: 'new-interested',
        label: 'I am interested but new to it',
        description: 'I am curious, but I would need a beginner-friendly start.',
        icon: 'lightbulb',
      },
      {
        id: 'unsure-coding',
        label: 'I am unsure if I would like it',
        description: 'I want to understand what coding actually feels like first.',
        icon: 'book',
      },
      {
        id: 'less-coding',
        label: 'I prefer technology but not heavy coding',
        description: 'I like tech, systems, or people-focused work more than coding.',
        icon: 'hands',
      },
    ],
  },
  {
    id: 'math-comfort',
    eyebrow: 'Math comfort',
    question: 'How do you feel about math-heavy courses?',
    helperText:
      'This helps separate paths that use more theory from paths that may feel more applied.',
    answers: [
      {
        id: 'enjoy-math',
        label: 'I enjoy math',
        description: 'I like quantitative problem solving and structured thinking.',
        icon: 'brain',
      },
      {
        id: 'purpose-math',
        label: 'I am okay with math if I understand the purpose',
        description: 'Math works best for me when it connects to real problems.',
        icon: 'lightbulb',
      },
      {
        id: 'less-math',
        label: 'I prefer less math-heavy paths',
        description: 'I would rather focus on applied technology and systems.',
        icon: 'wrench',
      },
      {
        id: 'unsure-math',
        label: 'I am unsure',
        description: 'I want to learn how math shows up in different majors.',
        icon: 'book',
      },
    ],
  },
  {
    id: 'career-curiosity',
    eyebrow: 'Career curiosity',
    question: 'Which future career sounds most interesting?',
    helperText:
      'This is only a starting point. You can be interested in more than one area.',
    answers: [
      {
        id: 'software-developer',
        label: 'Software developer',
        description: 'Build applications, websites, platforms, or software tools.',
        icon: 'code',
      },
      {
        id: 'ai-specialist',
        label: 'AI / machine learning specialist',
        description: 'Work with models, automation, data, and intelligent systems.',
        icon: 'brain',
      },
      {
        id: 'cyber-analyst',
        label: 'Cybersecurity analyst',
        description: 'Protect systems, investigate risks, and improve security.',
        icon: 'shield',
      },
      {
        id: 'computer-engineer',
        label: 'Computer engineer',
        description: 'Work with hardware, software, devices, and embedded systems.',
        icon: 'cpu',
      },
      {
        id: 'data-analyst',
        label: 'Data analyst',
        description: 'Use information to find patterns and support decisions.',
        icon: 'lightbulb',
      },
      {
        id: 'it-specialist',
        label: 'IT systems specialist',
        description: 'Help organizations run, support, and improve technology.',
        icon: 'wrench',
      },
      {
        id: 'tech-consultant',
        label: 'Technology consultant or project manager',
        description: 'Help teams choose, plan, and deliver technology solutions.',
        icon: 'briefcase',
      },
      {
        id: 'not-sure-career',
        label: 'I am not sure yet',
        description: 'I want to learn what these careers actually do first.',
        icon: 'book',
      },
    ],
  },
  {
    id: 'decision-confidence',
    eyebrow: 'Decision confidence',
    question: 'How confident are you about choosing a computing major?',
    helperText:
      'This helps decide whether the next step should be comparison, examples, or broad exploration.',
    answers: [
      {
        id: 'clear-favorite',
        label: 'I have a clear favorite',
        description: 'I mostly want to confirm details and next steps.',
        icon: 'lightbulb',
      },
      {
        id: 'few-options',
        label: 'I am deciding between a few options',
        description: 'I want to compare paths side by side.',
        icon: 'book',
      },
      {
        id: 'computing-unsure',
        label: 'I am interested in computing but unsure which major',
        description: 'I know the general area but need help narrowing it down.',
        icon: 'cpu',
      },
      {
        id: 'starting',
        label: 'I am just starting to explore',
        description: 'I need beginner-friendly examples and explanations.',
        icon: 'hands',
      },
    ],
  },
  {
    id: 'programs-to-compare',
    eyebrow: 'Programs to compare',
    question: 'Are there any programs you already want to compare?',
    helperText:
      'Pick the program you most want to understand first. Future versions can support multiple selections.',
    answers: [
      {
        id: 'computer-science',
        label: 'Computer Science',
        description: 'Software, systems, algorithms, and broad computing foundations.',
        icon: 'code',
      },
      {
        id: 'artificial-intelligence',
        label: 'Artificial Intelligence',
        description: 'Machine learning, data, models, and intelligent systems.',
        icon: 'brain',
      },
      {
        id: 'cybersecurity-program',
        label: 'Cybersecurity',
        description: 'Security, risk, networks, and protecting information.',
        icon: 'shield',
      },
      {
        id: 'information-technology',
        label: 'Information Technology',
        description: 'Technology systems, support, infrastructure, and organizations.',
        icon: 'wrench',
      },
      {
        id: 'computer-engineering-program',
        label: 'Computer Engineering',
        description: 'Hardware, software, embedded systems, and devices.',
        icon: 'cpu',
      },
      {
        id: 'do-not-know',
        label: 'I do not know yet',
        description: 'I want the platform to help me find a good starting list.',
        icon: 'book',
      },
    ],
  },
];

function HighSchoolIntakeQuiz() {
  const [quizSession] = useState(() => getOrCreatePublicQuizSession());
  const [hasSavedProgress] = useState(() => hasPublicQuizProgress());
  const [savedProgress] = useState(() => loadPublicQuizProgress());

  const initialQuestionIndex = useMemo(() => {
    if (hasSavedProgress) {
      return Math.min(
        savedProgress.currentQuestionIndex,
        highSchoolIntakeQuestions.length - 1,
      );
    }

    const firstUnansweredIndex = highSchoolIntakeQuestions.findIndex(
      (question) => !savedProgress.answersByQuestion[question.id],
    );

    return firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex;
  }, [hasSavedProgress, savedProgress]);

  useEffect(() => {
    async function saveSession() {
      try {
        await upsertPublicQuizSession({
          sessionId: quizSession.sessionId,
          userGroup: 'prospective',
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
    answerId: string,
    answersByQuestion: Record<string, string>,
    currentQuestionIndex: number,
  ) {
    savePublicQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });

    await upsertPublicQuizSession({
      sessionId: quizSession.sessionId,
      userGroup: 'prospective',
      startedAt: quizSession.startedAt,
    });

    await upsertPublicQuizAnswer({
      sessionId: quizSession.sessionId,
      questionId,
      answerValue: answerId,
    });
  }

  function handleQuestionIndexChange(
    currentQuestionIndex: number,
    answersByQuestion: Record<string, string>,
  ) {
    savePublicQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });
  }

  async function handleSubmit(answersByQuestion: Record<string, string>) {
    const result = generateHighSchoolQuizResult(answersByQuestion);
    const saveStatus = await completePublicQuizAttempt({
      sessionId: quizSession.sessionId,
      result,
    });

    const submissionResult = {
      ...result,
      saveStatus,
    };

    savePublicQuizResult(submissionResult);

    return submissionResult;
  }

  return (
    <QuizTemplate
      title="Intake form"
      intro="Tell us what you like, where you are in your college search, and which computing paths you want to explore."
      questions={highSchoolIntakeQuestions}
      initialAnswersByQuestion={savedProgress.answersByQuestion}
      initialQuestionIndex={initialQuestionIndex}
      onAnswerChange={handleAnswerChange}
      onQuestionIndexChange={handleQuestionIndexChange}
      onSubmit={handleSubmit}
      resultsPath="/quiz/results"
      backLink={{
        label: 'Back to dashboard',
        to: '/dashboard/prospective-student',
      }}
    />
  );
}

export default HighSchoolIntakeQuiz;

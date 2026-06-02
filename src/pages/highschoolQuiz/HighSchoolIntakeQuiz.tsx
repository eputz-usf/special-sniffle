import { useEffect, useMemo, useState } from 'react';
import QuizTemplate, {
  type QuizAnswersByQuestion,
  type QuizAnswerValue,
  type QuizQuestion,
} from '../../components/QuizTemplate';
import { generateHighSchoolQuizResult } from '../../utils/highSchoolQuizRecommendations';
import { highSchoolQuizRecommendationConfig } from '../../config/highSchoolQuizRecommendationConfig';
import {
  getOrCreatePublicQuizSession,
  hasPublicQuizProgress,
  loadPublicQuizProgress,
  savePublicQuizProgress,
  savePublicQuizResult,
} from '../../utils/publicQuizSession';
import {
  completePublicQuizAttempt,
  upsertPublicQuizAnswer,
  upsertPublicQuizSession,
} from '../../utils/publicQuizSupabase';

const highSchoolIntakeQuestions: QuizQuestion[] = [
  {
    id: 'college-search-stage',
    eyebrow: 'College search stage',
    question: 'Where are you in your college search?',
    helperText: 'Choose the option that best describes where you are right now.',
    answers: [
      { id: 'freshman-sophomore', label: 'I am a high school freshman or sophomore', description: 'I am just starting to explore college and majors.', icon: 'book' },
      { id: 'junior', label: 'I am a high school junior', description: 'I am starting to compare colleges, majors, and careers.', icon: 'lightbulb' },
      { id: 'senior', label: 'I am a high school senior', description: 'I am thinking about applications, decisions, or next steps.', icon: 'briefcase' },
      { id: 'gap-year', label: 'I am taking a gap year or exploring options', description: 'I want to learn more before choosing a direction.', icon: 'wrench' },
      { id: 'family-member', label: 'I am a parent or family member helping a student', description: 'I am helping someone understand their college options.', icon: 'hands' },
    ],
  },
  {
    id: 'favorite-subjects',
    eyebrow: 'Favorite subjects',
    question: 'Which school subjects do you enjoy most?',
    helperText: 'Your favorite subjects can point toward different ways to explore computing.',
    selectionMode: 'multiple',
    maxSelections: 5,
    answers: [
      { id: 'math', label: 'Math', description: 'Logic, numbers, formulas, and problem solving.', icon: 'brain' },
      { id: 'science', label: 'Science', description: 'Experiments, systems, and understanding how things work.', icon: 'lightbulb' },
      { id: 'technology', label: 'Computer science or technology classes', description: 'Coding, digital tools, devices, or tech projects.', icon: 'code' },
      { id: 'engineering-robotics', label: 'Engineering or robotics', description: 'Building, testing, fixing, or designing things.', icon: 'cpu' },
      { id: 'health-science', label: 'Health science or biology', description: 'The human body, medicine, health, or life science.', icon: 'hands' },
      { id: 'business', label: 'Business or entrepreneurship', description: 'Products, companies, leadership, money, or strategy.', icon: 'briefcase' },
      { id: 'people-topics', label: 'Psychology or sociology', description: 'People, behavior, communities, and society.', icon: 'users' },
      { id: 'criminal-justice-law', label: 'Criminal justice or law', description: 'Rules, safety, crime, investigations, or legal systems.', icon: 'shield' },
      { id: 'creativity', label: 'Art, design, or media', description: 'Creativity, visuals, stories, or communication.', icon: 'palette' },
      { id: 'writing-communication', label: 'English, writing, or communication', description: 'Explaining ideas, writing clearly, or presenting information.', icon: 'book' },
      { id: 'figuring-out', label: 'I am still figuring it out', description: 'I do not have one favorite subject yet.', icon: 'book' },
    ],
  },
  {
    id: 'topic-interests',
    eyebrow: 'Topic interests',
    question: 'Which topics sound interesting to you?',
    helperText: 'Choose the topics that catch your attention most today. This can change later.',
    selectionMode: 'multiple',
    maxSelections: 5,
    answers: [
      { id: 'software', label: 'Building apps, websites, or games', description: 'Creating digital tools people can use.', icon: 'code' },
      { id: 'ai-ml', label: 'Artificial intelligence', description: 'Teaching computers to recognize patterns, answer questions, or make predictions.', icon: 'brain' },
      { id: 'cybersecurity', label: 'Cybersecurity', description: 'Protecting accounts, systems, networks, and private information.', icon: 'shield' },
      { id: 'data', label: 'Data and patterns', description: 'Using information to understand problems and make decisions.', icon: 'lightbulb' },
      { id: 'hardware', label: 'Robots, smart devices, or sensors', description: 'Connecting software to machines, devices, or electronics.', icon: 'cpu' },
      { id: 'health-tech', label: 'Health and medical technology', description: 'Using technology to support doctors, patients, hospitals, or health research.', icon: 'hands' },
      { id: 'business-tech', label: 'Business and technology', description: 'Using technology to help companies, teams, or organizations work better.', icon: 'briefcase' },
      { id: 'digital-investigations', label: 'Crime, justice, and digital investigations', description: 'Using computing to understand cybercrime, digital evidence, or public safety.', icon: 'shield' },
      { id: 'digital-communities', label: 'Social media, online behavior, or digital communities', description: 'Understanding how people use technology and how it affects society.', icon: 'users' },
      { id: 'user-experience', label: 'Design, creativity, or user experience', description: 'Making technology easier, clearer, and more enjoyable to use.', icon: 'palette' },
      { id: 'systems-networks', label: 'Networks, cloud, or computer systems', description: 'Understanding how computers, servers, and the internet work together.', icon: 'wrench' },
      { id: 'not-sure', label: 'I am not sure yet', description: 'I want to see examples before choosing.', icon: 'book' },
    ],
  },
  {
    id: 'interesting-tasks',
    eyebrow: 'Interesting tasks',
    question: 'What kind of task sounds interesting to you?',
    helperText: 'Choose the tasks you would most enjoy spending time on.',
    selectionMode: 'multiple',
    maxSelections: 3,
    answers: [
      { id: 'apps-websites', label: 'Build a website or app for students', description: 'For example, a tool that helps students compare majors.', icon: 'code' },
      { id: 'intelligent-systems', label: 'Train an AI tool to recognize patterns', description: 'For example, helping a computer predict what users may need.', icon: 'brain' },
      { id: 'security-problems', label: 'Find and fix a security problem', description: 'For example, protecting an account, website, or school system.', icon: 'shield' },
      { id: 'patterns', label: 'Look at data and explain what it means', description: 'For example, finding trends in student success, health, or business data.', icon: 'lightbulb' },
      { id: 'hardware-work', label: 'Connect software to a device or robot', description: 'For example, making a robot, sensor, or smart device respond correctly.', icon: 'cpu' },
      { id: 'health-systems', label: 'Help a hospital or clinic use technology better', description: 'For example, improving patient records, scheduling, or health data systems.', icon: 'hands' },
      { id: 'investigate-digital-problem', label: 'Investigate a digital problem', description: 'For example, tracing suspicious activity or understanding digital evidence.', icon: 'shield' },
      { id: 'improve-experience', label: 'Improve how a technology looks or feels', description: 'For example, making an app easier for people to use.', icon: 'palette' },
      { id: 'projects', label: 'Help a company choose the right technology', description: 'For example, recommending tools, systems, or software for a team.', icon: 'briefcase' },
      { id: 'help-people', label: 'Keep computer systems running smoothly', description: 'For example, helping with networks, servers, accounts, or devices.', icon: 'wrench' },
    ],
  },
  {
    id: 'career-curiosity',
    eyebrow: 'Career curiosity',
    question: 'Which job description sounds most interesting?',
    helperText: 'Choose the descriptions that sound closest to work you may enjoy.',
    selectionMode: 'multiple',
    maxSelections: 3,
    answers: [
      { id: 'software-developer', label: 'Someone who builds software', description: 'Creates apps, websites, tools, and programs people use.', icon: 'code' },
      { id: 'ai-specialist', label: 'Someone who works with AI', description: 'Builds or improves systems that can learn, predict, or generate answers.', icon: 'brain' },
      { id: 'cyber-analyst', label: 'Someone who protects technology', description: 'Helps keep accounts, networks, companies, and data safe.', icon: 'shield' },
      { id: 'data-analyst', label: 'Someone who works with data', description: 'Finds patterns and explains what the information means.', icon: 'lightbulb' },
      { id: 'computer-engineer', label: 'Someone who works with hardware and software together', description: 'Builds or improves devices, smart systems, or computer-based machines.', icon: 'cpu' },
      { id: 'it-specialist', label: 'Someone who supports technology in organizations', description: 'Helps schools, hospitals, businesses, or teams use technology successfully.', icon: 'wrench' },
      { id: 'experience-designer', label: 'Someone who designs better digital experiences', description: 'Makes websites, apps, or systems easier for people to understand and use.', icon: 'palette' },
      { id: 'health-tech-career', label: 'Someone who works with technology in medicine or health', description: 'Uses computing to support health care, patients, or medical research.', icon: 'hands' },
      { id: 'public-safety-tech-career', label: 'Someone who works with technology and crime/public safety', description: 'Uses computing to study cybercrime, digital evidence, or security problems.', icon: 'shield' },
      { id: 'not-sure-career', label: 'I do not know yet', description: 'I want to learn what these jobs actually do.', icon: 'book' },
    ],
  },
  {
    id: 'ai-experience',
    eyebrow: 'AI experience',
    question: 'What experience do you have with AI?',
    helperText: 'Choose the option that best describes your experience right now.',
    answers: [
      { id: 'ai-often', label: 'I use AI tools often', description: 'For example, ChatGPT, image generators, coding tools, or study tools.', icon: 'brain' },
      { id: 'ai-sometimes', label: 'I have tried AI tools a few times', description: 'I know what they are, but I am still learning how they work.', icon: 'lightbulb' },
      { id: 'ai-heard-about', label: 'I have heard about AI but have not used it much', description: 'I am curious but still new to it.', icon: 'book' },
      { id: 'ai-project', label: 'I have worked on an AI-related project before', description: 'For example, a class project, coding project, research activity, or club project.', icon: 'code' },
      { id: 'ai-new', label: 'I am not really familiar with AI yet', description: 'I would need a beginner-friendly explanation.', icon: 'book' },
    ],
  },
  {
    id: 'coding-comfort',
    eyebrow: 'Coding comfort',
    question: 'How do you feel about coding right now?',
    helperText: 'You do not need experience already. This helps match the starting point.',
    answers: [
      { id: 'enjoy-coding', label: 'I already enjoy coding', description: 'I have tried it and want to keep learning.', icon: 'code' },
      { id: 'tried-little', label: 'I have tried coding a little', description: 'I know some basics, but I am still a beginner.', icon: 'wrench' },
      { id: 'new-interested', label: 'I am interested but new to coding', description: 'I want a beginner-friendly place to start.', icon: 'lightbulb' },
      { id: 'unsure-coding', label: 'I am unsure if I would like coding', description: 'I want to understand what coding is actually like.', icon: 'book' },
      { id: 'less-coding', label: 'I like technology, but I may prefer less coding', description: 'I may enjoy systems, support, design, business, or people-focused tech work.', icon: 'hands' },
    ],
  },
  {
    id: 'future-work-style',
    eyebrow: 'Future work style',
    question: 'What do you want your future work to feel like?',
    helperText: 'Choose the qualities that matter most to you.',
    selectionMode: 'multiple',
    maxSelections: 3,
    answers: [
      { id: 'creative-work', label: 'Creative', description: 'I want to build, design, or make new things.', icon: 'palette' },
      { id: 'analytical-work', label: 'Analytical', description: 'I want to solve problems and understand patterns.', icon: 'brain' },
      { id: 'helpful-work', label: 'Helpful', description: 'I want to support people, teams, or communities.', icon: 'hands' },
      { id: 'protective-work', label: 'Protective', description: 'I want to keep people, systems, or information safe.', icon: 'shield' },
      { id: 'innovative-work', label: 'Innovative', description: 'I want to work with new technology like AI or smart systems.', icon: 'lightbulb' },
      { id: 'hands-on-work', label: 'Hands-on', description: 'I want to build, test, fix, or connect systems.', icon: 'wrench' },
      { id: 'organized-work', label: 'Organized', description: 'I want to plan projects, manage systems, or improve processes.', icon: 'briefcase' },
      { id: 'investigative-work', label: 'Investigative', description: 'I want to figure out what happened and solve digital problems.', icon: 'shield' },
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
          userGroup: 'high-school',
          quizVersion: highSchoolQuizRecommendationConfig.quizVersion,
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
    savePublicQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });

    await upsertPublicQuizSession({
      sessionId: quizSession.sessionId,
      userGroup: 'high-school',
      quizVersion: highSchoolQuizRecommendationConfig.quizVersion,
      startedAt: quizSession.startedAt,
    });

    await upsertPublicQuizAnswer({
      sessionId: quizSession.sessionId,
      questionId,
      answerValue: Array.isArray(answerValue)
        ? JSON.stringify(answerValue)
        : answerValue,
      quizVersion: highSchoolQuizRecommendationConfig.quizVersion,
    });
  }

  function handleQuestionIndexChange(
    currentQuestionIndex: number,
    answersByQuestion: QuizAnswersByQuestion,
  ) {
    savePublicQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });
  }

  async function handleSubmit(answersByQuestion: QuizAnswersByQuestion) {
    const result = generateHighSchoolQuizResult(
      answersByQuestion,
      highSchoolIntakeQuestions,
    );
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

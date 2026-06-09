import QuizTemplate, {
  type QuizAnswersByQuestion,
  type QuizAnswerValue,
  type QuizQuestion,
} from '../../../components/QuizTemplate';
import { generateQuizResult } from '../../../utils/quizRecommendations';
import { currentUsfQuizRecommendationConfig } from './currentUsfQuizRecommendationConfig';
import {
  getOrCreateCurrentUsfQuizSession,
  loadCurrentUsfQuizProgress,
  saveCurrentUsfQuizProgress,
  saveCurrentUsfQuizResult,
} from './currentUsfQuizSession';
import {
  completeCurrentUsfQuizAttempt,
  upsertCurrentUsfQuizAnswer,
  upsertCurrentUsfQuizSession,
} from './currentUsfQuizSupabase';

const currentUsfIntakeQuestions: QuizQuestion[] = [
  {
    id: 'current-usf-starting-point',
    eyebrow: 'USF college tracking',
    question: 'Which option best describes your current academic home at USF?',
    helperText:
      'This helps frame how your current college requirements and completed coursework may overlap with Bellini College.',
    answers: [
      {
        id: 'ARTS_SCIENCES',
        label: 'College of Arts and Sciences',
        description:
          'Humanities, social sciences, communication, math, biology, chemistry, physics, or related fields.',
        icon: 'users',
      },
      {
        id: 'BEHAVIORAL_SCIENCES',
        label: 'College of Behavioral and Community Sciences',
        description:
          'Community-focused fields such as criminology, behavioral healthcare, psychology, or social work.',
        icon: 'hands',
      },
      {
        id: 'MUMA_BUSINESS',
        label: 'Muma College of Business',
        description:
          'Business fields such as accounting, finance, marketing, business analytics, or management.',
        icon: 'briefcase',
      },
      {
        id: 'DESIGN_ART_PERFORMANCE',
        label: 'College of Design, Art and Performance',
        description:
          'Creative fields such as fine arts, music, theater, architecture, or design.',
        icon: 'palette',
      },
      {
        id: 'EDUCATION',
        label: 'College of Education',
        description:
          'Teaching, learning, education policy, student support, or instructional fields.',
        icon: 'book',
      },
      {
        id: 'ENGINEERING',
        label: 'College of Engineering',
        description:
          'Engineering fields such as mechanical, civil, chemical, industrial, biomedical, or computer engineering.',
        icon: 'cpu',
      },
      {
        id: 'BELLINI_COMPUTING',
        label: 'Bellini College of Artificial Intelligence, Cybersecurity and Computing',
        description:
          'USF computing pathways including AI, cybersecurity, computer science, engineering, and IT.',
        icon: 'code',
      },
      {
        id: 'MEDICINE',
        label: 'Morsani College of Medicine',
        description:
          'Health, biomedical, clinical, medical science, or medicine-related academic pathways.',
        icon: 'brain',
      },
      {
        id: 'NURSING',
        label: 'College of Nursing',
        description:
          'Nursing, patient care, healthcare practice, or clinical preparation fields.',
        icon: 'hands',
      },
      {
        id: 'PHARMACY',
        label: 'Taneja College of Pharmacy',
        description:
          'Pharmacy, pharmaceutical sciences, medication systems, or health technology interests.',
        icon: 'book',
      },
      {
        id: 'PUBLIC_HEALTH',
        label: 'College of Public Health',
        description:
          'Public health, population health, epidemiology, policy, or community health interests.',
        icon: 'users',
      },
      {
        id: 'EXPLORATORY_CURRICULUM',
        label: 'Exploratory Curriculum (ECM) Students',
        description:
          'I am still deciding on a major through Exploratory Curriculum.',
        icon: 'lightbulb',
      },
      {
        id: 'NON_DEGREE_SEEKING',
        label: 'Non-Degree Seeking Students',
        description:
          'I am taking individual courses and am not currently pursuing a degree program.',
        icon: 'lightbulb',
      },
    ],
  },
  {
    id: 'current-usf-credit-standing',
    eyebrow: 'Academic background',
    question: 'What is your current credit standing or year?',
    helperText:
      'This helps estimate how much timing, sequencing, and possible graduation delay may matter.',
    answers: [
      {
        id: 'freshman',
        label: 'Freshman',
        description: 'I am early in my USF coursework.',
        icon: 'book',
      },
      {
        id: 'sophomore',
        label: 'Sophomore',
        description: 'I have completed some college coursework and am still exploring options.',
        icon: 'book',
      },
      {
        id: 'junior',
        label: 'Junior',
        description: 'I may need to think carefully about time to graduation.',
        icon: 'lightbulb',
      },
      {
        id: 'senior',
        label: 'Senior',
        description: 'I need focused advising before considering a major or college change.',
        icon: 'lightbulb',
      },
    ],
  },
  {
    id: 'credits_completed',
    eyebrow: 'Academic background',
    question: 'About how many college credits have you completed?',
    helperText:
      'This helps estimate how much prior coursework may need to be reviewed before switching programs.',
    answers: [
      {
        id: '0-29-credits',
        label: '0-29 credits',
        description: 'I am early in my college coursework.',
        icon: 'book',
      },
      {
        id: '30-59-credits',
        label: '30-59 credits',
        description: 'I have completed roughly one to two years of college credits.',
        icon: 'book',
      },
      {
        id: '60-89-credits',
        label: '60-89 credits',
        description: 'I have completed a substantial amount of college coursework.',
        icon: 'lightbulb',
      },
      {
        id: '90-plus-credits',
        label: '90 or more credits',
        description: 'I may need close advising about timeline and degree completion.',
        icon: 'lightbulb',
      },
      {
        id: 'credits-not-sure',
        label: 'I am not sure',
        description: 'I need help confirming my completed credit total.',
        icon: 'hands',
      },
    ],
  },
  {
    id: 'current-usf-bellini-interest-reason',
    eyebrow: 'Transition motivation',
    question: 'What is making you consider a Bellini computing major?',
    helperText:
      'Select any reasons that fit. This helps identify what kind of transition support may be most useful.',
    selectionMode: 'multiple',
    maxSelections: 7,
    answers: [
      {
        id: 'career-opportunities',
        label: 'Career opportunities',
        description: 'I am interested in computing-related career options and job growth.',
        icon: 'briefcase',
      },
      {
        id: 'enjoyed-computing-course',
        label: 'I enjoyed a computing-related course',
        description: 'A class, assignment, or project made me want to explore computing further.',
        icon: 'book',
      },
      {
        id: 'stronger-technical-skills',
        label: 'I want stronger technical skills',
        description: 'I want to build practical coding, data, security, or systems skills.',
        icon: 'wrench',
      },
      {
        id: 'current-major-not-fit',
        label: 'My current major does not feel like the right fit',
        description: 'I am reconsidering my academic direction and want to compare options.',
        icon: 'lightbulb',
      },
      {
        id: 'combine-computing-current-field',
        label: 'I want to combine computing with my current field',
        description: 'I want computing skills that connect with my existing academic interests.',
        icon: 'cpu',
      },
      {
        id: 'still-exploring',
        label: 'I am still exploring',
        description: 'I am not ready to choose yet, but I want to understand possible pathways.',
        icon: 'users',
      },
      {
        id: 'advisor-suggested',
        label: 'An advisor, professor, or peer suggested it',
        description: 'Someone recommended that I look into Bellini College programs.',
        icon: 'hands',
      },
    ],
  },
  {
    id: 'current-usf-courses-completed-current',
    eyebrow: 'Coursework',
    question: 'Which courses have you already completed or are currently taking?',
    helperText:
      'Select any that apply. This can later support a course-fit or advising preview.',
    selectionMode: 'multiple',
    maxSelections: 10,
    answers: [
      {
        id: 'calculus-i',
        label: 'Calculus I',
        description: 'You completed or are currently taking Calculus I.',
        icon: 'book',
      },
      {
        id: 'calculus-ii',
        label: 'Calculus II',
        description: 'You completed or are currently taking Calculus II.',
        icon: 'book',
      },
      {
        id: 'college-algebra',
        label: 'College Algebra',
        description: 'You completed or are currently taking College Algebra.',
        icon: 'book',
      },
      {
        id: 'statistics',
        label: 'Statistics',
        description: 'You completed or are currently taking a statistics course.',
        icon: 'brain',
      },
      {
        id: 'introductory-programming',
        label: 'Introductory Programming',
        description: 'You completed or are currently taking an introductory coding course.',
        icon: 'code',
      },
      {
        id: 'data-analytics-research-methods',
        label: 'Data, analytics, or research methods course',
        description: 'You have worked with data analysis, research design, or methods.',
        icon: 'brain',
      },
      {
        id: 'science-lab-course',
        label: 'Science or lab course',
        description: 'You completed or are currently taking a science course with lab work.',
        icon: 'wrench',
      },
      {
        id: 'business-information-systems',
        label: 'Business or information systems course',
        description: 'You have taken business technology, analytics, or systems coursework.',
        icon: 'briefcase',
      },
      {
        id: 'general-education-courses',
        label: 'General education courses',
        description: 'You have completed some USF general education requirements.',
        icon: 'book',
      },
      {
        id: 'courses-not-sure-yet',
        label: 'Not sure yet',
        description: 'You need to check Degree Works or your transcript.',
        icon: 'lightbulb',
      },
    ],
  },
  {
    id: 'current-usf-coding-experience',
    eyebrow: 'Technical experience',
    question: 'How much experience do you currently have with coding?',
    helperText:
      'Choose the option that best describes your current coding experience.',
    answers: [
      {
        id: 'very-little-coding',
        label: 'Very little or none',
        description: 'You are new to coding or have only seen a small amount.',
        icon: 'lightbulb',
      },
      {
        id: 'some-coding-experience',
        label: 'Some coding experience',
        description: 'You have written simple programs, scripts, or class assignments.',
        icon: 'code',
      },
      {
        id: 'comfortable-coding',
        label: 'Comfortable with coding',
        description: 'You can work through coding tasks with some independence.',
        icon: 'code',
      },
      {
        id: 'data-ai-tools-experience',
        label: 'Experience with data or AI tools',
        description: 'You have used tools for data analysis, AI, automation, or modeling.',
        icon: 'brain',
      },
      {
        id: 'technology-systems-experience',
        label: 'Experience with technology systems',
        description: 'You have worked with networks, hardware, platforms, or IT systems.',
        icon: 'cpu',
      },
    ],
  },
  {
    id: 'current-usf-ai-experience',
    eyebrow: 'AI experience',
    question: 'How have you used AI tools so far?',
    helperText:
      'Choose the option that best describes your current AI tools experience.',
    answers: [
      {
        id: 'no-ai-experience',
        label: 'Very little or none',
        description: 'You have not used AI tools much yet.',
        icon: 'lightbulb',
      },
      {
        id: 'ai-writing-study-help',
        label: 'Writing, studying, or brainstorming',
        description: 'You have used AI to summarize, draft, study, or generate ideas.',
        icon: 'book',
      },
      {
        id: 'ai-coding-help',
        label: 'Coding help',
        description: 'You have used AI to explain code, debug, or generate programming examples.',
        icon: 'code',
      },
      {
        id: 'ai-data-analysis',
        label: 'Data analysis',
        description: 'You have used AI or analytics tools to find patterns or interpret data.',
        icon: 'brain',
      },
      {
        id: 'ai-creative-work',
        label: 'Creative work',
        description: 'You have used AI for images, media, design, writing, or creative projects.',
        icon: 'palette',
      },
      {
        id: 'ai-work-automation',
        label: 'Workflows or automation',
        description: 'You have used AI to speed up tasks, organize work, or automate steps.',
        icon: 'wrench',
      },
      {
        id: 'ai-ethics-security-interest',
        label: 'Ethics, privacy, or security',
        description: 'You are interested in responsible AI, privacy, trust, or risk.',
        icon: 'shield',
      },
    ],
  },
  {
    id: 'current-usf-computing-topic-interests',
    eyebrow: 'Computing interests',
    question: 'Which computing topics interest you the most?',
    helperText:
      'Select any topics you would want to learn more about in a Bellini program.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      {
        id: 'coding-software-development',
        label: 'Coding and software development',
        description: 'Building programs, tools, systems, or applications.',
        icon: 'code',
      },
      {
        id: 'ai-ml-data',
        label: 'Artificial intelligence, machine learning, or data',
        description: 'Working with models, data, automation, prediction, or analytics.',
        icon: 'brain',
      },
      {
        id: 'cybersecurity-protecting-systems',
        label: 'Cybersecurity and protecting systems',
        description: 'Securing users, data, networks, organizations, or infrastructure.',
        icon: 'shield',
      },
      {
        id: 'hardware-robotics-devices',
        label: 'Hardware, robotics, or devices',
        description: 'Connecting computing with physical systems, circuits, or devices.',
        icon: 'cpu',
      },
      {
        id: 'it-business-systems',
        label: 'Information technology and business systems',
        description: 'Supporting organizations through systems, platforms, and operations.',
        icon: 'briefcase',
      },
      {
        id: 'web-apps-user-experience',
        label: 'Web, apps, and user experience',
        description: 'Designing digital products people can use and understand.',
        icon: 'palette',
      },
      {
        id: 'math-logic-algorithms',
        label: 'Math, logic, and algorithms',
        description: 'Solving structured problems with mathematical or computational thinking.',
        icon: 'lightbulb',
      },
      {
        id: 'not-sure-topic',
        label: 'Not sure yet',
        description: 'You are still exploring which computing topics fit you.',
        icon: 'users',
      },
    ],
  },
  {
    id: 'current-usf-computing-application-area',
    eyebrow: 'Application area',
    question: 'Where would you most like to apply computing?',
    helperText:
      'Select the fields or settings where you could imagine using computing skills.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      {
        id: 'health-medicine-public-health',
        label: 'Health, medicine, or public health',
        description: 'Using computing to support health systems, medicine, or communities.',
        icon: 'hands',
      },
      {
        id: 'business-finance-organizations',
        label: 'Business, finance, or organizations',
        description: 'Using technology to improve operations, analytics, or decisions.',
        icon: 'briefcase',
      },
      {
        id: 'security-law-justice',
        label: 'Security, law, or justice',
        description: 'Applying computing to risk, investigations, security, or justice systems.',
        icon: 'shield',
      },
      {
        id: 'science-research-engineering',
        label: 'Science, research, or engineering',
        description: 'Using computing for discovery, modeling, experimentation, or systems.',
        icon: 'brain',
      },
      {
        id: 'education-people-community',
        label: 'Education, people, or community services',
        description: 'Using technology to support learning, access, services, or public good.',
        icon: 'users',
      },
      {
        id: 'design-media-creative-tech',
        label: 'Design, media, or creative technology',
        description: 'Combining computing with design, storytelling, media, or creative work.',
        icon: 'palette',
      },
      {
        id: 'general-technology-career',
        label: 'General technology career',
        description: 'Keeping options open for a broad technology role.',
        icon: 'cpu',
      },
      {
        id: 'not-sure-application',
        label: 'Not sure yet',
        description: 'You want to explore application areas before narrowing your path.',
        icon: 'lightbulb',
      },
    ],
  },
  {
    id: 'current-usf-project-style',
    eyebrow: 'Project style',
    question: 'What kind of work or project style sounds most appealing?',
    helperText:
      'Select the work styles that sound most like the kind of projects you want to do.',
    selectionMode: 'multiple',
    maxSelections: 4,
    answers: [
      {
        id: 'solving-logical-problems',
        label: 'Solving logical problems',
        description: 'Working through puzzles, algorithms, systems, or structured challenges.',
        icon: 'lightbulb',
      },
      {
        id: 'building-software-people-use',
        label: 'Building software people can use',
        description: 'Creating useful applications, tools, websites, or products.',
        icon: 'code',
      },
      {
        id: 'finding-patterns-data',
        label: 'Finding patterns in data',
        description: 'Using data to explain, predict, or support better decisions.',
        icon: 'brain',
      },
      {
        id: 'investigating-security-risk',
        label: 'Investigating security and risk',
        description: 'Thinking through threats, vulnerabilities, privacy, and protection.',
        icon: 'shield',
      },
      {
        id: 'building-connecting-systems',
        label: 'Building or connecting technical systems',
        description: 'Working with devices, platforms, infrastructure, or integrated systems.',
        icon: 'wrench',
      },
      {
        id: 'managing-systems-infrastructure',
        label: 'Managing systems and infrastructure',
        description: 'Keeping technology environments organized, reliable, and secure.',
        icon: 'cpu',
      },
      {
        id: 'people-technology-problems',
        label: 'Working with people to solve technology problems',
        description: 'Helping teams, users, or communities use technology effectively.',
        icon: 'users',
      },
      {
        id: 'not-sure-project-style',
        label: 'Not sure yet',
        description: 'You want to try different project styles before choosing a direction.',
        icon: 'hands',
      },
    ],
  },
  {
    id: 'current-usf-advising-needs',
    eyebrow: 'Advising preparation',
    question: 'What do you most need help understanding before meeting with an advisor?',
    helperText:
      'Select any advising questions you want the dashboard to help organize later.',
    selectionMode: 'multiple',
    maxSelections: 7,
    answers: [
      {
        id: 'which-bellini-majors-fit',
        label: 'Which Bellini majors may fit me',
        description: 'You want help narrowing which programs are worth exploring first.',
        icon: 'lightbulb',
      },
      {
        id: 'completed-courses-count',
        label: 'How my completed courses may count',
        description: 'You want to understand possible overlap with Bellini requirements.',
        icon: 'book',
      },
      {
        id: 'graduation-timing',
        label: 'How switching may affect graduation timing',
        description: 'You want to discuss sequencing, added semesters, or timeline risk.',
        icon: 'briefcase',
      },
      {
        id: 'compare-bellini-majors',
        label: 'How different Bellini majors compare',
        description: 'You want a side-by-side view before choosing what to ask about.',
        icon: 'users',
      },
      {
        id: 'major-entry-requirements',
        label: 'Requirements for entering the major',
        description: 'You want to know prerequisites, GPA expectations, or entry steps.',
        icon: 'book',
      },
      {
        id: 'questions-for-advising',
        label: 'Questions to bring to advising',
        description: 'You want a prepared list for your next advisor conversation.',
        icon: 'hands',
      },
      {
        id: 'not-sure-advising',
        label: 'Not sure yet',
        description: 'You need help figuring out what to ask first.',
        icon: 'lightbulb',
      },
    ],
  },
];

async function handleSubmit(
  answersByQuestion: QuizAnswersByQuestion,
) {
  const quizSession = getOrCreateCurrentUsfQuizSession();
  const result = generateQuizResult(
    answersByQuestion,
    currentUsfQuizRecommendationConfig,
    currentUsfIntakeQuestions,
  );
  const saveStatus = await completeCurrentUsfQuizAttempt({
    sessionId: quizSession.sessionId,
    result,
  });

  const submissionResult = {
    ...result,
    saveStatus,
  };

  saveCurrentUsfQuizResult(submissionResult);

  return submissionResult;
}

function CurrentUsfIntakeQuiz() {
  const quizSession = getOrCreateCurrentUsfQuizSession();
  const savedProgress = loadCurrentUsfQuizProgress();
  const initialQuestionIndex = Math.min(
    savedProgress.currentQuestionIndex,
    currentUsfIntakeQuestions.length - 1,
  );

  async function handleAnswerChange(
    questionId: string,
    answerValue: QuizAnswerValue,
    answersByQuestion: QuizAnswersByQuestion,
    currentQuestionIndex: number,
  ) {
    saveCurrentUsfQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });

    await upsertCurrentUsfQuizSession({
      sessionId: quizSession.sessionId,
      quizVersion: currentUsfQuizRecommendationConfig.quizVersion,
      startedAt: quizSession.startedAt,
    });

    await upsertCurrentUsfQuizAnswer({
      sessionId: quizSession.sessionId,
      questionId,
      answerValue: Array.isArray(answerValue)
        ? JSON.stringify(answerValue)
        : answerValue,
      quizVersion: currentUsfQuizRecommendationConfig.quizVersion,
    });
  }

  function handleQuestionIndexChange(
    currentQuestionIndex: number,
    answersByQuestion: QuizAnswersByQuestion,
  ) {
    saveCurrentUsfQuizProgress({
      answersByQuestion,
      currentQuestionIndex,
    });
  }

  return (
    <QuizTemplate
      title="Intake Quiz"
      intro="Tell us about your current USF background, courses, technical experience, interests, and advising needs."
      questions={currentUsfIntakeQuestions}
      initialAnswersByQuestion={savedProgress.answersByQuestion}
      initialQuestionIndex={initialQuestionIndex}
      onAnswerChange={handleAnswerChange}
      onQuestionIndexChange={handleQuestionIndexChange}
      onSubmit={handleSubmit}
      resultsPath="/current-usf/quiz/results"
      backLink={{
        label: 'Back to dashboard',
        to: '/dashboard/current-usf-student',
      }}
    />
  );
}

export default CurrentUsfIntakeQuiz;

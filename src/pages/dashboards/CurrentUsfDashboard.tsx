import DashboardTemplate from '../../components/DashboardTemplate';

const currentUsfDashboardSteps = [
  {
    title: 'Start with your current record',
    text: 'Note your current USF college, major, class standing, completed credits, and any courses that may matter if you switch into Bellini College.',
  },
  {
    title: 'Explore possible computing majors',
    text: 'Review Bellini computing programs with your existing coursework in mind, especially prerequisites, math or programming preparation, and likely sequencing questions.',
  },
  {
    title: 'Compare paths before switching',
    text: 'Use comparison tools to see how programs differ before assuming one major will make the best use of credits you have already completed.',
  },
  {
    title: 'Save programs and questions',
    text: 'Add programs to your profile and write down questions about catalog year, Degree Works, credit applicability, permits, and time to graduation.',
  },
  {
    title: 'Prepare for advising',
    text: 'Bring your unofficial transcript, Degree Works view, completed course list, and saved profile notes to a USF advisor for official guidance.',
  },
  {
    title: 'Confirm before making changes',
    text: 'Because transcript data, privacy, and degree audits require official systems, use this dashboard as preparation before changing colleges or majors.',
  },
];

const currentUsfRecommendedNextSteps = [
  {
    title: 'Check your eligibility first',
    text: 'Review Bellini gateway requirements, grades, repeated attempts, GPA expectations, and four-year timeline rules before submitting a change-of-major request.',
  },
  {
    title: 'Organize your USF course history',
    text: 'Use your Degree Works view, unofficial transcript, and completed course list to identify math, science, programming, statistics, database, networking, and repeated courses that need review.',
  },
  {
    title: 'Compare target Bellini majors',
    text: 'Use the degree explorer and intake quiz results to narrow your major options, then note prerequisite gaps, course sequencing concerns, and questions about catalog year.',
  },
  {
    title: 'Prepare for Bellini advising',
    text: 'Bring your saved profile, transcript details, programs of interest, and specific questions about credit applicability, permits, excess hours, and time to graduation.',
  },
];

function CurrentUsfDashboard() {
  return (
    <DashboardTemplate
      dashboardLabel="Welcome to your Dashboard bulls!"
      headline="Learning, Redefined"
      intro="For current USF students in another college who may be interested in switching into a Bellini College computing major, this dashboard helps you explore degree options, compare possible paths, and think through how your completed coursework might fit before your next advising conversation."
      pathHeading="Explore a switch into Bellini College with your USF coursework in mind"
      quizPath="/current-usf/quiz"
      quizResultsPath="/current-usf/quiz/results"
      degreeToolPath="/degrees?from=current-usf-student"
      degreeToolTitle="Degree Explorer for Current USF Students"
      degreeToolText="Compare Bellini computing majors with your current USF coursework and advising questions in mind."
      secondaryToolPath="/profile"
      secondaryToolTitle="Your Profile"
      secondaryToolText="Track your college, coursework, programs of interest, and advising questions."
      tertiaryToolPath="/current-usf/readiness-guide"
      tertiaryToolTitle="Transferring into Bellini Guide"
      tertiaryToolText="Use a guide-style workspace for course fit, timing, and advising preparation."
      careerToolPath="/current-usf/transcript"
      careerToolIcon="upload"
      careerToolTitle="Transcript Upload"
      careerToolText="Paste or upload transcript text to extract courses, credits, grades, and advising checkpoints before meeting with Bellini advising."
      finalNavPath="/profile"
      finalNavLabel="Profile"
      steps={currentUsfDashboardSteps}
      planningHeading="Recommended Next Steps"
      planningText="Use these steps to prepare before you request a change of major from another USF college into a Bellini College program."
      planningItems={currentUsfRecommendedNextSteps}
      planningReminder="Reminder: this dashboard helps you prepare for advising. Bellini College and official USF systems must confirm eligibility, degree requirements, credit applicability, and whether the switch can fit your timeline."
    />
  );
}

export default CurrentUsfDashboard;

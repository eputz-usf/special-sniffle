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

function CurrentUsfDashboard() {
  return (
    <DashboardTemplate
      dashboardLabel="Welcome to your Dashboard bulls!"
      headline="Learning, Redefined"
      intro="For current USF students in another college who may be interested in switching into a Bellini College computing major, this dashboard helps you explore degree options, compare possible paths, and think through how your completed coursework might fit before your next advising conversation."
      pathHeading="Explore a switch into Bellini College with your USF coursework in mind"
      quizPath="/current-usf/quiz"
      degreeToolPath="/degrees?from=current-usf-student"
      degreeToolTitle="Degree Explorer for Current USF Students"
      degreeToolText="Compare Bellini computing majors with your current USF coursework and advising questions in mind."
      secondaryToolPath="/profile"
      secondaryToolTitle="Your Profile"
      secondaryToolText="Track your college, coursework, programs of interest, and advising questions."
      tertiaryToolPath="/current-usf/readiness-guide"
      tertiaryToolTitle="Transferring into Bellini Guide"
      tertiaryToolText="Use a guide-style workspace for course fit, timing, and advising preparation."
      careerToolTitle="Undecided"
      careerToolText="Placeholder for another Current USF student tool."
      careerToolUndecided
      finalNavPath="/profile"
      finalNavLabel="Profile"
      steps={currentUsfDashboardSteps}
    />
  );
}

export default CurrentUsfDashboard;

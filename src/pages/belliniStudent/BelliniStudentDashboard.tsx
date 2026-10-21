import DashboardTemplate from '../../components/DashboardTemplate';

const belliniStudentDashboardSteps = [
  {
    title: 'Name the reason for switching',
    text: 'Start with what is making you reconsider your current Bellini major: course fit, interest in a different direction, workload, career direction, or graduation timing.',
  },
  {
    title: 'Compare nearby computing paths',
    text: 'Look at CS, Artificial Intelligence, Cybersecurity, Computer Engineering, and related computing options as distinct paths instead of treating them as interchangeable.',
  },
  {
    title: 'Explore coursework and skills',
    text: 'Read degree details to understand the topics, skills, and academic focus of each program.',
  },
  {
    title: 'Map the decision tradeoffs',
    text: 'Write down the tradeoffs between staying in your current major and switching: required courses, prerequisites, GPA expectations, internship goals, and likely graduation term.',
  },
  {
    title: 'Check official requirements',
    text: 'Use official catalog and advising guidance to confirm requirements for your current major and any Bellini major you are considering before acting on this planning work.',
  },
  {
    title: 'Bring a focused advising agenda',
    text: 'Turn your comparison into a short list of majors, courses, concerns, and questions to bring to a Bellini College advising appointment.',
  },
];

const belliniMajorChangeNextStepItems = [
  {
    title: 'Compare two paths',
    text: 'Pick your current major and one possible Bellini major. Review what changes in focus, coursework, skills, and advising questions.',
  },
  {
    title: 'Explore degree details',
    text: 'Review the coursework, skills, and career directions for each major you are considering.',
  },
  {
    title: 'Review requirements',
    text: 'Follow official catalog links in the degree explorer and confirm requirements with Bellini advising.',
  },
  {
    title: 'Meet with advising',
    text: 'Bring the degrees you compared and your questions about requirements and graduation timing to advising.',
  },
];

function BelliniStudentDashboard() {
  return (
    <DashboardTemplate
      dashboardLabel="Current Bellini College Student Dashboard"
      headline="Major Planning, Redefined"
      intro="For current Bellini College students already in computing who are unsure whether to stay in CS, move to Artificial Intelligence, move to Cybersecurity, move to Computer Engineering, or consider another computing-related option, this dashboard helps organize the comparison before advising."
      pathHeading="Think through a possible Bellini computing major change"
      degreeToolPath="/degrees?from=current-bellini-student"
      degreeToolTitle="Degree Explorer for Major Changes"
      degreeToolText="Compare CS, Artificial Intelligence, Cybersecurity, Computer Engineering, and related Bellini computing majors before deciding what to discuss with advising."
      secondaryToolTitle="Course Overlap Planner"
      secondaryToolText="Coming soon!"
      tertiaryToolTitle="Profile"
      tertiaryToolText="Coming soon!"
      extraToolTitle="Transcript Upload and Course Extraction"
      extraToolText="Coming soon!"
      extraToolIcon="upload"
      careerToolTitle="Major Change Guide"
      careerToolText="Coming soon!"
      blankAfterSecondaryToolCards
      toolCardOrder={['degree', 'career', 'tertiary', 'secondary', 'extra']}
      uniformToolCards
      comingSoonMode
      quizNavLabel="Major Interest Finder"
      degreeToolComingSoon={false}
      hideFinalNav
      steps={belliniStudentDashboardSteps}
      planningHeading="Next Steps for a Bellini Major Change"
      planningText="Use the degree explorer to compare your options and prepare questions for Bellini advising."
      planningItems={belliniMajorChangeNextStepItems}
      planningReminder="Next step before paperwork: confirm your course overlap, GPA and grade requirements, attempts, Degree Works details, and graduation timeline with Bellini College advising."
    />
  );
}

export default BelliniStudentDashboard;

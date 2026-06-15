import DashboardTemplate from '../../components/DashboardTemplate';

const belliniStudentDashboardSteps = [
  {
    title: 'Name the reason for switching',
    text: 'Start with what is making you reconsider your current Bellini major: course fit, interest in AI or cybersecurity, hardware focus, workload, career direction, or graduation timing.',
  },
  {
    title: 'Compare nearby computing paths',
    text: 'Look at CS, Artificial Intelligence, Cybersecurity, Computer Engineering, and related computing options as distinct paths instead of treating them as interchangeable.',
  },
  {
    title: 'Check course overlap',
    text: 'Use your completed programming, math, systems, security, data, and hardware courses to see what may still count and what could add time if you switch.',
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

const belliniMajorChangePlanningItems = [
  {
    title: 'Clarify',
    text: 'Whether your uncertainty is about the subject matter, a difficult course sequence, job goals, or a stronger interest in AI, cybersecurity, hardware, data, or software development.',
  },
  {
    title: 'Compare',
    text: 'CS, Artificial Intelligence, Cybersecurity, Computer Engineering, and related computing options by required courses, prerequisites, electives, project work, and career preparation.',
  },
  {
    title: 'Audit',
    text: 'Which completed credits may apply to each option, which required courses would remain, and whether any switch could change your graduation timeline or course load.',
  },
  {
    title: 'Confirm',
    text: 'Catalog year, GPA or admission requirements, permit needs, course sequencing, Degree Works details, and the formal change-of-major process with Bellini advising.',
  },
];

function BelliniStudentDashboard() {
  return (
    <DashboardTemplate
      dashboardLabel="Current Bellini College Student Dashboard"
      headline="Major Planning, Redefined"
      intro="For current Bellini College students already in computing who are unsure whether to stay in CS, move to Artificial Intelligence, move to Cybersecurity, move to Computer Engineering, or consider another computing-related option, this dashboard helps organize the comparison before advising."
      pathHeading="Think through a possible Bellini computing major change"
      quizPath="/bellini-student/quiz"
      quizResultsPath="/bellini-student/quiz/results"
      degreeToolPath="/degrees?from=current-bellini-student"
      degreeToolTitle="Degree Explorer for Major Changes"
      degreeToolText="Compare CS, Artificial Intelligence, Cybersecurity, Computer Engineering, and related Bellini computing majors before deciding what to discuss with advising."
      secondaryToolPath="/bellini-student/course-overlap"
      secondaryToolTitle="Course Overlap Planner"
      secondaryToolText="Choose a Bellini major, open its four-year plan placeholder, and check off completed courses once the course list is added from the official PDF."
      tertiaryToolPath="/bellini-student/profile"
      tertiaryToolTitle="Profile"
      tertiaryToolText="Save programs under consideration, transcript documents, advising notes, questions, and printable details for a Bellini major-change conversation."
      extraToolPath="/bellini-student/transcript"
      extraToolTitle="Transcript Upload and Course Extraction"
      extraToolText="Upload a transcript PDF or paste transcript text to extract course rows, review credits and grades, and save a summary to your Bellini profile."
      extraToolIcon="upload"
      careerToolPath="/bellini-student/major-change-guide"
      careerToolTitle="Major Change Guide"
      careerToolText="Use a step-by-step guide for requirements, Canvas resources, Archivum advising, change-of-major paperwork, and degree progression tools."
      blankAfterSecondaryToolCards
      toolCardOrder={['career', 'tertiary', 'degree', 'secondary', 'extra']}
      finalNavPath="/bellini-student/profile"
      finalNavLabel="Profile"
      steps={belliniStudentDashboardSteps}
      planningHeading="Prepare for a Bellini major-change advising conversation"
      planningText="Use this checklist to separate interest fit from degree logistics before you submit any change-of-major request."
      planningItems={belliniMajorChangePlanningItems}
      planningReminder="This dashboard is a planning aid. Final decisions should be confirmed through official Bellini College advising, catalog requirements, and Degree Works."
    />
  );
}

export default BelliniStudentDashboard;

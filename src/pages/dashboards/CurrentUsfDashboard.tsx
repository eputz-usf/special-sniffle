import DashboardTemplate from '../../components/DashboardTemplate';

const currentUsfDashboardSteps = [
  {
    title: 'Review your current record in USF systems',
    text: 'Check your current college, major, class standing, and completed credits in official USF systems before exploring Bellini programs.',
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
    title: 'Identify programs and questions',
    text: 'Identify programs of interest and write down questions about catalog year, Degree Works, credit applicability, permits, and time to graduation.',
  },
  {
    title: 'Prepare for advising',
    text: 'Gather your unofficial transcript and Degree Works view from official USF systems, and bring them with your questions to an advisor.',
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
    text: 'Review your course history in official USF systems and ask an advisor which completed courses may apply to a Bellini major.',
  },
  {
    title: 'Compare target Bellini majors',
    text: 'Use the degree explorer to narrow your major options, then note prerequisite gaps, course sequencing concerns, and questions about catalog year.',
  },
  {
    title: 'Prepare for Bellini advising',
    text: 'Bring the degrees you compared and questions about credit applicability, permits, excess hours, and time to graduation to Bellini advising.',
  },
];

function CurrentUsfDashboard() {
  return (
    <DashboardTemplate
      dashboardLabel="Welcome to your Dashboard bulls!"
      headline="Learning, Redefined"
      intro="For current USF students in another college who may be interested in switching into a Bellini College computing major, this dashboard helps you explore degree options, compare possible paths, and think through how your completed coursework might fit before your next advising conversation."
      pathHeading="Explore a switch into Bellini College with your USF coursework in mind"
      degreeToolPath="/degrees?from=current-usf-student"
      degreeToolTitle="Degree Explorer for Current USF Students"
      degreeToolText="Compare Bellini computing majors with your current USF coursework and advising questions in mind."
      secondaryToolTitle="Your Profile"
      secondaryToolText="Coming soon!"
      tertiaryToolTitle="Transferring into Bellini Guide"
      tertiaryToolText="Coming soon!"
      extraToolTitle="Course Overlap Planner"
      extraToolText="Coming soon!"
      careerToolIcon="upload"
      careerToolTitle="Transcript Upload"
      careerToolText="Coming soon!"
      toolCardOrder={['degree', 'secondary', 'tertiary', 'career', 'extra']}
      blankAfterSecondaryToolCards
      uniformToolCards
      comingSoonMode
      degreeToolComingSoon={false}
      hideFinalNav
      steps={currentUsfDashboardSteps}
      planningHeading="Recommended Next Steps"
      planningText="Use these steps to prepare before you request a change of major from another USF college into a Bellini College program."
      planningItems={currentUsfRecommendedNextSteps}
      planningReminder="Reminder: this dashboard helps you prepare for advising. Bellini College and official USF systems must confirm eligibility, degree requirements, credit applicability, and whether the switch can fit your timeline."
    />
  );
}

export default CurrentUsfDashboard;

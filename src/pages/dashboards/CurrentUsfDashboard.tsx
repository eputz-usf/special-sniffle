import DashboardTemplate from '../../components/DashboardTemplate';

function CurrentUsfDashboard() {
  return (
    <DashboardTemplate
      dashboardLabel="Welcome to your Dashboard bulls!"
      headline="Learning, Redefined"
      intro="For current USF students in another college who may be interested in switching into a Bellini College computing major, this dashboard helps you explore degree options, compare possible paths, and think through how your completed coursework might fit before your next advising conversation."
      pathHeading="Explore Bellini programs and plan your next conversation"
      degreeToolPath="/degrees?from=current-usf-student"
      degreeToolTitle="Degree Explorer for Current USF Students"
      degreeToolText="Compare Bellini computing majors with your current USF coursework and advising questions in mind."
      secondaryToolPath="/profile"
      secondaryToolTitle="Your Profile"
      secondaryToolText="Track your college, coursework, programs of interest, and advising questions."
      tertiaryToolTitle="Undecided"
      tertiaryToolText="Placeholder for the next Current USF student tool."
      tertiaryToolUndecided
      careerToolTitle="Undecided"
      careerToolText="Placeholder for another Current USF student tool."
      careerToolUndecided
      finalNavPath="/profile"
      finalNavLabel="Profile"
    />
  );
}

export default CurrentUsfDashboard;

import DashboardTemplate from '../../components/DashboardTemplate';

const transferDashboardSteps = [
  {
    title: 'Clarify your transfer context',
    text: 'Start by identifying where you are transferring from, how many credits you expect to bring in, and which business or technology interests are driving your search.',
  },
  {
    title: 'Review Bellini degree fit',
    text: 'Use the degree information tools to evaluate which Bellini College programs align with your completed coursework, career goals, and preferred timeline to graduation.',
  },
  {
    title: 'Compare requirements early',
    text: 'Look across program expectations, prerequisite patterns, and possible sequencing issues before assuming that every completed course will apply the same way.',
  },
  {
    title: 'Prepare for credit conversations',
    text: 'Collect syllabi, unofficial transcripts, catalog descriptions, and course questions so an advisor or admissions contact can give more precise guidance.',
  },
  {
    title: 'Identify decision points',
    text: 'Track what still needs confirmation, including transfer-credit applicability, entry requirements, application timing, financial considerations, and campus support resources.',
  },
  {
    title: 'Build your next-step plan',
    text: 'Turn your research into a concrete checklist for admissions, advising, transcript review, and degree exploration before making a transfer decision.',
  },
];

function TransferStudentDashboard() {
  return (
    <DashboardTemplate
      dashboardLabel="Transfer Student Dashboard"
      headline="Transfer Planning, Simplified"
      intro="Use this dashboard to compare Bellini College degree options, understand transfer planning steps, organize your questions, and prepare for conversations about credits, timelines, and advising."
      pathHeading="Evaluate credits, program fit, and transfer next steps"
      quizPath="/transfer/quiz"
      quizResultsPath="/transfer/quiz/results"
      transferPlannerPath="/transfer/planner"
      transferReadinessPath="/transfer/readiness-guide"
      steps={transferDashboardSteps}
    />
  );
}

export default TransferStudentDashboard;

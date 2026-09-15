import DashboardTemplate from '../../components/DashboardTemplate';

function GeneralDashboard() {
  return (
    <DashboardTemplate
      headline="Dashboard Template"
      dashboardLabel="General Dashboard Template"
      intro="This general preview shows the shared dashboard layout, sections, cards, and planning space before role-specific content is connected."
      pathHeading="Use this space to introduce the dashboard flow"
      quizPath="/general/quiz"
      quizNavLabel="Questionnaire"
      quizEyebrow="Questionnaire"
      quizButtonLabel="Start questionnaire"
      comingSoonMode
      degreeToolComingSoon={false}
      degreeToolPath="/degrees?from=general"
      secondaryToolTitle="Secondary Tool - Coming Soon"
      secondaryToolText="Use this card for a guide, checklist, form, or reference page that helps users understand their next step."
      tertiaryToolTitle="Planning Tool - Coming Soon"
      tertiaryToolText="Use this card for a planner, tracker, notes area, or saved summary connected to the user's dashboard."
      careerToolTitle="Additional Tool - Coming Soon"
      careerToolText="Use this card for another relevant dashboard action, such as career paths, uploads, appointments, or external resources."
      planningHeading="Planning Area Placeholder"
      planningText="Use this section for personalized next steps, reminders, saved notes, or recommended actions."
      planningItems={[
        'Template planning item - coming soon.',
        'Template planning item - coming soon.',
        'Template planning item - coming soon.',
        'Template planning item - coming soon.',
      ]}
    />
  );
}

export default GeneralDashboard;

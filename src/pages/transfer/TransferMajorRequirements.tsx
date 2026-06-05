import { useState } from 'react';
import { Link } from 'react-router-dom';
import { majorTransferRequirements } from '../../data/transferMajorRequirements';
import '../../styles/degrees.css';
import '../../styles/transferReadiness.css';

const TRANSFER_PLANNER_STORAGE_KEY = 'cic_transfer_planner';

function addRequirementGroupToPlanner(groupId: string) {
  const savedPlanner = window.localStorage.getItem(TRANSFER_PLANNER_STORAGE_KEY);
  const parsedPlanner = savedPlanner ? JSON.parse(savedPlanner) : {};
  const currentGroups = Array.isArray(parsedPlanner.requirementGroups)
    ? parsedPlanner.requirementGroups
    : [];

  if (currentGroups.some((group: { id?: string }) => group.id === groupId)) {
    return false;
  }

  window.localStorage.setItem(
    TRANSFER_PLANNER_STORAGE_KEY,
    JSON.stringify({
      ...parsedPlanner,
      requirementGroups: [
        ...currentGroups,
        { id: groupId, completedRequirementIds: [] },
      ],
    }),
  );

  return true;
}

function TransferMajorRequirements() {
  const [addedGroupId, setAddedGroupId] = useState('');

  function handleAddRequirementGroup(groupId: string) {
    addRequirementGroupToPlanner(groupId);
    setAddedGroupId(groupId);
  }

  return (
    <main className="degrees-page transfer-readiness-page">
      <section className="degrees-hero transfer-readiness-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Major requirements</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/transfer/readiness-guide"
          >
            Back to Transfer Guide
          </Link>
        </div>
        <h1>Transfer Major Requirements</h1>
        <p>
          A transfer student must be fully admitted to the University of South
          Florida as a degree-seeking student. Lower-level transfer students
          have 12 to 29 credit hours, mid-level transfer students have 30 to 59
          credit hours, and upper-level students have 60 or more credit hours of
          post-secondary course work.
        </p>
      </section>

      <section className="transfer-major-requirements-section">
        <div className="degrees-section-heading">
          <p className="degrees-eyebrow">Program requirements</p>
          <h2>Requirements by Major</h2>
          <p className="transfer-planner-helper-callout">
            Each major includes requirements by transfer student type. Use
            <strong> Add to planner</strong> to save the section that matches
            your transfer level, then open the transfer planner to mark
            requirements completed or not completed.
          </p>
        </div>

        <div className="transfer-major-requirements-grid">
          {majorTransferRequirements.map((major) => (
            <article
              className="transfer-major-requirements-card"
              key={major.title}
            >
              <h3>{major.title} Transfer Requirements</h3>

              <div className="transfer-requirement-levels">
                {major.levels.map((level) => {
                  const groupId = `${major.id}:${level.id}`;

                  return (
                    <section
                      className="transfer-requirement-level"
                      key={level.id}
                    >
                      <div className="transfer-requirement-level-heading">
                        <h4>{level.label}</h4>
                        <button
                          type="button"
                          onClick={() => handleAddRequirementGroup(groupId)}
                        >
                          Add to planner
                        </button>
                      </div>
                      <ul>
                        {level.requirements.map((requirement) => (
                          <li key={requirement.id}>{requirement.text}</li>
                        ))}
                      </ul>
                      {addedGroupId === groupId && (
                        <p className="transfer-requirement-added">
                          Added to your transfer planner. You can mark items
                          complete there.
                        </p>
                      )}
                    </section>
                  );
                })}
              </div>

              <div className="transfer-major-link-group">
                {major.degreeLinks.map((degree) => (
                  <Link key={degree.slug} to={`/degrees/${degree.slug}`}>
                    Learn more: {degree.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TransferMajorRequirements;

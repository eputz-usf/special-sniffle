import { Link } from 'react-router-dom';
import '../../styles/degrees.css';

const pathwayPrograms = [
  {
    name: 'BS in Computer Science to MS in Computer Science',
    url: 'https://usf.to/BS-MS-Pathway',
  },
  {
    name: 'BS in Cybersecurity to MS in Computer Science',
    url: 'https://usf.to/BS-MS-Pathway',
  },
  {
    name: 'BS in Artificial Intelligence to MS in Computer Science',
    url: 'https://usf.to/BS-MS-Pathway',
  },
];

const availableMinors = [
  {
    name: 'Computer Science Minor',
    description:
      'This minor covers key topics in the discipline and is a 15-credit hour program that is expected to be attractive to students in Engineering, Mathematics, and the Sciences. Information about the minor can be found in the undergraduate catalog.',
    url: 'https://catalog.usf.edu/content.php?catoid=25&navoid=4350',
  },
  {
    name: 'Information Technology Minor',
    description:
      'The Information Technology minor covers key topics in the discipline and is a 21 credit hour program that is expected to be attractive to students in Engineering, Mathematics, and the Sciences who have no background in software development. Information about the minor can be found in the undergraduate catalog.',
    url: 'https://catalog.usf.edu/content.php?catoid=25&navoid=4350',
  },
];

function HighSchoolBachelorsMastersPathways() {
  return (
    <main className="degrees-page pathways-page">
      <Link className="degree-back-link" to="/high-school/degrees">
        Back to Degree Explorer
      </Link>

      <section className="future-degree-section pathways-section">
        <div className="future-degree-heading">
          <p className="degrees-eyebrow">Integrated BS/MS</p>
          <h1>Bachelor&apos;s/Master&apos;s Pathways</h1>
          <p>
            We will have the following bachelor&apos;s/master&apos;s pathway
            programs (also known as Integrated BS/MS).
    These programs let strong students start a master&apos;s degree while finishing
    their bachelor&apos;s degree which helps them earn both degrees in
    less time.
          </p>
        </div>

        <div className="pathway-card-grid">
          {pathwayPrograms.map((program) => (
            <a
              className="pathway-card"
              href={program.url}
              key={program.name}
              rel="noreferrer"
              target="_blank"
            >
              <h2>{program.name}</h2>
              <span>View pathway details</span>
            </a>
          ))}
        </div>
      </section>

      <section className="future-degree-section minors-section">
        <div className="future-degree-heading">
          <p className="degrees-eyebrow">Undergraduate Minors</p>
          <h2>Available Minors</h2>
        </div>

        <div className="minor-card-grid">
          {availableMinors.map((minor) => (
            <article className="minor-card" key={minor.name}>
              <div>
                <h3>{minor.name}</h3>
                <p>{minor.description}</p>
              </div>
              <a href={minor.url} rel="noreferrer" target="_blank">
                View undergraduate catalog
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HighSchoolBachelorsMastersPathways;

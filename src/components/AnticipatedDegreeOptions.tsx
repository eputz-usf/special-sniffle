import { Link, useSearchParams } from 'react-router-dom';
import { getDegreeSource } from '../utils/degreeSource';
import '../styles/degrees.css';

export default function AnticipatedDegreeOptions({ highSchool = false }: { highSchool?: boolean }) {
  const [params] = useSearchParams();
  const back = highSchool ? '/high-school/degrees' : `/degrees?from=${getDegreeSource(params.get('from'))}`;
  return <main className="degrees-page">
    <Link className="degree-back-link" to={back}>Back to Degree Explorer</Link>
    <section className="degrees-hero">
      <p className="degrees-eyebrow">Future Degree Options</p>
      <h1>Anticipated Degrees for 2027</h1>
      <p>{highSchool ? 'These two computing degrees are expected in 2027. The start date and program details still need to be confirmed.' : 'These two additional computing degrees are anticipated for 2027. Timing is estimated; availability and academic content await confirmation.'}</p>
    </section>
    <section className="degree-grid" aria-label="Anticipated 2027 degrees">
      {['Anthropology', 'Economics'].map((subject) => <article className="degree-card" key={subject}>
        <div><p className="degree-category">Interdisciplinary</p><h2>B.S. in Computer Science and {subject}</h2><p>Anticipated for 2027 (estimated timing)</p><p>{highSchool ? 'More information about classes and class plans will be added after it has been checked.' : 'Program details and planning resources are incomplete and pending academic review.'}</p></div>
        <div className="degree-card-actions"><button type="button" disabled>{highSchool ? 'Details are being checked' : 'Details pending academic review'}</button></div>
      </article>)}
    </section>
  </main>;
}

import { highSchoolInterdisciplinaryContent } from '../data/highSchoolInterdisciplinaryContent';
import { Link, useSearchParams } from 'react-router-dom';
import type { HighSchoolFutureDegreeOption } from '../data/highSchoolFutureDegreeOptions';
import { interdisciplinaryDetailContent } from '../data/interdisciplinaryDetailContent';
import { getDegreeSource } from '../utils/degreeSource';

export default function InterdisciplinaryDegreeDetail({ option, highSchool = false }: { option: HighSchoolFutureDegreeOption; highSchool?: boolean }) {
  const [params] = useSearchParams();
  const source = getDegreeSource(params.get('from'));
  const back = highSchool ? '/high-school/degrees#interdisciplinary' : `/degrees?from=${source}#interdisciplinary`;
  const plain = highSchool ? highSchoolInterdisciplinaryContent[option.slug] : undefined;
  const content = plain ?? interdisciplinaryDetailContent[option.slug];
  const focus = plain?.focus ?? option.focus;
  const degreeName = option.name.replace(/^BS in /, '');
  const careerOutlook = <section className="degree-detail-section" id="career-outlook">
    <h2>{highSchool ? 'Jobs You Could Explore' : 'Career Outlook'}: {degreeName}</h2>
    <div className="degree-overview-card"><p>{content?.career ?? 'Program-specific career options, salary information, and employment outlook are pending academic review.'}</p>{content && <p>{highSchool ? 'Pay information for these jobs is not available here yet.' : 'Salary figures and Tampa Bay employment data have not been supplied.'}</p>}</div>
  </section>;

  return <main className="degree-detail-page computer-science-detail interdisciplinary-detail-page">
    <Link className="degree-back-link" to={back}>Back to Degree Explorer</Link>
    <section className="degree-detail-hero cs-hero">
      <p className="degrees-eyebrow">{focus}</p>
      <h1>{option.name}</h1>
      <p>{plain?.cardDescription ?? option.cardDescription}</p>
      <div className="degree-tag-list">{focus.split(' + ').map((focus) => <span key={focus}>{focus}</span>)}</div>
      <div className="degree-detail-actions"><a href="#official-resources">{highSchool ? 'See Required Classes' : 'View Official Requirements'}</a></div>
    </section>

    <section className="degree-detail-section degree-overview-card">
      <h2>What This Degree Focuses On</h2>
      <>{(content?.overview ?? [option.description]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</>
    </section>

    {highSchool && careerOutlook}

    <section className="degree-fit-grid">
      <article className="degree-detail-section">
        <h2>This Degree May Be a Good Fit If You...</h2>
        {content ? <ul>{content.fit.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Are interested in {option.goodFit.charAt(0).toLowerCase() + option.goodFit.slice(1)}</p>}
      </article>
      <article className="degree-detail-section">
        <h2>This Degree May Feel Challenging If You...</h2>
        {content ? <ul>{content.preparation.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Program-specific guidance is pending academic review. Ask an advisor about computing preparation and the requirements of the connected discipline.</p>}
      </article>
    </section>

    <section className="degree-detail-section">
      <h2>Skills Students May Build</h2>
      {content ? <div className="degree-skill-chips">{content.skills.map((skill) => <span key={skill}>{skill}</span>)}</div> : <p>Program-specific skills and coursework details are pending academic review.</p>}
    </section>

    <section className="degree-detail-section" id="official-resources">
      <h2>{highSchool ? 'Class Plans and Official Details' : 'Flowcharts, Plans, and Electives'}</h2>
      <p>{highSchool ? 'These links show the classes for this degree. Ask an advisor which plan and set of requirements you should follow.' : 'Confirm the catalog year and whether these resources apply to you with Bellini advising.'}</p>
      <div className="resource-group">
        <h3>{highSchool ? 'Required Classes' : 'Official Program Requirements'}</h3>
        <div className="resource-card-grid">
          <a className="resource-card" href={option.programUrl} target="_blank" rel="noopener noreferrer"><span>{highSchool ? 'See Degree Details and Classes' : 'Official program / catalog'}</span><small>{highSchool ? 'Open USF information ↗' : 'Open official resource ↗'}</small></a>
        </div>
      </div>
      <div className="resource-group">
        <h3>{highSchool ? 'Sample Class Plans' : 'Plans of Study and Electives'}</h3>
        <div className="resource-card-grid">
          {option.planningResources.map((resource) => <a className="resource-card" key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer"><span>{highSchool ? resource.label.replace('Plan of Study', 'Class Plan') : resource.label}</span><small>{highSchool ? 'Open USF information ↗' : 'Open official resource ↗'}</small></a>)}
        </div>
      </div>
    </section>

    <section className="degree-detail-section degree-next-steps">
      <h2>Want to Compare {degreeName}?</h2>
      {highSchool ? <p>Go back to the Degree Explorer. Choose Add to Compare on this card and one other card. Then choose Compare Degrees. You can compare what you would study, skills you could learn, and what to do next.</p> : <p>
        Use the Degree Explorer comparison feature to compare this program with
        Computer Science, Artificial Intelligence, Cybersecurity, Information
        Technology, Computer Science and Engineering, or another interdisciplinary
        major or concentration. From the Degree Explorer page, choose Add to
        Compare on two degree cards, then open the side-by-side comparison to
        review focus areas, skills, fit, sample topics, next steps, and official
        links. Information that is still pending review is labeled in the comparison.
      </p>}
      <div className="degree-detail-actions"><Link to={back}>Back to Degree Explorer</Link></div>
    </section>

    {!highSchool && careerOutlook}

    {content && <section className="degree-detail-section"><h2>{highSchool ? 'Work Experience, Research, and More Study' : 'Internships, Research, and Graduate Pathways'}</h2><ul>{content.opportunities.map((item) => <li key={item}>{item}</li>)}</ul></section>}

    <section className="degree-detail-section">
      <h2>Questions to Ask an Advisor</h2>
      <ul>
        <li>{highSchool ? 'Can I apply for this program now? Which classes would I need to take?' : 'Is this program admitting students, and which catalog year and requirements apply?'}</li>
        <li>{highSchool ? 'Which high school or first-year courses would help me prepare?' : source === 'current-bellini-student' ? 'How would a major change within Bellini College affect my remaining requirements and graduation timeline?' : 'How would my completed courses apply to this program?'}</li>
        <li>{highSchool ? 'Which extra classes can I choose, and which class plan should I use?' : 'Which electives and planning resources are confirmed?'}</li>
      </ul>
      <div className="degree-detail-actions"><a href="mailto:Bellini-CollegeICMadvising@usf.edu">{highSchool ? 'Email an Advisor' : 'Contact interdisciplinary advising'}</a></div>
    </section>

    <p className="degrees-disclaimer">{highSchool ? 'Use this page to explore your options. Check the official USF catalog and ask a Bellini advisor before choosing classes.' : 'This page is for exploration and planning only. Confirm degree requirements, course availability, electives, catalog rules, and graduation plans using the official USF undergraduate catalog and Bellini College advising resources.'}</p>
    <div className="degree-detail-actions degree-catalog-action"><a href={option.programUrl} target="_blank" rel="noopener noreferrer">{highSchool ? 'See More Degree Details ↗' : 'View More Details in the Catalog ↗'}</a></div>
  </main>;
}

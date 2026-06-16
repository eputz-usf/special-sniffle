import { Link } from 'react-router-dom';
import '../../../styles/degrees.css';

const prospectiveStudentFaqs = [
  {
    question: 'Do I need coding experience before starting?',
    answer:
      'You do not need to be a coding expert before you start exploring. Use the degree pages to compare how coding, math, systems, and other skills show up in each major.',
  },
  {
    question: 'How do I choose between the computing majors?',
    answer:
      'Start with the kind of problems you want to solve. For example, Artificial Intelligence focuses on systems that learn and adapt, while Cybersecurity focuses on protecting information, systems, and networks. Use the degree explorer to compare classes, skills, and career paths.',
    sourceUrl: 'https://www.usf.edu/ai-cybersecurity-computing/academics/',
  },
  {
    question: 'How much math will I need?',
    answer:
      'Math requirements vary by major. Review the official catalog links and flowcharts on each degree page, then speak with an advisor if you want help comparing requirements.',
    sourceUrl:
      'https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/',
  },
  {
    question: 'Can I change my major later?',
    answer:
      'Possibly, but timing and requirements can vary. Speak with a Bellini College advisor before making a change so you understand how it may affect your plan of study.',
    sourceUrl:
      'https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/advising-support.aspx',
  },
  {
    question: 'What should I do after reviewing the degree options?',
    answer:
      'Take the intake quiz, compare your top majors, review career outlooks, and write down your remaining questions. When you are ready, check USF Admissions for application dates, materials deadlines, and scholarship information.',
    sourceUrl:
      'https://www.usf.edu/admissions/freshmen/admission-information/dates-deadlines.aspx',
  },
];

const parentTips = [
  {
    label: 'Tip',
    text: 'Start with your student’s interests instead of choosing a major based only on a job title.',
  },
  {
    label: 'Info',
    text: 'Bellini College offers disciplinary and interdisciplinary computing degrees, along with minors and pathway programs.',
    sourceUrl: 'https://www.usf.edu/ai-cybersecurity-computing/academics/',
  },
  {
    label: 'Tip',
    text: 'Compare degree focus, sample classes, and career options together before narrowing the list.',
  },
  {
    label: 'Info',
    text: 'USF recommends applying as early as possible. Its admissions page explains application, materials, and scholarship-consideration deadlines.',
    sourceUrl: 'https://www.usf.edu/admissions/freshmen/admission-information/dates-deadlines.aspx',
  },
  {
    label: 'Tip',
    text: 'Encourage exploration. Quiz recommendations are starting points, not final decisions.',
  },
  {
    label: 'Info',
    text: 'Bellini College highlights hands-on opportunities including ReliaQuest Labs, undergraduate research, and industry internships.',
    sourceUrl: 'https://www.usf.edu/ai-cybersecurity-computing/academics/student-opportunities/exp-learning.aspx',
  },
];

function HighSchoolParentInfo() {
  return (
    <main className="degrees-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Parent-friendly information</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to="/dashboard/prospective-student#toolbox"
          >
            Back to Dashboard
          </Link>
        </div>
        <h1>Parent-Friendly Information Section</h1>
        <p>
          Use these tips and frequently asked questions to support your
          student’s exploration of Bellini College computing majors.
        </p>
      </section>

      <section className="parent-info-grid">
        <div>
          <h2>Tips and Advice for Parents</h2>
          <ul className="parent-info-question-list">
            {parentTips.map((tip) => (
              <li key={tip.text}>
                <small>{tip.label}</small>
                <span>{tip.text}</span>
                {tip.sourceUrl && (
                  <a href={tip.sourceUrl} rel="noreferrer" target="_blank">
                    Official USF source ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>FAQ for Prospective Students</h2>
          <div className="parent-info-faq-list">
            {prospectiveStudentFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
                {faq.sourceUrl && (
                  <a href={faq.sourceUrl} rel="noreferrer" target="_blank">
                    Official USF source ↗
                  </a>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HighSchoolParentInfo;

import { type MouseEvent, type ReactNode, useEffect } from 'react';
import {
  BookOpenCheck,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  FileText,
  MessageCircleQuestion,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

type DashboardTemplateProps = {
  headline: string;
  intro: string;
  dashboardLabel?: string;
  pathHeading?: string;
  quizNavLabel?: string;
  quizEyebrow?: string;
  comingSoonMode?: boolean;
  quizAtEnd?: boolean;
  blankToolCards?: boolean;
  blankRemainingToolCards?: boolean;
  blankAfterSecondaryToolCards?: boolean;
  uniformToolCards?: boolean;
  transferToolsComingSoon?: boolean;
  degreeToolPath?: string;
  degreeToolTitle?: string;
  degreeToolText?: string;
  degreeToolComingSoon?: boolean;
  secondaryToolPath?: string;
  secondaryToolTitle?: string;
  secondaryToolText?: string;
  tertiaryToolPath?: string;
  tertiaryToolTitle?: string;
  tertiaryToolText?: string;
  tertiaryToolUndecided?: boolean;
  extraToolPath?: string;
  extraToolTitle?: string;
  extraToolText?: string;
  extraToolIcon?: 'calendar' | 'file' | 'upload';
  careerToolTitle?: string;
  careerToolText?: string;
  careerToolPath?: string;
  careerToolExternalHref?: string;
  careerToolIcon?: 'briefcase' | 'upload';
  careerToolUndecided?: boolean;
  hideFinalNav?: boolean;
  finalNavPath?: string;
  finalNavLabel?: string;
  steps?: DashboardStep[];
  toolCardOrder?: DashboardToolCard[];
  planningHeading?: string;
  planningText?: string;
  planningItems?: DashboardPlanningItem[];
  planningReminder?: string;
};

type DashboardStep = {
  title: string;
  text: string;
};

type DashboardPlanningItem =
  | string
  | {
      title: string;
      text: string;
    };

type DashboardToolCard = 'degree' | 'secondary' | 'tertiary' | 'career' | 'extra';

const dashboardSteps: DashboardStep[] = [
  {
    title: 'Find your starting point',
    text: 'Explore degree options to connect your goals, background, and questions to possible programs and support resources.',
  },
  {
    title: 'Explore degree paths',
    text: 'Review degree information to understand program focus, skills, and possible academic directions.',
  },
  {
    title: 'Compare your options',
    text: 'Use comparison tools to see how programs differ before narrowing your next steps.',
  },
  {
    title: 'Save what matters',
    text: 'Keep track of recommendations, programs, questions, and notes as you move through the planning process.',
  },
  {
    title: 'Prepare questions',
    text: 'Write down what you want to ask admissions, advisors, family, or support staff.',
  },
  {
    title: 'Plan your next action',
    text: 'Turn exploration into a short checklist you can revisit, print, or bring to a conversation.',
  },
];

const planningPlaceholders = [
  'Coming soon.',
  'Coming soon.',
  'Coming soon.',
  'Coming soon.',
];

const transferNextSteps = [
  {
    title: 'Confirm',
    text: 'Credit applicability, recommended lower-division courses, transfer admission expectations, deadlines, and required documents.',
  },
  {
    title: 'Prepare',
    text: 'An unofficial transcript, completed and in-progress courses, course descriptions or syllabi, majors of interest, and advising questions.',
  },
  {
    title: 'Next',
    text: 'Compare degrees, check official USF transfer resources, and prepare questions for advising.',
  },
];

function DashboardTemplate({
  headline,
  intro,
  dashboardLabel = 'General Dashboard',
  pathHeading = 'Move from questions to a clearer plan',
  quizNavLabel = 'Intake Quiz',
  quizEyebrow = 'Intake quiz',
  comingSoonMode = false,
  quizAtEnd = false,
  blankToolCards = false,
  blankRemainingToolCards = false,
  blankAfterSecondaryToolCards = false,
  uniformToolCards = false,
  transferToolsComingSoon = false,
  degreeToolPath = '/degrees',
  degreeToolTitle = 'Degree Infographics and Comparison',
  degreeToolText = 'Explore degree options at Bellini College and compare two programs side by side to see which path best fits your interests, goals, and next steps.',
  degreeToolComingSoon,
  secondaryToolPath,
  secondaryToolTitle = 'Coming soon',
  secondaryToolText = 'Coming soon.',
  tertiaryToolPath,
  tertiaryToolTitle = 'Transition Planner',
  tertiaryToolText = 'A future general planning tool can organize recommendations, questions, notes, and next actions in one place.',
  tertiaryToolUndecided = false,
  extraToolPath,
  extraToolTitle = 'Additional Tool',
  extraToolText = 'Open another planning tool for this dashboard.',
  extraToolIcon = 'file',
  careerToolTitle = 'Possible Career Paths',
  careerToolText = 'Choose a major and jump to its career outlook, salary context, Tampa Bay employment information, and professional preparation options.',
  careerToolPath = '/career-paths',
  careerToolExternalHref,
  careerToolIcon = 'briefcase',
  careerToolUndecided = false,
  hideFinalNav = false,
  finalNavPath,
  finalNavLabel,
  steps = dashboardSteps,
  toolCardOrder = ['degree', 'secondary', 'tertiary', 'career'],
  planningHeading,
  planningText,
  planningItems: customPlanningItems,
  planningReminder,
}: DashboardTemplateProps) {
  const shouldDisableDegreeTool = degreeToolComingSoon ?? comingSoonMode;
  const isTransferDashboard = transferToolsComingSoon;
  const planningItems = customPlanningItems ?? (isTransferDashboard
    ? transferNextSteps
    : planningPlaceholders);
  const resolvedPlanningHeading =
    planningHeading ??
    (isTransferDashboard ? 'Transfer Next Steps' : 'Prepare for Advising');
  const resolvedPlanningText =
    planningText ??
    (isTransferDashboard
      ? 'Turn your transfer research into a short action plan before applying or meeting with advising.'
      : 'Compare degree options and prepare questions for advising.');
  const resolvedPlanningReminder =
    planningReminder ??
    (isTransferDashboard
      ? 'Reminder: this dashboard helps you prepare, but official USF admissions, advising, and transfer credit evaluation should be used for final decisions.'
      : '');
  const CareerToolIcon = careerToolIcon === 'upload' ? Upload : Briefcase;
  const ExtraToolIcon = extraToolIcon === 'upload'
    ? Upload
    : extraToolIcon === 'calendar'
      ? CalendarCheck
      : FileText;

  function renderComingSoonToolCard(
    key: string,
    icon: ReactNode,
    title: string,
    text: string,
  ) {
    return (
      <button
        className="dashboard-major-card dashboard-placeholder-tool dashboard-undecided-tool coming-soon-area"
        key={key}
        type="button"
        disabled
      >
        {icon}
        <span>{title}</span>
        <p>{text}</p>
      </button>
    );
  }

  const careerToolContent = (
    <>
      <CareerToolIcon size={30} aria-hidden="true" />
      <span>{careerToolTitle}</span>
      <p>{careerToolText}</p>
    </>
  );
  const careerToolCard = careerToolExternalHref ? (
    <a
      className="dashboard-major-card"
      href={careerToolExternalHref}
      target="_blank"
      rel="noreferrer"
    >
      {careerToolContent}
    </a>
  ) : (
    <Link className="dashboard-major-card" to={careerToolPath}>
      {careerToolContent}
    </Link>
  );

  function renderPlaceholderToolCard(key: string | number) {
    return (
      <button
        aria-label={`Feature card placeholder ${key}`}
        className="dashboard-major-card dashboard-blank-tool-card"
        key={key}
        type="button"
      />
    );
  }

  function renderToolCard(card: DashboardToolCard, key?: string): ReactNode {
    if (card === 'degree') {
      if (shouldDisableDegreeTool) {
        return renderComingSoonToolCard(
          key ?? degreeToolTitle,
          <BookOpenCheck size={30} aria-hidden="true" />,
          degreeToolTitle,
          degreeToolText,
        );
      }

      return (
        <Link
          className="dashboard-major-card"
          key={key ?? degreeToolPath}
          to={degreeToolPath}
        >
          <BookOpenCheck size={30} aria-hidden="true" />
          <span>{degreeToolTitle}</span>
          <p>{degreeToolText}</p>
        </Link>
      );
    }

    if (card === 'secondary') {
      if (comingSoonMode) {
        return renderComingSoonToolCard(
          key ?? secondaryToolTitle,
          <FileText size={30} aria-hidden="true" />,
          secondaryToolTitle,
          secondaryToolText,
        );
      }

      return secondaryToolPath ? (
        <Link
          className="dashboard-major-card"
          key={key ?? secondaryToolPath}
          to={secondaryToolPath}
        >
          <FileText size={30} aria-hidden="true" />
          <span>{secondaryToolTitle}</span>
          <p>{secondaryToolText}</p>
        </Link>
      ) : (
        <button
          className="dashboard-major-card dashboard-placeholder-tool"
          key={key ?? secondaryToolTitle}
          type="button"
        >
          <MessageCircleQuestion size={30} aria-hidden="true" />
          <span>{secondaryToolTitle}</span>
          <p>{secondaryToolText}</p>
        </button>
      );
    }

    if (card === 'tertiary') {
      if (comingSoonMode) {
        return renderComingSoonToolCard(
          key ?? tertiaryToolTitle,
          <CalendarCheck size={30} aria-hidden="true" />,
          tertiaryToolTitle,
          tertiaryToolText,
        );
      }

      return tertiaryToolPath ? (
        <Link
          className="dashboard-major-card"
          key={key ?? tertiaryToolPath}
          to={tertiaryToolPath}
        >
          <CalendarCheck size={30} aria-hidden="true" />
          <span>{tertiaryToolTitle}</span>
          <p>{tertiaryToolText}</p>
        </Link>
      ) : (
        <button
          className={`dashboard-major-card dashboard-placeholder-tool${
            tertiaryToolUndecided ? ' dashboard-undecided-tool' : ''
          }`}
          key={key ?? tertiaryToolTitle}
          type="button"
        >
          <CalendarCheck size={30} aria-hidden="true" />
          <span>{tertiaryToolTitle}</span>
          <p>{tertiaryToolText}</p>
        </button>
      );
    }

    if (card === 'extra') {
      if (comingSoonMode) {
        return renderComingSoonToolCard(
          key ?? extraToolTitle,
          <ExtraToolIcon size={30} aria-hidden="true" />,
          extraToolTitle,
          extraToolText,
        );
      }

      return extraToolPath ? (
        <Link
          className="dashboard-major-card"
          key={key ?? extraToolPath}
          to={extraToolPath}
        >
          <ExtraToolIcon size={30} aria-hidden="true" />
          <span>{extraToolTitle}</span>
          <p>{extraToolText}</p>
        </Link>
      ) : (
        renderPlaceholderToolCard(key ?? extraToolTitle)
      );
    }

    if (comingSoonMode) {
      return renderComingSoonToolCard(
        key ?? careerToolTitle,
        <CareerToolIcon size={30} aria-hidden="true" />,
        careerToolTitle,
        careerToolText,
      );
    }

    if (careerToolUndecided) {
      return (
        <button
          className="dashboard-major-card dashboard-placeholder-tool dashboard-undecided-tool coming-soon-area"
          key={key ?? careerToolTitle}
          type="button"
        >
          {careerToolContent}
        </button>
      );
    }

    return careerToolExternalHref ? (
      <a
        className="dashboard-major-card"
        href={careerToolExternalHref}
        key={key ?? careerToolExternalHref}
        target="_blank"
        rel="noreferrer"
      >
        {careerToolContent}
      </a>
    ) : (
      <Link
        className="dashboard-major-card"
        key={key ?? careerToolPath}
        to={careerToolPath}
      >
        {careerToolContent}
      </Link>
    );
  }

  function handleSectionLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const quizSection = (
    <section className="dashboard-quiz-section scroll-reveal coming-soon-area" id="intake-quiz">
      <div className="dashboard-section-rule"></div>
      <div className="dashboard-feature-row">
        <div>
          <p className="dashboard-eyebrow">{quizEyebrow}</p>
          <h2>Intake quiz — Coming soon</h2>
          <p>Personalized program recommendations are coming soon.</p>
          <button className="dashboard-quiz-button compact dashboard-quiz-button-disabled-red" type="button" disabled>
            <ClipboardList size={20} aria-hidden="true" />
            Coming soon
          </button>
        </div>
        <div className="dashboard-quiz-image picture-placeholder" aria-label="Reserved quiz picture space">Picture placeholder</div>
      </div>
    </section>
  );

  return (
    <main className="dashboard-page general-dashboard">
      <header className="dashboard-header">
        <Link className="dashboard-logo" to="/">
          Degree Explorer
        </Link>

        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          <a
            href="#start"
            onClick={(event) => handleSectionLinkClick(event, 'start')}
          >
            Start
          </a>
          <a
            href="#intake-quiz"
            onClick={(event) => handleSectionLinkClick(event, 'intake-quiz')}
          >
            {quizNavLabel}
          </a>
          <a
            href="#majors"
            onClick={(event) => handleSectionLinkClick(event, 'majors')}
          >
            Tool Box
          </a>
          {hideFinalNav ? null : finalNavPath ? (
            <Link to={finalNavPath}>{finalNavLabel ?? 'Profile'}</Link>
          ) : transferToolsComingSoon ? null : (
            <a
              href="#planner"
              onClick={(event) => handleSectionLinkClick(event, 'planner')}
            >
              Planning
            </a>
          )}
        </nav>
      </header>

      <section className="dashboard-hero general-dashboard-hero scroll-reveal">
        <h1>{headline}</h1>
        <div className="dashboard-hero-image picture-placeholder" aria-label="Reserved dashboard picture space">Picture placeholder</div>
        <div className="dashboard-intro general-dashboard-intro">
          <p className="dashboard-eyebrow">{dashboardLabel}</p>
          <p>{intro}</p>
        </div>
      </section>

      <section className="dashboard-path scroll-reveal" id="start">
        <div className="dashboard-section-rule"></div>
        <div className="dashboard-section-heading">
          <p className="dashboard-eyebrow">How to use this dashboard</p>
          <h2>{pathHeading}</h2>
        </div>

        <div className="dashboard-step-grid">
          {steps.map((step, index) => (
            <article className="dashboard-step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {!quizAtEnd && quizSection}

      <section className="dashboard-majors-section scroll-reveal" id="majors">
        <div className="dashboard-section-rule dashboard-section-rule-light"></div>
        <div className="dashboard-section-heading">
          <p className="dashboard-eyebrow light">Toolbox</p>
          <h2>The following tools are there to help you</h2>
        </div>

        <div
          className={`dashboard-major-cards dashboard-tool-grid${
            blankAfterSecondaryToolCards ? ' dashboard-tool-grid-balanced' : ''
          }${uniformToolCards ? ' dashboard-tool-grid-uniform' : ''}`}
        >
          {blankToolCards || blankRemainingToolCards || blankAfterSecondaryToolCards ? (
            Array.from({
              length: blankAfterSecondaryToolCards
                ? Math.max(4, toolCardOrder.length)
                : 4,
            }, (_, index) => {
              if (blankToolCards) {
                return renderPlaceholderToolCard(index + 1);
              }

              if (blankRemainingToolCards) {
                return index === 0
                  ? renderToolCard('degree', 'degree')
                  : renderPlaceholderToolCard(index + 1);
              }

              return renderToolCard(
                toolCardOrder[index] ?? 'degree',
                `${toolCardOrder[index] ?? 'degree'}-${index}`,
              );
            })
          ) : (
            <>
              {renderToolCard('degree', 'degree')}

              {transferToolsComingSoon && careerToolCard}

              {transferToolsComingSoon ? (
                renderComingSoonToolCard('transfer-readiness', <FileText size={30} aria-hidden="true" />, 'Transfer Readiness Guide', 'Coming soon!')
              ) : secondaryToolPath ? (
                renderToolCard('secondary', 'secondary')
              ) : (
                renderToolCard('secondary', 'secondary-placeholder')
              )}

              {transferToolsComingSoon ? (
                renderComingSoonToolCard('transfer-planner', <CalendarCheck size={30} aria-hidden="true" />, 'Transfer Planner', 'Coming soon!')
              ) : tertiaryToolPath ? (
                renderToolCard('tertiary', 'tertiary')
              ) : (
                renderToolCard('tertiary', 'tertiary-placeholder')
              )}

              {!transferToolsComingSoon && (careerToolUndecided ? (
                renderToolCard('career', 'career-placeholder')
              ) : (
                careerToolCard
              ))}
            </>
          )}
        </div>
      </section>

      <section className="dashboard-planner-section scroll-reveal" id="planner">
        <div className="dashboard-section-rule"></div>
        <div className="dashboard-feature-row">
          <div>
            <p className="dashboard-eyebrow">Planning Section</p>
            <h2>{resolvedPlanningHeading}</h2>
            <p>{resolvedPlanningText}</p>
            {resolvedPlanningReminder ? (
              <aside className="dashboard-planner-reminder">
                {resolvedPlanningReminder}
              </aside>
            ) : null}
          </div>

          <ul className="dashboard-checklist">
            {planningItems.map((item, index) => (
              <li
                key={typeof item === 'string' ? `${item}-${index}` : item.title}
              >
                {typeof item === 'string' ? (
                  item
                ) : (
                  <>
                    <strong>{item.title}</strong>
                    {item.text}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {quizAtEnd && quizSection}
    </main>
  );
}

export default DashboardTemplate;

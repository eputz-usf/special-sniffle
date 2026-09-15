import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BelliniStudentDashboard from './pages/belliniStudent/BelliniStudentDashboard';
import BachelorsMastersPathways from './pages/degrees/BachelorsMastersPathways';
import CareerPaths from './pages/degrees/CareerPaths';
import CurrentUsfDashboard from './pages/dashboards/CurrentUsfDashboard';
import DegreeComparison from './pages/degrees/DegreeComparison';
import DegreeDetail from './pages/degrees/DegreeDetail';
import DegreeInformation from './pages/degrees/DegreeInformation';
import FutureDegreeOptions from './pages/degrees/FutureDegreeOptions';
import GeneralIntakeQuiz from './pages/general/GeneralIntakeQuiz';
import GeneralDashboard from './pages/dashboards/GeneralDashboard';
import HighSchoolIntakeQuiz from './pages/highSchool/quiz/HighSchoolIntakeQuiz';
import HighSchoolQuizResults from './pages/highSchool/quiz/HighSchoolQuizResults';
import HighSchoolBachelorsMastersPathways from './pages/highSchool/degrees/HighSchoolBachelorsMastersPathways';
import HighSchoolCareerPaths from './pages/highSchool/degrees/HighSchoolCareerPaths';
import HighSchoolDegreeComparison from './pages/highSchool/degrees/HighSchoolDegreeComparison';
import HighSchoolDegreeDetail from './pages/highSchool/degrees/HighSchoolDegreeDetail';
import HighSchoolDegreeInformation from './pages/highSchool/degrees/HighSchoolDegreeInformation';
import HighSchoolFutureDegreeOptions from './pages/highSchool/degrees/HighSchoolFutureDegreeOptions';
import HighSchoolParentInfo from './pages/highSchool/degrees/HighSchoolParentInfo';
import HighSchoolTransitionPlanner from './pages/highSchool/degrees/HighSchoolTransitionPlanner';
import Home from './pages/Home';
import Login from './pages/Login';
import CurrentUsfReadinessGuide from './pages/USF/CurrentUsfReadinessGuide';
import CurrentUsfProfile from './pages/USF/Profile';
import BelliniStudentProfile from './pages/belliniStudent/Profile';
import BelliniStudentMajorChangeGuide from './pages/belliniStudent/MajorChangeGuide';
import BelliniStudentTranscriptUpload from './pages/belliniStudent/TranscriptUpload';
import BelliniStudentCourseOverlapIndex from './pages/belliniStudent/CourseOverlapIndex';
import BelliniStudentCourseOverlapDetail from './pages/belliniStudent/CourseOverlapDetail';
import BelliniStudentIntakeQuiz from './pages/belliniStudent/quiz/BelliniStudentIntakeQuiz';
import BelliniStudentQuizResults from './pages/belliniStudent/quiz/BelliniStudentQuizResults';
import TranscriptUpload from './pages/USF/TranscriptUpload';
import CurrentUsfIntakeQuiz from './pages/USF/quiz/CurrentUsfIntakeQuiz';
import CurrentUsfQuizResults from './pages/USF/quiz/CurrentUsfQuizResults';
import ProspectiveStudentDashboard from './pages/dashboards/ProspectiveStudentDashboard';
import SelectUserType from './pages/SelectUserType';
import TransferStudentDashboard from './pages/dashboards/TransferStudentDashboard';
import TransferMajorRequirements from './pages/transfer/TransferMajorRequirements';
import TransferPlanner from './pages/transfer/TransferPlanner';
import TransferReadinessGuide from './pages/transfer/TransferReadinessGuide';
import TransferIntakeQuiz from './pages/transfer/quiz/TransferIntakeQuiz';
import TransferQuizResults from './pages/transfer/quiz/TransferQuizResults';
import usfLogo from './assets/usflogo.png';

const guideHeaderLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#terms', label: 'Terms' },
  { href: '#checklist', label: 'Checklist' },
  { href: '#gateway-requirements', label: 'Requirements' },
  { href: '#requirement-resources', label: 'Resources' },
  { href: '#canvas', label: 'Canvas' },
  { href: '#advising-evaluation', label: 'Advising' },
  { href: '#change-form', label: 'Change Form' },
  { href: '#progression-tools', label: 'Tools' },
  { href: '#contact', label: 'Contact' },
];

const condensedGuideHeaderLinks = guideHeaderLinks.filter(
  (link) =>
    !['#terms', '#canvas', '#advising-evaluation', '#progression-tools'].includes(
      link.href,
    ),
);

function App() {
  const location = useLocation();
  const isSelectingUserType =
    location.pathname === '/' || location.pathname === '/select-user-type';
  const isDashboard = location.pathname.startsWith('/dashboard');
  const hasGuideSectionNav =
    location.pathname === '/bellini-student/major-change-guide' ||
    location.pathname === '/current-usf/readiness-guide';
  const activeGuideHeaderLinks =
    hasGuideSectionNav
      ? condensedGuideHeaderLinks
      : guideHeaderLinks;

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ block: 'start' });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.hash, location.pathname]);

  return (
    <>
      {!isDashboard && (
        <header
          className={`site-header${isSelectingUserType ? ' user-select-header' : ''}${
            hasGuideSectionNav ? ' site-header-with-section-nav' : ''
          }`}
        >
          {hasGuideSectionNav ? (
            <span className="site-logo">Guide</span>
          ) : (
            <Link className="site-logo" to="/">
              Degree Explorer
            </Link>
          )}
          {hasGuideSectionNav && (
            <nav
              className="site-section-nav"
              aria-label="Guide sections"
            >
              {activeGuideHeaderLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}
          <img className="usf-logo" src={usfLogo} alt="USF logo" />
        </header>
      )}

      <Routes>
        <Route path="/" element={<SelectUserType />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/profile" element={<CurrentUsfProfile />} />
        <Route path="/bellini-student/profile" element={<BelliniStudentProfile />} />
        <Route
          path="/bellini-student/major-change-guide"
          element={<BelliniStudentMajorChangeGuide />}
        />
        <Route
          path="/bellini-student/transcript"
          element={<BelliniStudentTranscriptUpload />}
        />
        <Route
          path="/bellini-student/course-overlap"
          element={<BelliniStudentCourseOverlapIndex />}
        />
        <Route
          path="/bellini-student/course-overlap/:majorSlug"
          element={<BelliniStudentCourseOverlapDetail />}
        />
        <Route
          path="/bellini-student/quiz"
          element={<BelliniStudentIntakeQuiz />}
        />
        <Route
          path="/bellini-student/quiz/results"
          element={<BelliniStudentQuizResults />}
        />
        <Route
          path="/current-usf/readiness-guide"
          element={<CurrentUsfReadinessGuide />}
        />
        <Route
          path="/current-usf/transcript"
          element={<TranscriptUpload />}
        />
        <Route
          path="/current-usf/course-overlap"
          element={
            <BelliniStudentCourseOverlapIndex
              basePath="/current-usf/course-overlap"
              dashboardPath="/dashboard/current-usf-student#majors"
              transcriptPath="/current-usf/transcript"
              guidePath="/current-usf/readiness-guide"
              sourceDashboard="current-usf-student"
              eyebrow="Current USF student tool"
              intro="Select a Bellini major to compare its four-year plan with courses you have already completed at USF. Use the checklist to organize possible overlap before advising confirms what applies."
            />
          }
        />
        <Route
          path="/current-usf/course-overlap/:majorSlug"
          element={
            <BelliniStudentCourseOverlapDetail
              basePath="/current-usf/course-overlap"
              transcriptPath="/current-usf/transcript"
              sourceDashboard="current-usf-student"
              storageKey="cic_current_usf_course_overlap_completed"
              notFoundText="Choose one of the available Bellini majors to open its course overlap checklist."
              intro="Use this page to check off courses or requirement rows you may have already completed at USF before Bellini advising confirms how they apply."
              advisingText="This tool can help organize courses before advising, but Bellini College and official USF systems must evaluate grades, attempts, prerequisites, credit applicability, excess hours, and timeline before a major change can be approved."
            />
          }
        />
        <Route path="/quiz" element={<HighSchoolIntakeQuiz />} />
        <Route path="/quiz/results" element={<HighSchoolQuizResults />} />
        <Route path="/general/quiz" element={<GeneralIntakeQuiz />} />
        <Route path="/current-usf/quiz" element={<CurrentUsfIntakeQuiz />} />
        <Route
          path="/current-usf/quiz/results"
          element={<CurrentUsfQuizResults />}
        />
        <Route path="/transfer/quiz" element={<TransferIntakeQuiz />} />
        <Route path="/transfer/quiz/results" element={<TransferQuizResults />} />
        <Route path="/transfer/planner" element={<TransferPlanner />} />
        <Route
          path="/transfer/major-requirements"
          element={<TransferMajorRequirements />}
        />
        <Route
          path="/transfer/readiness-guide"
          element={<TransferReadinessGuide />}
        />
        <Route path="/degrees" element={<DegreeInformation />} />
        <Route path="/degrees/compare" element={<DegreeComparison />} />
        <Route
          path="/degrees/bachelors-masters-pathways"
          element={<BachelorsMastersPathways />}
        />
        <Route path="/degrees/future-options" element={<FutureDegreeOptions />} />
        <Route path="/career-paths" element={<CareerPaths />} />
        <Route path="/degrees/:degreeSlug" element={<DegreeDetail />} />
        <Route
          path="/high-school/degrees"
          element={<HighSchoolDegreeInformation />}
        />
        <Route
          path="/high-school/degrees/compare"
          element={<HighSchoolDegreeComparison />}
        />
        <Route
          path="/high-school/degrees/bachelors-masters-pathways"
          element={<HighSchoolBachelorsMastersPathways />}
        />
        <Route
          path="/high-school/degrees/future-options"
          element={<HighSchoolFutureDegreeOptions />}
        />
        <Route
          path="/high-school/career-paths"
          element={<HighSchoolCareerPaths />}
        />
        <Route
          path="/high-school/parent-info"
          element={<HighSchoolParentInfo />}
        />
        <Route
          path="/high-school/transition-planner"
          element={<HighSchoolTransitionPlanner />}
        />
        <Route
          path="/high-school/degrees/:degreeSlug"
          element={<HighSchoolDegreeDetail />}
        />
        <Route path="/select-user-type" element={<SelectUserType />} />
        <Route path="/dashboard/general" element={<GeneralDashboard />} />
        <Route
          path="/dashboard/prospective-student"
          element={<ProspectiveStudentDashboard />}
        />
        <Route
          path="/dashboard/current-usf-student"
          element={<CurrentUsfDashboard />}
        />
        <Route
          path="/dashboard/current-bellini-student"
          element={<BelliniStudentDashboard />}
        />
        <Route
          path="/dashboard/transfer-student"
          element={<TransferStudentDashboard />}
        />
      </Routes>
    </>
  );
}

export default App;

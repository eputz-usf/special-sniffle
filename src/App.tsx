import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BelliniStudentDashboard from './pages/dashboards/BelliniStudentDashboard';
import BachelorsMastersPathways from './pages/degrees/BachelorsMastersPathways';
import CareerPaths from './pages/degrees/CareerPaths';
import CurrentUsfDashboard from './pages/dashboards/CurrentUsfDashboard';
import DegreeComparison from './pages/degrees/DegreeComparison';
import DegreeDetail from './pages/degrees/DegreeDetail';
import DegreeInformation from './pages/degrees/DegreeInformation';
import FutureDegreeOptions from './pages/degrees/FutureDegreeOptions';
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
import Profile from './pages/Profile';
import ProspectiveStudentDashboard from './pages/dashboards/ProspectiveStudentDashboard';
import SelectUserType from './pages/SelectUserType';
import TransferStudentDashboard from './pages/dashboards/TransferStudentDashboard';
import TransferIntakeQuiz from './pages/transfer/quiz/TransferIntakeQuiz';
import TransferQuizResults from './pages/transfer/quiz/TransferQuizResults';
import usfLogo from './assets/usflogo.png';

function App() {
  const location = useLocation();
  const isSelectingUserType =
    location.pathname === '/' || location.pathname === '/select-user-type';
  const isDashboard = location.pathname.startsWith('/dashboard');

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
          className={`site-header${isSelectingUserType ? ' user-select-header' : ''}`}
        >
          <Link className="site-logo" to="/">
            CIC Support Platform
          </Link>
          <img className="usf-logo" src={usfLogo} alt="USF logo" />
        </header>
      )}

      <Routes>
        <Route path="/" element={<SelectUserType />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<HighSchoolIntakeQuiz />} />
        <Route path="/quiz/results" element={<HighSchoolQuizResults />} />
        <Route path="/transfer/quiz" element={<TransferIntakeQuiz />} />
        <Route path="/transfer/quiz/results" element={<TransferQuizResults />} />
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

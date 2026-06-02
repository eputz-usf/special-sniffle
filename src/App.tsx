import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BelliniStudentDashboard from './pages/BelliniStudentDashboard';
import BachelorsMastersPathways from './pages/BachelorsMastersPathways';
import CurrentUsfDashboard from './pages/CurrentUsfDashboard';
import DegreeComparison from './pages/DegreeComparison';
import DegreeDetail from './pages/DegreeDetail';
import DegreeInformation from './pages/DegreeInformation';
import FutureDegreeOptions from './pages/FutureDegreeOptions';
import GeneralDashboard from './pages/GeneralDashboard';
import HighSchoolIntakeQuiz from './pages/HighSchoolIntakeQuiz';
import HighSchoolQuizResults from './pages/HighSchoolQuizResults';
import HighSchoolBachelorsMastersPathways from './pages/highSchoolDegrees/HighSchoolBachelorsMastersPathways';
import HighSchoolDegreeComparison from './pages/highSchoolDegrees/HighSchoolDegreeComparison';
import HighSchoolDegreeDetail from './pages/highSchoolDegrees/HighSchoolDegreeDetail';
import HighSchoolDegreeInformation from './pages/highSchoolDegrees/HighSchoolDegreeInformation';
import HighSchoolFutureDegreeOptions from './pages/highSchoolDegrees/HighSchoolFutureDegreeOptions';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProspectiveStudentDashboard from './pages/ProspectiveStudentDashboard';
import SelectUserType from './pages/SelectUserType';
import TransferStudentDashboard from './pages/TransferStudentDashboard';
import usfLogo from './assets/usflogo.png';

function App() {
  const location = useLocation();
  const isSelectingUserType =
    location.pathname === '/' || location.pathname === '/select-user-type';
  const isDashboard = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

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
        <Route path="/degrees" element={<DegreeInformation />} />
        <Route path="/degrees/compare" element={<DegreeComparison />} />
        <Route
          path="/degrees/bachelors-masters-pathways"
          element={<BachelorsMastersPathways />}
        />
        <Route path="/degrees/future-options" element={<FutureDegreeOptions />} />
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

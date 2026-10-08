import { lazy, Suspense } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import usfLogo from './assets/usflogo-optimized.png';
import NotFound from './pages/NotFound';
import RouteAccessibility from './components/RouteAccessibility';

const BelliniStudentDashboard = lazy(() => import('./pages/belliniStudent/BelliniStudentDashboard'));
const BachelorsMastersPathways = lazy(() => import('./pages/degrees/BachelorsMastersPathways'));
const CareerPaths = lazy(() => import('./pages/degrees/CareerPaths'));
const CurrentUsfDashboard = lazy(() => import('./pages/dashboards/CurrentUsfDashboard'));
const DegreeComparison = lazy(() => import('./pages/degrees/DegreeComparison'));
const DegreeDetail = lazy(() => import('./pages/degrees/DegreeDetail'));
const DegreeInformation = lazy(() => import('./pages/degrees/DegreeInformation'));
const FutureDegreeOptions = lazy(() => import('./pages/degrees/FutureDegreeOptions'));
const HighSchoolBachelorsMastersPathways = lazy(() => import('./pages/highSchool/degrees/HighSchoolBachelorsMastersPathways'));
const HighSchoolCareerPaths = lazy(() => import('./pages/highSchool/degrees/HighSchoolCareerPaths'));
const HighSchoolDegreeComparison = lazy(() => import('./pages/highSchool/degrees/HighSchoolDegreeComparison'));
const HighSchoolDegreeDetail = lazy(() => import('./pages/highSchool/degrees/HighSchoolDegreeDetail'));
const HighSchoolDegreeInformation = lazy(() => import('./pages/highSchool/degrees/HighSchoolDegreeInformation'));
const HighSchoolFutureDegreeOptions = lazy(() => import('./pages/highSchool/degrees/HighSchoolFutureDegreeOptions'));
const HighSchoolParentInfo = lazy(() => import('./pages/highSchool/degrees/HighSchoolParentInfo'));
const ProspectiveStudentDashboard = lazy(() => import('./pages/dashboards/ProspectiveStudentDashboard'));
const SelectUserType = lazy(() => import('./pages/SelectUserType'));
const TransferStudentDashboard = lazy(() => import('./pages/dashboards/TransferStudentDashboard'));

function App() {
  const location = useLocation();
  const isSelectingUserType =
    location.pathname === '/' || location.pathname === '/select-user-type';
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {!isDashboard && (
        <header
          className={`site-header${isSelectingUserType ? ' user-select-header' : ''}`}
        >
          <Link className="site-logo" to="/">
            Degree Explorer
          </Link>
          <img className="usf-logo" src={usfLogo} alt="University of South Florida" width={640} height={360} />
        </header>
      )}

      <Suspense fallback={<main className="status-page" id="main-content" tabIndex={-1} aria-busy="true"><p role="status">Loading page…</p></main>}>
        <RouteAccessibility key={location.key} />
        <Routes>
          <Route path="/" element={<SelectUserType />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
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
            path="/high-school/degrees/:degreeSlug"
            element={<HighSchoolDegreeDetail />}
          />
          <Route path="/select-user-type" element={<SelectUserType />} />
          <Route path="/dashboard/general" element={<Navigate to="/degrees" replace />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BelliniStudentDashboard from './pages/BelliniStudentDashboard';
import CurrentUsfDashboard from './pages/CurrentUsfDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProspectiveStudentDashboard from './pages/ProspectiveStudentDashboard';
import QuizPlaceholder from './pages/QuizPlaceholder';
import SelectUserType from './pages/SelectUserType';
import TransferStudentDashboard from './pages/TransferStudentDashboard';
import usfLogo from './assets/usflogo.png';

function App() {
  const location = useLocation();
  const isSelectingUserType =
    location.pathname === '/' || location.pathname === '/select-user-type';
  const isDashboard = location.pathname.startsWith('/dashboard');

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
        <Route path="/quiz" element={<QuizPlaceholder />} />
        <Route path="/select-user-type" element={<SelectUserType />} />
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

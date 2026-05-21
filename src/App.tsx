import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import SelectUserType from './pages/SelectUserType';
import StudentDashboard from './pages/StudentDashboard';
import usfLogo from './assets/usflogo.png';

function App() {
  const location = useLocation();
  const isSelectingUserType = location.pathname === '/select-user-type';

  return (
    <>
      <header
        className={`site-header${isSelectingUserType ? ' user-select-header' : ''}`}
      >
        <Link className="site-logo" to="/">
          CIC Support Platform
        </Link>
        <img className="usf-logo" src={usfLogo} alt="USF logo" />
      </header>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/select-user-type" element={<SelectUserType />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
        <Route path="/dashboard/advisor" element={<AdvisorDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
